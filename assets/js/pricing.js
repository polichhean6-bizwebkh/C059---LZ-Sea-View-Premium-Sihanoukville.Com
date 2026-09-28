(() => {
  'use strict';
  const data = window.LZ_PRICING;
  const residential = data.filter(u => !['Hotel', 'Retail'].includes(u.status));
  const types = ['Studio', '1 Bedroom', '2 Bedroom', '3 Bedroom', 'Penthouse'];
  const money = value => value === null ? '—' : '$' + value.toLocaleString('en-US');
  const $ = id => document.getElementById(id);
  const ordinal = floor => floor + (floor % 100 >= 11 && floor % 100 <= 13 ? 'th' : ({1:'st',2:'nd',3:'rd'}[floor % 10] || 'th'));
  const badge = status => `<span class="status ${status.toLowerCase()}">${status}</span>`;
  const enquiry = u => 'https://wa.me/85592523534?text=' + encodeURIComponent(`Hello, I would like to confirm availability and terms for LZ Sea View Premium unit ${u.unit}, floor ${u.floor}, ${u.type}, ${u.size} sqm, listed at ${money(u.price)} USD. Please confirm the current price and status.`);
  const floorSelect = $('floor-filter'), typeSelect = $('type-filter'), statusSelect = $('status-filter'), search = $('unit-filter');
  [...new Set(residential.map(u => u.floor))].sort((a,b) => b-a).forEach(f => floorSelect.add(new Option(ordinal(f) + ' floor', f)));
  types.forEach(t => typeSelect.add(new Option(t, t)));
  $('category-cards').innerHTML = types.map((type, i) => {
    const units = residential.filter(u => u.type === type && u.status === 'Available');
    const sizes = units.map(u => Number(u.size));
    const min = Math.min(...sizes), max = Math.max(...sizes);
    return `<article class="category-card"><span class="category-index">0${i+1} / RESIDENCE</span><h3>${type}</h3><p>${min === max ? min : min + '–' + max} sqm</p><div class="category-price"><small>FROM · USD</small><strong>${money(Math.min(...units.map(u => u.price)))}</strong></div><p class="fine">${units.length} available ${units.length === 1 ? 'unit' : 'units'}</p><a class="text-link" href="#availability" data-category="${type}">View Available Units <span>↗</span></a></article>`;
  }).join('');
  $('inventory-totals').textContent = `${residential.length} residential units · ${residential.filter(u => u.status === 'Available').length} available · ${residential.filter(u => u.status === 'Reserved').length} reserved · ${residential.filter(u => u.status === 'Sold').length} sold`;
  function render() {
    const units = residential.filter(u => (statusSelect.value === 'All' || u.status === statusSelect.value) && (floorSelect.value === 'All' || u.floor === Number(floorSelect.value)) && (typeSelect.value === 'All' || u.type === typeSelect.value) && u.unit.includes(search.value.trim()));
    const floors = [...new Set(units.map(u => u.floor))].sort((a,b) => b-a);
    $('result-count').textContent = `${units.length} ${units.length === 1 ? 'residence' : 'residences'} across ${floors.length} ${floors.length === 1 ? 'floor' : 'floors'} · ${statusSelect.value === 'All' ? 'all residential statuses' : statusSelect.value.toLowerCase()}`;
    $('floor-results').innerHTML = floors.length ? floors.map((f, i) => {
      const group = units.filter(u => u.floor === f);
      return `<details class="floor-group" ${i === 0 || floors.length <= 2 ? 'open' : ''}><summary><span>${ordinal(f)} floor</span><span class="floor-count">${group.length} ${group.length === 1 ? 'residence' : 'residences'}<span class="floor-chevron">＋</span></span></summary><table class="unit-table"><caption class="sr-only">${ordinal(f)} floor matching residences</caption><thead><tr><th scope="col">Unit</th><th scope="col">Residence</th><th scope="col">Size</th><th scope="col">Price · USD</th><th scope="col">Status</th><th scope="col">Enquiry</th></tr></thead><tbody>${group.map(u => `<tr><th scope="row" data-label="Unit">${u.unit}</th><td data-label="Residence">${u.type}${u.note ? `<small>${u.note}</small>` : ''}</td><td data-label="Size">${u.size} sqm</td><td class="unit-price" data-label="Price · USD">${money(u.price)}</td><td data-label="Status">${badge(u.status)}</td><td class="unit-action">${u.status === 'Available' ? `<a href="${enquiry(u)}" target="_blank" rel="noopener noreferrer" aria-label="Enquire about unit ${u.unit}">Enquire About This Unit ↗</a>` : '<span class="fine">Not currently available</span>'}</td></tr>`).join('')}</tbody></table></details>`;
    }).join('') : '<div class="empty-results"><h3>No matching residences.</h3><p>Try another floor, residence type or status, or reset the filters.</p><a href="index.html#contact" class="text-link">Ask the consultant ↗</a></div>';
    $('expand-floors').hidden = !floors.length;
    updateExpand();
  }
  function updateExpand() {
    const groups = [...document.querySelectorAll('.floor-group')];
    $('expand-floors').textContent = groups.length && groups.every(d => d.open) ? 'Collapse all floors' : 'Expand all floors';
  }
  $('filters').addEventListener('submit', e => e.preventDefault());
  $('filters').addEventListener('input', render);
  $('filters').addEventListener('reset', () => { setTimeout(render, 0); });
  $('expand-floors').addEventListener('click', () => {
    const groups = [...document.querySelectorAll('.floor-group')];
    const open = !groups.every(d => d.open);
    groups.forEach(d => { d.open = open; }); updateExpand();
  });
  $('floor-results').addEventListener('toggle', updateExpand, true);
  document.querySelectorAll('[data-category]').forEach(a => a.addEventListener('click', () => { $('filters').reset(); statusSelect.value = 'Available'; typeSelect.value = a.dataset.category; render(); }));
  $('special-floors').innerHTML = [12,11,10,2].map(f => {
    const units = data.filter(u => u.floor === f);
    const hotel = f !== 2;
    return `<details class="special-floor"><summary><span>${ordinal(f)} floor</span><span class="status ${hotel ? 'hotel' : 'retail'}">${hotel ? 'Shira Collection Hotel' : 'Retail / Facilities'}</span></summary><p>${hotel ? 'Sold — Shira Collection Hotel, as labelled in the supplied list.' : 'Retail &amp; Services, as labelled in the supplied list.'} ${units.length} units; no individual prices supplied.</p><ul class="special-units">${units.map(u => `<li><b>${u.unit}</b><span>${u.size} sqm</span></li>`).join('')}</ul></details>`;
  }).join('') + '<div class="facility-floor"><span>1st floor</span><p>Business Lounge, Café &amp; Co-Working / Indoor Kids Fun Zone</p><span class="status retail">Retail / Facilities</span></div><div class="facility-floor"><span>Ground floor</span><p>Convenience Store / Reception / Retail</p><span class="status retail">Retail / Facilities</span></div>';
  const toggle = document.querySelector('.menu-toggle'), nav = $('nav');
  toggle.addEventListener('click', () => { const open = toggle.getAttribute('aria-expanded') !== 'true'; toggle.setAttribute('aria-expanded', String(open)); nav.classList.toggle('open', open); });
  const closeMenu = () => { toggle.setAttribute('aria-expanded','false'); nav.classList.remove('open'); };
  nav.addEventListener('click', closeMenu);
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') { closeMenu(); toggle.focus(); } });
  render();
})();
