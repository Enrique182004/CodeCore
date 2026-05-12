# CodeCore Chapter Website — Design Spec

**Date:** 2026-05-12
**Status:** Approved

---

## Overview

A complete, standalone multi-page website for the CodeCore Chapter program, living in `chapter/`. Built with plain HTML, CSS, JavaScript, and PHP — no frameworks. Separate visual identity from the main CodeCore club site: bold dark navy + lime green, student-first energy, professional enough to speak to schools and sponsors.

**Primary audiences:**

1. Middle/elementary school administrators and teachers (start a chapter)
2. Corporate sponsors and community partners (donate, sponsor)
3. Students aged 8–14 (engage, explore, have fun)

**Goals:**

- Convert school administrators into chapter applicants
- Convert sponsors into active partners
- Give students a fun, engaging hub to explore coding activities
- Serve as a credibility anchor for the program's community presence

---

## Architecture

### Approach: JS-injected shared components

Pages stay `.html`. `main.js` injects the navbar and footer HTML into `<div id="site-nav">` and `<div id="site-footer">` placeholder divs on `DOMContentLoaded`. One file to update nav or footer across all 8 pages.

### File structure

```
chapter/
├── index.html
├── about.html
├── schools.html
├── students.html
├── resources.html
├── sponsors.html
├── events.html
├── contact.html
├── contact.php          ← handles both form types via form_type hidden field
│
├── css/
│   ├── main.css         ← CSS variables, reset, nav, footer, shared utilities
│   ├── home.css
│   ├── about.css
│   ├── schools.css
│   ├── students.css
│   ├── resources.css
│   ├── sponsors.css
│   ├── events.css
│   └── contact.css
│
├── js/
│   ├── main.js          ← nav/footer injection, mobile menu, active link
│   ├── home.js          ← stats counters, sponsor strip
│   ├── schools.js       ← FAQ accordion
│   ├── students.js      ← resource cards filtered to student content
│   ├── resources.js     ← resource cards + category filter
│   ├── sponsors.js      ← sponsor tiers, wishlist category tabs
│   ├── events.js        ← event cards from events.json
│   └── contact.js       ← dual-form AJAX submit
│
└── data/
    ├── stats.json        ← NEW
    ├── sponsors.json     ← extended: add tier field
    ├── wishlist.json     ← extended: add category field
    ├── resources.json    ← NEW (~12 items)
    ├── events.json       ← NEW (~6 items)
    └── schools.json      ← unchanged
```

**Existing files replaced:** `chapter/index.html`, `chapter/css/chapter.css`, `chapter/js/chapter.js`
**Existing files kept/updated:** `chapter/contact.php` (updated for dual forms), `chapter/data/schools.json`, `chapter/data/wishlist.json`, `chapter/data/sponsors.json`

---

## Design System

### Colors

```css
--color-navy: #1a2e4a /* hero backgrounds, navbar */ --color-navy-dark: #0f1e31
  /* footer, darkest sections */ --color-navy-mid: #1e3d5c
  /* alternating dark sections */ --color-green: #7cb342
  /* primary CTAs, highlights */ --color-green-bright: #8dc63f
  /* hover states */ --color-teal: #2b7a9e /* secondary accent, links */
  --color-white: #ffffff --color-off-white: #f4f8ff /* light card backgrounds */
  --color-gray-100: #e8edf5 --color-text-dark: #1a2e4a --color-text-mid: #4a5568
  --color-text-light: #a0aec0 --color-high: #e53e3e /* priority badges */
  --color-medium: #dd6b20 --color-low: #7cb342;
```

### Typography

```css
--font-primary:
  "Segoe UI", system-ui,
  sans-serif --text-hero: clamp(2.8rem, 6vw, 5rem)
    --text-h1: clamp(2rem, 4vw, 3.5rem) --text-h2: clamp(1.6rem, 3vw, 2.5rem)
    --text-h3: 1.4rem --text-body: 1.05rem --text-sm: 0.9rem;
```

### Visual language rules

1. **Dark hero sections** on every page: navy gradient, white text, green CTAs
2. **White/off-white content cards** — `border-radius: 16px`, subtle box-shadow
3. **Green = action**: every primary button uses `--color-green`
4. **Code symbols as decoration**: `</>`, `{ }`, `01` as large faded `::before`/`::after` watermarks in heroes
5. **Stats always animate**: number counters count up from 0 on scroll (IntersectionObserver)

---

## Shared Components

### Navbar

- Left: CodeCore Chapter logo (C.png from `../images/logos/`) + "CodeCore Chapter" wordmark
- Center: Home · About · For Schools · Student Hub · Resources · Sponsors · Events · Contact
- Right: green "Start a Chapter" button → `contact.html`
- Sticky, `backdrop-filter: blur`, active page link highlighted green
- Collapses to hamburger on mobile (same pattern as main site's `mobile-menu.js`)

### Footer

Three columns:

1. CodeCore Chapter blurb + Instagram / LinkedIn / Email icons
2. Quick links (all 8 pages)
3. "Part of the CodeCore Family" → link to `../index.html` (main site)
   Dark navy background, white text.

### Data loading pattern

```js
async function loadJSON(url, fallback) {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error();
    return await res.json();
  } catch {
    return fallback; // inline JS object, works on file://
  }
}
```

Every page-specific JS file uses this helper and defines a `FALLBACK_*` constant.

---

## Pages

### index.html — Home

1. **Hero** — full-viewport navy, "CODE TODAY. CHANGE TOMORROW." (white + green), tagline, two CTAs, student photo right-aligned (`ideas/g on computer v2.png`)
2. **Pillars bar** — 4 icon cards: Learn · Build · Explore AI · Belong
3. **Impact stats** — animated counters from `stats.json` on dark green band
4. **Activities grid** — 5 cards: Coding & Games, Robotics, AI Exploration, Team Projects, Competitions
5. **Photo mosaic** — 3-col grid using ideas/ images with overlay text
6. **Sponsor strip** — logos from `sponsors.json`
7. **"Join the Movement" CTA banner** — navy, bold copy, two buttons
8. Footer

### about.html — About Us

Hero: "STEM IS FOR EVERYONE." Five alternating-band sections with original copy:

- Mission & Vision
- Why STEM Matters
- Responsible AI Education
- Community Impact
- Leadership Team (placeholder cards)

### schools.html — For Schools

Hero: "BRING CODING TO YOUR SCHOOL." Sections:

- 4-step visual process: Apply → Connect → Train → Launch
- Program requirements (icon list)
- Faculty training overview card + Saturday workshops summary
- FAQ accordion (6 questions)
- Participation timeline (horizontal on desktop)
- CTA → contact.html

### students.html — Student Hub

Brightest page. Hero: "YOUR CODING ADVENTURE STARTS HERE."

- Activity cards: Coding Games, Robotics, AI Projects, STEM Challenges
- Video placeholder embeds (YouTube iframes)
- Downloadable projects from `resources.json` filtered to student-facing items
- Achievement badges (6 types as CSS hexagons)
- Competitions callout banner

### resources.html — Resources

Hero + category filter bar: All / Training / Lesson Plans / Downloads / Videos / Safety & AI.
Cards from `resources.json`: type badge (PDF/Video/Link), title, description, action button.
Visual learning path at top: Beginner → Intermediate → Advanced (3-step horizontal).

### sponsors.html — Sponsors & Partners

Hero: "POWER THE NEXT GENERATION."

- How it works: 3 columns (Choose Tier → Make Contact → See Impact)
- Benefits table: Gold / Silver / Community tiers
- Sponsor showcase from `sponsors.json` grouped by tier
- Wishlist section from `wishlist.json` with category tabs
- Embedded interest form → `contact.php` (form_type: sponsor)

### events.html — Events

Hero + upcoming event cards from `events.json` (date badge, title, location, type chip).
Static CSS-grid calendar placeholder. Saturday training sessions section. Announcements band.

### contact.html — Contact / Join Us

Two-track layout (side-by-side desktop, stacked mobile):

- **Left — School form**: School Name, Principal/Contact, Email, Phone, Grade Levels, Message
- **Right — Sponsor/Volunteer form**: Full Name, Organization, Email, Role dropdown, Message
  Both AJAX to `contact.php`. General contact info + social links below.

---

## Data Files

### stats.json

```json
{ "students": 1200, "schools": 25, "trainings": 40, "volunteers": 100 }
```

### sponsors.json (extended)

```json
[
  {
    "name": "...",
    "logo": "...",
    "url": "...",
    "tier": "Gold|Silver|Community"
  }
]
```

### wishlist.json (extended)

```json
[
  {
    "name": "...",
    "category": "Technology|Student Support|Merchandise",
    "description": "...",
    "priority": "High|Medium|Low",
    "quantity": 0
  }
]
```

### resources.json (~12 items)

```json
[
  {
    "title": "...",
    "category": "Training|Lesson Plans|Downloads|Videos|Safety & AI",
    "type": "PDF|Video|Link",
    "description": "...",
    "url": "#",
    "level": "Beginner|Intermediate|Advanced",
    "audience": "student|faculty|both"
  }
]
```

### events.json (~6 items)

```json
[
  {
    "title": "...",
    "date": "2026-06-07",
    "location": "...",
    "description": "...",
    "type": "Training|Workshop|Competition|STEM Fair"
  }
]
```

---

## contact.php (updated)

Detects `form_type` field (`school` or `sponsor`). Each type validates its own required fields and sends a distinct email subject line. Returns JSON `{ success: true }` or `{ success: false, error: "..." }`. Never reloads the page.

---

## Main Site Back-link

Add a prominent banner section to `../index.html` (main CodeCore site) between the welcome section and the content grid: "Explore CodeCore Chapters →" linking to `chapter/index.html`. Styled to match the main site's card aesthetic.

---

## Out of Scope

- Real sponsor logos (paths provided, images not created)
- Live calendar integration (static placeholder)
- Student authentication / badge earning backend
- Analytics beyond the existing `analytics.js` include
