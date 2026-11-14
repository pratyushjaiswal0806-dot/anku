import './styles/base.css';
import './styles/home.css';
import './styles/case.css';
import './styles/about.css';
import './styles/work.css';
import './styles/contact.css';
import './styles/doodles.css';

import { ScrollTrigger, initScroll, scrollToTarget, reduceMotion, $ } from './motion/core.js';
import { initCursor, initMagnetic, initScramble, initVisitor, initDelights } from './motion/interactions.js';
import * as doodles from './doodles.js';
import { initTransitions, initHeader, initFooter, initReveals } from './motion/chrome.js';

if (reduceMotion) document.documentElement.classList.add('reduce-motion');
if ('scrollRestoration' in history) history.scrollRestoration = 'manual';

async function boot() {
  initScroll();
  initTransitions();

  const page = document.body.dataset.page;
  // Page modules render their DOM first, then the shared chrome wires up to it.
  const mod =
    page === 'case' ? await import('./case.js')
    : page === 'about' ? await import('./about.js')
    : page === 'work' ? await import('./work.js')
    : page === 'contact' ? await import('./contact.js')
    : await import('./home.js');
  mod.render?.();
  doodles.render();

  initFooter();
  initVisitor();
  initCursor();
  initMagnetic();
  initScramble();
  initDelights();
  initHeader();
  initReveals();
  mod.animate?.();
  doodles.animate();

  await Promise.race([document.fonts?.ready, new Promise((r) => setTimeout(r, 600))]);
  ScrollTrigger.refresh();

  if (location.hash) {
    const target = $(location.hash);
    if (target) scrollToTarget(target, { immediate: true });
  } else {
    window.scrollTo(0, 0);
  }

  await mod.intro?.();
}

boot();

// Keep triggers honest after late-loading images
window.addEventListener('load', () => ScrollTrigger.refresh());
