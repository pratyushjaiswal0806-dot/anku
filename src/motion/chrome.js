import { gsap, ScrollTrigger, $, $$, reduceMotion, scrollToTarget } from './core.js';
import { splitWords } from './split.js';
import { cases } from '../data/cases.js';

/* ───────── The lift: page transitions ───────── */
export function isArriving() {
  return document.documentElement.classList.contains('is-arriving');
}

const doors = () => [$('.lift__door--l'), $('.lift__door--r')];

function setLiftSign(label, floor = '') {
  const l = $('.lift__label');
  const f = $('.lift__floor');
  if (l) l.textContent = label;
  if (f) f.textContent = floor;
}

/** Doors closed → open. Used on arrival and by the home loader. */
export function openLift({ delay = 0.05 } = {}) {
  const [l, r] = doors();
  const html = document.documentElement;
  try { sessionStorage.removeItem('as-nav'); } catch {}
  if (!l) return Promise.resolve();
  gsap.set(l, { x: 0, xPercent: 0 });
  gsap.set(r, { x: 0, xPercent: 0 });
  gsap.set('.lift__sign', { xPercent: -50, x: 0, y: 0, yPercent: 0, left: '50%' });
  html.classList.remove('is-arriving', 'lift-closed');
  return new Promise((resolve) => {
    gsap.timeline({ delay, onComplete: resolve })
      .to('.lift__sign', { yPercent: -260, duration: 0.45, ease: 'expo.in' }, 0.1)
      .to(l, { xPercent: -101, duration: reduceMotion ? 0.01 : 0.65, ease: 'expo.inOut' }, 0.05)
      .to(r, { xPercent: 101, duration: reduceMotion ? 0.01 : 0.65, ease: 'expo.inOut' }, 0.05)
      .to('.lift__hint', { opacity: 0, duration: 0.2 }, 0);
  });
}

/** Doors open → closed, with the destination shown on the sign. */
export function closeLift(label = '') {
  const [l, r] = doors();
  setLiftSign(label || 'going up', '▲');
  gsap.set('.lift__sign', { xPercent: -50, x: 0, left: '50%' });
  return new Promise((resolve) => {
    gsap.timeline({ onComplete: resolve })
      .fromTo(l, { x: 0, xPercent: -101 }, { xPercent: 0, duration: reduceMotion ? 0.01 : 0.55, ease: 'expo.inOut' }, 0)
      .fromTo(r, { x: 0, xPercent: 101 }, { xPercent: 0, duration: reduceMotion ? 0.01 : 0.55, ease: 'expo.inOut' }, 0)
      .fromTo('.lift__sign', { y: 0, yPercent: -260 }, { yPercent: 0, duration: 0.4, ease: 'expo.out' }, 0.25);
  });
}

export function initTransitions() {
  const arriving = isArriving();
  if (arriving) {
    let label = '';
    try { label = sessionStorage.getItem('as-nav') || ''; } catch {}
    setLiftSign(label && label !== '1' ? label : 'arriving', '●');
  }

  // Prefetch internal pages on hover for instant navigation
  const prefetched = new Set();
  document.addEventListener('mouseover', (e) => {
    const a = e.target.closest('a[href]');
    if (!a) return;
    const href = a.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) return;
    try {
      const url = new URL(a.href, location.href);
      if (url.origin !== location.origin || prefetched.has(url.pathname)) return;
      prefetched.add(url.pathname);
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = url.pathname;
      document.head.appendChild(link);
    } catch {}
  }, { passive: true });

  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href]');
    if (!a || e.defaultPrevented) return;
    if (a.target === '_blank' || a.hasAttribute('download') || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    const url = new URL(a.href, location.href);
    if (url.origin !== location.origin || url.protocol.startsWith('mailto')) return;

    const norm = (p) => p.replace(/index\.html$/, '');
    if (norm(url.pathname) === norm(location.pathname)) {
      e.preventDefault();
      scrollToTarget(url.hash || 0);
      if (url.hash) history.replaceState(null, '', url.hash);
      return;
    }

    e.preventDefault();
    const label = a.dataset.label || (url.hash ? url.hash.slice(1) : 'home');
    try { sessionStorage.setItem('as-nav', label); } catch {}
    closeLift(label).then(() => { location.href = url.href; });
  });

  // Back/forward cache: never leave the doors shut
  window.addEventListener('pageshow', (e) => {
    if (!e.persisted) return;
    const [l, r] = doors();
    gsap.set(l, { xPercent: -101 });
    gsap.set(r, { xPercent: 101 });
    gsap.set('.lift__sign', { yPercent: -260 });
  });
}

/* ───────── Header: hide on scroll, adapt to dark chapters ───────── */
export function initHeader() {
  const header = $('.site-header');
  if (!header) return;
  let isDark = false;
  const darkTriggers = $$('[data-theme="dark"]').map((el) =>
    ScrollTrigger.create({
      trigger: el,
      start: 'top top+=42',
      end: 'bottom top+=42',
      onToggle: () => {
        const nextDark = darkTriggers.some((t) => t.isActive);
        if (nextDark !== isDark) {
          isDark = nextDark;
          header.classList.toggle('is-dark', isDark);
        }
      },
    })
  );
  let isHidden = false;
  ScrollTrigger.create({
    start: 0,
    end: 'max',
    onUpdate: (self) => {
      const y = self.scroll();
      const nextHidden = self.direction === 1 && y > 300;
      if (nextHidden !== isHidden) {
        isHidden = nextHidden;
        header.classList.toggle('is-hidden', isHidden);
      }
    },
  });

  // progress rail
  gsap.to('.progress span', { scaleY: 1, ease: 'none', scrollTrigger: { start: 0, end: 'max', scrub: 0.3 } });

  // work & case pages live under "work"
  const page = document.body.dataset.page;
  if (page === 'work' || page === 'case') $$('.nav a[data-section="work"]').forEach((a) => a.classList.add('is-active'));
  if (page === 'about') $$('.nav a[href="/about.html"]').forEach((a) => a.classList.add('is-active'));
  if (page === 'contact') $$('.nav a[href="/contact.html"]').forEach((a) => a.classList.add('is-active'));

  // active nav pill follows the section in view (home only — other pages keep their fixed state)
  if (page !== 'home') {
    initMobileNav();
    return;
  }
  $$('main section[id]').forEach((sec) => {
    ScrollTrigger.create({
      trigger: sec,
      start: 'top center',
      end: 'bottom center',
      onToggle: (self) => {
        if (!self.isActive) return;
        $$('.nav a, .mobile-drawer__link').forEach((a) => a.classList.toggle('is-active', a.getAttribute('href') === `#${sec.id}` || a.getAttribute('href') === `/#${sec.id}` || a.dataset.section === sec.id));
      },
    });
  });

  initMobileNav();
}

/* ───────── Mobile navigation drawer ───────── */
export function initMobileNav() {
  const toggle = $('.mobile-nav-toggle');
  const drawer = $('.mobile-drawer');
  if (!toggle || !drawer) return;

  const backdrop = $('.mobile-drawer__backdrop', drawer);
  const links = $$('.mobile-drawer__link, .mobile-drawer__cta', drawer);

  function openMenu() {
    toggle.classList.add('is-active');
    toggle.setAttribute('aria-expanded', 'true');
    drawer.classList.add('is-open');
    drawer.setAttribute('aria-hidden', 'false');
    document.body.classList.add('has-mobile-nav-open');
  }

  function closeMenu() {
    toggle.classList.remove('is-active');
    toggle.setAttribute('aria-expanded', 'false');
    drawer.classList.remove('is-open');
    drawer.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('has-mobile-nav-open');
  }

  toggle.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = drawer.classList.contains('is-open');
    if (isOpen) closeMenu();
    else openMenu();
  });

  backdrop?.addEventListener('click', closeMenu);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('is-open')) closeMenu();
  });

  links.forEach((a) => {
    a.addEventListener('click', () => {
      closeMenu();
    });
  });

  const page = document.body.dataset.page;
  if (page === 'work' || page === 'case') {
    $$('.mobile-drawer__link[data-section="work"]').forEach((a) => a.classList.add('is-active'));
  }
  if (page === 'about') {
    $$('.mobile-drawer__link[href="/about.html"]').forEach((a) => a.classList.add('is-active'));
  }
  if (page === 'contact') {
    $$('.mobile-drawer__link[href="/contact.html"]').forEach((a) => a.classList.add('is-active'));
  }
}

/* ───────── Footer: works index + back-to-top ───────── */
export function initFooter() {
  const list = $('.footer__index--works');
  if (list) {
    list.innerHTML = cases
      .map((c, i) => `<li><a href="/work/${c.slug}.html" data-label="${c.brand}"><i>${String(i + 1).padStart(2, '0')}</i> ${c.brand}</a></li>`)
      .join('') + `<li class="footer__all"><a href="/work/" data-label="work"><i>→</i> view all work</a></li>`;
  }
  $('.totop')?.addEventListener('click', () => scrollToTarget(0, { duration: 2.4 }));

  if (reduceMotion) return;
  const big = $('.footer__big');
  if (big) {
    gsap.from(big, {
      yPercent: 60,
      opacity: 0,
      duration: 1.6,
      ease: 'expo.out',
      scrollTrigger: { trigger: big, start: 'top 95%' },
    });
  }
}

/* ───────── Generic scroll reveals ───────── */
export function initReveals(scope = document) {
  if (reduceMotion) return;

  $$('.chapter-head', scope).forEach((h) => {
    const tl = gsap.timeline({ scrollTrigger: { trigger: h, start: 'top 85%' } });
    tl.from($('.chapter-head__num', h), { yPercent: 100, opacity: 0, duration: 0.9, ease: 'expo.out' })
      .from($('.chapter-head__label', h), { opacity: 0, x: -20, duration: 0.9, ease: 'expo.out' }, 0.1)
      .from($('.chapter-head__rule', h), { scaleX: 0, duration: 1.6, ease: 'expo.inOut' }, 0);
  });

  $$('[data-reveal]', scope).forEach((el) => {
    gsap.from(el, { y: 50, opacity: 0, duration: 1.3, ease: 'expo.out', scrollTrigger: { trigger: el, start: 'top 88%' } });
  });

  $$('[data-split-lines]', scope).forEach((el) => {
    const words = splitWords(el, { mask: true });
    gsap.from(words, {
      yPercent: 110,
      rotate: 4,
      duration: 1.2,
      ease: 'expo.out',
      stagger: 0.035,
      scrollTrigger: { trigger: el, start: 'top 85%' },
    });
  });

  $$('[data-count]', scope)
    .filter((el) => !el.closest('.work-card, .case-outcome'))
    .forEach((el) => countUp(el));
}

export function countUp(el, { trigger = el, start = 'top 90%', containerAnimation } = {}) {
  const end = parseFloat(el.dataset.count);
  const dec = parseInt(el.dataset.decimals || '0', 10);
  if (reduceMotion) { el.textContent = end.toFixed(dec); return; }
  const o = { v: 0 };
  el.textContent = (0).toFixed(dec);
  gsap.to(o, {
    v: end,
    duration: 2.2,
    ease: 'power3.out',
    onUpdate: () => { el.textContent = o.v.toFixed(dec); },
    scrollTrigger: { trigger, start, containerAnimation },
  });
}
