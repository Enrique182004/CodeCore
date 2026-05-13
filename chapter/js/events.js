"use strict";

const FALLBACK_EVENTS = [
  {
    title: "Saturday Faculty Training",
    date: "2026-06-07",
    location: "UTEP College of Engineering, Room 201",
    description:
      "Monthly training for new and returning volunteers. Covers Scratch, Python basics, and classroom management.",
    type: "Training",
  },
  {
    title: "Beall Elementary STEM Fair",
    date: "2026-06-14",
    location: "Beall Elementary School Gymnasium",
    description:
      "End-of-semester showcase where students present their coding projects to parents and the community.",
    type: "STEM Fair",
  },
  {
    title: "Middle School Coding Challenge",
    date: "2026-06-21",
    location: "Guillen Middle School Computer Lab",
    description:
      "Friendly competition between Guillen and Henderson chapters. Students solve puzzles and present a mini-project.",
    type: "Competition",
  },
  {
    title: "AI Exploration Workshop",
    date: "2026-07-12",
    location: "UTEP Library, Room 208",
    description:
      "A half-day workshop on AI concepts, machine learning basics, and responsible AI use — no prior experience needed.",
    type: "Workshop",
  },
  {
    title: "Saturday Faculty Training",
    date: "2026-07-19",
    location: "UTEP College of Engineering, Room 201",
    description:
      "Summer session covering data science basics, robotics curriculum, and assessment strategies.",
    type: "Training",
  },
  {
    title: "Fall 2026 Chapter Launch Day",
    date: "2026-08-22",
    location: "Multiple El Paso Schools",
    description:
      "Kick-off day for all Fall 2026 chapters. CodeCore volunteers visit partner schools for a first-session icebreaker.",
    type: "Workshop",
  },
];

const TYPE_CHIP = {
  Training: "ev-type-training",
  Workshop: "ev-type-workshop",
  Competition: "ev-type-competition",
  "STEM Fair": "ev-type-stem-fair",
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
});

function renderEvents(events) {
  const list = document.getElementById("events-list");
  if (!list) return;
  list.textContent = "";

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
