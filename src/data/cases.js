// Single source of truth for every case study.
// Home "Selected Works" gallery and each /work/<slug>.html page render from this.

const img = (n) => `/assets/img/${n}.webp`;

export const cases = [
  {
    slug: 'adani',
    category: 'enterprise',
    featured: true,
    numeral: 'I',
    brand: 'Adani Group',
    sector: 'Enterprise',
    hook: 'An enterprise voice, kept consistent across many brand pages.',
    cover: img('adani-1'),
    objective:
      'Built and maintained a consistent digital presence across multiple Adani Group brand pages, managing content, campaigns, and stakeholder communication at enterprise scale.',
    role: ['Social media planning', 'Campaign coordination', 'Content management', 'Stakeholder handling'],
    did: [
      'Daily content calendars across brand pages',
      'Multi-platform campaign rollout',
      'Multi-stakeholder review & approvals',
      'Monthly analytics & performance reporting',
    ],
    metric: { value: 81, suffix: 'K+', label: 'Follower growth in one year', note: 'across enterprise brand properties' },
    gallery: [
      { src: img('adani-1'), caption: 'Pehle Pankha Aayega, Phir Bijli Aayegi — Hum Karke Dikhate Hain' },
      { src: img('adani-2'), caption: 'Diwali — #KaroHarJashnKoRoshan' },
      { src: img('adaniconnex'), caption: 'On ground at AdaniConneX Data Centers' },
    ],
  },
  {
    slug: 'nykaa',
    category: 'beauty-fashion',
    featured: true,
    numeral: 'II',
    brand: 'Nykaa',
    sector: 'Beauty · Fashion',
    hook: 'A brand architecture, rebuilt across store and screen.',
    cover: img('nykaa-edge'),
    objective:
      'Overhaul Nykaa’s brand architecture across offline and digital touchpoints for a cohesive, modern identity.',
    role: ['Project management', 'Campaign coordination', 'Stakeholder handling'],
    did: ['Brand & sub-brand logos', 'Storefront identity', 'Digital banners', 'Nykaa application UX'],
    metric: { value: 100, suffix: '%', label: 'On-time project delivery', note: '' },
    gallery: [
      { src: img('nykaa-edge'), caption: 'The Nykaa Edge — 65°', href: 'https://www.instagram.com/p/C7_B6WZIsNp/' },
      { src: img('nykaa-system'), caption: 'The N, the pink, the texture, the angle', href: 'https://www.instagram.com/p/C7_B6WZIsNp/' },
      { src: img('nykaa-pink'), caption: 'Nykaa', href: 'https://www.instagram.com/p/C8E4MUrySq8/' },
      { src: img('nykaa-fashion'), caption: 'Nykaa Fashion', href: 'https://www.instagram.com/p/C8E4MUrySq8/' },
      { src: img('nykaa-man'), caption: 'Nykaa Man', href: 'https://www.instagram.com/p/C8E4MUrySq8/' },
    ],
  },
  {
    slug: 'stranger-and-sons',
    category: 'fnb',
    featured: true,
    numeral: 'III',
    brand: 'Stranger & Sons',
    sector: 'F&B · Spirits',
    hook: 'A premium Indian gin, from Goa to Singapore and back.',
    cover: img('sns-aer'),
    objective:
      'Grow brand recognition and community engagement for a premium Indian gin brand across global and local launches.',
    role: ['Social media planning', 'Campaign coordination', 'Content management', 'Stakeholder handling'],
    did: [
      '360° social media, ad promotions & online reputation management',
      'Led the launch of Stranger & Sons’ Sherry Cask Aged Gin',
      'Managed AER Gin and Subko collab initiatives',
    ],
    metric: { value: 28.7, decimals: 1, suffix: 'K+', label: 'Community on Instagram', note: '' },
    gallery: [
      { src: img('sns-aer'), caption: 'AER Gin', href: 'https://www.instagram.com/reel/CwxXXOaSD6g/' },
      { src: img('sns-bar'), caption: 'Behind the bar', href: 'https://www.instagram.com/reel/CwxXXOaSD6g/' },
      { src: img('sns-bottle'), caption: 'Poured, garnished, photographed', href: 'https://www.instagram.com/reel/CwxXXOaSD6g/' },
      { src: img('sns-instagram'), caption: 'The community, city by city', href: 'https://www.instagram.com/p/C6q3Yfsoi-F/' },
    ],
  },
  {
    slug: 'serious-slice',
    category: 'fnb',
    // ⚠️ MOCK DATA — placeholder until the real Serious Slice case study is supplied.
    mock: true,
    featured: true,
    numeral: 'IV',
    brand: 'Serious Slice',
    sector: 'F&B · QSR',
    hook: 'A pizza brand that takes its slices seriously, and its socials less so.',
    cover: null,
    objective:
      'Turn a fast-growing pizza chain into a brand people talk about: sharper positioning, a louder social voice and store launches that fill tables on day one.',
    role: ['Brand strategy', 'Social media management', 'Launch campaigns', 'Creator partnerships'],
    did: [
      'Brand voice & content pillars built around “serious about pizza”',
      'Always-on social calendar across Instagram & YouTube Shorts',
      'Store-launch playbooks with local food creators',
      'Menu-drop campaigns and limited-edition slice stunts',
    ],
    metric: { value: 2.4, decimals: 1, suffix: 'M+', label: 'Organic reach across launch campaigns', note: 'placeholder figure' },
    gallery: [],
  },
  {
    slug: 'wassabi-eats',
    category: 'creator',
    numeral: 'V',
    brand: '@wassabi.eats',
    sector: 'Creator · F&B',
    hook: 'A food creator’s page, grown organically, one reel at a time.',
    cover: img('wassabi-grid'),
    objective:
      'Grow a food creator’s Instagram into a consistent, engaged page, with content that feels like her and a rhythm the audience can count on.',
    roleText:
      'End-to-end Instagram account management for a food creator, overseeing content, growth and day-to-day handling of the page to keep it consistent and engaged.',
    role: ['Food creator', 'Instagram account management'],
    did: [
      'Full Instagram account management',
      'Content direction & scripting',
      'Caption writing & copy',
      'Community engagement & DM handling',
      'Growth tracking & strategy',
    ],
    metric: { value: 150, suffix: 'K+', label: 'Organic views', note: 'in less than two months' },
    gallery: [
      { src: img('wassabi-grid'), caption: 'The grid, two months in' },
      { src: img('wassabi-profile'), caption: 'Restaurant-style meals, made simple at home' },
    ],
  },
  {
    slug: 'breathe-in',
    category: 'wellness',
    numeral: 'VI',
    brand: 'Breathe In',
    sector: 'Wellness · Sustainability',
    hook: 'A brand built from a blank page, before its very first post.',
    cover: null,
    objective:
      'Brand marketing across all digital fronts: giving a new wellness label a clear, ownable identity and a launch worth remembering.',
    pillars: [
      { title: 'Brand Strategy', text: 'Developed full positioning, tone of voice, and brand narrative from scratch. This gave the label a clear, ownable identity before its first post.' },
      { title: 'Content Direction', text: 'Defined visual language, content pillars, and a cohesive aesthetic tailored specifically to the wellness and lifestyle space.' },
      { title: 'Launch Planning', text: 'Built a phased launch roadmap covering pre-launch buzz, teaser content framework, and a go-live playbook for a strong first impression.' },
      { title: 'Influencer Strategy', text: 'Mapped relevant micro and macro influencer tiers for the wellness niche, with outreach strategy, tier logic, and brief templates ready to activate.' },
    ],
    role: ['Brand strategy', 'Content direction', 'Launch planning', 'Influencer strategy'],
    did: [],
    stats: [
      { value: 12, suffix: ' months', label: 'Ongoing engagement' },
      { value: 180, suffix: '+', label: 'Content assets delivered' },
      { value: 15, prefix: '10–', suffix: '', label: 'UGC videos scripted, shot & edited' },
    ],
    metric: { value: 180, suffix: '+', label: 'Content assets delivered', note: 'over a 12-month engagement' },
    gallery: [],
  },
  {
    slug: 'amante',
    category: 'beauty-fashion',
    numeral: 'VII',
    brand: 'amanté',
    sector: 'Fashion · Innerwear',
    hook: 'A legacy brand, given a fresher and braver voice.',
    cover: img('amante-forgotten'),
    objective:
      'Give a legacy women’s innerwear brand a fresher, more dynamic voice, from cause-led storytelling to milestone-anniversary visibility.',
    role: ['Social media planning', 'Campaign coordination', 'Content management', 'Stakeholder handling'],
    did: [
      'AI-led films for Cancer Awareness Week with a two-sided narrative',
      'Visual identity & on-ground activation for amanté’s 18th Anniversary at a major OTT Awards platform',
      'Offline brand collateral: calendars & diaries',
      'Brand ambassador evaluation & shortlisting',
    ],
    metric: { value: 200, suffix: 'K+', label: 'Views on the Instagram campaign content', note: '' },
    gallery: [
      { src: img('amante-forgotten'), caption: 'The Forgotten Ingredient — 422K views', href: 'https://www.instagram.com/reel/DRWT6OFkj5I/' },
      { src: img('amante-missing-step'), caption: 'The Missing Step — 399K views', href: 'https://www.instagram.com/reel/DRE8XgREm_k/' },
      { src: img('amante-gym-rant'), caption: 'The Gym Rant — 223K views', href: 'https://www.instagram.com/reel/DQwgzuEErH6/' },
      { src: img('amante-18'), caption: '18 Years of amanté — 599K views', href: 'https://www.instagram.com/reel/DS7cbZTkhE4/' },
      { src: img('amante-ott'), caption: 'OTT India Fest — 1.3M views', href: 'https://www.instagram.com/reel/DSDBNjqkgYR/' },
    ],
  },
  {
    slug: 'apollo',
    category: 'healthcare',
    numeral: 'VIII',
    brand: 'Apollo Hospitals',
    sector: 'Healthcare',
    hook: 'Two campaigns where every word had to earn trust.',
    cover: null,
    objective:
      'Two healthcare briefs, one sensibility: drive meaningful engagement on a public-health cause, and build a trusted voice for a women’s oncology centre from day one.',
    campaigns: [
      {
        title: 'World No Tobacco Day',
        kind: 'Health Awareness Campaign',
        objective:
          'Drive meaningful social engagement for Apollo’s anti-tobacco awareness campaign, reaching patients, caregivers, and general audiences with sensitive, impact-led content.',
        did: [
          'Campaign concept & execution',
          'Multi-format rollout: reels, stories, carousels',
          'Hashtag strategy & community engagement',
          'Cross-platform scheduling & publishing',
        ],
      },
      {
        title: 'ATHENAA Women’s Cancer Centre',
        kind: 'Launch Campaign',
        objective:
          'Build a sensitive, authoritative digital presence for Apollo’s dedicated women’s oncology centre, establishing trust from day one.',
        did: [
          'Brand voice for a sensitive health topic',
          'Launch content planning across platforms',
          'Patient-centric storytelling framework',
          'Doctor-led awareness campaign coordination',
        ],
      },
    ],
    role: ['Campaign concept', 'Brand voice', 'Content planning', 'Community engagement'],
    did: [],
    metric: null,
    gallery: [],
  },
  {
    slug: 'athena',
    category: 'beauty-fashion',
    numeral: 'IX',
    brand: 'Athena',
    sector: 'Fashion · Menswear',
    hook: 'A challenger brand, made culturally relevant to Gen-Z men.',
    cover: img('athena-xmas-1'),
    objective:
      'Make a first-time challenger innerwear brand culturally relevant to Gen-Z men, spanning always-on content and a festive influencer push.',
    role: ['Social media planning', 'Campaign coordination', 'Content management', 'Stakeholder handling'],
    did: [
      '360° campaign across Hero, Hub & Hygiene content',
      'Christmas influencer campaign + on-ground Vox Pop activation',
      'Social content management & ORM',
      'Vehicle branding & in-store visibility',
      'LinkedIn roadmap for parent brand RelDel',
    ],
    metric: { value: 170, suffix: 'K+', label: 'Views on the Christmas campaign', note: 'across influencer & Vox Pop content' },
    gallery: [
      { src: img('athena-xmas-1'), caption: 'Athena Christmas Special — 170K views', href: 'https://www.instagram.com/reel/DSsNLoXATxB/' },
      { src: img('athena-xmas-2'), caption: 'Vox Pop, in store — 139K views', href: 'https://www.instagram.com/reel/DSsNLoXATxB/' },
      { src: img('athena-naughty'), caption: 'He is going on The Naughty List' },
      { src: img('athena-1'), caption: 'Always-on content', href: 'https://www.instagram.com/reel/DSFUBfFEsvB/' },
    ],
  },
  {
    slug: 'snack-a-doodle',
    category: 'fnb',
    numeral: 'X',
    brand: 'Snack-A-Doodle',
    sector: 'F&B · Kids',
    hook: 'A children’s snack label, rebranded to stand out on shelf.',
    cover: img('sad-1'),
    objective:
      'Rebrand a children’s snacks label with a cohesive brand narrative and identity that stands out on shelf.',
    role: ['Social media planning', 'Campaign coordination', 'Content management', 'Stakeholder handling'],
    did: ['End-to-end brand narrative & identity', 'Packaging design direction', 'Oversaw artworks & studio production'],
    metric: { value: 28.7, decimals: 1, suffix: 'K+', label: 'Community on Instagram', note: '' },
    gallery: [
      { src: img('sad-1'), caption: 'Strawberry Apple Bites', href: 'https://www.instagram.com/p/C7W12SboZyK/' },
      { src: img('sad-2'), caption: 'Banana and Chocolate Bites', href: 'https://www.instagram.com/p/C7W12SboZyK/' },
      { src: img('sad-3'), caption: 'Mango and Pineapple Bites', href: 'https://www.instagram.com/p/C7W12SboZyK/' },
      { src: img('sad-4'), caption: 'Dates & Millet Cookies', href: 'https://www.instagram.com/p/C7W12SboZyK/' },
      { src: img('sad-5'), caption: 'Chocolate & Millet Cookies', href: 'https://www.instagram.com/p/C7W12SboZyK/' },
    ],
  },
  {
    slug: 'frnd',
    category: 'tech',
    numeral: 'XI',
    brand: 'FRND App',
    sector: 'Technology',
    hook: 'Ten reels, two languages, fifteen days.',
    cover: img('frnd-logo'),
    coverFit: 'contain', // app icon, not a campaign still
    objective:
      'Produce culturally tailored Reels for a social-audio app, built to travel across two distinct regional audiences.',
    role: ['Social media planning', 'Campaign coordination', 'Content management', 'Stakeholder handling'],
    did: [
      'Creative brief development aligned to brand messaging',
      'Production logistics for 10 reels in Hindi & Tamil',
      'Post-production direction & Instagram optimisation',
    ],
    metric: { value: 10, suffix: ' reels', label: 'Delivered in 15 days', note: 'within a ₹12L budget' },
    gallery: [],
  },
];

export const categories = [
  { key: 'all', label: 'all work' },
  { key: 'fnb', label: 'food & drink' },
  { key: 'beauty-fashion', label: 'beauty & fashion' },
  { key: 'enterprise', label: 'enterprise' },
  { key: 'healthcare', label: 'healthcare' },
  { key: 'wellness', label: 'wellness' },
  { key: 'creator', label: 'creators' },
  { key: 'tech', label: 'tech' },
].filter((k) => k.key === 'all' || cases.some((c) => c.category === k.key));

// Personal & academic projects — shown on /about and /work/
export const sideProjects = [
  {
    kind: 'personal project',
    title: 'music video cover',
    text: 'Conceptualised, directed, shot, scripted and edited a cover of <em>3:00 AM</em> by Finding Hope, featuring Shriti Thakur.',
    img: img('side-music'),
    alt: 'Still from the 3:00 AM music video cover',
    href: 'https://www.youtube.com/results?search_query=3%3A00+AM+Finding+Hope+Shriti+x+Ankita+cover',
  },
  {
    kind: 'academic project',
    title: 'snickers × the family man',
    text: 'A mock Snickers TVC inspired by The Family Man, conceptualised and executed end-to-end, from scripting to final edit.',
    img: img('side-snickers'),
    alt: 'Still from the Snickers × The Family Man mock TVC',
    href: 'https://www.youtube.com/results?search_query=Snickers+x+The+Family+Man+Mock+TVC+Ankita+Shah',
  },
  {
    kind: 'academic project',
    title: 'surakhshat',
    text: 'A rural marketing project: a social awareness campaign for sanitation and hygiene in rural communities.',
    img: img('side-surakhshat'),
    alt: 'Still from SuRAKHshat, a rural sanitation campaign',
    href: 'https://www.youtube.com/results?search_query=SuRAKHshat+campaign+rural+sanitation',
  },
];

export const featured = cases.filter((c) => c.featured);

export const caseBySlug = (slug) => cases.find((c) => c.slug === slug);
export const nextCase = (slug) => {
  const i = cases.findIndex((c) => c.slug === slug);
  return cases[(i + 1) % cases.length];
};
export const prevCase = (slug) => {
  const i = cases.findIndex((c) => c.slug === slug);
  return cases[(i - 1 + cases.length) % cases.length];
};
/** Up to n other cases, same category first, skipping any slugs in `exclude`. */
export const relatedCases = (slug, n = 3, exclude = []) => {
  const c = caseBySlug(slug);
  const others = cases.filter((o) => o.slug !== slug && !exclude.includes(o.slug));
  return [...others.filter((o) => o.category === c?.category), ...others.filter((o) => o.category !== c?.category)].slice(0, n);
};
