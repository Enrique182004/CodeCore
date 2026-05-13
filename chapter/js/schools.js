"use strict";

const FALLBACK_SCHOOLS = [
  {
    name: "Beall Elementary School",
    level: "Elementary",
    description:
      "Our flagship chapter — active since Spring 2026. 24 students meet every Thursday to learn Scratch and Python basics with UTEP CodeCore volunteers.",
    lat: 31.7562,
    lng: -106.485,
  },
  {
    name: "Guillen Middle School",
    level: "Middle School",
    description:
      "Launched Fall 2025. 18 students explore web development, Python, and intro algorithms in bi-weekly sessions led by CodeCore members.",
    lat: 31.7689,
    lng: -106.4731,
  },
  {
    name: "Zavala Elementary School",
    level: "Elementary",
    description:
      "Started Spring 2026. 15 third and fourth graders build games in Scratch and tackle unplugged coding puzzles each Friday afternoon.",
    lat: 31.782,
    lng: -106.5012,
  },
  {
    name: "Henderson Middle School",
    level: "Middle School",
    description:
      "New chapter launching Fall 2026. Students will cover HTML/CSS, Python fundamentals, and finish the semester with a personal project showcase.",
    lat: 31.7511,
    lng: -106.4883,
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
