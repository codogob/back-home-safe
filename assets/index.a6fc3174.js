import{l as e,ac as a,ad as t,ae as r,b as c,w as l,af as m,s as d,ag as i}from"./vendor.edeed207.js";import{H as o}from"./Header.236956d2.js";import{M as n}from"./MediaStream.b7492a38.js";import{e as s}from"./index.ef0c0cc6.js";const f=()=>{const{t:d}=e("camera_setting"),{preferredCameraId:i,setPreferredCameraId:f,cameraList:E}=s();return React.createElement(u,null,React.createElement(o,{backPath:"/",name:d("name")}),React.createElement(h,null,React.createElement(v,null,React.createElement(a,{id:"cameraId"},d("form.camera_choice.label")),React.createElement(t,{labelId:"cameraId",id:"demo-simple-select",value:i,onChange:e=>{f(e.target.value||"AUTO")}},React.createElement(r,{value:"AUTO"},d("form.camera_choice.auto")),E.map((({deviceId:e,label:a})=>React.createElement(r,{value:e,key:"deviceId"},c(a)||l(a)?e:a)))),React.createElement(m,null,d("form.camera_choice.explain")))),React.createElement(p,null,React.createElement(n,{suppressError:!0})))},u=d.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #fff;
`,p=d.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
`,h=d.div`
  width: 100%;
  display: flex;
`,v=d(i)`
  width: 100%;

  &.MuiFormControl-root {
    margin: 8px;
  }
`;export{f as default};
