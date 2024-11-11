!function(t,e){if("object"==typeof exports&&"object"==typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var o=e();for(var i in o)("object"==typeof exports?exports:t)[i]=o[i]}}(self,(()=>(()=>{"use strict";var t={d:(e,o)=>{for(var i in o)t.o(o,i)&&!t.o(e,i)&&Object.defineProperty(e,i,{enumerable:!0,get:o[i]})},o:(t,e)=>Object.prototype.hasOwnProperty.call(t,e),r:t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}},e={};t.r(e),t.d(e,{WebcimesTooltip:()=>lt});const o=Math.min,i=Math.max,n=Math.round,l=Math.floor,s=t=>({x:t,y:t}),r={left:"right",right:"left",bottom:"top",top:"bottom"},a={start:"end",end:"start"};function c(t,e,n){return i(t,o(e,n))}function p(t,e){return"function"==typeof t?t(e):t}function f(t){return t.split("-")[0]}function u(t){return t.split("-")[1]}function h(t){return"x"===t?"y":"x"}function d(t){return"y"===t?"height":"width"}function m(t){return["top","bottom"].includes(f(t))?"y":"x"}function y(t){return h(m(t))}function g(t){return t.replace(/start|end/g,(t=>a[t]))}function w(t){return t.replace(/left|right|bottom|top/g,(t=>r[t]))}function b(t){return"number"!=typeof t?function(t){return{top:0,right:0,bottom:0,left:0,...t}}(t):{top:t,right:t,bottom:t,left:t}}function v(t){return{...t,top:t.y,left:t.x,right:t.x+t.width,bottom:t.y+t.height}}function x(t,e,o){let{reference:i,floating:n}=t;const l=m(e),s=y(e),r=d(s),a=f(e),c="y"===l,p=i.x+i.width/2-n.width/2,h=i.y+i.height/2-n.height/2,g=i[r]/2-n[r]/2;let w;switch(a){case"top":w={x:p,y:i.y-n.height};break;case"bottom":w={x:p,y:i.y+i.height};break;case"right":w={x:i.x+i.width,y:h};break;case"left":w={x:i.x-n.width,y:h};break;default:w={x:i.x,y:i.y}}switch(u(e)){case"start":w[s]-=g*(o&&c?-1:1);break;case"end":w[s]+=g*(o&&c?-1:1)}return w}async function E(t,e){var o;void 0===e&&(e={});const{x:i,y:n,platform:l,rects:s,elements:r,strategy:a}=t,{boundary:c="clippingAncestors",rootBoundary:f="viewport",elementContext:u="floating",altBoundary:h=!1,padding:d=0}=p(e,t),m=b(d),y=r[h?"floating"===u?"reference":"floating":u],g=v(await l.getClippingRect({element:null==(o=await(null==l.isElement?void 0:l.isElement(y)))||o?y:y.contextElement||await(null==l.getDocumentElement?void 0:l.getDocumentElement(r.floating)),boundary:c,rootBoundary:f,strategy:a})),w="floating"===u?{...s.floating,x:i,y:n}:s.reference,x=await(null==l.getOffsetParent?void 0:l.getOffsetParent(r.floating)),E=await(null==l.isElement?void 0:l.isElement(x))&&await(null==l.getScale?void 0:l.getScale(x))||{x:1,y:1},R=v(l.convertOffsetParentRelativeRectToViewportRelativeRect?await l.convertOffsetParentRelativeRectToViewportRelativeRect({rect:w,offsetParent:x,strategy:a}):w);return{top:(g.top-R.top+m.top)/E.y,bottom:(R.bottom-g.bottom+m.bottom)/E.y,left:(g.left-R.left+m.left)/E.x,right:(R.right-g.right+m.right)/E.x}}const R=function(t){return void 0===t&&(t={}),{name:"flip",options:t,async fn(e){var o,i;const{placement:n,middlewareData:l,rects:s,initialPlacement:r,platform:a,elements:c}=e,{mainAxis:h=!0,crossAxis:m=!0,fallbackPlacements:b,fallbackStrategy:v="bestFit",fallbackAxisSideDirection:x="none",flipAlignment:R=!0,...A}=p(t,e);if(null!=(o=l.arrow)&&o.alignmentOffset)return{};const T=f(n),L=f(r)===r,S=await(null==a.isRTL?void 0:a.isRTL(c.floating)),H=b||(L||!R?[w(r)]:function(t){const e=w(t);return[g(t),e,g(e)]}(r));b||"none"===x||H.push(...function(t,e,o,i){const n=u(t);let l=function(t,e,o){const i=["left","right"],n=["right","left"],l=["top","bottom"],s=["bottom","top"];switch(t){case"top":case"bottom":return o?e?n:i:e?i:n;case"left":case"right":return e?l:s;default:return[]}}(f(t),"start"===o,i);return n&&(l=l.map((t=>t+"-"+n)),e&&(l=l.concat(l.map(g)))),l}(r,R,x,S));const O=[r,...H],D=await E(e,A),C=[];let P=(null==(i=l.flip)?void 0:i.overflows)||[];if(h&&C.push(D[T]),m){const t=function(t,e,o){void 0===o&&(o=!1);const i=u(t),n=y(t),l=d(n);let s="x"===n?i===(o?"end":"start")?"right":"left":"start"===i?"bottom":"top";return e.reference[l]>e.floating[l]&&(s=w(s)),[s,w(s)]}(n,s,S);C.push(D[t[0]],D[t[1]])}if(P=[...P,{placement:n,overflows:C}],!C.every((t=>t<=0))){var k,F;const t=((null==(k=l.flip)?void 0:k.index)||0)+1,e=O[t];if(e)return{data:{index:t,overflows:P},reset:{placement:e}};let o=null==(F=P.filter((t=>t.overflows[0]<=0)).sort(((t,e)=>t.overflows[1]-e.overflows[1]))[0])?void 0:F.placement;if(!o)switch(v){case"bestFit":{var $;const t=null==($=P.map((t=>[t.placement,t.overflows.filter((t=>t>0)).reduce(((t,e)=>t+e),0)])).sort(((t,e)=>t[1]-e[1]))[0])?void 0:$[0];t&&(o=t);break}case"initialPlacement":o=r}if(n!==o)return{reset:{placement:o}}}return{}}}};const A=function(t){return void 0===t&&(t=0),{name:"offset",options:t,async fn(e){var o,i;const{x:n,y:l,placement:s,middlewareData:r}=e,a=await async function(t,e){const{placement:o,platform:i,elements:n}=t,l=await(null==i.isRTL?void 0:i.isRTL(n.floating)),s=f(o),r=u(o),a="y"===m(o),c=["left","top"].includes(s)?-1:1,h=l&&a?-1:1,d=p(e,t);let{mainAxis:y,crossAxis:g,alignmentAxis:w}="number"==typeof d?{mainAxis:d,crossAxis:0,alignmentAxis:null}:{mainAxis:0,crossAxis:0,alignmentAxis:null,...d};return r&&"number"==typeof w&&(g="end"===r?-1*w:w),a?{x:g*h,y:y*c}:{x:y*c,y:g*h}}(e,t);return s===(null==(o=r.offset)?void 0:o.placement)&&null!=(i=r.arrow)&&i.alignmentOffset?{}:{x:n+a.x,y:l+a.y,data:{...a,placement:s}}}}},T=function(t){return void 0===t&&(t={}),{name:"shift",options:t,async fn(e){const{x:o,y:i,placement:n}=e,{mainAxis:l=!0,crossAxis:s=!1,limiter:r={fn:t=>{let{x:e,y:o}=t;return{x:e,y:o}}},...a}=p(t,e),u={x:o,y:i},d=await E(e,a),y=m(f(n)),g=h(y);let w=u[g],b=u[y];if(l){const t="y"===g?"bottom":"right";w=c(w+d["y"===g?"top":"left"],w,w-d[t])}if(s){const t="y"===y?"bottom":"right";b=c(b+d["y"===y?"top":"left"],b,b-d[t])}const v=r.fn({...e,[g]:w,[y]:b});return{...v,data:{x:v.x-o,y:v.y-i}}}}},L=function(t){return void 0===t&&(t={}),{options:t,fn(e){const{x:o,y:i,placement:n,rects:l,middlewareData:s}=e,{offset:r=0,mainAxis:a=!0,crossAxis:c=!0}=p(t,e),u={x:o,y:i},d=m(n),y=h(d);let g=u[y],w=u[d];const b=p(r,e),v="number"==typeof b?{mainAxis:b,crossAxis:0}:{mainAxis:0,crossAxis:0,...b};if(a){const t="y"===y?"height":"width",e=l.reference[y]-l.floating[t]+v.mainAxis,o=l.reference[y]+l.reference[t]-v.mainAxis;g<e?g=e:g>o&&(g=o)}if(c){var x,E;const t="y"===y?"width":"height",e=["top","left"].includes(f(n)),o=l.reference[d]-l.floating[t]+(e&&(null==(x=s.offset)?void 0:x[d])||0)+(e?0:v.crossAxis),i=l.reference[d]+l.reference[t]+(e?0:(null==(E=s.offset)?void 0:E[d])||0)-(e?v.crossAxis:0);w<o?w=o:w>i&&(w=i)}return{[y]:g,[d]:w}}}};function S(t){return D(t)?(t.nodeName||"").toLowerCase():"#document"}function H(t){var e;return(null==t||null==(e=t.ownerDocument)?void 0:e.defaultView)||window}function O(t){var e;return null==(e=(D(t)?t.ownerDocument:t.document)||window.document)?void 0:e.documentElement}function D(t){return t instanceof Node||t instanceof H(t).Node}function C(t){return t instanceof Element||t instanceof H(t).Element}function P(t){return t instanceof HTMLElement||t instanceof H(t).HTMLElement}function k(t){return"undefined"!=typeof ShadowRoot&&(t instanceof ShadowRoot||t instanceof H(t).ShadowRoot)}function F(t){const{overflow:e,overflowX:o,overflowY:i,display:n}=j(t);return/auto|scroll|overlay|hidden|clip/.test(e+i+o)&&!["inline","contents"].includes(n)}function $(t){return["table","td","th"].includes(S(t))}function M(t){const e=U(),o=j(t);return"none"!==o.transform||"none"!==o.perspective||!!o.containerType&&"normal"!==o.containerType||!e&&!!o.backdropFilter&&"none"!==o.backdropFilter||!e&&!!o.filter&&"none"!==o.filter||["transform","perspective","filter"].some((t=>(o.willChange||"").includes(t)))||["paint","layout","strict","content"].some((t=>(o.contain||"").includes(t)))}function U(){return!("undefined"==typeof CSS||!CSS.supports)&&CSS.supports("-webkit-backdrop-filter","none")}function W(t){return["html","body","#document"].includes(S(t))}function j(t){return H(t).getComputedStyle(t)}function q(t){return C(t)?{scrollLeft:t.scrollLeft,scrollTop:t.scrollTop}:{scrollLeft:t.pageXOffset,scrollTop:t.pageYOffset}}function B(t){if("html"===S(t))return t;const e=t.assignedSlot||t.parentNode||k(t)&&t.host||O(t);return k(e)?e.host:e}function I(t){const e=B(t);return W(e)?t.ownerDocument?t.ownerDocument.body:t.body:P(e)&&F(e)?e:I(e)}function N(t,e,o){var i;void 0===e&&(e=[]),void 0===o&&(o=!0);const n=I(t),l=n===(null==(i=t.ownerDocument)?void 0:i.body),s=H(n);return l?e.concat(s,s.visualViewport||[],F(n)?n:[],s.frameElement&&o?N(s.frameElement):[]):e.concat(n,N(n,[],o))}function _(t){const e=j(t);let o=parseFloat(e.width)||0,i=parseFloat(e.height)||0;const l=P(t),s=l?t.offsetWidth:o,r=l?t.offsetHeight:i,a=n(o)!==s||n(i)!==r;return a&&(o=s,i=r),{width:o,height:i,$:a}}function V(t){return C(t)?t:t.contextElement}function z(t){const e=V(t);if(!P(e))return s(1);const o=e.getBoundingClientRect(),{width:i,height:l,$:r}=_(e);let a=(r?n(o.width):o.width)/i,c=(r?n(o.height):o.height)/l;return a&&Number.isFinite(a)||(a=1),c&&Number.isFinite(c)||(c=1),{x:a,y:c}}const K=s(0);function J(t){const e=H(t);return U()&&e.visualViewport?{x:e.visualViewport.offsetLeft,y:e.visualViewport.offsetTop}:K}function X(t,e,o,i){void 0===e&&(e=!1),void 0===o&&(o=!1);const n=t.getBoundingClientRect(),l=V(t);let r=s(1);e&&(i?C(i)&&(r=z(i)):r=z(t));const a=function(t,e,o){return void 0===e&&(e=!1),!(!o||e&&o!==H(t))&&e}(l,o,i)?J(l):s(0);let c=(n.left+a.x)/r.x,p=(n.top+a.y)/r.y,f=n.width/r.x,u=n.height/r.y;if(l){const t=H(l),e=i&&C(i)?H(i):i;let o=t.frameElement;for(;o&&i&&e!==t;){const t=z(o),e=o.getBoundingClientRect(),i=j(o),n=e.left+(o.clientLeft+parseFloat(i.paddingLeft))*t.x,l=e.top+(o.clientTop+parseFloat(i.paddingTop))*t.y;c*=t.x,p*=t.y,f*=t.x,u*=t.y,c+=n,p+=l,o=H(o).frameElement}}return v({width:f,height:u,x:c,y:p})}function Y(t){return X(O(t)).left+q(t).scrollLeft}function G(t,e,o){let n;if("viewport"===e)n=function(t,e){const o=H(t),i=O(t),n=o.visualViewport;let l=i.clientWidth,s=i.clientHeight,r=0,a=0;if(n){l=n.width,s=n.height;const t=U();(!t||t&&"fixed"===e)&&(r=n.offsetLeft,a=n.offsetTop)}return{width:l,height:s,x:r,y:a}}(t,o);else if("document"===e)n=function(t){const e=O(t),o=q(t),n=t.ownerDocument.body,l=i(e.scrollWidth,e.clientWidth,n.scrollWidth,n.clientWidth),s=i(e.scrollHeight,e.clientHeight,n.scrollHeight,n.clientHeight);let r=-o.scrollLeft+Y(t);const a=-o.scrollTop;return"rtl"===j(n).direction&&(r+=i(e.clientWidth,n.clientWidth)-l),{width:l,height:s,x:r,y:a}}(O(t));else if(C(e))n=function(t,e){const o=X(t,!0,"fixed"===e),i=o.top+t.clientTop,n=o.left+t.clientLeft,l=P(t)?z(t):s(1);return{width:t.clientWidth*l.x,height:t.clientHeight*l.y,x:n*l.x,y:i*l.y}}(e,o);else{const o=J(t);n={...e,x:e.x-o.x,y:e.y-o.y}}return v(n)}function Q(t,e){const o=B(t);return!(o===e||!C(o)||W(o))&&("fixed"===j(o).position||Q(o,e))}function Z(t,e,o){const i=P(e),n=O(e),l="fixed"===o,r=X(t,!0,l,e);let a={scrollLeft:0,scrollTop:0};const c=s(0);if(i||!i&&!l)if(("body"!==S(e)||F(n))&&(a=q(e)),i){const t=X(e,!0,l,e);c.x=t.x+e.clientLeft,c.y=t.y+e.clientTop}else n&&(c.x=Y(n));return{x:r.left+a.scrollLeft-c.x,y:r.top+a.scrollTop-c.y,width:r.width,height:r.height}}function tt(t,e){return P(t)&&"fixed"!==j(t).position?e?e(t):t.offsetParent:null}function et(t,e){const o=H(t);if(!P(t))return o;let i=tt(t,e);for(;i&&$(i)&&"static"===j(i).position;)i=tt(i,e);return i&&("html"===S(i)||"body"===S(i)&&"static"===j(i).position&&!M(i))?o:i||function(t){let e=B(t);for(;P(e)&&!W(e);){if(M(e))return e;e=B(e)}return null}(t)||o}const ot={convertOffsetParentRelativeRectToViewportRelativeRect:function(t){let{rect:e,offsetParent:o,strategy:i}=t;const n=P(o),l=O(o);if(o===l)return e;let r={scrollLeft:0,scrollTop:0},a=s(1);const c=s(0);if((n||!n&&"fixed"!==i)&&(("body"!==S(o)||F(l))&&(r=q(o)),P(o))){const t=X(o);a=z(o),c.x=t.x+o.clientLeft,c.y=t.y+o.clientTop}return{width:e.width*a.x,height:e.height*a.y,x:e.x*a.x-r.scrollLeft*a.x+c.x,y:e.y*a.y-r.scrollTop*a.y+c.y}},getDocumentElement:O,getClippingRect:function(t){let{element:e,boundary:n,rootBoundary:l,strategy:s}=t;const r=[..."clippingAncestors"===n?function(t,e){const o=e.get(t);if(o)return o;let i=N(t,[],!1).filter((t=>C(t)&&"body"!==S(t))),n=null;const l="fixed"===j(t).position;let s=l?B(t):t;for(;C(s)&&!W(s);){const e=j(s),o=M(s);o||"fixed"!==e.position||(n=null),(l?!o&&!n:!o&&"static"===e.position&&n&&["absolute","fixed"].includes(n.position)||F(s)&&!o&&Q(t,s))?i=i.filter((t=>t!==s)):n=e,s=B(s)}return e.set(t,i),i}(e,this._c):[].concat(n),l],a=r[0],c=r.reduce(((t,n)=>{const l=G(e,n,s);return t.top=i(l.top,t.top),t.right=o(l.right,t.right),t.bottom=o(l.bottom,t.bottom),t.left=i(l.left,t.left),t}),G(e,a,s));return{width:c.right-c.left,height:c.bottom-c.top,x:c.left,y:c.top}},getOffsetParent:et,getElementRects:async function(t){let{reference:e,floating:o,strategy:i}=t;const n=this.getOffsetParent||et,l=this.getDimensions;return{reference:Z(e,await n(o),i),floating:{x:0,y:0,...await l(o)}}},getClientRects:function(t){return Array.from(t.getClientRects())},getDimensions:function(t){return _(t)},getScale:z,isElement:C,isRTL:function(t){return"rtl"===j(t).direction}};function it(t,e,n,s){void 0===s&&(s={});const{ancestorScroll:r=!0,ancestorResize:a=!0,elementResize:c="function"==typeof ResizeObserver,layoutShift:p="function"==typeof IntersectionObserver,animationFrame:f=!1}=s,u=V(t),h=r||a?[...u?N(u):[],...N(e)]:[];h.forEach((t=>{r&&t.addEventListener("scroll",n,{passive:!0}),a&&t.addEventListener("resize",n)}));const d=u&&p?function(t,e){let n,s=null;const r=O(t);function a(){clearTimeout(n),s&&s.disconnect(),s=null}return function c(p,f){void 0===p&&(p=!1),void 0===f&&(f=1),a();const{left:u,top:h,width:d,height:m}=t.getBoundingClientRect();if(p||e(),!d||!m)return;const y={rootMargin:-l(h)+"px "+-l(r.clientWidth-(u+d))+"px "+-l(r.clientHeight-(h+m))+"px "+-l(u)+"px",threshold:i(0,o(1,f))||1};let g=!0;function w(t){const e=t[0].intersectionRatio;if(e!==f){if(!g)return c();e?c(!1,e):n=setTimeout((()=>{c(!1,1e-7)}),100)}g=!1}try{s=new IntersectionObserver(w,{...y,root:r.ownerDocument})}catch(t){s=new IntersectionObserver(w,y)}s.observe(t)}(!0),a}(u,n):null;let m,y=-1,g=null;c&&(g=new ResizeObserver((t=>{let[o]=t;o&&o.target===u&&g&&(g.unobserve(e),cancelAnimationFrame(y),y=requestAnimationFrame((()=>{g&&g.observe(e)}))),n()})),u&&!f&&g.observe(u),g.observe(e));let w=f?X(t):null;return f&&function e(){const o=X(t);!w||o.x===w.x&&o.y===w.y&&o.width===w.width&&o.height===w.height||n();w=o,m=requestAnimationFrame(e)}(),n(),()=>{h.forEach((t=>{r&&t.removeEventListener("scroll",n),a&&t.removeEventListener("resize",n)})),d&&d(),g&&g.disconnect(),g=null,f&&cancelAnimationFrame(m)}}const nt=(t,e,o)=>{const i=new Map,n={platform:ot,...o},l={...n.platform,_c:i};return(async(t,e,o)=>{const{placement:i="bottom",strategy:n="absolute",middleware:l=[],platform:s}=o,r=l.filter(Boolean),a=await(null==s.isRTL?void 0:s.isRTL(e));let c=await s.getElementRects({reference:t,floating:e,strategy:n}),{x:p,y:f}=x(c,i,a),u=i,h={},d=0;for(let o=0;o<r.length;o++){const{name:l,fn:m}=r[o],{x:y,y:g,data:w,reset:b}=await m({x:p,y:f,initialPlacement:i,placement:u,strategy:n,middlewareData:h,rects:c,platform:s,elements:{reference:t,floating:e}});p=null!=y?y:p,f=null!=g?g:f,h={...h,[l]:{...h[l],...w}},b&&d<=50&&(d++,"object"==typeof b&&(b.placement&&(u=b.placement),b.rects&&(c=!0===b.rects?await s.getElementRects({reference:t,floating:e,strategy:n}):b.rects),({x:p,y:f}=x(c,u,a))),o=-1)}return{x:p,y:f,placement:u,strategy:n,middlewareData:h}})(t,e,{...n,platform:l})};class lt{tooltipRef;tooltip;tooltipArrow;options;constructor(t){const e={type:"button",element:null,contentElement:null,setId:null,setClass:null,placement:t.type&&"title"==t.type?"top":"bottom",delay:t.type&&"title"==t.type?400:0,duration:600,arrow:!0,style:null,ariaLabel:null,hideOnHover:!0,beforeShow:()=>{},afterShow:()=>{},beforeHide:()=>{},afterHide:()=>{}};this.options={...e,...t},this.onKeyDown=this.onKeyDown.bind(this),this.onTransitionEndOnShow=this.onTransitionEndOnShow.bind(this),this.init()}getHtmlElements(t){let e=[];return t instanceof NodeList&&(e=[...Array.from(t)]),t instanceof HTMLElement&&(e=[t]),"string"==typeof t&&(e=[...Array.from(document.querySelectorAll(t))]),e}getHtmlElement(t){let e=null;return t instanceof HTMLElement&&(e=t),"string"==typeof t&&(e=document.querySelector(t)),e}getUniqueID(t,e,o="",i=null){i=i??document;do{e+=Math.floor(1e4*Math.random())}while(i.querySelector(t+e+o));return e}init(){this.tooltipRef=this.getHtmlElement(this.options.element),this.tooltipRef?.classList.add("webcimes-tooltip-ref"),"button"==this.options.type?this.tooltipForButton():"title"==this.options.type&&this.tooltipForTitle()}show(){if(this.tooltipRef&&this.tooltip&&(document.querySelector(`#${this.tooltipRef.getAttribute("data-tooltip-target")}`)||(document.body.insertAdjacentHTML("beforeend",this.tooltip.outerHTML),this.tooltip=document.body.lastElementChild),this.tooltip.tooltipPlacement=this.tooltipRef.getAttribute("data-tooltip-placement")||this.options.placement,this.tooltip.tooltipDelay=this.tooltipRef.getAttribute("data-tooltip-delay")||this.options.delay,this.tooltip.tooltipDuration=this.tooltipRef.getAttribute("data-tooltip-duration")||this.options.duration,this.tooltip.tooltipArrow=JSON.parse(this.tooltipRef.getAttribute("data-tooltip-arrow")||this.options.arrow),this.tooltip.tooltipHideOnHover=JSON.parse(this.tooltipRef.getAttribute("data-tooltip-hide-on-hover")||this.options.hideOnHover),this.tooltip.style.setProperty("--tooltip-duration",this.tooltip.tooltipDuration+"ms"),this.tooltip.tooltipArrow&&(this.tooltip.querySelector(".webcimes-tooltip__arrow")||this.tooltip.insertAdjacentHTML("beforeend",'<div class="webcimes-tooltip__arrow"></div>'),this.tooltipArrow=this.tooltip.querySelector(".webcimes-tooltip__arrow")),clearTimeout(this.tooltip.tooltipHideTimeout),this.tooltip.tooltipShowTimeout=setTimeout((()=>{this.tooltip.tooltipAlreadyShow||setTimeout((()=>{this.tooltipRef.dispatchEvent(new CustomEvent("beforeShow")),this.tooltip.dispatchEvent(new CustomEvent("beforeShow")),"function"==typeof this.options.beforeShow&&this.options.beforeShow()}),0),this.tooltip.classList.add("webcimes-tooltip--show"),"button"==this.options.type?(this.tooltipRef.setAttribute("aria-expended","true"),this.tooltip.focus(),this.tooltip.addEventListener("keydown",this.onKeyDown)):this.options.type,this.tooltip.tooltipAlreadyShow=!0}),this.tooltip.tooltipAlreadyShow?0:this.tooltip.tooltipDelay),this.tooltip.addEventListener("transitionend",this.onTransitionEndOnShow),void 0===this.tooltip.cleanUpFloatingUi)){let t={placement:this.tooltip.tooltipPlacement,middleware:[A(10),T({padding:10,limiter:L({offset:30})}),R({fallbackPlacements:["top","bottom","left","right"],padding:10})]};this.tooltipArrow&&t.middleware.push((t=>({name:"arrow",options:t,async fn(e){const{x:i,y:n,placement:l,rects:s,platform:r,elements:a,middlewareData:f}=e,{element:h,padding:m=0}=p(t,e)||{};if(null==h)return{};const g=b(m),w={x:i,y:n},v=y(l),x=d(v),E=await r.getDimensions(h),R="y"===v,A=R?"top":"left",T=R?"bottom":"right",L=R?"clientHeight":"clientWidth",S=s.reference[x]+s.reference[v]-w[v]-s.floating[x],H=w[v]-s.reference[v],O=await(null==r.getOffsetParent?void 0:r.getOffsetParent(h));let D=O?O[L]:0;D&&await(null==r.isElement?void 0:r.isElement(O))||(D=a.floating[L]||s.floating[x]);const C=S/2-H/2,P=D/2-E[x]/2-1,k=o(g[A],P),F=o(g[T],P),$=k,M=D-E[x]-F,U=D/2-E[x]/2+C,W=c($,U,M),j=!f.arrow&&null!=u(l)&&U!=W&&s.reference[x]/2-(U<$?k:F)-E[x]/2<0,q=j?U<$?U-$:U-M:0;return{[v]:w[v]+q,data:{[v]:W,centerOffset:U-W-q,...j&&{alignmentOffset:q}},reset:j}}}))({element:this.tooltipArrow,padding:10})),this.tooltip.cleanUpFloatingUi=it(this.tooltipRef,this.tooltip,(()=>{nt(this.tooltipRef,this.tooltip,t).then((({x:t,y:e,middlewareData:o,placement:i})=>{if(this.tooltip.setAttribute("data-tooltip-placement",i),Object.assign(this.tooltip.style,{left:`${t}px`,top:`${e}px`}),this.tooltipArrow&&o.arrow){const t=this.tooltipArrow.offsetWidth,e={top:"bottom",right:"left",bottom:"top",left:"right"}[i.split("-")[0]],{x:n,y:l}=o.arrow;Object.assign(this.tooltipArrow.style,{left:null!=n?`${n}px`:"",top:null!=l?`${l}px`:"",right:"",bottom:"",[e]:-t/2+"px"})}}))}))}}hide(t,e=!1){this.tooltip&&document.querySelector(`#${this.tooltipRef.getAttribute("data-tooltip-target")}`)&&(this.tooltipRef.dispatchEvent(new CustomEvent("beforeHide")),this.tooltip.dispatchEvent(new CustomEvent("beforeHide")),"function"==typeof this.options.beforeHide&&this.options.beforeHide(),clearTimeout(this.tooltip.tooltipShowTimeout),this.tooltip.classList.remove("webcimes-tooltip--show"),"button"==this.options.type&&(this.tooltipRef.setAttribute("aria-expended","false"),e||this.tooltipRef.focus(),this.tooltip.removeEventListener("keydown",this.onKeyDown)),this.tooltip.removeEventListener("transitionend",this.onTransitionEndOnShow),this.tooltip.tooltipHideTimeout=setTimeout((()=>{void 0!==this.tooltip?.cleanUpFloatingUi&&(this.tooltip.cleanUpFloatingUi(),delete this.tooltip.cleanUpFloatingUi),delete this.tooltip?.tooltipPlacement,delete this.tooltip?.tooltipDelay,delete this.tooltip?.tooltipDuration,delete this.tooltip?.tooltipArrow,delete this.tooltip?.tooltipHideOnHover,delete this.tooltip?.tooltipAlreadyShow,delete this.tooltip?.tooltipShowTimeout,delete this.tooltip?.tooltipHideTimeout,this.tooltipRef.dispatchEvent(new CustomEvent("afterHide")),this.tooltip.dispatchEvent(new CustomEvent("afterHide")),"function"==typeof this.options.afterHide&&this.options.afterHide(),"function"==typeof t&&t()}),this.tooltip.tooltipDuration))}tooltipForButton(){if(this.tooltipRef){const t=this.options.setId?this.options.setId:this.getUniqueID("#","tooltip-");this.tooltipRef.setAttribute("data-tooltip-target",t),this.tooltipRef.setAttribute("role","button"),this.tooltipRef.setAttribute("aria-expended","false"),this.tooltipRef.setAttribute("aria-haspopup","dialog"),this.tooltipRef.setAttribute("tabindex","0");const e=this.getHtmlElement(this.options.contentElement)??this.tooltipRef.nextElementSibling;e?.style.removeProperty("display");let o=document.createElement("template");o.innerHTML=`<div class="webcimes-tooltip webcimes-tooltip--button ${this.options.setClass?this.options.setClass:""}" id="${t}" ${this.options.style?`style="${this.options.style}"`:""} role="dialog" ${this.options.ariaLabel?`aria-label="${this.options.ariaLabel}"`:""} tabindex="0">\n\t\t\t\t${e?.outerHTML??""}\n\t\t\t</div>`,this.tooltip=o.content.firstChild,e?.remove(),this.tooltipRef.addEventListener("click",(()=>{this.show()})),this.tooltipRef.addEventListener("keydown",(t=>{"Enter"!=t.key&&" "!=t.key||(t.preventDefault(),this.show())})),["click","keydown"].forEach((t=>{document.addEventListener(t,(t=>{t.target.closest(".webcimes-tooltip-ref")!=this.tooltipRef&&t.target.closest(".webcimes-tooltip")!=this.tooltip&&this.hide((()=>{this.tooltip?.remove()}),!0)}))}))}}tooltipForTitle(){if(this.tooltipRef){const t=this.options.setId?this.options.setId:this.getUniqueID("#","tooltip-");let e=null;if(this.options.contentElement){const t=this.getHtmlElement(this.options.contentElement);t?.style.removeProperty("display"),e=t?.outerHTML??null,t?.remove()}else e=this.tooltipRef.getAttribute("title"),this.tooltipRef.removeAttribute("title");this.tooltipRef.setAttribute("data-tooltip-title",e??""),this.tooltipRef.setAttribute("aria-describedby",t),this.tooltipRef.setAttribute("data-tooltip-target",t);let o=document.createElement("template");o.innerHTML=`<div class="webcimes-tooltip webcimes-tooltip--title ${this.options.setClass?this.options.setClass:""}" id="${t}" ${this.options.style?`style="${this.options.style}"`:""} role="tooltip" ${this.options.ariaLabel?`aria-label="${this.options.ariaLabel}"`:""}>\n\t\t\t\t${this.tooltipRef.getAttribute("data-tooltip-title")}\n\t\t\t</div>`,this.tooltip=o.content.firstChild;let i=!1;document.addEventListener("mouseenter",(t=>{(t.target==this.tooltipRef||!this.tooltip.tooltipHideOnHover&&t.target==this.tooltip)&&(i=!0,this.show())}),!0),document.addEventListener("mouseleave",(t=>{(t.target==this.tooltipRef||!this.tooltip.tooltipHideOnHover&&t.target==this.tooltip)&&(i=!1,this.hide((()=>{this.tooltip?.remove()})))}),!0),this.tooltipRef.addEventListener("focus",(()=>{this.show()})),this.tooltipRef.addEventListener("focusout",(t=>{i||this.hide((()=>{this.tooltip?.remove()}))})),this.tooltipRef.addEventListener("keydown",(t=>{"Escape"==t.key&&(t.preventDefault(),this.hide((()=>{this.tooltip?.remove()})))}))}}onKeyDown(t){"Escape"!=t.key&&"Tab"!=t.key||(t.preventDefault(),this.hide((()=>{this.tooltip?.remove()})))}onTransitionEndOnShow(t){this.tooltip.classList.contains("webcimes-tooltip--show")&&"opacity"==t.propertyName&&(this.tooltipRef.dispatchEvent(new CustomEvent("afterShow")),this.tooltip.dispatchEvent(new CustomEvent("afterShow")),"function"==typeof this.options.afterShow&&this.options.afterShow())}}return e})()));
//# sourceMappingURL=webcimes-tooltip.udm.js.map