import { gsap, $, $$, finePointer, reduceMotion } from './core.js';

/* ───────── Custom cursor ───────── */
const LABELS = { open: 'open', play: 'play', copy: 'copy', up: 'up ▲', view: 'view', flip: 'flip', draw: 'draw', call: 'ring', admit: 'admit one', drag: 'drag', home: '', scroll: '', read: '' };

export function initCursor() {
  if (!finePointer) return;
  const cursor = $('.cursor');
  if (!cursor) return;
  document.body.classList.add('has-cursor');
  const dot = $('.cursor__dot', cursor);
  const ring = $('.cursor__ring', cursor);
  const label = $('.cursor__label', cursor);
  const dx = gsap.quickTo(dot, 'x', { duration: 0.12, ease: 'power3' });
  const dy = gsap.quickTo(dot, 'y', { duration: 0.12, ease: 'power3' });
  const rx = gsap.quickTo(ring, 'x', { duration: 0.55, ease: 'power3' });
  const ry = gsap.quickTo(ring, 'y', { duration: 0.55, ease: 'power3' });

  window.addEventListener('mousemove', (e) => {
    dx(e.clientX); dy(e.clientY); rx(e.clientX); ry(e.clientY);
    cursor.classList.remove('is-hidden');
  }, { passive: true });
  document.addEventListener('mouseleave', () => cursor.classList.add('is-hidden'));
  window.addEventListener('mousedown', () => cursor.classList.add('is-down'));
  window.addEventListener('mouseup', () => cursor.classList.remove('is-down'));

  document.addEventListener('mouseover', (e) => {
    const t = e.target.closest('[data-cursor]');
    const interactive = e.target.closest('a, button, summary, input, label');
    const key = t?.dataset.cursor;
    const text = key != null ? (t.dataset.cursorLabel ?? LABELS[key] ?? '') : '';
    label.textContent = text;
    cursor.classList.toggle('has-label', !!text);
    cursor.classList.toggle('is-hover', !text && !!(t || interactive));
  });
}

/* ───────── Magnetic elements ───────── */
export function initMagnetic(scope = document) {
  if (!finePointer || reduceMotion) return;
  $$('[data-magnetic]', scope).forEach((el) => {
    if (el._mag) return;
    el._mag = true;
    const strength = parseFloat(el.dataset.magnetic) || 0.32;
    const xTo = gsap.quickTo(el, 'x', { duration: 0.9, ease: 'elastic.out(1, 0.4)' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.9, ease: 'elastic.out(1, 0.4)' });
    let r = null;
    el.addEventListener('mouseenter', () => {
      r = el.getBoundingClientRect();
    }, { passive: true });
    el.addEventListener('mousemove', (e) => {
      if (!r) r = el.getBoundingClientRect();
      xTo((e.clientX - r.left - r.width / 2) * strength);
      yTo((e.clientY - r.top - r.height / 2) * strength);
    }, { passive: true });
    el.addEventListener('mouseleave', () => {
      r = null;
      xTo(0);
      yTo(0);
    });
  });
}

/* ───────── Text scramble ───────── */
const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ✦·';
export function scramble(el, final = el.dataset.text || el.textContent, speed = 2) {
  el.dataset.text = final;
  cancelAnimationFrame(el._raf);
  let frame = 0;
  const len = final.length;
  const run = () => {
    const done = Math.floor(frame / speed);
    let out = '';
    for (let i = 0; i < len; i++) {
      const ch = final[i];
      if (i < done || ch === ' ') {
        out += ch;
      } else {
        out += GLYPHS[(Math.random() * GLYPHS.length) | 0];
      }
    }
    el.textContent = out;
    frame++;
    if (done < len) el._raf = requestAnimationFrame(run);
    else el.textContent = final;
  };
  run();
}

export function initScramble(scope = document) {
  if (reduceMotion) return;
  $$('[data-scramble]', scope).forEach((el) => {
    el.dataset.text = el.textContent;
    el.addEventListener('mouseenter', () => scramble(el));
  });
}

/* ───────── Visitor name + greeting ───────── */
export function getVisitor() {
  return '';
}

export function initVisitor() {
  // Clear any legacy test visitor name from storage
  try { localStorage.removeItem('as-name'); } catch {}
}

/* ───────── Toast ───────── */
let toastEl;
export function toast(msg) {
  if (!toastEl) {
    toastEl = document.createElement('div');
    toastEl.className = 'toast';
    toastEl.setAttribute('role', 'status');
    document.body.appendChild(toastEl);
  }
  toastEl.innerHTML = msg;
  gsap.killTweensOf(toastEl);
  gsap.timeline()
    .fromTo(toastEl, { yPercent: 140, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.8, ease: 'expo.out' })
    .to(toastEl, { yPercent: 140, opacity: 0, duration: 0.6, ease: 'expo.in' }, '+=2.6');
}

/* ───────── Small delights ───────── */
export function initDelights() {
  // Tab title when the reader wanders off
  const original = document.title;
  document.addEventListener('visibilitychange', () => {
    document.title = document.hidden ? 'come back — your brand is calling ☎' : original;
  });

  // Easter egg: type "kathak" anywhere
  let buffer = '';
  window.addEventListener('keydown', (e) => {
    if (e.target.closest('input, textarea')) return;
    buffer = (buffer + e.key.toLowerCase()).slice(-6);
    if (buffer === 'kathak') {
      buffer = '';
      gsap.to('.brandmark__mono, .tarot--main, .service__tab', { rotation: '+=360', duration: 1.8, ease: 'expo.inOut', stagger: 0.06 });
      toast('<span>dhin dha!</span> a kathak spin, just for you');
    }
  });

  // IST clock
  const clocks = $$('.clock');
  if (clocks.length) {
    const fmt = new Intl.DateTimeFormat('en-IN', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', hour12: true });
    const tick = () => { const t = fmt.format(new Date()).toUpperCase(); clocks.forEach((c) => { c.textContent = t; }); };
    tick();
    setInterval(tick, 15000);
  }
}
