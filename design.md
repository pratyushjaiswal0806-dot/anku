# Design System & Creative Specification

> **Ankita Shah — Marketing & Brand Strategist**  
> *“Marketing people connect with.”*  
> Document Version: 1.0.0 · Core Aesthetic: **Vintage Editorial Meets Tactile Interactive Craft**

---

## 1. Executive Summary & Brand Identity

### 1.1 Brand Philosophy
Ankita Shah's portfolio represents the intersection of analytical marketing rigor and creative intuition. The site rejects generic digital minimalism in favor of an **editorial, tactile, physical-world aesthetic** reminiscent of high-end independent magazines, vintage archives, stationery ephemera, and Art Deco hotel elevator lobbies.

### 1.2 Personality & Tone of Voice
- **Tone**: Grounded, discerning, witty, and deeply human (*“made with care, and a little chutzpah”*).
- **Voice**: Casual lowercase headlines, paired with graceful high-contrast serif italics for emphasis.
- **Narrative Framing**: Case studies are presented as *“Case Files”*, services as *“Folder Tabs”*, testimonials as *“Pinned Notebook Notes”*, and project summaries as *“Cashier Receipts”*.

---

## 2. Design Language & Conceptual Metaphors

The design language is defined by five distinct tactile metaphors:

### 2.1 The Elevator (“The Lift”)
- **Symbolism**: Represents progression, arrival, and moving through different levels of a practice (*“going up”*, *“next floor: ankita shah”*).
- **Visual Vocabulary**:
  - Mechanical split doors (`.lift__door--l`, `.lift__door--r`) textured in deep burgundy.
  - Floor indicator plaque (`.lift__sign`) with floor markings (`G`, `1`, `arriving`) and directional arrows (`▲`, `▼`, `●`).
  - Tactile page transitions: on link click, the elevator doors slide shut smoothly; upon navigation, the doors open to reveal the destination.

### 2.2 The Tarot Deck
- **Symbolism**: Archetype of *The Strategist* (Card **XI**).
- **Visual Vocabulary**:
  - Arched portrait window surrounded by gold/olive celestial rays, crescent moons, and constellation stars.
  - Interactive 3D flip card on the hero fold (`perspective: 1500px; transform-style: preserve-3d`).
  - Card back featuring intricate geometric linework, constellation clusters, and the signature *“as”* monogram.

### 2.3 Physical Office Ephemera & Stationery
- **Folder Tabs (`.service`)**: Service cards styled like colored manila folders with real radial cutouts on the tabs (`.service__tab`), tab titles set in italic serif, and paper texture overlays.
- **Ruled Notebook Paper (`.note-card`)**: Testimonials displayed as pages torn from a ruled notebook (`repeating-linear-gradient(180deg, ...)`), tilted at organic angles (`--r: -1.5deg`, `1.8deg`), cast with drop shadows.
- **The Cashier Receipt (`.receipt`)**: Project scopes summarized as itemized store receipts with jagged perforated cutouts (`--teeth: 7px`), monospaced timestamps, itemized line items, and barcodes.
- **Rubber Stamps (`.stamp`)**: Angular confirmation badges rotated at -4° with double weathered borders.
- **Checkered Floorboards (`.checker`)**: Diamond-patterned alternating floor tiles in rich burgundy and deep wine.

### 2.4 Hand-Drawn Marginalia & Interactive Doodles
- **Illustrations**: Whimsical, warm line drawings inspired by sketchbook doodles:
  - Responsive blinking eyes tracking the cursor (`.dd--peek`, `.dd--cta-eyes`).
  - Twinkling stars, sparkles, and a fountain pen on the hero.
  - Continuous single-line drawing connecting the contact section.
  - A swinging hanging wooden sign with real harmonic pendulum physics.

### 2.5 35mm Film Grain
- A subtle procedural SVG fractal noise layer (`feTurbulence`) overlays the entire page at 6% opacity (`body::after`), promoted to its own GPU compositor layer for zero scroll jitter.

---

## 3. Color Palette & Token System

### 3.1 Color Palette
The color system balances deep, prestigious wine tones with soft powder blues, vintage creams, and playful accents.

```
┌────────────────────────────────────────────────────────────────────────┐
│                        CORE BRAND PALETTE                              │
├─────────────────┬─────────────────┬──────────────────┬─────────────────┤
│  Wine / Plum    │   Cherry Red    │   Powder Sky     │     Blush       │
│    #5a1820      │     #a3202a     │     #dcebf7      │    #ecc9d0      │
├─────────────────┼─────────────────┼──────────────────┼─────────────────┤
│   Deep Wine     │   Muted Olive   │    Pale Cream    │   Clean Paper   │
│    #3a0e14      │     #b9b347     │     #f7ede8      │    #fbf6f3      │
└─────────────────┴─────────────────┴──────────────────┴─────────────────┘
```

### 3.2 Design Tokens (CSS Custom Properties)

| CSS Variable | Value | Purpose |
| :--- | :--- | :--- |
| `--sky` | `#dcebf7` | Hero background, light container canvas, accent text in dark mode |
| `--sky-2` | `#c7dbef` | Subtle borders and secondary text on sky backgrounds |
| `--wine` | `#5a1820` | Primary brand hue, primary buttons, elevator doors, display headings |
| `--wine-deep` | `#3a0e14` | Deep contrast tone for dark sections, footers, and shadows |
| `--wine-2` | `#7a2430` | Supporting wine tone, borders, secondary badges |
| `--cherry` | `#a3202a` | Vivid accent, italic contrast highlights, hover states, primary dots |
| `--blush` | `#ecc9d0` | Soft pastel accent, dark-mode highlight, tarot card accents |
| `--blush-2` | `#f4e1e4` | Light blush card backgrounds (e.g. Selected Works section) |
| `--mauve` | `#c49aa9` | Muted folder card background, subtle illustration fills |
| `--olive` | `#b9b347` | Accent folder color, celestial tarot stars, hand-drawn doodles |
| `--olive-deep` | `#8e8a2c` | Deep doodle stroke color, moon accent |
| `--cream` | `#f7ede8` | Tarot card face, warm paper fills |
| `--paper` | `#fbf6f3` | Main site canvas, note cards, clean contrast tiles |
| `--ink` | `#1f1416` | High-contrast body typography |
| `--ink-soft` | `#4a3438` | Readable secondary copy, subtitles |
| `--muted` | `#8a6f74` | Muted labels, metadata, dates |

### 3.3 Dark Chapter Inversion (`data-theme="dark"`)
Specific chapters (*Brands Logo Wall*, *Kind Words*, *Case Gallery*, *Footer*) apply `data-theme="dark"`:
- **Canvas**: Inverts to `--wine` (`#5a1820`) or `--wine-deep` (`#3a0e14`).
- **Typography**: Inverts to `--sky` (`#dcebf7`) with highlights in `--blush` (`#ecc9d0`).
- **Header Adaptability**: The floating header monitors triggers and dynamically applies `.is-dark` to invert its brandmark, pill borders, and glassmorphic backdrops.

---

## 4. Typography Hierarchy & Rules

### 4.1 The Typographic Triad

| Role | Font Family | Weights | Characteristics |
| :--- | :--- | :--- | :--- |
| **Display / Headlines** | `Poppins` | 600, 700, 800 | Lowercase, tight geometric tracking (`-0.045em`), high impact |
| **Editorial Emphasis** | `Instrument Serif` | 400, Italic | High-contrast editorial elegance, italic contrast moments |
| **Handwritten Notes** | `Nothing You Could Do` | 400 (Cursive) | Spontaneous marginalia, arrows, playful callouts |
| **Body & Interface** | `Manrope` | 400, 500, 600, 700 | Highly legible modern grotesque sans-serif |

### 4.2 Typographic Hierarchy & Clamps

```css
/* Hero Title */
font-size: clamp(52px, 10.6vw, 176px);
line-height: 0.9;
letter-spacing: -0.045em;

/* Section Headings (H2) */
font-size: clamp(38px, 5.4vw, 86px);
line-height: 0.96;
letter-spacing: -0.045em;

/* Editorial Sub-leads & Hooks */
font-family: var(--serif);
font-style: italic;
font-size: clamp(22px, 2.4vw, 36px);
line-height: 1.15;

/* Body Copy */
font-family: var(--sans);
font-size: 16px;
line-height: 1.6;

/* Smallcaps / Metadata */
font-family: var(--sans);
font-size: 11px;
letter-spacing: 0.12em;
text-transform: uppercase;
font-weight: 600;
```

### 4.3 Editorial Rules
1. **Lowercase Preference**: All major headlines, navigation labels, and titles are styled in lowercase to convey confidence without corporate austerity.
2. **The Contrast Word**: In nearly every headline, one pivotal word is wrapped in `<em class="serif-i">` to trigger an italic serif flourish in accent cherry or blush (e.g. *“hi, i’m ankita shah.”* -> *“marketing people connect with”*).
3. **Numbered Steps**: Lists, navigation, and chapters are prefixed with two-digit italicized numbers (`<i>01</i>`, `<i>02</i>`).

---

## 5. Motion, Physics & Micro-Interactions

### 5.1 Lenis Kinetic Scroll Engine
- **Lerp**: `0.105` — Tuned for responsive, immediate finger/wheel tracking without lag.
- **Multipliers**: Wheel `1.0`, Touch `1.2` for fluid mobile momentum.
- **Pointer-Events Suppressor**: During scroll motion, `.is-scrolling` disables pointer events across the page (`pointer-events: none !important`), eliminating hover recalculations and locking 60fps/120fps refresh.
- **GSAP Lag Smoothing**: Set to `lagSmoothing(500, 33)` to smoothly absorb CPU spikes without teleporting elements.

### 5.2 Dynamic Elevator Page Transitions
- **Timings**:
  - Close doors: `0.55s` doors (`expo.inOut`), `0.4s` sign descent.
  - Open doors: `0.65s` doors (`expo.inOut`), `0.45s` sign ascent, `0.05s` delay.
- **Hover Link Prefetching**: Internal links (`<a>`) trigger background prefetching on `mouseover`, ensuring near-instantaneous page readiness once the elevator doors open.

### 5.3 Micro-Interactions
- **Magnetic Attraction (`data-magnetic`)**: Buttons and interactive brandmarks smoothly pull toward the pointer within a 35px threshold using cached bounding boxes.
- **Character Scrambler (`data-scramble`)**: Text scrambled with rapid randomized glyphs on hover (`* # % & + = ? ~ ^ / @`), decrypting from left to right.
- **Harmonic Pendulum Sign (`initSign`)**: Physical hanging sign with damped oscillation physics that reacts to mouse velocity and scroll speed, putting itself to sleep (0% CPU) when velocity drops below `0.005`.
- **Interactive Pupil Tracking (`initEyes`)**: Vector calculations rotate SVG pupils toward the user's cursor across the screen, throttled to `requestAnimationFrame`.

---

## 6. Component Architecture

### 6.1 Site Header (`.site-header`)
- **Desktop**:
  - Left: Magnetic monogram brandmark (`as ankita shah`).
  - Center: Pill container with section jump links (`brands`, `expertise`, `work`, `about`, `contact`).
  - Right: Availability badge with pulsing green/cherry status indicator (`open to new briefs`).
- **Mobile (`<= 860px`)**:
  - Minimalist 2-bar glassmorphic hamburger toggle.
  - Offscreen drawer (`.mobile-drawer`) with frosted backdrop (`backdrop-filter: blur(10px)`), brand navigation, direct email, and live Indian Standard Time clock (`clock`).

### 6.2 Work Cards (`.work-card`)
- **Card Variants**:
  - `work-card--feature`: Full-width or prominent showcase on Home fold with headline metric and big cover.
  - `work-card--grid`: Standard catalog card used on `/work/` with sector tag, client name, hook, and hover reveal.
  - `work-card--mini`: Compact cross-navigation card displayed at the bottom of case study pages.
- **Media Presentation**: Rigid `4 / 3` aspect ratio container with hardware-accelerated image zoom on hover (`scale: 1.05`).
- **Stub Badge**: Small-caps overlay (`case file 01`) pinned to the corner.

### 6.3 Folder Services (`.service`)
- Four primary service pillars:
  1. *Brand Strategy* (Olive `#b9b347`)
  2. *Social Media* (Mauve `#c49aa9`)
  3. *Content Direction* (Blush `#ecc9d0`)
  4. *Creator Partnerships* (Cherry Red `#a3202a`)
- Unique folder tab geometry created with pure CSS radial gradients for inverted inner corner blending.

### 6.4 Case Study Structure (`.case-body`)
- **Hero**: Sector badge, bold brand title, italic creative hook, and full-bleed hero cover with pinned file stub.
- **Facts Strip**: Key stats in an itemized grid (`client`, `sector`, `my role`, `scope`, `headline result`).
- **Sticky Table of Contents**:
  - Desktop: Vertical left sidebar pinned to viewport with active scrollspy pill.
  - Mobile: Horizontal sticky scroll rail directly beneath the hero (`.case-toc-mobile`).
- **Content Chapters**: Numbered sections covering *The Brief*, *My Role*, *The Craft*, *The Outcome*, and *The Gallery*.

### 6.5 Interactive Buttons & Chips
- `.btn--wine`: Solid burgundy background, sky text, rounded pill shape, trailing arrow icon (`↘` or `↗`).
- `.btn--line`: Transparent border, subtle inset shadow, magnetic responsiveness.
- `.chip`: Inline metadata tag with rounded corners and border.
- `.totop`: Elevates user back to top with tactile *“going up”* box icon.

---

## 7. Responsive Breakpoint Matrix

The layout responds dynamically across four distinct viewport tiers:

| Breakpoint Tier | Media Query | Layout Adjustments |
| :--- | :--- | :--- |
| **Desktop Large** | `> 1100px` | 7-column brand wall, 2-column work grid, full left TOC sidebar on case pages. |
| **Desktop Standard** | `861px – 1100px` | 5-column brand wall, fluid hero typography clamps, preserved header navigation. |
| **Tablet & Small Screen** | `601px – 860px` | Header navigation collapses into mobile drawer. Services stack into single column. Film grain animation paused for battery conservation. Case TOC switches to sticky horizontal rail. |
| **Mobile Compact** | `<= 600px` | Single-column grids. Brand wall switches to 2 columns. Hero typography scales down smoothly (`clamp(52px, 12vw, 176px)`). Zero horizontal overflow guaranteed (`scrollWidth === clientWidth`). |

---

## 8. Performance & Asset Specifications

1. **Asset Optimization**:
   - Modern image format: All photography and artwork converted to high-efficiency **WebP**.
   - Zero Layout Shift: All image tags contain explicit `width` and `height` intrinsic aspect ratios.
   - High-Priority Loading: Hero images and critical fonts use `<link rel="preload">` and `<link rel="dns-prefetch">`.
2. **GPU Compositing**:
   - Hardware-accelerated transformations applied via `translate3d(0, 0, 0)`, `translateZ(0)`, and `will-change: transform`.
3. **Accessibility**:
   - Comprehensive `@media (prefers-reduced-motion: reduce)` block disables all heavy physics, transitions, and scrubs for sensitive users.
   - High contrast compliance between typography and underlying containers across both light and dark themes.

