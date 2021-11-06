import{c as e,i as t,a as n}from"./createSvgIcon.fc4e5d62.js";import{r as a,s as r,R as o,w as l,l as i,V as s,X as c,Y as u,Z as d,_ as f,$ as m,a0 as h}from"./vendor.edeed207.js";import{H as v}from"./Header.236956d2.js";import{P as g,q as p,c as E}from"./index.ef0c0cc6.js";var y={},b=t.exports,w=n.exports;Object.defineProperty(y,"__esModule",{value:!0});var x=y.default=void 0,C=w(a.exports),I=(0,b(e).default)(C.createElement("path",{d:"M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z"}),"Save");
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
function Z(e,t,n,a){return new(n||(n=Promise))((function(r,o){function l(e){try{s(a.next(e))}catch(t){o(t)}}function i(e){try{s(a.throw(e))}catch(t){o(t)}}function s(e){var t;e.done?r(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(l,i)}s((a=a.apply(e,t||[])).next())}))}function P(e,t){var n,a,r,o,l={label:0,sent:function(){if(1&r[0])throw r[1];return r[1]},trys:[],ops:[]};return o={next:i(0),throw:i(1),return:i(2)},"function"==typeof Symbol&&(o[Symbol.iterator]=function(){return this}),o;function i(o){return function(i){return function(o){if(n)throw new TypeError("Generator is already executing.");for(;l;)try{if(n=1,a&&(r=2&o[0]?a.return:o[0]?a.throw||((r=a.return)&&r.call(a),0):a.next)&&!(r=r.call(a,o[1])).done)return r;switch(a=0,r&&(o=[2&o[0],r.value]),o[0]){case 0:case 1:r=o;break;case 4:return l.label++,{value:o[1],done:!1};case 5:l.label++,a=o[1],o=[0];continue;case 7:o=l.ops.pop(),l.trys.pop();continue;default:if(!(r=l.trys,(r=r.length>0&&r[r.length-1])||6!==o[0]&&2!==o[0])){l=0;continue}if(3===o[0]&&(!r||o[1]>r[0]&&o[1]<r[3])){l.label=o[1];break}if(6===o[0]&&l.label<r[1]){l.label=r[1],r=o;break}if(r&&l.label<r[2]){l.label=r[2],l.ops.push(o);break}r[2]&&l.ops.pop(),l.trys.pop();continue}o=t.call(e,l)}catch(i){o=[6,i],a=0}finally{n=r=0}if(5&o[0])throw o[1];return{value:o[0]?o[1]:void 0,done:!0}}([o,i])}}}x=y.default=I;function R(e){return"string"==typeof e}var S,k=require("qrcode"),D=(S=k.toCanvas,function(){var e=Array.prototype.slice.call(arguments);return new Promise((function(t,n){e.push((function(e,a){e?n(e):t(a)})),S.apply(null,e)}))}),j=function(e,t){var n=document.createElement("canvas");return D(n,e,t).then((function(){return n.width}))},z=function(e){return e.length>36?"M":e.length>16?"Q":"H"},L=function(e){var t=e.canvas,n=e.logo;if(!n)return Promise.resolve();if(""===n)return Promise.resolve();var a=t.width;R(n)&&(n={src:n});var r=n,o=r.logoSize,l=void 0===o?.15:o,i=r.borderColor,s=void 0===i?"#ffffff":i,c=r.bgColor,u=void 0===c?s||"#ffffff":c,d=r.borderSize,f=void 0===d?.05:d,m=r.crossOrigin,h=r.borderRadius,v=void 0===h?8:h,g=r.logoRadius,p=void 0===g?0:g,E="string"==typeof n?n:n.src,y=a*l,b=a*(1-l)/2,w=a*(l+f),x=a*(1-l-f)/2,C=t.getContext("2d");O(C)(x,x,w,w,v),C.fillStyle=u,C.fill();var I=new Image;I.setAttribute("crossOrigin",m||"anonymous"),I.src=E;return new Promise((function(e){I.onload=function(){var t,n;p?(t=I,(n=document.createElement("canvas")).width=b+y,n.height=b+y,n.getContext("2d").drawImage(t,b,b,y,y),O(C)(b,b,y,y,p),C.fillStyle=C.createPattern(n,"no-repeat"),C.fill()):function(e){C.drawImage(e,b,b,y,y)}(I),e()}}))},O=function(e){return function(t,n,a,r,o){var l=Math.min(a,r);return o>l/2&&(o=l/2),e.beginPath(),e.moveTo(t+o,n),e.arcTo(t+a,n,t+a,n+r,o),e.arcTo(t+a,n+r,t,n+r,o),e.arcTo(t,n+r,t,n,o),e.arcTo(t,n,t+a,n,o),e.closePath(),e}},M=function(e){return(t=e,n=t.canvas,a=t.content,r=t.width,o=void 0===r?0:r,l=t.nodeQrCodeOptions,i=void 0===l?{}:l,i.errorCorrectionLevel=i.errorCorrectionLevel||z(a),j(a,i).then((function(e){return i.scale=0===o?void 0:o/e*4,D(n,a,i)}))).then((function(){return L(e)}));var t,n,a,r,o,l,i},T=function(e){return Z(this,void 0,void 0,(function(){var t,n,a,r,o,l,i;return P(this,(function(s){switch(s.label){case 0:return t=e.canvas,e.logo&&(R(e.logo)&&(e.logo={src:e.logo}),e.logo.crossOrigin="Anonymous"),this.ifCanvasDrawed?[3,2]:[4,M(e)];case 1:s.sent(),s.label=2;case 2:if(n=e.image,a=void 0===n?new Image:n,r=e.downloadName,o=void 0===r?"qr-code":r,l=e.download,!t.toDataURL())throw new Error("Can not get the canvas DataURL");return a.src=t.toDataURL(),this.ifImageCreated=!0,!0!==l&&"function"!=typeof l?[2]:(i=function(){q(a,o)},(l=!0===l?function(e){return e()}:l)&&l(i),[2,Promise.resolve()])}}))}))},q=function(e,t){var n=e.src,a=document.createElement("a");a.download=t,a.href=n,a.dispatchEvent(new MouseEvent("click"))},H=function(){function e(e){this.ifCanvasDrawed=!1,this.ifImageCreated=!1,this.defaultOption={canvas:document.createElement("canvas"),image:new Image,content:""},this.option=Object.assign(this.defaultOption,e)}return e.prototype.toCanvas=function(){var e=this;return M.call(this,this.option).then((function(){return e.ifCanvasDrawed=!0,Promise.resolve()}))},e.prototype.toImage=function(){return T.call(this,this.option)},e.prototype.downloadImage=function(e){return Z(this,void 0,void 0,(function(){return P(this,(function(t){switch(t.label){case 0:return this.ifImageCreated?[3,2]:[4,this.toImage()];case 1:t.sent(),t.label=2;case 2:return q(this.option.image,e),[2]}}))}))},e.prototype.getCanvas=function(){return Z(this,void 0,Promise,(function(){return P(this,(function(e){switch(e.label){case 0:return this.ifCanvasDrawed?[3,2]:[4,this.toCanvas()];case 1:e.sent(),e.label=2;case 2:return[2,this.option.canvas]}}))}))},e}(),_="assets/baseIcon.8abdbec4.png";const A=({data:e,onLeave:t})=>{const n=a.exports.useRef(null);return a.exports.useEffect((()=>{if(!n.current)return;const t=p(e);new H({image:n.current,content:t,width:380,logo:{src:e.customImg||_,logoRadius:8,borderSize:0}}).toImage()}),[e]),e?o.createElement(U,null,o.createElement(F,null,o.createElement(Q,{src:E,onClick:t})),o.createElement(Y,null,o.createElement(W,null,e.nameEn&&!l(e.nameZh)&&o.createElement(V,{value:e.nameZh||"",readOnly:!0}),e.nameEn&&!l(e.nameEn)&&o.createElement(V,{value:e.nameEn||"",readOnly:!0}))),o.createElement(B,null,o.createElement(G,null,o.createElement(K,{ref:n,alt:"qrCode"}))),o.createElement(N,null,e.addressZh&&!l(e.addressZh)&&o.createElement("div",null,e.addressZh),e.addressEn&&!l(e.addressEn)&&o.createElement("div",null,e.addressEn))):o.createElement(o.Fragment,null)},U=r.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  color: #fff;
  background-color: #12b188;
  position: absolute;
`,F=r.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  flex-shrink: 0;
`,Q=r.img`
  height: 20px;
  margin: 24px;
`,V=r(g)`
  font-size: 20px;
  line-height: 20px;
  text-shadow: none;
`,W=r.div`
  padding: 0 32px;
`,Y=r.div`
  width: 100%;
  height: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`,B=r.div`
  height: 100%;
  width: 100%;
  text-align: center;
`,G=r.div`
  height: 100%;
  max-height: 280px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`,K=r.img`
  display: inline-block;
  height: 100%;
  max-height: 300px;
  margin: 0 auto;
`,N=r.div`
  width: 100%;
  height: 50%;
  text-align: center;
`,X=()=>{const{t:e}=i("qr_generator"),t=a.exports.useRef(null),n=o.useRef(null),[r,l]=a.exports.useState(!1),[f,m]=a.exports.useState(null),[g,E]=s({typeEn:"Stores/Shopping Malls",typeZh:"商店/商場",nameEn:"CityWalk",nameZh:"荃新天地",type:"IMPORT",venueCode:"0",venueID:"WHBvLDSa",addressEn:"1 & 18 Yeung Uk Rd, Tsuen Wan, Hong Kong",addressZh:"荃灣楊屋道1號",customImg:null}),y=1===g.venueCode.length,b=8===g.venueID.length,w=y&&b;a.exports.useEffect((()=>{if(!t.current||!w)return;const e=p(g),n=new H({image:t.current,content:e,width:380,logo:{src:g.customImg||_,logoRadius:8,borderSize:0}});n.toImage(),m(n)}),[g,w]);return o.createElement($,null,o.createElement(v,{backPath:"/",name:e("name")}),o.createElement(J,{id:"scroll"},o.createElement(ee,null,o.createElement(te,{label:e("form.typeZh"),value:g.typeZh,onChange:e=>{E({typeZh:e.target.value})}}),o.createElement(te,{label:e("form.typeEn"),value:g.typeEn,onChange:e=>{E({typeEn:e.target.value})}}),o.createElement(te,{label:e("form.nameZh"),value:g.nameZh,onChange:e=>{E({nameZh:e.target.value})}}),o.createElement(te,{label:e("form.nameEn"),value:g.nameEn,onChange:e=>{E({nameEn:e.target.value})}}),o.createElement(te,{label:e("form.addressZh"),value:g.addressZh,onChange:e=>{E({addressZh:e.target.value})}}),o.createElement(te,{label:e("form.addressEn"),value:g.addressEn,onChange:e=>{E({addressEn:e.target.value})}}),o.createElement(te,{label:e("form.type"),value:g.type,onChange:e=>{E({type:e.target.value})}}),o.createElement(te,{label:e("form.venue_code"),value:g.venueCode,onChange:e=>{E({venueCode:e.target.value})},error:!y,inputProps:{maxLength:1}}),o.createElement(te,{label:e("form.venue_id"),value:g.venueID,onChange:e=>{E({venueID:e.target.value})},error:!b,inputProps:{maxLength:8}}),o.createElement(ne,null,o.createElement("div",null,e("form.custom_icon")),o.createElement(ae,{type:"file",name:"avatar",accept:"image/png, image/jpeg",ref:n,onChange:e=>{const t=Array.from(e.target.files||[]),n=h(t);if(n){const e=new FileReader;e.readAsDataURL(n),e.onload=()=>E({customImg:String(e.result)})}else E({customImg:null})}}))),o.createElement(c,null),o.createElement(oe,null,o.createElement(u,{"aria-label":"outlined primary button group"},o.createElement(d,{variant:"contained",size:"small",startIcon:o.createElement(x,null),onClick:()=>{f&&f.downloadImage("QR Code")},disabled:!w},e("global:button.save")),o.createElement(d,{variant:"contained",size:"small",startIcon:o.createElement(x,null),onClick:()=>{l(!0)},disabled:!w},e("global:button.preview")))),o.createElement(re,{ref:t,alt:"qrCode"})),r&&o.createElement(A,{data:g,onLeave:()=>{l(!1)}}))},$=r.div`
  width: 100%;
  height: 100%;
  background-color: #fff;
  display: flex;
  flex-direction: column;
`,J=r.div`
  width: 100%;
  height: 100%;
  overflow: auto;
`,ee=r(f)`
  padding: 8px 16px;
`,te=r(m)`
  &.MuiFormControl-root {
    margin-top: 8px;
  }
`,ne=r.div`
  font-size: 12px;
  padding: 4px 0;
  color: rgba(0, 0, 0, 0.54);
`,ae=r.input`
  padding: 4px 0;
`,re=r.img`
  width: 100%;
`,oe=r.div`
  margin-top: 16px;
  display: flex;
  justify-content: center;
`;export{X as default};
