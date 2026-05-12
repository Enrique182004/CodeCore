"use strict";

const FALLBACK_STATS = {
  students: 1200,
  schools: 25,
  trainings: 40,
  volunteers: 100,
};
const FALLBACK_SPONSORS = [
  {
    name: "UTEP College of Engineering",
    logo: "../images/sponsors/utep-engineering.png",
    url: "https://www.utep.edu/engineering/",
    tier: "Gold",
  },
  {
    name: "El Paso Electric",
    logo: "../images/sponsors/elpaso-electric.png",
    url: "https://www.epelectric.com/",
    tier: "Gold",
  },
  {
    name: "Hunt Companies",
    logo: "../images/sponsors/hunt-companies.png",
    url: "https://www.huntcompanies.com/",
    tier: "Silver",
  },
  {
    name: "GECU",
    logo: "../images/sponsors/gecu.png",
    url: "https://www.gecu.com/",
    tier: "Silver",
  },
  {
    name: "Sun Metro",
    logo: "../images/sponsors/sun-metro.png",
    url: "https://www.elpasotexas.gov/sun-metro/",
    tier: "Community",
  },
  {
    name: "Become a Sponsor",
    logo: "../images/sponsors/placeholder.png",
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
    });
    el.appendChild(img);

    const name = document.createElement("span");
    name.textContent = s.name;
    el.appendChild(name);

    strip.appendChild(el);
  });
}
