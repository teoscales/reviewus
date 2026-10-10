/* AI nákupní asistent – widget */
(()=>{var H=`
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
`;function h(t){if(typeof t!="string")return null;try{let a=new URL(t);return a.protocol==="https:"||a.protocol==="http:"?a.toString():null}catch{return null}}function M(t,a="CZK"){if(typeof t!="number"||!Number.isFinite(t))return"";let r=Number.isInteger(t);return new Intl.NumberFormat("cs-CZ",{style:"currency",currency:a,minimumFractionDigits:r?0:2,maximumFractionDigits:2}).format(t)}function K(t,a=new Date){if(!t)return"";let r=new Date(t);if(Number.isNaN(r.getTime()))return"";let l=r.toLocaleTimeString("cs-CZ",{hour:"2-digit",minute:"2-digit"});return r.toDateString()===a.toDateString()?`stav k ${l}`:`stav k ${r.getDate()}. ${r.getMonth()+1}. ${l}`}function $(){let t=globalThis.crypto;if(t!=null&&t.randomUUID)return t.randomUUID();let a=new Uint8Array(16);t!=null&&t.getRandomValues?t.getRandomValues(a):a.forEach((l,s)=>a[s]=Math.floor(Math.random()*256)),a[6]=a[6]&15|64,a[8]=a[8]&63|128;let r=[...a].map(l=>l.toString(16).padStart(2,"0")).join("");return`${r.slice(0,8)}-${r.slice(8,12)}-${r.slice(12,16)}-${r.slice(16,20)}-${r.slice(20)}`}function q(t){return t.trim().split(/\s+/).map(a=>a[0]??"").join("").slice(0,2).toUpperCase()||"AI"}var V="shop-assistant:v1",X=document.currentScript,F=/^#[0-9a-f]{3,8}$/i,ee=/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i,te=["\u{1F60A}","\u{1F642}","\u{1F609}","\u{1F600}","\u{1F60D}","\u{1F914}","\u{1F605}","\u{1F44B}","\u{1F44D}","\u{1F44C}","\u{1F64F}","\u2764\uFE0F","\u2B50","\u{1F525}","\u2705","\u2753","\u{1F381}","\u{1F6D2}","\u{1F4E6}","\u{1F33F}","\u{1FAD2}","\u{1F36B}","\u{1F375}","\u{1F957}"],_={close:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>',reset:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 3-6.7"/><path d="M3 4v5h5"/></svg>',send:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12l16-8-6 16-2.5-6.5z"/></svg>',smile:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M8.5 14.5a4.5 4.5 0 0 0 7 0"/><path d="M9 9.5h.01M15 9.5h.01" stroke-width="3"/></svg>'};function ae(){let t=X??document.querySelector("script[data-endpoint][src*='shop-assistant']"),a=(t==null?void 0:t.dataset)??{},r=a.name||"Ema";return{endpoint:a.endpoint||"",name:r,avatar:h(a.avatar),greeting:a.greeting||`Dobr\xFD den, jsem ${r}. Pom\u016F\u017Eu v\xE1m vybrat z na\u0161\xED nab\xEDdky \u2013 napi\u0161te, co hled\xE1te.`,suggestions:(a.suggestions??"Hled\xE1m d\xE1rek|Co m\xE1te bez cukru?|Co je te\u010F v akci?").split("|").map(l=>l.trim()).filter(Boolean),privacyUrl:h(a.privacyUrl),position:a.position==="left"?"left":"right",offsetBottom:Number(a.offsetBottom)||20,primary:F.test(a.primary??"")?a.primary:"",accent:F.test(a.accent??"")?a.accent:"",requireParam:a.requireParam||""}}function oe(t){let a="shop-assistant:pilot";try{let r=new URLSearchParams(location.search).get(t);return r==="1"&&sessionStorage.setItem(a,"1"),r==="0"&&sessionStorage.removeItem(a),sessionStorage.getItem(a)==="1"}catch{return!1}}function ne(){try{let t=sessionStorage.getItem(V);if(t){let a=JSON.parse(t);if(a&&typeof a.sessionId=="string"&&Array.isArray(a.messages))return a}}catch{}return{sessionId:$(),open:!1,messages:[]}}function A(t){try{sessionStorage.setItem(V,JSON.stringify({...t,messages:t.messages.slice(-40)}))}catch{}}function o(t,a={},...r){let l=document.createElement(t);for(let[s,p]of Object.entries(a))p===void 0||p===!1||(s==="class"?l.className=String(p):l.setAttribute(s,p===!0?"":String(p)));for(let s of r)s!=null&&l.append(s);return l}function C(t,a,r="icon-btn"){let l=o("button",{type:"button",class:r,"aria-label":a,title:a});return l.innerHTML=t,l}function J(){if(document.querySelector("shop-assistant-root"))return;let t=ae();if(!t.endpoint){console.warn("[shop-assistant] chyb\xED data-endpoint");return}if(t.requireParam&&!oe(t.requireParam))return;let a=document.createElement("shop-assistant-root"),r=a.attachShadow({mode:"open"}),l=o("style");l.textContent=H+(t.primary?`:host{--sa-teal:${t.primary};--sa-teal-dark:${t.primary};}`:"")+(t.accent?`:host{--sa-azure:${t.accent};}`:""),r.append(l);let s=ne(),p=!1,O=e=>{let n=o("span",{class:"avatar","aria-hidden":"true"});return t.avatar?n.append(o("img",{src:t.avatar,alt:""})):n.append(q(t.name)),e&&n.append(o("span",{class:"dot"})),n},E=o("button",{type:"button",class:"launcher","aria-label":`Otev\u0159\xEDt chat s asistentem ${t.name}`},O(!0),"Chat"),I=C(_.reset,"Za\u010D\xEDt novou konverzaci"),N=C(_.close,"Zav\u0159\xEDt chat"),Y=o("div",{class:"header"},O(!0),o("div",{class:"who"},o("strong",{},t.name),o("span",{},"Online")),I,N),u=o("div",{class:"log",role:"log","aria-live":"polite","aria-label":"Konverzace"}),i=o("textarea",{rows:"1",placeholder:"Napi\u0161te, co hled\xE1te\u2026","aria-label":"Zpr\xE1va",maxlength:"500"}),y=C(_.smile,"Vlo\u017Eit smajl\xEDk","icon-btn emoji-btn");y.setAttribute("aria-expanded","false");let j=C(_.send,"Odeslat","send"),m=o("div",{class:"emoji-pop",role:"menu","aria-label":"Smajl\xEDky"});for(let e of te){let n=o("button",{type:"button",role:"menuitem","aria-label":e},e);n.addEventListener("click",()=>{W(e),z(!1),i.focus()}),m.append(n)}let U=o("p",{class:"note"},"Odpov\xEDd\xE1 AI asistent, m\u016F\u017Ee se spl\xE9st. Cenu a dostupnost v\u017Edy uvid\xEDte na str\xE1nce produktu.");t.privacyUrl&&U.append(" ",o("a",{href:t.privacyUrl,target:"_blank",rel:"noopener"},"Ochrana \xFAdaj\u016F"));let D=o("form",{class:"composer"},m,o("div",{class:"row"},y,i,j),U),P=o("div",{class:"panel",role:"dialog","aria-label":`Chat s asistentem ${t.name}`},Y,u,D),L=o("div",{class:`root ${t.position==="left"?"left":""}`},P,E);L.style.setProperty("--sa-offset",`${Math.min(Math.max(t.offsetBottom,0),300)}px`),r.append(L),document.body.append(a);function G(e){let n=h(e.url);if(!n)return null;let c=h(e.image_url),d=e.in_stock===!0?"in":e.in_stock===!1?"out":"unknown",v=o("div",{class:"price"},M(e.price,e.currency)||"Cena na webu");return e.standard_price&&e.price!==null&&e.standard_price>e.price&&v.append(o("s",{},M(e.standard_price,e.currency))),o("article",{class:"card"},o("div",{class:"img"},c?o("img",{src:c,alt:"",loading:"lazy"}):o("span",{class:"noimg"},"Bez obr\xE1zku")),o("div",{class:"body"},o("div",{class:"name",title:e.name},e.name),v,e.availability?o("div",{class:`stock ${d}`},e.availability):null,o("div",{class:"asof"},K(e.data_as_of)+(e.live_checked?", ov\u011B\u0159eno na webu":"")),o("a",{class:"go",href:n,"aria-label":`Zobrazit produkt ${e.name}`},"Zobrazit produkt")))}function R(e){var v,T,B,Z;let n=e.contactEmail&&ee.test(e.contactEmail)?e.contactEmail:null,c=!!((v=e.products)!=null&&v.length||(T=e.links)!=null&&T.length||n),d=o("div",{class:`msg ${e.role}${c?" wide":""}${e.error?" error":""}`},o("div",{class:"bubble"},e.text));if((B=e.products)!=null&&B.length){let k=o("div",{class:"shelf",role:"list","aria-label":"Doporu\u010Den\xE9 produkty"});for(let S of e.products){let f=G(S);f&&(f.setAttribute("role","listitem"),k.append(f))}d.append(k)}if((Z=e.links)!=null&&Z.length){let k=o("div",{class:"chips"});for(let S of e.links){let f=h(S.url);f&&k.append(o("a",{class:"chip",href:f},S.label))}d.append(k)}return n&&d.append(o("div",{class:"chips"},o("a",{class:"chip",href:`mailto:${n}`},`Napsat na ${n}`))),d}function w(){if(u.replaceChildren(),u.append(R({role:"bot",text:t.greeting})),!s.messages.length&&t.suggestions.length){let e=o("div",{class:"chips"});for(let n of t.suggestions){let c=o("button",{type:"button",class:"chip"},n);c.addEventListener("click",()=>x(n)),e.append(c)}u.append(e)}for(let e of s.messages)u.append(R(e));p&&u.append(o("div",{class:"msg bot"},o("div",{class:"bubble typing","aria-label":"Asistent p\xED\u0161e"},o("i"),o("i"),o("i")))),u.scrollTop=u.scrollHeight}function g(e){s.open=e,L.classList.toggle("open",e),A(s),e?(w(),setTimeout(()=>i.focus(),50)):(z(!1),E.focus())}function z(e){let n=e??!m.classList.contains("show");m.classList.toggle("show",n),y.setAttribute("aria-expanded",String(n))}function W(e){let n=i.selectionStart??i.value.length,c=i.selectionEnd??i.value.length;i.value=i.value.slice(0,n)+e+i.value.slice(c),i.selectionStart=i.selectionEnd=n+e.length,b()}function b(){i.style.height="auto",i.style.height=`${Math.min(i.scrollHeight,120)}px`,j.toggleAttribute("disabled",p||!i.value.trim())}async function Q(e){let n={session_id:s.sessionId,message:e,page_url:location.href};if(t.endpoint==="mock"&&window.__SA_MOCK__)return{status:200,data:await window.__SA_MOCK__(n)};let c=await fetch(t.endpoint,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(n),signal:AbortSignal.timeout(3e4)}),d={};try{d=await c.json()}catch{}return{status:c.status,data:d}}async function x(e){let n=e.trim();if(!(!n||p)){s.messages.push({role:"user",text:n}),i.value="",p=!0,b(),w();try{let{status:c,data:d}=await Q(n);c===200&&d.reply?s.messages.push({role:"bot",text:d.reply,products:d.products??[],links:d.links??[],contactEmail:d.contact_email??null}):s.messages.push({role:"bot",error:!0,text:d.reply||"Odpov\u011B\u010F se nepoda\u0159ilo na\u010D\xEDst. Zkuste zpr\xE1vu odeslat znovu."})}catch{s.messages.push({role:"bot",error:!0,text:"Nepoda\u0159ilo se spojit s asistentem. Zkontrolujte p\u0159ipojen\xED a zkuste to znovu."})}finally{p=!1,A(s),w(),b()}}}E.addEventListener("click",()=>g(!0)),N.addEventListener("click",()=>g(!1)),I.addEventListener("click",()=>{s.sessionId=$(),s.messages=[],A(s),w(),i.focus()}),y.addEventListener("click",()=>z()),D.addEventListener("submit",e=>{e.preventDefault(),x(i.value)}),j.addEventListener("click",()=>x(i.value)),i.addEventListener("input",b),i.addEventListener("keydown",e=>{e.key==="Enter"&&!e.shiftKey&&!e.isComposing&&(e.preventDefault(),x(i.value))}),P.addEventListener("keydown",e=>{e.key==="Escape"&&(m.classList.contains("show")?z(!1):g(!1))}),window.ShopAssistant={open:()=>g(!0),close:()=>g(!1),ask:e=>{g(!0),x(e)}},b(),s.open&&g(!0)}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",J):J();})();
