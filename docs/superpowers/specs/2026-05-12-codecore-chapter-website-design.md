# CodeCore Chapter Website — Design Spec

**Date:** 2026-05-12  
**Status:** Approved  
**Design approach:** Option A — faithful to the `chapter/ideas/website mockup.png` blueprint

---

## Overview

A complete, standalone 8-page website for the CodeCore Chapter program, living in `chapter/`. Built with plain HTML, CSS, JavaScript, and PHP — no frameworks. Separate visual identity from the main CodeCore club site: bold dark navy + lime green, student-first energy, professional enough for schools and sponsors.

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

### Shared component injection

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
├── contact.php          ← handles both form types via hidden form_type field
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
**Existing files updated:** `chapter/contact.php` (extended for dual forms), `chapter/data/sponsors.json` (add tier), `chapter/data/wishlist.json` (add category)  
**Existing files kept as-is:** `chapter/data/schools.json`

---

## Design System

### Colors

```css
:root {
  --navy: #1a2e4a; /* hero backgrounds, navbar */
  --navy-dark: #0f1e31; /* footer, darkest sections */
  --navy-mid: #1e3d5c; /* alternating dark sections */
  --green: #7cb342; /* primary CTAs, highlights, active nav */
  --green-bright: #8dc63f; /* hover states */
  --teal: #2b7a9e; /* secondary accent, links */
  --white: #ffffff;
  --off-white: #f4f8ff; /* light card/section backgrounds */
  --gray-100: #e8edf5;
  --text-dark: #1a2e4a;
  --text-mid: #4a5568;
  --text-light: #a0aec0;
  --priority-high: #e53e3e;
  --priority-medium: #dd6b20;
  --priority-low: #7cb342;
}
```

### Typography

```css
--font-primary: "Segoe UI", system-ui, sans-serif;
--text-hero: clamp(2.8rem, 6vw, 5rem);
--text-h1: clamp(2rem, 4vw, 3.5rem);
--text-h2: clamp(1.6rem, 3vw, 2.5rem);
--text-h3: 1.4rem;
--text-body: 1.05rem;
--text-sm: 0.9rem;
```

### Visual language rules

1. **Dark hero on every page**: navy gradient background, white text, lime-green primary CTA button
2. **Code symbol watermarks**: `</>`, `{ }`, `01` as large faded `::before`/`::after` decorations in hero sections
3. **Green = action**: every primary button uses `--green`; secondary buttons are white-outlined
4. **Stats always animate**: IntersectionObserver triggers count-up from 0 when the band scrolls into view
5. **Cards**: white/off-white background, `border-radius: 16px`, `box-shadow: 0 8px 24px rgba(0,0,0,0.08)`, hover lifts `-6px`
6. **Photo assets**: use images from `chapter/ideas/` — `g on computer v2.png` for home hero, others for mosaic and section imagery

---

## Shared Components

### Navbar (injected by main.js)

- Left: `../images/logos/C.png` icon + "CodeCore Chapter" wordmark (navy-to-green gradient text)
- Center: Home · About · For Schools · Student Hub · Resources · Sponsors · Events · Contact
- Right: solid green pill button "Start a Chapter" → `contact.html`
- Sticky, `position: sticky; top: 0`, `backdrop-filter: blur(10px)`, white/95% background
- Active page link highlighted with `--green` color and bottom underline
- Collapses to hamburger on ≤768px — same slide-in panel + overlay animation as main site `mobile-menu.js`

### Footer (injected by main.js)

Three-column layout, `--navy-dark` background, white text:

| Col 1                                                            | Col 2                      | Col 3                                                                         |
| ---------------------------------------------------------------- | -------------------------- | ----------------------------------------------------------------------------- |
| CodeCore Chapter blurb + Instagram / LinkedIn / Email icon links | Quick links to all 8 pages | "Part of the CodeCore Family → Visit CodeCore.org" linking to `../index.html` |

### Data loading pattern (all page JS files)

```js
async function loadJSON(url, fallback) {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error();
    return await res.json();
  } catch {
    return fallback; // inline constant, works on file://
  }
}
```

Every page JS defines a `FALLBACK_*` constant so the page renders without a server.

---

## Pages

### index.html — Home

Sections in order:

1. **Hero** — full-viewport navy, `ideas/g on computer v2.png` right-aligned. Headline: "CODE TODAY." (white) "CHANGE TOMORROW." (green). Tagline: "Empowering El Paso middle school students through STEM, coding, and responsible AI education." Two CTAs: "Start a Chapter" (green solid) + "Become a Sponsor" (white outlined)
2. **Pillars bar** — 4 icon cards on light background: `</>` Learn · `⚙` Build · `🤖` Explore AI · `👥` Belong. Brief one-line description each
3. **Impact stats band** — dark green background, animated counters from `stats.json`: students impacted, schools, Saturday trainings, volunteers & mentors
4. **Activities grid** — 5 cards with icon, title, one-line description: Coding & Games, Robotics, AI Exploration, Team Projects, Competitions
5. **Photo mosaic** — 3-column CSS grid using `ideas/` images, each with a dark overlay and short caption text
6. **Sponsor strip** — "Powered by Community Support" heading, logo cards from `sponsors.json`, "Become a Sponsor" link
7. **"Join the Movement" CTA banner** — navy background, bold copy, two buttons: "Start a Chapter" + "Contact Us"
8. Footer

### about.html — About Us

Hero: "STEM IS FOR EVERYONE." Alternating light/dark band layout:

- **Mission & Vision** — two-column cards (emoji icon, heading, paragraph)
- **Why STEM Matters** — stat highlights + paragraph copy (realistic placeholder content)
- **Responsible AI Education** — what students learn about AI ethics, safety, and responsible use
- **Community Impact** — El Paso focus, partnership with UTEP, local schools served
- **Leadership Team** — placeholder grid of 4 cards (avatar circle, name, title)

All copy written as realistic placeholder content matching the brand voice.

### schools.html — For Schools

Hero: "BRING CODING TO YOUR SCHOOL."

- **4-step visual process**: numbered cards in a row — Apply → Connect → Train → Launch (icon + title + 2-line description each)
- **Program requirements**: icon list (free for schools, UTEP volunteer-led, flexible scheduling, etc.)
- **Faculty training**: card describing Saturday training workshops at UTEP for participating teachers
- **FAQ accordion**: 6 questions, click to expand, animated height transition
- **Participation timeline**: horizontal bar on desktop (stacks vertically on mobile), 5 milestones
- **CTA section**: "Ready to bring CodeCore to your school?" → `contact.html`

### students.html — Student Hub

Brightest page — more color saturation, playful card shapes.

Hero: "YOUR CODING ADVENTURE STARTS HERE." with `ideas/group playing games v2.png`.

- **Activity cards**: Coding & Games · Robotics · AI Projects · STEM Challenges — each with bold color accent and "Try It" button
- **Video section**: 3 YouTube `<iframe>` placeholders with poster thumbnails and titles
- **Downloadable projects**: filtered cards from `resources.json` where `audience === "student"`
- **Achievement badges**: 6 CSS hexagon badges (First Code, Bug Squasher, Robot Builder, AI Explorer, Team Player, Competitor) — locked/unlocked visual state
- **Competitions callout**: navy banner describing upcoming STEM fairs and coding competitions

### resources.html — Resources

Hero: "LEARN. BUILD. GROW." with learning path bar: Beginner → Intermediate → Advanced (3-step horizontal, stacks on mobile).

- **Category filter bar**: All / Training / Lesson Plans / Downloads / Videos / Safety & AI — clicking filters card grid via JS (no page reload)
- **Resource cards** from `resources.json`: colored type badge (PDF/Video/Link), title, one-line description, level badge (Beginner/Intermediate/Advanced), action button

### sponsors.html — Sponsors & Partners

Hero: "POWER THE NEXT GENERATION."

- **How it works**: 3-column strip — Choose Tier · Make Contact · See Impact
- **Benefits table**: Gold / Silver / Community columns, rows for logo placement, event presence, report, etc.
- **Sponsor showcase**: grouped by tier from `sponsors.json` — Gold tier has larger cards
- **Wishlist section**: category tab pills (Technology / Student Support / Merchandise), card grid from `wishlist.json`, priority badge on each card
- **Embedded interest form**: Name, Organization, Email, Type of Support (dropdown), Message — AJAX to `contact.php` with `form_type: sponsor`

### events.html — Events

Hero: "JOIN US. LEARN. COMPETE."

- **Upcoming events**: cards from `events.json` — date badge (month/day), title, location, type chip (Training/Workshop/Competition/STEM Fair), description
- **Static calendar placeholder**: CSS grid month view, hardcoded, easy to update
- **Saturday training section**: recurring session info card with time/location/topics
- **Announcements band**: 2–3 placeholder announcement items

### contact.html — Contact / Join Us

Hero: "LET'S BUILD SOMETHING TOGETHER."

Two-track layout (side-by-side on desktop ≥900px, stacked on mobile):

**Left — School Interest Form**  
Fields: School Name\*, Principal/Contact Name\*, Email\*, Phone, Grade Levels (checkbox group: K–2, 3–5, 6–8), Message\*  
`form_type: school`

**Right — Sponsor / Volunteer Form**  
Fields: Full Name\*, Organization, Email\*, Role\* (Sponsor / Volunteer / General / Other), Message\*  
`form_type: sponsor`

Both: AJAX submit, inline success/error feedback, no page reload.

Below forms: general contact info card (email address, response time note) + social media icon links.

---

## Data Files

### stats.json

```json
{ "students": 1200, "schools": 25, "trainings": 40, "volunteers": 100 }
```

### sponsors.json (extended — add `tier` to existing entries)

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

### wishlist.json (extended — add `category` to existing entries)

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

Detects `form_type` (`school` or `sponsor`). Each type validates its own required fields and uses a distinct email subject prefix. Returns `{ "success": true }` or `{ "success": false, "error": "..." }`. Never reloads the page. Input is sanitized with `strip_tags` + `str_replace` to prevent header injection.

---

## Main Site Back-link

Add a prominent banner section to `../index.html` (main CodeCore site) between the welcome section and the content grid: "Explore CodeCore Chapters →" styled as a wide card matching the main site's card aesthetic (white gradient, blue border, hover lift), linking to `chapter/index.html`.

---

## Out of Scope

- Real sponsor logos (paths provided, image files not created)
- Live calendar integration (static placeholder grid)
- Student authentication or badge-earning backend
- Analytics beyond the existing `../js/analytics.js` include
