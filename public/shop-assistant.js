/* AI nákupní asistent – widget */
(()=>{var X=`
:host {
  --sa-teal: #0e9f9a;
  --sa-teal-dark: #0a7f7b;
  --sa-azure: #1f8fe5;
  --sa-azure-soft: #e3f1fd;
  --sa-ink: #10303a;
  --sa-ink-soft: #4b6670;
  --sa-mist: #eef6f7;
  --sa-line: #d7e7ea;
  --sa-white: #ffffff;
  --sa-ok: #1e8f55;
  --sa-warn: #a35f00;
  --sa-offset: 20px;
  --sa-side: 20px;
  all: initial;
  font-family: inherit;
  color: var(--sa-ink);
}
*, *::before, *::after { box-sizing: border-box; }
button, input, textarea { font: inherit; color: inherit; }
button { cursor: pointer; }
:focus-visible { outline: 2px solid var(--sa-azure); outline-offset: 2px; }

.root { position: fixed; z-index: 2147483000; bottom: var(--sa-offset); right: var(--sa-side); font-size: 15px; line-height: 1.45; }
.root.left { right: auto; left: var(--sa-side); }

/* Spou\u0161t\u011Bc\xED tla\u010D\xEDtko */
.launcher {
  display: flex; align-items: center; gap: 10px;
  height: 52px; padding: 0 20px 0 8px; border: 0; border-radius: 999px;
  background: var(--sa-teal); color: var(--sa-white);
  box-shadow: 0 6px 20px rgba(14, 159, 154, .35);
  font-weight: 600; font-size: 16px;
  transition: background .15s ease;
}
.launcher:hover { background: var(--sa-teal-dark); }
.launcher .avatar { width: 38px; height: 38px; border: 2px solid var(--sa-white); }
.root.open .launcher { display: none; }

.avatar {
  position: relative; flex: none; width: 40px; height: 40px; border-radius: 50%;
  background: var(--sa-azure); color: var(--sa-white);
  display: grid; place-items: center; font-weight: 700; font-size: 15px; overflow: visible;
}
.avatar img { width: 100%; height: 100%; border-radius: 50%; object-fit: cover; }
.avatar .dot {
  position: absolute; right: -1px; bottom: -1px; width: 12px; height: 12px; border-radius: 50%;
  background: #35c97a; border: 2px solid var(--sa-white);
}

/* Panel */
.panel {
  display: none; flex-direction: column;
  width: 384px; height: min(640px, calc(100vh - 2 * var(--sa-offset)));
  background: var(--sa-white); border-radius: 18px; overflow: hidden;
  box-shadow: 0 18px 50px rgba(16, 48, 58, .22), 0 2px 6px rgba(16, 48, 58, .08);
  transform-origin: bottom right;
}
.root.left .panel { transform-origin: bottom left; }
.root.open .panel { display: flex; animation: sa-open .2s cubic-bezier(.2, .8, .3, 1); }
@keyframes sa-open { from { opacity: 0; transform: translateY(12px) scale(.96); } to { opacity: 1; transform: none; } }

.header {
  display: flex; align-items: center; gap: 12px; padding: 14px 12px 14px 16px;
  background: var(--sa-teal); color: var(--sa-white);
}
.header .avatar { border: 2px solid rgba(255, 255, 255, .85); }
.who { flex: 1; min-width: 0; }
.who strong { display: block; font-size: 16px; }
.who span { font-size: 13px; opacity: .9; }
.icon-btn {
  width: 36px; height: 36px; border: 0; border-radius: 10px; background: transparent; color: inherit;
  display: grid; place-items: center;
}
.icon-btn:hover { background: rgba(255, 255, 255, .16); }
.icon-btn svg { width: 20px; height: 20px; }

/* Zpr\xE1vy */
.log { flex: 1; overflow-y: auto; padding: 16px 14px 8px; background: var(--sa-mist); overscroll-behavior: contain; }
.msg { display: flex; margin: 0 0 12px; }
.msg.user { justify-content: flex-end; }
.bubble {
  max-width: 84%; padding: 10px 14px; border-radius: 16px; white-space: pre-wrap; overflow-wrap: anywhere;
}
.msg.bot .bubble { background: var(--sa-white); border: 1px solid var(--sa-line); border-bottom-left-radius: 6px; }
.msg.user .bubble { background: var(--sa-azure); color: var(--sa-white); border-bottom-right-radius: 6px; }
.msg.bot.wide { flex-direction: column; }
.msg.bot.wide .bubble { align-self: flex-start; }
.msg.error .bubble { border-color: #f0c9a0; background: #fff8ef; }

.chips { display: flex; flex-wrap: wrap; gap: 8px; margin: 2px 0 14px; }
.chip {
  border: 1px solid var(--sa-azure); background: var(--sa-white); color: #136fb6;
  border-radius: 999px; padding: 6px 12px; font-size: 14px; text-decoration: none; display: inline-block;
}
.chip:hover { background: var(--sa-azure-soft); }

/* Produktov\xE9 karty \u2013 \u201Ereg\xE1l\u201C s vodorovn\xFDm posunem */
.shelf {
  display: flex; gap: 10px; overflow-x: auto; scroll-snap-type: x mandatory;
  margin: 8px -14px 0; padding: 2px 14px 6px; scrollbar-width: thin;
}
.card {
  flex: 0 0 176px; scroll-snap-align: start;
  display: flex; flex-direction: column; background: var(--sa-white);
  border: 1px solid var(--sa-line); border-radius: 12px; overflow: hidden;
}
.card .img { aspect-ratio: 1 / 1; background: var(--sa-white); display: grid; place-items: center; border-bottom: 1px solid var(--sa-mist); }
.card .img img { width: 100%; height: 100%; object-fit: contain; padding: 8px; }
.card .img .noimg { font-size: 13px; color: var(--sa-ink-soft); }
.card .body { display: flex; flex-direction: column; gap: 4px; padding: 10px 10px 12px; flex: 1; }
.card .name {
  font-size: 14px; font-weight: 600; line-height: 1.3; color: var(--sa-ink);
  display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; min-height: 2.6em;
}
.card .price { font-size: 17px; font-weight: 700; margin-top: 2px; }
.card .price s { font-size: 13px; font-weight: 400; color: var(--sa-ink-soft); margin-left: 6px; }
.card .stock { font-size: 13px; display: flex; align-items: center; gap: 6px; }
.card .stock::before { content: ""; width: 8px; height: 8px; border-radius: 50%; background: currentColor; flex: none; }
.card .stock.in { color: var(--sa-ok); }
.card .stock.out { color: var(--sa-warn); }
.card .stock.unknown { color: var(--sa-ink-soft); }
.card .asof { font-size: 12px; color: var(--sa-ink-soft); }
.card .go {
  margin-top: auto; display: block; text-align: center; text-decoration: none;
  background: var(--sa-teal); color: var(--sa-white); border-radius: 10px; padding: 8px 10px; font-size: 14px; font-weight: 600;
}
.card .go:hover { background: var(--sa-teal-dark); }

.typing { display: inline-flex; gap: 4px; padding: 14px 16px; }
.typing i { width: 7px; height: 7px; border-radius: 50%; background: var(--sa-teal); opacity: .35; animation: sa-dot 1s infinite; }
.typing i:nth-child(2) { animation-delay: .15s; }
.typing i:nth-child(3) { animation-delay: .3s; }
@keyframes sa-dot { 0%, 100% { opacity: .35; transform: none; } 50% { opacity: 1; transform: translateY(-3px); } }

/* Vstup */
.composer { border-top: 1px solid var(--sa-line); padding: 10px 12px 8px; background: var(--sa-white); position: relative; }
.row { display: flex; align-items: flex-end; gap: 6px; }
textarea {
  flex: 1; resize: none; border: 1px solid var(--sa-line); border-radius: 12px; padding: 10px 12px;
  max-height: 120px; min-height: 44px; line-height: 1.4; background: var(--sa-white); outline: none;
}
textarea:focus { border-color: var(--sa-azure); box-shadow: 0 0 0 3px var(--sa-azure-soft); }
.emoji-btn { color: var(--sa-ink-soft); }
.emoji-btn:hover { background: var(--sa-mist); }
.send {
  width: 44px; height: 44px; border: 0; border-radius: 12px; background: var(--sa-azure); color: var(--sa-white);
  display: grid; place-items: center; flex: none;
}
.send:disabled { background: #b8d9f3; cursor: default; }
.send svg { width: 20px; height: 20px; }
.note { margin: 6px 2px 0; font-size: 12px; color: var(--sa-ink-soft); }
.note a { color: inherit; }
.legal { margin: 4px 2px 0; font-size: 11px; line-height: 1.35; color: var(--sa-ink-soft); }
.legal p { margin: 2px 0 0; }
.legal a, .legal .linklike { color: inherit; text-decoration: underline; }
.linklike { border: 0; background: none; padding: 0; font: inherit; cursor: pointer; }

.emoji-pop {
  position: absolute; bottom: 64px; left: 12px; display: none; grid-template-columns: repeat(8, 1fr); gap: 2px;
  padding: 8px; background: var(--sa-white); border: 1px solid var(--sa-line); border-radius: 12px;
  box-shadow: 0 8px 24px rgba(16, 48, 58, .14);
}
.emoji-pop.show { display: grid; }
.emoji-pop button { border: 0; background: transparent; font-size: 20px; width: 34px; height: 34px; border-radius: 8px; }
.emoji-pop button:hover { background: var(--sa-mist); }

/* Video \u201EJak chatbot funguje\u201C */
.videocard {
  display: flex; gap: 12px; align-items: center; width: 100%; margin: 0 0 12px; padding: 8px; text-align: left;
  background: var(--sa-white); border: 1px solid var(--sa-line); border-radius: 14px;
  box-shadow: 0 1px 2px rgba(16, 48, 58, .05); transition: border-color .15s ease, box-shadow .15s ease;
}
.videocard:hover { border-color: var(--sa-teal); box-shadow: 0 4px 14px rgba(14, 159, 154, .15); }
.videocard .thumb {
  position: relative; flex: none; width: 104px; aspect-ratio: 16 / 9; border-radius: 10px; overflow: hidden;
  background: linear-gradient(135deg, var(--sa-teal), var(--sa-teal-dark)); display: grid; place-items: center;
}
.videocard .thumb img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
.videocard .play {
  position: relative; width: 32px; height: 32px; border-radius: 50%; background: rgba(255, 255, 255, .95); color: var(--sa-teal);
  display: grid; place-items: center; box-shadow: 0 2px 8px rgba(0, 0, 0, .2);
}
.videocard .play svg { width: 15px; height: 15px; margin-left: 2px; }
.videocard .txt { display: grid; gap: 2px; min-width: 0; }
.videocard strong { font-size: 14px; line-height: 1.3; }
.videocard .txt span { font-size: 12px; color: var(--sa-ink-soft); }
.video-layer {
  flex: 1; min-height: 0; display: flex; flex-direction: column; gap: 10px;
  padding: 12px 14px 16px; background: var(--sa-white); overflow-y: auto;
}
.panel.with-video .log, .panel.with-video .composer { display: none; }
.video-layer[hidden] { display: none; }
.video-layer .bar { display: flex; align-items: center; gap: 10px; }
.video-layer .bar strong { font-size: 15px; }
.video-layer .back {
  display: inline-flex; align-items: center; gap: 4px; border: 1px solid var(--sa-line); background: var(--sa-white);
  border-radius: 999px; padding: 5px 12px 5px 6px; font-size: 13px; font-weight: 600; color: var(--sa-ink);
}
.video-layer .back svg { width: 18px; height: 18px; }
.video-layer .frame { border-radius: 12px; overflow: hidden; background: #0b2a2f; aspect-ratio: 16 / 9; flex: none; }
.video-layer video { display: block; width: 100%; height: 100%; object-fit: contain; background: #0b2a2f; }
.video-layer .lead { margin: 4px 0 0; font-weight: 700; font-size: 14px; }
.video-layer .steps { margin: 0; padding-left: 20px; display: grid; gap: 4px; font-size: 14px; color: var(--sa-ink-soft); }
.video-layer .try {
  margin-top: auto; align-self: stretch; border: 0; border-radius: 12px; padding: 11px 16px;
  background: var(--sa-teal); color: var(--sa-white); font-weight: 700;
}
.video-layer .try:hover { background: var(--sa-teal-dark); }
.header .icon-btn svg { pointer-events: none; }

/* Mobil: cel\xE1 obrazovka */
@media (max-width: 520px) {
  .root.open { inset: 0; }
  .root.open .panel { width: 100vw; height: 100dvh; border-radius: 0; }
  .header { padding-top: max(14px, env(safe-area-inset-top)); }
  .composer { padding-bottom: max(8px, env(safe-area-inset-bottom)); }
  textarea { font-size: 16px; } /* iOS jinak p\u0159ibl\xED\u017E\xED str\xE1nku */
}
@media (prefers-reduced-motion: reduce) {
  .root.open .panel { animation: none; }
  .typing i { animation: none; opacity: .7; }
}
`;function u(e){if(typeof e!="string")return null;try{let a=new URL(e);return a.protocol==="https:"||a.protocol==="http:"?a.toString():null}catch{return null}}function Z(e,a="CZK"){if(typeof e!="number"||!Number.isFinite(e))return"";let n=Number.isInteger(e);return new Intl.NumberFormat("cs-CZ",{style:"currency",currency:a,minimumFractionDigits:n?0:2,maximumFractionDigits:2}).format(e)}function ee(e,a=new Date){if(!e)return"";let n=new Date(e);if(Number.isNaN(n.getTime()))return"";let l=n.toLocaleTimeString("cs-CZ",{hour:"2-digit",minute:"2-digit"});return n.toDateString()===a.toDateString()?`stav k ${l}`:`stav k ${n.getDate()}. ${n.getMonth()+1}. ${l}`}function O(){let e=globalThis.crypto;if(e!=null&&e.randomUUID)return e.randomUUID();let a=new Uint8Array(16);e!=null&&e.getRandomValues?e.getRandomValues(a):a.forEach((l,r)=>a[r]=Math.floor(Math.random()*256)),a[6]=a[6]&15|64,a[8]=a[8]&63|128;let n=[...a].map(l=>l.toString(16).padStart(2,"0")).join("");return`${n.slice(0,8)}-${n.slice(8,12)}-${n.slice(12,16)}-${n.slice(16,20)}-${n.slice(20)}`}function te(e){return e.trim().split(/\s+/).map(a=>a[0]??"").join("").slice(0,2).toUpperCase()||"AI"}var ne="shop-assistant:v1",ge=document.currentScript,I=/^#[0-9a-f]{3,8}$/i,fe=/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i,he=["\u{1F60A}","\u{1F642}","\u{1F609}","\u{1F600}","\u{1F60D}","\u{1F914}","\u{1F605}","\u{1F44B}","\u{1F44D}","\u{1F44C}","\u{1F64F}","\u2764\uFE0F","\u2B50","\u{1F525}","\u2705","\u2753","\u{1F381}","\u{1F6D2}","\u{1F4E6}","\u{1F33F}","\u{1FAD2}","\u{1F36B}","\u{1F375}","\u{1F957}"],v={close:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>',reset:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 3-6.7"/><path d="M3 4v5h5"/></svg>',send:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12l16-8-6 16-2.5-6.5z"/></svg>',play:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5.5v13a1 1 0 0 0 1.5.86l11-6.5a1 1 0 0 0 0-1.72l-11-6.5A1 1 0 0 0 8 5.5z"/></svg>',video:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="3"/><path d="M10 9.5v5l4.5-2.5z" fill="currentColor"/></svg>',back:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 6l-6 6 6 6"/></svg>',smile:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M8.5 14.5a4.5 4.5 0 0 0 7 0"/><path d="M9 9.5h.01M15 9.5h.01" stroke-width="3"/></svg>'};function ie(e){return`Dobr\xFD den, jsem ${e}, AI asistent. Pom\u016F\u017Eu v\xE1m vybrat z nab\xEDdky e-shopu \u2013 napi\u0161te, co hled\xE1te.`}async function me(e){let a="shop-assistant:config";try{let n=JSON.parse(sessionStorage.getItem(a)||"null");if(n&&n.endpoint===e&&Date.now()-n.at<6e4)return n.config}catch{}try{let n=await fetch(e,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({action:"config"}),signal:AbortSignal.timeout(3e3)});if(!n.ok)return null;let l=await n.json();try{sessionStorage.setItem(a,JSON.stringify({endpoint:e,at:Date.now(),config:l}))}catch{}return l}catch{return null}}function ve(e,a){let n={...e};typeof a.name=="string"&&a.name.trim()&&(n.name=a.name.trim().slice(0,40));let l=u(a.avatar_url??void 0);return l&&(n.avatar=l),typeof a.greeting=="string"&&a.greeting.trim()?n.greeting=a.greeting.trim().slice(0,300):e.greetingFromAttr||(n.greeting=ie(n.name)),Array.isArray(a.suggestions)&&a.suggestions.length&&(n.suggestions=a.suggestions.filter(r=>typeof r=="string"&&r.trim()).map(r=>r.trim().slice(0,60)).slice(0,5)),a.primary&&I.test(a.primary)&&(n.primary=a.primary),a.accent&&I.test(a.accent)&&(n.accent=a.accent),(a.position==="left"||a.position==="right")&&(n.position=a.position),n}function be(){let e=ge??document.querySelector("script[data-endpoint][src*='shop-assistant']"),a=(e==null?void 0:e.dataset)??{},n=a.name||"Ema";return{endpoint:a.endpoint||"",name:n,avatar:u(a.avatar),greeting:a.greeting||ie(n),greetingFromAttr:!!a.greeting,suggestions:(a.suggestions??"Hled\xE1m d\xE1rek|Co m\xE1te bez cukru?|Co je te\u010F v akci?").split("|").map(l=>l.trim()).filter(Boolean),privacyUrl:u(a.privacyUrl),accessibilityUrl:u(a.accessibilityUrl),poweredBy:(a.poweredBy||"").slice(0,80),operator:(a.operator||"").slice(0,80),position:a.position==="left"?"left":"right",offsetBottom:Number(a.offsetBottom)||20,primary:I.test(a.primary??"")?a.primary:"",accent:I.test(a.accent??"")?a.accent:"",videoUrl:u(a.videoUrl),videoPoster:u(a.videoPoster),videoLength:(a.videoLength||"").slice(0,12),requireParam:a.requireParam||""}}function xe(e){let a="shop-assistant:pilot";try{let n=new URLSearchParams(location.search).get(e);return n==="1"&&sessionStorage.setItem(a,"1"),n==="0"&&sessionStorage.removeItem(a),sessionStorage.getItem(a)==="1"}catch{return!1}}function ye(){try{let e=sessionStorage.getItem(ne);if(e){let a=JSON.parse(e);if(a&&typeof a.sessionId=="string"&&Array.isArray(a.messages))return a}}catch{}return{sessionId:O(),open:!1,messages:[]}}function U(e){try{sessionStorage.setItem(ne,JSON.stringify({...e,messages:e.messages.slice(-40)}))}catch{}}function o(e,a={},...n){let l=document.createElement(e);for(let[r,p]of Object.entries(a))p===void 0||p===!1||(r==="class"?l.className=String(p):l.setAttribute(r,p===!0?"":String(p)));for(let r of n)r!=null&&l.append(r);return l}function j(e,a,n="icon-btn"){let l=o("button",{type:"button",class:n,"aria-label":a,title:a});return l.innerHTML=e,l}var ae=!1;async function oe(){if(ae||document.querySelector("shop-assistant-root"))return;ae=!0;let e=be();if(!e.endpoint){console.warn("[shop-assistant] chyb\xED data-endpoint");return}if(e.requireParam&&!xe(e.requireParam))return;if(e.endpoint!=="mock"){let t=await me(e.endpoint);if((t==null?void 0:t.enabled)===!1)return;t&&(e=ve(e,t))}let a=document.createElement("shop-assistant-root"),n=a.attachShadow({mode:"open"}),l=o("style");l.textContent=X+(e.primary?`:host{--sa-teal:${e.primary};--sa-teal-dark:${e.primary};}`:"")+(e.accent?`:host{--sa-azure:${e.accent};}`:""),n.append(l);let r=ye(),p=!1,V=t=>{let i=o("span",{class:"avatar","aria-hidden":"true"});return e.avatar?i.append(o("img",{src:e.avatar,alt:""})):i.append(te(e.name)),t&&i.append(o("span",{class:"dot"})),i},N=o("button",{type:"button",class:"launcher","aria-label":`Otev\u0159\xEDt chat s asistentem ${e.name}`},V(!0),"Chat"),K=j(v.reset,"Za\u010D\xEDt novou konverzaci"),J=j(v.close,"Zav\u0159\xEDt chat"),S=e.videoUrl?j(v.video,"Video: jak chatbot funguje"):null,re=o("div",{class:"header"},V(!0),o("div",{class:"who"},o("strong",{},e.name),o("span",{},"Online")),S,K,J),g=o("div",{class:"video-layer",role:"dialog","aria-label":"Video: jak chatbot funguje",hidden:!0}),f=o("div",{class:"log",role:"log","aria-live":"polite","aria-label":"Konverzace"}),s=o("textarea",{rows:"1",placeholder:"Napi\u0161te, co hled\xE1te\u2026","aria-label":"Zpr\xE1va",maxlength:"500"}),L=j(v.smile,"Vlo\u017Eit smajl\xEDk","icon-btn emoji-btn");L.setAttribute("aria-expanded","false");let R=j(v.send,"Odeslat","send"),x=o("div",{class:"emoji-pop",role:"menu","aria-label":"Smajl\xEDky"});for(let t of he){let i=o("button",{type:"button",role:"menuitem","aria-label":t},t);i.addEventListener("click",()=>{ce(t),A(!1),s.focus()}),x.append(i)}let se=o("p",{class:"note"},"Odpov\xEDd\xE1 AI asistent, m\u016F\u017Ee se spl\xE9st. Cenu a dostupnost v\u017Edy uvid\xEDte na str\xE1nce produktu. Nepi\u0161te sem osobn\xED \xFAdaje."),T=o("div",{class:"legal"}),_=[];e.poweredBy&&_.push(`Powered by: ${e.poweredBy}`),e.operator&&_.push(`Neofici\xE1ln\xED asistent, provozuje ${e.operator}${e.poweredBy?` \u2013 nejde o slu\u017Ebu ${e.poweredBy}`:""}.`),_.length&&T.append(o("p",{},_.join(" \xB7 ")));let E=o("p",{class:"links"}),B=t=>{E.childNodes.length&&E.append(o("span",{"aria-hidden":"true"}," \xB7 ")),E.append(t)};e.privacyUrl&&B(o("a",{href:e.privacyUrl,target:"_blank",rel:"noopener"},"Moje data a GDPR")),e.accessibilityUrl&&B(o("a",{href:e.accessibilityUrl,target:"_blank",rel:"noopener"},"P\u0159\xEDstupnost"));let q=o("button",{type:"button",class:"linklike"},"Smazat moje data");B(q),T.append(E);let F=o("form",{class:"composer"},x,o("div",{class:"row"},L,s,R),se,T),M=o("div",{class:"panel",role:"dialog","aria-label":`Chat s asistentem ${e.name}`},re,f,F,g),D=o("div",{class:`root ${e.position==="left"?"left":""}`},M,N);D.style.setProperty("--sa-offset",`${Math.min(Math.max(e.offsetBottom,0),300)}px`),n.append(D),document.body.append(a);function le(t){let i=u(t.url);if(!i)return null;let d=u(t.image_url),c=t.in_stock===!0?"in":t.in_stock===!1?"out":"unknown",m=o("div",{class:"price"},Z(t.price,t.currency)||"Cena na webu");return t.standard_price&&t.price!==null&&t.standard_price>t.price&&m.append(o("s",{},Z(t.standard_price,t.currency))),o("article",{class:"card"},o("div",{class:"img"},d?o("img",{src:d,alt:"",loading:"lazy"}):o("span",{class:"noimg"},"Bez obr\xE1zku")),o("div",{class:"body"},o("div",{class:"name",title:t.name},t.name),m,t.availability?o("div",{class:`stock ${c}`},t.availability):null,o("div",{class:"asof"},ee(t.data_as_of)+(t.live_checked?", ov\u011B\u0159eno na webu":"")),o("a",{class:"go",href:i,"aria-label":`Zobrazit produkt ${t.name}`},"Zobrazit produkt")))}function G(t){var m,Y,W,Q;let i=t.contactEmail&&fe.test(t.contactEmail)?t.contactEmail:null,d=!!((m=t.products)!=null&&m.length||(Y=t.links)!=null&&Y.length||i),c=o("div",{class:`msg ${t.role}${d?" wide":""}${t.error?" error":""}`},o("div",{class:"bubble"},t.text));if((W=t.products)!=null&&W.length){let C=o("div",{class:"shelf",role:"list","aria-label":"Doporu\u010Den\xE9 produkty"});for(let P of t.products){let b=le(P);b&&(b.setAttribute("role","listitem"),C.append(b))}c.append(C)}if((Q=t.links)!=null&&Q.length){let C=o("div",{class:"chips"});for(let P of t.links){let b=u(P.url);b&&C.append(o("a",{class:"chip",href:b},P.label))}c.append(C)}return i&&c.append(o("div",{class:"chips"},o("a",{class:"chip",href:`mailto:${i}`},`Napsat na ${i}`))),c}function de(){let t=o("span",{class:"thumb","aria-hidden":"true"});e.videoPoster&&t.append(o("img",{src:e.videoPoster,alt:"",loading:"lazy"}));let i=o("span",{class:"play"});i.innerHTML=v.play,t.append(i);let d=o("button",{type:"button",class:"videocard"},t,o("span",{class:"txt"},o("strong",{},"Chcete vid\u011Bt, jak chatbot funguje?"),o("span",{},`Kr\xE1tk\xE9 video${e.videoLength?` \xB7 ${e.videoLength}`:""} \u2013 p\u0159ehraje se tady v chatu`)));return d.addEventListener("click",H),d}let $=null;function H(){var m;if(!e.videoUrl)return;$=n.activeElement??null;let t=o("button",{type:"button",class:"back"});t.innerHTML=v.back,t.append("Zp\u011Bt do chatu"),t.addEventListener("click",y);let i=o("video",{controls:!0,autoplay:!0,playsinline:!0,preload:"auto","aria-label":"Video: jak chatbot funguje"});e.videoPoster&&(i.poster=e.videoPoster),i.append(o("source",{src:e.videoUrl,type:"video/mp4"})),/\.mp4(\?|$)/i.test(e.videoUrl)&&i.append(o("source",{src:e.videoUrl.replace(/\.mp4(\?|$)/i,".webm$1"),type:"video/webm"}));let d=o("ol",{class:"steps"},o("li",{},"Otev\u0159ete chat tla\u010D\xEDtkem na e-shopu."),o("li",{},"Napi\u0161te, co hled\xE1te \u2013 t\u0159eba \u201Eolivov\xFD olej do 300 K\u010D\u201C."),o("li",{},"Uvid\xEDte produkty s cenou a dostupnost\xED z webu."),o("li",{},"Objedn\xE1vky a reklamace vy\u0159izuje obchod.")),c=o("button",{type:"button",class:"try"},"Vyzkou\u0161et v chatu");c.addEventListener("click",()=>{y(),s.focus()}),g.replaceChildren(o("div",{class:"bar"},t,o("strong",{},"Jak chatbot funguje")),o("div",{class:"frame"},i),o("p",{class:"lead"},"Ve videu:"),d,c),g.hidden=!1,M.classList.add("with-video"),(m=i.play)==null||m.call(i).catch(()=>{}),t.focus()}function y(){if(g.hidden)return;let t=g.querySelector("video");t&&(t.pause(),t.replaceChildren(),t.load()),g.hidden=!0,g.replaceChildren(),M.classList.remove("with-video"),($&&$.isConnected?$:s).focus()}function k(){if(f.replaceChildren(),f.append(G({role:"bot",text:e.greeting})),!r.messages.length&&e.videoUrl&&f.append(de()),!r.messages.length&&e.suggestions.length){let t=o("div",{class:"chips"});for(let i of e.suggestions){let d=o("button",{type:"button",class:"chip"},i);d.addEventListener("click",()=>z(i)),t.append(d)}f.append(t)}for(let t of r.messages)f.append(G(t));p&&f.append(o("div",{class:"msg bot"},o("div",{class:"bubble typing","aria-label":"Asistent p\xED\u0161e"},o("i"),o("i"),o("i")))),f.scrollTop=f.scrollHeight}function h(t){r.open=t,D.classList.toggle("open",t),U(r),t?(k(),setTimeout(()=>s.focus(),50)):(A(!1),N.focus())}function A(t){let i=t??!x.classList.contains("show");x.classList.toggle("show",i),L.setAttribute("aria-expanded",String(i))}function ce(t){let i=s.selectionStart??s.value.length,d=s.selectionEnd??s.value.length;s.value=s.value.slice(0,i)+t+s.value.slice(d),s.selectionStart=s.selectionEnd=i+t.length,w()}function w(){s.style.height="auto",s.style.height=`${Math.min(s.scrollHeight,120)}px`,R.toggleAttribute("disabled",p||!s.value.trim())}async function pe(t){let i={session_id:r.sessionId,message:t,page_url:location.href};if(e.endpoint==="mock"&&window.__SA_MOCK__)return{status:200,data:await window.__SA_MOCK__(i)};let d=await fetch(e.endpoint,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(i),signal:AbortSignal.timeout(3e4)}),c={};try{c=await d.json()}catch{}return{status:d.status,data:c}}async function z(t){let i=t.trim();if(!(!i||p)){r.messages.push({role:"user",text:i}),s.value="",p=!0,w(),k();try{let{status:d,data:c}=await pe(i);d===200&&c.reply?r.messages.push({role:"bot",text:c.reply,products:c.products??[],links:c.links??[],contactEmail:c.contact_email??null}):r.messages.push({role:"bot",error:!0,text:c.reply||"Odpov\u011B\u010F se nepoda\u0159ilo na\u010D\xEDst. Zkuste zpr\xE1vu odeslat znovu."})}catch{r.messages.push({role:"bot",error:!0,text:"Nepoda\u0159ilo se spojit s asistentem. Zkontrolujte p\u0159ipojen\xED a zkuste to znovu."})}finally{p=!1,U(r),k(),w()}}}N.addEventListener("click",()=>h(!0)),J.addEventListener("click",()=>{y(),h(!1)});async function ue(t){if(e.endpoint==="mock"||!e.endpoint)return!0;try{return(await fetch(e.endpoint,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({session_id:t,action:"delete"}),signal:AbortSignal.timeout(15e3)})).ok}catch{return!1}}q.addEventListener("click",async()=>{if(p)return;p=!0;let t=r.sessionId.slice(0,8),i=await ue(r.sessionId);p=!1,r.sessionId=O(),r.messages=[{role:"bot",error:!i,text:i?`Hotovo \u2013 text t\xE9to konverzace byl smaz\xE1n. Z\u016Fstal jen anonymn\xED \xFAdaj, \u017Ee konverzace prob\u011Bhla (po\u010Det ve statistice). Pokud chcete smazat i ten, napi\u0161te provozovateli (kontakt v odkazu \u201EMoje data a GDPR\u201C) a uve\u010Fte k\xF3d ${t}. M\u016F\u017Eete za\u010D\xEDt znovu.`:"Smaz\xE1n\xED se nepoda\u0159ilo. Zkuste to pros\xEDm znovu, nebo napi\u0161te provozovateli (odkaz \u201EMoje data a GDPR\u201C)."}],U(r),k()}),K.addEventListener("click",()=>{r.sessionId=O(),r.messages=[],U(r),k(),s.focus()}),L.addEventListener("click",()=>A()),F.addEventListener("submit",t=>{t.preventDefault(),z(s.value)}),R.addEventListener("click",()=>z(s.value)),s.addEventListener("input",w),s.addEventListener("keydown",t=>{t.key==="Enter"&&!t.shiftKey&&!t.isComposing&&(t.preventDefault(),z(s.value))}),M.addEventListener("keydown",t=>{if(t.key==="Escape"){if(!g.hidden){t.stopPropagation(),y();return}x.classList.contains("show")?A(!1):h(!1)}}),S==null||S.addEventListener("click",()=>g.hidden?H():y()),window.ShopAssistant={open:()=>h(!0),close:()=>h(!1),ask:t=>{h(!0),z(t)},video:()=>{h(!0),H()}},w(),r.open&&h(!0)}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",()=>{oe()}):oe();})();
