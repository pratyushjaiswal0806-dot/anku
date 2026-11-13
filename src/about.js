import { gsap, ScrollTrigger, $, $$, reduceMotion } from './motion/core.js';
import { splitWords } from './motion/split.js';
import { isArriving, openLift } from './motion/chrome.js';
import { scramble } from './motion/interactions.js';

export async function intro() {
  const p = isArriving() ? openLift() : Promise.resolve();
  if (!reduceMotion) {
    gsap.timeline({ delay: isArriving() ? 0.45 : 0, defaults: { ease: 'expo.out' } })
      .from('.site-header', { yPercent: -100, opacity: 0, duration: 1.2, clearProps: 'transform,opacity' }, 0)
      .from('.about-hero .kicker', { opacity: 0, x: -20, duration: 1 }, 0.1)
      .from('.about-hero__photo', { clipPath: 'inset(100% 0% 0% 0% round 24px)', duration: 1.6, ease: 'expo.inOut' }, 0.1)
      .from('.about-hero__photo img', { scale: 1.4, duration: 2 }, 0.1);
  }
  return p;
}

export function animate() {
  initFaq();
  if (reduceMotion) return;

  $$('[data-scrub]').forEach((p) => {
    const w = splitWords(p);
    gsap.set(w, { opacity: 0.15 });
    gsap.to(w, { opacity: 1, stagger: 0.1, ease: 'none', scrollTrigger: { trigger: p, start: 'top 85%', end: 'bottom 45%', scrub: true } });
  });
  gsap.from('.about-hero__places .chip', { y: 20, opacity: 0, stagger: 0.06, duration: 0.9, ease: 'back.out(2)', scrollTrigger: { trigger: '.about-hero__places', start: 'top 92%' } });

  $$('.method__head .h2, .beyond__head .h2, .faq__title').forEach((h) => {
    gsap.from(h, { yPercent: 30, opacity: 0, duration: 1.2, ease: 'expo.out', scrollTrigger: { trigger: h, start: 'top 85%' } });
  });
  gsap.from('.principle', { y: 70, opacity: 0, duration: 1.2, stagger: { each: 0.08, grid: 'auto' }, ease: 'expo.out', scrollTrigger: { trigger: '.method__grid', start: 'top 82%' } });
  gsap.from('.reel', { y: 90, opacity: 0, rotate: (i) => (i - 1) * 4, duration: 1.3, stagger: 0.12, ease: 'expo.out', scrollTrigger: { trigger: '.reels', start: 'top 85%' } });

  // eat. dance. travel. — each word drops in like a stamp
  gsap.from('.offduty [data-word]', { yPercent: -120, rotate: () => gsap.utils.random(-14, 14), opacity: 0, duration: 1, stagger: 0.14, ease: 'back.out(1.8)', scrollTrigger: { trigger: '.offduty', start: 'top 65%' } });
  gsap.from('.offduty__text, .offduty__egg', { y: 30, opacity: 0, duration: 1, stagger: 0.12, ease: 'expo.out', scrollTrigger: { trigger: '.offduty__text', start: 'top 90%' } });
  gsap.from('.qa', { y: 30, opacity: 0, duration: 1, stagger: 0.07, ease: 'expo.out', scrollTrigger: { trigger: '.faq__list', start: 'top 85%' } });
}

function initFaq() {
  $$('.qa').forEach((d) => {
    const summary = $('summary', d);
    const body = $('.qa__a', d);
    const q = $('.qa__q', d);
    summary.addEventListener('click', (e) => {
      e.preventDefault();
      if (reduceMotion) { d.open = !d.open; return; }
      if (d.open) {
        gsap.to(body, { height: 0, opacity: 0, duration: 0.6, ease: 'expo.inOut', onComplete: () => { d.open = false; gsap.set(body, { clearProps: 'all' }); ScrollTrigger.refresh(); } });
      } else {
        $$('.qa[open]').forEach((o) => o !== d && $('summary', o).click());
        d.open = true;
        scramble(q, q.dataset.text || q.textContent, 1.2);
        gsap.from(body, { height: 0, opacity: 0, duration: 0.8, ease: 'expo.inOut', onComplete: () => { gsap.set(body, { clearProps: 'all' }); ScrollTrigger.refresh(); } });
      }
    });
  });
}
