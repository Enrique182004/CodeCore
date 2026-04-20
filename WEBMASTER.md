# CodeCore Webmaster Guide

This document explains how to manage the CodeCore website — adding workshops, updating the calendar, and managing the photo gallery. Read this before touching anything.

---

## Table of Contents

1. [Project Structure](#1-project-structure)
2. [Adding a New Workshop](#2-adding-a-new-workshop)
3. [Editing an Existing Workshop](#3-editing-an-existing-workshop)
4. [Archiving / Removing a Workshop](#4-archiving--removing-a-workshop)
5. [Managing the Photo Gallery](#5-managing-the-photo-gallery)
6. [Adding a New Page to the Nav](#6-adding-a-new-page-to-the-nav)
7. [Pushing Changes to GitHub](#7-pushing-changes-to-github)

---

## 1. Project Structure

```
CodeCore/
├── index.html                  ← Home page
├── css/
│   ├── index.css               ← Global styles (header, nav, body)
│   ├── gallery.css             ← Gallery page styles
│   ├── forms.css               ← Forms/workshops page styles
│   ├── calendar-page.css       ← Calendar page styles
│   ├── footer.css              ← Footer styles
│   └── mobile-menu.css         ← Mobile hamburger menu styles
├── html/
│   ├── gallery.html            ← Photo gallery main page
│   ├── gallery/
│   │   └── event.html          ← Individual event photo viewer (reusable)
│   ├── forms.html              ← Workshops + forms page
│   ├── calendar.html           ← Workshop calendar page
│   ├── officers.html
│   ├── collaborators.html
│   └── about.html
├── js/
│   ├── gallery-data.js         ← Gallery events + photo lists (EDIT THIS for gallery)
│   ├── calendar-page.js        ← Workshop data for the calendar (EDIT THIS for calendar)
│   ├── forms-live.js           ← Fallback workshop data for forms page (EDIT THIS too)
│   └── mobile-menu.js          ← Handles hamburger menu (do not edit)
├── php/
│   └── workshop-api.php        ← Master workshop list — API source of truth (EDIT THIS first)
└── images/
    ├── gallery/                ← Photo folders — one subfolder per event
    │   ├── explore-your-path/
    │   ├── cs2-review/
    │   └── women-empowerment/
    ├── officers/
    ├── faculty/
    └── logos/
```

> **Key rule:** Workshops live in **3 places** that must always stay in sync:
> `php/workshop-api.php` → `js/forms-live.js` → `js/calendar-page.js`
>
> The Gallery lives in **one place only:** `js/gallery-data.js`

---

## 2. Adding a New Workshop

You need to add the workshop to **3 files**. The data is the same across all three — just the format differs slightly.

### Step 1 — `php/workshop-api.php`

This is the master list. Open the file and find the `$workshops = [` array at the top.

Add a new block **before** the `// ARCHIVED WORKSHOPS` comment for upcoming events, or anywhere inside the array for past ones:

```php
[
    'id'           => 'your-unique-id',      // lowercase, hyphens only, no spaces
    'icon'         => '🎯',                  // any emoji
    'title'        => 'Your Workshop Title',
    'description'  => 'Short topic description',
    'date'         => '2026-05-10',          // YYYY-MM-DD format
    'startTime'    => '12:00',               // 24-hour format HH:MM
    'endTime'      => '13:30',               // 24-hour format HH:MM
    'location'     => 'CCSB 1.0410',
    'formLink'     => 'https://forms.gle/yourlink',  // leave '' if none
    'status'       => 'open'                 // 'open', 'closed', or 'past'
],
```

> **Status values:**
> - `open` → registration is open, shows green badge
> - `closed` → registration closed, shows grey badge
> - `past` → archived, auto-set by the server after end time

> **Auto-archive:** The PHP file automatically marks workshops as `past` once their end time passes. You don't need to manually change `status` to `'past'` unless you want to force it early.

---

### Step 2 — `js/forms-live.js`

This is the fallback used when the PHP server is unavailable (e.g., opening the site as a local file). Find the `FALLBACK_WORKSHOPS = [` array and add the same workshop in JavaScript object format:

```js
{
    id:          'your-unique-id',       // must match the id in workshop-api.php
    icon:        '🎯',
    title:       'Your Workshop Title',
    description: 'Short topic description',
    date:        '2026-05-10',
    startTime:   '12:00',
    endTime:     '13:30',
    location:    'CCSB 1.0410',
    formLink:    'https://forms.gle/yourlink',
    status:      'open'
},
```

Place upcoming workshops **at the top** of the array, past ones below the others.

---

### Step 3 — `js/calendar-page.js`

This drives the calendar view. Find the `workshopEvents = [` array near the top of `initializeCalendarPage()`.

Add the workshop in this slightly different format:

```js
{
    id:          'your-unique-id',       // must match the other files
    title:       'Your Workshop Title',
    date:        '2026-05-10',
    time:        '12:00 PM - 1:30 PM',  // human-readable string for display
    location:    'CCSB 1.0410',
    description: 'Topics: Short topic description',
    formLink:    'https://forms.gle/yourlink',
    seats:       '35/35',               // e.g. '20/35' or 'Full'
    status:      'open'
},
```

Place upcoming workshops in the **`// Upcoming Workshops (Open)`** section and past ones under **`// Past Workshops (Archive)`**.

---

### Quick checklist for a new workshop

- [ ] Added to `php/workshop-api.php`
- [ ] Added to `js/forms-live.js`
- [ ] Added to `js/calendar-page.js`
- [ ] All three use the **same `id`**
- [ ] Date is in `YYYY-MM-DD` format in all three
- [ ] Times in `HH:MM` (24h) in the PHP and JS fallback files
- [ ] Time in `"H:MM AM/PM - H:MM AM/PM"` format in calendar-page.js

---

## 3. Editing an Existing Workshop

Find the workshop by its `id` in **all three files** and update the relevant fields. The `id` itself should never change — it's used as a key across the system.

Common edits:
- **Change the date/time** → update `date`, `startTime`, `endTime` in all 3 files
- **Add a form link** → update `formLink` in all 3 files
- **Change status to closed** → set `status: 'closed'` in all 3 files
- **Manually archive** → set `status: 'past'` in all 3 files

---

## 4. Archiving / Removing a Workshop

### To archive (keep it visible in the Past section)

In all three files, change `status` to `'past'`:

```php
// workshop-api.php
'status' => 'past'

// forms-live.js and calendar-page.js
status: 'past'
```

The workshop will move to the archive section automatically.

### To remove it entirely

Delete the entire block for that workshop from all three files. Make sure you delete the full object including the trailing comma.

---

## 5. Managing the Photo Gallery

The gallery system has two parts:
- `js/gallery-data.js` — the data file you edit
- `images/gallery/<event-id>/` — where you put the actual photo files

### Adding photos to an existing event

1. Copy your photo files (`.jpg`, `.png`, `.webp`) into:
   ```
   images/gallery/<event-id>/
   ```
   For example, for the Faculty Panel:
   ```
   images/gallery/explore-your-path/photo1.jpg
   images/gallery/explore-your-path/group.jpg
   ```

2. Open `js/gallery-data.js` and find the matching event by its `id`. Add the filenames to the `photos` array:
   ```js
   photos: ['photo1.jpg', 'group.jpg']
   ```

3. The gallery card will automatically show the first photo as a cover thumbnail, display a photo count badge, and activate the "View Images" button.

---

### Adding a brand new gallery event

1. Open `js/gallery-data.js` and add a new object to the `GALLERY_EVENTS` array:

```js
{
    id:       'your-unique-id',       // lowercase, hyphens only
    icon:     '🎓',                   // emoji shown when no cover photo
    title:    'Event Name Here',
    date:     'April 22, 2026',       // human-readable, shown on the card
    location: 'CCSB 1.0410',
    time:     '11:30 AM – 1:00 PM',
    status:   'past',                 // 'past' or 'upcoming'
    photos:   []                      // empty until you add photos
},
```

2. Create the photo folder (even if empty for now):
   ```
   images/gallery/your-unique-id/
   ```

3. That's it — the card will appear on `html/gallery.html` immediately.

> **Tip:** Add events in reverse chronological order (newest first) so the most recent events appear at the top.

---

### Removing a gallery event

Delete its object from the `GALLERY_EVENTS` array in `js/gallery-data.js` and optionally delete its photo folder from `images/gallery/`.

---

## 6. Adding a New Page to the Nav

The nav bar appears on every page and must be updated **manually** in each HTML file. There is no shared template.

Files that contain the nav (all must be updated):
- `index.html`
- `html/about.html`
- `html/officers.html`
- `html/collaborators.html`
- `html/calendar.html`
- `html/forms.html`
- `html/gallery.html`
- `html/gallery/event.html`

In each file, find the `<nav>` block and add your new link:

```html
<!-- In html/*.html files (one level deep): -->
<li><a href="new-page.html">New Page</a></li>

<!-- In index.html (at root level): -->
<li><a href="html/new-page.html">New Page</a></li>

<!-- In html/gallery/event.html (two levels deep): -->
<li><a href="../new-page.html">New Page</a></li>
```

To highlight the active page, add `class="active"` to the link on its own page:
```html
<li><a href="new-page.html" class="active">New Page</a></li>
```

---

## 7. Pushing Changes to GitHub

The site is hosted and version-controlled at:
**https://github.com/Enrique182004/CodeCore**

After making any changes, run these commands in the terminal from the project root:

```bash
# 1. Check what changed
git status

# 2. Stage the files you changed
git add html/forms.html js/forms-live.js php/workshop-api.php
# Or stage everything at once:
git add .

# 3. Commit with a descriptive message
git commit -m "add Spring Banquet workshop — May 3"

# 4. Push to GitHub
git push origin main
```

> If you're pushing for the first time on a new machine, GitHub may ask for your credentials. Use your GitHub username and a Personal Access Token (not your password) — generate one at https://github.com/settings/tokens.

---

*Last updated: April 2026 — maintained by the CodeCore web team*
