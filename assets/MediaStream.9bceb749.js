import{s as e,l as t,r as a,a5 as r,R as n,a6 as o,a7 as i,a8 as s,a9 as c,aa as l,ab as d,L as m,Z as E}from"./vendor.edeed207.js";import{e as u}from"./index.6410030a.js";var p,_;(_=p||(p={})).GET_USER_MEDIA_NOT_FOUND="GET_USER_MEDIA_NOT_FOUND",_.CAMERA_ACTIVATE_ERROR="CAMERA_ACTIVATE_ERROR";const h=({onFrame:e,suppressError:_=!1})=>{const{t:h}=t("qr_reader"),{preferredCameraId:f}=u(),[A,R]=a.exports.useState(!1),[b,T]=a.exports.useState(!1),O=a.exports.useRef(null),w=a.exports.useRef(null),[y,M]=r((()=>{const t=w.current,a=O.current;if(t&&a&&a.readyState===a.HAVE_ENOUGH_DATA){const r=t.getContext("2d");if(!r)return;t.height=a.videoHeight,t.width=a.videoWidth,r.drawImage(a,0,0,t.width,t.height);const n=r.getImageData(0,0,t.width,t.height);e&&e(n)}}),!1),I=a.exports.useCallback((async()=>{const e=O.current;if(e)try{const t=await(async e=>{if(!("mediaDevices"in navigator))throw new Error(p.GET_USER_MEDIA_NOT_FOUND);try{return navigator.mediaDevices.getUserMedia({video:e?{deviceId:e}:{facingMode:"environment"},audio:!1})}catch(t){throw console.error(t),new Error(p.CAMERA_ACTIVATE_ERROR)}})("AUTO"===f?void 0:f);if(!t)return;e.srcObject=t,e.play(),M()}catch(t){if(t instanceof Error)switch(t.message){case p.GET_USER_MEDIA_NOT_FOUND:R(!0);break;case p.CAMERA_ACTIVATE_ERROR:if(_)return;T(!0);break;default:console.error(t)}}}),[M,f,_]);return a.exports.useEffect((()=>{const e=O.current;return I(),()=>{if(y(),e){const t=e.srcObject;if(!t)return;t.getTracks().forEach((e=>{e.stop()})),e.srcObject=null}}}),[M,y,O,I,f]),n.createElement(n.Fragment,null,n.createElement(g,{ref:O,playsInline:!0}),n.createElement(v,{ref:w}),n.createElement(o,{open:A,keepMounted:!0,"aria-labelledby":"unsupported-device-title","aria-describedby":"unsupported-device-description"},n.createElement(i,{id:"unsupported-device-title"},"不支援的裝置"),n.createElement(s,null,n.createElement(c,{id:"unsupported-device-description"},h("message.doesnt_support_get_user_media"),l&&n.createElement(n.Fragment,null,h("message.sure_latest_ios")))),n.createElement(d,null,n.createElement(m,{to:"/"},n.createElement(E,{color:"primary"},h("button.back_home"))))),n.createElement(o,{open:b,keepMounted:!0,"aria-labelledby":"camera-activation-title","aria-describedby":"camera-activation-description"},n.createElement(i,{id:"camera-activation-title"},h("dialog.cannot_open_camera.title")),n.createElement(s,null,n.createElement(c,{id:"camera-activation-description"},h("dialog.cannot_open_camera.content"))),n.createElement(d,null,n.createElement(m,{to:"/"},n.createElement(E,{color:"primary"},h("button.back_home"))),n.createElement(m,{to:"/cameraSetting"},n.createElement(E,{color:"primary"},h("button.camera_setting"))))))},g=e.video`
  /* Make video to at least 100% wide and tall */
  min-width: 100%;
  min-height: 100%;

  /* Setting width & height to auto prevents the browser from stretching or squishing the video */
  width: auto;
  height: auto;

  /* Center the video */
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`,v=e.canvas`
  display: none;
`;export{h as M};
