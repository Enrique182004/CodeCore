"use strict";

const FALLBACK_EVENTS = [
  {
    title: "School Outreach — Scotsdale Elementary Follow-Up",
    date: "2026-06-15",
    location: "El Paso, TX",
    description:
      "Follow up with Scotsdale Elementary and begin formal conversations with additional El Paso schools about launching a CodeCore Chapter.",
    type: "Outreach",
  },
  {
    title: "Officer Recruitment Opens",
    date: "2026-06-15",
    location: "UTEP Campus",
    description:
      "Open applications for Chapter Officer roles — Outreach, Curriculum, Operations, Communications. No CS background required.",
    type: "Recruitment",
  },
  {
    title: "Officer Selection & Onboarding",
    date: "2026-07-01",
    location: "UTEP Campus",
    description:
      "Select officers and begin internal training sessions covering program structure, curriculum basics, and school outreach.",
    type: "Training",
  },
  {
    title: "Curriculum & Materials Prep",
    date: "2026-07-15",
    location: "UTEP Campus",
    description:
      "Finalize lesson plans for grades 3–5 and 6–8 tracks. Prepare activity cards, volunteer guides, and parent info sheets.",
    type: "Training",
  },
  {
    title: "Faculty Onboarding Sessions",
    date: "2026-08-15",
    location: "UTEP Campus",
    description:
      "6-hour onboarding for each school's faculty point-of-contact covering how to lead sessions and support students.",
    type: "Training",
  },
  {
    title: "First Chapter Launch",
    date: "2026-09-01",
    location: "Partner School(s), El Paso TX",
    description:
      "First CodeCore Chapter sessions begin. UTEP volunteers present for the first two weeks, then once a month.",
    type: "Launch",
  },
  {
    title: "Coding Day at Scotsdale Elementary",
    date: "2026-11-12",
    location: "Scotsdale Elementary School, El Paso TX",
    description:
      "Students write real code in a browser coding game to guide their hero, collect gems, and escape the dungeon.",
    type: "Workshop",
  },
  {
    title: "End-of-Semester Hackathon",
    date: "2026-12-01",
    location: "Chapter School(s), El Paso TX",
    description:
      "Hackathon at each chapter school. Students present projects, prizes awarded, winners published by name and school.",
    type: "Hackathon",
  },
];

const TYPE_CHIP = {
  Training: "ev-type-training",
  Workshop: "ev-type-workshop",
  Competition: "ev-type-competition",
  "School Wide Challenges": "ev-type-stem-fair",
  Outreach: "ev-type-outreach",
  Recruitment: "ev-type-outreach",
  Launch: "ev-type-launch",
  Hackathon: "ev-type-competition",
};

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

document.addEventListener("DOMContentLoaded", async () => {
  const events = await loadJSON("data/events.json", FALLBACK_EVENTS);
  renderEvents(events);
  renderCalendar(events);
});

/* ── Month calendar: current month, event days highlighted ── */
function renderCalendar(events) {
  const grid = document.getElementById("ev-cal-grid");
  const title = document.getElementById("ev-cal-title");
  if (!grid) return;
  grid.textContent = "";

  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const leadingBlanks = new Date(year, month, 1).getDay(); // Sun = 0

  if (title) {
    title.textContent = now.toLocaleString("en-US", {
      month: "long",
      year: "numeric",
    });
  }

  const byDay = {};
  events.forEach((ev) => {
    const d = new Date(ev.date + "T00:00:00");
    if (d.getFullYear() === year && d.getMonth() === month) {
      (byDay[d.getDate()] = byDay[d.getDate()] || []).push(ev.title);
    }
  });

  for (let i = 0; i < leadingBlanks; i++) {
    const blank = document.createElement("div");
    blank.className = "ev-cal-day ev-cal-empty";
    grid.appendChild(blank);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const cell = document.createElement("div");
    cell.className = "ev-cal-day";
    cell.textContent = day;
    if (byDay[day]) {
      cell.classList.add("ev-cal-event");
      cell.title = byDay[day].join(" · ");
    }
    grid.appendChild(cell);
  }
}

function renderEvents(allEvents) {
  const list = document.getElementById("events-list");
  if (!list) return;
  list.textContent = "";

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const events = allEvents
    .filter((ev) => new Date(ev.date + "T00:00:00") >= today)
    .sort((a, b) => a.date.localeCompare(b.date));

  if (!events.length) {
    const p = document.createElement("p");
    p.className = "ch-loading";
    p.textContent = "No upcoming events. Check back soon!";
    list.appendChild(p);
    return;
  }

  events.forEach((ev) => {
    const card = document.createElement("div");
    card.className = "ev-card";

    /* Date badge */
    const d = new Date(ev.date + "T00:00:00");
    const dateBadge = document.createElement("div");
    dateBadge.className = "ev-date-badge";

    const month = document.createElement("div");
    month.className = "ev-date-month";
    month.textContent = MONTHS[d.getMonth()];
    dateBadge.appendChild(month);

    const day = document.createElement("div");
    day.className = "ev-date-day";
    day.textContent = d.getDate();
    dateBadge.appendChild(day);

    card.appendChild(dateBadge);

    /* Body */
    const body = document.createElement("div");
    body.className = "ev-card-body";

    const top = document.createElement("div");
    top.className = "ev-card-top";

    const chip = document.createElement("span");
    chip.className = "ev-type-chip " + (TYPE_CHIP[ev.type] || "");
    chip.textContent = ev.type;
    top.appendChild(chip);

    body.appendChild(top);

    const h3 = document.createElement("h3");
    h3.textContent = ev.title;
    body.appendChild(h3);

    const loc = document.createElement("p");
    loc.className = "ev-location";
    loc.textContent = ev.location;
    body.appendChild(loc);

    const desc = document.createElement("p");
    desc.textContent = ev.description;
    body.appendChild(desc);

    card.appendChild(body);
    list.appendChild(card);
  });
}
