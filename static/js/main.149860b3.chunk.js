(this["webpackJsonprun-the-world"]=this["webpackJsonprun-the-world"]||[]).push([[0],{34:function(n,e,t){},58:function(n,e,t){},62:function(n,e,t){"use strict";t.r(e);var r=t(1),c=t(0),u=t.n(c),a=t(4),i=t.n(a),o=(t(34),t(14)),s=t(8),l=t(6),d=t(2),p=t.n(d),b=t(28),j=t(3),f=t(10),h=t(13),v=t(11),O=t.n(v),x=t(12);t(57),t(58);function k(){var n=Object(f.a)(["\n  display: flex;\n"]);return k=function(){return n},n}function g(){var n=Object(f.a)(["\n  label {\n    display: block;\n  }\n"]);return g=function(){return n},n}function m(){var n=Object(f.a)(["\n  width: 180px;\n  height: 120px;\n"]);return m=function(){return n},n}var w=x.a.div(m()),y=x.a.div(g()),T=x.a.div(k()),C=function(){var n=Object(j.a)(p.a.mark((function n(e,t){var r,c,u,a,i,o,s,l;return p.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return(r=O.a.createClient({mode:"rtc",codec:"h264"})).on("user-published",function(){var n=Object(j.a)(p.a.mark((function n(e,c){return p.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return console.log("user-published: ",e),console.log(e),n.next=4,r.subscribe(e,c);case 4:t((function(n){return n.find((function(n){return n.uid===e.uid}))?n:[].concat(Object(b.a)(n),[e])}));case 5:case"end":return n.stop()}}),n)})));return function(e,t){return n.apply(this,arguments)}}()),r.on("user-unpublished",function(){var n=Object(j.a)(p.a.mark((function n(e,r){return p.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:console.log("user-unpublished: ",e),console.log("unpublish!!!!!!!!!!!!!"),console.log(r),console.log("vidoe: ",e.hasVideo),console.log("audio: ",e.hasAudio),t((function(n){return n.filter((function(n){return n.uid!==e.uid}))}));case 6:case"end":return n.stop()}}),n)})));return function(e,t){return n.apply(this,arguments)}}()),n.prev=3,c=e.appId,u=e.channel,a=e.token,n.next=7,r.join(c,u,a);case 7:return i=n.sent,n.next=10,O.a.createMicrophoneAudioTrack();case 10:return o=n.sent,n.next=13,O.a.createCameraVideoTrack();case 13:return s=n.sent,l={uid:i,audioTrack:o,videoTrack:s},n.next=17,r.publish([o,s]);case 17:return h.b.info("join channel success!"),n.abrupt("return",{client:r,user:l});case 21:return n.prev=21,n.t0=n.catch(3),h.b.error(n.t0.message),n.abrupt("return",{});case 25:case"end":return n.stop()}}),n,null,[[3,21]])})));return function(e,t){return n.apply(this,arguments)}}(),A=function(n){var e=n.user;Object(c.useEffect)((function(){console.log(e);try{var n,t;null===(n=e.audioTrack)||void 0===n||n.play(),null===(t=e.videoTrack)||void 0===t||t.play(e.uid.toString())}catch(r){console.log(r)}}),[]);var t=e.uid;return Object(r.jsxs)("div",{children:[Object(r.jsxs)("p",{children:["uid: ",t]}),Object(r.jsx)(w,{id:t})]})},I=function(n){var e=n.setSettings,t=function(n){return function(t){return e((function(e){return Object(l.a)(Object(l.a)({},e),{},Object(s.a)({},n,t.target.value))}))}};return Object(r.jsxs)(y,{children:[Object(r.jsxs)("div",{children:[Object(r.jsx)("label",{htmlFor:"appId",children:"appId"}),Object(r.jsx)("input",{id:"appId",type:"text",name:"appId",onChange:t("appId")})]}),Object(r.jsxs)("div",{children:[Object(r.jsx)("label",{htmlFor:"channel",children:"Channel"}),Object(r.jsx)("input",{id:"channel",type:"text",name:"channel",onChange:t("channel")})]}),Object(r.jsxs)("div",{children:[Object(r.jsx)("label",{htmlFor:"token",children:"Token"}),Object(r.jsx)("input",{id:"token",type:"text",name:"token",onChange:t("token")})]})]})},S=function(){var n=Object(c.useState)([]),e=Object(o.a)(n,2),t=e[0],u=e[1],a=Object(c.useState)({}),i=Object(o.a)(a,2),s=i[0],d=i[1],b=Object(c.useState)({appID:"b09b71cce3ea499a80e7e94c9abae12e",channel:"runTheWorld",token:"006ed1ec7534a41423faea1f5a3ccd04399IABZqWtmG/8C0MsRljAYu57oVqrjsyK657NiC4UzlwzI+znmkEUAAAAAEABJgS3VXbqnXwEAAQBcuqdf"}),f=Object(o.a)(b,2),v=f[0],O=f[1],x=s.client,k=s.user,g=function(){var n=Object(j.a)(p.a.mark((function n(e,t){return p.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return t.audioTrack.close(),t.videoTrack.close(),d((function(n){return Object(l.a)(Object(l.a)({},n),{},{user:null})})),u([]),n.next=6,e.leave();case 6:case"end":return n.stop()}}),n)})));return function(e,t){return n.apply(this,arguments)}}(),m=function(){var n=Object(j.a)(p.a.mark((function n(e,t){return p.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.abrupt("return",e.publish([t.audioTrack,t.videoTrack]));case 1:case"end":return n.stop()}}),n)})));return function(e,t){return n.apply(this,arguments)}}(),w=function(){var n=Object(j.a)(p.a.mark((function n(e,t){return p.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.abrupt("return",e.unpublish([t.audioTrack,t.videoTrack]));case 1:case"end":return n.stop()}}),n)})));return function(e,t){return n.apply(this,arguments)}}(),y=function(){var n=Object(j.a)(p.a.mark((function n(e,t){return p.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.abrupt("return",e.unpublish([t.audioTrack]));case 1:case"end":return n.stop()}}),n)})));return function(e,t){return n.apply(this,arguments)}}(),S=function(){var n=Object(j.a)(p.a.mark((function n(e,t){return p.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.abrupt("return",e.publish([t.audioTrack]));case 1:case"end":return n.stop()}}),n)})));return function(e,t){return n.apply(this,arguments)}}();return console.log(k),Object(r.jsxs)("div",{className:"App",children:[Object(r.jsx)(h.a,{}),Object(r.jsx)(I,{setSettings:O}),Object(r.jsx)("button",{onClick:Object(j.a)(p.a.mark((function n(){var e;return p.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,C(v,u);case 2:e=n.sent,d(e);case 4:case"end":return n.stop()}}),n)}))),children:"Join"}),Object(r.jsx)("button",{onClick:function(){return g(x,k)},children:"Leave"}),x&&Object(r.jsxs)(r.Fragment,{children:[Object(r.jsx)("button",{onClick:function(){return w(x,k)},children:"Unpublish"}),Object(r.jsx)("button",{onClick:function(){return m(x,k)},children:"Publish"}),Object(r.jsx)("button",{onClick:function(){return y(x,k)},children:"Mute"}),Object(r.jsx)("button",{onClick:function(){return S(x,k)},children:"Unmute"})]}),Object(r.jsxs)(T,{children:[k&&Object(r.jsx)(A,{user:k}),null===t||void 0===t?void 0:t.map((function(n){return Object(r.jsx)(A,{user:n},n.uid)}))]})]})},F=function(n){n&&n instanceof Function&&t.e(3).then(t.bind(null,65)).then((function(e){var t=e.getCLS,r=e.getFID,c=e.getFCP,u=e.getLCP,a=e.getTTFB;t(n),r(n),c(n),u(n),a(n)}))};i.a.render(Object(r.jsx)(u.a.StrictMode,{children:Object(r.jsx)(S,{})}),document.getElementById("root")),F()}},[[62,1,2]]]);
//# sourceMappingURL=main.149860b3.chunk.js.map