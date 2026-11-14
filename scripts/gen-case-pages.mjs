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
    <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
    <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
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
        <a href="/contact.html" data-label="contact">contact</a>
      </nav>
      <a href="/contact.html" class="status" data-magnetic data-label="contact"><span class="status__dot"></span>open to new briefs</a>
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
          <a href="/contact.html" class="mobile-drawer__link" data-label="contact"><i>05</i> contact</a>
        </nav>
        <div class="mobile-drawer__foot">
          <a href="/contact.html" class="btn btn--wine mobile-drawer__cta" data-label="contact"><span>open to new briefs</span><i>↘</i></a>
          <div class="mobile-drawer__meta">
            <a href="mailto:ankitashah.work@gmail.com" class="u-link">ankitashah.work@gmail.com</a>
            <span class="smallcaps">local time in india — <span class="clock">--:--</span></span>
          </div>
        </div>
      </div>
    </div>
    <div class="progress" aria-hidden="true"><span></span></div>

    <main id="main">${main}</main>

    <div id="site-footer" class="site-footer-root" data-theme="dark"></div>
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
          <figure class="about-hero__photo"><img src="/assets/img/adaniconnex.webp" alt="Ankita at AdaniConneX Data Centers" width="908" height="1210" loading="lazy" decoding="async" /><figcaption class="script">on the job, adani connex ↑</figcaption></figure>
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
            <div class="reel__film"><img src="${p.img}" alt="${esc(p.alt)}" width="409" height="230" loading="lazy" decoding="async" /><span class="reel__play">▶</span></div>
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
        <a href="/contact.html" class="btn btn--wine" data-magnetic data-label="contact"><span>let’s talk</span><i>↗</i></a>
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

/* ───────── Contact page ───────── */
const contact = `
      <section class="contact-hero">
        <div class="contact-hero__top smallcaps">
          <a href="/" class="u-link" data-label="home">← home</a>
          <span class="rule"></span>
          <span>the correspondence desk</span>
        </div>
        <div class="contact-hero__head">
          <span class="contact-hero__kicker smallcaps"><span class="status__dot"></span>open for select briefs</span>
          <h1 class="contact-hero__title display">let’s make something <em>people talk about.</em></h1>
          <p class="contact-hero__lead">Whether you’ve got an airtight RFP, a brand that needs reimagining, or just a knotty marketing challenge sketched on a napkin: my desk is open.</p>
        </div>
        <div class="desk-telemetry">
          <div class="telemetry-card telemetry-card--mail">
            <div class="telemetry-card__label smallcaps"><span>direct inbox</span><span>01</span></div>
            <div class="telemetry-card__main">ankitashah.work@gmail.com</div>
            <p class="telemetry-card__sub">Drop a brief, a deck, or an invitation to collaborate.</p>
            <button class="telemetry-card__action" type="button" data-copy-email="ankitashah.work@gmail.com" data-cursor="copy"><span>copy email</span><i>✦</i></button>
          </div>
          <div class="telemetry-card telemetry-card--time">
            <div class="telemetry-card__label smallcaps"><span>local telemetry</span><span>02</span></div>
            <div class="telemetry-card__main"><span class="clock">--:--</span> <span style="font-size: 13px; font-weight: 500; color: var(--wine-2);">IST (UTC+5:30)</span></div>
            <p class="telemetry-card__sub">Based in India, collaborating with teams globally.</p>
            <span class="chip" style="align-self: flex-start; font-size: 11px;">flexible timezone overlap</span>
          </div>
          <div class="telemetry-card telemetry-card--status">
            <div class="telemetry-card__label smallcaps"><span>status &amp; rhythm</span><span>03</span></div>
            <div class="telemetry-card__main">24–48h response</div>
            <p class="telemetry-card__sub">Direct conversation with me — zero agency telephone games.</p>
            <a href="#dispatch" class="telemetry-card__action"><span>build your brief</span><i>↓</i></a>
          </div>
        </div>
      </section>

      <section class="dispatch-section" id="dispatch">
        <div class="dispatch-wrap">
          <div class="dispatch-head">
            <span class="smallcaps kicker" style="color: var(--cherry);">the dispatch desk</span>
            <h2 class="h2">send a brief <em>in two minutes</em></h2>
            <p>Fill out the details below. It pre-populates your email client with a structured brief, or you can copy the formatted brief with one click.</p>
          </div>

          <form class="dispatch-form" id="dispatch-form" novalidate>
            <div class="dispatch-form__bar">
              <span class="smallcaps">AS-BRIEF-2026 // CONFIDENTIAL DISPATCH</span>
              <span class="script">desk 01</span>
            </div>

            <div class="dispatch-form__body">
              <div class="form-grid-2">
                <div class="form-group">
                  <label class="form-group__head" for="sender-name"><i>01</i> your name *</label>
                  <input class="form-input" type="text" id="sender-name" name="name" placeholder="Ankita, Maya, Alex..." required />
                </div>
                <div class="form-group">
                  <label class="form-group__head" for="sender-brand"><i>02</i> brand or organisation</label>
                  <input class="form-input" type="text" id="sender-brand" name="brand" placeholder="e.g. Nykaa, amanté, stealth startup..." />
                </div>
              </div>

              <div class="form-group">
                <label class="form-group__head" for="sender-email"><i>03</i> your email address *</label>
                <input class="form-input" type="email" id="sender-email" name="email" placeholder="you@company.com" required />
              </div>

              <div class="form-group">
                <span class="form-group__head"><i>04</i> what kind of work is this? <span class="form-group__hint">(select all that apply)</span></span>
                <div class="chip-group" role="group" aria-label="Select services needed">
                  <button type="button" class="chip-toggle" data-service="Brand Strategy" aria-pressed="false">brand strategy <span class="chip-icon">+</span></button>
                  <button type="button" class="chip-toggle" data-service="Social Media Direction" aria-pressed="false">social media direction <span class="chip-icon">+</span></button>
                  <button type="button" class="chip-toggle" data-service="Content Direction" aria-pressed="false">content direction <span class="chip-icon">+</span></button>
                  <button type="button" class="chip-toggle" data-service="Creator Partnerships" aria-pressed="false">creator partnerships <span class="chip-icon">+</span></button>
                  <button type="button" class="chip-toggle" data-service="End-to-End Ownership" aria-pressed="false">end-to-end ownership <span class="chip-icon">+</span></button>
                  <button type="button" class="chip-toggle" data-service="Exploratory / Coffee" aria-pressed="false">exploratory / coffee <span class="chip-icon">+</span></button>
                </div>
              </div>

              <div class="form-group">
                <span class="form-group__head"><i>05</i> target timeline</span>
                <div class="timeline-group" role="radiogroup" aria-label="Select target timeline">
                  <button type="button" class="timeline-option is-selected" aria-pressed="true">immediate (1–2 weeks)</button>
                  <button type="button" class="timeline-option" aria-pressed="false">next month</button>
                  <button type="button" class="timeline-option" aria-pressed="false">Q1–Q2 2026</button>
                  <button type="button" class="timeline-option" aria-pressed="false">flexible / exploring</button>
                </div>
              </div>

              <div class="form-group">
                <label class="form-group__head" for="sender-brief"><i>06</i> the problem or brief</label>
                <textarea class="form-textarea" id="sender-brief" name="brief" placeholder="Tell me about what you're building, the real problem to solve, and what done looks like..."></textarea>
              </div>

              <div class="dispatch-form__foot">
                <p class="dispatch-form__note">Clicking dispatch generates a pre-formatted email in your default client, with zero account sign-up needed.</p>
                <button type="submit" class="btn btn--wine" data-magnetic><span>dispatch brief</span><i>↗</i></button>
              </div>
            </div>
          </form>

          <div class="dispatch-receipt" id="dispatch-receipt">
            <div class="dispatch-receipt__head">
              <div>
                <span class="smallcaps" style="font-size: 11px; color: var(--wine-2);">correspondence receipt // AS-2026</span>
                <h3 style="font-family: var(--display); font-size: 20px; font-weight: 700; margin-top: 4px;">your brief is ready</h3>
              </div>
              <span class="dispatch-receipt__stamp">prepared</span>
            </div>
            <pre class="dispatch-receipt__preview" id="receipt-preview"></pre>
            <div class="dispatch-receipt__actions">
              <button type="button" class="btn btn--wine" id="receipt-copy-btn"><span>copy brief text</span><i>📋</i></button>
              <a href="mailto:ankitashah.work@gmail.com" class="btn btn--line"><span>open mail manually</span><i>↗</i></a>
            </div>
          </div>
        </div>
      </section>

      <section class="contact-steps">
        <div class="contact-steps__head">
          <span class="smallcaps kicker" style="color: var(--wine-2);">the engagement rhythm</span>
          <h2 class="h2">how we’ll <em>work together</em></h2>
        </div>
        <div class="contact-steps__grid">
          <article class="step-card">
            <span class="step-card__no">01</span>
            <h3>the <em>read</em></h3>
            <p>I review your brief, look at your category, audit competitors, and come to our first conversation with thoughtful questions, not blank stares.</p>
          </article>
          <article class="step-card">
            <span class="step-card__no">02</span>
            <h3>the discovery <em>call</em></h3>
            <p>A focused 30-minute chat to unpack the real problem, establish mutual chemistry, and align on timeline and business goals.</p>
          </article>
          <article class="step-card">
            <span class="step-card__no">03</span>
            <h3>the scope &amp; <em>delivery</em></h3>
            <p>A crystal-clear proposal with distinct milestones, transparent scope, and zero surprises. No agency middlemen — you work directly with me.</p>
          </article>
        </div>
      </section>

      <section class="contact-channels" data-theme="dark">
        <div class="contact-channels__head">
          <span class="smallcaps kicker" style="color: var(--blush);">direct touchpoints</span>
          <h2 class="h2">other ways to <em>say hello</em></h2>
        </div>
        <div class="channels-grid">
          <a class="channel-card" href="mailto:ankitashah.work@gmail.com" data-cursor="copy" data-copy-email="ankitashah.work@gmail.com">
            <span class="channel-card__kind smallcaps">email</span>
            <div>
              <h3 class="channel-card__title">write to me</h3>
              <p class="channel-card__sub">ankitashah.work@gmail.com</p>
            </div>
            <span class="channel-card__arrow">↗</span>
          </a>
          <a class="channel-card" href="https://www.linkedin.com" target="_blank" rel="noopener" data-cursor="open">
            <span class="channel-card__kind smallcaps">professional</span>
            <div>
              <h3 class="channel-card__title">linkedin</h3>
              <p class="channel-card__sub">Career milestones, articles &amp; network</p>
            </div>
            <span class="channel-card__arrow">↗</span>
          </a>
          <a class="channel-card" href="https://www.instagram.com" target="_blank" rel="noopener" data-cursor="open">
            <span class="channel-card__kind smallcaps">creative</span>
            <div>
              <h3 class="channel-card__title">instagram</h3>
              <p class="channel-card__sub">Visual notes, reels &amp; stories</p>
            </div>
            <span class="channel-card__arrow">↗</span>
          </a>
          <a class="channel-card" href="#" target="_blank" rel="noopener" data-cursor="open">
            <span class="channel-card__kind smallcaps">credentials</span>
            <div>
              <h3 class="channel-card__title">résumé</h3>
              <p class="channel-card__sub">Download complete work history</p>
            </div>
            <span class="channel-card__arrow">↓</span>
          </a>
        </div>
      </section>

      <section class="contact-faq">
        <div class="contact-faq__grid">
          <div>
            <h2 class="h2 contact-faq__title">questions before <em>reaching out</em></h2>
            <p class="contact-faq__aside">Quick answers to common questions about availability, geography, and team fit.</p>
          </div>
          <div class="contact-faq__list">
            <details class="qa"><summary><span class="qa__no">01</span><span class="qa__q">do you work with international or remote teams?</span><span class="qa__icon"></span></summary><div class="qa__a"><p>Yes, regularly. I'm based in India (IST, UTC+5:30) and have managed campaigns and cross-functional teams spanning the UK, US, UAE, and Southeast Asia with flexible overlapping time zones.</p></div></details>
            <details class="qa"><summary><span class="qa__no">02</span><span class="qa__q">what is the shortest engagement you take on?</span><span class="qa__icon"></span></summary><div class="qa__a"><p>Engagements range from 2-week focused brand strategy sprints or creator audit workshops to multi-month campaign rollouts and retainer advisory roles.</p></div></details>
            <details class="qa"><summary><span class="qa__no">03</span><span class="qa__q">can you plug into our existing in-house team or creative agency?</span><span class="qa__icon"></span></summary><div class="qa__a"><p>Absolutely. Having worked both agency-side (22feet Tribal Worldwide, Famous Innovations) and in-house, I speak the language of both design studios and business stakeholders.</p></div></details>
            <details class="qa"><summary><span class="qa__no">04</span><span class="qa__q">what if we don't have a formal 20-page brief ready?</span><span class="qa__icon"></span></summary><div class="qa__a"><p>You don't need one. If you can describe what your brand does, what's not working, and where you want to go, we can shape the brief together on our discovery call.</p></div></details>
          </div>
        </div>
      </section>

      <section class="contact-cta">
        <p class="script">curious to see past results first?</p>
        <div class="contact-cta__btns">
          <a href="/work/" class="btn btn--wine" data-magnetic data-label="work"><span>explore the case files</span><i>↗</i></a>
          <a href="/about.html" class="btn btn--line" data-magnetic data-label="about"><span>read the longer version</span><i>↗</i></a>
        </div>
      </section>`;

writeFileSync(
  join(root, 'contact.html'),
  shell({
    title: 'Contact — Ankita Shah, Marketing & Brand Strategist',
    description: 'Get in touch with Ankita Shah for brand strategy, social media direction, and creator partnerships. Send a brief or schedule a conversation.',
    body: 'data-page="contact"',
    main: contact,
  })
);

console.log(`Generated about.html, contact.html, work/index.html + ${cases.length} case pages`);
