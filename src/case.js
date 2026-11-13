import { gsap, ScrollTrigger, $, $$, reduceMotion } from './motion/core.js';
import { splitChars, splitWords } from './motion/split.js';
import { isArriving, openLift, countUp } from './motion/chrome.js';
import { caseBySlug, nextCase, prevCase, relatedCases, cases } from './data/cases.js';
import { workCard } from './work-card.js';

const slug = document.body.dataset.slug;
const c = caseBySlug(slug);

const pad = (n) => String(n).padStart(2, '0');
const fmtMetric = (m) => `${m.prefix || ''}${m.value}${m.suffix}`;
const counter = (v, { prefix = '', suffix = '', decimals = 0 } = {}) =>
  `${prefix}<span data-count="${v}" data-decimals="${decimals}">${v}</span>${suffix}`;

/** One chapter of the case file: numbered header + body. */
function chapter({ id, no, label, title, body, cls = '' }) {
  return `
  <section class="cs ${cls}" id="${id}">
    <header class="cs-head">
      <span class="cs-head__no">${no}</span>
      <span class="cs-head__label smallcaps">${label}</span>
      <h2 class="cs-head__title">${title}</h2>
    </header>
    <div class="cs-body">${body}</div>
  </section>`;
}

function craftChapter() {
  if (c.pillars) {
    return {
      label: 'the craft',
      title: 'how it <em>came together</em>',
      body: `<div class="cs-cards cs-cards--pillars">${c.pillars
        .map((p, i) => `<article class="cs-card"><span class="cs-card__no">${pad(i + 1)}</span><h3>${p.title}</h3><p>${p.text}</p></article>`)
        .join('')}</div>`,
    };
  }
  if (c.campaigns) {
    return {
      label: 'the campaigns',
      title: `${c.campaigns.length} briefs, <em>one sensibility</em>`,
      body: `<div class="cs-campaigns">${c.campaigns
        .map(
          (k, i) => `<article class="cs-campaign">
            <div class="cs-campaign__top"><span class="cs-card__no">${pad(i + 1)}</span><span class="cs-campaign__kind">${k.kind}</span></div>
            <h3>${k.title}</h3>
            <p>${k.objective}</p>
            <ul class="cs-ticks">${k.did.map((d) => `<li>${d}</li>`).join('')}</ul>
          </article>`
        )
        .join('')}</div>`,
    };
  }
  if (c.did.length) {
    return {
      label: 'what i did',
      title: 'the work, <em>step by step</em>',
      body: `<ol class="cs-cards cs-cards--did">${c.did
        .map((d, i) => `<li class="cs-card"><span class="cs-card__no">${pad(i + 1)}</span><p class="cs-card__text">${d}</p></li>`)
        .join('')}</ol>`,
    };
  }
  return null;
}

export function render() {
  if (!c) return;
  document.title = `${c.brand} — Case file ${c.numeral} · Ankita Shah`;
  const idx = cases.indexOf(c) + 1;
  const n = nextCase(slug);
  const p = prevCase(slug);
  const m = c.metric;
  const scope = c.did.length || c.pillars?.length || c.campaigns?.length || 0;
  const scopeLabel = c.campaigns ? 'campaigns' : c.pillars ? 'workstreams' : 'deliverables';

  /* ── hero ── */
  const cover = c.cover
    ? `<img src="${c.cover}" alt="${c.brand} campaign" class="${c.coverFit === 'contain' ? 'is-contain' : ''}" />`
    : `<span class="case-hero__type"><span>${c.brand}</span></span>`;

  const facts = [
    ['client', c.brand],
    ['sector', c.sector],
    ['my role', c.role.slice(0, 2).join(' · ')],
    ['scope', scope ? `${scope} ${scopeLabel}` : c.role.length + ' disciplines'],
    m ? ['headline result', `<b>${fmtMetric(m)}</b> ${m.label.toLowerCase()}`] : null,
  ].filter(Boolean);

  /* ── chapters ── */
  const chapters = [];
  chapters.push({
    id: 'brief',
    label: 'the brief',
    title: 'what the brand <em>needed</em>',
    body: `<p class="cs-lead" data-scrub>${c.objective}</p>`,
  });
  chapters.push({
    id: 'role',
    label: 'my role',
    title: 'where i <em>came in</em>',
    body: `${c.roleText ? `<p class="cs-text">${c.roleText}</p>` : ''}
      <ul class="cs-roles">${c.role.map((r, i) => `<li><span>${pad(i + 1)}</span>${r}</li>`).join('')}</ul>`,
  });
  const craft = craftChapter();
  if (craft) chapters.push({ id: 'craft', ...craft, cls: 'cs--craft' });
  chapters.forEach((ch, i) => { ch.no = pad(i + 1); });

  let no = chapters.length;
  const toc = chapters.map((ch) => ({ id: ch.id, no: ch.no, label: ch.label }));

  const outcome = m || c.stats
    ? (() => {
        const o = { id: 'outcome', no: pad(++no), label: 'the outcome' };
        toc.push(o);
        return `<section class="case-outcome checker" id="outcome" data-theme="dark">
          <header class="cs-head cs-head--center">
            <span class="cs-head__no">${o.no}</span>
            <span class="cs-head__label smallcaps">the outcome</span>
          </header>
          ${m ? `<span class="case-outcome__num">${counter(m.value, m)}</span>
          <span class="case-outcome__label">${m.label}</span>
          ${m.note ? `<span class="case-outcome__note smallcaps">${m.note}</span>` : ''}` : ''}
          ${c.stats ? `<div class="case-stats">${c.stats.map((s) => `<div class="case-stat"><strong>${counter(s.value, s)}</strong><span class="case-stat__label">${s.label}</span></div>`).join('')}</div>` : ''}
        </section>`;
      })()
    : '';

  const hasLinks = c.gallery.some((g) => g.href);
  const gallery = c.gallery.length
    ? (() => {
        const o = { id: 'gallery', no: pad(++no), label: 'the gallery' };
        toc.push(o);
        return `<section class="case-gallery" id="gallery" data-theme="dark">
          <div class="case-gallery__head">
            <header class="cs-head">
              <span class="cs-head__no">${o.no}</span>
              <span class="cs-head__label smallcaps">the gallery · ${c.gallery.length} frames</span>
              <h2 class="cs-head__title">the work, <em>in the wild</em></h2>
            </header>
            ${hasLinks ? '<span class="script">tap a frame to watch it on instagram ↗</span>' : ''}
          </div>
          <div class="gallery">
            ${c.gallery
              .map((g, i) => {
                const tag = g.href ? 'a' : 'figure';
                const attrs = g.href ? `href="${g.href}" target="_blank" rel="noopener" data-cursor="view"` : '';
                return `<${tag} class="gallery__item" ${attrs}>
                  <div class="gallery__img"><img src="${g.src}" alt="${g.caption}" loading="lazy" /></div>
                  <div class="gallery__cap"><i>${pad(i + 1)}</i><span>${g.caption}</span>${g.href ? '<b>↗</b>' : ''}</div>
                </${tag}>`;
              })
              .join('')}
          </div>
        </section>`;
      })()
    : '';

  $('#main').innerHTML = `
    <section class="case-hero">
      <div class="case-hero__top smallcaps">
        <a href="/work/" class="u-link" data-label="work">← all work</a>
        <span class="rule"></span>
        <span>case file ${pad(idx)} / ${pad(cases.length)}</span>
      </div>

      <div class="case-hero__grid">
        <div class="case-hero__copy">
          <span class="case-hero__sector chip">${c.sector}</span>
          <h1 class="case-hero__title display">${c.brand}</h1>
          <p class="case-hero__hook">${c.hook}</p>
          ${c.mock ? '<span class="case-mock">♥ placeholder case study — content coming soon</span>' : ''}
        </div>
        <figure class="case-hero__cover">
          <div class="case-hero__frame">${cover}</div>
          <figcaption class="case-hero__stub smallcaps">case file ${pad(idx)}</figcaption>
        </figure>
      </div>

      <dl class="case-facts">
        ${facts.map(([k, v]) => `<div class="case-facts__item"><dt class="smallcaps">${k}</dt><dd>${v}</dd></div>`).join('')}
      </dl>
    </section>

    <div class="case-body">
      <aside class="case-toc" aria-label="In this case file">
        <span class="smallcaps case-toc__head">in this case file</span>
        <ol>${toc.map((t) => `<li><a href="#${t.id}" data-toc="${t.id}"><i>${t.no}</i>${t.label}</a></li>`).join('')}</ol>
      </aside>
      <div class="case-chapters">
        ${chapters.map(chapter).join('')}
      </div>
    </div>

    ${outcome}
    ${gallery}

    <section class="more-work">
      <div class="sec-head">
        <h2 class="h2">more <em>work</em></h2>
        <a class="sec-head__link u-link" href="/work/" data-label="work">all ${cases.length} case files <i>→</i></a>
      </div>
      <div class="more-work__grid">${relatedCases(slug, 3, [p.slug, n.slug]).map((o) => workCard(o, { variant: 'mini' })).join('')}</div>
    </section>

    <nav class="case-pager" aria-label="Case files">
      <a class="case-pager__link case-pager__link--prev" href="/work/${p.slug}.html" data-cursor="open" data-label="${p.brand}">
        <span class="script">← previous floor</span>
        <span class="case-pager__title">${p.brand}</span>
      </a>
      <a class="case-pager__link case-pager__link--next" href="/work/${n.slug}.html" data-cursor="open" data-label="${n.brand}">
        <span class="script">next floor →</span>
        <span class="case-pager__title">${n.brand}</span>
        <span class="case-pager__hook">${n.hook}</span>
      </a>
    </nav>`;
}

function heroIntro() {
  const chars = splitChars($('.case-hero__title'));
  gsap.timeline({ defaults: { ease: 'expo.out' } })
    .from('.site-header', { yPercent: -100, opacity: 0, duration: 1.2, clearProps: 'transform,opacity' }, 0)
    .from('.case-hero__top > *', { opacity: 0, y: 14, duration: 1, stagger: 0.1 }, 0.1)
    .from('.case-hero__top .rule', { scaleX: 0, duration: 1.6, ease: 'expo.inOut' }, 0)
    .from('.case-hero__sector', { opacity: 0, y: 16, duration: 1 }, 0.1)
    .from(chars, { yPercent: 115, rotate: 8, duration: 1.4, stagger: 0.03 }, 0.15)
    .from('.case-hero__hook', { y: 30, opacity: 0, duration: 1.2 }, 0.55)
    .from('.case-hero__cover', { yPercent: 18, rotate: 8, opacity: 0, duration: 1.6 }, 0.2)
    .from('.case-facts__item', { y: 24, opacity: 0, duration: 1.1, stagger: 0.07 }, 0.7);
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

/* contents sidebar follows the chapter in view */
function initToc() {
  const links = $$('.case-toc a');
  const set = (id) => links.forEach((a) => a.classList.toggle('is-active', a.dataset.toc === id));
  links.forEach((a) => {
    const sec = $(`#${a.dataset.toc}`);
    if (!sec) return;
    ScrollTrigger.create({ trigger: sec, start: 'top 45%', end: 'bottom 45%', onToggle: (self) => self.isActive && set(a.dataset.toc) });
  });
}

export function animate() {
  if (!c) return;
  initToc();
  if (reduceMotion) {
    $$('main [data-count]').forEach((el) => countUp(el));
    return;
  }

  gsap.to('.case-hero__frame img', { yPercent: 8, ease: 'none', scrollTrigger: { trigger: '.case-hero', start: 'top top', end: 'bottom top', scrub: true } });

  // chapter headers + paragraphs ink in
  $$('.cs-head').forEach((h) => {
    gsap.from(h.children, { y: 30, opacity: 0, duration: 1.1, stagger: 0.07, ease: 'expo.out', scrollTrigger: { trigger: h, start: 'top 85%' } });
  });
  $$('[data-scrub]').forEach((p) => {
    const w = splitWords(p);
    gsap.set(w, { opacity: 0.16 });
    gsap.to(w, { opacity: 1, stagger: 0.1, ease: 'none', scrollTrigger: { trigger: p, start: 'top 80%', end: 'bottom 55%', scrub: true } });
  });
  $$('.cs-roles, .cs-cards, .cs-campaigns').forEach((g) => {
    gsap.from(g.children, { y: 50, opacity: 0, duration: 1.1, stagger: 0.08, ease: 'expo.out', clearProps: 'transform,opacity', scrollTrigger: { trigger: g, start: 'top 85%' } });
  });

  // outcome
  $$('.case-outcome [data-count]').forEach((el) => countUp(el, { trigger: '.case-outcome', start: 'top 65%' }));
  gsap.from('.case-outcome__label, .case-outcome__note, .case-stat', { y: 30, opacity: 0, duration: 1.2, stagger: 0.1, ease: 'expo.out', scrollTrigger: { trigger: '.case-outcome', start: 'top 55%' } });

  // gallery
  $$('.gallery__item').forEach((g, i) => {
    gsap.from(g, { y: 80 + (i % 3) * 30, opacity: 0, duration: 1.3, ease: 'expo.out', scrollTrigger: { trigger: g, start: 'top 95%' } });
  });

  gsap.from('.more-work .sec-head > *', { y: 40, opacity: 0, duration: 1.2, stagger: 0.08, ease: 'expo.out', scrollTrigger: { trigger: '.more-work', start: 'top 80%' } });
  gsap.set('.more-work .work-card', { transition: 'none' });
  gsap.from('.more-work .work-card', { y: 80, opacity: 0, duration: 1.3, stagger: 0.1, ease: 'expo.out', clearProps: 'transform,opacity,transition', scrollTrigger: { trigger: '.more-work__grid', start: 'top 85%' } });
  gsap.from('.case-pager__title', { yPercent: 40, opacity: 0, duration: 1.4, stagger: 0.1, ease: 'expo.out', scrollTrigger: { trigger: '.case-pager', start: 'top 85%' } });
}
