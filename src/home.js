import { gsap, ScrollTrigger, $, $$, reduceMotion, finePointer, stopScroll, startScroll } from './motion/core.js';
import { splitChars, splitWords } from './motion/split.js';
import { isArriving, openLift, countUp } from './motion/chrome.js';
import { toast } from './motion/interactions.js';
import { cases, featured } from './data/cases.js';
import { workCard } from './work-card.js';

const LOGO = (n) => `/assets/logos/${n}.png`;

/* The snapshot: every brand, one frame each */
const brands = [
  { name: 'Adani Group', logo: LOGO('adani'), slug: 'adani', stat: '81K+', note: 'follower growth' },
  { name: 'Nykaa', logo: LOGO('nykaa'), slug: 'nykaa', stat: '100%', note: 'on-time delivery' },
  { name: 'Stranger & Sons', logo: LOGO('stranger'), slug: 'stranger-and-sons', stat: '28.7K+', note: 'instagram community' },
  { name: 'Serious Slice', word: 'serious <em>slice</em>', slug: 'serious-slice', stat: '2.4M+', note: 'organic reach' },
  { name: 'amanté', logo: LOGO('amante'), slug: 'amante', stat: '200K+', note: 'campaign views' },
  { name: 'Apollo Athenaa', logo: LOGO('apollo'), slug: 'apollo', stat: '2', note: 'health campaigns' },
  { name: 'Delta Galil × Reliance', logo: LOGO('delta-reliance'), slug: 'athena', stat: '170K+', note: 'christmas views' },
  { name: 'Breathe In', logo: LOGO('breathe-in'), slug: 'breathe-in', stat: '180+', note: 'content assets' },
  { name: 'FRND', logo: LOGO('frnd'), slug: 'frnd', stat: '10', note: 'reels in 15 days' },
  { name: '@wassabi.eats', word: '@wassabi<em>.eats</em>', slug: 'wassabi-eats', stat: '150K+', note: 'organic views' },
  { name: 'Snack-A-Doodle', logo: LOGO('snack-a-doodle'), slug: 'snack-a-doodle', stat: 'rebrand', note: 'pack to post' },
  { name: 'JioHotstar', logo: LOGO('jiohotstar'), stat: 'ott', note: 'entertainment' },
  { name: 'Cornucopia Pictures', logo: LOGO('cornucopia'), stat: 'film', note: 'treasure house ent.' },
];

/* ═════════════════ RENDER ═════════════════ */
export function render() {
  // Brands: a clean logo wall, the number behind each one on hover
  $('.brands__grid').innerHTML =
    brands
      .map((b) => {
        const mark = b.logo
          ? `<img src="${b.logo}" alt="${b.name} logo" loading="lazy" decoding="async" />`
          : `<span class="brand__word">${b.word}</span>`;
        const inner = `
          <span class="brand__mark">${mark}</span>
          <span class="brand__name">${b.name}</span>
          <span class="brand__reveal" aria-hidden="true"><b>${b.stat}</b><span>${b.note}</span>${b.slug ? '<i>open the case →</i>' : ''}</span>`;
        return `<li class="brand">${
          b.slug
            ? `<a class="brand__tile" href="/work/${b.slug}.html" data-label="${b.name}" data-cursor="open">${inner}</a>`
            : `<div class="brand__tile">${inner}</div>`
        }</li>`;
      })
      .join('') +
    `<li class="brand brand--you"><a class="brand__tile" href="#contact"><span class="brand__mark"><span class="brand__word">your brand <em>here?</em></span></span><span class="brand__name">this spot’s free →</span></a></li>`;

  // Selected works: wide · half · half · wide
  $('.works__grid').innerHTML = featured.map((c, i) => workCard(c, { variant: 'feature', wide: i === 0 || i === featured.length - 1 })).join('');
  $$('.js-case-count').forEach((el) => { el.textContent = cases.length; });
  $$('.js-more-count').forEach((el) => { el.textContent = cases.length - featured.length; });

  // Marquee: duplicate for a seamless loop
  const t = $('.marquee__track');
  t.innerHTML = t.innerHTML.repeat(4);
}

/* ═════════════════ INTRO (lift + hero) ═════════════════ */
function heroIntro() {
  const chars = $$('.hero__line').flatMap((l) => splitChars(l));
  const tagWords = splitWords($('.hero__tag'), { mask: true });
  return gsap.timeline({ defaults: { ease: 'expo.out' } })
    .from('.site-header', { yPercent: -100, opacity: 0, duration: 1.2, clearProps: 'transform,opacity' }, 0)
    .from(chars, { yPercent: 120, rotate: 6, duration: 1.3, stagger: 0.035 }, 0.1)
    .from('.tarot--main', { yPercent: 70, rotate: -24, opacity: 0, duration: 1.6 }, 0.15)
    .from('.tarot--ghost', { yPercent: 80, rotate: 30, opacity: 0, duration: 1.7 }, 0.25)
    .add(() => drawTarot(), 1.25)
    .from(tagWords, { yPercent: 110, duration: 1, stagger: 0.02 }, 0.55)
    .from('.hero__ctas > *', { y: 24, opacity: 0, duration: 1, stagger: 0.08 }, 0.9)
    .from('.note', { opacity: 0, scale: 0.6, duration: 0.9, stagger: 0.15, ease: 'back.out(2)' }, 1.6)
    .from('.marquee', { opacity: 0, duration: 1.2 }, 1);
}

function runLoader() {
  stopScroll();
  const lift = $('.lift');
  const wrap = document.createElement('div');
  wrap.className = 'lift__poster';
  wrap.innerHTML = '<div class="lift__poster-root"></div><button type="button" class="lift__enter" data-magnetic>enter <i>↘</i></button>';
  lift.appendChild(wrap);
  lift.classList.add('is-poster');

  const fontsReady = Promise.resolve(document.fonts?.ready);
  const posterReady = import('./react/poster.tsx').then((p) => p.mountPoster($('.lift__poster-root', wrap)));

  // the poster's own intro runs ~7s; let it finish, or let the visitor skip ahead
  const done = new Promise((resolve) => {
    $('.lift__enter', wrap).addEventListener('click', resolve, { once: true });
    gsap.delayedCall(8, resolve);
  });

  return Promise.all([fontsReady, posterReady, done]).then(async ([, unmount]) => {
    try { sessionStorage.setItem('as-seen', '1'); } catch {}
    await gsap.to(wrap, { opacity: 0, duration: 0.5, ease: 'power2.inOut' });
    unmount();
    wrap.remove();
    lift.classList.remove('is-poster');
    gsap.delayedCall(0.35, heroIntro);
    return openLift({ delay: 0.05 }).then(startScroll);
  });
}

export async function intro() {
  if (reduceMotion) {
    document.documentElement.classList.remove('lift-closed');
    drawTarot();
    if (isArriving()) await openLift();
    return;
  }
  if (document.documentElement.classList.contains('lift-closed')) return runLoader();
  if (isArriving()) {
    const p = openLift();
    if (window.scrollY < 50) gsap.delayedCall(0.45, heroIntro);
    else drawTarot();
    return p;
  }
  heroIntro();
}

/* ═════════════════ SCROLL CHOREOGRAPHY ═════════════════ */
// CSS transform transitions would fight the tween, and leftover inline transforms would block :hover — so
// switch transitions off for the reveal and clear everything after.
const rise = (targets, trigger, extra = {}) => {
  gsap.set(targets, { transition: 'none' });
  return gsap.from(targets, {
    y: 60, opacity: 0, duration: 1.2, ease: 'expo.out', stagger: 0.08, clearProps: 'transform,opacity,transition',
    ...extra, scrollTrigger: { trigger, start: 'top 82%' },
  });
};

export function animate() {
  initTarot();
  initSign();

  if (reduceMotion) {
    $$('.works [data-count]').forEach((el) => countUp(el));
    return;
  }

  /* — Hero — */
  const loop = gsap.to('.marquee__track', { xPercent: -25, duration: 26, ease: 'none', repeat: -1 });
  ScrollTrigger.create({
    start: 0,
    end: 'max',
    onUpdate: (self) => {
      const v = self.getVelocity();
      gsap.to(loop, { timeScale: self.direction * (1 + Math.min(Math.abs(v) / 300, 5)), duration: 0.2, overwrite: true });
      gsap.to(loop, { timeScale: self.direction, duration: 1.4, delay: 0.25, ease: 'power2.out' });
    },
  });
  gsap.timeline({ scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } })
    .to('.hero__cards', { yPercent: -18, ease: 'none' }, 0)
    .to('.hero__copy', { yPercent: 10, opacity: 0.35, ease: 'none' }, 0);

  /* — section heads — */
  $$('main .sec-head').forEach((h) => rise(h.children, h, { y: 40 }));

  /* — 01 Brands — */
  // flash, then the frames tumble in and develop from blown-out grey to full colour
  const tiles = $$('.brand');
  gsap.set(tiles, { opacity: 0 });
  ScrollTrigger.create({
    trigger: '.brands',
    start: 'top 55%',
    once: true,
    onEnter: () => {
      gsap.timeline()
        .to('.flash', { opacity: 0.85, duration: 0.08, ease: 'none' })
        .to('.flash', { opacity: 0, duration: 0.9, ease: 'power2.out' })
        .fromTo(
          tiles,
          { opacity: 0, y: () => gsap.utils.random(-260, -120), x: () => gsap.utils.random(-120, 120), rotate: () => gsap.utils.random(-30, 30), scale: 1.15 },
          { opacity: 1, y: 0, x: 0, rotate: 0, scale: 1, duration: 1.3, ease: 'expo.out', stagger: { each: 0.05, from: 'random' }, clearProps: 'transform' },
          0.05
        )
        .fromTo(
          '.brand__mark img, .brand__word',
          { filter: 'blur(8px) grayscale(1) brightness(1.7)' },
          { filter: 'blur(0px) grayscale(0) brightness(1)', duration: 2.2, ease: 'power2.out', stagger: { each: 0.05, from: 'random' }, clearProps: 'filter' },
          0.3
        );
    },
  });

  /* — 02 Expertise — */
  rise('.service', '.services', { y: 80, stagger: 0.1 });
  rise('.approach > *', '.approach');

  /* — 03 Works — */
  $$('.works .work-card').forEach((card) => {
    rise(card, card, { y: 100, duration: 1.4 });
    const img = $('.work-card__media img:not(.is-contain)', card);
    if (img) gsap.fromTo(img, { yPercent: -6, scale: 1.14 }, { yPercent: 6, scale: 1.14, ease: 'none', scrollTrigger: { trigger: card, start: 'top bottom', end: 'bottom top', scrub: true } });
    const n = $('[data-count]', card);
    if (n) countUp(n, { trigger: card, start: 'top 80%' });
  });
  rise('.works__more > *', '.works__more');

  /* — 04 Kind words: notes get pinned to the board — */
  rise('.note-card', '.notes__board', { y: -120, rotate: (i) => [-14, 10, -8][i % 3], duration: 1.3, ease: 'back.out(1.4)', stagger: 0.14 });
  gsap.from('.note-card__tape', { scaleX: 0, duration: 0.5, ease: 'power2.out', stagger: 0.14, delay: 0.7, scrollTrigger: { trigger: '.notes__board', start: 'top 78%' } });

  /* — 05 Contact — */
  const cChars = $$('.contact__line').flatMap((l) => splitChars(l));
  gsap.from(cChars, { yPercent: 120, duration: 1.2, ease: 'expo.out', stagger: 0.02, scrollTrigger: { trigger: '.contact', start: 'top 65%' } });
  gsap.from('.sign', { yPercent: -60, opacity: 0, duration: 1.4, ease: 'elastic.out(1, 0.45)', scrollTrigger: { trigger: '.contact', start: 'top 40%' } });
  rise('.contact-card', '.contact__cards', { y: 80, stagger: 0.12 });
  rise('.socials li', '.socials', { y: 30, stagger: 0.06 });
}

/* ═════════════════ INTERACTIONS ═════════════════ */
let drawn = false;
function drawTarot() {
  const card = $('.tarot--main');
  if (!card || drawn) return;
  drawn = true;
  card.classList.add('is-drawn');
}

function initTarot() {
  const card = $('.tarot--main');
  const wrap = $('.hero__cards');
  card.addEventListener('click', () => {
    if (!drawn) return drawTarot();
    card.classList.toggle('is-drawn');
    gsap.fromTo(wrap, { scale: 0.97 }, { scale: 1, duration: 0.8, ease: 'elastic.out(1, 0.4)' });
  });
  if (!finePointer || reduceMotion) return;
  const rx = gsap.quickTo(card, 'rotationX', { duration: 0.9, ease: 'power3' });
  const ry = gsap.quickTo(card, 'rotationY', { duration: 0.9, ease: 'power3' });
  const gx = gsap.quickTo('.tarot--ghost', 'x', { duration: 1.2, ease: 'power3' });
  $('.hero').addEventListener('mousemove', (e) => {
    const nx = e.clientX / innerWidth - 0.5;
    const ny = e.clientY / innerHeight - 0.5;
    ry(nx * 16);
    rx(-ny * 12);
    gx(nx * -30);
  });
}

function initSign() {
  const wrap = $('.sign-wrap');
  const sign = $('.sign');
  let angle = 0;
  let vel = 0;
  let lastX = null;
  let isTicking = false;

  const tickPhysics = () => {
    vel += -angle * 0.012; // spring back to rest
    vel *= 0.965; // air resistance
    angle += vel;
    if (Math.abs(angle) > 0.005 || Math.abs(vel) > 0.005) {
      gsap.set(wrap, { rotation: angle });
    } else {
      angle = 0;
      vel = 0;
      gsap.set(wrap, { rotation: 0 });
      gsap.ticker.remove(tickPhysics);
      isTicking = false;
    }
  };

  const wake = () => {
    if (!isTicking) {
      isTicking = true;
      gsap.ticker.add(tickPhysics);
    }
  };

  if (!reduceMotion) {
    wake();
    $('.contact').addEventListener('mousemove', (e) => {
      if (lastX !== null) {
        vel += gsap.utils.clamp(-0.6, 0.6, (e.clientX - lastX) * 0.012);
        wake();
      }
      lastX = e.clientX;
    }, { passive: true });
    ScrollTrigger.create({
      trigger: '.contact',
      start: 'top bottom',
      end: 'bottom top',
      onUpdate: (self) => {
        const v = self.getVelocity();
        if (Math.abs(v) > 50) {
          vel += gsap.utils.clamp(-0.5, 0.5, v / 9000);
          wake();
        }
      },
    });
  }

  sign.addEventListener('click', async () => {
    const email = sign.dataset.email;
    try { await navigator.clipboard.writeText(email); } catch { location.href = `mailto:${email}`; return; }
    vel += 2.4;
    wake();
    gsap.timeline()
      .fromTo('.sign__stamp', { scale: 2.4, rotate: -40, opacity: 0 }, { scale: 1, rotate: -12, opacity: 1, duration: 0.5, ease: 'back.out(2.2)' })
      .to('.sign__stamp', { opacity: 0, scale: 0.8, duration: 0.5, ease: 'power2.in' }, '+=1.6');
    toast('<span>copied!</span> my email is on your clipboard');
  });
}

