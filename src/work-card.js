// One case-study card, shared by the home "selected works", /work/ and the case pages' "more work" row.
import { cases } from './data/cases.js';

const pad = (n) => String(n).padStart(2, '0');

function metricHtml(c) {
  const m = c.metric;
  if (!m) return `<div class="work-card__roles">${c.role.slice(0, 2).map((r) => `<span class="chip">${r}</span>`).join('')}</div>`;
  return `<div class="work-card__metric">
      <b>${m.prefix || ''}<span data-count="${m.value}" data-decimals="${m.decimals || 0}">${m.value}</span>${m.suffix}</b>
      <span>${m.label}</span>
    </div>`;
}

/**
 * @param c        case from data/cases.js
 * @param variant  'feature' (home, large) | 'grid' (/work/) | 'mini' (case page)
 */
export function workCard(c, { variant = 'grid', wide = false } = {}) {
  const no = pad(cases.indexOf(c) + 1);
  const media = c.cover
    ? `<img src="${c.cover}" alt="${c.brand} campaign" loading="lazy" decoding="async" class="${c.coverFit === 'contain' ? 'is-contain' : ''}" />`
    : `<span class="work-card__type"><span>${c.brand}</span></span>`;

  return `
  <a class="work-card work-card--${variant}${wide ? ' work-card--wide' : ''}" href="/work/${c.slug}.html" data-cursor="open" data-label="${c.brand}" data-category="${c.category}">
    <div class="work-card__media">
      ${media}
      <span class="work-card__stub smallcaps">case file ${no}</span>
    </div>
    <div class="work-card__body">
      <div class="work-card__meta smallcaps"><span>${c.sector}</span>${c.year ? `<span>${c.year}</span>` : ''}</div>
      <h3 class="work-card__brand">${c.brand}</h3>
      <p class="work-card__hook">${c.hook}</p>
      ${variant === 'mini' ? '' : `<div class="work-card__foot">${metricHtml(c)}<span class="work-card__cta">open the case <i>→</i></span></div>`}
    </div>
  </a>`;
}
