(this["webpackJsonprun-the-world"]=this["webpackJsonprun-the-world"]||[]).push([[0],{31:function(e,n,t){},54:function(e,n,t){},56:function(e,n,t){"use strict";t.r(n);var r=t(2),c=t(0),u=t.n(c),a=t(20),i=t.n(a),o=(t(31),t(14)),s=t(12),d=t(13),f=t(1),l=t.n(f),p=t(3),b=t(21),j=t(7),h=t.n(j),v=t(22);t(54);function O(){var e=Object(b.a)(["\n  width: 180px;\n  height: 120px;\n"]);return O=function(){return e},e}var x=v.a.div(O()),k={appID:"b09b71cce3ea499a80e7e94c9abae12e",channel:"runTheWorld",uid:null,token:"006ed1ec7534a41423faea1f5a3ccd04399IABZqWtmG/8C0MsRljAYu57oVqrjsyK657NiC4UzlwzI+znmkEUAAAAAEABJgS3VXbqnXwEAAQBcuqdf"},w=function(){var e=Object(p.a)(l.a.mark((function e(){var n,t,r,c,u;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=h.a.createClient({mode:"rtc",codec:"h264"}),e.next=3,n.join(k.appId,k.channel,k.token);case 3:return t=e.sent,e.next=6,h.a.createMicrophoneAudioTrack();case 6:return r=e.sent,e.next=9,h.a.createCameraVideoTrack();case 9:return c=e.sent,u={uid:t,audioTrack:r,videoTrack:c},e.next=13,n.publish([r,c]);case 13:return e.abrupt("return",{client:n,user:u});case 14:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),m=function(e){var n=e.user;Object(c.useEffect)((function(){n.audioTrack.play(),n.videoTrack.play(n.uid.toString())}),[]);var t=n.uid;return Object(r.jsxs)("div",{children:[Object(r.jsxs)("p",{children:["uid: ",t]}),Object(r.jsx)(x,{id:t})]})},g=function(){var e=Object(c.useState)({}),n=Object(d.a)(e,2),t=n[0],u=n[1],a=t.client,i=t.user,f=function(e){var n=Object(c.useState)([]),t=Object(d.a)(n,2),r=t[0],u=t[1];return Object(c.useEffect)((function(){e&&(e.on("user-added",function(){var n=Object(p.a)(l.a.mark((function n(t,r){return l.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return console.log("user-subscribed: ",t),n.next=3,e.subscribe(t,r);case 3:u((function(e){return e.find((function(e){return e.uid===t.uid}))?e:[].concat(Object(s.a)(e),[t])}));case 4:case"end":return n.stop()}}),n)})));return function(e,t){return n.apply(this,arguments)}}()),e.on("user-published",function(){var n=Object(p.a)(l.a.mark((function n(t,r){return l.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return console.log("user-published: ",t),console.log(t),n.next=4,e.subscribe(t,r);case 4:u((function(e){return e.find((function(e){return e.uid===t.uid}))?e:[].concat(Object(s.a)(e),[t])}));case 5:case"end":return n.stop()}}),n)})));return function(e,t){return n.apply(this,arguments)}}()),e.on("user-unpublished",function(){var e=Object(p.a)(l.a.mark((function e(n,t){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:console.log("user-unpublished: ",n),u((function(e){return e.filter((function(e){return e.uid!==n.uid}))}));case 2:case"end":return e.stop()}}),e)})));return function(n,t){return e.apply(this,arguments)}}()))}),[e]),{localUser:e,remoteUsers:r}}(a).remoteUsers,b=function(){var e=Object(p.a)(l.a.mark((function e(n,t){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.audioTrack.close(),t.videoTrack.close(),u((function(e){return Object(o.a)(Object(o.a)({},e),{},{user:null})})),e.next=5,n.leave();case 5:case"end":return e.stop()}}),e)})));return function(n,t){return e.apply(this,arguments)}}();return Object(r.jsxs)("div",{className:"App",children:[Object(r.jsx)("button",{onClick:Object(p.a)(l.a.mark((function e(){var n;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,w();case 2:n=e.sent,u(n);case 4:case"end":return e.stop()}}),e)}))),children:"Join"}),Object(r.jsx)("button",{onClick:function(){return b(a,i)},children:"Leave"}),i&&Object(r.jsx)(m,{user:i}),null===f||void 0===f?void 0:f.map((function(e){return Object(r.jsx)(m,{user:e},e.uid)}))]})},A=function(e){e&&e instanceof Function&&t.e(3).then(t.bind(null,57)).then((function(n){var t=n.getCLS,r=n.getFID,c=n.getFCP,u=n.getLCP,a=n.getTTFB;t(e),r(e),c(e),u(e),a(e)}))};i.a.render(Object(r.jsx)(u.a.StrictMode,{children:Object(r.jsx)(g,{})}),document.getElementById("root")),A()}},[[56,1,2]]]);
//# sourceMappingURL=main.5e17acea.chunk.js.map