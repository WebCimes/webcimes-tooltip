!function(t,e){if("object"==typeof exports&&"object"==typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var o=e();for(var n in o)("object"==typeof exports?exports:t)[n]=o[n]}}(self,(()=>(()=>{"use strict";var t={d:(e,o)=>{for(var n in o)t.o(o,n)&&!t.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:o[n]})},o:(t,e)=>Object.prototype.hasOwnProperty.call(t,e),r:t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}},e={};function o(t){if(null==t)return window;if("[object Window]"!==t.toString()){var e=t.ownerDocument;return e&&e.defaultView||window}return t}function n(t){return t instanceof o(t).Element||t instanceof Element}function r(t){return t instanceof o(t).HTMLElement||t instanceof HTMLElement}function i(t){return"undefined"!=typeof ShadowRoot&&(t instanceof o(t).ShadowRoot||t instanceof ShadowRoot)}t.r(e),t.d(e,{webcimesTooltip:()=>bt,webcimesTooltipTitle:()=>wt});var a=Math.max,s=Math.min,f=Math.round;function l(){var t=navigator.userAgentData;return null!=t&&t.brands&&Array.isArray(t.brands)?t.brands.map((function(t){return t.brand+"/"+t.version})).join(" "):navigator.userAgent}function c(){return!/^((?!chrome|android).)*safari/i.test(l())}function p(t,e,i){void 0===e&&(e=!1),void 0===i&&(i=!1);var a=t.getBoundingClientRect(),s=1,l=1;e&&r(t)&&(s=t.offsetWidth>0&&f(a.width)/t.offsetWidth||1,l=t.offsetHeight>0&&f(a.height)/t.offsetHeight||1);var p=(n(t)?o(t):window).visualViewport,u=!c()&&i,d=(a.left+(u&&p?p.offsetLeft:0))/s,m=(a.top+(u&&p?p.offsetTop:0))/l,h=a.width/s,v=a.height/l;return{width:h,height:v,top:m,right:d+h,bottom:m+v,left:d,x:d,y:m}}function u(t){var e=o(t);return{scrollLeft:e.pageXOffset,scrollTop:e.pageYOffset}}function d(t){return t?(t.nodeName||"").toLowerCase():null}function m(t){return((n(t)?t.ownerDocument:t.document)||window.document).documentElement}function h(t){return p(m(t)).left+u(t).scrollLeft}function v(t){return o(t).getComputedStyle(t)}function y(t){var e=v(t),o=e.overflow,n=e.overflowX,r=e.overflowY;return/auto|scroll|overlay|hidden/.test(o+r+n)}function g(t,e,n){void 0===n&&(n=!1);var i,a,s=r(e),l=r(e)&&function(t){var e=t.getBoundingClientRect(),o=f(e.width)/t.offsetWidth||1,n=f(e.height)/t.offsetHeight||1;return 1!==o||1!==n}(e),c=m(e),v=p(t,l,n),g={scrollLeft:0,scrollTop:0},b={x:0,y:0};return(s||!s&&!n)&&(("body"!==d(e)||y(c))&&(g=(i=e)!==o(i)&&r(i)?{scrollLeft:(a=i).scrollLeft,scrollTop:a.scrollTop}:u(i)),r(e)?((b=p(e,!0)).x+=e.clientLeft,b.y+=e.clientTop):c&&(b.x=h(c))),{x:v.left+g.scrollLeft-b.x,y:v.top+g.scrollTop-b.y,width:v.width,height:v.height}}function b(t){var e=p(t),o=t.offsetWidth,n=t.offsetHeight;return Math.abs(e.width-o)<=1&&(o=e.width),Math.abs(e.height-n)<=1&&(n=e.height),{x:t.offsetLeft,y:t.offsetTop,width:o,height:n}}function w(t){return"html"===d(t)?t:t.assignedSlot||t.parentNode||(i(t)?t.host:null)||m(t)}function x(t){return["html","body","#document"].indexOf(d(t))>=0?t.ownerDocument.body:r(t)&&y(t)?t:x(w(t))}function O(t,e){var n;void 0===e&&(e=[]);var r=x(t),i=r===(null==(n=t.ownerDocument)?void 0:n.body),a=o(r),s=i?[a].concat(a.visualViewport||[],y(r)?r:[]):r,f=e.concat(s);return i?f:f.concat(O(w(s)))}function A(t){return["table","td","th"].indexOf(d(t))>=0}function j(t){return r(t)&&"fixed"!==v(t).position?t.offsetParent:null}function E(t){for(var e=o(t),n=j(t);n&&A(n)&&"static"===v(n).position;)n=j(n);return n&&("html"===d(n)||"body"===d(n)&&"static"===v(n).position)?e:n||function(t){var e=/firefox/i.test(l());if(/Trident/i.test(l())&&r(t)&&"fixed"===v(t).position)return null;var o=w(t);for(i(o)&&(o=o.host);r(o)&&["html","body"].indexOf(d(o))<0;){var n=v(o);if("none"!==n.transform||"none"!==n.perspective||"paint"===n.contain||-1!==["transform","perspective"].indexOf(n.willChange)||e&&"filter"===n.willChange||e&&n.filter&&"none"!==n.filter)return o;o=o.parentNode}return null}(t)||e}var D="top",T="bottom",S="right",L="left",P="auto",M=[D,T,S,L],k="start",H="end",W="clippingParents",B="viewport",q="popper",R="reference",C=M.reduce((function(t,e){return t.concat([e+"-"+k,e+"-"+H])}),[]),V=[].concat(M,[P]).reduce((function(t,e){return t.concat([e,e+"-"+k,e+"-"+H])}),[]),N=["beforeRead","read","afterRead","beforeMain","main","afterMain","beforeWrite","write","afterWrite"];function I(t){var e=new Map,o=new Set,n=[];function r(t){o.add(t.name),[].concat(t.requires||[],t.requiresIfExists||[]).forEach((function(t){if(!o.has(t)){var n=e.get(t);n&&r(n)}})),n.push(t)}return t.forEach((function(t){e.set(t.name,t)})),t.forEach((function(t){o.has(t.name)||r(t)})),n}var _={placement:"bottom",modifiers:[],strategy:"absolute"};function F(){for(var t=arguments.length,e=new Array(t),o=0;o<t;o++)e[o]=arguments[o];return!e.some((function(t){return!(t&&"function"==typeof t.getBoundingClientRect)}))}function U(t){void 0===t&&(t={});var e=t,o=e.defaultModifiers,r=void 0===o?[]:o,i=e.defaultOptions,a=void 0===i?_:i;return function(t,e,o){void 0===o&&(o=a);var i,s,f={placement:"bottom",orderedModifiers:[],options:Object.assign({},_,a),modifiersData:{},elements:{reference:t,popper:e},attributes:{},styles:{}},l=[],c=!1,p={state:f,setOptions:function(o){var i="function"==typeof o?o(f.options):o;u(),f.options=Object.assign({},a,f.options,i),f.scrollParents={reference:n(t)?O(t):t.contextElement?O(t.contextElement):[],popper:O(e)};var s,c,d=function(t){var e=I(t);return N.reduce((function(t,o){return t.concat(e.filter((function(t){return t.phase===o})))}),[])}((s=[].concat(r,f.options.modifiers),c=s.reduce((function(t,e){var o=t[e.name];return t[e.name]=o?Object.assign({},o,e,{options:Object.assign({},o.options,e.options),data:Object.assign({},o.data,e.data)}):e,t}),{}),Object.keys(c).map((function(t){return c[t]}))));return f.orderedModifiers=d.filter((function(t){return t.enabled})),f.orderedModifiers.forEach((function(t){var e=t.name,o=t.options,n=void 0===o?{}:o,r=t.effect;if("function"==typeof r){var i=r({state:f,name:e,instance:p,options:n}),a=function(){};l.push(i||a)}})),p.update()},forceUpdate:function(){if(!c){var t=f.elements,e=t.reference,o=t.popper;if(F(e,o)){f.rects={reference:g(e,E(o),"fixed"===f.options.strategy),popper:b(o)},f.reset=!1,f.placement=f.options.placement,f.orderedModifiers.forEach((function(t){return f.modifiersData[t.name]=Object.assign({},t.data)}));for(var n=0;n<f.orderedModifiers.length;n++)if(!0!==f.reset){var r=f.orderedModifiers[n],i=r.fn,a=r.options,s=void 0===a?{}:a,l=r.name;"function"==typeof i&&(f=i({state:f,options:s,name:l,instance:p})||f)}else f.reset=!1,n=-1}}},update:(i=function(){return new Promise((function(t){p.forceUpdate(),t(f)}))},function(){return s||(s=new Promise((function(t){Promise.resolve().then((function(){s=void 0,t(i())}))}))),s}),destroy:function(){u(),c=!0}};if(!F(t,e))return p;function u(){l.forEach((function(t){return t()})),l=[]}return p.setOptions(o).then((function(t){!c&&o.onFirstUpdate&&o.onFirstUpdate(t)})),p}}var z={passive:!0};function J(t){return t.split("-")[0]}function X(t){return t.split("-")[1]}function Y(t){return["top","bottom"].indexOf(t)>=0?"x":"y"}function G(t){var e,o=t.reference,n=t.element,r=t.placement,i=r?J(r):null,a=r?X(r):null,s=o.x+o.width/2-n.width/2,f=o.y+o.height/2-n.height/2;switch(i){case D:e={x:s,y:o.y-n.height};break;case T:e={x:s,y:o.y+o.height};break;case S:e={x:o.x+o.width,y:f};break;case L:e={x:o.x-n.width,y:f};break;default:e={x:o.x,y:o.y}}var l=i?Y(i):null;if(null!=l){var c="y"===l?"height":"width";switch(a){case k:e[l]=e[l]-(o[c]/2-n[c]/2);break;case H:e[l]=e[l]+(o[c]/2-n[c]/2)}}return e}var K={top:"auto",right:"auto",bottom:"auto",left:"auto"};function Q(t){var e,n=t.popper,r=t.popperRect,i=t.placement,a=t.variation,s=t.offsets,l=t.position,c=t.gpuAcceleration,p=t.adaptive,u=t.roundOffsets,d=t.isFixed,h=s.x,y=void 0===h?0:h,g=s.y,b=void 0===g?0:g,w="function"==typeof u?u({x:y,y:b}):{x:y,y:b};y=w.x,b=w.y;var x=s.hasOwnProperty("x"),O=s.hasOwnProperty("y"),A=L,j=D,P=window;if(p){var M=E(n),k="clientHeight",W="clientWidth";if(M===o(n)&&"static"!==v(M=m(n)).position&&"absolute"===l&&(k="scrollHeight",W="scrollWidth"),i===D||(i===L||i===S)&&a===H)j=T,b-=(d&&M===P&&P.visualViewport?P.visualViewport.height:M[k])-r.height,b*=c?1:-1;if(i===L||(i===D||i===T)&&a===H)A=S,y-=(d&&M===P&&P.visualViewport?P.visualViewport.width:M[W])-r.width,y*=c?1:-1}var B,q=Object.assign({position:l},p&&K),R=!0===u?function(t,e){var o=t.x,n=t.y,r=e.devicePixelRatio||1;return{x:f(o*r)/r||0,y:f(n*r)/r||0}}({x:y,y:b},o(n)):{x:y,y:b};return y=R.x,b=R.y,c?Object.assign({},q,((B={})[j]=O?"0":"",B[A]=x?"0":"",B.transform=(P.devicePixelRatio||1)<=1?"translate("+y+"px, "+b+"px)":"translate3d("+y+"px, "+b+"px, 0)",B)):Object.assign({},q,((e={})[j]=O?b+"px":"",e[A]=x?y+"px":"",e.transform="",e))}const Z={name:"offset",enabled:!0,phase:"main",requires:["popperOffsets"],fn:function(t){var e=t.state,o=t.options,n=t.name,r=o.offset,i=void 0===r?[0,0]:r,a=V.reduce((function(t,o){return t[o]=function(t,e,o){var n=J(t),r=[L,D].indexOf(n)>=0?-1:1,i="function"==typeof o?o(Object.assign({},e,{placement:t})):o,a=i[0],s=i[1];return a=a||0,s=(s||0)*r,[L,S].indexOf(n)>=0?{x:s,y:a}:{x:a,y:s}}(o,e.rects,i),t}),{}),s=a[e.placement],f=s.x,l=s.y;null!=e.modifiersData.popperOffsets&&(e.modifiersData.popperOffsets.x+=f,e.modifiersData.popperOffsets.y+=l),e.modifiersData[n]=a}};var $={left:"right",right:"left",bottom:"top",top:"bottom"};function tt(t){return t.replace(/left|right|bottom|top/g,(function(t){return $[t]}))}var et={start:"end",end:"start"};function ot(t){return t.replace(/start|end/g,(function(t){return et[t]}))}function nt(t,e){var o=e.getRootNode&&e.getRootNode();if(t.contains(e))return!0;if(o&&i(o)){var n=e;do{if(n&&t.isSameNode(n))return!0;n=n.parentNode||n.host}while(n)}return!1}function rt(t){return Object.assign({},t,{left:t.x,top:t.y,right:t.x+t.width,bottom:t.y+t.height})}function it(t,e,r){return e===B?rt(function(t,e){var n=o(t),r=m(t),i=n.visualViewport,a=r.clientWidth,s=r.clientHeight,f=0,l=0;if(i){a=i.width,s=i.height;var p=c();(p||!p&&"fixed"===e)&&(f=i.offsetLeft,l=i.offsetTop)}return{width:a,height:s,x:f+h(t),y:l}}(t,r)):n(e)?function(t,e){var o=p(t,!1,"fixed"===e);return o.top=o.top+t.clientTop,o.left=o.left+t.clientLeft,o.bottom=o.top+t.clientHeight,o.right=o.left+t.clientWidth,o.width=t.clientWidth,o.height=t.clientHeight,o.x=o.left,o.y=o.top,o}(e,r):rt(function(t){var e,o=m(t),n=u(t),r=null==(e=t.ownerDocument)?void 0:e.body,i=a(o.scrollWidth,o.clientWidth,r?r.scrollWidth:0,r?r.clientWidth:0),s=a(o.scrollHeight,o.clientHeight,r?r.scrollHeight:0,r?r.clientHeight:0),f=-n.scrollLeft+h(t),l=-n.scrollTop;return"rtl"===v(r||o).direction&&(f+=a(o.clientWidth,r?r.clientWidth:0)-i),{width:i,height:s,x:f,y:l}}(m(t)))}function at(t,e,o,i){var f="clippingParents"===e?function(t){var e=O(w(t)),o=["absolute","fixed"].indexOf(v(t).position)>=0&&r(t)?E(t):t;return n(o)?e.filter((function(t){return n(t)&&nt(t,o)&&"body"!==d(t)})):[]}(t):[].concat(e),l=[].concat(f,[o]),c=l[0],p=l.reduce((function(e,o){var n=it(t,o,i);return e.top=a(n.top,e.top),e.right=s(n.right,e.right),e.bottom=s(n.bottom,e.bottom),e.left=a(n.left,e.left),e}),it(t,c,i));return p.width=p.right-p.left,p.height=p.bottom-p.top,p.x=p.left,p.y=p.top,p}function st(t){return Object.assign({},{top:0,right:0,bottom:0,left:0},t)}function ft(t,e){return e.reduce((function(e,o){return e[o]=t,e}),{})}function lt(t,e){void 0===e&&(e={});var o=e,r=o.placement,i=void 0===r?t.placement:r,a=o.strategy,s=void 0===a?t.strategy:a,f=o.boundary,l=void 0===f?W:f,c=o.rootBoundary,u=void 0===c?B:c,d=o.elementContext,h=void 0===d?q:d,v=o.altBoundary,y=void 0!==v&&v,g=o.padding,b=void 0===g?0:g,w=st("number"!=typeof b?b:ft(b,M)),x=h===q?R:q,O=t.rects.popper,A=t.elements[y?x:h],j=at(n(A)?A:A.contextElement||m(t.elements.popper),l,u,s),E=p(t.elements.reference),L=G({reference:E,element:O,strategy:"absolute",placement:i}),P=rt(Object.assign({},O,L)),k=h===q?P:E,H={top:j.top-k.top+w.top,bottom:k.bottom-j.bottom+w.bottom,left:j.left-k.left+w.left,right:k.right-j.right+w.right},C=t.modifiersData.offset;if(h===q&&C){var V=C[i];Object.keys(H).forEach((function(t){var e=[S,T].indexOf(t)>=0?1:-1,o=[D,T].indexOf(t)>=0?"y":"x";H[t]+=V[o]*e}))}return H}function ct(t,e,o){return a(t,s(e,o))}const pt={name:"preventOverflow",enabled:!0,phase:"main",fn:function(t){var e=t.state,o=t.options,n=t.name,r=o.mainAxis,i=void 0===r||r,f=o.altAxis,l=void 0!==f&&f,c=o.boundary,p=o.rootBoundary,u=o.altBoundary,d=o.padding,m=o.tether,h=void 0===m||m,v=o.tetherOffset,y=void 0===v?0:v,g=lt(e,{boundary:c,rootBoundary:p,padding:d,altBoundary:u}),w=J(e.placement),x=X(e.placement),O=!x,A=Y(w),j="x"===A?"y":"x",P=e.modifiersData.popperOffsets,M=e.rects.reference,H=e.rects.popper,W="function"==typeof y?y(Object.assign({},e.rects,{placement:e.placement})):y,B="number"==typeof W?{mainAxis:W,altAxis:W}:Object.assign({mainAxis:0,altAxis:0},W),q=e.modifiersData.offset?e.modifiersData.offset[e.placement]:null,R={x:0,y:0};if(P){if(i){var C,V="y"===A?D:L,N="y"===A?T:S,I="y"===A?"height":"width",_=P[A],F=_+g[V],U=_-g[N],z=h?-H[I]/2:0,G=x===k?M[I]:H[I],K=x===k?-H[I]:-M[I],Q=e.elements.arrow,Z=h&&Q?b(Q):{width:0,height:0},$=e.modifiersData["arrow#persistent"]?e.modifiersData["arrow#persistent"].padding:{top:0,right:0,bottom:0,left:0},tt=$[V],et=$[N],ot=ct(0,M[I],Z[I]),nt=O?M[I]/2-z-ot-tt-B.mainAxis:G-ot-tt-B.mainAxis,rt=O?-M[I]/2+z+ot+et+B.mainAxis:K+ot+et+B.mainAxis,it=e.elements.arrow&&E(e.elements.arrow),at=it?"y"===A?it.clientTop||0:it.clientLeft||0:0,st=null!=(C=null==q?void 0:q[A])?C:0,ft=_+rt-st,pt=ct(h?s(F,_+nt-st-at):F,_,h?a(U,ft):U);P[A]=pt,R[A]=pt-_}if(l){var ut,dt="x"===A?D:L,mt="x"===A?T:S,ht=P[j],vt="y"===j?"height":"width",yt=ht+g[dt],gt=ht-g[mt],bt=-1!==[D,L].indexOf(w),wt=null!=(ut=null==q?void 0:q[j])?ut:0,xt=bt?yt:ht-M[vt]-H[vt]-wt+B.altAxis,Ot=bt?ht+M[vt]+H[vt]-wt-B.altAxis:gt,At=h&&bt?function(t,e,o){var n=ct(t,e,o);return n>o?o:n}(xt,ht,Ot):ct(h?xt:yt,ht,h?Ot:gt);P[j]=At,R[j]=At-ht}e.modifiersData[n]=R}},requiresIfExists:["offset"]};const ut={name:"arrow",enabled:!0,phase:"main",fn:function(t){var e,o=t.state,n=t.name,r=t.options,i=o.elements.arrow,a=o.modifiersData.popperOffsets,s=J(o.placement),f=Y(s),l=[L,S].indexOf(s)>=0?"height":"width";if(i&&a){var c=function(t,e){return st("number"!=typeof(t="function"==typeof t?t(Object.assign({},e.rects,{placement:e.placement})):t)?t:ft(t,M))}(r.padding,o),p=b(i),u="y"===f?D:L,d="y"===f?T:S,m=o.rects.reference[l]+o.rects.reference[f]-a[f]-o.rects.popper[l],h=a[f]-o.rects.reference[f],v=E(i),y=v?"y"===f?v.clientHeight||0:v.clientWidth||0:0,g=m/2-h/2,w=c[u],x=y-p[l]-c[d],O=y/2-p[l]/2+g,A=ct(w,O,x),j=f;o.modifiersData[n]=((e={})[j]=A,e.centerOffset=A-O,e)}},effect:function(t){var e=t.state,o=t.options.element,n=void 0===o?"[data-popper-arrow]":o;null!=n&&("string"!=typeof n||(n=e.elements.popper.querySelector(n)))&&nt(e.elements.popper,n)&&(e.elements.arrow=n)},requires:["popperOffsets"],requiresIfExists:["preventOverflow"]};function dt(t,e,o){return void 0===o&&(o={x:0,y:0}),{top:t.top-e.height-o.y,right:t.right-e.width+o.x,bottom:t.bottom-e.height+o.y,left:t.left-e.width-o.x}}function mt(t){return[D,S,T,L].some((function(e){return t[e]>=0}))}var ht=U({defaultModifiers:[{name:"eventListeners",enabled:!0,phase:"write",fn:function(){},effect:function(t){var e=t.state,n=t.instance,r=t.options,i=r.scroll,a=void 0===i||i,s=r.resize,f=void 0===s||s,l=o(e.elements.popper),c=[].concat(e.scrollParents.reference,e.scrollParents.popper);return a&&c.forEach((function(t){t.addEventListener("scroll",n.update,z)})),f&&l.addEventListener("resize",n.update,z),function(){a&&c.forEach((function(t){t.removeEventListener("scroll",n.update,z)})),f&&l.removeEventListener("resize",n.update,z)}},data:{}},{name:"popperOffsets",enabled:!0,phase:"read",fn:function(t){var e=t.state,o=t.name;e.modifiersData[o]=G({reference:e.rects.reference,element:e.rects.popper,strategy:"absolute",placement:e.placement})},data:{}},{name:"computeStyles",enabled:!0,phase:"beforeWrite",fn:function(t){var e=t.state,o=t.options,n=o.gpuAcceleration,r=void 0===n||n,i=o.adaptive,a=void 0===i||i,s=o.roundOffsets,f=void 0===s||s,l={placement:J(e.placement),variation:X(e.placement),popper:e.elements.popper,popperRect:e.rects.popper,gpuAcceleration:r,isFixed:"fixed"===e.options.strategy};null!=e.modifiersData.popperOffsets&&(e.styles.popper=Object.assign({},e.styles.popper,Q(Object.assign({},l,{offsets:e.modifiersData.popperOffsets,position:e.options.strategy,adaptive:a,roundOffsets:f})))),null!=e.modifiersData.arrow&&(e.styles.arrow=Object.assign({},e.styles.arrow,Q(Object.assign({},l,{offsets:e.modifiersData.arrow,position:"absolute",adaptive:!1,roundOffsets:f})))),e.attributes.popper=Object.assign({},e.attributes.popper,{"data-popper-placement":e.placement})},data:{}},{name:"applyStyles",enabled:!0,phase:"write",fn:function(t){var e=t.state;Object.keys(e.elements).forEach((function(t){var o=e.styles[t]||{},n=e.attributes[t]||{},i=e.elements[t];r(i)&&d(i)&&(Object.assign(i.style,o),Object.keys(n).forEach((function(t){var e=n[t];!1===e?i.removeAttribute(t):i.setAttribute(t,!0===e?"":e)})))}))},effect:function(t){var e=t.state,o={popper:{position:e.options.strategy,left:"0",top:"0",margin:"0"},arrow:{position:"absolute"},reference:{}};return Object.assign(e.elements.popper.style,o.popper),e.styles=o,e.elements.arrow&&Object.assign(e.elements.arrow.style,o.arrow),function(){Object.keys(e.elements).forEach((function(t){var n=e.elements[t],i=e.attributes[t]||{},a=Object.keys(e.styles.hasOwnProperty(t)?e.styles[t]:o[t]).reduce((function(t,e){return t[e]="",t}),{});r(n)&&d(n)&&(Object.assign(n.style,a),Object.keys(i).forEach((function(t){n.removeAttribute(t)})))}))}},requires:["computeStyles"]},Z,{name:"flip",enabled:!0,phase:"main",fn:function(t){var e=t.state,o=t.options,n=t.name;if(!e.modifiersData[n]._skip){for(var r=o.mainAxis,i=void 0===r||r,a=o.altAxis,s=void 0===a||a,f=o.fallbackPlacements,l=o.padding,c=o.boundary,p=o.rootBoundary,u=o.altBoundary,d=o.flipVariations,m=void 0===d||d,h=o.allowedAutoPlacements,v=e.options.placement,y=J(v),g=f||(y===v||!m?[tt(v)]:function(t){if(J(t)===P)return[];var e=tt(t);return[ot(t),e,ot(e)]}(v)),b=[v].concat(g).reduce((function(t,o){return t.concat(J(o)===P?function(t,e){void 0===e&&(e={});var o=e,n=o.placement,r=o.boundary,i=o.rootBoundary,a=o.padding,s=o.flipVariations,f=o.allowedAutoPlacements,l=void 0===f?V:f,c=X(n),p=c?s?C:C.filter((function(t){return X(t)===c})):M,u=p.filter((function(t){return l.indexOf(t)>=0}));0===u.length&&(u=p);var d=u.reduce((function(e,o){return e[o]=lt(t,{placement:o,boundary:r,rootBoundary:i,padding:a})[J(o)],e}),{});return Object.keys(d).sort((function(t,e){return d[t]-d[e]}))}(e,{placement:o,boundary:c,rootBoundary:p,padding:l,flipVariations:m,allowedAutoPlacements:h}):o)}),[]),w=e.rects.reference,x=e.rects.popper,O=new Map,A=!0,j=b[0],E=0;E<b.length;E++){var H=b[E],W=J(H),B=X(H)===k,q=[D,T].indexOf(W)>=0,R=q?"width":"height",N=lt(e,{placement:H,boundary:c,rootBoundary:p,altBoundary:u,padding:l}),I=q?B?S:L:B?T:D;w[R]>x[R]&&(I=tt(I));var _=tt(I),F=[];if(i&&F.push(N[W]<=0),s&&F.push(N[I]<=0,N[_]<=0),F.every((function(t){return t}))){j=H,A=!1;break}O.set(H,F)}if(A)for(var U=function(t){var e=b.find((function(e){var o=O.get(e);if(o)return o.slice(0,t).every((function(t){return t}))}));if(e)return j=e,"break"},z=m?3:1;z>0;z--){if("break"===U(z))break}e.placement!==j&&(e.modifiersData[n]._skip=!0,e.placement=j,e.reset=!0)}},requiresIfExists:["offset"],data:{_skip:!1}},pt,ut,{name:"hide",enabled:!0,phase:"main",requiresIfExists:["preventOverflow"],fn:function(t){var e=t.state,o=t.name,n=e.rects.reference,r=e.rects.popper,i=e.modifiersData.preventOverflow,a=lt(e,{elementContext:"reference"}),s=lt(e,{altBoundary:!0}),f=dt(a,n),l=dt(s,r,i),c=mt(f),p=mt(l);e.modifiersData[o]={referenceClippingOffsets:f,popperEscapeOffsets:l,isReferenceHidden:c,hasPopperEscaped:p},e.attributes.popper=Object.assign({},e.attributes.popper,{"data-popper-reference-hidden":c,"data-popper-escaped":p})}}]});const vt=t=>{do{t+=Math.floor(1e4*Math.random())}while(document.getElementById(t));return t};function yt(t,e){e&&(clearTimeout(e.tooltipHideTimeout),e.tooltipShowTimeout=setTimeout((()=>{e.classList.add("show"),e.tooltipAlreadyShow=!0}),e.tooltipAlreadyShow?0:e.tooltipDelay),void 0===e.popper&&(e.popper=ht(t,e,{placement:e.tooltipPlacement,strategy:"absolute",modifiers:[{name:"offset",options:{offset:[0,10]}}]})))}function gt(t,e){t&&(clearTimeout(t.tooltipShowTimeout),t.classList.remove("show"),t.tooltipHideTimeout=setTimeout((()=>{void 0!==t.popper&&(t.popper.destroy(),delete t.popper),delete t.tooltipPlacement,delete t.tooltipDelay,delete t.tooltipDuration,delete t.tooltipArrow,delete t.tooltipAlreadyShow,delete t.tooltipShowTimeout,delete t.tooltipHideTimeout,"function"==typeof e&&e()}),t.tooltipDuration))}function bt(t){t={placement:"auto",delay:0,duration:600,arrow:!0,...t},document.addEventListener("click",(e=>{const o=e.target.closest(".webcimesTooltipButton");if(o){const e=o.nextElementSibling;e&&(e.tooltipPlacement=e.getAttribute("data-tooltip-placement")||t.placement,e.tooltipDelay=e.getAttribute("data-tooltip-delay")||t.delay,e.tooltipDuration=e.getAttribute("data-tooltip-duration")||t.duration,e.tooltipArrow=JSON.parse(e.getAttribute("data-tooltip-arrow")||t.arrow),e.style.setProperty("--tooltip-duration",e.tooltipDuration+"ms"),e.tooltipArrow&&(e.querySelector(".arrow")||e.insertAdjacentHTML("beforeend",'<div class="arrow" data-popper-arrow></div>')),yt(o,e))}})),document.addEventListener("click",(()=>{document.querySelectorAll(".webcimesTooltip.show:not(.title)").forEach((t=>{gt(t)}))}))}function wt(t){t={placement:"top",delay:400,duration:600,arrow:!0,...t},document.querySelectorAll("[title]").forEach((t=>{t.setAttribute("data-tooltip-title",t.getAttribute("title")),t.removeAttribute("title")})),document.addEventListener("mouseenter",(e=>{if(e.target.matches&&e.target.matches("[data-tooltip-title]")){const o=e.target;let n=null;if(document.querySelector(".webcimesTooltip.title#"+o.getAttribute("data-tooltip-target")))n=document.querySelector(".webcimesTooltip.title#"+o.getAttribute("data-tooltip-target"));else{const e=vt("tooltipTitle");o.setAttribute("data-tooltip-target",e),document.body.insertAdjacentHTML("beforeend",'<div class="webcimesTooltip title" id="'+e+'">'+o.getAttribute("data-tooltip-title")+"</div>"),n=document.body.lastElementChild,n.tooltipPlacement=o.getAttribute("data-tooltip-placement")||t.placement,n.tooltipDelay=o.getAttribute("data-tooltip-delay")||t.delay,n.tooltipDuration=o.getAttribute("data-tooltip-duration")||t.duration,n.tooltipArrow=JSON.parse(o.getAttribute("data-tooltip-arrow")||t.arrow),n.style.setProperty("--tooltip-duration",n.tooltipDuration+"ms"),n.tooltipArrow&&(n.querySelector(".arrow")||n.insertAdjacentHTML("beforeend",'<div class="arrow" data-popper-arrow></div>'))}yt(o,n)}}),!0),document.addEventListener("mouseleave",(t=>{if(t.target.matches&&t.target.matches("[data-tooltip-title]")){const e=t.target,o=document.querySelector(".webcimesTooltip.title#"+e.getAttribute("data-tooltip-target"));gt(o,(function(){e.removeAttribute("data-tooltip-target"),o?.remove()}))}}),!0)}return e})()));
//# sourceMappingURL=webcimes-tooltip.udm.js.map