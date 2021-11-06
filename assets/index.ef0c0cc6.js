var e=Object.defineProperty,t=Object.defineProperties,a=Object.getOwnPropertyDescriptors,n=Object.getOwnPropertySymbols,o=Object.prototype.hasOwnProperty,r=Object.prototype.propertyIsEnumerable,i=(t,a,n)=>a in t?e(t,a,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[a]=n,s=(e,t)=>{for(var a in t||(t={}))o.call(t,a)&&i(e,a,t[a]);if(n)for(var a of n(t))r.call(t,a)&&i(e,a,t[a]);return e},l=(e,n)=>t(e,a(n));import{i as c,a as d,s as u,r as m,R as p,C as g,b as f,u as h,c as v,d as _,e as x,f as y,g as b,p as E,h as k,v as w,j as R,k as C,l as S,m as T,n as A,o as O,t as L,q as I,w as P,M as D,P as H,S as M,A as N,x as V,y as z,T as U,L as j,z as q,B,D as Z,W as K,E as F,F as Y,G as W,H as Q,I as $,J,K as X,N as G,O as ee,Q as te,U as ae}from"./vendor.edeed207.js";var ne,oe;!function(){const e=document.createElement("link").relList;if(!(e&&e.supports&&e.supports("modulepreload"))){for(const e of document.querySelectorAll('link[rel="modulepreload"]'))t(e);new MutationObserver((e=>{for(const a of e)if("childList"===a.type)for(const e of a.addedNodes)"LINK"===e.tagName&&"modulepreload"===e.rel&&t(e)})).observe(document,{childList:!0,subtree:!0})}function t(e){if(e.ep)return;e.ep=!0;const t=function(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),"use-credentials"===e.crossorigin?t.credentials="include":"anonymous"===e.crossorigin?t.credentials="omit":t.credentials="same-origin",t}(e);fetch(e.href,t)}}(),(oe=ne||(ne={}))["ZH-HK"]="zh-HK",oe.EN="en";const re={global:{disclaimer:{1:"back-home-safe (hereinafter called ‘this software’) is only used for academic use around PWA (Progressive WebApps). To demonstrate the implementation of native app features on the web (like QR Code Scanner, front-end encryption, etc.).",2:"This software is not in any way endorsed by nor affiliated with the Government of the HKSAR. It is not the official contact tracing app. DO NOT use this software as a substitute for the official LeaveHomeSafe application.",3:"The author takes no responsibility and legal liability for any misuse of this software, and reserves the right to seek all remedies available by law for any violation of these Terms of Use."},button:{last_page:"Last Page",next_page:"Next Page",complete:"Complete",install:"Install",set:"Set",skip:"Skip",leave:"Leave",save:"Save",preview:"Preview",unlock:"Unlock",change:"Change",confirm:"Confirm",confirm_page:"Confirm Page"},form:{optional:"Optional"}},tutorial:{add_to_home_screen:{name:"Add to Home screen",message:{add_to_home_screen_first:"First things first: add to Home screen.",to_act_as_an_app:"For a full-native app experience."},step:{ios:'Launch with "Safari" => Tap the "Share" icon at the bottom of the screen (a box with an upward-pointing arrow) => Tap "Add to Home screen"',android:'Launch with "Chrome" => Tap the menu icon (3 dots in upper right-hand corner) => Tap "Add to Home screen".'}},disclaimer:{name:"Disclaimer",accept:"I agree"},setup_password:{name:"Setup Password",message:{password_usage:"Setup password to protect your Visit Records."}},language:{name:"Language"}},main_screen:{home:{name:"Home",record_your_visit:"Record your visit",you_have_entered:"You have entered",form:{venue_name:{label:"I want to go",placeholder:"Venue Name"},taxi:{label:"I'm taking",placeholder:"Taxi Reg Mark"}},button:{go:"Let's Go!",scan_qr_code:"Scan QR Code",ride:"Let's Go!"}},travel_record:{name:"Visit Records",message:{incognito_activated:"Incognito Mode Activated",empty:"No Visit Record",auto_remove_record:"Record will be auto deleted after {{day}} day(s)"}},setting:{name:"Settings",section:{common:"Common",lab:"Lab",version:"Version"},item:{camera_setting:"Camera Settings",confirm_page_setting:"Confirm Page Settings",incognito_mode:{name:"Incognito Mode",explanation:"Stop saving visit record"},qr_generator:"QR Code Generator",reset:"Reset All Data",about_us:"About BackHomeSafe",disclaimer:"Disclaimer",change_log:"Change Log",report_issue:"Bug Report",language:"Language",auto_delete_record:"Auto Delete Record",export_data:"Export Records",vaccinationQRReader:"Vaccination QR Code Reader"},form:{day:"day",days:"days"}},bookmark:{name:"Bookmark",message:{empty:"No Bookmark"}}},qr_reader:{name:"Scan the QR Code",message:{scan_qr_code:"Scan the QR Code",doesnt_support_get_user_media:"This device doesn't support getUserMedia API",sure_latest_ios:"Make sure the device is running the latest version of iOS"},button:{back_home:"Back To Home Screen",camera_setting:"Camera Setting"},dialog:{cannot_open_camera:{title:"Cannot activate camera",content:"Cannot activate camera, please go to camera setting page change camera source."}}},qr_generator:{name:"QR Generator",form:{typeZh:"Venue Type(Chinese) (typeZh)",typeEn:"Venue Type(English) (typeEn)",nameZh:"Venue Name(Chinese) (nameZh)",nameEn:"Venue Name(English) (nameEn)",addressZh:"Venue Address(Chinese) (Only for preview)",addressEn:"Venue Address(English) (Only for preview)",type:"Type",venue_code:"Venue Code (Don't touch)",venue_id:"Venue ID (Don't touch)",custom_icon:"Custom Icon"}},login:{message:{please_input_password:"Please Unlock",wrong_password:"Wrong Password"},button:{reset:"Clear All Data"}},disclaimer:{name:"Disclaimer",message:{you_accepted:"By using the software, you have agreed"}},confirm:{message:{you_have_entered_taxi:"You have entered taxi",res_mark:"Registration Mark",you_have_entered_venue:"You have entered the venue",remember_to_leave:'Remember to press the "Leave Venue" button',set_auto_leave_time:"Set Auto-leave Time",enter_at:"Enter Venue at {{time}}",auto_leave_at:"Auto-leave at {{time}}",you_sure_want_to_leave:"Are you leaving now？",when_you_left:"When did you leave？",future_leave_time:"Leave time cannot be future",leave_time_earlier_than_enter:"Leave time cannot be earlier than enter time"},form:{auto_leave_after_x_hour:"Auto leave after {{hour}} hour(s)",auto_leave_at:"Auto Leave at {{time}}",hour:"Hours"},button:{leave:"Leave Venue",get_off:"Get Off",leave_now:"Yes, I'm leaving now",already_left:"I've already left"}},confirm_page_setting:{name:"Confirm Page Settings",message:{test_place:"Test Venue"},form:{custom_icon:"Custom Icon"},button:{remove_icon:"Remove Icon"}},camera_setting:{name:"Camera Settings",form:{camera_choice:{auto:"AUTO",label:"Camera Source",explain:"Change camera source until there is a preview"}}},vaccination_qr_reader:{name:"Scan the QR Code",message:{scan_qr_code:"Scan the QR Code",doesnt_support_get_user_media:"This device doesn't support getUserMedia API",sure_latest_ios:"Make sure the device is running the latest version of iOS"},button:{back_home:"Back To Home Screen",camera_setting:"Camera Setting"},dialog:{cannot_open_camera:{title:"Cannot activate camera",content:"Cannot activate camera, please go to camera setting page change camera source."}}}};const ie={global:{disclaimer:{1:"安心回家（下簡稱「本軟件」）只用作漸進式網路應用程式 (Progressive WebApps) 學術討論用途， 用於示範不同 mobile app 功能於網頁上的實現方式（如QR code 掃瞄，前端資料加密等等）。",2:"本軟件未有以任何方式得到香港特別行政區政府（下簡稱「特區政府」）的認可。與特區政府推出的「安心出行」應用程式沒有任何關係，亦不是特區政府官方的追踪程式。因此本軟件不應取代特區政府「安心出行」應用程式。",3:"任何人士在使用本軟件作任何用途前，應先尋求獨立的法律意見或其他專業意見。用戶若因使用／未能使用本軟件，或以本軟件作任何誤用行為引致的損失、損害、法律責任或其他後果，作者概不會承擔任何法律責任，並保留追究權利。"},button:{last_page:"上一頁",next_page:"下一頁",complete:"完成",install:"安裝",set:"設定",skip:"跳過",leave:"離開",save:"儲存",preview:"預覽",unlock:"解鎖",change:"變更",confirm:"確認",confirm_page:"確認頁"},form:{optional:"選用"}},tutorial:{add_to_home_screen:{name:"新增至主畫面",message:{add_to_home_screen_first:"新增至主畫面先啦",to_act_as_an_app:"唔係點似個App"},step:{ios:"用Safari開=>分享=>新增至主畫面",android:"用Chrome開=>右上選項=>新增至主畫面/安裝應用程式"}},disclaimer:{name:"免責聲明",accept:"我同意"},setup_password:{name:"設定密碼",message:{password_usage:"密碼用於加密出行紀錄"}},language:{name:"語言"}},main_screen:{home:{name:"主頁",record_your_visit:"記錄你的到訪",you_have_entered:"你已進入",form:{venue_name:{label:"我想去",placeholder:"輸入地址"},taxi:{label:"我搭緊",placeholder:"輸入車牌"}},button:{go:"話去就去!",scan_qr_code:"掃瞄二維碼",ride:"話搭就搭!"}},travel_record:{name:"出行紀錄",message:{incognito_activated:"隱私模式已開啟",empty:"沒有出行紀錄",auto_remove_record:"紀錄在{{day}}天後自動刪除"}},setting:{name:"設定",section:{common:"常用",lab:"實驗室",version:"版本"},item:{camera_setting:"相機設定",confirm_page_setting:"確認頁設定",incognito_mode:{name:"隱私模式",explanation:"不儲存出行紀錄"},qr_generator:"生成二維碼",reset:"重設所有資料",about_us:"關於安心回家",disclaimer:"免責聲明",change_log:"更新紀錄",report_issue:"回報問題",language:"語言",auto_delete_record:"自動刪除紀錄",export_data:"導出紀錄",vaccinationQRReader:"讀取電子針卡二維碼"},form:{day:"天",days:"天"}},bookmark:{name:"書籤",message:{empty:"沒有書籤"}}},qr_reader:{name:"掃瞄二維碼",message:{scan_qr_code:"掃瞄二維碼",doesnt_support_get_user_media:"此裝置不支援 getUserMedia API",sure_latest_ios:"，請確保裝置在最新的IOS版本"},button:{back_home:"回到主頁",camera_setting:"相機設定"},dialog:{cannot_open_camera:{title:"未能開啟相機鏡頭",content:"未能開啟相機鏡頭，請到相機設定進行設置"}}},qr_generator:{name:"生成二維碼",form:{typeZh:"場所種類(中文) (typeZh)",typeEn:"場所種類(英文) (typeEn)",nameZh:"場所名字(中文) (nameZh)",nameEn:"場所名字(英文) (nameEn)",addressZh:"場所地址(中文) (預覽用)",addressEn:"場所地址(英文) (預覽用)",type:"類型",venue_code:"場地編碼 (唔知唔好搞)",venue_id:"場地ID (唔知唔好搞)",custom_icon:"自定Icon"}},login:{message:{please_input_password:"請輸入密碼解鎖",wrong_password:"密碼錯誤"},button:{reset:"重設所有資料"}},disclaimer:{name:"免責聲明",message:{you_accepted:"使用此軟件代表你已同意"}},confirm:{message:{you_have_entered_taxi:"你已進入的士",res_mark:"車牌號碼",you_have_entered_venue:"你已進入場所",remember_to_leave:'當你離開時請緊記按"離開"',set_auto_leave_time:"設罝自動離開時間",enter_at:"於{{time}} 進入場所",auto_leave_at:"於{{time}} 自動離開",you_sure_want_to_leave:"你現在要離開嗎？",when_you_left:"你是什麼時候離開？",future_leave_time:"離開日期不能是未來",leave_time_earlier_than_enter:"離開日期不能早於進入日期"},form:{auto_leave_after_x_hour:"{{hour}}小時後自動離開",auto_leave_at:"於{{time}} 自動離開",hour:"小時"},button:{leave:"離開場所",get_off:"下車",leave_now:"是的，我現在要離開",already_left:"我已經離開了"}},confirm_page_setting:{name:"確認頁設定",message:{test_place:"測試地點"},form:{custom_icon:"自定Icon"},button:{remove_icon:"移除Icon"}},camera_setting:{name:"相機設定",form:{camera_choice:{auto:"自動",label:"相機選擇",explain:"調較相機選項，直至有相機畫面顯示"}}},vaccination_qr_reader:{name:"掃瞄二維碼",message:{scan_qr_code:"掃瞄二維碼",doesnt_support_get_user_media:"此裝置不支援 getUserMedia API",sure_latest_ios:"，請確保裝置在最新的IOS版本"},button:{back_home:"回到主頁",camera_setting:"相機設定"},dialog:{cannot_open_camera:{title:"未能開啟相機鏡頭",content:"未能開啟相機鏡頭，請到相機設定進行設置"}}}};c.use(d).init({resources:{[ne["ZH-HK"]]:ie,[ne.EN]:re},lng:ne["ZH-HK"],fallbackLng:ne["ZH-HK"],interpolation:{escapeValue:!1},debug:!0});const se={},le=function(e,t){return t&&0!==t.length?Promise.all(t.map((e=>{if((e=`${e}`)in se)return;se[e]=!0;const t=e.endsWith(".css"),a=t?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${e}"]${a}`))return;const n=document.createElement("link");return n.rel=t?"stylesheet":"modulepreload",t||(n.as="script",n.crossOrigin=""),n.href=e,document.head.appendChild(n),t?new Promise(((e,t)=>{n.addEventListener("load",e),n.addEventListener("error",t)})):void 0}))).then((()=>e())):e()},ce=()=>{const[e,t]=m.exports.useState(!1);return m.exports.useEffect((()=>{const e=setTimeout((()=>t(!0)),200);return()=>{clearTimeout(e)}})),e?p.createElement(de,null,p.createElement(ue,null,p.createElement(g,null))):null},de=u.div`
  z-index: 1000;
  position: absolute;
  top: 50%; /* position the top  edge of the element at the middle of the parent */
  left: 50%; /* position the left edge of the element at the middle of the parent */

  transform: translate(
    -50%,
    -50%
  ); /* This is a shorthand of
                                         translateX(-50%) and translateY(-50%) */
`,ue=u.div`
  background-color: #fff;
  padding: 40px;
  border-radius: 8px;
`,me=(e,t)=>v.exports.AES.encrypt(e,t).toString(),pe=({key:e,defaultValue:t,passthroughOnly:a=!1})=>{const[n,o]=h("incognito",!1),[r]=m.exports.useState(t),[i,s]=m.exports.useState(null),[l,c,d]=h(e,a?void 0:i?me(JSON.stringify(r),i):JSON.stringify(r)),u=m.exports.useMemo((()=>{try{if(!l)return!1;JSON.parse(l)}catch(e){return!0}return!1}),[l]),[p,g]=m.exports.useState(!u&&l?JSON.parse(l):r),[x,y]=m.exports.useState(!u);_((()=>{if(!x||n||a)return;if(u&&!i)return;const e=JSON.stringify(p);console.log(e),c(i?me(e,i):e)}),[p]);const b=m.exports.useCallback((e=>{if(u||a)return;const t=me(l||JSON.stringify(r),e);c(t),s(e)}),[a,l,c,r,u]),E=m.exports.useCallback((e=>{if(!u)return!0;try{const t=((e,t)=>v.exports.AES.decrypt(e,t).toString(v.exports.enc.Utf8))(l||JSON.stringify(r),e);return g(JSON.parse(t)),s(e),y(!0),!0}catch(t){return!1}}),[r,l,u]),k=m.exports.useCallback((()=>{u&&(y(!1),s(null),g(r))}),[u,r]);return{isEncrypted:u,unlockStore:E,lockStore:k,value:p,setValue:g,initPassword:b,unlocked:x,incognito:n,setIncognito:o,password:i,destroy:d,hasData:!f(l)}};var ge,fe,he,ve;(fe=ge||(ge={})).MANUALLY="MANUALLY",fe.SCAN="SCAN",fe.BOOKMARK="BOOKMARK",(ve=he||(he={})).PLACE="PLACE",ve.TAXI="TAXI";const[_e,xe]=x((()=>{const{unlockStore:e,lockStore:t,value:a,setValue:n,initPassword:o,unlocked:r,incognito:i,setIncognito:c,isEncrypted:d,password:u}=pe({key:"data",defaultValue:{travelRecords:[],savedLocations:[]}}),{unlockStore:p,value:g,unlocked:f,isEncrypted:h,destroy:v,hasData:_}=pe({key:"travel_record",defaultValue:[],passthroughOnly:!0}),{unlockStore:x,value:y,unlocked:b,isEncrypted:E,destroy:k,hasData:w}=pe({key:"bookmark_location",defaultValue:[],passthroughOnly:!0}),R=m.exports.useMemo((()=>(!_||f)&&(!w||b)),[f,b,_,w]),C=m.exports.useCallback((t=>{if(d){if(!e(t))return!1}if(_&&h){if(!p(t))return!1}if(w&&E){if(!x(t))return!1}return(h||E)&&o(t),!0}),[e,p,_,x,w,d,E,h,o]),S=r&&R;return m.exports.useEffect((()=>{S&&(_&&(n((e=>l(s({},e),{travelRecords:g}))),v()),_&&(n((e=>l(s({},e),{savedLocations:y}))),k()))}),[S,y,g,n,k,v,_]),{value:a,setValue:n,lockStore:t,unlockStore:C,initPassword:o,unlocked:S,incognito:i,setIncognito:c,isEncrypted:d,password:u}})),ye=e=>y(e).locale(c.language.toLowerCase()),[be,Ee]=x((()=>{const[e,t]=m.exports.useState(ye());return b((()=>{t(ye())}),1e3),{currentTime:e}}));var ke;!function(e){e.PLACE="PLACE",e.TAXI="TAXI"}(ke||(ke={}));const we=E(["venueId","nameEn","nameZh","type","originalData"]),[Re,Ce]=x((()=>{const{currentTime:e}=Ee(),{value:{savedLocations:t},setValue:a}=xe(),n=m.exports.useCallback((e=>{a((t=>l(s({},t),{savedLocations:k((({id:t})=>t===e),t.savedLocations)})))}),[a]),o=m.exports.useCallback((t=>{a((a=>l(s({},a),{savedLocations:[l(s({},we(t)),{createdAt:e.toISOString(),id:w()}),...a.savedLocations]})))}),[a,e]),r=m.exports.useCallback((e=>{const a=we(e),n=R((e=>{const t=we(e);return C(a,t)}),t);return n?n.id:null}),[t]);return{bookmarkLocation:t,removeBookmarkLocation:n,createBookmarkLocation:o,getBookmarkLocationId:r}})),[Se,Te]=x((()=>{const[e,t]=h("language",ne["ZH-HK"]),{i18n:a}=S();return m.exports.useEffect((()=>{a.changeLanguage(e)}),[a,e]),{language:e||ne["ZH-HK"],setLanguage:t}}));var Ae;!function(e){e.MANUALLY="MANUALLY",e.SCAN="SCAN",e.BOOKMARK="BOOKMARK"}(Ae||(Ae={}));const Oe=e=>e.sort(((e,t)=>ye(e.inTime).isSame(t.inTime)?0:ye(e.inTime).isBefore(t.inTime)?1:-1)),[Le,Ie]=x((()=>{const{currentTime:e}=Ee(),{value:{travelRecords:t},setValue:a}=xe(),n=T(),[o,r]=h("auto_remove_record_after",30),{pastTravelRecord:i,currentTravelRecord:c}=m.exports.useMemo((()=>{const{pastTravelRecord:a,currentTravelRecord:n}=t.reduce(((t,a)=>a.outTime&&ye(a.outTime).isBefore(e)?{pastTravelRecord:[a,...t.pastTravelRecord],currentTravelRecord:[...t.currentTravelRecord]}:{pastTravelRecord:[...t.pastTravelRecord],currentTravelRecord:[a,...t.currentTravelRecord]}),{pastTravelRecord:[],currentTravelRecord:[]});return{pastTravelRecord:Oe(a),currentTravelRecord:Oe(n)}}),[t,e]);m.exports.useEffect((()=>{a((t=>l(s({},t),{travelRecords:t.travelRecords.filter((({inTime:t})=>e.diff(t,"day")<=(o||30)))})))}),[e,a,o]);const d=m.exports.useCallback((e=>{a((t=>l(s({},t),{travelRecords:[e,...t.travelRecords]})))}),[a]),u=m.exports.useCallback((e=>R((({id:t})=>t===e),t)),[t]),p=m.exports.useCallback(((e,t)=>{a((a=>{const n=A((({id:t})=>t===e),a.travelRecords);return n<0?a:l(s({},a),{travelRecords:O(n,(e=>s(s({},e),t)),a.travelRecords)})}))}),[a]),g=m.exports.useCallback((e=>{a((t=>l(s({},t),{travelRecords:k((({id:t})=>t===e),t.travelRecords)})))}),[a]),f=m.exports.useCallback((e=>{const t=w(),a=ye(),o=l(s({},e),{id:t,inTime:a.toISOString(),outTime:a.add(4,"hour").toISOString()});d(o),n.push({pathname:`/confirm/${t}`,state:o})}),[d,n]);return{travelRecords:t,currentTravelRecord:c,pastTravelRecord:i,createTravelRecord:d,getTravelRecord:u,updateTravelRecord:p,removeTravelRecord:g,setAutoRemoveRecordDay:r,autoRemoveRecordDay:o,enterLocation:f}})),Pe=e=>{if(!e.startsWith("HKEN:"))return null;const t=e.substring(6,14),a=e.substring(14),n=JSON.parse(decodeURIComponent(escape(window.atob(a))));return l(s({},n),{venueId:t})},De=(e,t)=>{if(!e)return"";const a=L(I("","nameZh",e)),n=L(I("","nameEn",e)),o=L(I("","venueId",e)),r=P(a)?P(n)?o:n:a,i=P(n)?P(a)?o:a:n;return t===ne.EN?i:r},He=e=>{const t=`HKEN${e}2020`;return v.exports.SHA256(t).toString()},Me=({typeEn:e,typeZh:t,nameEn:a,nameZh:n,type:o,venueCode:r,venueID:i})=>{const s={metadata:P(e)&&P(t)?null:{typeEn:e,typeZh:t},nameZh:n,nameEn:a,type:o,hash:He(i)};return`HKEN:${r}${i}${window.btoa(unescape(encodeURIComponent(JSON.stringify(s))))}`};var Ne="assets/crossBlack.90bdd67d.svg";const Ve=u.button`
  display: block;
  margin: auto;
  margin-bottom: 16px;
  font-size: 24px;
  padding: 10px 0;
  width: 80%;
  border-radius: 48px;
  flex-shrink: 0;
  max-width: 280px;
  font-weight: 500;

  ${e=>e.disabled?"background-color: #D3D3D3;\n        color: #A1A1A1;\n        ":"\n        background-color: #fed426;\n      "}

  border: 0;
  outline: none;
  ${e=>e.shadowed?"box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.5);":""}

  &:focus {
    outline: none;
    text-decoration: none;
  }
`,ze=u(Ve)`
  font-size: 16px;
  padding: 12px 0;
  width: 90%;
  font-weight: unset;
`,Ue=({isModalOpen:e,onCancel:t,onLeaveNow:a,onLeaved:n,place:o,date:r,outTime:i,venueType:s})=>{const{t:l}=S("confirm"),c=m.exports.useMemo((()=>y(i)),[i]),d=i?430:390;return p.createElement(D,{isOpen:e,onRequestClose:t,style:{overlay:{backgroundColor:"rgba(0, 0, 0, 0.5)"},content:{outline:"none",border:"0",padding:"16px",borderRadius:"8px",width:"240px",position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)",height:s===ke.TAXI?`${d+24}px`:`${d}px`,overflow:"hidden"}},ariaHideApp:!1},p.createElement(qe,null,p.createElement(je,{src:Ne,onClick:t})),s===ke.TAXI?p.createElement(p.Fragment,null,p.createElement(Ke,null,l("message.you_have_entered_taxi")),p.createElement(Fe,null,l("message.res_mark"),":")):p.createElement(Ke,null,l("message.you_have_entered_venue")),p.createElement(We,null,o),p.createElement(Ye,null,r.format("YYYY-MM-DD HH:mm")),p.createElement(Be,null,l("message.you_sure_want_to_leave")),i&&p.createElement(Qe,null,l("form.auto_leave_at",{time:c.format("MM-DD HH:mm")})),p.createElement(ze,{onClick:a},l("button.leave_now")),p.createElement(Ze,{onClick:n}," ",l("button.already_left")))},je=u.img`
  height: 20px;
`,qe=u.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  margin-bottom: 8px;
`,Be=u.div`
  font-size: 20px;
  text-align: center;
  margin: 64px 0;
  font-weight: 500;
`,Ze=u(ze)`
  background-color: #12b188;
  color: #fff;
  text-shadow: 0px 1px 2px rgba(0, 0, 0, 0.8);
`,Ke=u.div`
  text-align: center;
  font-size: 16px;
`,Fe=u(Ke)`
  margin-top: 8px;
`,Ye=u.div`
  text-align: center;
  font-size: 14px;
`,We=u.div`
  color: unset;
  text-shadow: none;
  text-align: center;
  font-size: 28px;
  font-weight: 500;
  line-height: 48px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`,Qe=u.div`
  font-size: 12px;
  text-align: center;
  padding: 12px 0;
`;const $e=m.exports.forwardRef(((e,t)=>{const[a,n]=m.exports.useState(null);return m.exports.useImperativeHandle(t,(()=>({init:()=>{const e=document.querySelector(".js-inline-picker");e&&n(new H(e,{inline:!0,rows:2}))},getValue:()=>a?a.getDate():""}))),p.createElement(Je,null,p.createElement("div",{className:"js-inline-picker"}))})),Je=u.div`
  & .picker {
    font-size: 12px;
  }

  & .picker-dialog {
    border: 0;
  }

  & .picker-cell:before {
    background-image: unset;
  }

  & .picker-cell:after {
    background-image: unset;
  }

  & .picker-picked {
    color: unset;
    border-top: #12b188 1px solid;
    border-bottom: #12b188 1px solid;
  }

  & .picker-cell {
    padding: 0 4px;
  }

  & .picker-item {
    padding: 3px 0px;
  }

  & .picker-cell + .picker-cell {
    border: 0;
  }
`,Xe=({isModalOpen:e,onCancel:t,onConfirm:a,date:n})=>{const{t:o}=S("confirm"),{currentTime:r}=Ee(),i=m.exports.useRef(null),[s,l]=m.exports.useState(!1),[c,d]=m.exports.useState(!1);return p.createElement(D,{isOpen:e,onRequestClose:t,style:{overlay:{backgroundColor:"rgba(0, 0, 0, 0.5)"},content:{outline:"none",border:"0",padding:"16px",borderRadius:"8px",width:"240px",position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)",height:"280px",overflow:"hidden"}},ariaHideApp:!1,onAfterOpen:()=>{i.current&&i.current.init()}},p.createElement(et,null,p.createElement(Ge,{src:Ne,onClick:t})),p.createElement(tt,null,o("message.when_you_left")),p.createElement(at,null,p.createElement($e,{ref:i})),p.createElement(ze,{onClick:()=>{const e=i.current?i.current.getValue():Date(),t=ye(e).startOf("minute");t.isBefore(n.startOf("minute"))?l(!0):t.isAfter(r)?d(!0):a(t)}},o("global:button.confirm")),p.createElement(M,{open:s,autoHideDuration:2e3,onClose:()=>{l(!1)},anchorOrigin:{vertical:"top",horizontal:"center"}},p.createElement(N,{elevation:6,variant:"filled",severity:"error"},o("message.leave_time_earlier_than_enter"))),p.createElement(M,{open:c,autoHideDuration:2e3,onClose:()=>{d(!1)},anchorOrigin:{vertical:"top",horizontal:"center"}},p.createElement(N,{elevation:6,variant:"filled",severity:"error"},o("message.future_leave_time"))))},Ge=u.img`
  height: 20px;
`,et=u.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
`,tt=u.div`
  font-size: 20px;
  text-align: center;
  margin-top: 24px;
`,at=u.div`
  border-bottom: 1px #eeeeee solid;
  border-top: 1px #eeeeee solid;
  padding: 32px 0;
  margin: 16px 0;
`,nt=({id:e,visible:t,onDiscard:a,onFinish:n})=>{const{currentTime:o}=Ee(),{getTravelRecord:r}=Ie(),[i,s]=m.exports.useState(!1),{language:l}=Te(),c=m.exports.useMemo((()=>r(e)),[e,r]),d=m.exports.useMemo((()=>c?De(c,l):""),[c,l]),u=I(ke.PLACE,"type",c);return c?p.createElement(p.Fragment,null,p.createElement(Ue,{isModalOpen:t&&!i,onCancel:()=>{s(!1),a()},onLeaveNow:()=>{n(o)},onLeaved:()=>{s(!0)},place:d||"",date:ye(c.inTime),outTime:c.outTime,venueType:u}),p.createElement(Xe,{isModalOpen:t&&i,onCancel:()=>{s(!1),a()},onConfirm:e=>{n(e)},date:ye(c.inTime)})):p.createElement(p.Fragment,null)};const ot=({isModalOpen:e,onCancel:t,onConfirm:a,selectedAutoLeaveHour:n,date:o})=>{const{t:r}=S("confirm"),[i,s]=m.exports.useState(n);m.exports.useEffect((()=>{s(n)}),[s,n]);const l=m.exports.useMemo((()=>o.add(i,"hour")),[o,i]);return p.createElement(D,{isOpen:e,onRequestClose:t,style:{overlay:{backgroundColor:"rgba(0, 0, 0, 0.5)"},content:{outline:"none",border:"0",padding:"16px",borderRadius:"8px",width:"240px",position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)",height:"370px",overflow:"hidden"}},ariaHideApp:!1},p.createElement(it,null,p.createElement(rt,{src:Ne,onClick:t})),p.createElement(st,null,r("message.set_auto_leave_time")),p.createElement(lt,{id:"scroll"},p.createElement(ct,null,[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24].map((e=>p.createElement(dt,{onClick:()=>{s(e)},key:e},"+ ",e,r("form.hour"),i===e&&p.createElement(mt,{src:"assets/greenTick.ef463b88.svg"})))))),p.createElement(ut,null,p.createElement("div",null,r("message.enter_at",{time:o.format("MM-DD HH:mm")})),p.createElement("div",null,r("message.auto_leave_at",{time:l.format("MM-DD HH:mm")}))),p.createElement(ze,{onClick:()=>{a(i)}},r("global:button.confirm")))},rt=u.img`
  height: 20px;
`,it=u.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
`,st=u.h1`
  font-size: 20px;
  text-align: center;
  margin-top: 20px;
  margin-bottom: 0;
`,lt=u.div`
  overflow: auto;
  height: 180px;
  padding: 0 8px;
`,ct=u.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`,dt=u.li`
  line-height: 40px;
  border-bottom: 1px #eeeeee solid;
  padding: 0 8px;
`,ut=u.div`
  font-size: 12px;
  text-align: center;
  padding: 16px 0;
`,mt=u.img`
  height: 32px;
  position: relative;
  float: right;
  top: 4px;
`;var pt="assets/cross.c79182a6.svg";const gt=({onChange:e,checked:t,readOnly:a=!1})=>{const n=()=>{e&&e(!t)};return z?p.createElement(ht,{checked:t,onClick:n,color:"primary",readOnly:a}):p.createElement(ft,{src:t?"assets/checkboxChecked.912acdad.svg":"assets/checkbox.013d59e4.svg",onClick:a?void 0:n})},ft=u.img`
  height: 32px;
  display: inline-block;
  vertical-align: top;
  margin: 0 8px;
`,ht=u(V)`
  display: inline-block;
  vertical-align: top;
  margin: 0 8px !important;
  padding: 0 !important;

  &.MuiCheckbox-colorPrimary {
    color: #fff !important;
  }
`,vt=e=>{var t=e,{value:a,onChange:i,placeholder:l,readOnly:c}=t,d=((e,t)=>{var a={};for(var i in e)o.call(e,i)&&t.indexOf(i)<0&&(a[i]=e[i]);if(null!=e&&n)for(var i of n(e))t.indexOf(i)<0&&r.call(e,i)&&(a[i]=e[i]);return a})(t,["value","onChange","placeholder","readOnly"]);return p.createElement(_t,s({value:a,placeholder:l,readOnly:c,onChange:e=>{i&&i(e.target.value)},async:!0},d))},_t=u(U)`
  text-align: center;
  font-size: 32px;
  background-color: transparent;
  border: 0;
  outline: none;
  margin: 4px 0;
  color: #fed426;
  text-shadow: 0px 1px 2px rgba(0, 0, 0, 0.8);
  width: 100%;

  padding-left: 0;
  padding-right: 0;
  line-height: 36px;
  font-weight: 500;

  &:focus {
    outline: none;
  }
`,xt=({travelRecord:e,readOnly:t=!1,confirmPageIcon:a,autoLeave:n=!0,setAutoLeave:o,autoLeaveHour:r=4,handleChangeAutoLeaveHour:i,handleLeave:s})=>{const{t:l}=S("confirm"),{language:c}=Te(),d=m.exports.useMemo((()=>ye(e.inTime)),[e]),u=m.exports.useMemo((()=>De(e,c)),[e,c]),g=I(ke.PLACE,"type",e);return p.createElement(p.Fragment,null,p.createElement(yt,null,p.createElement(Et,null,a&&p.createElement(bt,{src:a}),t?p.createElement(kt,{src:pt}):p.createElement(j,{to:"/"},p.createElement(kt,{src:pt}))),p.createElement(Rt,null,g===ke.TAXI?p.createElement(p.Fragment,null,p.createElement(At,null,l("message.you_have_entered_taxi")),p.createElement(Ot,null,l("message.res_mark"),":")):p.createElement(At,null,l("message.you_have_entered_venue")),p.createElement(wt,null,p.createElement(vt,{value:u||"",readOnly:!0})),p.createElement(Lt,null,d.format("YYYY-MM-DD HH:mm"))),p.createElement(Ct,null,p.createElement(St,null,p.createElement(Tt,{src:"assets/tick.a4dbe809.svg"}))),p.createElement(Mt,null,p.createElement(Ve,{shadowed:!0,onClick:s},g===ke.TAXI?l("button.get_off"):l("button.leave")),p.createElement(Ht,null,l("message.remember_to_leave")),p.createElement(It,null,p.createElement(Pt,null,p.createElement(gt,{checked:n,onChange:o,readOnly:f(o)}),l("form.auto_leave_after_x_hour",{hour:r})),p.createElement(Dt,{onClick:i},l("global:button.change"))))))},yt=u.div`
  width: 100%;
  height: 100%;
  text-shadow: 0px 1px 2px rgba(0, 0, 0, 0.8);
  display: flex;
  flex-direction: column;
  color: #fff;
`,bt=u.img`
  height: 72px;
`,Et=u.div`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-shrink: 0;
  margin: 24px 0 16px 0;
`,kt=u.img`
  height: 20px;
  margin: 8px 24px;
  position: absolute;
  right: 0;
`,wt=u.div`
  padding: 0 32px;
`,Rt=u.div`
  width: 100%;
  height: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`,Ct=u.div`
  height: 100%;
  width: 100%;
  text-align: center;
`,St=u.div`
  height: 100%;
  max-height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`,Tt=u.img`
  display: inline-block;
  height: 100%;
  max-height: 110px;
`,At=u.div`
  color: #ffffff;
  text-align: center;
  font-size: 15px;
`,Ot=u(At)`
  margin-top: 8px;
`,Lt=u.div`
  color: #ffffff;
  text-align: center;
`,It=u.div`
  width: 100%;
  max-width: 380px;
  margin: 16px auto 24px auto;
  display: flex;
  flex-shrink: 0;
  font-size: 14px;
`,Pt=u.div`
  width: 100%;
  text-align: left;
  padding-left: 24px;
  line-height: 32px;
`,Dt=u.div`
  flex-shrink: 0;
  padding-right: 24px;
  line-height: 32px;
  color: #fed426;
  text-decoration: underline;
`,Ht=u.div`
  text-align: center;
  flex-shrink: 0;
`,Mt=u.div`
  width: 100%;
  flex-shrink: 0;
`,Nt=({confirmPageIcon:e})=>{const t=T(),{id:a}=q(),{state:n}=B(),{updateTravelRecord:o,getTravelRecord:r}=Ie(),[i,s]=m.exports.useState(!1),[l,c]=m.exports.useState(!1),d=m.exports.useMemo((()=>n||r(a)),[n,r,a]);m.exports.useEffect((()=>{d||t.replace("/")}),[d,t]);const[u,g]=m.exports.useState(!d||!f(d.outTime)),[h,v]=m.exports.useState(d&&d.outTime?ye(d.outTime).diff(d.inTime,"hour"):4),_=m.exports.useMemo((()=>d?d.inTime:ye().toISOString()),[d]);return m.exports.useEffect((()=>{const e=ye(_).add(h,"hour");o(a,{outTime:u?e.toISOString():void 0})}),[u,h,o,a,_]),d?p.createElement(p.Fragment,null,p.createElement(xt,{travelRecord:d,confirmPageIcon:e,autoLeave:u,setAutoLeave:g,autoLeaveHour:h,handleChangeAutoLeaveHour:()=>{s(!0)},handleLeave:()=>{c(!0)}}),p.createElement(ot,{isModalOpen:i,onCancel:()=>{s(!1)},onConfirm:e=>{v(e),s(!1)},selectedAutoLeaveHour:h,date:ye(_)}),p.createElement(nt,{id:a,visible:l,onDiscard:()=>{c(!1)},onFinish:e=>{o(a,{outTime:e.startOf("minute").toISOString()}),s(!1),c(!1),t.push("/")}})):p.createElement(p.Fragment,null)},Vt=p.lazy((()=>le((()=>import("./index.87de960c.js")),["assets/index.87de960c.js","assets/createSvgIcon.fc4e5d62.js","assets/vendor.edeed207.js","assets/Header.236956d2.js"]))),zt=p.lazy((()=>le((()=>import("./index.aedec55d.js")),["assets/index.aedec55d.js","assets/vendor.edeed207.js","assets/QRCodeReader.19f521a7.js","assets/MediaStream.b7492a38.js","assets/Header.236956d2.js"]))),Ut=p.lazy((()=>le((()=>import("./index.a6fc3174.js")),["assets/index.a6fc3174.js","assets/vendor.edeed207.js","assets/Header.236956d2.js","assets/MediaStream.b7492a38.js"]))),jt=p.lazy((()=>le((()=>import("./index.21da91e2.js")),["assets/index.21da91e2.js","assets/vendor.edeed207.js","assets/Disclaimer.0a45b3aa.js"]))),qt=p.lazy((()=>le((()=>import("./index.8f277828.js")),["assets/index.8f277828.js","assets/index.ef50a05a.css","assets/vendor.edeed207.js","assets/createSvgIcon.fc4e5d62.js","assets/Header.236956d2.js","assets/clearAllData.5cebeedf.js"]))),Bt=p.lazy((()=>le((()=>import("./index.832020be.js")),["assets/index.832020be.js","assets/vendor.edeed207.js","assets/Disclaimer.0a45b3aa.js","assets/Header.236956d2.js"]))),Zt=p.lazy((()=>le((()=>import("./index.b7a00cfa.js")),["assets/index.b7a00cfa.js","assets/createSvgIcon.fc4e5d62.js","assets/vendor.edeed207.js","assets/clearAllData.5cebeedf.js"]))),Kt=p.lazy((()=>le((()=>import("./index.80b5b2c5.js")),["assets/index.80b5b2c5.js","assets/vendor.edeed207.js","assets/Header.236956d2.js"]))),Ft=p.lazy((()=>le((()=>import("./index.6d3862c7.js")),["assets/index.6d3862c7.js","assets/vendor.edeed207.js","assets/QRCodeReader.19f521a7.js","assets/MediaStream.b7492a38.js","assets/Header.236956d2.js"]))),Yt=()=>{(()=>{const[,,e]=h("password_hash",null);m.exports.useEffect((()=>{e()}),[e]);const{unlocked:t,setValue:a}=xe();m.exports.useEffect((()=>{a((e=>l(s({},e),{travelRecords:e.travelRecords.map((e=>Z("id",e)?e:l(s({},e),{id:w()})))})))}),[t,a])})();const[e,t]=h("finished_tutorial",!1),[a,n]=h("confirmPageIcon",null),{lockStore:o,unlocked:r,isEncrypted:i}=xe(),{pathname:c}=B(),d=T(),u=m.exports.useCallback((()=>{"/qrReader"!==c&&"/cameraSetting"!==c&&o()}),[o,c]);m.exports.useEffect((()=>(window.addEventListener("blur",u),()=>{window.removeEventListener("blur",u)})),[u]);const g=m.exports.useMemo((()=>[{privateRoute:!1,route:{exact:!0,path:"/tutorial"},component:p.createElement(jt,{setFinishedTutorial:t})},{privateRoute:!1,route:{exact:!0,path:"/login"},component:p.createElement(Zt,null)},{privateRoute:!0,route:{exact:!0,path:"/"},component:p.createElement(qt,null)},{privateRoute:!0,route:{exact:!0,path:"/confirm/:id"},component:p.createElement(Nt,{confirmPageIcon:a})},{privateRoute:!0,route:{exact:!0,path:"/qrGenerator"},component:p.createElement(Vt,null)},{privateRoute:!0,route:{exact:!0,path:"/disclaimer"},component:p.createElement(Bt,null)},{privateRoute:!0,route:{exact:!0,path:"/qrReader"},component:p.createElement(zt,null)},{privateRoute:!0,route:{exact:!0,path:"/cameraSetting"},component:p.createElement(Ut,null)},{privateRoute:!0,route:{exact:!0,path:"/confirmPageSetting"},component:p.createElement(Kt,{confirmPageIcon:a,setConfirmPageIcon:n})},{privateRoute:!0,route:{exact:!0,path:"/vaccinationQRReader"},component:p.createElement(Ft,null)}]),[a,n,t]);return m.exports.useEffect((()=>{r||"/login"===c||d.replace("/login"),r&&"/login"===c&&d.replace("/")}),[i,r,d,c]),m.exports.useEffect((()=>{e||"/tutorial"===c||d.replace("/tutorial"),e&&"/tutorial"===c&&d.replace("/")}),[e,d,c]),m.exports.useEffect((()=>{F((({route:e})=>!!e.path&&!f(Y(c,e))),g)||d.replace("/")}),[d,c,g]),p.createElement(p.Fragment,null,p.createElement(Wt,null),g.map((({route:e,component:t,privateRoute:a})=>a&&!r?p.createElement(p.Fragment,{key:String(e.path)}):p.createElement(W,l(s({},e),{key:String(e.path)}),(({match:e})=>p.createElement(Q,{in:null!=e,timeout:300,classNames:"page",unmountOnExit:!0},p.createElement("div",{className:"page"},p.createElement(m.exports.Suspense,{fallback:p.createElement(ce,null)},t))))))))},Wt=K`
html {
  width: 100%;
  height: 100%;
}

body {
  margin: 0;
  font-family: Rubik, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color:#12b188;
  width: 100%;
  height: 100%;
  position: relative;
}

textarea {
  font-family: inherit;
}


#root {
  width: 100%;
  height: 100%;
}

a {
  text-decoration: none;
}

.page {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #12b188;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.8);
}

.page-enter {
  opacity: 0;
  left: 100vw;
  z-index: 1;
}

.page-enter-active {
  opacity: 1;
  left: 0vw;
  z-index: 0;
  transition: left 300ms cubic-bezier(0.25, 1, 0.5, 1);
}

.page-exit {
  opacity: 1;
  z-index: 0;
  transform: scale(1);
}

.page-exit-active {
  opacity: 0;
  z-index: 0;
  transform: scale(0.9);
  transition: opacity 300ms, transform 300ms;
}
`,[Qt,$t]=x((()=>{const[e]=m.exports.useState("mediaDevices"in navigator),[t,a]=h("preferred_camera_id","AUTO"),[n,o]=m.exports.useState(null),r=m.exports.useCallback((async()=>{try{if(!e||!$("enumerateDevices",navigator.mediaDevices))return void o([]);const t=(await navigator.mediaDevices.enumerateDevices()).filter((e=>"videoinput"===e.kind));o(t)}catch(t){alert("Unable to list device.\n\n"+t)}}),[e]);return m.exports.useEffect((()=>{r()}),[e,r]),m.exports.useEffect((()=>{null===n||"AUTO"===t||F((({deviceId:e})=>e===t),n)||a("AUTO")}),[n,a,t]),{preferredCameraId:F((({deviceId:e})=>e===t),n||[])?t:"AUTO",cameraList:n||[],setPreferredCameraId:a,hasCameraSupport:e}})),Jt=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function Xt(e,t){navigator.serviceWorker.register(e).then((e=>{e.onupdatefound=()=>{const a=e.installing;null!=a&&(a.onstatechange=()=>{"installed"===a.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See https://cra.link/PWA."),t&&t.onUpdate&&t.onUpdate(e)):(console.log("Content is cached for offline use."),t&&t.onSuccess&&t.onSuccess(e)))})}})).catch((e=>{console.error("Error during service worker registration:",e)}))}const Gt=J({palette:{primary:{main:X[500]},secondary:{main:G[600]}}});ee.render(p.createElement(p.StrictMode,null,p.createElement(Se,null,p.createElement(te,{basename:"/"},p.createElement(ae,{theme:Gt},p.createElement(be,null,p.createElement(_e,null,p.createElement(Le,null,p.createElement(Re,null,p.createElement(Qt,null,p.createElement(Yt,null)))))))))),document.getElementById("root")),function(e){if("serviceWorker"in navigator){if(new URL({}.PUBLIC_URL,window.location.href).origin!==window.location.origin)return;window.addEventListener("load",(()=>{const t=`${{}.PUBLIC_URL}/service-worker.js`;Jt?(!function(e,t){fetch(e,{headers:{"Service-Worker":"script"}}).then((a=>{const n=a.headers.get("content-type");404===a.status||null!=n&&-1===n.indexOf("javascript")?navigator.serviceWorker.ready.then((e=>{e.unregister().then((()=>{window.location.reload()}))})):Xt(e,t)})).catch((()=>{console.log("No internet connection found. App is running in offline mode.")}))}(t,e),navigator.serviceWorker.ready.then((()=>{console.log("This web app is being served cache-first by a service worker. To learn more, visit https://cra.link/PWA")}))):Xt(t,e)}))}}({onUpdate:()=>{window.confirm("已有新版本, 請完全關閉後重新開啟")&&window.location.reload()}});export{xt as C,nt as L,vt as P,Te as a,Pe as b,pt as c,ye as d,$t as e,ne as f,De as g,xe as h,Ce as i,Ee as j,ke as l,Me as q,Ae as t,Ie as u};
