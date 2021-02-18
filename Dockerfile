# https://lih.kg/ssmnqmX

FROM ubuntu:latest AS ssl
WORKDIR /tmp
RUN apt-get update \
  && apt-get install -y openssl \
  && openssl genrsa  -passout pass:xxxx -out server.pass.key 2048 \
  && openssl rsa -passin pass:x -in server.pass.key -out server.key \
  && rm server.pass.key \
  && openssl req -nodes -new -x509 -key server.key -out server.crt \
  -subj "/C=HK/ST=xxx/L=xxx/O=xxx/OU=xxx/CN=example.com" \
  &&  cat server.key server.crt > server.pem


FROM node:lts-alpine AS builder
WORKDIR /opt/back-home-safe
COPY ./back-home-safe/ .
RUN npm ci \ 
  && npm run build \
  && npm install http-server -g \ 
  && npm cache clean --force \
  && rm -rf ./public \
  && mkdir -p ./public \
  && mv ./build ./public/back-home-safe \
  && cp ./public/back-home-safe/index.html ./public/ \
  && cp ./public/back-home-safe/*.ico ./public/ \
  && cp ./public/back-home-safe/*.png ./public/ \
  && cp ./public/back-home-safe/*.json ./public/ \
  && cp ./public/back-home-safe/*.txt ./public/ 


FROM alpine:latest
RUN apk update \
  && apk add lighttpd \
  && rm -rf /var/cache/apk/* 
COPY --from=ssl /tmp/server.* /etc/lighttpd/ssl/
COPY --from=builder /opt/back-home-safe/public/ /var/www/localhost/htdocs/

RUN chmod 0600 /etc/lighttpd/ssl/server.pem \
  && chown lighttpd:lighttpd /etc/lighttpd/ssl -R \
  && echo $'var.confdir = "/etc/lighttpd" \n\
  server.document-root = "/var/www/localhost/htdocs/" \n\
  server.username      = "lighttpd" \n\
  server.groupname     = "lighttpd" \n\
  server.indexfiles    = ("index.html") \n\
  include "mime-types.conf" \n\
  server.modules = ( \n\
  "mod_access", \n\
  "mod_openssl", \n\
  "mod_accesslog" \n\
  ) \n\
  $SERVER["socket"] == ":443" { \n\
  ssl.engine="enable" \n\
  ssl.pemfile="/etc/lighttpd/ssl/server.pem" \n\
  ssl.ca-file="/etc/lighttpd/ssl/server.crt" \n\
  server.name="example.com" \n\
  server.document-root = "/var/www/localhost/htdocs/" \n\
  } \n '\
  > /etc/lighttpd/lighttpd.conf

RUN chown lighttpd:lighttpd /var/www/localhost/htdocs -R \
  && chmod 750 /var/www/localhost/htdocs -R

CMD ["lighttpd","-D","-f","/etc/lighttpd/lighttpd.conf"]
