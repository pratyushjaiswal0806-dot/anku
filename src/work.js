// /work/ — every case file, filterable by sector, plus the projects nobody paid for.
import { gsap, ScrollTrigger, $, $$, reduceMotion } from './motion/core.js';
import { splitChars } from './motion/split.js';
import { isArriving, openLift, countUp } from './motion/chrome.js';
import { cases, categories, sideProjects } from './data/cases.js';
import { workCard } from './work-card.js';

const valid = new Set(categories.map((k) => k.key));
const initialFilter = () => {
  const f = new URLSearchParams(location.search).get('filter');
  return valid.has(f) ? f : 'all';
};
const countFor = (key) => (key === 'all' ? cases.length : cases.filter((c) => c.category === key).length);

export function render() {
  const sectors = categories.length - 1; // minus 'all'
  $('#main').innerHTML = `
    <section class="work-hero">
      <div class="work-hero__top smallcaps">
        <a href="/" class="u-link" data-label="home">← home</a>
        <span class="rule"></span>
        <span>the case files</span>
      </div>
      <h1 class="work-hero__title display">all the <em>work.</em></h1>
      <div class="work-hero__foot">
        <p class="work-hero__lead">${cases.length} case studies across ${sectors} sectors. Enterprise pages to a kids’ snack label, premium gin to a women’s oncology centre: the category changes, the curiosity doesn’t.</p>
        <span class="dd dd--work-star" data-doodle="star" data-float aria-hidden="true"></span>
      </div>
    </section>

    <section class="work-index" id="cases">
      <div class="filters" role="toolbar" aria-label="Filter case studies by sector">
        ${categories
          .map((k) => `<button type="button" class="filter" data-filter="${k.key}" aria-pressed="false">${k.label}<sup>${countFor(k.key)}</sup></button>`)
          .join('')}
      </div>
      <p class="work-index__status smallcaps" aria-live="polite"></p>
      <div class="work-grid">${cases.map((c) => workCard(c, { variant: 'grid' })).join('')}</div>
    </section>

    <section class="beyond work-beyond" id="beyond" data-theme="dark">
      <div class="sec-head">
        <h2 class="h2">beyond <em>the brief</em></h2>
        <p class="sec-head__aside">Personal and academic projects: conceptualised, scripted, shot and edited end to end, because nobody had to pay for them.</p>
      </div>
      <div class="reels">
        ${sideProjects
          .map(
            (p) => `<a class="reel" href="${p.href}" target="_blank" rel="noopener" data-cursor="play">
            <div class="reel__film"><img src="${p.img}" alt="${p.alt}" loading="lazy" /><span class="reel__play">▶</span></div>
            <span class="smallcaps reel__kind">${p.kind}</span><h3>${p.title}</h3>
            <p>${p.text}</p>
          </a>`
          )
          .join('')}
      </div>
    </section>

    <section class="work-cta">
      <p class="script">liked what you saw?</p>
      <h2 class="h2">your brand could be <em>case file ${String(cases.length + 1).padStart(2, '0')}.</em></h2>
      <div class="work-cta__btns">
        <a href="/#contact" class="btn btn--wine" data-magnetic data-label="contact"><span>start a conversation</span><i>↗</i></a>
        <a href="/about.html" class="btn btn--line" data-magnetic data-label="about"><span>more about me</span><i>↗</i></a>
      </div>
    </section>`;

  applyFilter(initialFilter(), { instant: true });
}

/* ───────── filtering ───────── */
let current = null;
let busy = false;

function applyFilter(key, { instant = false } = {}) {
  if (key === current || busy) return;
  current = key;
  $$('.filter').forEach((b) => {
    const on = b.dataset.filter === key;
    b.classList.toggle('is-active', on);
    b.setAttribute('aria-pressed', String(on));
  });
  const label = categories.find((k) => k.key === key)?.label;
  $('.work-index__status').textContent = key === 'all' ? `showing all ${cases.length} case files` : `${countFor(key)} of ${cases.length} · ${label}`;

  const cards = $$('.work-grid .work-card');
  const show = (c) => key === 'all' || c.dataset.category === key;
  const swap = () => cards.forEach((c) => { c.hidden = !show(c); });

  if (instant || reduceMotion) {
    swap();
    ScrollTrigger.refresh();
    return;
  }
  busy = true;
  const visible = cards.filter((c) => !c.hidden);
  gsap.set(cards, { transition: 'none' });
  gsap.to(visible, {
    opacity: 0, y: 24, duration: 0.3, ease: 'power2.in', stagger: 0.02,
    onComplete: () => {
      swap();
      const next = cards.filter((c) => !c.hidden);
      gsap.fromTo(next, { opacity: 0, y: 40 }, {
        opacity: 1, y: 0, duration: 0.8, ease: 'expo.out', stagger: 0.05, clearProps: 'opacity,transform,transition',
        onComplete: () => { busy = false; gsap.set(cards, { clearProps: 'opacity,transform,transition' }); },
      });
      ScrollTrigger.refresh();
    },
  });
}

function initFilters() {
  $$('.filter').forEach((b) =>
    b.addEventListener('click', () => {
      const key = b.dataset.filter;
      applyFilter(key);
      const url = new URL(location.href);
      if (key === 'all') url.searchParams.delete('filter');
      else url.searchParams.set('filter', key);
      history.replaceState(null, '', url);
    })
  );
}

/* ───────── motion ───────── */
function heroIntro() {
  const chars = splitChars($('.work-hero__title'));
  gsap.timeline({ defaults: { ease: 'expo.out' } })
    .from('.site-header', { yPercent: -100, opacity: 0, duration: 1.2, clearProps: 'transform,opacity' }, 0)
    .from('.work-hero__top > *', { opacity: 0, y: 14, duration: 1, stagger: 0.1 }, 0.1)
    .from('.work-hero__top .rule', { scaleX: 0, duration: 1.6, ease: 'expo.inOut' }, 0)
    .from(chars, { yPercent: 115, rotate: 8, duration: 1.4, stagger: 0.035 }, 0.15)
    .from('.work-hero__lead', { y: 30, opacity: 0, duration: 1.2 }, 0.6)
    .from('.filter', { y: 20, opacity: 0, duration: 0.9, stagger: 0.04 }, 0.7)
    .add(() => gsap.set('.work-grid .work-card', { transition: 'none' }), 0)
    .from('.work-grid .work-card:not([hidden])', { y: 80, opacity: 0, duration: 1.3, stagger: 0.07, clearProps: 'opacity,transform,transition' }, 0.8);
}

export async function intro() {
  if (reduceMotion) { if (isArriving()) await openLift(); return; }
  if (isArriving()) {
    const p = openLift();
    gsap.delayedCall(0.45, heroIntro);
    return p;
  }
  heroIntro();
}

export function animate() {
  initFilters();
  $$('.work-grid [data-count]').forEach((el) => countUp(el, { trigger: el.closest('.work-card'), start: 'top 95%' }));
  if (reduceMotion) return;

  $$('main .sec-head').forEach((h) =>
    gsap.from(h.children, { y: 40, opacity: 0, duration: 1.2, ease: 'expo.out', stagger: 0.08, scrollTrigger: { trigger: h, start: 'top 82%' } })
  );
  gsap.from('.reel', { y: 90, opacity: 0, rotate: (i) => (i - 1) * 4, duration: 1.3, stagger: 0.12, ease: 'expo.out', scrollTrigger: { trigger: '.reels', start: 'top 85%' } });
  gsap.from('.work-cta > *', { y: 40, opacity: 0, duration: 1.2, stagger: 0.1, ease: 'expo.out', scrollTrigger: { trigger: '.work-cta', start: 'top 75%' } });
}
