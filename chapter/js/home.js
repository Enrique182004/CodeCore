"use strict";

const FALLBACK_STATS = {
  students: 150,
  schools: 2,
  trainings: 2,
  volunteers: 20,
};
const FALLBACK_SPONSORS = [
  {
    name: "El Paso Electric",
    logo: "images/sponsors/EPEC_logo.png",
    url: "https://www.epelectric.com/",
    tier: "Gold",
  },
  {
    name: "Chiquis Bakery",
    logo: "images/sponsors/chiquisBakery_logo.webp",
    url: "https://www.chiquisbakery.com/",
    tier: "Silver",
  },
  {
    name: "Become a Sponsor",
    logo: "images/sponsors/placeholder.png",
    url: "sponsors.html",
    tier: "Community",
  },
];

document.addEventListener("DOMContentLoaded", () => {
  initStats();
  initSponsors();
});

async function initStats() {
  const data = await loadJSON("data/stats.json", FALLBACK_STATS);

  const statMap = {
    "stat-students": data.students,
    "stat-schools": data.schools,
    "stat-trainings": data.trainings,
    "stat-volunteers": data.volunteers,
  };

  const band = document.querySelector(".home-stats");
  if (!band) return;

  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        Object.entries(statMap).forEach(([id, target]) => {
          animateCount(document.getElementById(id), target);
        });
        observer.disconnect();
      }
    },
    { threshold: 0.3 },
  );

  observer.observe(band);
}

function animateCount(el, target) {
  if (!el) return;
  const duration = 1600;
  const start = performance.now();
  function step(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent =
      Math.round(eased * target).toLocaleString() + (target >= 100 ? "+" : "");
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

async function initSponsors() {
  const sponsors = await loadJSON("data/sponsors.json", FALLBACK_SPONSORS);
  const strip = document.getElementById("sponsor-strip");
  if (!strip) return;

  strip.textContent = "";
  sponsors.forEach((s) => {
    const el = document.createElement(s.url ? "a" : "div");
    el.className = "sponsor-logo-card";
    if (s.url) {
      el.href = s.url;
      el.target = "_blank";
      el.rel = "noopener noreferrer";
    }

    const img = document.createElement("img");
    img.src = s.logo;
    img.alt = s.name + " logo";
    img.addEventListener("error", () => {
      img.style.display = "none";
      placeholder.style.display = "flex";
    });
    el.appendChild(img);

    const placeholder = document.createElement("div");
    placeholder.className = "sponsor-logo-placeholder";
    placeholder.textContent = s.name;
    placeholder.style.display = "none";
    el.appendChild(placeholder);

    const name = document.createElement("span");
    name.textContent = s.name;
    el.appendChild(name);

    strip.appendChild(el);
  });
}
