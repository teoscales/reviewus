/* AI nákupní asistent – widget */
(()=>{var V=`
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
`;function g(e){if(typeof e!="string")return null;try{let a=new URL(e);return a.protocol==="https:"||a.protocol==="http:"?a.toString():null}catch{return null}}function P(e,a="CZK"){if(typeof e!="number"||!Number.isFinite(e))return"";let o=Number.isInteger(e);return new Intl.NumberFormat("cs-CZ",{style:"currency",currency:a,minimumFractionDigits:o?0:2,maximumFractionDigits:2}).format(e)}function Y(e,a=new Date){if(!e)return"";let o=new Date(e);if(Number.isNaN(o.getTime()))return"";let r=o.toLocaleTimeString("cs-CZ",{hour:"2-digit",minute:"2-digit"});return o.toDateString()===a.toDateString()?`stav k ${r}`:`stav k ${o.getDate()}. ${o.getMonth()+1}. ${r}`}function j(){let e=globalThis.crypto;if(e!=null&&e.randomUUID)return e.randomUUID();let a=new Uint8Array(16);e!=null&&e.getRandomValues?e.getRandomValues(a):a.forEach((r,s)=>a[s]=Math.floor(Math.random()*256)),a[6]=a[6]&15|64,a[8]=a[8]&63|128;let o=[...a].map(r=>r.toString(16).padStart(2,"0")).join("");return`${o.slice(0,8)}-${o.slice(8,12)}-${o.slice(12,16)}-${o.slice(16,20)}-${o.slice(20)}`}function W(e){return e.trim().split(/\s+/).map(a=>a[0]??"").join("").slice(0,2).toUpperCase()||"AI"}var ee="shop-assistant:v1",re=document.currentScript,A=/^#[0-9a-f]{3,8}$/i,le=/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i,ce=["\u{1F60A}","\u{1F642}","\u{1F609}","\u{1F600}","\u{1F60D}","\u{1F914}","\u{1F605}","\u{1F44B}","\u{1F44D}","\u{1F44C}","\u{1F64F}","\u2764\uFE0F","\u2B50","\u{1F525}","\u2705","\u2753","\u{1F381}","\u{1F6D2}","\u{1F4E6}","\u{1F33F}","\u{1FAD2}","\u{1F36B}","\u{1F375}","\u{1F957}"],E={close:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>',reset:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 3-6.7"/><path d="M3 4v5h5"/></svg>',send:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12l16-8-6 16-2.5-6.5z"/></svg>',smile:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M8.5 14.5a4.5 4.5 0 0 0 7 0"/><path d="M9 9.5h.01M15 9.5h.01" stroke-width="3"/></svg>'};function te(e){return`Dobr\xFD den, jsem ${e}, AI asistent. Pom\u016F\u017Eu v\xE1m vybrat z nab\xEDdky e-shopu \u2013 napi\u0161te, co hled\xE1te.`}async function de(e){let a="shop-assistant:config";try{let o=JSON.parse(sessionStorage.getItem(a)||"null");if(o&&o.endpoint===e&&Date.now()-o.at<6e4)return o.config}catch{}try{let o=await fetch(e,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({action:"config"}),signal:AbortSignal.timeout(3e3)});if(!o.ok)return null;let r=await o.json();try{sessionStorage.setItem(a,JSON.stringify({endpoint:e,at:Date.now(),config:r}))}catch{}return r}catch{return null}}function pe(e,a){let o={...e};typeof a.name=="string"&&a.name.trim()&&(o.name=a.name.trim().slice(0,40));let r=g(a.avatar_url??void 0);return r&&(o.avatar=r),typeof a.greeting=="string"&&a.greeting.trim()?o.greeting=a.greeting.trim().slice(0,300):e.greetingFromAttr||(o.greeting=te(o.name)),Array.isArray(a.suggestions)&&a.suggestions.length&&(o.suggestions=a.suggestions.filter(s=>typeof s=="string"&&s.trim()).map(s=>s.trim().slice(0,60)).slice(0,5)),a.primary&&A.test(a.primary)&&(o.primary=a.primary),a.accent&&A.test(a.accent)&&(o.accent=a.accent),(a.position==="left"||a.position==="right")&&(o.position=a.position),o}function ue(){let e=re??document.querySelector("script[data-endpoint][src*='shop-assistant']"),a=(e==null?void 0:e.dataset)??{},o=a.name||"Ema";return{endpoint:a.endpoint||"",name:o,avatar:g(a.avatar),greeting:a.greeting||te(o),greetingFromAttr:!!a.greeting,suggestions:(a.suggestions??"Hled\xE1m d\xE1rek|Co m\xE1te bez cukru?|Co je te\u010F v akci?").split("|").map(r=>r.trim()).filter(Boolean),privacyUrl:g(a.privacyUrl),accessibilityUrl:g(a.accessibilityUrl),poweredBy:(a.poweredBy||"").slice(0,80),operator:(a.operator||"").slice(0,80),position:a.position==="left"?"left":"right",offsetBottom:Number(a.offsetBottom)||20,primary:A.test(a.primary??"")?a.primary:"",accent:A.test(a.accent??"")?a.accent:"",requireParam:a.requireParam||""}}function ge(e){let a="shop-assistant:pilot";try{let o=new URLSearchParams(location.search).get(e);return o==="1"&&sessionStorage.setItem(a,"1"),o==="0"&&sessionStorage.removeItem(a),sessionStorage.getItem(a)==="1"}catch{return!1}}function fe(){try{let e=sessionStorage.getItem(ee);if(e){let a=JSON.parse(e);if(a&&typeof a.sessionId=="string"&&Array.isArray(a.messages))return a}}catch{}return{sessionId:j(),open:!1,messages:[]}}function L(e){try{sessionStorage.setItem(ee,JSON.stringify({...e,messages:e.messages.slice(-40)}))}catch{}}function n(e,a={},...o){let r=document.createElement(e);for(let[s,d]of Object.entries(a))d===void 0||d===!1||(s==="class"?r.className=String(d):r.setAttribute(s,d===!0?"":String(d)));for(let s of o)s!=null&&r.append(s);return r}function M(e,a,o="icon-btn"){let r=n("button",{type:"button",class:o,"aria-label":a,title:a});return r.innerHTML=e,r}var Q=!1;async function X(){if(Q||document.querySelector("shop-assistant-root"))return;Q=!0;let e=ue();if(!e.endpoint){console.warn("[shop-assistant] chyb\xED data-endpoint");return}if(e.requireParam&&!ge(e.requireParam))return;if(e.endpoint!=="mock"){let t=await de(e.endpoint);if((t==null?void 0:t.enabled)===!1)return;t&&(e=pe(e,t))}let a=document.createElement("shop-assistant-root"),o=a.attachShadow({mode:"open"}),r=n("style");r.textContent=V+(e.primary?`:host{--sa-teal:${e.primary};--sa-teal-dark:${e.primary};}`:"")+(e.accent?`:host{--sa-azure:${e.accent};}`:""),o.append(r);let s=fe(),d=!1,U=t=>{let i=n("span",{class:"avatar","aria-hidden":"true"});return e.avatar?i.append(n("img",{src:e.avatar,alt:""})):i.append(W(e.name)),t&&i.append(n("span",{class:"dot"})),i},$=n("button",{type:"button",class:"launcher","aria-label":`Otev\u0159\xEDt chat s asistentem ${e.name}`},U(!0),"Chat"),B=M(E.reset,"Za\u010D\xEDt novou konverzaci"),T=M(E.close,"Zav\u0159\xEDt chat"),ae=n("div",{class:"header"},U(!0),n("div",{class:"who"},n("strong",{},e.name),n("span",{},"Online")),B,T),u=n("div",{class:"log",role:"log","aria-live":"polite","aria-label":"Konverzace"}),l=n("textarea",{rows:"1",placeholder:"Napi\u0161te, co hled\xE1te\u2026","aria-label":"Zpr\xE1va",maxlength:"500"}),w=M(E.smile,"Vlo\u017Eit smajl\xEDk","icon-btn emoji-btn");w.setAttribute("aria-expanded","false");let O=M(E.send,"Odeslat","send"),h=n("div",{class:"emoji-pop",role:"menu","aria-label":"Smajl\xEDky"});for(let t of ce){let i=n("button",{type:"button",role:"menuitem","aria-label":t},t);i.addEventListener("click",()=>{se(t),C(!1),l.focus()}),h.append(i)}let ne=n("p",{class:"note"},"Odpov\xEDd\xE1 AI asistent, m\u016F\u017Ee se spl\xE9st. Cenu a dostupnost v\u017Edy uvid\xEDte na str\xE1nce produktu. Nepi\u0161te sem osobn\xED \xFAdaje."),I=n("div",{class:"legal"}),z=[];e.poweredBy&&z.push(`Powered by: ${e.poweredBy}`),e.operator&&z.push(`Neofici\xE1ln\xED asistent, provozuje ${e.operator}${e.poweredBy?` \u2013 nejde o slu\u017Ebu ${e.poweredBy}`:""}.`),z.length&&I.append(n("p",{},z.join(" \xB7 ")));let S=n("p",{class:"links"}),N=t=>{S.childNodes.length&&S.append(n("span",{"aria-hidden":"true"}," \xB7 ")),S.append(t)};e.privacyUrl&&N(n("a",{href:e.privacyUrl,target:"_blank",rel:"noopener"},"Moje data a GDPR")),e.accessibilityUrl&&N(n("a",{href:e.accessibilityUrl,target:"_blank",rel:"noopener"},"P\u0159\xEDstupnost"));let D=n("button",{type:"button",class:"linklike"},"Smazat moje data");N(D),I.append(S);let Z=n("form",{class:"composer"},h,n("div",{class:"row"},w,l,O),ne,I),H=n("div",{class:"panel",role:"dialog","aria-label":`Chat s asistentem ${e.name}`},ae,u,Z),R=n("div",{class:`root ${e.position==="left"?"left":""}`},H,$);R.style.setProperty("--sa-offset",`${Math.min(Math.max(e.offsetBottom,0),300)}px`),o.append(R),document.body.append(a);function oe(t){let i=g(t.url);if(!i)return null;let p=g(t.image_url),c=t.in_stock===!0?"in":t.in_stock===!1?"out":"unknown",y=n("div",{class:"price"},P(t.price,t.currency)||"Cena na webu");return t.standard_price&&t.price!==null&&t.standard_price>t.price&&y.append(n("s",{},P(t.standard_price,t.currency))),n("article",{class:"card"},n("div",{class:"img"},p?n("img",{src:p,alt:"",loading:"lazy"}):n("span",{class:"noimg"},"Bez obr\xE1zku")),n("div",{class:"body"},n("div",{class:"name",title:t.name},t.name),y,t.availability?n("div",{class:`stock ${c}`},t.availability):null,n("div",{class:"asof"},Y(t.data_as_of)+(t.live_checked?", ov\u011B\u0159eno na webu":"")),n("a",{class:"go",href:i,"aria-label":`Zobrazit produkt ${t.name}`},"Zobrazit produkt")))}function K(t){var y,q,F,G;let i=t.contactEmail&&le.test(t.contactEmail)?t.contactEmail:null,p=!!((y=t.products)!=null&&y.length||(q=t.links)!=null&&q.length||i),c=n("div",{class:`msg ${t.role}${p?" wide":""}${t.error?" error":""}`},n("div",{class:"bubble"},t.text));if((F=t.products)!=null&&F.length){let k=n("div",{class:"shelf",role:"list","aria-label":"Doporu\u010Den\xE9 produkty"});for(let _ of t.products){let m=oe(_);m&&(m.setAttribute("role","listitem"),k.append(m))}c.append(k)}if((G=t.links)!=null&&G.length){let k=n("div",{class:"chips"});for(let _ of t.links){let m=g(_.url);m&&k.append(n("a",{class:"chip",href:m},_.label))}c.append(k)}return i&&c.append(n("div",{class:"chips"},n("a",{class:"chip",href:`mailto:${i}`},`Napsat na ${i}`))),c}function b(){if(u.replaceChildren(),u.append(K({role:"bot",text:e.greeting})),!s.messages.length&&e.suggestions.length){let t=n("div",{class:"chips"});for(let i of e.suggestions){let p=n("button",{type:"button",class:"chip"},i);p.addEventListener("click",()=>v(i)),t.append(p)}u.append(t)}for(let t of s.messages)u.append(K(t));d&&u.append(n("div",{class:"msg bot"},n("div",{class:"bubble typing","aria-label":"Asistent p\xED\u0161e"},n("i"),n("i"),n("i")))),u.scrollTop=u.scrollHeight}function f(t){s.open=t,R.classList.toggle("open",t),L(s),t?(b(),setTimeout(()=>l.focus(),50)):(C(!1),$.focus())}function C(t){let i=t??!h.classList.contains("show");h.classList.toggle("show",i),w.setAttribute("aria-expanded",String(i))}function se(t){let i=l.selectionStart??l.value.length,p=l.selectionEnd??l.value.length;l.value=l.value.slice(0,i)+t+l.value.slice(p),l.selectionStart=l.selectionEnd=i+t.length,x()}function x(){l.style.height="auto",l.style.height=`${Math.min(l.scrollHeight,120)}px`,O.toggleAttribute("disabled",d||!l.value.trim())}async function ie(t){let i={session_id:s.sessionId,message:t,page_url:location.href};if(e.endpoint==="mock"&&window.__SA_MOCK__)return{status:200,data:await window.__SA_MOCK__(i)};let p=await fetch(e.endpoint,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(i),signal:AbortSignal.timeout(3e4)}),c={};try{c=await p.json()}catch{}return{status:p.status,data:c}}async function v(t){let i=t.trim();if(!(!i||d)){s.messages.push({role:"user",text:i}),l.value="",d=!0,x(),b();try{let{status:p,data:c}=await ie(i);p===200&&c.reply?s.messages.push({role:"bot",text:c.reply,products:c.products??[],links:c.links??[],contactEmail:c.contact_email??null}):s.messages.push({role:"bot",error:!0,text:c.reply||"Odpov\u011B\u010F se nepoda\u0159ilo na\u010D\xEDst. Zkuste zpr\xE1vu odeslat znovu."})}catch{s.messages.push({role:"bot",error:!0,text:"Nepoda\u0159ilo se spojit s asistentem. Zkontrolujte p\u0159ipojen\xED a zkuste to znovu."})}finally{d=!1,L(s),b(),x()}}}$.addEventListener("click",()=>f(!0)),T.addEventListener("click",()=>f(!1));async function J(t){if(e.endpoint==="mock"||!e.endpoint)return!0;try{return(await fetch(e.endpoint,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({session_id:t,action:"delete"}),signal:AbortSignal.timeout(15e3)})).ok}catch{return!1}}D.addEventListener("click",async()=>{if(d)return;d=!0;let t=await J(s.sessionId);d=!1,s.sessionId=j(),s.messages=[{role:"bot",error:!t,text:t?"Hotovo \u2013 tato konverzace a souvisej\xEDc\xED z\xE1znamy byly smaz\xE1ny. M\u016F\u017Eete za\u010D\xEDt znovu.":"Smaz\xE1n\xED se nepoda\u0159ilo. Zkuste to pros\xEDm znovu, nebo napi\u0161te provozovateli (odkaz \u201EMoje data a GDPR\u201C)."}],L(s),b()}),B.addEventListener("click",()=>{s.messages.some(t=>t.role==="user")&&J(s.sessionId),s.sessionId=j(),s.messages=[],L(s),b(),l.focus()}),w.addEventListener("click",()=>C()),Z.addEventListener("submit",t=>{t.preventDefault(),v(l.value)}),O.addEventListener("click",()=>v(l.value)),l.addEventListener("input",x),l.addEventListener("keydown",t=>{t.key==="Enter"&&!t.shiftKey&&!t.isComposing&&(t.preventDefault(),v(l.value))}),H.addEventListener("keydown",t=>{t.key==="Escape"&&(h.classList.contains("show")?C(!1):f(!1))}),window.ShopAssistant={open:()=>f(!0),close:()=>f(!1),ask:t=>{f(!0),v(t)}},x(),s.open&&f(!0)}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",()=>{X()}):X();})();
