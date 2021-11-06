import{l as e,R as t,Z as a,v as n,s as r,a0 as i}from"./vendor.edeed207.js";import{H as l}from"./Header.236956d2.js";import{C as o,l as c,t as s,d as m}from"./index.ef0c0cc6.js";const d=({confirmPageIcon:r,setConfirmPageIcon:d})=>{const{t:E}=e("confirm_page_setting");return t.createElement(f,null,t.createElement(l,{backPath:"/",name:E("name")}),t.createElement(g,null,t.createElement(p,null,t.createElement("div",null,E("form.custom_icon")),t.createElement(u,{type:"file",name:"avatar",accept:"image/png, image/jpeg",onChange:e=>{const t=Array.from(e.target.files||[]),a=i(t);if(a){const e=new FileReader;e.readAsDataURL(a),e.onload=()=>d(String(e.result))}else d(null)}})),r&&t.createElement(v,null,t.createElement(a,{variant:"contained",size:"small",onClick:()=>{d(null)},disabled:!r},E("button.remove_icon"))),t.createElement(h,null,t.createElement(o,{confirmPageIcon:r,travelRecord:{id:n(),nameEn:E("message.test_place"),type:c.PLACE,inputType:s.MANUALLY,inTime:m().toISOString()},readOnly:!0}))))},f=r.div`
  width: 100%;
  height: 100%;
  background-color: #fff;
  display: flex;
  flex-direction: column;
`,g=r.div`
  width: 100%;
  height: 100%;
  overflow: auto;
`,p=r.div`
  font-size: 12px;
  padding: 4px;
  color: rgba(0, 0, 0, 0.54);
`,u=r.input`
  padding: 4px 0;
`,v=r.div`
  margin-top: 16px;
  display: flex;
  justify-content: center;
`,h=r.div`
  background-color: #12b188;
  margin-top: 20px;
  height: 100vh;
  width: 100vw;
  transform: scale(0.7);
  transform-origin: 50% 0;
`;export{d as default};
