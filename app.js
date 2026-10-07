import { destinations, categories, waterfalls, hotels, experiences, gallery, food, weather, stats, plannerPlaces, destinationByName, image } from './data.js';
import { travelAI } from './ai.js';

const $ = (selector, root=document) => root.querySelector(selector);
const $$ = (selector, root=document) => [...root.querySelectorAll(selector)];
const state = { featureIndex:0, hotelFilter:'All', galleryFilter:'All', planner:['Colombo','Galle','Ella'], selectedAI:{experience:'Relaxation',days:7,style:'Comfort'} };
const featureNames = ['Sigiriya','Ella','Galle','Mirissa','Yala','Nuwara Eliya','Trincomalee','Arugam Bay','Sinharaja'];
const featureData = featureNames.map((name)=>destinationByName[name]);

function renderCategories(){
  const rail=$('#categoryRail'); if(!rail)return;
  rail.innerHTML=categories.map(([name,copy,src],index)=>`<article class="category-card" data-hover="view"><img src="${src}" alt="${name} in Sri Lanka" loading="lazy"><div class="category-card-content"><small>${String(index+1).padStart(2,'0')}</small><h3>${name}</h3><p>${copy}</p></div></article>`).join('');
}

function renderDestinations(){
  const thumbs=$('#destinationThumbs'); if(!thumbs)return;
  thumbs.innerHTML=featureData.map((destination,index)=>`<button class="destination-thumb ${index===state.featureIndex?'is-active':''}" data-index="${index}" data-hover="explore"><img src="${destination.name==='Ella'?'/manus-storage/async-images/SYrpUXy4hreEdxm0WV174o/image-3.webp':imageForDestination(destination.name,420)}" alt="${destination.name}" loading="lazy"><span>${destination.name}</span></button>`).join('');
  $$('.destination-thumb',thumbs).forEach((button)=>button.addEventListener('click',()=>updateFeature(Number(button.dataset.index))));
  updateFeature(state.featureIndex);
}

function imageForDestination(name,width=1600){
  const sources={Sigiriya:'photo-1537996194471-e657df975ab4',Ella:'photo-1464822759023-fed622ff2c3b',Galle:'photo-1552465011-b4e21bf6e79a',Mirissa:'photo-1507525428034-b723cf961d3e',Yala:'photo-1516426122078-c23e76319801','Nuwara Eliya':'photo-1594631252845-29fc4cc8cde9',Trincomalee:'photo-1500534623283-312aade485b7','Arugam Bay':'photo-1502680390469-be75c86b636f',Sinharaja:'photo-1516026672322-bc52d61a55d5'};
  return image(sources[name]||'photo-1500530855697-b586d89ba3ee',width,85);
}

function updateFeature(index){
  state.featureIndex=(index+featureData.length)%featureData.length;
  const destination=featureData[state.featureIndex];
  const imageEl=$('#featureImage img');
  if(imageEl){ $('#featureImage').classList.add('is-changing'); setTimeout(()=>{imageEl.src=destination.name==='Ella'?'/manus-storage/async-images/SYrpUXy4hreEdxm0WV174o/image-3.webp':imageForDestination(destination.name);imageEl.alt=destination.name;$('#featureImage').classList.remove('is-changing');},160); }
  $('#featureEyebrow').textContent=`${destination.category} / ${destination.region}`;
  const title=(destination.title||destination.short).split(' ');
  const breakAt=Math.max(1,Math.ceil(title.length/2));
  $('#featureTitle').innerHTML=`${title.slice(0,breakAt).join(' ')}<br><em>${title.slice(breakAt).join(' ')}</em>`;
  $('#featureDescription').textContent=destination.description;
  $('#featureLight').textContent=['05:48 — 07:16','06:05 — 07:32','17:34 — 18:12','05:58 — 07:10'][state.featureIndex%4];
  $('#featureFeeling').textContent=['Awe','Wonder','Stillness','Salt','Wild','Quiet','Blue','Freedom','Emerald'][state.featureIndex];
  $('#featureExplore').innerHTML=`Explore ${destination.name} <span>↗</span>`;
  $('#featureCounter').textContent=`${String(state.featureIndex+1).padStart(2,'0')} / ${String(featureData.length).padStart(2,'0')}`;
  $$('.destination-thumb').forEach((el)=>el.classList.toggle('is-active',Number(el.dataset.index)===state.featureIndex));
}

function renderWaterfalls(){
  const list=$('#waterfallList');if(!list)return;
  list.innerHTML=waterfalls.map(([name,meta],i)=>`<div class="waterfall-item" data-hover="explore"><div><strong>${name}</strong><small>${meta}</small></div><span>0${i+1}</span></div>`).join('');
}

function renderHotels(){
  const filters=['All','5★ Luxury','Luxury Resorts','Private Villas','Beach Resorts','Jungle Lodges','Boutique Hotels','Tea Estate Bungalows','Heritage Hotels','Wellness Retreats'];
  const row=$('#hotelFilters'); row.innerHTML=filters.map((filter)=>`<button class="filter-chip ${filter===state.hotelFilter?'is-active':''}" data-filter="${filter}">${filter}</button>`).join('');
  $$('.filter-chip',row).forEach((button)=>button.addEventListener('click',()=>{state.hotelFilter=button.dataset.filter;renderHotels();}));
  const visible=state.hotelFilter==='All'?hotels:hotels.filter((hotel)=>hotel.category===state.hotelFilter);
  $('#hotelGrid').innerHTML=(visible.length?visible:hotels.slice(0,3)).map((hotel)=>`<article class="hotel-card" data-hover="view"><img src="${hotel.image}" alt="${hotel.name}, ${hotel.location}" loading="lazy"><div class="hotel-card-content"><p class="eyebrow">${hotel.category}</p><h3>${hotel.name}</h3><p>${hotel.tag}</p><div class="hotel-meta"><span>${hotel.location}</span><strong>★ ${hotel.rating}</strong></div><div class="hotel-actions"><button class="hotel-explore" data-hotel="${hotel.name}">Explore ↗</button><button class="hotel-availability" data-hotel="${hotel.name}">Check availability ↗</button></div></div></article>`).join('');
  $$('.hotel-availability').forEach((button)=>button.addEventListener('click',()=>showToast(`Availability request queued for ${button.dataset.hotel}. Live booking integration is not connected yet.`)));
}

function renderExperiences(){
  const rail=$('#experienceRail');if(!rail)return;
  rail.innerHTML=experiences.map(([name,copy,src],i)=>`<article class="experience-card" data-hover="view"><img src="${image(src,700,80)}" alt="${name} in Sri Lanka" loading="lazy"><div class="experience-content"><small>${String(i+1).padStart(2,'0')} / Experience</small><h3>${name}</h3><p>${copy}</p></div></article>`).join('');
}

function renderTaste(){
  const grid=$('#tasteGrid');if(!grid)return;
  grid.innerHTML=food.map(([name,copy,src],i)=>`<article class="taste-card" data-hover="view"><img src="${image(src,820,80)}" alt="${name}, Sri Lankan food" loading="lazy"><div class="taste-card-content"><small>${String(i+1).padStart(2,'0')} / taste</small><h3>${name}</h3></div></article>`).join('');
}

function renderWeather(){
  const grid=$('#weatherGrid');if(!grid)return;
  grid.innerHTML=weather.map((item)=>`<article class="weather-card"><div class="weather-top"><span>${item.place}</span><span>demo</span></div><h3>${item.temp}</h3><p>${item.condition}</p><div class="weather-details"><span>Best season<strong>${item.season}</strong></span><span>Sunrise<strong>${item.sunrise}</strong></span><span>Sunset<strong>${item.sunset}</strong></span><span>Sea<strong>${item.sea}</strong></span><span>Rain probability<strong>${item.rain}</strong></span></div></article>`).join('');
}

function renderGallery(){
  const filters=['All',...new Set(gallery.map((item)=>item[0]))];
  const filterRow=$('#galleryFilters');filterRow.innerHTML=filters.map((filter)=>`<button class="filter-chip ${filter===state.galleryFilter?'is-active':''}" data-gallery-filter="${filter}">${filter}</button>`).join('');
  $$('.filter-chip',filterRow).forEach((button)=>button.addEventListener('click',()=>{state.galleryFilter=button.dataset.galleryFilter;renderGallery();}));
  const items=state.galleryFilter==='All'?gallery:gallery.filter((item)=>item[0]===state.galleryFilter);
  $('#galleryGrid').innerHTML=items.map(([category,caption,src],index)=>`<button class="gallery-item" data-gallery-index="${gallery.indexOf(gallery.find((item)=>item[1]===caption))}" data-hover="view"><img src="${image(src,1000,84)}" alt="${caption}" loading="lazy"><span>${category} / ${caption}</span></button>`).join('');
  $$('.gallery-item').forEach((item)=>item.addEventListener('click',()=>window.openLightbox(Number(item.dataset.galleryIndex))));
}

function renderStats(){
  const grid=$('#statsGrid');if(!grid)return;
  grid.innerHTML=stats.map(([value,label,note])=>`<div class="stat-card"><strong data-count="${value.replace(/\D/g,'')}">${value}</strong><span>${label}</span><small>${note}</small></div>`).join('');
}

function setupNav(){
  const nav=$('#siteNav'), menuButton=$('#menuButton'), mobileMenu=$('#mobileMenu');
  const sync=()=>nav.classList.toggle('is-compact',window.scrollY>80);
  window.addEventListener('scroll',sync,{passive:true});sync();
  menuButton.addEventListener('click',()=>{const open=menuButton.classList.toggle('is-open');menuButton.setAttribute('aria-expanded',String(open));mobileMenu.classList.toggle('is-open',open);mobileMenu.setAttribute('aria-hidden',String(!open));document.body.classList.toggle('menu-open',open);});
  $$('.mobile-menu a').forEach((link)=>link.addEventListener('click',()=>{menuButton.classList.remove('is-open');mobileMenu.classList.remove('is-open');menuButton.setAttribute('aria-expanded','false');}));
  document.querySelectorAll('a[href^="#"]').forEach((link)=>link.addEventListener('click',(event)=>{const target=document.querySelector(link.getAttribute('href'));if(target){event.preventDefault();target.scrollIntoView({behavior:'smooth'});}}));
}

function setupScrollProgress(){
  const progress=$('#scrollProgress');
  window.addEventListener('scroll',()=>{const max=document.documentElement.scrollHeight-window.innerHeight;progress.style.transform=`scaleX(${max?window.scrollY/max:0})`;},{passive:true});
}

function setupReveal(){
  const items=$$('[data-reveal]');
  if(!('IntersectionObserver' in window)){items.forEach((item)=>item.classList.add('is-visible'));return;}
  const observer=new IntersectionObserver((entries)=>entries.forEach((entry)=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target);}}),{threshold:.12,rootMargin:'0px 0px -7%'});
  items.forEach((item)=>observer.observe(item));
}

function setupHeroCanvas(){
  const canvas=$('#heroCanvas');if(!canvas)return;const ctx=canvas.getContext('2d');const stars=Array.from({length:90},()=>({x:Math.random(),y:Math.random(),r:Math.random()*1.4+.2,a:Math.random()*.7+.15,s:Math.random()*.3+.1}));
  const resize=()=>{const dpr=Math.min(window.devicePixelRatio||1,2);canvas.width=innerWidth*dpr;canvas.height=innerHeight*dpr;canvas.style.width=innerWidth+'px';canvas.style.height=innerHeight+'px';ctx.setTransform(dpr,0,0,dpr,0,0);};resize();addEventListener('resize',resize);
  let tick=0;const draw=()=>{tick+=.004;ctx.clearRect(0,0,innerWidth,innerHeight);stars.forEach((star)=>{const y=(star.y+tick*star.s*.12)%1;ctx.beginPath();ctx.arc(star.x*innerWidth,y*innerHeight,star.r,0,Math.PI*2);ctx.fillStyle=`rgba(246,243,235,${star.a*(.65+.35*Math.sin(tick*4+star.x*7))})`;ctx.fill();});requestAnimationFrame(draw);};draw();
}

function setupCursor(){
  if(matchMedia('(pointer:coarse)').matches)return;
  const cursor=$('#cursor'),label=$('#cursorLabel');let x=innerWidth/2,y=innerHeight/2,tx=x,ty=y;
  addEventListener('pointermove',(event)=>{tx=event.clientX;ty=event.clientY;});
  const loop=()=>{x+=(tx-x)*.2;y+=(ty-y)*.2;cursor.style.left=x+'px';cursor.style.top=y+'px';label.style.left=x+'px';label.style.top=y+'px';requestAnimationFrame(loop);};loop();
  document.addEventListener('mouseover',(event)=>{const target=event.target.closest('[data-hover],a,button');if(target){cursor.classList.add('is-hover');const kind=target.dataset.hover||(target.tagName==='IMG'?'view':'');label.textContent=kind==='explore'?'Explore':kind==='view'?'View':'';label.classList.toggle('is-visible',Boolean(label.textContent));}});
  document.addEventListener('mouseout',(event)=>{if(event.target.closest('[data-hover],a,button')){cursor.classList.remove('is-hover');label.classList.remove('is-visible');}});
}

function setupMagnetic(){
  if(matchMedia('(pointer:coarse)').matches)return;
  $$('.magnetic').forEach((element)=>{element.addEventListener('pointermove',(event)=>{const r=element.getBoundingClientRect();element.style.transform=`translate(${(event.clientX-r.left-r.width/2)*.12}px,${(event.clientY-r.top-r.height/2)*.12}px)`;});element.addEventListener('pointerleave',()=>{element.style.transform='';});});
}

function setupGsap(){
  if(!window.gsap)return;
  if(window.ScrollTrigger)window.gsap.registerPlugin(window.ScrollTrigger);
  if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  const heroMedia=$('.hero-media img');
  if(heroMedia&&window.ScrollTrigger)gsap.to(heroMedia,{yPercent:12,scale:1.12,ease:'none',scrollTrigger:{trigger:'.hero',start:'top top',end:'bottom top',scrub:true}});
  $$('.category-card,.hotel-card,.experience-card,.gallery-item').forEach((card)=>{card.addEventListener('pointermove',(event)=>{const r=card.getBoundingClientRect();const rx=(event.clientY-r.top-r.height/2)/r.height*4;const ry=(event.clientX-r.left-r.width/2)/r.width*-4;card.style.transform=`perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-5px)`;});card.addEventListener('pointerleave',()=>card.style.transform='');});
}

function setupDestinations(){
  $('#prevDestination').addEventListener('click',()=>updateFeature(state.featureIndex-1));$('#nextDestination').addEventListener('click',()=>updateFeature(state.featureIndex+1));
}

function setupLightbox(){
  const box=$('#lightbox'),close=$('#closeLightbox');let lastFocus=null;
  window.openLightbox=(index)=>{lastFocus=document.activeElement;const [category,caption,src]=gallery[index]||gallery[0];$('#lightboxImage').src=image(src,1800,88);$('#lightboxImage').alt=caption;$('#lightboxCategory').textContent=category;$('#lightboxTitle').textContent=caption.split(' ').slice(0,4).join(' ');$('#lightboxCaption').textContent=caption;box.classList.add('is-open');box.setAttribute('aria-hidden','false');document.body.style.overflow='hidden';close.focus();};
  const closeBox=()=>{box.classList.remove('is-open');box.setAttribute('aria-hidden','true');document.body.style.overflow='';lastFocus?.focus();};close.addEventListener('click',closeBox);box.addEventListener('click',(event)=>{if(event.target===box)closeBox();});document.addEventListener('keydown',(event)=>{if(event.key==='Escape')closeBox();});
}

function renderSearchResults(results,target){
  if(!target)return;target.innerHTML=results.map(([name,copy])=>`<div class="search-result"><div><strong>${name}</strong><span>${copy}</span></div><a href="#map" data-focus-place="${name}">Explore ↗</a></div>`).join('');
  $$('[data-focus-place]',target).forEach((link)=>link.addEventListener('click',()=>showToast(`Opening ${link.dataset.focusPlace} on the island map.`)));
}

async function runSearch(query,target=$('#searchResults')){target.innerHTML='<p class="data-note">Reading the island…</p>';renderSearchResults(await travelAI.search(query),target);}
function setupSearch(){
  const input=$('#destinationSearch'),run=$('#runSearch');run.addEventListener('click',()=>runSearch(input.value));input.addEventListener('keydown',(event)=>{if(event.key==='Enter')runSearch(input.value);});$$('#searchSuggestions button').forEach((button)=>button.addEventListener('click',()=>{input.value=button.textContent;runSearch(button.textContent);}));
  const overlay=$('#searchOverlay'),openSearch=$('[data-open-search]'),closeSearch=$('#closeSearch');let lastFocus=null;openSearch.addEventListener('click',()=>{lastFocus=document.activeElement;overlay.classList.add('is-open');overlay.setAttribute('aria-hidden','false');$('#overlaySearchInput').focus();});closeSearch.addEventListener('click',()=>{overlay.classList.remove('is-open');overlay.setAttribute('aria-hidden','true');lastFocus?.focus();});$('#overlaySearchButton').addEventListener('click',()=>runSearch($('#overlaySearchInput').value,$('#overlayResults')));$('#overlaySearchInput').addEventListener('keydown',(event)=>{if(event.key==='Enter')runSearch(event.target.value,$('#overlayResults'));});
}

function renderAI(step){
  const indicator=$('#aiStepIndicator'),content=$('#aiStepContent');indicator.innerHTML=[0,1,2].map((item)=>`<span class="${item<=step?'is-active':''}"></span>`).join('');
  if(step===0){content.innerHTML=`<p class="eyebrow">01 / choose a feeling</p><h3>How do you want to experience Sri Lanka?</h3><p>Start with the mood, not the map.</p><div class="option-grid">${['Relaxation','Adventure','Honeymoon','Wildlife','Nature','Culture','Luxury','Surfing','Photography','Wellness','Family'].map((item)=>`<button class="option-button" data-ai-key="experience" data-ai-value="${item}">${item}</button>`).join('')}</div>`;}
  if(step===1){content.innerHTML=`<p class="eyebrow">02 / find your pace</p><h3>How many days do you have?</h3><p>We’ll keep a little room for wonder.</p><div class="option-grid">${['3','5','7','10','14','Custom'].map((item)=>`<button class="option-button" data-ai-key="days" data-ai-value="${item}">${item} ${item==='Custom'?'days':''}</button>`).join('')}</div>`;}
  if(step===2){content.innerHTML=`<p class="eyebrow">03 / set the tone</p><h3>Travel style?</h3><p>The island can meet you where you are.</p><div class="option-grid">${['Budget','Comfort','Luxury','Ultra Luxury'].map((item)=>`<button class="option-button" data-ai-key="style" data-ai-value="${item}">${item}</button>`).join('')}</div>`;}
  $$('.option-button',content).forEach((button)=>button.addEventListener('click',async()=>{const key=button.dataset.aiKey;let value=button.dataset.aiValue;if(key==='days'&&value==='Custom'){content.innerHTML='<p class="eyebrow">02 / choose your pace</p><h3>How many days can you take?</h3><p>Give us a number between 3 and 21.</p><div class="custom-days"><input id="customDaysInput" type="number" min="3" max="21" value="7" aria-label="Custom number of days"><button class="button button-gold" id="customDaysContinue">Continue <span>↗</span></button></div>';$('#customDaysContinue').addEventListener('click',()=>{const custom=Math.max(3,Math.min(21,Number($('#customDaysInput').value)||7));state.selectedAI.days=custom;renderAI(2);});$('#customDaysInput').focus();return;}state.selectedAI[key]=key==='days'?Number(value):value;button.classList.add('is-selected');if(step<2){setTimeout(()=>renderAI(step+1),220);}else{content.innerHTML='<p class="eyebrow">Mapping your feeling</p><h3>Give us a moment.</h3><p>Sketching a route through the island…</p>';const result=await travelAI.generateItinerary(state.selectedAI);renderAIResult(result);}}));
}
function renderAIResult(result){
  const content=$('#aiStepContent');$('#aiStepIndicator').innerHTML='<span class="is-active"></span><span class="is-active"></span><span class="is-active"></span>';content.innerHTML=`<p class="eyebrow">Your ${result.days}-day island / ${result.style}</p><h3>A route with room to breathe.</h3><div class="itinerary-result"><div class="itinerary-route">${result.route.map((name,index)=>`<span>${name}</span>${index<result.route.length-1?'<i>→</i>':''}`).join('')}</div><div class="itinerary-days">${result.dayNames.map((item)=>`<div class="itinerary-day"><strong>DAY ${String(item.day).padStart(2,'0')}</strong><span>${item.route}</span><small>${item.moment}</small></div>`).join('')}</div></div><button class="button button-outline ai-next" id="aiRestart">Start another feeling</button>`;$('#aiRestart').addEventListener('click',()=>renderAI(0));}
function setupAI(){const panel=$('#aiPanel'),start=$('#startAi'),close=$('#closeAi');let lastFocus=null;start.addEventListener('click',()=>{lastFocus=document.activeElement;panel.classList.add('is-open');panel.setAttribute('aria-hidden','false');document.body.style.overflow='hidden';state.selectedAI={experience:'Relaxation',days:7,style:'Comfort'};renderAI(0);setTimeout(()=>panel.querySelector('button')?.focus(),0);});close.addEventListener('click',()=>{panel.classList.remove('is-open');panel.setAttribute('aria-hidden','true');document.body.style.overflow='';lastFocus?.focus();});}

function setupPlanner(){
  const list=$('#plannerList'),select=$('#plannerSelect');select.innerHTML='<option value="">Choose a place…</option>'+plannerPlaces.map((name)=>`<option value="${name}">${name}</option>`).join('');
  const render=()=>{list.innerHTML=state.planner.map((name,index)=>`<div class="planner-item" draggable="true" data-name="${name}"><span class="drag-grip">⠿</span><span class="planner-number">0${index+1}</span><div><strong>${name}</strong><small>${destinationByName[name]?.category||'Island stop'}</small><small class="planner-experience">${destinationByName[name]?.tags?.join(' · ')||'Island stop'}</small></div><button class="planner-remove" data-remove="${name}" aria-label="Remove ${name}">×</button></div>`).join('');updatePlannerStats();
    $$('.planner-remove',list).forEach((button)=>button.addEventListener('click',()=>{state.planner=state.planner.filter((name)=>name!==button.dataset.remove);render();}));
    $$('.planner-item',list).forEach((item)=>{item.addEventListener('dragstart',()=>item.classList.add('is-dragging'));item.addEventListener('dragend',()=>{item.classList.remove('is-dragging');syncDrag();});item.addEventListener('dragover',(event)=>{event.preventDefault();const dragging=$('.is-dragging',list);if(dragging&&dragging!==item){const rect=item.getBoundingClientRect();const after=event.clientY>rect.top+rect.height/2;list.insertBefore(dragging,after?item.nextSibling:item);}});});
  };
  const syncDrag=()=>{state.planner=$$('.planner-item',list).map((item)=>item.dataset.name);render();};
  const updatePlannerStats=()=>{const stops=state.planner.length, distance=stops?`${Math.max(0,(stops-1)*190+stops*24)} km`:'—', time=stops?`${Math.max(2,(stops-1)*4+2)} hrs`:'—';$('#journeyDistance').textContent=distance;$('#journeyTime').textContent=time;$('#journeyDays').textContent=stops?Math.max(3,stops*2-1):'0';$('#journeySummary').textContent=`${stops} stops / ${stops?Math.max(3,stops*2-1):0} days`;$('#journeyRouteVisual').classList.toggle('has-route',stops>0);};
  $('#addStop').addEventListener('click',()=>{if(select.value&&!state.planner.includes(select.value)){state.planner.push(select.value);select.value='';render();}});$('#clearJourney').addEventListener('click',()=>{state.planner=[];render();});$('#journeyCta').addEventListener('click',()=>showToast(state.planner.length?`Your ${state.planner.length}-stop journey is ready to keep.`:'Choose a first stop to begin your journey.'));render();
}

function setupSound(){
  const button=$('#soundToggle');let audioContext,oscillator,gain;
  button.addEventListener('click',()=>{const on=button.getAttribute('aria-pressed')==='true';if(!on){audioContext=audioContext||new (window.AudioContext||window.webkitAudioContext)();oscillator=audioContext.createOscillator();gain=audioContext.createGain();oscillator.type='sine';oscillator.frequency.value=174;gain.gain.value=.0001;oscillator.connect(gain).connect(audioContext.destination);oscillator.start();gain.gain.exponentialRampToValueAtTime(.022,audioContext.currentTime+.5);}else if(gain){gain.gain.exponentialRampToValueAtTime(.0001,audioContext.currentTime+.45);setTimeout(()=>oscillator?.stop(),500);}button.setAttribute('aria-pressed',String(!on));});
}

function showToast(message){const toast=$('#toast');toast.textContent=message;toast.classList.add('is-visible');clearTimeout(window.__toastTimer);window.__toastTimer=setTimeout(()=>toast.classList.remove('is-visible'),3200);}

function setupStats(){
  if(!('IntersectionObserver' in window))return;const observer=new IntersectionObserver((entries)=>entries.forEach((entry)=>{if(entry.isIntersecting){$$('[data-count]',entry.target).forEach((el)=>{el.animate([{opacity:.2,transform:'translateY(10px)'},{opacity:1,transform:'translateY(0)'}],{duration:700,easing:'cubic-bezier(.22,.74,.18,1)'});});observer.unobserve(entry.target);}}),{threshold:.3});observer.observe($('#statsGrid'));
}

function setupAll(){
  renderCategories();renderDestinations();renderWaterfalls();renderHotels();renderExperiences();renderTaste();renderWeather();renderGallery();renderStats();
  setupNav();setupScrollProgress();setupReveal();setupHeroCanvas();setupCursor();setupMagnetic();setupGsap();setupDestinations();setupLightbox();setupSearch();setupAI();setupPlanner();setupSound();setupStats();
  window.addEventListener('load',()=>setTimeout(()=>$('#pageLoader')?.classList.add('is-ready'),450));setTimeout(()=>$('#pageLoader')?.classList.add('is-ready'),1800);
}

if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',setupAll);else setupAll();
