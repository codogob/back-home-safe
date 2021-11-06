import{c as e,i as t,a}from"./createSvgIcon.fc4e5d62.js";import{r,l as n,R as o,$ as l,Z as c,w as s,S as i,A as d,s as m}from"./vendor.edeed207.js";import{h as u}from"./index.ef0c0cc6.js";import{c as p}from"./clearAllData.5cebeedf.js";var f={},v=t.exports,g=a.exports;Object.defineProperty(f,"__esModule",{value:!0});var x=f.default=void 0,h=g(r.exports),E=(0,v(e).default)(h.createElement("path",{d:"M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"}),"Lock");x=f.default=E;const b=()=>{const{t:e}=n("login"),[t,a]=r.exports.useState(""),{unlockStore:m}=u(),[f,v]=r.exports.useState(!1);return o.createElement(w,null,o.createElement(y,null,o.createElement(S,null),o.createElement("div",null,e("message.please_input_password")),o.createElement(k,{onSubmit:e=>{e.preventDefault(),m(t)||(v(!0),a(""))}},o.createElement(l,{type:"password",autoComplete:"current-password",value:t,onChange:e=>{a(e.target.value)}}),o.createElement(j,null,o.createElement(c,{variant:"contained",color:"secondary",disabled:s(t),type:"submit"},e("global:button.unlock")))),o.createElement(c,{onClick:p},e("button.reset"))),o.createElement(i,{open:f,autoHideDuration:2e3,onClose:()=>{v(!1)},anchorOrigin:{vertical:"top",horizontal:"center"}},o.createElement(d,{elevation:6,variant:"filled",severity:"error"},e("message.wrong_password"))))},w=m.div`
  width: 100%;
  height: 100%;
  background-color: #fff;
  display: flex;
  flex-direction: column;
`,y=m.div`
  display: flex;
  width: 100%;
  min-height: 100%;
  justify-content: center;
  vertical-align: middle;
  flex-direction: column;
  text-align: center;
`,S=m(x)`
  margin: 0 auto 32px auto;
`,j=m.div`
  margin-top: 12px;
`,k=m.form`
  font-size: 12px;
  margin: 24px 0;

  & input {
    text-align: center;
  }
`;export{b as default};
