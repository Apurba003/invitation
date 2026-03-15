/* ═══════════════════════════════════════════
   ARIJIT & MUNMUN  ·  Wedding Script v5
   ═══════════════════════════════════════════ */

// ── SPLASH SCREEN ────────────────────────────
;(function initSplash(){
  const cv = document.getElementById('splashCanvas');
  if(!cv) return;
  const cx = cv.getContext('2d');
  let W, H;
  function resize(){ W = cv.width = innerWidth; H = cv.height = innerHeight; }
  resize(); addEventListener('resize', resize);

  // Golden stars/sparks on splash
  const stars = Array.from({length:150}, () => ({
    x: Math.random()*innerWidth, y: Math.random()*innerHeight,
    r: .3 + Math.random()*1.8, a: Math.random()*Math.PI*2,
    speed: .3 + Math.random()*1, alpha: Math.random()
  }));

  function frame(){
    cx.clearRect(0,0,W,H);
    stars.forEach(s => {
      s.a += .015; s.alpha = .3 + .7*Math.abs(Math.sin(s.a));
      cx.beginPath(); cx.arc(s.x, s.y, s.r, 0, Math.PI*2);
      cx.fillStyle = `rgba(201,168,76,${s.alpha * .6})`;
      cx.fill();
      s.y -= s.speed * .15;
      if(s.y < -5) { s.y = H + 5; s.x = Math.random()*W; }
    });
    if(!document.getElementById('splash').classList.contains('hidden'))
      requestAnimationFrame(frame);
  }
  frame();
})();

function enterSite(){
  const splash = document.getElementById('splash');
  splash.classList.add('hidden');
  setTimeout(() => { splash.style.display = 'none'; initMainCanvases(); }, 850);
}

// ── ROSE PETAL CANVAS ─────────────────────────
function initMainCanvases(){
  initRosePetals();
  initSparks();
}

function initRosePetals(){
  const cv = document.getElementById('roseCanvas'); if(!cv) return;
  const cx = cv.getContext('2d');
  let W, H;
  function resize(){ W = cv.width = innerWidth; H = cv.height = innerHeight; }
  resize(); addEventListener('resize', resize);

  function petal(cx, x, y, sz, rot, op, hue){
    cx.save(); cx.translate(x,y); cx.rotate(rot); cx.globalAlpha = op;
    cx.beginPath();
    cx.moveTo(0,0);
    cx.bezierCurveTo( sz*.5,-sz*.8, sz*1.2,-sz*.5, sz*.8, 0);
    cx.bezierCurveTo( sz*1.0, sz*.5, sz*.3,  sz*.9, 0,    sz*.6);
    cx.bezierCurveTo(-sz*.3,  sz*.9,-sz*1.0, sz*.5,-sz*.8, 0);
    cx.bezierCurveTo(-sz*1.2,-sz*.5,-sz*.5, -sz*.8, 0,    0);
    cx.closePath();
    const g = cx.createRadialGradient(0,0,0,0,0,sz*1.2);
    g.addColorStop(0,  `hsla(${hue},85%,62%,${op})`);
    g.addColorStop(.45,`hsla(${hue},76%,38%,${op})`);
    g.addColorStop(1,  `hsla(${hue},62%,22%,${op*.55})`);
    cx.fillStyle = g; cx.fill();
    cx.beginPath(); cx.moveTo(0,0); cx.quadraticCurveTo(sz*.1,-sz*.32,sz*.28,-sz*.08);
    cx.strokeStyle=`hsla(${hue},90%,78%,${op*.38})`; cx.lineWidth=.5; cx.stroke();
    cx.restore();
  }

  const HUES = [0,4,350,355,8,345];
  function mk(){ return { x:Math.random()*W, y:-25-Math.random()*180, sz:5+Math.random()*11, rot:Math.random()*Math.PI*2, rs:(Math.random()-.5)*.034, vx:(Math.random()-.5)*1.1, vy:.85+Math.random()*1.75, op:.55+Math.random()*.38, hue:HUES[Math.random()*HUES.length|0], sw:Math.random()*Math.PI*2, ss:.014+Math.random()*.019, sa:.55+Math.random()*1.15 }; }

  const P = Array.from({length:180}, (_,i) => { const p=mk(); if(i<180) p.y=Math.random()*H; return p; });
  function frame(){ cx.clearRect(0,0,W,H); for(const p of P){ p.sw+=p.ss; p.rot+=p.rs; p.x+=p.vx+Math.sin(p.sw)*p.sa; p.y+=p.vy; petal(cx,p.x,p.y,p.sz,p.rot,p.op,p.hue); if(p.y>H+28||p.x<-55||p.x>W+55) Object.assign(p,mk()); } requestAnimationFrame(frame); }
  frame();
}

function initSparks(){
  const cv = document.getElementById('sparkCanvas'); if(!cv) return;
  const cx = cv.getContext('2d');
  let W, H;
  function resize(){ W=cv.width=innerWidth; H=cv.height=innerHeight; }
  resize(); addEventListener('resize',resize);
  const S = Array.from({length:220},()=>({ x:Math.random()*innerWidth, y:Math.random()*innerHeight, r:.4+Math.random()*2.0, dx:(Math.random()-.5)*.4, dy:(Math.random()-.5)*.4, a:.1+Math.random()*.4, p:Math.random()*Math.PI*2 }));
  function frame(){ cx.clearRect(0,0,W,H); for(const s of S){ s.p+=.02; cx.beginPath(); cx.arc(s.x,s.y,s.r,0,Math.PI*2); cx.fillStyle=`rgba(201,168,76,${s.a*(.7+.3*Math.sin(s.p))})`; cx.fill(); s.x+=s.dx; s.y+=s.dy; if(s.x<0||s.x>W) s.dx*=-1; if(s.y<0||s.y>H) s.dy*=-1; } requestAnimationFrame(frame); }
  frame();
}

// ── COUNTDOWN ─────────────────────────────────
const TARGET = new Date('May 3, 2026 18:00:00').getTime();
setInterval(()=>{
  const diff = TARGET - Date.now();
  if(diff<0){ const el=document.getElementById('countdown'); if(el) el.innerHTML=`<h2 style="font-family:'Pinyon Script';font-size:2.8rem;color:#8B0000">🎉 বিয়ে শুরু হয়েছে!</h2>`; return; }
  tick('days',    Math.floor(diff/86400000));
  tick('hours',   Math.floor((diff%86400000)/3600000));
  tick('minutes', Math.floor((diff%3600000)/60000));
  tick('seconds', Math.floor((diff%60000)/1000), true);
},1000);
function tick(id,val,flash){
  const el=document.getElementById(id); if(!el) return;
  const s=val<10?`0${val}`:`${val}`;
  if(el.textContent!==s){ el.textContent=s; if(flash){ const r=el.closest('.cdr'); if(r){r.style.transform='scale(1.1)';setTimeout(()=>r.style.transform='',160);} } }
}

// ── SCROLL REVEAL ─────────────────────────────
const revObs = new IntersectionObserver(e=>{ e.forEach(x=>{ if(x.isIntersecting){ x.target.classList.add('vis'); revObs.unobserve(x.target); }});},{threshold:.08});
const secObs = new IntersectionObserver(e=>{ e.forEach(x=>{ if(x.isIntersecting){ document.querySelectorAll('.dot').forEach(d=>d.classList.remove('active')); const d=document.querySelector(`.dot[href="#${x.target.id}"]`); if(d) d.classList.add('active'); }});},{threshold:.35});

// ── STORY TIMELINE STAGGER ────────────────────
function staggerStory(){
  document.querySelectorAll('.st-item').forEach((c,i)=>{
    c.style.animationDelay=`${i*.2}s`;
    const o=new IntersectionObserver(([e])=>{ if(e.isIntersecting){ c.style.opacity='1'; o.unobserve(c); }},{threshold:.2});
    o.observe(c);
  });
}

// ── TIMELINE STAGGER ──────────────────────────
function staggerTL(){
  document.querySelectorAll('.tlc').forEach((c,i)=>{
    c.style.cssText='opacity:0;transform:translateY(22px)';
    const o=new IntersectionObserver(([e])=>{ if(e.isIntersecting){ setTimeout(()=>{ c.style.cssText='transition:all .7s cubic-bezier(.22,1,.36,1);opacity:1;transform:translateY(0)'; },i*145); o.unobserve(c); }},{threshold:.18});
    o.observe(c);
  });
}

// ── STAGGERED ELEMENTS POP-IN ─────────────────
const popObs = new IntersectionObserver(e=>{
  e.forEach(x=>{
    if(x.isIntersecting){
      x.target.classList.add('pop-in');
      popObs.unobserve(x.target);
    }
  });
},{threshold:.15});
function initPop(){
  const els = document.querySelectorAll('.sh, .bnsec, .secsub, .div, .meh-info, .hal-info, .bl-form, .upload-zone, .alc, .cd-box, .tl-i, .gift-card, .fc');
  els.forEach((el, index)=>{
    el.classList.add('anim-pop');
    el.style.transitionDelay = `${(index % 5) * 0.1}s`;
    popObs.observe(el);
  });
}

// ── FLOATING BG PARTICLES IN PAGES ────────────────
function initExtraParticles(){
  const sections = ['events', 'mehendi', 'haldi', 'photos'];
  sections.forEach(secId => {
    const sec = document.getElementById(secId);
    if(sec) {
      for(let i=0; i<8; i++) {
        const el = document.createElement('div');
        el.className='sec-particle';
        const isCircle = Math.random() > 0.5;
        const size = 10 + Math.random() * 20;
        el.style.cssText = `
          position:absolute;
          width:${size}px; height:${size}px;
          border-radius: ${isCircle ? '50%' : '4px'};
          background: rgba(201,168,76, ${0.1 + Math.random()*0.15});
          left: ${Math.random()*100}%;
          top: ${Math.random()*100}%;
          pointer-events:none;
          z-index:0;
          animation: floatParticle ${15 + Math.random()*15}s linear infinite alternate;
        `;
        sec.appendChild(el);
      }
    }
  });
}

// ── BLESSINGS ─────────────────────────────────
const blessings = [];
let currentMood = '😊';
function setMood(btn, emoji){
  document.querySelectorAll('.mood').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  currentMood = emoji;
}
function render(){
  const w=document.getElementById('blessWall'); if(!w) return;
  if(!blessings.length){ w.innerHTML=`<div style="text-align:center;color:var(--txs);font-family:'IM Fell English',serif;font-style:italic;padding:2rem;font-size:.9rem;opacity:.7">Be the first to send your blessings! 🙏</div>`; return; }
  w.innerHTML='';
  [...blessings].reverse().forEach(b=>{
    const c=document.createElement('div'); c.className='bc';
    c.innerHTML=`<p class="bc-name"><span class="bc-mood">${b.mood}</span>— ${esc(b.name)}</p><p class="bc-msg">${esc(b.msg)}</p>`;
    w.appendChild(c);
  });
}
function submitBlessing(){
  const ne=document.getElementById('gname'), me=document.getElementById('gmsg');
  const name=ne?.value.trim(), msg=me?.value.trim();
  if(!name||!msg){ ne?.focus(); return; }
  blessings.push({name,msg,mood:currentMood});
  render(); ne.value=''; me.value='';
  burst(['🌸','🌺','🌹','💛','✨','🐚','💝','🌼']);
}

// ── MUSIC ─────────────────────────────────────
let playing=false;
let autoPlayDone=false;
document.addEventListener('click', ()=>{ if(!autoPlayDone && !playing){ toggleMusic(); autoPlayDone=true; } });
document.addEventListener('touchstart', ()=>{ if(!autoPlayDone && !playing){ toggleMusic(); autoPlayDone=true; } }, {passive:true});

function toggleMusic(){
  const a=document.getElementById('weddingAudio'), btn=document.getElementById('musicBtn');
  if(!a) return;
  if(playing){ a.pause(); btn.classList.remove('playing'); btn.textContent='🎵'; }
  else { a.play().catch(()=>{}); btn.classList.add('playing'); btn.textContent='⏸'; }
  playing=!playing;
}

// ── BURST ─────────────────────────────────────
const burstKF=document.createElement('style');
burstKF.textContent=`@keyframes bP{0%{transform:translate(0,0) scale(1) rotate(0);opacity:1}100%{transform:translate(var(--tx),var(--ty)) scale(.15) rotate(540deg);opacity:0}}`;
document.head.appendChild(burstKF);
function burst(emojis){
  for(let i=0;i<12;i++){
    const el=document.createElement('div');
    const tx=(Math.random()-.5)*280, ty=-115-Math.random()*180;
    el.style.cssText=`position:fixed;left:${35+Math.random()*30}%;top:${35+Math.random()*25}%;font-size:${.9+Math.random()*1.4}rem;pointer-events:none;z-index:9999;animation:bP 1.7s ease forwards;animation-delay:${Math.random()*.35}s;--tx:${tx}px;--ty:${ty}px;`;
    el.textContent=emojis[Math.random()*emojis.length|0];
    document.body.appendChild(el);
    setTimeout(()=>el.remove(),2200);
  }
}


// ── PHOTO UPLOAD ──────────────────────────────
const uploaded=[];
function initUpload(){
  const inp=document.getElementById('photoFile'), zone=document.getElementById('uploadZone'), prev=document.getElementById('uploadPrev');
  if(!inp||!zone||!prev) return;
  inp.addEventListener('change', e=>handleFiles(e.target.files));
  zone.addEventListener('dragover', e=>{ e.preventDefault(); zone.style.borderColor='var(--g)'; zone.style.background='rgba(255,255,255,.92)'; });
  zone.addEventListener('dragleave', ()=>{ zone.style.borderColor=''; zone.style.background=''; });
  zone.addEventListener('drop', e=>{ e.preventDefault(); zone.style.borderColor=''; zone.style.background=''; handleFiles(e.dataTransfer.files); });
  function handleFiles(files){
    [...files].slice(0,10).forEach(f=>{
      if(!f.type.startsWith('image/')) return;
      const id=Date.now()+Math.random();
      uploaded.push({id,f});
      const r=new FileReader(); r.onload=ev=>addPrev(id,ev.target.result); r.readAsDataURL(f);
    });
  }
  function addPrev(id,src){
    const item=document.createElement('div'); item.className='pv-item'; item.dataset.id=id;
    item.innerHTML=`<img src="${src}" alt=""><button class="pv-del" onclick="rmPhoto(this,'${id}')">✕</button>`;
    prev.appendChild(item);
  }
}
function rmPhoto(btn,id){ const i=uploaded.findIndex(f=>f.id==id); if(i>-1) uploaded.splice(i,1); btn.closest('.pv-item').remove(); }

// ── ALBUM MODAL ───────────────────────────────
const albumLinks={drive:'',photos:''};
const albumData={drive:{title:'📁 Google Drive Album',desc:'Paste your shared Google Drive folder link — guests can grab all official photos.'},photos:{title:'🖼️ Google Photos Album',desc:'Paste your shared Google Photos album link — browse, download and contribute your own photos.'}};
let curAlbum='';
function openAlbum(type){ curAlbum=type; const d=albumData[type]; if(!d) return; document.getElementById('mTitle').textContent=d.title; document.getElementById('mDesc').textContent=d.desc; document.getElementById('mInput').value=albumLinks[type]||''; document.getElementById('albumModal').classList.add('open'); }
function closeAlbum(){ document.getElementById('albumModal').classList.remove('open'); }
function goAlbum(){ const v=document.getElementById('mInput').value.trim(); if(!v){ document.getElementById('mInput').style.borderColor='var(--c)'; return; } albumLinks[curAlbum]=v; window.open(v,'_blank'); closeAlbum(); }
document.addEventListener('DOMContentLoaded',()=>{
  document.getElementById('albumModal')?.addEventListener('click',e=>{ if(e.target.id==='albumModal') closeAlbum(); });
});

// ── ESCAPE ────────────────────────────────────
function esc(s){ return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }

// ── INIT ──────────────────────────────────────
document.addEventListener('DOMContentLoaded',()=>{
  render();
  staggerTL();
  staggerStory();
  if(typeof initPop === 'function') initPop();
  if(typeof initExtraParticles === 'function') initExtraParticles();
  initUpload();
  document.querySelectorAll('.fs').forEach(s=>revObs.observe(s));
  document.querySelectorAll('section[id]').forEach(s=>secObs.observe(s));
});