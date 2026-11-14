// Hand-drawn doodles + the one-line social strip.
// Markup hooks:  <span class="dd" data-doodle="camera"></span>   ·   <div data-oneline></div>
import { gsap, $, $$, reduceMotion, finePointer } from './motion/core.js';

/* ─────────── the sketchbook ───────────
   s = stroked paths (drawn on), f = filled bits (popped in after) */
const D = {
  sparkle: { vb: '0 0 100 100', s: ['M50 8 C53 38 62 47 92 50 C62 53 53 62 50 92 C47 62 38 53 8 50 C38 47 47 38 50 8Z'] },
  star: { vb: '0 0 100 100', s: ['M50 6 Q55 45 93 44 Q57 55 72 92 Q50 60 27 91 Q44 55 7 43 Q46 45 50 6Z'] },
  asterisk: { vb: '0 0 100 100', s: ['M50 18 V82 M22 34 L78 66 M22 66 L78 34'] },
  eyes: {
    vb: '0 -6 120 62',
    s: [
      'M30 12 C46 12 52 23 52 32 C52 44 42 50 30 50 C16 50 8 42 8 31 C8 20 16 12 30 12Z',
      'M90 12 C106 12 112 23 112 32 C112 44 102 50 90 50 C76 50 68 42 68 31 C68 20 76 12 90 12Z',
      'M16 16 l-5 -6 M28 11 l-1 -8 M40 13 l4 -7 M78 16 l-5 -6 M90 11 l-1 -8 M102 13 l4 -7',
    ],
    f: ['M38 33 a8 8 0 1 0 -0.1 0Z', 'M98 33 a8 8 0 1 0 -0.1 0Z'],
  },
  camera: {
    vb: '0 6 120 86',
    s: [
      'M14 34 Q14 28 20 28 H38 L44 18 H72 L78 28 H100 Q106 28 106 34 V80 Q106 86 100 86 H20 Q14 86 14 80 Z',
      'M82 57 A23 23 0 1 1 36 57 A23 23 0 1 1 82 57 M73 57 A14 14 0 1 1 45 57 A14 14 0 1 1 73 57',
      'M22 28 V22 H33 V28 M14 42 H32 M14 48 H30 M92 38 h1',
    ],
    f: ['M65 57 a6 6 0 1 0 -0.1 0Z'],
  },
  tripod: {
    vb: '0 0 80 140',
    s: ['M28 8 H52 V18 H28 Z M40 18 V40 M31 40 H49 V52 H31 Z', 'M34 52 L12 126 M40 52 V132 M46 52 L68 126', 'M7 127 h9 M36 133 h8 M64 127 h9 M20 96 l7 2 M37 96 h7 M53 98 l7 -2 M26 82 L40 72 L54 82'],
  },
  coffee: {
    vb: '0 -14 80 124',
    s: ['M14 22 Q14 14 22 14 H58 Q66 14 66 22 V28 H14 Z', 'M18 28 L24 100 Q24 104 28 104 H52 Q56 104 56 100 L62 28', 'M20 50 H60 M22 76 H58 M29 55 V71 M37 55 V71 M45 55 V71 M53 55 V71', 'M32 6 q-5 -5 0 -10 q5 -5 0 -10 M48 6 q-5 -5 0 -10 q5 -5 0 -10'],
  },
  burger: {
    vb: '0 14 120 76',
    s: [
      'M14 44 C14 16 106 16 106 44 Z',
      'M40 30 l5 -2 M60 25 h5 M78 31 l4 3 M50 37 l4 -2 M70 39 l4 1 M30 38 l3 -3',
      'M10 50 q8 6 16 0 q8 6 16 0 q8 6 16 0 q8 6 16 0 q8 6 16 0 q8 6 16 0 q7 5 14 0',
      'M16 58 Q10 58 10 64 Q10 70 16 70 H104 Q110 70 110 64 Q110 58 104 58 Z',
      'M16 75 H104 Q106 86 96 86 H24 Q14 86 16 75 Z',
    ],
  },
  fries: {
    vb: '0 0 90 110',
    s: [
      'M22 50 L16 14 L23 12 L30 50 M34 52 L32 6 L40 6 L41 52 M46 52 L50 10 L57 12 L53 52 M58 50 L66 18 L72 20 L66 50',
      'M14 46 L24 104 H66 L76 46 Q45 60 14 46 Z',
      'M30 58 L34 98 M45 60 V100 M60 58 L56 98',
    ],
  },
  taco: {
    vb: '0 10 110 56',
    s: ['M14 36 q5 -9 11 -3 q5 -9 11 -3 q5 -9 11 -3 q5 -9 11 -3 q5 -9 11 -3 q5 -9 11 -3 q5 -8 10 0', 'M10 60 C10 24 100 24 100 60 Z', 'M34 50 h1 M48 44 h1 M62 52 h1 M76 46 h1 M42 56 h1 M84 54 h1 M24 54 h1'],
  },
  drink: {
    vb: '0 2 100 106',
    s: [
      'M16 32 L22 100 Q22 104 26 104 H62 Q66 104 66 100 L72 32',
      'M16 32 Q44 38 72 32 Q44 26 16 32 M20 52 Q44 58 69 52',
      'M30 66 h12 v12 h-12 Z M48 74 l10 -4 l4 10 l-10 4 Z',
      'M94 24 A18 18 0 1 1 58 24 A18 18 0 1 1 94 24 M76 24 V8 M76 24 L90 16 M76 24 L90 32 M76 24 L62 16 M76 24 L62 32 M76 24 V40',
    ],
  },
  cloud: { vb: '0 4 100 52', s: ['M20 50 Q8 50 8 40 Q8 30 20 30 Q20 14 38 14 Q50 4 62 14 Q78 10 82 26 Q94 28 92 40 Q92 50 80 50 Z', 'M30 34 q6 -6 12 0'] },
  pen: { vb: '0 0 40 118', s: ['M14 12 Q20 4 26 12 V84 L20 104 L14 84 Z', 'M26 18 H31 V50 Q31 54 27 54 M14 70 H26 M14 76 H26 M20 104 V112'] },
  laptop: {
    vb: '0 2 140 96',
    s: ['M24 8 H116 V70 H24 Z M30 14 H110 V64 H30 Z', 'M24 70 L6 90 Q6 94 10 94 H130 Q134 94 134 90 L116 70', 'M30 76 H110 M24 81 H52 M88 81 H116 M56 84 H84 L86 90 H54 Z'],
  },
  book: {
    vb: '0 2 140 92',
    s: [
      'M70 20 C55 10 30 8 12 14 V76 C30 70 55 72 70 82 C85 72 110 70 128 76 V14 C110 8 85 10 70 20 Z M70 20 V82',
      'M22 28 Q40 24 60 30 M22 38 Q40 34 60 40 M22 48 Q40 44 56 50 M80 30 Q100 24 118 28 M80 40 Q100 34 118 38 M84 50 Q100 44 118 48',
      'M12 76 L10 84 C30 78 55 80 70 88 C85 80 110 78 130 84 L128 76',
    ],
  },
};

const NS = 'http://www.w3.org/2000/svg';
const svgOf = (name) => {
  const d = D[name];
  if (!d) return '';
  const s = d.s.map((p) => `<path class="dd__s" pathLength="1" d="${p}"/>`).join('');
  const f = (d.f || []).map((p) => `<path class="dd__f" d="${p}"/>`).join('');
  return `<svg viewBox="${d.vb}" aria-hidden="true" focusable="false">${s}${f}</svg>`;
};

/* ─────────── one continuous line through the feeds ─────────── */
// Each icon: enter/exit points relative to its centre, and the body traced between them.
const ICONS = [
  { e: [0, 94], x: [0, 94], d: (c) => `H${c - 18} Q${c - 30} 94 ${c - 30} 82 V46 Q${c - 30} 34 ${c - 18} 34 H${c + 18} Q${c + 30} 34 ${c + 30} 46 V82 Q${c + 30} 94 ${c + 18} 94 H${c} M${c + 14} 64 A14 14 0 1 0 ${c - 14} 64 A14 14 0 1 0 ${c + 14} 64 M${c + 20} 44 h0.5` }, // instagram
  { e: [-16, 94], x: [18, 94], d: (c) => `V54 M${c - 16} 42 v0.5 M${c - 3} 94 V54 M${c - 3} 66 Q${c - 3} 52 ${c + 8} 52 Q${c + 18} 52 ${c + 18} 64 V94` }, // in
  { e: [0, 92], x: [0, 92], d: (c) => `H${c - 24} Q${c - 34} 92 ${c - 34} 82 V54 Q${c - 34} 44 ${c - 24} 44 H${c + 24} Q${c + 34} 44 ${c + 34} 54 V82 Q${c + 34} 92 ${c + 24} 92 H${c} M${c - 7} 57 L${c + 11} 68 L${c - 7} 79 Z` }, // youtube
  { e: [0, 92], x: [0, 92], d: (c) => `C${c - 14} 80 ${c - 32} 70 ${c - 32} 54 C${c - 32} 38 ${c - 10} 34 ${c} 50 C${c + 10} 34 ${c + 32} 38 ${c + 32} 54 C${c + 32} 70 ${c + 14} 80 ${c} 92` }, // like
  { e: [-22, 96], x: [-22, 96], d: (c) => `L${c - 8} 82 H${c + 22} Q${c + 32} 82 ${c + 32} 72 V48 Q${c + 32} 38 ${c + 22} 38 H${c - 22} Q${c - 32} 38 ${c - 32} 48 V72 Q${c - 32} 82 ${c - 22} 82 H${c - 17} L${c - 22} 96 M${c - 12} 60 h0.5 M${c} 60 h0.5 M${c + 12} 60 h0.5` }, // comment
  { e: [-10, 94], x: [6, 94], d: (c) => `L${c - 3} 40 M${c - 22} 56 H${c + 24} M${c - 26} 76 H${c + 20} M${c + 13} 40 L${c + 6} 94` }, // hashtag
  { e: [-8, 94], x: [8, 94], d: (c) => `V86 C${c - 8} 78 ${c - 24} 70 ${c - 24} 56 A24 24 0 0 1 ${c + 24} 56 C${c + 24} 70 ${c + 8} 78 ${c + 8} 86 V94 M${c - 8} 87 H${c + 8} M${c} 24 v-8 M${c - 30} 32 l-6 -5 M${c + 30} 32 l6 -5` }, // idea
];

function onelinePath() {
  const W = 1200, B = 142, gap = W / (ICONS.length + 1);
  let d = `M-20 ${B - 6} C20 ${B - 10} 40 ${B + 4} ${gap - 46} ${B}`;
  ICONS.forEach((ic, i) => {
    const c = Math.round(gap * (i + 1));
    const [ex, ey] = [c + ic.e[0], ic.e[1]];
    const [xx, xy] = [c + ic.x[0], ic.x[1]];
    if (i > 0) d += ` C${c - gap + 60} ${B + (i % 2 ? 9 : -9)} ${c - 70} ${B + (i % 2 ? -7 : 7)} ${c - 46} ${B}`;
    d += ` C${c - 20} ${B} ${ex} ${B - 12} ${ex} ${ey} ${ic.d(c)}`;
    d += ` M${xx} ${xy} C${xx} ${B - 12} ${c + 20} ${B} ${c + 46} ${B}`;
  });
  d += ` C${W - 40} ${B + 8} ${W - 10} ${B - 8} ${W + 20} ${B - 4}`;
  return d;
}

/* ─────────── wiring ─────────── */
export function render() {
  if (!$('#dd-wobble')) {
    const s = document.createElementNS(NS, 'svg');
    s.setAttribute('width', '0'); s.setAttribute('height', '0'); s.setAttribute('aria-hidden', 'true');
    s.style.position = 'absolute';
    s.innerHTML = '<filter id="dd-wobble"><feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="2" seed="4"/><feDisplacementMap in="SourceGraphic" scale="2.6"/></filter>';
    document.body.prepend(s);
  }
  $$('[data-doodle]').forEach((el) => { el.innerHTML = svgOf(el.dataset.doodle); });
  $$('[data-oneline]').forEach((el) => {
    el.innerHTML = `<svg class="oneline__svg" viewBox="0 0 1200 160" preserveAspectRatio="xMidYMid meet" aria-hidden="true" focusable="false"><path class="dd__s" pathLength="1" d="${onelinePath()}"/></svg>`;
  });
}

export function animate() {
  initEyes();
  if (reduceMotion) return;

  // doodles: ink themselves in, then idle-bob
  $$('.dd').forEach((el, i) => {
    const strokes = $$('.dd__s', el);
    const fills = $$('.dd__f', el);
    gsap.set(strokes, { strokeDasharray: '1 1.02', strokeDashoffset: 1, opacity: 0 });
    gsap.set(fills, { scale: 0, transformOrigin: '50% 50%', transformBox: 'fill-box' });
    gsap.timeline({ scrollTrigger: { trigger: el, start: 'top 92%' }, delay: parseFloat(el.dataset.delay || 0) + (i % 4) * 0.12 })
      .to(strokes, { opacity: 1, duration: 0.01, stagger: 0.28 }, 0)
      .to(strokes, { strokeDashoffset: 0, duration: 0.9, ease: 'power2.inOut', stagger: 0.28 }, 0)
      .to(fills, { scale: 1, duration: 0.5, ease: 'back.out(3)', stagger: 0.08 }, '-=0.3');
    if (el.hasAttribute('data-float')) {
      gsap.to(el, { y: gsap.utils.random(-10, -5), rotate: `+=${gsap.utils.random(-5, 5)}`, duration: gsap.utils.random(2.4, 3.6), ease: 'sine.inOut', yoyo: true, repeat: -1, delay: gsap.utils.random(0, 1.5) });
    }
  });

  // parallax drift in the scattered fields
  $$('[data-doodle-field]').forEach((field) => {
    $$('.dd', field).forEach((el) => {
      const depth = parseFloat(el.dataset.depth || gsap.utils.random(-60, 60));
      gsap.fromTo(el, { yPercent: depth * 0.5 }, { yPercent: -depth * 0.5, ease: 'none', scrollTrigger: { trigger: field, start: 'top bottom', end: 'bottom top', scrub: true } });
    });
  });

  // the one-liner: the pen follows your scroll
  $$('[data-oneline]').forEach((el) => {
    const p = $('.dd__s', el);
    gsap.set(p, { strokeDasharray: '1 1.02', strokeDashoffset: 1 });
    gsap.to(p, { strokeDashoffset: 0, ease: 'none', scrollTrigger: { trigger: el, start: 'top 95%', end: 'bottom 35%', scrub: 0.8 } });
  });
}

// googly eyes: pupils follow the cursor, and blink now and then
function initEyes() {
  const sets = $$('[data-doodle="eyes"]');
  if (!sets.length) return;
  sets.forEach((el) => {
    const svg = $('svg', el);
    if (!reduceMotion) {
      gsap.timeline({ repeat: -1, repeatDelay: gsap.utils.random(2.5, 5) })
        .to(svg, { scaleY: 0.1, duration: 0.08, transformOrigin: '50% 60%' })
        .to(svg, { scaleY: 1, duration: 0.12 });
    }
  });
  if (!finePointer || reduceMotion) return;
  const pupils = sets.flatMap((el) =>
    $$('.dd__f', el).map((p) => ({
      p,
      host: el,
      r: null,
      x: gsap.quickTo(p, 'x', { duration: 0.4, ease: 'power3' }),
      y: gsap.quickTo(p, 'y', { duration: 0.4, ease: 'power3' }),
    }))
  );

  const updateRects = () => {
    pupils.forEach((item) => {
      item.r = item.host.getBoundingClientRect();
    });
  };
  window.addEventListener('scroll', updateRects, { passive: true });
  window.addEventListener('resize', updateRects, { passive: true });

  let ticking = false;
  let lastEvent = null;

  window.addEventListener(
    'mousemove',
    (e) => {
      lastEvent = e;
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          ticking = false;
          if (!lastEvent) return;
          const cx = lastEvent.clientX;
          const cy = lastEvent.clientY;
          pupils.forEach((item) => {
            if (!item.r) item.r = item.host.getBoundingClientRect();
            const r = item.r;
            if (r.bottom < -100 || r.top > innerHeight + 100) return;
            const a = Math.atan2(cy - (r.top + r.height / 2), cx - (r.left + r.width / 2));
            item.x(Math.cos(a) * 5);
            item.y(Math.sin(a) * 4);
          });
        });
      }
    },
    { passive: true }
  );
}

