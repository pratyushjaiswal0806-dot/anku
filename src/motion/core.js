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
  lenis = new Lenis({ lerp: 0.085, wheelMultiplier: 0.95, smoothWheel: true });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((t) => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
  return lenis;
}

export function scrollToTarget(target, opts = {}) {
  const el = typeof target === 'string' ? (target === '#' || target === '#top' ? 0 : $(target)) : target;
  if (el == null) return;
  if (lenis) lenis.scrollTo(el, { duration: 1.8, easing: (t) => 1 - Math.pow(1 - t, 4), ...opts });
  else if (el === 0) window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
  else el.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
}

export function stopScroll() { lenis?.stop(); document.body.classList.add('is-loading'); }
export function startScroll() { lenis?.start(); document.body.classList.remove('is-loading'); }

export { gsap, ScrollTrigger };
