import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);
gsap.config({ nullTargetWarn: false });

export const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
export const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
export const $ = (s, r = document) => r.querySelector(s);
export const $$ = (s, r = document) => [...r.querySelectorAll(s)];

export let lenis = null;

export function initScroll() {
  if (reduceMotion) return null;
  lenis = new Lenis({
    lerp: 0.105,
    wheelMultiplier: 1.0,
    smoothWheel: true,
    touchMultiplier: 1.2,
  });
  lenis.on('scroll', ScrollTrigger.update);

  let scrollTimer = null;
  lenis.on('scroll', () => {
    if (!document.body.classList.contains('is-scrolling')) {
      document.body.classList.add('is-scrolling');
    }
    clearTimeout(scrollTimer);
    scrollTimer = setTimeout(() => {
      document.body.classList.remove('is-scrolling');
    }, 120);
  });

  gsap.ticker.add((t) => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(500, 33);
  return lenis;
}

export function scrollToTarget(target, opts = {}) {
  const el = typeof target === 'string' ? (target === '#' || target === '#top' ? 0 : $(target)) : target;
  if (el == null) return;
  const defaultOffset = -72;
  if (lenis) {
    lenis.scrollTo(el, {
      duration: 1.1,
      offset: defaultOffset,
      easing: (t) => 1 - Math.pow(1 - t, 4),
      ...opts,
    });
  } else if (el === 0) {
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
  } else {
    el.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
  }
}

export function stopScroll() { lenis?.stop(); document.body.classList.add('is-loading'); }
export function startScroll() { lenis?.start(); document.body.classList.remove('is-loading'); }

export { gsap, ScrollTrigger };
