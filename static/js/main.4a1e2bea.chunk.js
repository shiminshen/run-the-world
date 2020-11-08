(this["webpackJsonprun-the-world"]=this["webpackJsonprun-the-world"]||[]).push([[0],{34:function(e,t,n){},61:function(e,t,n){"use strict";n.r(t);var r=n(1),c=n(0),a=n.n(c),u=n(5),i=n.n(u),s=(n(34),n(9)),o=n(2),l=n.n(o),d=n(28),b=n(3),p=n(11),j=n(17),h=n(6),f=n(4),v=n(13),O=n.n(v),x=n(7);n(57);function k(){var e=Object(h.a)(["\n  margin-top: 6px;\n  display: flex;\n  justify-content: center;\n\n  button + button {\n    margin-left: 6px;\n  }\n"]);return k=function(){return e},e}function m(){var e=Object(h.a)(["\n  display: flex;\n"]);return m=function(){return e},e}function w(){var e=Object(h.a)(["\n  label {\n    display: block;\n  }\n"]);return w=function(){return e},e}function g(){var e=Object(h.a)(["\n  width: 180px;\n  height: 120px;\n"]);return g=function(){return e},e}function C(){var e=Object(h.a)(["\n  max-width: 960px;\n  margin: 0 auto;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n"]);return C=function(){return e},e}var T=x.a.div(C()),y=x.a.div(g()),S=x.a.div(w()),I=x.a.div(m()),F=x.a.div(k()),U=function(e){var t=e.id,n=e.user,c=t||n.uid;return Object(r.jsxs)("div",{children:[n&&Object(r.jsxs)("p",{children:["uid: ",c]}),Object(r.jsx)(y,{id:c})]})},L=function(e){var t=e.setSettings,n=function(e){return function(n){return t((function(t){return Object(j.a)(Object(j.a)({},t),{},Object(p.a)({},e,n.target.value))}))}};return Object(r.jsxs)(S,{children:[Object(r.jsxs)("div",{children:[Object(r.jsx)("label",{htmlFor:"appId",children:"appId"}),Object(r.jsx)("input",{id:"appId",type:"text",name:"appId",onChange:n("appId")})]}),Object(r.jsxs)("div",{children:[Object(r.jsx)("label",{htmlFor:"channel",children:"Channel"}),Object(r.jsx)("input",{id:"channel",type:"text",name:"channel",onChange:n("channel")})]}),Object(r.jsxs)("div",{children:[Object(r.jsx)("label",{htmlFor:"token",children:"Token"}),Object(r.jsx)("input",{id:"token",type:"text",name:"token",onChange:n("token")})]})]})},E=function(){var e=Object(c.useState)(),t=Object(s.a)(e,2),n=t[0],a=t[1],u=Object(c.useState)([]),i=Object(s.a)(u,2),o=i[0],p=i[1],j=Object(c.useState)(),h=Object(s.a)(j,2),v=h[0],x=h[1],k=Object(c.useState)({appID:"",channel:"",token:""}),m=Object(s.a)(k,2),w=m[0],g=m[1],C=function(e){var t=e.client,n=e.localUser,r=e.settings,a=e.setLocalUser,u=e.setClient,i=e.setRemoteUsers;return{join:Object(c.useCallback)(Object(b.a)(l.a.mark((function e(){var t,n,c,s,o,p,j;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return(t=O.a.createClient({mode:"rtc",codec:"h264"})).on("user-joined",function(){var e=Object(b.a)(l.a.mark((function e(t){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:i((function(e){return e.find((function(e){return e.uid===t.uid}))?e:[].concat(Object(d.a)(e),[t])}));case 1:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),t.on("user-published",function(){var e=Object(b.a)(l.a.mark((function e(n,r){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return f.b.info("user-published: ".concat(n.uid," ").concat(r)),e.next=3,t.subscribe(n,r);case 3:"video"===r?n.videoTrack.play(n.uid.toString()):"audio"===r&&n.audioTrack.play();case 4:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}()),t.on("user-unpublished",function(){var e=Object(b.a)(l.a.mark((function e(t,n){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:f.b.warning("user-unpublished: ".concat(t.uid," ").concat(n));case 1:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}()),t.on("user-left",function(){var e=Object(b.a)(l.a.mark((function e(t,n){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:i((function(e){return e.filter((function(e){return e.uid!==t.uid}))}));case 1:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}()),e.prev=5,n=r.appId,c=r.channel,s=r.token,e.next=9,t.join(n,c,s);case 9:return o=e.sent,e.next=12,O.a.createMicrophoneAudioTrack();case 12:return p=e.sent,e.next=15,O.a.createCameraVideoTrack();case 15:return(j=e.sent).play("local-user"),a({uid:o,audioTrack:p,videoTrack:j}),e.next=20,t.publish([p,j]);case 20:return f.b.info("join channel success!"),u(t),e.abrupt("return",t);case 25:return e.prev=25,e.t0=e.catch(5),f.b.error(null===e.t0||void 0===e.t0?void 0:e.t0.message),e.abrupt("return",{});case 29:case"end":return e.stop()}}),e,null,[[5,25]])}))),[u,a,i,r]),leave:Object(c.useCallback)(Object(b.a)(l.a.mark((function e(){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,n.audioTrack.close(),n.videoTrack.close(),u(null),a(null),i([]),e.next=8,t.leave();case 8:e.next=13;break;case 10:e.prev=10,e.t0=e.catch(0),f.b.error(null===e.t0||void 0===e.t0?void 0:e.t0.message);case 13:case"end":return e.stop()}}),e,null,[[0,10]])}))),[n,u,a,i,t]),show:Object(c.useCallback)(Object(b.a)(l.a.mark((function e(){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,n.videoTrack.setEnabled(!0);case 3:return e.abrupt("return",t.publish([n.videoTrack]));case 6:e.prev=6,e.t0=e.catch(0),f.b.error(null===e.t0||void 0===e.t0?void 0:e.t0.message);case 9:case"end":return e.stop()}}),e,null,[[0,6]])}))),[n,t]),hide:Object(c.useCallback)(Object(b.a)(l.a.mark((function e(){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,n.videoTrack.setEnabled(!1);case 3:return e.abrupt("return",t.unpublish([n.videoTrack]));case 6:e.prev=6,e.t0=e.catch(0),f.b.error(null===e.t0||void 0===e.t0?void 0:e.t0.message);case 9:case"end":return e.stop()}}),e,null,[[0,6]])}))),[n,t]),mute:Object(c.useCallback)(Object(b.a)(l.a.mark((function e(){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.abrupt("return",t.unpublish([n.audioTrack]));case 4:e.prev=4,e.t0=e.catch(0),f.b.error(null===e.t0||void 0===e.t0?void 0:e.t0.message);case 7:case"end":return e.stop()}}),e,null,[[0,4]])}))),[n,t]),unmute:Object(c.useCallback)(Object(b.a)(l.a.mark((function e(){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.abrupt("return",t.publish([n.audioTrack]));case 4:e.prev=4,e.t0=e.catch(0),f.b.error(null===e.t0||void 0===e.t0?void 0:e.t0.message);case 7:case"end":return e.stop()}}),e,null,[[0,4]])}))),[n,t])}}({client:v,localUser:n,settings:w,setLocalUser:a,setClient:x,setRemoteUsers:p}),y=C.join,S=C.leave,E=C.show,J=C.hide,M=C.mute,R=C.unmute;return Object(r.jsxs)(T,{children:[Object(r.jsx)(f.a,{position:"bottom-left"}),Object(r.jsx)("h1",{children:"Run The World"}),Object(r.jsx)(L,{setSettings:g}),Object(r.jsx)(F,{children:v?Object(r.jsxs)(r.Fragment,{children:[Object(r.jsx)("button",{onClick:S,children:"Leave"}),Object(r.jsx)("button",{onClick:E,children:"Show"}),Object(r.jsx)("button",{onClick:J,children:"Hide"}),Object(r.jsx)("button",{onClick:M,children:"Mute"}),Object(r.jsx)("button",{onClick:R,children:"Unmute"})]}):Object(r.jsx)("button",{onClick:y,children:"Join"})}),Object(r.jsxs)(I,{children:[Object(r.jsx)(U,{id:"local-user",user:n}),null===o||void 0===o?void 0:o.map((function(e){return Object(r.jsx)(U,{user:e},e.uid)}))]})]})},J=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,64)).then((function(t){var n=t.getCLS,r=t.getFID,c=t.getFCP,a=t.getLCP,u=t.getTTFB;n(e),r(e),c(e),a(e),u(e)}))};i.a.render(Object(r.jsx)(a.a.StrictMode,{children:Object(r.jsx)(E,{})}),document.getElementById("root")),J()}},[[61,1,2]]]);
//# sourceMappingURL=main.4a1e2bea.chunk.js.map