import{l as e,r as t,m as a,t as n,q as r,v as i,R as o,s,w as d}from"./vendor.edeed207.js";import{Q as l,q as m}from"./QRCodeReader.25ff1f5d.js";import{H as c}from"./Header.236956d2.js";import{u,a as f,b as p,g as h,d as g,l as x,t as v}from"./index.ddef73af.js";import"./MediaStream.03398744.js";const E=()=>{const{t:s}=e("qr_reader"),[m,E]=t.exports.useState(null),k=a(),{createTravelRecord:T}=u(),{language:q}=f();return t.exports.useEffect((()=>{if(!m)return;const e=p(m);if(!e||!h(e,q))return;const t=n(r("","nameZh",e)),a=n(r("","nameEn",e)),o=i(),s=g(),d={id:i(),venueId:e.venueId,nameZh:t,nameEn:a,type:x.PLACE,inputType:v.SCAN,inTime:s.toISOString(),outTime:s.add(4,"hour").toISOString(),originalData:e};T(d),k.push({pathname:`/confirm/${o}`,state:d})}),[m,k]),o.createElement(b,null,o.createElement(c,{backPath:"/",name:s("name")}),o.createElement(j,null,s("message.scan_qr_code")),o.createElement(S,null,o.createElement(w,null),o.createElement(l,{onDecode:({data:e})=>{if(!e||d(e))return;p(e)&&E(e)}})))},b=s.div`
  width: 100%;
  height: 100%;
  text-shadow: 0px 1px 2px rgba(0, 0, 0, 0.8);
  display: flex;
  flex-direction: column;
`,S=s.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
`,w=s.div`
  /* The image used */
  background-image: url("${m}");

  /* Full height */
  height: 100%;

  /* Center and scale the image nicely */
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  z-index: 50;
  position: relative;
`,j=s.div`
  position: absolute;
  z-index: 51;
  bottom: 20%;
  width: 100%;
  text-align: center;
  color: #ffffff;
  font-size: 16px;
`;export{E as default};
