import{l as e,r as t,m as a,t as n,q as r,v as i,R as o,s,w as d}from"./vendor.edeed207.js";import{Q as l,q as c}from"./QRCodeReader.19f521a7.js";import{H as m}from"./Header.236956d2.js";import{u,a as p,b as f,g as h,d as g,l as x,t as v}from"./index.ef0c0cc6.js";import"./MediaStream.b7492a38.js";const b=()=>{const{t:s}=e("qr_reader"),[c,b]=t.exports.useState(null),k=a(),{createTravelRecord:T}=u(),{language:q}=p();return t.exports.useEffect((()=>{if(!c)return;const e=f(c);if(!e||!h(e,q))return;const t=n(r("","nameZh",e)),a=n(r("","nameEn",e)),o=i(),s=g(),d={id:i(),venueId:e.venueId,nameZh:t,nameEn:a,type:x.PLACE,inputType:v.SCAN,inTime:s.toISOString(),outTime:s.add(4,"hour").toISOString(),originalData:e};T(d),k.push({pathname:`/confirm/${o}`,state:d})}),[c,k]),o.createElement(E,null,o.createElement(m,{backPath:"/",name:s("name")}),o.createElement(j,null,s("message.scan_qr_code")),o.createElement(S,null,o.createElement(w,null),o.createElement(l,{onDecode:({data:e})=>{if(!e||d(e))return;f(e)&&b(e)}})))},E=s.div`
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
  background-image: url("${c}");

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
`;export{b as default};
