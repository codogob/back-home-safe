import{r as e,s as t,l as n,R as a,Z as l,ah as o,ai as r,aj as s,$ as i,w as c,ak as m,al as p,am as d}from"./vendor.edeed207.js";import{a as u,f as E,h as g}from"./index.ef0c0cc6.js";import{D as x}from"./Disclaimer.0a45b3aa.js";const _=()=>{const[t,n]=e.exports.useState(null),[a]=e.exports.useState(window.matchMedia("(display-mode: standalone)").matches||/\bmode=standalone\b/.test(window.location.hash)||"localhost"===window.location.hostname);return e.exports.useEffect((()=>{const e=e=>{e.preventDefault(),n(e)},t=e=>{e.preventDefault(),n(null)};return window.addEventListener("beforeinstallprompt",e),window.addEventListener("appinstalled",t),()=>{window.removeEventListener("beforeinstallprompt",e),window.removeEventListener("appinstalled",t)}}),[]),{prompt:t,promptToInstall:()=>t?t.prompt():Promise.reject(new Error('Tried installing before browser sent "beforeinstallprompt" event')),isInstalled:a}},v=()=>{const{t:t}=n("tutorial"),{prompt:o,promptToInstall:r}=_(),s=e.exports.useCallback((()=>{o&&r()}),[o,r]);return a.createElement(h,null,a.createElement(w,{src:"assets/plus.41401aa3.svg"}),a.createElement("div",null,t("add_to_home_screen.message.add_to_home_screen_first")),a.createElement("div",null,t("add_to_home_screen.message.to_act_as_an_app")),a.createElement(f,null,a.createElement("div",null,"IOS"),a.createElement("div",null,t("add_to_home_screen.step.ios")),a.createElement("div",null,"Android"),a.createElement("div",null,t("add_to_home_screen.step.android")),o&&a.createElement(b,null,a.createElement(l,{variant:"contained",onClick:s},t("global:button.install")))))},h=t.div`
  display: flex;
  width: 100%;
  min-height: 100%;
  justify-content: center;
  vertical-align: middle;
  flex-direction: column;
  text-align: center;
`,w=t.img`
  width: 100px;
  margin: 0 auto 32px auto;
`,b=t.div`
  margin-top: 12px;
`,f=t.div`
  font-size: 12px;
  margin: 24px 0;
`,S=()=>{const{t:e}=n("tutorial");return a.createElement(C,null,a.createElement("h2",null,e("disclaimer.name")),a.createElement(x,null))},C=t.div`
  width: 100%;
  text-align: center;

  & p {
    padding: 0 16px;
    font-size: 12px;
  }
`,A=()=>{const{t:e}=n("tutorial"),{language:t,setLanguage:l}=u();return a.createElement(D,null,a.createElement("h2",null,e("language.name")),a.createElement(k,{"aria-label":"language",name:"language",value:t,onChange:e=>{l(e.target.value)}},a.createElement(r,{value:E["ZH-HK"],control:a.createElement(s,null),label:"繁體中文"}),a.createElement(r,{value:E.EN,control:a.createElement(s,null),label:"English"})))},D=t.div`
  width: 100%;
  text-align: center;

  & p {
    padding: 0 16px;
    font-size: 12px;
  }

  & input {
    text-align: center;
  }
`,k=t(o)`
  &.MuiFormGroup-root {
    display: block;
  }
`,y=({value:e,onChange:t})=>{const{t:l}=n("tutorial");return a.createElement(T,null,a.createElement("h2",null,l("setup_password.name"),"(",l("global:form.optional"),")"),a.createElement("p",null,l("setup_password.message.password_usage")),a.createElement(i,{type:"password",autoComplete:"new-password",value:e,onChange:e=>{t(e.target.value)}}))},T=t.div`
  width: 100%;
  text-align: center;

  & p {
    padding: 0 16px;
    font-size: 12px;
  }

  & input {
    text-align: center;
  }
`;var L,I;(I=L||(L={})).LANGUAGE="LANGUAGE",I.ADD_TO_HOME_SCREEN="ADD_TO_HOME_SCREEN",I.DISCLAIMER="DISCLAIMER",I.SET_UP_PASSWORD="SET_UP_PASSWORD";const O=({setFinishedTutorial:t})=>{const{t:o}=n("tutorial"),{initPassword:r}=g(),[s,i]=e.exports.useState(0),[u,E]=e.exports.useState(""),{activeStepComponent:{component:x,nextButtonText:_},isLastStep:h,allStep:w}=e.exports.useMemo((()=>{const e=(({t:e,password:t,setPassword:n})=>[{key:L.LANGUAGE,name:e("language.name"),nextButtonText:e("global:button.next_page"),component:a.createElement(A,null)},{key:L.ADD_TO_HOME_SCREEN,name:e("add_to_home_screen.name"),nextButtonText:e("global:button.complete"),component:a.createElement(v,null)},{key:L.DISCLAIMER,name:e("disclaimer.name"),nextButtonText:e("disclaimer.accept"),component:a.createElement(S,null)},{key:L.SET_UP_PASSWORD,name:e("setup_password.name"),nextButtonText:c(t)?e("global:button.skip"):e("global:button.set"),component:a.createElement(y,{value:t,onChange:n})}])({password:u,setPassword:E,t:o});return{allStep:e,activeStepComponent:e[s]||{},isLastStep:s===e.length-1}}),[s,u,E,o]);return a.createElement(P,null,a.createElement(m,{activeStep:s,alternativeLabel:!0},w.map((({key:e,name:t})=>a.createElement(p,{key:e},a.createElement(d,null,t))))),a.createElement(R,null,x),a.createElement(M,null,a.createElement(l,{disabled:0===s,onClick:()=>{i((e=>e-1))}},o("global:button.last_page")),a.createElement(l,{variant:"contained",color:"secondary",onClick:()=>{h?(!c(u)&&r(u),t(!0)):i((e=>e+1))}},_||o(h?"global:button.complete":"global:button.next_page"))))},P=t.div`
  width: 100%;
  height: 100%;
  background-color: #fff;
  display: flex;
  flex-direction: column;
`,R=t.div`
  height: 100%;
  overflow: auto;
`,M=t.div`
  flex-shrink: 0;
  padding: 32px 24px;
  display: flex;
  justify-content: space-between;
`;export{O as default};
