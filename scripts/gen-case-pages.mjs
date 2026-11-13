// Generates the secondary pages from one shared shell:
//   /about.html and /work/<slug>.html (case content is rendered client-side from src/data/cases.js).
// Runs automatically before `npm run dev` and `npm run build`.
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { cases, sideProjects } from '../src/data/cases.js';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

const shell = ({ title, description, body, main }) => `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${esc(title)}</title>
    <meta name="description" content="${esc(description)}" />
    <meta name="theme-color" content="#5a1820" />
    <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Manrope:wght@400;500;600;700&family=Nothing+You+Could+Do&family=Poppins:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
    <script>try{var d=document.documentElement;d.classList.add('no-loader');if(sessionStorage.getItem('as-nav'))d.classList.add('is-arriving')}catch(e){}</script>
    <script type="module" src="/src/main.js"></script>
  </head>
  <body ${body}>
    <div class="lift" aria-hidden="true">
      <div class="lift__door lift__door--l"></div>
      <div class="lift__door lift__door--r"></div>
      <div class="lift__sign"><span class="lift__arrow">▲</span><span class="lift__label">going up</span><span class="lift__floor">G</span></div>
      <span class="lift__hint"></span>
    </div>
    <div class="cursor is-hidden" aria-hidden="true"><div class="cursor__dot"></div><div class="cursor__ring"><span class="cursor__label"></span></div></div>

    <header class="site-header">
      <a href="/" class="brandmark" data-magnetic data-label="home"><span class="brandmark__mono"><span>as</span></span>ankita shah</a>
      <nav class="nav" aria-label="Primary">
        <a href="/#brands" data-label="brands">brands</a>
        <a href="/#expertise" data-label="expertise">expertise</a>
        <a href="/work/" data-label="work" data-section="work">work</a>
        <a href="/about.html" data-label="about">about</a>
        <a href="/#contact" data-label="contact">contact</a>
      </nav>
      <a href="/#contact" class="status" data-magnetic data-label="contact"><span class="status__dot"></span>open to new briefs</a>
      <button class="mobile-nav-toggle" type="button" aria-label="Toggle navigation menu" aria-expanded="false" aria-controls="mobile-nav">
        <span class="mobile-nav-toggle__bar"></span>
        <span class="mobile-nav-toggle__bar"></span>
      </button>
    </header>
    <div class="mobile-drawer" id="mobile-nav" aria-hidden="true">
      <div class="mobile-drawer__backdrop"></div>
      <div class="mobile-drawer__dialog" role="dialog" aria-modal="true" aria-label="Navigation menu">
        <nav class="mobile-drawer__nav">
          <a href="/#brands" class="mobile-drawer__link" data-label="brands"><i>01</i> brands</a>
          <a href="/#expertise" class="mobile-drawer__link" data-label="expertise"><i>02</i> expertise</a>
          <a href="/work/" class="mobile-drawer__link" data-label="work" data-section="work"><i>03</i> work</a>
          <a href="/about.html" class="mobile-drawer__link" data-label="about"><i>04</i> about</a>
          <a href="/#contact" class="mobile-drawer__link" data-label="contact"><i>05</i> contact</a>
        </nav>
        <div class="mobile-drawer__foot">
          <a href="/#contact" class="btn btn--wine mobile-drawer__cta" data-label="contact"><span>open to new briefs</span><i>↘</i></a>
          <div class="mobile-drawer__meta">
            <a href="mailto:ankitashah.work@gmail.com" class="u-link">ankitashah.work@gmail.com</a>
            <span class="smallcaps">local time in india — <span class="clock">--:--</span></span>
          </div>
        </div>
      </div>
    </div>
    <div class="progress" aria-hidden="true"><span></span></div>

    <main id="main">${main}</main>

    <footer class="footer" data-theme="dark">
      <div class="footer__grid">
        <div class="footer__col">
          <span class="smallcaps footer__head">index</span>
          <ol class="footer__index">
            <li><a href="/#brands" data-label="brands"><i>01</i> brands</a></li>
            <li><a href="/#expertise" data-label="expertise"><i>02</i> expertise</a></li>
            <li><a href="/work/" data-label="work"><i>03</i> work</a></li>
            <li><a href="/about.html" data-label="about"><i>04</i> about</a></li>
            <li><a href="/#contact" data-label="contact"><i>05</i> contact</a></li>
          </ol>
        </div>
        <div class="footer__col">
          <span class="smallcaps footer__head">the case files</span>
          <ol class="footer__index footer__index--works"></ol>
        </div>
        <div class="footer__col footer__col--right">
          <span class="smallcaps footer__head">correspondence</span>
          <a class="u-link footer__mail" href="mailto:ankitashah.work@gmail.com">ankitashah.work@gmail.com</a>
          <!-- TODO: real profile / résumé URLs -->
          <ul class="footer__social"><li><a href="#" target="_blank" rel="noopener" class="u-link">linkedin ↗</a></li><li><a href="#" target="_blank" rel="noopener" class="u-link">instagram ↗</a></li><li><a href="#" target="_blank" rel="noopener" class="u-link">résumé ↓</a></li></ul>
          <p class="footer__clock smallcaps">local time in india — <span class="clock">--:--</span></p>
          <button class="totop" type="button" data-magnetic data-cursor="up"><span class="totop__box">▲</span>going up</button>
        </div>
      </div>
      <span class="footer__big">ankita <em>shah</em></span>
      <div class="footer__base smallcaps"><span>© 2025 ankita shah</span><span>made with care, and a little chutzpah</span></div>
    </footer>
  </body>
</html>
`;

/* ───────── Case pages ───────── */
mkdirSync(join(root, 'work'), { recursive: true });
for (const c of cases) {
  writeFileSync(
    join(root, 'work', `${c.slug}.html`),
    shell({
      title: `${c.brand} — Case file ${c.numeral} · Ankita Shah`,
      description: `${c.hook} A case study by Ankita Shah, marketing & brand strategist.`,
      body: `data-page="case" data-slug="${c.slug}"`,
      main: '',
    })
  );
}

/* ───────── Work index: /work/ ───────── */
writeFileSync(
  join(root, 'work', 'index.html'),
  shell({
    title: 'Work — Case studies by Ankita Shah, Marketing & Brand Strategist',
    description: `All ${cases.length} case studies by Ankita Shah: brand strategy, social media, content direction and creator partnerships across fashion, F&B, healthcare, enterprise and tech.`,
    body: 'data-page="work"',
    main: '',
  })
);

/* ───────── About page ───────── */
const about = `
      <section class="about-hero">
        <h1 class="about-hero__title display" data-split-lines>the <em>longer</em> version.</h1>
        <div class="about-hero__grid">
          <figure class="about-hero__photo"><img src="/assets/img/adaniconnex.webp" alt="Ankita at AdaniConneX Data Centers" /><figcaption class="script">on the job, adani connex ↑</figcaption></figure>
          <div class="about-hero__text">
            <p class="about-hero__lead" data-scrub>I’ve worked across agency, in-house and freelance projects, building experience in account management, brand strategy, content direction, and creator partnerships.</p>
            <p>Working across different environments has given me a balanced perspective on both the business and creative sides of marketing. From enterprise pages at Adani to a children’s snack label, from premium gin to a women’s oncology centre, the category changes; the curiosity doesn’t.</p>
            <ul class="about-hero__places">
              <li class="chip">22feet Tribal Worldwide</li><li class="chip">Famous Innovations</li><li class="chip">Please See</li><li class="chip">Cornucopia Pictures</li><li class="chip">Freelance</li>
            </ul>
          </div>
        </div>
      </section>

      <section class="method" id="how">
        <div class="method__head"><h2 class="h2">a few things i bring <em>to every brief</em></h2></div>
        <div class="method__grid">
          <article class="principle"><span class="principle__no">01</span><h3>end-to-end <em>ownership</em></h3><p>Comfortable running a campaign from brief to delivery, without dropping quality under pressure.</p></article>
          <article class="principle"><span class="principle__no">02</span><h3>both sides of <em>the table</em></h3><p>Agency rigour from client-side roles; hustle and range from freelance projects.</p></article>
          <article class="principle"><span class="principle__no">03</span><h3>sensitive-topic <em>storytelling</em></h3><p>Experience building trust-first content and cause-led campaigns.</p></article>
          <article class="principle"><span class="principle__no">04</span><h3>creator &amp; partnership <em>fluency</em></h3><p>Sourcing, briefing, and negotiating with creators, not just posting on their behalf.</p></article>
          <article class="principle"><span class="principle__no">05</span><h3>numbers-<em>minded</em></h3><p>Organic growth, budget-conscious delivery, and reporting that clients actually read.</p></article>
          <article class="principle"><span class="principle__no">06</span><h3>cross-functional <em>collaboration</em></h3><p>Teams of 10–20+ across strategy, design and production, with workflows built for efficient, impactful execution.</p></article>
        </div>
      </section>

      <section class="beyond" id="beyond" data-theme="dark">
        <div class="beyond__head"><h2 class="h2">when nobody’s paying, <em>i still make things.</em></h2></div>
        <div class="reels">
${sideProjects.map((p) => `          <a class="reel" href="${p.href}" target="_blank" rel="noopener" data-cursor="play">
            <div class="reel__film"><img src="${p.img}" alt="${esc(p.alt)}" loading="lazy" /><span class="reel__play">▶</span></div>
            <span class="smallcaps reel__kind">${p.kind}</span><h3>${p.title}</h3>
            <p>${p.text}</p>
          </a>`).join('\n')}
        </div>
      </section>

      <section class="offduty">
        <h2 class="offduty__title display">
          <span data-word>eat.</span> <span data-word>dance.</span> <span data-word>travel.</span> <span data-word>capture.</span> <em data-word>repeat.</em>
        </h2>
        <p class="offduty__text">You’ll find me chasing sunsets, whipping up recipes, perfecting my Kathak spins, rolling my R’s in Spanish, or smashing a good workout, because creativity doesn’t clock out.</p>
        <p class="offduty__egg script">psst: type “kathak” anywhere on this site.</p>
      </section>

      <section class="faq" id="faq">
        <div class="faq__grid">
          <div><h2 class="h2 faq__title">questions people ask <em>over coffee</em></h2></div>
          <div class="faq__list">
            <details class="qa"><summary><span class="qa__no">01</span><span class="qa__q">so, agency or in-house?</span><span class="qa__icon"></span></summary><div class="qa__a"><p>Both, and freelance too. Agencies taught me rigour and pace, in-house taught me what the business actually needs, and freelance taught me to do all of it with a smaller team.</p></div></details>
            <details class="qa"><summary><span class="qa__no">02</span><span class="qa__q">what brands do you work best with?</span><span class="qa__icon"></span></summary><div class="qa__a"><p>Ones with a real problem to solve. Enterprise to kids’ snacks, gin to oncology: the category matters less than the curiosity.</p></div></details>
            <details class="qa"><summary><span class="qa__no">03</span><span class="qa__q">can you handle sensitive subjects?</span><span class="qa__icon"></span></summary><div class="qa__a"><p>It’s some of the work I’m proudest of: cancer awareness for amanté, a women’s oncology centre launch for Apollo, an anti-tobacco campaign. Trust first, cleverness second.</p></div></details>
            <details class="qa"><summary><span class="qa__no">04</span><span class="qa__q">do you just “post on instagram”?</span><span class="qa__icon"></span></summary><div class="qa__a"><p>Respectfully, no. Strategy, scripting, creator negotiations, production logistics, packaging direction, and the reporting deck at the end. Ten reels, two languages, fifteen days, on budget, for one.</p></div></details>
            <details class="qa"><summary><span class="qa__no">05</span><span class="qa__q">anything you’re still learning?</span><span class="qa__icon"></span></summary><div class="qa__a"><p>Always. “Much to learn, you still have,” as a small green philosopher once said. I take that as a job description.</p></div></details>
          </div>
        </div>
      </section>

      <section class="about-cta">
        <p class="script">seen enough?</p>
        <a href="/#contact" class="btn btn--wine" data-magnetic data-label="contact"><span>let’s talk</span><i>↗</i></a>
        <a href="/work/" class="btn btn--line" data-magnetic data-label="work"><span>see all the work</span><i>↗</i></a>
      </section>`;

writeFileSync(
  join(root, 'about.html'),
  shell({
    title: 'About — Ankita Shah, Marketing & Brand Strategist',
    description: 'How Ankita Shah works, what she makes beyond the brief, and what she does when she is not working.',
    body: 'data-page="about"',
    main: about,
  })
);

console.log(`Generated about.html, work/index.html + ${cases.length} case pages`);
