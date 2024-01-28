var t={d:(e,o)=>{for(var i in o)t.o(o,i)&&!t.o(e,i)&&Object.defineProperty(e,i,{enumerable:!0,get:o[i]})},o:(t,e)=>Object.prototype.hasOwnProperty.call(t,e)},e={};t.d(e,{Q:()=>lt});const o=Math.min,i=Math.max,n=Math.round,l=Math.floor,r=t=>({x:t,y:t}),s={left:"right",right:"left",bottom:"top",top:"bottom"},a={start:"end",end:"start"};function c(t,e,n){return i(t,o(e,n))}function f(t,e){return"function"==typeof t?t(e):t}function p(t){return t.split("-")[0]}function u(t){return t.split("-")[1]}function h(t){return"x"===t?"y":"x"}function d(t){return"y"===t?"height":"width"}function m(t){return["top","bottom"].includes(p(t))?"y":"x"}function g(t){return h(m(t))}function y(t){return t.replace(/start|end/g,(t=>a[t]))}function w(t){return t.replace(/left|right|bottom|top/g,(t=>s[t]))}function v(t){return"number"!=typeof t?function(t){return{top:0,right:0,bottom:0,left:0,...t}}(t):{top:t,right:t,bottom:t,left:t}}function b(t){return{...t,top:t.y,left:t.x,right:t.x+t.width,bottom:t.y+t.height}}function x(t,e,o){let{reference:i,floating:n}=t;const l=m(e),r=g(e),s=d(r),a=p(e),c="y"===l,f=i.x+i.width/2-n.width/2,h=i.y+i.height/2-n.height/2,y=i[s]/2-n[s]/2;let w;switch(a){case"top":w={x:f,y:i.y-n.height};break;case"bottom":w={x:f,y:i.y+i.height};break;case"right":w={x:i.x+i.width,y:h};break;case"left":w={x:i.x-n.width,y:h};break;default:w={x:i.x,y:i.y}}switch(u(e)){case"start":w[r]-=y*(o&&c?-1:1);break;case"end":w[r]+=y*(o&&c?-1:1)}return w}async function R(t,e){var o;void 0===e&&(e={});const{x:i,y:n,platform:l,rects:r,elements:s,strategy:a}=t,{boundary:c="clippingAncestors",rootBoundary:p="viewport",elementContext:u="floating",altBoundary:h=!1,padding:d=0}=f(e,t),m=v(d),g=s[h?"floating"===u?"reference":"floating":u],y=b(await l.getClippingRect({element:null==(o=await(null==l.isElement?void 0:l.isElement(g)))||o?g:g.contextElement||await(null==l.getDocumentElement?void 0:l.getDocumentElement(s.floating)),boundary:c,rootBoundary:p,strategy:a})),w="floating"===u?{...r.floating,x:i,y:n}:r.reference,x=await(null==l.getOffsetParent?void 0:l.getOffsetParent(s.floating)),R=await(null==l.isElement?void 0:l.isElement(x))&&await(null==l.getScale?void 0:l.getScale(x))||{x:1,y:1},E=b(l.convertOffsetParentRelativeRectToViewportRelativeRect?await l.convertOffsetParentRelativeRectToViewportRelativeRect({rect:w,offsetParent:x,strategy:a}):w);return{top:(y.top-E.top+m.top)/R.y,bottom:(E.bottom-y.bottom+m.bottom)/R.y,left:(y.left-E.left+m.left)/R.x,right:(E.right-y.right+m.right)/R.x}}const E=function(t){return void 0===t&&(t={}),{name:"flip",options:t,async fn(e){var o,i;const{placement:n,middlewareData:l,rects:r,initialPlacement:s,platform:a,elements:c}=e,{mainAxis:h=!0,crossAxis:m=!0,fallbackPlacements:v,fallbackStrategy:b="bestFit",fallbackAxisSideDirection:x="none",flipAlignment:E=!0,...A}=f(t,e);if(null!=(o=l.arrow)&&o.alignmentOffset)return{};const T=p(n),S=p(s)===s,L=await(null==a.isRTL?void 0:a.isRTL(c.floating)),H=v||(S||!E?[w(s)]:function(t){const e=w(t);return[y(t),e,y(e)]}(s));v||"none"===x||H.push(...function(t,e,o,i){const n=u(t);let l=function(t,e,o){const i=["left","right"],n=["right","left"],l=["top","bottom"],r=["bottom","top"];switch(t){case"top":case"bottom":return o?e?n:i:e?i:n;case"left":case"right":return e?l:r;default:return[]}}(p(t),"start"===o,i);return n&&(l=l.map((t=>t+"-"+n)),e&&(l=l.concat(l.map(y)))),l}(s,E,x,L));const O=[s,...H],C=await R(e,A),D=[];let F=(null==(i=l.flip)?void 0:i.overflows)||[];if(h&&D.push(C[T]),m){const t=function(t,e,o){void 0===o&&(o=!1);const i=u(t),n=g(t),l=d(n);let r="x"===n?i===(o?"end":"start")?"right":"left":"start"===i?"bottom":"top";return e.reference[l]>e.floating[l]&&(r=w(r)),[r,w(r)]}(n,r,L);D.push(C[t[0]],C[t[1]])}if(F=[...F,{placement:n,overflows:D}],!D.every((t=>t<=0))){var P,$;const t=((null==(P=l.flip)?void 0:P.index)||0)+1,e=O[t];if(e)return{data:{index:t,overflows:F},reset:{placement:e}};let o=null==($=F.filter((t=>t.overflows[0]<=0)).sort(((t,e)=>t.overflows[1]-e.overflows[1]))[0])?void 0:$.placement;if(!o)switch(b){case"bestFit":{var M;const t=null==(M=F.map((t=>[t.placement,t.overflows.filter((t=>t>0)).reduce(((t,e)=>t+e),0)])).sort(((t,e)=>t[1]-e[1]))[0])?void 0:M[0];t&&(o=t);break}case"initialPlacement":o=s}if(n!==o)return{reset:{placement:o}}}return{}}}};const A=function(t){return void 0===t&&(t=0),{name:"offset",options:t,async fn(e){var o,i;const{x:n,y:l,placement:r,middlewareData:s}=e,a=await async function(t,e){const{placement:o,platform:i,elements:n}=t,l=await(null==i.isRTL?void 0:i.isRTL(n.floating)),r=p(o),s=u(o),a="y"===m(o),c=["left","top"].includes(r)?-1:1,h=l&&a?-1:1,d=f(e,t);let{mainAxis:g,crossAxis:y,alignmentAxis:w}="number"==typeof d?{mainAxis:d,crossAxis:0,alignmentAxis:null}:{mainAxis:0,crossAxis:0,alignmentAxis:null,...d};return s&&"number"==typeof w&&(y="end"===s?-1*w:w),a?{x:y*h,y:g*c}:{x:g*c,y:y*h}}(e,t);return r===(null==(o=s.offset)?void 0:o.placement)&&null!=(i=s.arrow)&&i.alignmentOffset?{}:{x:n+a.x,y:l+a.y,data:{...a,placement:r}}}}},T=function(t){return void 0===t&&(t={}),{name:"shift",options:t,async fn(e){const{x:o,y:i,placement:n}=e,{mainAxis:l=!0,crossAxis:r=!1,limiter:s={fn:t=>{let{x:e,y:o}=t;return{x:e,y:o}}},...a}=f(t,e),u={x:o,y:i},d=await R(e,a),g=m(p(n)),y=h(g);let w=u[y],v=u[g];if(l){const t="y"===y?"bottom":"right";w=c(w+d["y"===y?"top":"left"],w,w-d[t])}if(r){const t="y"===g?"bottom":"right";v=c(v+d["y"===g?"top":"left"],v,v-d[t])}const b=s.fn({...e,[y]:w,[g]:v});return{...b,data:{x:b.x-o,y:b.y-i}}}}},S=function(t){return void 0===t&&(t={}),{options:t,fn(e){const{x:o,y:i,placement:n,rects:l,middlewareData:r}=e,{offset:s=0,mainAxis:a=!0,crossAxis:c=!0}=f(t,e),u={x:o,y:i},d=m(n),g=h(d);let y=u[g],w=u[d];const v=f(s,e),b="number"==typeof v?{mainAxis:v,crossAxis:0}:{mainAxis:0,crossAxis:0,...v};if(a){const t="y"===g?"height":"width",e=l.reference[g]-l.floating[t]+b.mainAxis,o=l.reference[g]+l.reference[t]-b.mainAxis;y<e?y=e:y>o&&(y=o)}if(c){var x,R;const t="y"===g?"width":"height",e=["top","left"].includes(p(n)),o=l.reference[d]-l.floating[t]+(e&&(null==(x=r.offset)?void 0:x[d])||0)+(e?0:b.crossAxis),i=l.reference[d]+l.reference[t]+(e?0:(null==(R=r.offset)?void 0:R[d])||0)-(e?b.crossAxis:0);w<o?w=o:w>i&&(w=i)}return{[g]:y,[d]:w}}}};function L(t){return C(t)?(t.nodeName||"").toLowerCase():"#document"}function H(t){var e;return(null==t||null==(e=t.ownerDocument)?void 0:e.defaultView)||window}function O(t){var e;return null==(e=(C(t)?t.ownerDocument:t.document)||window.document)?void 0:e.documentElement}function C(t){return t instanceof Node||t instanceof H(t).Node}function D(t){return t instanceof Element||t instanceof H(t).Element}function F(t){return t instanceof HTMLElement||t instanceof H(t).HTMLElement}function P(t){return"undefined"!=typeof ShadowRoot&&(t instanceof ShadowRoot||t instanceof H(t).ShadowRoot)}function $(t){const{overflow:e,overflowX:o,overflowY:i,display:n}=B(t);return/auto|scroll|overlay|hidden|clip/.test(e+i+o)&&!["inline","contents"].includes(n)}function M(t){return["table","td","th"].includes(L(t))}function k(t){const e=U(),o=B(t);return"none"!==o.transform||"none"!==o.perspective||!!o.containerType&&"normal"!==o.containerType||!e&&!!o.backdropFilter&&"none"!==o.backdropFilter||!e&&!!o.filter&&"none"!==o.filter||["transform","perspective","filter"].some((t=>(o.willChange||"").includes(t)))||["paint","layout","strict","content"].some((t=>(o.contain||"").includes(t)))}function U(){return!("undefined"==typeof CSS||!CSS.supports)&&CSS.supports("-webkit-backdrop-filter","none")}function W(t){return["html","body","#document"].includes(L(t))}function B(t){return H(t).getComputedStyle(t)}function q(t){return D(t)?{scrollLeft:t.scrollLeft,scrollTop:t.scrollTop}:{scrollLeft:t.pageXOffset,scrollTop:t.pageYOffset}}function I(t){if("html"===L(t))return t;const e=t.assignedSlot||t.parentNode||P(t)&&t.host||O(t);return P(e)?e.host:e}function N(t){const e=I(t);return W(e)?t.ownerDocument?t.ownerDocument.body:t.body:F(e)&&$(e)?e:N(e)}function V(t,e,o){var i;void 0===e&&(e=[]),void 0===o&&(o=!0);const n=N(t),l=n===(null==(i=t.ownerDocument)?void 0:i.body),r=H(n);return l?e.concat(r,r.visualViewport||[],$(n)?n:[],r.frameElement&&o?V(r.frameElement):[]):e.concat(n,V(n,[],o))}function _(t){const e=B(t);let o=parseFloat(e.width)||0,i=parseFloat(e.height)||0;const l=F(t),r=l?t.offsetWidth:o,s=l?t.offsetHeight:i,a=n(o)!==r||n(i)!==s;return a&&(o=r,i=s),{width:o,height:i,$:a}}function j(t){return D(t)?t:t.contextElement}function z(t){const e=j(t);if(!F(e))return r(1);const o=e.getBoundingClientRect(),{width:i,height:l,$:s}=_(e);let a=(s?n(o.width):o.width)/i,c=(s?n(o.height):o.height)/l;return a&&Number.isFinite(a)||(a=1),c&&Number.isFinite(c)||(c=1),{x:a,y:c}}const J=r(0);function Q(t){const e=H(t);return U()&&e.visualViewport?{x:e.visualViewport.offsetLeft,y:e.visualViewport.offsetTop}:J}function X(t,e,o,i){void 0===e&&(e=!1),void 0===o&&(o=!1);const n=t.getBoundingClientRect(),l=j(t);let s=r(1);e&&(i?D(i)&&(s=z(i)):s=z(t));const a=function(t,e,o){return void 0===e&&(e=!1),!(!o||e&&o!==H(t))&&e}(l,o,i)?Q(l):r(0);let c=(n.left+a.x)/s.x,f=(n.top+a.y)/s.y,p=n.width/s.x,u=n.height/s.y;if(l){const t=H(l),e=i&&D(i)?H(i):i;let o=t.frameElement;for(;o&&i&&e!==t;){const t=z(o),e=o.getBoundingClientRect(),i=B(o),n=e.left+(o.clientLeft+parseFloat(i.paddingLeft))*t.x,l=e.top+(o.clientTop+parseFloat(i.paddingTop))*t.y;c*=t.x,f*=t.y,p*=t.x,u*=t.y,c+=n,f+=l,o=H(o).frameElement}}return b({width:p,height:u,x:c,y:f})}function Y(t){return X(O(t)).left+q(t).scrollLeft}function G(t,e,o){let n;if("viewport"===e)n=function(t,e){const o=H(t),i=O(t),n=o.visualViewport;let l=i.clientWidth,r=i.clientHeight,s=0,a=0;if(n){l=n.width,r=n.height;const t=U();(!t||t&&"fixed"===e)&&(s=n.offsetLeft,a=n.offsetTop)}return{width:l,height:r,x:s,y:a}}(t,o);else if("document"===e)n=function(t){const e=O(t),o=q(t),n=t.ownerDocument.body,l=i(e.scrollWidth,e.clientWidth,n.scrollWidth,n.clientWidth),r=i(e.scrollHeight,e.clientHeight,n.scrollHeight,n.clientHeight);let s=-o.scrollLeft+Y(t);const a=-o.scrollTop;return"rtl"===B(n).direction&&(s+=i(e.clientWidth,n.clientWidth)-l),{width:l,height:r,x:s,y:a}}(O(t));else if(D(e))n=function(t,e){const o=X(t,!0,"fixed"===e),i=o.top+t.clientTop,n=o.left+t.clientLeft,l=F(t)?z(t):r(1);return{width:t.clientWidth*l.x,height:t.clientHeight*l.y,x:n*l.x,y:i*l.y}}(e,o);else{const o=Q(t);n={...e,x:e.x-o.x,y:e.y-o.y}}return b(n)}function K(t,e){const o=I(t);return!(o===e||!D(o)||W(o))&&("fixed"===B(o).position||K(o,e))}function Z(t,e,o){const i=F(e),n=O(e),l="fixed"===o,s=X(t,!0,l,e);let a={scrollLeft:0,scrollTop:0};const c=r(0);if(i||!i&&!l)if(("body"!==L(e)||$(n))&&(a=q(e)),i){const t=X(e,!0,l,e);c.x=t.x+e.clientLeft,c.y=t.y+e.clientTop}else n&&(c.x=Y(n));return{x:s.left+a.scrollLeft-c.x,y:s.top+a.scrollTop-c.y,width:s.width,height:s.height}}function tt(t,e){return F(t)&&"fixed"!==B(t).position?e?e(t):t.offsetParent:null}function et(t,e){const o=H(t);if(!F(t))return o;let i=tt(t,e);for(;i&&M(i)&&"static"===B(i).position;)i=tt(i,e);return i&&("html"===L(i)||"body"===L(i)&&"static"===B(i).position&&!k(i))?o:i||function(t){let e=I(t);for(;F(e)&&!W(e);){if(k(e))return e;e=I(e)}return null}(t)||o}const ot={convertOffsetParentRelativeRectToViewportRelativeRect:function(t){let{rect:e,offsetParent:o,strategy:i}=t;const n=F(o),l=O(o);if(o===l)return e;let s={scrollLeft:0,scrollTop:0},a=r(1);const c=r(0);if((n||!n&&"fixed"!==i)&&(("body"!==L(o)||$(l))&&(s=q(o)),F(o))){const t=X(o);a=z(o),c.x=t.x+o.clientLeft,c.y=t.y+o.clientTop}return{width:e.width*a.x,height:e.height*a.y,x:e.x*a.x-s.scrollLeft*a.x+c.x,y:e.y*a.y-s.scrollTop*a.y+c.y}},getDocumentElement:O,getClippingRect:function(t){let{element:e,boundary:n,rootBoundary:l,strategy:r}=t;const s=[..."clippingAncestors"===n?function(t,e){const o=e.get(t);if(o)return o;let i=V(t,[],!1).filter((t=>D(t)&&"body"!==L(t))),n=null;const l="fixed"===B(t).position;let r=l?I(t):t;for(;D(r)&&!W(r);){const e=B(r),o=k(r);o||"fixed"!==e.position||(n=null),(l?!o&&!n:!o&&"static"===e.position&&n&&["absolute","fixed"].includes(n.position)||$(r)&&!o&&K(t,r))?i=i.filter((t=>t!==r)):n=e,r=I(r)}return e.set(t,i),i}(e,this._c):[].concat(n),l],a=s[0],c=s.reduce(((t,n)=>{const l=G(e,n,r);return t.top=i(l.top,t.top),t.right=o(l.right,t.right),t.bottom=o(l.bottom,t.bottom),t.left=i(l.left,t.left),t}),G(e,a,r));return{width:c.right-c.left,height:c.bottom-c.top,x:c.left,y:c.top}},getOffsetParent:et,getElementRects:async function(t){let{reference:e,floating:o,strategy:i}=t;const n=this.getOffsetParent||et,l=this.getDimensions;return{reference:Z(e,await n(o),i),floating:{x:0,y:0,...await l(o)}}},getClientRects:function(t){return Array.from(t.getClientRects())},getDimensions:function(t){return _(t)},getScale:z,isElement:D,isRTL:function(t){return"rtl"===B(t).direction}};function it(t,e,n,r){void 0===r&&(r={});const{ancestorScroll:s=!0,ancestorResize:a=!0,elementResize:c="function"==typeof ResizeObserver,layoutShift:f="function"==typeof IntersectionObserver,animationFrame:p=!1}=r,u=j(t),h=s||a?[...u?V(u):[],...V(e)]:[];h.forEach((t=>{s&&t.addEventListener("scroll",n,{passive:!0}),a&&t.addEventListener("resize",n)}));const d=u&&f?function(t,e){let n,r=null;const s=O(t);function a(){clearTimeout(n),r&&r.disconnect(),r=null}return function c(f,p){void 0===f&&(f=!1),void 0===p&&(p=1),a();const{left:u,top:h,width:d,height:m}=t.getBoundingClientRect();if(f||e(),!d||!m)return;const g={rootMargin:-l(h)+"px "+-l(s.clientWidth-(u+d))+"px "+-l(s.clientHeight-(h+m))+"px "+-l(u)+"px",threshold:i(0,o(1,p))||1};let y=!0;function w(t){const e=t[0].intersectionRatio;if(e!==p){if(!y)return c();e?c(!1,e):n=setTimeout((()=>{c(!1,1e-7)}),100)}y=!1}try{r=new IntersectionObserver(w,{...g,root:s.ownerDocument})}catch(t){r=new IntersectionObserver(w,g)}r.observe(t)}(!0),a}(u,n):null;let m,g=-1,y=null;c&&(y=new ResizeObserver((t=>{let[o]=t;o&&o.target===u&&y&&(y.unobserve(e),cancelAnimationFrame(g),g=requestAnimationFrame((()=>{y&&y.observe(e)}))),n()})),u&&!p&&y.observe(u),y.observe(e));let w=p?X(t):null;return p&&function e(){const o=X(t);!w||o.x===w.x&&o.y===w.y&&o.width===w.width&&o.height===w.height||n();w=o,m=requestAnimationFrame(e)}(),n(),()=>{h.forEach((t=>{s&&t.removeEventListener("scroll",n),a&&t.removeEventListener("resize",n)})),d&&d(),y&&y.disconnect(),y=null,p&&cancelAnimationFrame(m)}}const nt=(t,e,o)=>{const i=new Map,n={platform:ot,...o},l={...n.platform,_c:i};return(async(t,e,o)=>{const{placement:i="bottom",strategy:n="absolute",middleware:l=[],platform:r}=o,s=l.filter(Boolean),a=await(null==r.isRTL?void 0:r.isRTL(e));let c=await r.getElementRects({reference:t,floating:e,strategy:n}),{x:f,y:p}=x(c,i,a),u=i,h={},d=0;for(let o=0;o<s.length;o++){const{name:l,fn:m}=s[o],{x:g,y,data:w,reset:v}=await m({x:f,y:p,initialPlacement:i,placement:u,strategy:n,middlewareData:h,rects:c,platform:r,elements:{reference:t,floating:e}});f=null!=g?g:f,p=null!=y?y:p,h={...h,[l]:{...h[l],...w}},v&&d<=50&&(d++,"object"==typeof v&&(v.placement&&(u=v.placement),v.rects&&(c=!0===v.rects?await r.getElementRects({reference:t,floating:e,strategy:n}):v.rects),({x:f,y:p}=x(c,u,a))),o=-1)}return{x:f,y:p,placement:u,strategy:n,middlewareData:h}})(t,e,{...n,platform:l})};class lt{tooltipRef;tooltip;tooltipArrow;options;constructor(t){const e={type:"button",element:null,setId:null,setClass:null,placement:t.type&&"title"==t.type?"top":"bottom",delay:t.type&&"title"==t.type?400:0,duration:600,arrow:!0,style:null,hideOnHover:!0,beforeShow:()=>{},afterShow:()=>{},beforeHide:()=>{},afterHide:()=>{}};this.options={...e,...t},this.onTransitionEndOnShow=this.onTransitionEndOnShow.bind(this),this.init()}getHtmlElements(t){let e=[];return t instanceof NodeList&&(e=[...Array.from(t)]),t instanceof HTMLElement&&(e=[t]),"string"==typeof t&&(e=[...Array.from(document.querySelectorAll(t))]),e}getHtmlElement(t){let e=null;return t instanceof HTMLElement&&(e=t),"string"==typeof t&&(e=document.querySelector(t)),e}getUniqueID(t){do{t+=Math.floor(1e4*Math.random())}while(document.querySelector("[data-tooltip-target='"+t+"']"));return t}init(){this.tooltipRef=this.getHtmlElement(this.options.element),this.tooltipRef?.classList.add("webcimes-tooltip-ref"),"button"==this.options.type?this.tooltipForButton():"title"==this.options.type&&this.tooltipForTitle()}show(){if(this.tooltipRef&&this.tooltip&&(document.querySelector(`.webcimes-tooltip[data-ref="${this.tooltipRef.getAttribute("data-tooltip-target")}"]`)||(document.body.insertAdjacentHTML("beforeend",this.tooltip.outerHTML),this.tooltip=document.body.lastElementChild),this.tooltip.tooltipPlacement=this.tooltipRef.getAttribute("data-tooltip-placement")||this.options.placement,this.tooltip.tooltipDelay=this.tooltipRef.getAttribute("data-tooltip-delay")||this.options.delay,this.tooltip.tooltipDuration=this.tooltipRef.getAttribute("data-tooltip-duration")||this.options.duration,this.tooltip.tooltipArrow=JSON.parse(this.tooltipRef.getAttribute("data-tooltip-arrow")||this.options.arrow),this.tooltip.tooltipHideOnHover=JSON.parse(this.tooltipRef.getAttribute("data-tooltip-hide-on-hover")||this.options.hideOnHover),this.tooltip.style.setProperty("--tooltip-duration",this.tooltip.tooltipDuration+"ms"),this.tooltip.tooltipArrow&&(this.tooltip.querySelector(".webcimes-tooltip__arrow")||this.tooltip.insertAdjacentHTML("beforeend",'<div class="webcimes-tooltip__arrow"></div>'),this.tooltipArrow=this.tooltip.querySelector(".webcimes-tooltip__arrow")),clearTimeout(this.tooltip.tooltipHideTimeout),this.tooltip.tooltipShowTimeout=setTimeout((()=>{this.tooltip.tooltipAlreadyShow||setTimeout((()=>{this.tooltipRef.dispatchEvent(new CustomEvent("beforeShow")),this.tooltip.dispatchEvent(new CustomEvent("beforeShow")),"function"==typeof this.options.beforeShow&&this.options.beforeShow()}),0),this.tooltip.classList.add("webcimes-tooltip--show"),this.tooltip.tooltipAlreadyShow=!0}),this.tooltip.tooltipAlreadyShow?0:this.tooltip.tooltipDelay),this.tooltip.addEventListener("transitionend",this.onTransitionEndOnShow),void 0===this.tooltip.cleanUpFloatingUi)){let t={placement:this.tooltip.tooltipPlacement,middleware:[A(10),T({padding:10,limiter:S({offset:30})}),E({fallbackPlacements:["top","bottom","left","right"],padding:10})]};this.tooltipArrow&&t.middleware.push((t=>({name:"arrow",options:t,async fn(e){const{x:i,y:n,placement:l,rects:r,platform:s,elements:a,middlewareData:p}=e,{element:h,padding:m=0}=f(t,e)||{};if(null==h)return{};const y=v(m),w={x:i,y:n},b=g(l),x=d(b),R=await s.getDimensions(h),E="y"===b,A=E?"top":"left",T=E?"bottom":"right",S=E?"clientHeight":"clientWidth",L=r.reference[x]+r.reference[b]-w[b]-r.floating[x],H=w[b]-r.reference[b],O=await(null==s.getOffsetParent?void 0:s.getOffsetParent(h));let C=O?O[S]:0;C&&await(null==s.isElement?void 0:s.isElement(O))||(C=a.floating[S]||r.floating[x]);const D=L/2-H/2,F=C/2-R[x]/2-1,P=o(y[A],F),$=o(y[T],F),M=P,k=C-R[x]-$,U=C/2-R[x]/2+D,W=c(M,U,k),B=!p.arrow&&null!=u(l)&&U!=W&&r.reference[x]/2-(U<M?P:$)-R[x]/2<0,q=B?U<M?U-M:U-k:0;return{[b]:w[b]+q,data:{[b]:W,centerOffset:U-W-q,...B&&{alignmentOffset:q}},reset:B}}}))({element:this.tooltipArrow,padding:10})),this.tooltip.cleanUpFloatingUi=it(this.tooltipRef,this.tooltip,(()=>{nt(this.tooltipRef,this.tooltip,t).then((({x:t,y:e,middlewareData:o,placement:i})=>{if(this.tooltip.setAttribute("data-tooltip-placement",i),Object.assign(this.tooltip.style,{left:`${t}px`,top:`${e}px`}),this.tooltipArrow&&o.arrow){const t=this.tooltipArrow.offsetWidth,e={top:"bottom",right:"left",bottom:"top",left:"right"}[i.split("-")[0]],{x:n,y:l}=o.arrow;Object.assign(this.tooltipArrow.style,{left:null!=n?`${n}px`:"",top:null!=l?`${l}px`:"",right:"",bottom:"",[e]:-t/2+"px"})}}))}))}}hide(t){this.tooltip&&(this.tooltipRef.dispatchEvent(new CustomEvent("beforeHide")),this.tooltip.dispatchEvent(new CustomEvent("beforeHide")),"function"==typeof this.options.beforeHide&&this.options.beforeHide(),clearTimeout(this.tooltip.tooltipShowTimeout),this.tooltip.classList.remove("webcimes-tooltip--show"),this.tooltip.removeEventListener("transitionend",this.onTransitionEndOnShow),this.tooltip.tooltipHideTimeout=setTimeout((()=>{void 0!==this.tooltip?.cleanUpFloatingUi&&(this.tooltip.cleanUpFloatingUi(),delete this.tooltip.cleanUpFloatingUi),delete this.tooltip?.tooltipPlacement,delete this.tooltip?.tooltipDelay,delete this.tooltip?.tooltipDuration,delete this.tooltip?.tooltipArrow,delete this.tooltip?.tooltipHideOnHover,delete this.tooltip?.tooltipAlreadyShow,delete this.tooltip?.tooltipShowTimeout,delete this.tooltip?.tooltipHideTimeout,this.tooltipRef.dispatchEvent(new CustomEvent("afterHide")),this.tooltip.dispatchEvent(new CustomEvent("afterHide")),"function"==typeof this.options.afterHide&&this.options.afterHide(),"function"==typeof t&&t()}),this.tooltip.tooltipDuration))}tooltipForButton(){if(this.tooltipRef){const t=this.getUniqueID("tooltipButton");this.tooltipRef.setAttribute("data-tooltip-target",t);let e=document.createElement("template");e.innerHTML=`<div class="webcimes-tooltip webcimes-tooltip--button ${this.options.setClass?this.options.setClass:""}" ${this.options.setId?`id="${this.options.setId}"`:""} data-ref="${t}" ${this.options.style?`style="${this.options.style}"`:""}>${this.tooltipRef.nextElementSibling?.outerHTML}</div>`,this.tooltip=e.content.firstChild,this.tooltipRef.nextElementSibling?.remove(),this.tooltipRef.addEventListener("click",(t=>{this.show()})),document.addEventListener("click",(t=>{t.target.closest(".webcimes-tooltip-ref")!=this.tooltipRef&&t.target.closest(".webcimes-tooltip")!=this.tooltip&&this.hide((()=>{this.tooltip?.remove()}))}))}}tooltipForTitle(){if(this.tooltipRef){this.tooltipRef.setAttribute("data-tooltip-title",this.tooltipRef.getAttribute("title")),this.tooltipRef.removeAttribute("title");const t=this.getUniqueID("tooltipTitle");this.tooltipRef.setAttribute("data-tooltip-target",t);let e=document.createElement("template");e.innerHTML=`<div class="webcimes-tooltip webcimes-tooltip--title ${this.options.setClass?this.options.setClass:""}" ${this.options.setId?`id="${this.options.setId}"`:""} data-ref="${t}" ${this.options.style?`style="${this.options.style}"`:""}>${this.tooltipRef.getAttribute("data-tooltip-title")}</div>`,this.tooltip=e.content.firstChild,document.addEventListener("mouseenter",(t=>{(t.target==this.tooltipRef||!this.tooltip.tooltipHideOnHover&&t.target==this.tooltip)&&this.show()}),!0),document.addEventListener("mouseleave",(t=>{(t.target==this.tooltipRef||!this.tooltip.tooltipHideOnHover&&t.target==this.tooltip)&&this.hide((()=>{this.tooltip?.remove()}))}),!0)}}onTransitionEndOnShow(t){this.tooltip.classList.contains("webcimes-tooltip--show")&&"opacity"==t.propertyName&&(this.tooltipRef.dispatchEvent(new CustomEvent("afterShow")),this.tooltip.dispatchEvent(new CustomEvent("afterShow")),"function"==typeof this.options.afterShow&&this.options.afterShow())}}var rt=e.Q;export{rt as WebcimesTooltip};
//# sourceMappingURL=webcimes-tooltip.esm.js.map