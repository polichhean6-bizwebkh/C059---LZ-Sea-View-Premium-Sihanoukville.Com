'use strict';
(() => {
  const {pictures, aliases, documents} = window.LZ_CONTENT;
  const $ = (selector) => document.querySelector(selector);
  const picture = (id) => pictures.find(p => p.id === Number(aliases[String(id)] || id));
  const imageMarkup = (p, thumb = true, extra = '') => `<img src="${thumb ? p.thumb : p.src}" width="${p.width}" height="${p.height}" loading="lazy" alt="${p.title} — ${p.label}" ${extra}>`;
  const units = [
    {name:'Studio',category:'Studio',title:'Effortless, everyday living.',size:'44.7–48.3 m²',net:'Gross area · 35.3–38.1 m² net in supplied plans',level:'Studio residences',description:'An open, carefully arranged space for independent living, short stays or a rental-minded purchase.',features:['Open living, sleeping and dining area','Kitchen, bathroom, balcony and laundry','Furnished interiors with integrated storage'],hero:97,thumbs:[103,109,113,95]},
    {name:'One Bedroom',category:'1 Bedroom',title:'Space to make your own.',size:'89.6–93.1 m²',net:'Gross area · 70.7–73.5 m² net',level:'Levels 22 & 23',description:'A separate bedroom and generous living area give everyday routines a little more breathing room.',features:['Separate bedroom and living / dining space','Kitchen, balcony and laundry area','Workspace and wardrobe shown in plans'],hero:45,thumbs:[42,49,40,52]},
    {name:'Two Bedrooms',category:'2 Bedroom',title:'Room for life to unfold.',size:'90.7–93.1 m²',net:'Gross area · 71.6–73.5 m² net',level:'Levels 22 & 23',description:'Flexible living for couples, families or longer stays, with a second room shown as a bedroom / home office in the brochure.',features:['Main bedroom plus a flexible second room','Living / dining, kitchen and balcony','Confirm bedroom conversion and furnishing'],hero:182,thumbs:[169,168,180,183]},
    {name:'Three Bedrooms',category:'3 Bedroom',title:'A generous family perspective.',size:'133.92–137.46 m²',net:'Gross area · 106–108.8 m² net',level:'Levels 22 & 23',description:'Larger living spaces and two bedrooms plus a third bedroom / home office option, as illustrated in the supplied layouts.',features:['Three-room layout including flexible home office','Living / dining, kitchen and balcony areas','Two bathroom areas shown in detailed plans'],hero:126,thumbs:[116,128,130,122]},
    {name:'Penthouse',category:'Penthouse',title:'An elevated sense of home.',size:'271.6 or 367 m²',net:'Gross areas · P2: 236.6 m² net · P1: 319.3 m² net',level:'Level 24 · Two distinct layouts',description:'Two spacious top-floor residences with expansive living areas and a more private way to enjoy the skyline.',features:['Penthouse I: 367 m² gross · Penthouse II: 271.6 m² gross','Terrace, study, private bar and jacuzzi concepts','Bedroom configuration and final fit-out on enquiry'],hero:58,thumbs:[85,86,63,77]}
  ];
  const tabs = $('#unit-tabs');
  units.forEach((u,i) => { const b=document.createElement('button'); b.id=`unit-tab-${i}`; b.textContent=u.name; b.setAttribute('role','tab'); b.setAttribute('aria-controls','unit-panel'); b.dataset.index=i; tabs.append(b); });
  let currentUnit=0;
  function showUnit(i) {
    currentUnit=i;
    const u=units[i];
    tabs.querySelectorAll('button').forEach((b,j)=>{b.setAttribute('aria-selected',String(i===j));b.tabIndex=i===j?0:-1;});
    const list = pictures.filter(p=>p.category===u.category);
    $('#unit-panel').setAttribute('aria-labelledby',`unit-tab-${i}`);
    $('#unit-panel').innerHTML=`<div class="unit-layout"><div><button class="unit-feature" data-unit-image="${u.hero}" aria-label="Open ${u.name} image gallery">${imageMarkup(picture(u.hero),false)}<span class="image-note">ARTIST IMPRESSION</span><span class="expand">View ${list.length} images ＋</span></button><div class="unit-thumbs">${u.thumbs.map(id=>`<button data-unit-image="${id}" aria-label="View ${u.name} interior">${imageMarkup(picture(id))}</button>`).join('')}</div></div><div class="unit-copy"><p class="eyebrow">${u.level.toUpperCase()}</p><h3>${u.title}</h3><p>${u.description}</p><div class="unit-size">${u.size}<small>${u.net}</small></div><ul>${u.features.map(f=>`<li>${f}</li>`).join('')}</ul><div class="actions"><button class="button dark" id="unit-plans">View floor plans <span>↗</span></button><a class="text-link" href="#contact" data-enquire="${u.name}">Enquire about this unit ↗</a></div></div></div>`;
  }
  tabs.addEventListener('click',e=>{const b=e.target.closest('button');if(b)showUnit(Number(b.dataset.index));});
  tabs.addEventListener('keydown',e=>{let i=currentUnit;if(e.key==='ArrowRight')i=(i+1)%units.length;else if(e.key==='ArrowLeft')i=(i+units.length-1)%units.length;else if(e.key==='Home')i=0;else if(e.key==='End')i=units.length-1;else return;e.preventDefault();showUnit(i);tabs.children[i].focus();});
  showUnit(0);

  // Native dialogs provide focus containment, Escape dismissal and focus restoration.
  const lightbox=$('#lightbox'), info=$('#info-dialog');
  let imageList=[],imageIndex=0;
  function showDialog(d) { d.showModal();document.body.classList.add('modal-open'); }
  function renderLightbox(){const p=imageList[imageIndex];$('#lightbox-image').src=p.src;$('#lightbox-image').alt=`${p.title} — ${p.label}`;$('#lightbox-image').classList.toggle('map-large',p.id==='map');$('#lightbox-caption').textContent=`${p.title} · ${p.label}`;$('#lightbox-count').textContent=`${imageIndex+1} / ${imageList.length}`;$('#lightbox-prev').hidden=$('#lightbox-next').hidden=imageList.length<2;}
  function openImages(list,id){imageList=list;imageIndex=Math.max(0,list.findIndex(p=>String(p.id)===String(id)));renderLightbox();showDialog(lightbox);}
  function step(delta){imageIndex=(imageIndex+delta+imageList.length)%imageList.length;renderLightbox();}
  $('#lightbox-prev').addEventListener('click',()=>step(-1));$('#lightbox-next').addEventListener('click',()=>step(1));
  lightbox.addEventListener('keydown',e=>{if(e.key==='ArrowLeft')step(-1);if(e.key==='ArrowRight')step(1);});
  [lightbox,info].forEach(d=>{d.addEventListener('click',e=>{if(e.target===d){const b=d.getBoundingClientRect();if(e.clientX<b.left||e.clientX>b.right||e.clientY<b.top||e.clientY>b.bottom)d.close();}});d.addEventListener('close',()=>{document.body.classList.remove('modal-open');if(d===lightbox)$('#lightbox-image').removeAttribute('src');});});
  const categories=['All','Exterior','Facilities','Studio','1 Bedroom','2 Bedroom','3 Bedroom','Penthouse','Completed Projects'];
  let category='All', limit=9;
  const curated=[160,35,97,45,58,150,5,182,141];
  const galleryPhotos=pictures.filter(p=>p.category!=='Offer').sort((a,b)=>{const ai=curated.indexOf(a.id),bi=curated.indexOf(b.id);return (ai<0?999:ai)-(bi<0?999:bi);});
  categories.forEach(c=>{const b=document.createElement('button');b.textContent=c;b.setAttribute('aria-pressed',String(c==='All'));b.addEventListener('click',()=>{category=c;limit=9;renderGallery();});$('#gallery-filters').append(b);});
  function selectedGallery(){return galleryPhotos.filter(p=>category==='All'||p.category===category);}
  function renderGallery(){const all=selectedGallery();$('#gallery-filters').querySelectorAll('button').forEach(b=>b.setAttribute('aria-pressed',String(b.textContent===category)));$('#gallery-grid').innerHTML=all.slice(0,limit).map(p=>`<button class="gallery-tile" data-gallery-id="${p.id}" aria-label="Open ${p.title}">${imageMarkup(p)}<span>${p.title}<small>${p.label}</small></span></button>`).join('');$('#gallery-status').textContent=`Showing ${Math.min(limit,all.length)} of ${all.length} images${category==='All'?'':` · ${category}`}`;$('#gallery-more').hidden=limit>=all.length;}
  $('#gallery-more').addEventListener('click',()=>{limit+=9;renderGallery();});renderGallery();

  const brochures=documents.filter(d=>d.group==='Brochures');
  const english=brochures.find(d=>d.title.includes('English'));
  document.querySelectorAll('[data-brochure]').forEach(a=>{a.href=english.href;a.download='LZ-Sea-View-Premium-English.pdf';});
  $('#brochure-cards').innerHTML=['English','Russian','Czech'].map(lang=>{const d=brochures.find(d=>d.title.includes(lang));return `<article class="brochure-card"><span>PROJECT BROCHURE · PDF</span><h3>${lang}</h3><p>Project story, residences &amp; lifestyle<br>Web viewing copy · ${d.mb} MB</p><a class="text-link" href="${d.href}" download>Download brochure <span>↓</span></a></article>`;}).join('');
  const docLabel=d=>d.title.replace(/^.*?bedroom\s*/i,'').replace(/sqm/g,'m²').replace(/LZ Sea View Premium Map 2026/i,'Neighbourhood map · 2026').replace('24 penthouse','Penthouse · 24th-floor plan');
  const groups=['Studio','1 Bedroom','2 Bedroom','3 Bedroom','Penthouse','Location'];
  $('#plan-downloads').innerHTML=groups.map(group=>`<details><summary>${group==='Location'?'Location map':group+' floor plans'} <span>＋</span></summary>${documents.filter(d=>d.group===group).map(d=>`<div class="doc-row"><span>${docLabel(d)}<small>PDF · ${d.mb} MB${d.webCopy?' · Web viewing copy':''}</small></span><a href="${d.href}" download aria-label="Download ${d.title}">Download ↓</a></div>`).join('')}</details>`).join('');
  document.addEventListener('click',e=>{
    const close=e.target.closest('[data-close]');if(close){close.closest('dialog').close();return;}
    const inquiry=e.target.closest('[data-enquire]');if(inquiry){$('#interested-unit').value=inquiry.dataset.enquire;}
    const g=e.target.closest('[data-gallery-id]');if(g){openImages(selectedGallery(),g.dataset.galleryId);return;}
    const u=e.target.closest('[data-unit-image]');if(u){const list=pictures.filter(p=>p.category===units[currentUnit].category);openImages(list,picture(u.dataset.unitImage).id);return;}
    const im=e.target.closest('[data-image]');if(im){const p=picture(im.dataset.image);openImages(pictures.filter(x=>x.category===p.category),p.id);return;}
    if(e.target.closest('[data-map]')){openImages([{id:'map',src:'assets/images/location/neighbourhood-map.webp',title:'Sihanoukville neighbourhood map',label:'Client brochure map · indicative locations'}],'map');return;}
    if(e.target.closest('#unit-plans')){const u=units[currentUnit], ds=documents.filter(d=>d.group===u.category);$('#info-content').innerHTML=`<p class="eyebrow">LAYOUT COLLECTION</p><h2 id="info-title">${u.name} floor plans</h2><p>Choose a PDF to download. Areas and layouts are indicative; confirm the latest approved version with the consultant.</p><div class="plan-options">${ds.map(d=>`<a href="${d.href}" download>${docLabel(d)} <span>↓</span></a>`).join('')}</div>`;showDialog(info);return;}
    if(e.target.closest('[data-offer]')){$('#info-content').innerHTML=`<p class="eyebrow">SUPPLIED ANNOUNCEMENT</p><h2 id="info-title">Promotion details on request.</h2><p>This is the client-supplied promotional artwork. Its printed price and terms require current confirmation and are not a live quotation.</p><img class="modal-offer" src="${picture(0).src}" alt="Client promotional announcement, including unconfirmed historical pricing and 60/40 payment terms"><p class="fine">Please confirm availability, eligibility and the current schedule with Ms. Sophearin Tep.</p>`;showDialog(info);}
  });
  $('#video-open').addEventListener('click',()=>{$('#info-content').innerHTML='<p class="eyebrow">PROJECT FILM · PREVIEW</p><div class="modal-mini-play">▷</div><h2 id="info-title">The vision, in motion.</h2><p>This demo previews the project video experience. The film will be connected here when it is ready for publication.</p><p>No video is playing. For the current project presentation, contact Ms. Sophearin Tep.</p><a class="button dark" href="https://t.me/Sophea_Gency" target="_blank" rel="noopener noreferrer">Request the project video ↗</a>';showDialog(info);});
  const toggle=$('.menu-toggle');function closeMenu(){toggle.setAttribute('aria-expanded','false');$('#nav').classList.remove('open');}
  toggle.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')!=='true';toggle.setAttribute('aria-expanded',String(open));$('#nav').classList.toggle('open',open);});
  $('#nav').addEventListener('click',e=>{if(e.target.closest('a'))closeMenu();});
  document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu();});
  $('#enquiry-form').addEventListener('submit',e=>{e.preventDefault();const data=new FormData(e.target);$('#info-content').innerHTML='<p class="eyebrow">ENQUIRY PREVIEW</p><h2 id="info-title">Your next conversation.</h2><p id="preview-text"></p><p class="fine">Demo only. Nothing has been sent or stored. Contact the consultant directly using one of the channels below.</p><div class="actions"><a class="button dark" href="https://wa.me/85592523534" target="_blank" rel="noopener noreferrer">Open WhatsApp ↗</a><a class="text-link" href="https://t.me/Sophea_Gency" target="_blank" rel="noopener noreferrer">Open Telegram ↗</a></div>';$('#preview-text').textContent=`${data.get('name')} · ${data.get('phone')} · ${data.get('unit')}\n${data.get('message')||''}`;$('#preview-text').style.whiteSpace='pre-wrap';$('#form-status').textContent='Preview ready. Your enquiry has not been sent.';showDialog(info);});
})();
