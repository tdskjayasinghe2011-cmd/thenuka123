import { destinations, image } from './data.js';

const canvas = document.querySelector('#terrainCanvas');
const stage = document.querySelector('#terrainStage');
const list = document.querySelector('#destinationList');
const focusCard = document.querySelector('#mapFocusCard');
const railCount = document.querySelector('#railCount');

const state = { rotation: -0.18, zoom: 1, pointer: { x:0, y:0 }, dragging:false, lastX:0, lastY:0, active: destinations[6] };
let ctx;

function resize() {
  if (!canvas) return;
  const rect = canvas.getBoundingClientRect();
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  ctx = canvas.getContext('2d');
  ctx.setTransform(dpr,0,0,dpr,0,0);
  draw();
}

function projected(destination, rect) {
  const minLat = 5.8, maxLat = 10.1, minLon = 79.5, maxLon = 82.1;
  const x = ((destination.lon-minLon)/(maxLon-minLon)-.5) * rect.width * .6;
  const y = -((destination.lat-minLat)/(maxLat-minLat)-.5) * rect.height * .62;
  const cos = Math.cos(state.rotation), sin = Math.sin(state.rotation);
  const rx = x*cos - y*sin;
  const ry = x*sin + y*cos;
  return { x: rect.width/2 + rx * state.zoom, y: rect.height/2 + ry * state.zoom };
}

function draw() {
  if (!ctx || !canvas) return;
  const rect = canvas.getBoundingClientRect();
  const w = rect.width, h = rect.height;
  ctx.clearRect(0,0,w,h);
  ctx.save();
  const glow = ctx.createRadialGradient(w*.5,h*.47,0,w*.5,h*.47,Math.min(w,h)*.46);
  glow.addColorStop(0,'rgba(99,160,116,.22)'); glow.addColorStop(1,'rgba(99,160,116,0)');
  ctx.fillStyle=glow;ctx.fillRect(0,0,w,h);

  // layered terrain contour made from several organic island silhouettes
  const cx=w*.5, cy=h*.5, scale=Math.min(w,h)*.33*state.zoom;
  for (let layer=0; layer<7; layer++) {
    ctx.beginPath();
    const points=86;
    for (let i=0;i<=points;i++) {
      const t=i/points*Math.PI*2;
      const warp = 1 + .1*Math.sin(t*3+layer) + .055*Math.sin(t*7-layer*.9);
      const rx = Math.sin(t)*.55 + .22*Math.sin(t*2) - .05*Math.cos(t*5);
      const ry = Math.cos(t)*.93 + .12*Math.sin(t*3) + .045*Math.cos(t*8);
      const x=cx + (rx*scale + layer*3) * Math.cos(state.rotation) - (ry*scale*warp)*Math.sin(state.rotation);
      const y=cy + (rx*scale + layer*3) * Math.sin(state.rotation) + (ry*scale*warp)*Math.cos(state.rotation);
      if(i===0) ctx.moveTo(x,y); else ctx.lineTo(x,y);
    }
    ctx.closePath();
    ctx.fillStyle=`rgba(${27+layer*3},${83+layer*7},${64+layer*4},${.08-layer*.006})`;
    ctx.strokeStyle=`rgba(120,186,137,${.33-layer*.035})`;
    ctx.lineWidth=layer===0?1.5:1;
    ctx.fill();ctx.stroke();
  }
  // latitude/longitude filaments
  ctx.globalAlpha=.26;ctx.strokeStyle='#d5af65';ctx.lineWidth=.5;
  for(let i=-3;i<=3;i++){
    ctx.beginPath();ctx.ellipse(cx+i*18,cy,scale*.45,scale*(.9-Math.abs(i)*.07),state.rotation,0,Math.PI*2);ctx.stroke();
  }
  ctx.globalAlpha=1;
  destinations.forEach((destination,index)=>{
    const p=projected(destination,rect);
    const isActive=destination.name===state.active.name;
    const r=isActive?6:3.2;
    ctx.beginPath();ctx.arc(p.x,p.y,r,0,Math.PI*2);ctx.fillStyle=isActive?'#ead19a':'#76b996';ctx.shadowColor=isActive?'#d5af65':'transparent';ctx.shadowBlur=isActive?18:0;ctx.fill();ctx.shadowBlur=0;
    if(isActive){ctx.beginPath();ctx.arc(p.x,p.y,15+Math.sin(Date.now()/500)*3,0,Math.PI*2);ctx.strokeStyle='rgba(213,175,101,.35)';ctx.lineWidth=1;ctx.stroke();}
    if(isActive || index%4===0){ctx.fillStyle=isActive?'#f6f3eb':'rgba(246,243,235,.5)';ctx.font=`${isActive?11:9}px Manrope, sans-serif`;ctx.fillText(destination.name,p.x+10,p.y-7);}
  });
  ctx.restore();
  requestAnimationFrame(()=>{ if (state.active) drawSubtle(); });
}

let lastFrame=0;
function drawSubtle(){
  if (!ctx || !canvas || document.hidden) return;
  const now=performance.now();
  if(now-lastFrame<45) return;
  lastFrame=now;
  const rect=canvas.getBoundingClientRect(), d=projected(state.active,rect);
  ctx.save();ctx.globalAlpha=.1+Math.sin(now/700)*.04;ctx.strokeStyle='#d5af65';ctx.beginPath();ctx.arc(d.x,d.y,13,0,Math.PI*2);ctx.stroke();ctx.restore();
  requestAnimationFrame(drawSubtle);
}

function setActive(destination) {
  state.active=destination;
  if(focusCard){
    focusCard.querySelector('#mapFocusTitle').textContent=destination.name;
    focusCard.querySelector('#mapFocusDescription').textContent=destination.title || destination.short;
    focusCard.querySelector('#mapFocusCategory').textContent=destination.category;
    focusCard.querySelector('#mapFocusTags').textContent=destination.tags.join(' · ');
    const preview=focusCard.querySelector('#mapFocusPreview');
    preview.src=destination.name==='Ella'?'/manus-storage/async-images/SYrpUXy4hreEdxm0WV174o/image-3.webp':image({Sigiriya:'photo-1537996194471-e657df975ab4',Galle:'photo-1552465011-b4e21bf6e79a',Mirissa:'photo-1507525428034-b723cf961d3e',Yala:'photo-1516426122078-c23e76319801',Nuwara:'photo-1594631252845-29fc4cc8de9'}[destination.name]||'photo-1500530855697-b586d89ba3ee',320,78);
    preview.alt=`${destination.name} destination preview`;
  }
  const index=destinations.findIndex((item)=>item.name===destination.name)+1;
  if(railCount) railCount.textContent=`${String(index).padStart(2,'0')} / ${String(destinations.length).padStart(2,'0')}`;
  document.querySelectorAll('.dest-list-item').forEach((el)=>el.classList.toggle('is-active',el.dataset.name===destination.name));
  draw();
}

function renderList(){
  if(!list) return;
  list.innerHTML=destinations.map((destination,index)=>`<button class="dest-list-item ${destination.name===state.active.name?'is-active':''}" data-name="${destination.name}"><span>${destination.name}</span><small>${destination.region}</small></button>`).join('');
  list.querySelectorAll('.dest-list-item').forEach((button)=>{
    button.addEventListener('mouseenter',()=>setActive(destinations.find((d)=>d.name===button.dataset.name)));
    button.addEventListener('focus',()=>setActive(destinations.find((d)=>d.name===button.dataset.name)));
    button.addEventListener('click',()=>{ setActive(destinations.find((d)=>d.name===button.dataset.name)); stage?.scrollIntoView({behavior:'smooth',block:'center'}); });
  });
}

function nearestDestination(x,y){
  const rect=canvas.getBoundingClientRect();
  let nearest=null, distance=Infinity;
  destinations.forEach((destination)=>{const p=projected(destination,rect);const d=Math.hypot(x-p.x,y-p.y);if(d<distance){distance=d;nearest=destination;}});
  return {nearest,distance};
}

if(canvas){
  window.addEventListener('resize',resize);
  resize();renderList();
  canvas.addEventListener('pointerdown',(event)=>{state.dragging=true;state.lastX=event.clientX;state.lastY=event.clientY;canvas.setPointerCapture(event.pointerId);});
  canvas.addEventListener('pointermove',(event)=>{
    const rect=canvas.getBoundingClientRect(); state.pointer={x:event.clientX-rect.left,y:event.clientY-rect.top};
    if(state.dragging){state.rotation += (event.clientX-state.lastX)*.004; state.lastX=event.clientX; state.lastY=event.clientY; draw();}
    else {const {nearest,distance}=nearestDestination(state.pointer.x,state.pointer.y);if(nearest&&distance<20&&nearest.name!==state.active.name){setActive(nearest);}}
  });
  canvas.addEventListener('click',(event)=>{ if(state.dragging) return; const rect=canvas.getBoundingClientRect(); const {nearest,distance}=nearestDestination(event.clientX-rect.left,event.clientY-rect.top); if(nearest&&distance<32){ setActive(nearest); } });
  canvas.addEventListener('pointerup',()=>{state.dragging=false;});
  canvas.addEventListener('pointerleave',()=>{state.dragging=false;});
  canvas.addEventListener('wheel',(event)=>{event.preventDefault();state.zoom=Math.max(.75,Math.min(1.45,state.zoom-event.deltaY*.0007));draw();},{passive:false});
  setActive(state.active);
}

export function focusDestination(name){ const match=destinations.find((destination)=>destination.name===name); if(match)setActive(match); }
