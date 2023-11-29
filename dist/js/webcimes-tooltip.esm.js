var t={d:(e,o)=>{for(var i in o)t.o(o,i)&&!t.o(e,i)&&Object.defineProperty(e,i,{enumerable:!0,get:o[i]})},o:(t,e)=>Object.prototype.hasOwnProperty.call(t,e)},e={};function o(t){if(null==t)return window;if("[object Window]"!==t.toString()){var e=t.ownerDocument;return e&&e.defaultView||window}return t}function i(t){return t instanceof o(t).Element||t instanceof Element}function n(t){return t instanceof o(t).HTMLElement||t instanceof HTMLElement}function r(t){return"undefined"!=typeof ShadowRoot&&(t instanceof o(t).ShadowRoot||t instanceof ShadowRoot)}t.d(e,{Q:()=>vt});var s=Math.max,a=Math.min,p=Math.round;function l(){var t=navigator.userAgentData;return null!=t&&t.brands&&Array.isArray(t.brands)?t.brands.map((function(t){return t.brand+"/"+t.version})).join(" "):navigator.userAgent}function f(){return!/^((?!chrome|android).)*safari/i.test(l())}function c(t,e,r){void 0===e&&(e=!1),void 0===r&&(r=!1);var s=t.getBoundingClientRect(),a=1,l=1;e&&n(t)&&(a=t.offsetWidth>0&&p(s.width)/t.offsetWidth||1,l=t.offsetHeight>0&&p(s.height)/t.offsetHeight||1);var c=(i(t)?o(t):window).visualViewport,u=!f()&&r,d=(s.left+(u&&c?c.offsetLeft:0))/a,h=(s.top+(u&&c?c.offsetTop:0))/l,m=s.width/a,v=s.height/l;return{width:m,height:v,top:h,right:d+m,bottom:h+v,left:d,x:d,y:h}}function u(t){var e=o(t);return{scrollLeft:e.pageXOffset,scrollTop:e.pageYOffset}}function d(t){return t?(t.nodeName||"").toLowerCase():null}function h(t){return((i(t)?t.ownerDocument:t.document)||window.document).documentElement}function m(t){return c(h(t)).left+u(t).scrollLeft}function v(t){return o(t).getComputedStyle(t)}function y(t){var e=v(t),o=e.overflow,i=e.overflowX,n=e.overflowY;return/auto|scroll|overlay|hidden/.test(o+n+i)}function b(t,e,i){void 0===i&&(i=!1);var r,s,a=n(e),l=n(e)&&function(t){var e=t.getBoundingClientRect(),o=p(e.width)/t.offsetWidth||1,i=p(e.height)/t.offsetHeight||1;return 1!==o||1!==i}(e),f=h(e),v=c(t,l,i),b={scrollLeft:0,scrollTop:0},g={x:0,y:0};return(a||!a&&!i)&&(("body"!==d(e)||y(f))&&(b=(r=e)!==o(r)&&n(r)?{scrollLeft:(s=r).scrollLeft,scrollTop:s.scrollTop}:u(r)),n(e)?((g=c(e,!0)).x+=e.clientLeft,g.y+=e.clientTop):f&&(g.x=m(f))),{x:v.left+b.scrollLeft-g.x,y:v.top+b.scrollTop-g.y,width:v.width,height:v.height}}function g(t){var e=c(t),o=t.offsetWidth,i=t.offsetHeight;return Math.abs(e.width-o)<=1&&(o=e.width),Math.abs(e.height-i)<=1&&(i=e.height),{x:t.offsetLeft,y:t.offsetTop,width:o,height:i}}function w(t){return"html"===d(t)?t:t.assignedSlot||t.parentNode||(r(t)?t.host:null)||h(t)}function x(t){return["html","body","#document"].indexOf(d(t))>=0?t.ownerDocument.body:n(t)&&y(t)?t:x(w(t))}function O(t,e){var i;void 0===e&&(e=[]);var n=x(t),r=n===(null==(i=t.ownerDocument)?void 0:i.body),s=o(n),a=r?[s].concat(s.visualViewport||[],y(n)?n:[]):n,p=e.concat(a);return r?p:p.concat(O(w(a)))}function E(t){return["table","td","th"].indexOf(d(t))>=0}function A(t){return n(t)&&"fixed"!==v(t).position?t.offsetParent:null}function R(t){for(var e=o(t),i=A(t);i&&E(i)&&"static"===v(i).position;)i=A(i);return i&&("html"===d(i)||"body"===d(i)&&"static"===v(i).position)?e:i||function(t){var e=/firefox/i.test(l());if(/Trident/i.test(l())&&n(t)&&"fixed"===v(t).position)return null;var o=w(t);for(r(o)&&(o=o.host);n(o)&&["html","body"].indexOf(d(o))<0;){var i=v(o);if("none"!==i.transform||"none"!==i.perspective||"paint"===i.contain||-1!==["transform","perspective"].indexOf(i.willChange)||e&&"filter"===i.willChange||e&&i.filter&&"none"!==i.filter)return o;o=o.parentNode}return null}(t)||e}var j="top",D="bottom",H="right",S="left",T="auto",L=[j,D,H,S],M="start",P="end",k="clippingParents",W="viewport",C="popper",B="reference",q=L.reduce((function(t,e){return t.concat([e+"-"+M,e+"-"+P])}),[]),V=[].concat(L,[T]).reduce((function(t,e){return t.concat([e,e+"-"+M,e+"-"+P])}),[]),N=["beforeRead","read","afterRead","beforeMain","main","afterMain","beforeWrite","write","afterWrite"];function F(t){var e=new Map,o=new Set,i=[];function n(t){o.add(t.name),[].concat(t.requires||[],t.requiresIfExists||[]).forEach((function(t){if(!o.has(t)){var i=e.get(t);i&&n(i)}})),i.push(t)}return t.forEach((function(t){e.set(t.name,t)})),t.forEach((function(t){o.has(t.name)||n(t)})),i}var I={placement:"bottom",modifiers:[],strategy:"absolute"};function _(){for(var t=arguments.length,e=new Array(t),o=0;o<t;o++)e[o]=arguments[o];return!e.some((function(t){return!(t&&"function"==typeof t.getBoundingClientRect)}))}function U(t){void 0===t&&(t={});var e=t,o=e.defaultModifiers,n=void 0===o?[]:o,r=e.defaultOptions,s=void 0===r?I:r;return function(t,e,o){void 0===o&&(o=s);var r,a,p={placement:"bottom",orderedModifiers:[],options:Object.assign({},I,s),modifiersData:{},elements:{reference:t,popper:e},attributes:{},styles:{}},l=[],f=!1,c={state:p,setOptions:function(o){var r="function"==typeof o?o(p.options):o;u(),p.options=Object.assign({},s,p.options,r),p.scrollParents={reference:i(t)?O(t):t.contextElement?O(t.contextElement):[],popper:O(e)};var a,f,d=function(t){var e=F(t);return N.reduce((function(t,o){return t.concat(e.filter((function(t){return t.phase===o})))}),[])}((a=[].concat(n,p.options.modifiers),f=a.reduce((function(t,e){var o=t[e.name];return t[e.name]=o?Object.assign({},o,e,{options:Object.assign({},o.options,e.options),data:Object.assign({},o.data,e.data)}):e,t}),{}),Object.keys(f).map((function(t){return f[t]}))));return p.orderedModifiers=d.filter((function(t){return t.enabled})),p.orderedModifiers.forEach((function(t){var e=t.name,o=t.options,i=void 0===o?{}:o,n=t.effect;if("function"==typeof n){var r=n({state:p,name:e,instance:c,options:i}),s=function(){};l.push(r||s)}})),c.update()},forceUpdate:function(){if(!f){var t=p.elements,e=t.reference,o=t.popper;if(_(e,o)){p.rects={reference:b(e,R(o),"fixed"===p.options.strategy),popper:g(o)},p.reset=!1,p.placement=p.options.placement,p.orderedModifiers.forEach((function(t){return p.modifiersData[t.name]=Object.assign({},t.data)}));for(var i=0;i<p.orderedModifiers.length;i++)if(!0!==p.reset){var n=p.orderedModifiers[i],r=n.fn,s=n.options,a=void 0===s?{}:s,l=n.name;"function"==typeof r&&(p=r({state:p,options:a,name:l,instance:c})||p)}else p.reset=!1,i=-1}}},update:(r=function(){return new Promise((function(t){c.forceUpdate(),t(p)}))},function(){return a||(a=new Promise((function(t){Promise.resolve().then((function(){a=void 0,t(r())}))}))),a}),destroy:function(){u(),f=!0}};if(!_(t,e))return c;function u(){l.forEach((function(t){return t()})),l=[]}return c.setOptions(o).then((function(t){!f&&o.onFirstUpdate&&o.onFirstUpdate(t)})),c}}var z={passive:!0};function Q(t){return t.split("-")[0]}function X(t){return t.split("-")[1]}function Y(t){return["top","bottom"].indexOf(t)>=0?"x":"y"}function J(t){var e,o=t.reference,i=t.element,n=t.placement,r=n?Q(n):null,s=n?X(n):null,a=o.x+o.width/2-i.width/2,p=o.y+o.height/2-i.height/2;switch(r){case j:e={x:a,y:o.y-i.height};break;case D:e={x:a,y:o.y+o.height};break;case H:e={x:o.x+o.width,y:p};break;case S:e={x:o.x-i.width,y:p};break;default:e={x:o.x,y:o.y}}var l=r?Y(r):null;if(null!=l){var f="y"===l?"height":"width";switch(s){case M:e[l]=e[l]-(o[f]/2-i[f]/2);break;case P:e[l]=e[l]+(o[f]/2-i[f]/2)}}return e}var G={top:"auto",right:"auto",bottom:"auto",left:"auto"};function K(t){var e,i=t.popper,n=t.popperRect,r=t.placement,s=t.variation,a=t.offsets,l=t.position,f=t.gpuAcceleration,c=t.adaptive,u=t.roundOffsets,d=t.isFixed,m=a.x,y=void 0===m?0:m,b=a.y,g=void 0===b?0:b,w="function"==typeof u?u({x:y,y:g}):{x:y,y:g};y=w.x,g=w.y;var x=a.hasOwnProperty("x"),O=a.hasOwnProperty("y"),E=S,A=j,T=window;if(c){var L=R(i),M="clientHeight",k="clientWidth";if(L===o(i)&&"static"!==v(L=h(i)).position&&"absolute"===l&&(M="scrollHeight",k="scrollWidth"),r===j||(r===S||r===H)&&s===P)A=D,g-=(d&&L===T&&T.visualViewport?T.visualViewport.height:L[M])-n.height,g*=f?1:-1;if(r===S||(r===j||r===D)&&s===P)E=H,y-=(d&&L===T&&T.visualViewport?T.visualViewport.width:L[k])-n.width,y*=f?1:-1}var W,C=Object.assign({position:l},c&&G),B=!0===u?function(t,e){var o=t.x,i=t.y,n=e.devicePixelRatio||1;return{x:p(o*n)/n||0,y:p(i*n)/n||0}}({x:y,y:g},o(i)):{x:y,y:g};return y=B.x,g=B.y,f?Object.assign({},C,((W={})[A]=O?"0":"",W[E]=x?"0":"",W.transform=(T.devicePixelRatio||1)<=1?"translate("+y+"px, "+g+"px)":"translate3d("+y+"px, "+g+"px, 0)",W)):Object.assign({},C,((e={})[A]=O?g+"px":"",e[E]=x?y+"px":"",e.transform="",e))}const Z={name:"offset",enabled:!0,phase:"main",requires:["popperOffsets"],fn:function(t){var e=t.state,o=t.options,i=t.name,n=o.offset,r=void 0===n?[0,0]:n,s=V.reduce((function(t,o){return t[o]=function(t,e,o){var i=Q(t),n=[S,j].indexOf(i)>=0?-1:1,r="function"==typeof o?o(Object.assign({},e,{placement:t})):o,s=r[0],a=r[1];return s=s||0,a=(a||0)*n,[S,H].indexOf(i)>=0?{x:a,y:s}:{x:s,y:a}}(o,e.rects,r),t}),{}),a=s[e.placement],p=a.x,l=a.y;null!=e.modifiersData.popperOffsets&&(e.modifiersData.popperOffsets.x+=p,e.modifiersData.popperOffsets.y+=l),e.modifiersData[i]=s}};var $={left:"right",right:"left",bottom:"top",top:"bottom"};function tt(t){return t.replace(/left|right|bottom|top/g,(function(t){return $[t]}))}var et={start:"end",end:"start"};function ot(t){return t.replace(/start|end/g,(function(t){return et[t]}))}function it(t,e){var o=e.getRootNode&&e.getRootNode();if(t.contains(e))return!0;if(o&&r(o)){var i=e;do{if(i&&t.isSameNode(i))return!0;i=i.parentNode||i.host}while(i)}return!1}function nt(t){return Object.assign({},t,{left:t.x,top:t.y,right:t.x+t.width,bottom:t.y+t.height})}function rt(t,e,n){return e===W?nt(function(t,e){var i=o(t),n=h(t),r=i.visualViewport,s=n.clientWidth,a=n.clientHeight,p=0,l=0;if(r){s=r.width,a=r.height;var c=f();(c||!c&&"fixed"===e)&&(p=r.offsetLeft,l=r.offsetTop)}return{width:s,height:a,x:p+m(t),y:l}}(t,n)):i(e)?function(t,e){var o=c(t,!1,"fixed"===e);return o.top=o.top+t.clientTop,o.left=o.left+t.clientLeft,o.bottom=o.top+t.clientHeight,o.right=o.left+t.clientWidth,o.width=t.clientWidth,o.height=t.clientHeight,o.x=o.left,o.y=o.top,o}(e,n):nt(function(t){var e,o=h(t),i=u(t),n=null==(e=t.ownerDocument)?void 0:e.body,r=s(o.scrollWidth,o.clientWidth,n?n.scrollWidth:0,n?n.clientWidth:0),a=s(o.scrollHeight,o.clientHeight,n?n.scrollHeight:0,n?n.clientHeight:0),p=-i.scrollLeft+m(t),l=-i.scrollTop;return"rtl"===v(n||o).direction&&(p+=s(o.clientWidth,n?n.clientWidth:0)-r),{width:r,height:a,x:p,y:l}}(h(t)))}function st(t,e,o,r){var p="clippingParents"===e?function(t){var e=O(w(t)),o=["absolute","fixed"].indexOf(v(t).position)>=0&&n(t)?R(t):t;return i(o)?e.filter((function(t){return i(t)&&it(t,o)&&"body"!==d(t)})):[]}(t):[].concat(e),l=[].concat(p,[o]),f=l[0],c=l.reduce((function(e,o){var i=rt(t,o,r);return e.top=s(i.top,e.top),e.right=a(i.right,e.right),e.bottom=a(i.bottom,e.bottom),e.left=s(i.left,e.left),e}),rt(t,f,r));return c.width=c.right-c.left,c.height=c.bottom-c.top,c.x=c.left,c.y=c.top,c}function at(t){return Object.assign({},{top:0,right:0,bottom:0,left:0},t)}function pt(t,e){return e.reduce((function(e,o){return e[o]=t,e}),{})}function lt(t,e){void 0===e&&(e={});var o=e,n=o.placement,r=void 0===n?t.placement:n,s=o.strategy,a=void 0===s?t.strategy:s,p=o.boundary,l=void 0===p?k:p,f=o.rootBoundary,u=void 0===f?W:f,d=o.elementContext,m=void 0===d?C:d,v=o.altBoundary,y=void 0!==v&&v,b=o.padding,g=void 0===b?0:b,w=at("number"!=typeof g?g:pt(g,L)),x=m===C?B:C,O=t.rects.popper,E=t.elements[y?x:m],A=st(i(E)?E:E.contextElement||h(t.elements.popper),l,u,a),R=c(t.elements.reference),S=J({reference:R,element:O,strategy:"absolute",placement:r}),T=nt(Object.assign({},O,S)),M=m===C?T:R,P={top:A.top-M.top+w.top,bottom:M.bottom-A.bottom+w.bottom,left:A.left-M.left+w.left,right:M.right-A.right+w.right},q=t.modifiersData.offset;if(m===C&&q){var V=q[r];Object.keys(P).forEach((function(t){var e=[H,D].indexOf(t)>=0?1:-1,o=[j,D].indexOf(t)>=0?"y":"x";P[t]+=V[o]*e}))}return P}function ft(t,e,o){return s(t,a(e,o))}const ct={name:"preventOverflow",enabled:!0,phase:"main",fn:function(t){var e=t.state,o=t.options,i=t.name,n=o.mainAxis,r=void 0===n||n,p=o.altAxis,l=void 0!==p&&p,f=o.boundary,c=o.rootBoundary,u=o.altBoundary,d=o.padding,h=o.tether,m=void 0===h||h,v=o.tetherOffset,y=void 0===v?0:v,b=lt(e,{boundary:f,rootBoundary:c,padding:d,altBoundary:u}),w=Q(e.placement),x=X(e.placement),O=!x,E=Y(w),A="x"===E?"y":"x",T=e.modifiersData.popperOffsets,L=e.rects.reference,P=e.rects.popper,k="function"==typeof y?y(Object.assign({},e.rects,{placement:e.placement})):y,W="number"==typeof k?{mainAxis:k,altAxis:k}:Object.assign({mainAxis:0,altAxis:0},k),C=e.modifiersData.offset?e.modifiersData.offset[e.placement]:null,B={x:0,y:0};if(T){if(r){var q,V="y"===E?j:S,N="y"===E?D:H,F="y"===E?"height":"width",I=T[E],_=I+b[V],U=I-b[N],z=m?-P[F]/2:0,J=x===M?L[F]:P[F],G=x===M?-P[F]:-L[F],K=e.elements.arrow,Z=m&&K?g(K):{width:0,height:0},$=e.modifiersData["arrow#persistent"]?e.modifiersData["arrow#persistent"].padding:{top:0,right:0,bottom:0,left:0},tt=$[V],et=$[N],ot=ft(0,L[F],Z[F]),it=O?L[F]/2-z-ot-tt-W.mainAxis:J-ot-tt-W.mainAxis,nt=O?-L[F]/2+z+ot+et+W.mainAxis:G+ot+et+W.mainAxis,rt=e.elements.arrow&&R(e.elements.arrow),st=rt?"y"===E?rt.clientTop||0:rt.clientLeft||0:0,at=null!=(q=null==C?void 0:C[E])?q:0,pt=I+nt-at,ct=ft(m?a(_,I+it-at-st):_,I,m?s(U,pt):U);T[E]=ct,B[E]=ct-I}if(l){var ut,dt="x"===E?j:S,ht="x"===E?D:H,mt=T[A],vt="y"===A?"height":"width",yt=mt+b[dt],bt=mt-b[ht],gt=-1!==[j,S].indexOf(w),wt=null!=(ut=null==C?void 0:C[A])?ut:0,xt=gt?yt:mt-L[vt]-P[vt]-wt+W.altAxis,Ot=gt?mt+L[vt]+P[vt]-wt-W.altAxis:bt,Et=m&&gt?function(t,e,o){var i=ft(t,e,o);return i>o?o:i}(xt,mt,Ot):ft(m?xt:yt,mt,m?Ot:bt);T[A]=Et,B[A]=Et-mt}e.modifiersData[i]=B}},requiresIfExists:["offset"]};const ut={name:"arrow",enabled:!0,phase:"main",fn:function(t){var e,o=t.state,i=t.name,n=t.options,r=o.elements.arrow,s=o.modifiersData.popperOffsets,a=Q(o.placement),p=Y(a),l=[S,H].indexOf(a)>=0?"height":"width";if(r&&s){var f=function(t,e){return at("number"!=typeof(t="function"==typeof t?t(Object.assign({},e.rects,{placement:e.placement})):t)?t:pt(t,L))}(n.padding,o),c=g(r),u="y"===p?j:S,d="y"===p?D:H,h=o.rects.reference[l]+o.rects.reference[p]-s[p]-o.rects.popper[l],m=s[p]-o.rects.reference[p],v=R(r),y=v?"y"===p?v.clientHeight||0:v.clientWidth||0:0,b=h/2-m/2,w=f[u],x=y-c[l]-f[d],O=y/2-c[l]/2+b,E=ft(w,O,x),A=p;o.modifiersData[i]=((e={})[A]=E,e.centerOffset=E-O,e)}},effect:function(t){var e=t.state,o=t.options.element,i=void 0===o?"[data-popper-arrow]":o;null!=i&&("string"!=typeof i||(i=e.elements.popper.querySelector(i)))&&it(e.elements.popper,i)&&(e.elements.arrow=i)},requires:["popperOffsets"],requiresIfExists:["preventOverflow"]};function dt(t,e,o){return void 0===o&&(o={x:0,y:0}),{top:t.top-e.height-o.y,right:t.right-e.width+o.x,bottom:t.bottom-e.height+o.y,left:t.left-e.width-o.x}}function ht(t){return[j,H,D,S].some((function(e){return t[e]>=0}))}var mt=U({defaultModifiers:[{name:"eventListeners",enabled:!0,phase:"write",fn:function(){},effect:function(t){var e=t.state,i=t.instance,n=t.options,r=n.scroll,s=void 0===r||r,a=n.resize,p=void 0===a||a,l=o(e.elements.popper),f=[].concat(e.scrollParents.reference,e.scrollParents.popper);return s&&f.forEach((function(t){t.addEventListener("scroll",i.update,z)})),p&&l.addEventListener("resize",i.update,z),function(){s&&f.forEach((function(t){t.removeEventListener("scroll",i.update,z)})),p&&l.removeEventListener("resize",i.update,z)}},data:{}},{name:"popperOffsets",enabled:!0,phase:"read",fn:function(t){var e=t.state,o=t.name;e.modifiersData[o]=J({reference:e.rects.reference,element:e.rects.popper,strategy:"absolute",placement:e.placement})},data:{}},{name:"computeStyles",enabled:!0,phase:"beforeWrite",fn:function(t){var e=t.state,o=t.options,i=o.gpuAcceleration,n=void 0===i||i,r=o.adaptive,s=void 0===r||r,a=o.roundOffsets,p=void 0===a||a,l={placement:Q(e.placement),variation:X(e.placement),popper:e.elements.popper,popperRect:e.rects.popper,gpuAcceleration:n,isFixed:"fixed"===e.options.strategy};null!=e.modifiersData.popperOffsets&&(e.styles.popper=Object.assign({},e.styles.popper,K(Object.assign({},l,{offsets:e.modifiersData.popperOffsets,position:e.options.strategy,adaptive:s,roundOffsets:p})))),null!=e.modifiersData.arrow&&(e.styles.arrow=Object.assign({},e.styles.arrow,K(Object.assign({},l,{offsets:e.modifiersData.arrow,position:"absolute",adaptive:!1,roundOffsets:p})))),e.attributes.popper=Object.assign({},e.attributes.popper,{"data-popper-placement":e.placement})},data:{}},{name:"applyStyles",enabled:!0,phase:"write",fn:function(t){var e=t.state;Object.keys(e.elements).forEach((function(t){var o=e.styles[t]||{},i=e.attributes[t]||{},r=e.elements[t];n(r)&&d(r)&&(Object.assign(r.style,o),Object.keys(i).forEach((function(t){var e=i[t];!1===e?r.removeAttribute(t):r.setAttribute(t,!0===e?"":e)})))}))},effect:function(t){var e=t.state,o={popper:{position:e.options.strategy,left:"0",top:"0",margin:"0"},arrow:{position:"absolute"},reference:{}};return Object.assign(e.elements.popper.style,o.popper),e.styles=o,e.elements.arrow&&Object.assign(e.elements.arrow.style,o.arrow),function(){Object.keys(e.elements).forEach((function(t){var i=e.elements[t],r=e.attributes[t]||{},s=Object.keys(e.styles.hasOwnProperty(t)?e.styles[t]:o[t]).reduce((function(t,e){return t[e]="",t}),{});n(i)&&d(i)&&(Object.assign(i.style,s),Object.keys(r).forEach((function(t){i.removeAttribute(t)})))}))}},requires:["computeStyles"]},Z,{name:"flip",enabled:!0,phase:"main",fn:function(t){var e=t.state,o=t.options,i=t.name;if(!e.modifiersData[i]._skip){for(var n=o.mainAxis,r=void 0===n||n,s=o.altAxis,a=void 0===s||s,p=o.fallbackPlacements,l=o.padding,f=o.boundary,c=o.rootBoundary,u=o.altBoundary,d=o.flipVariations,h=void 0===d||d,m=o.allowedAutoPlacements,v=e.options.placement,y=Q(v),b=p||(y===v||!h?[tt(v)]:function(t){if(Q(t)===T)return[];var e=tt(t);return[ot(t),e,ot(e)]}(v)),g=[v].concat(b).reduce((function(t,o){return t.concat(Q(o)===T?function(t,e){void 0===e&&(e={});var o=e,i=o.placement,n=o.boundary,r=o.rootBoundary,s=o.padding,a=o.flipVariations,p=o.allowedAutoPlacements,l=void 0===p?V:p,f=X(i),c=f?a?q:q.filter((function(t){return X(t)===f})):L,u=c.filter((function(t){return l.indexOf(t)>=0}));0===u.length&&(u=c);var d=u.reduce((function(e,o){return e[o]=lt(t,{placement:o,boundary:n,rootBoundary:r,padding:s})[Q(o)],e}),{});return Object.keys(d).sort((function(t,e){return d[t]-d[e]}))}(e,{placement:o,boundary:f,rootBoundary:c,padding:l,flipVariations:h,allowedAutoPlacements:m}):o)}),[]),w=e.rects.reference,x=e.rects.popper,O=new Map,E=!0,A=g[0],R=0;R<g.length;R++){var P=g[R],k=Q(P),W=X(P)===M,C=[j,D].indexOf(k)>=0,B=C?"width":"height",N=lt(e,{placement:P,boundary:f,rootBoundary:c,altBoundary:u,padding:l}),F=C?W?H:S:W?D:j;w[B]>x[B]&&(F=tt(F));var I=tt(F),_=[];if(r&&_.push(N[k]<=0),a&&_.push(N[F]<=0,N[I]<=0),_.every((function(t){return t}))){A=P,E=!1;break}O.set(P,_)}if(E)for(var U=function(t){var e=g.find((function(e){var o=O.get(e);if(o)return o.slice(0,t).every((function(t){return t}))}));if(e)return A=e,"break"},z=h?3:1;z>0;z--){if("break"===U(z))break}e.placement!==A&&(e.modifiersData[i]._skip=!0,e.placement=A,e.reset=!0)}},requiresIfExists:["offset"],data:{_skip:!1}},ct,ut,{name:"hide",enabled:!0,phase:"main",requiresIfExists:["preventOverflow"],fn:function(t){var e=t.state,o=t.name,i=e.rects.reference,n=e.rects.popper,r=e.modifiersData.preventOverflow,s=lt(e,{elementContext:"reference"}),a=lt(e,{altBoundary:!0}),p=dt(s,i),l=dt(a,n,r),f=ht(p),c=ht(l);e.modifiersData[o]={referenceClippingOffsets:p,popperEscapeOffsets:l,isReferenceHidden:f,hasPopperEscaped:c},e.attributes.popper=Object.assign({},e.attributes.popper,{"data-popper-reference-hidden":f,"data-popper-escaped":c})}}]});class vt{constructor(t){this.options={type:"button",element:null,placement:"auto",delay:400,duration:600,arrow:!0,beforeShow:()=>{},afterShow:()=>{},beforeHide:()=>{},afterHide:()=>{},...t},this.init()}tooltipRef;tooltip;options;eventTransitionEndOnShow=t=>{this.tooltip.classList.contains("webcimes-tooltip--show")&&"opacity"==t.propertyName&&(this.tooltipRef.dispatchEvent(new CustomEvent("afterShow")),this.tooltip.dispatchEvent(new CustomEvent("afterShow")),"function"==typeof this.options.afterShow&&this.options.afterShow())};getUniqueID=t=>{do{t+=Math.floor(1e4*Math.random())}while(document.querySelector("[data-tooltip-target='"+t+"']"));return t};getHtmlElements=t=>{let e=[];return t instanceof NodeList&&(e=[...Array.from(t)]),t instanceof HTMLElement&&(e=[t]),"string"==typeof t&&(e=[...Array.from(document.querySelectorAll(t))]),e};getHtmlElement=t=>{let e=null;return t instanceof HTMLElement&&(e=t),"string"==typeof t&&(e=document.querySelector(t)),e};show(){this.tooltipRef&&this.tooltip&&("title"!=this.options.type||document.querySelector(".webcimes-tooltip--title#"+this.tooltipRef.getAttribute("data-tooltip-target"))||(document.body.insertAdjacentHTML("beforeend",this.tooltip.outerHTML),this.tooltip=document.body.lastElementChild),this.tooltip.tooltipPlacement=this.tooltipRef.getAttribute("data-tooltip-placement")||this.options.placement,this.tooltip.tooltipDelay=this.tooltipRef.getAttribute("data-tooltip-delay")||this.options.delay,this.tooltip.tooltipDuration=this.tooltipRef.getAttribute("data-tooltip-duration")||this.options.duration,this.tooltip.tooltipArrow=JSON.parse(this.tooltipRef.getAttribute("data-tooltip-arrow")||this.options.arrow),this.tooltip.style.setProperty("--tooltip-duration",this.tooltip.tooltipDuration+"ms"),this.tooltip.tooltipArrow&&(this.tooltip.querySelector(".webcimes-tooltip__arrow")||this.tooltip.insertAdjacentHTML("beforeend",'<div class="webcimes-tooltip__arrow" data-popper-arrow></div>')),clearTimeout(this.tooltip.tooltipHideTimeout),this.tooltip.tooltipShowTimeout=setTimeout((()=>{this.tooltip.tooltipAlreadyShow||setTimeout((()=>{this.tooltipRef.dispatchEvent(new CustomEvent("beforeShow")),this.tooltip.dispatchEvent(new CustomEvent("beforeShow")),"function"==typeof this.options.beforeShow&&this.options.beforeShow()}),0),this.tooltip.classList.add("webcimes-tooltip--show"),this.tooltip.tooltipAlreadyShow=!0}),this.tooltip.tooltipAlreadyShow?0:this.tooltip.tooltipDelay),this.tooltip.addEventListener("transitionend",this.eventTransitionEndOnShow),void 0===this.tooltip.popper&&(this.tooltip.popper=mt(this.tooltipRef,this.tooltip,{placement:this.tooltip.tooltipPlacement,strategy:"absolute",modifiers:[{name:"offset",options:{offset:[0,10]}}]})))}hide(t){this.tooltip&&(this.tooltipRef.dispatchEvent(new CustomEvent("beforeHide")),this.tooltip.dispatchEvent(new CustomEvent("beforeHide")),"function"==typeof this.options.beforeHide&&this.options.beforeHide(),clearTimeout(this.tooltip.tooltipShowTimeout),this.tooltip.classList.remove("webcimes-tooltip--show"),this.tooltip.removeEventListener("transitionend",this.eventTransitionEndOnShow),this.tooltip.tooltipHideTimeout=setTimeout((()=>{void 0!==this.tooltip?.popper&&(this.tooltip.popper.destroy(),delete this.tooltip.popper),delete this.tooltip?.tooltipPlacement,delete this.tooltip?.tooltipDelay,delete this.tooltip?.tooltipDuration,delete this.tooltip?.tooltipArrow,delete this.tooltip?.tooltipAlreadyShow,delete this.tooltip?.tooltipShowTimeout,delete this.tooltip?.tooltipHideTimeout,this.tooltipRef.dispatchEvent(new CustomEvent("afterHide")),this.tooltip.dispatchEvent(new CustomEvent("afterHide")),"function"==typeof this.options.afterHide&&this.options.afterHide(),"function"==typeof t&&t()}),this.tooltip.tooltipDuration))}init(){this.tooltipRef=this.getHtmlElement(this.options.element),"button"==this.options.type?this.tooltipForButton():"title"==this.options.type&&this.tooltipForTitle()}tooltipForButton(){this.tooltipRef&&(this.tooltip=this.tooltipRef.nextElementSibling,this.tooltipRef&&this.tooltip&&(this.tooltip.classList.add("webcimes-tooltip","webcimes-tooltip--button"),this.tooltipRef.addEventListener("click",(t=>{this.show()})),document.addEventListener("click",(t=>{t.target!=this.tooltipRef&&t.target.closest(".webcimes-tooltip")!=this.tooltip&&this.hide()}))))}tooltipForTitle(){if(this.tooltipRef){this.tooltipRef.setAttribute("data-tooltip-title",this.tooltipRef.getAttribute("title")),this.tooltipRef.removeAttribute("title");const t=this.getUniqueID("tooltipTitle");this.tooltipRef.setAttribute("data-tooltip-target",t);let e=document.createElement("template");e.innerHTML='<div class="webcimes-tooltip webcimes-tooltip--title" id="'+t+'">'+this.tooltipRef.getAttribute("data-tooltip-title")+"</div>",this.tooltip=e.content.firstChild,document.addEventListener("mouseenter",(t=>{t.target!=this.tooltipRef&&t.target!=this.tooltip||this.show()}),!0),document.addEventListener("mouseleave",(t=>{t.target!=this.tooltipRef&&t.target!=this.tooltip||this.hide((()=>{this.tooltip?.remove()}))}),!0)}}}var yt=e.Q;export{yt as WebcimesTooltip};
//# sourceMappingURL=webcimes-tooltip.esm.js.map