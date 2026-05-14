"use strict";

const FALLBACK_SCHOOLS = [
  {
    name: "Reyes Elementary School",
    level: "Elementary",
    status: "In Talks",
    pilot: true,
    description:
      "CodeCore supported their science fair and is in active discussions about launching a chapter for Fall 2026.",
    lat: 31.7619,
    lng: -106.485,
    grades: "3–5",
  },
];

document.addEventListener("DOMContentLoaded", async () => {
  const schools = await loadJSON("data/schools.json", FALLBACK_SCHOOLS);
  renderSchoolCards(schools);
  initMap(schools);
  initFAQ();
});

/* ── School cards ── */
function renderSchoolCards(schools) {
  const grid = document.getElementById("schools-grid");
  if (!grid) return;
  grid.textContent = "";

  if (schools.length === 1) grid.classList.add("schools-grid-centered");

  schools.forEach((school, i) => {
    const card = document.createElement("div");
    card.className = "ch-card school-card";
    card.style.animationDelay = i * 0.12 + "s";

    const badge = document.createElement("span");
    badge.className =
      "school-level-badge " +
      (school.level === "Elementary" ? "elementary" : "middle-school");
    badge.textContent = school.level;
    card.appendChild(badge);

    const h3 = document.createElement("h3");
    h3.textContent = school.name;
    card.appendChild(h3);

    const p = document.createElement("p");
    p.textContent = school.description;
    card.appendChild(p);

    if (school.pilot) {
      const pilotBadge = document.createElement("span");
      pilotBadge.className = "school-pilot-badge";
      pilotBadge.textContent = "⭐ Pilot Project";
      card.appendChild(pilotBadge);
    }

    grid.appendChild(card);
  });
}

/* ── Leaflet map ── */
function initMap(schools) {
  const mapEl = document.getElementById("schools-map");
  if (!mapEl || typeof L === "undefined") return;

  const map = L.map("schools-map").setView([31.762, -106.485], 12);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 19,
  }).addTo(map);

  schools.forEach((school) => {
    if (typeof school.lat !== "number" || typeof school.lng !== "number")
      return;

    const popupEl = document.createElement("div");
    const strong = document.createElement("strong");
    strong.textContent = school.name;
    popupEl.appendChild(strong);
    popupEl.appendChild(document.createElement("br"));
    popupEl.appendChild(document.createTextNode(school.level));

    L.marker([school.lat, school.lng]).addTo(map).bindPopup(popupEl);
  });
}

/* ── FAQ accordion ── */
function initFAQ() {
  document.querySelectorAll(".faq-question").forEach((btn) => {
    btn.addEventListener("click", () => {
      const isOpen = btn.getAttribute("aria-expanded") === "true";
      const answer = btn.nextElementSibling;

      document.querySelectorAll(".faq-question").forEach((other) => {
        if (other !== btn) {
          other.setAttribute("aria-expanded", "false");
          other.nextElementSibling.classList.remove("open");
        }
      });

      btn.setAttribute("aria-expanded", String(!isOpen));
      answer.classList.toggle("open", !isOpen);
    });
  });
}
