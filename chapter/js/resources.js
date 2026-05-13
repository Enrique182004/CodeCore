"use strict";

const FALLBACK_RESOURCES = [
  {
    title: "Scratch Basics for Beginners",
    category: "Lesson Plans",
    type: "PDF",
    description:
      "Step-by-step guide to building your first Scratch project — sprites, loops, and simple animations.",
    url: "#",
    level: "Beginner",
    audience: "student",
  },
  {
    title: "Python Fundamentals Handbook",
    category: "Training",
    type: "PDF",
    description: "Core Python concepts for CodeCore volunteer instructors.",
    url: "#",
    level: "Beginner",
    audience: "faculty",
  },
  {
    title: "Web Development Intro",
    category: "Lesson Plans",
    type: "PDF",
    description:
      "HTML & CSS basics — build your first webpage in a single session.",
    url: "#",
    level: "Beginner",
    audience: "student",
  },
  {
    title: "Algorithm Thinking Workshop",
    category: "Training",
    type: "Video",
    description:
      "Recording of the Fall 2025 Saturday training session on sorting and searching.",
    url: "#",
    level: "Intermediate",
    audience: "faculty",
  },
  {
    title: "Robotics Activity Pack",
    category: "Downloads",
    type: "PDF",
    description:
      "Printable sheets for Raspberry Pi and LEGO robotics sessions.",
    url: "#",
    level: "Intermediate",
    audience: "both",
  },
  {
    title: "AI Ethics Discussion Guide",
    category: "Safety & AI",
    type: "PDF",
    description:
      "Classroom discussion prompts on bias, privacy, and responsible AI for grades 5–8.",
    url: "#",
    level: "Intermediate",
    audience: "both",
  },
  {
    title: "CS Unplugged Activities",
    category: "Downloads",
    type: "PDF",
    description:
      "Screen-free card activities for binary numbers, sorting, and logic puzzles.",
    url: "#",
    level: "Beginner",
    audience: "both",
  },
  {
    title: "Chapter Facilitator Handbook",
    category: "Training",
    type: "PDF",
    description: "Everything a new volunteer needs to run their first session.",
    url: "#",
    level: "Beginner",
    audience: "faculty",
  },
  {
    title: "Scratch Game Design Challenge",
    category: "Lesson Plans",
    type: "Link",
    description:
      "Four-week project guide: design and share a fully playable Scratch game.",
    url: "#",
    level: "Intermediate",
    audience: "student",
  },
  {
    title: "Intro to Data Science",
    category: "Lesson Plans",
    type: "PDF",
    description:
      "Using Python and simple datasets to spot real-world patterns.",
    url: "#",
    level: "Advanced",
    audience: "student",
  },
  {
    title: "Parent & School Safety Guide",
    category: "Safety & AI",
    type: "PDF",
    description:
      "Overview of CodeCore's digital safety policies — suitable for parents and administrators.",
    url: "#",
    level: "Beginner",
    audience: "both",
  },
  {
    title: "Coding Competition Prep",
    category: "Training",
    type: "Video",
    description:
      "Practice problems and strategies for upcoming STEM fair competitions.",
    url: "#",
    level: "Advanced",
    audience: "both",
  },
];

const TYPE_CLASS = { PDF: "type-pdf", Video: "type-video", Link: "type-link" };
const LEVEL_CLASS = {
  Beginner: "res-level--beginner",
  Intermediate: "res-level--intermediate",
  Advanced: "res-level--advanced",
};

let allCards = [];

document.addEventListener("DOMContentLoaded", async () => {
  const resources = await loadJSON("data/resources.json", FALLBACK_RESOURCES);
  renderCards(resources);
  initFilter();
});

function renderCards(resources) {
  const grid = document.getElementById("resources-grid");
  if (!grid) return;
  grid.textContent = "";
  allCards = [];

  resources.forEach((item) => {
    const card = document.createElement("div");
    card.className = "ch-card resource-card";
    card.dataset.category = item.category;

    const top = document.createElement("div");
    top.className = "resource-card-top";

    const typeBadge = document.createElement("span");
    typeBadge.className = "type-badge " + (TYPE_CLASS[item.type] || "");
    typeBadge.textContent = item.type;
    top.appendChild(typeBadge);

    const audience = document.createElement("span");
    audience.style.cssText =
      "font-size:0.72rem;font-weight:600;color:var(--text-light);text-transform:uppercase;letter-spacing:0.04em;";
    audience.textContent =
      item.audience === "faculty"
        ? "Instructor"
        : item.audience === "student"
          ? "Student"
          : "All";
    top.appendChild(audience);
    card.appendChild(top);

    const h3 = document.createElement("h3");
    h3.textContent = item.title;
    card.appendChild(h3);

    const desc = document.createElement("p");
    desc.textContent = item.description;
    card.appendChild(desc);

    const footer = document.createElement("div");
    footer.className = "resource-card-footer";

    const level = document.createElement("span");
    level.className = "res-level " + (LEVEL_CLASS[item.level] || "");
    level.textContent = item.level;
    footer.appendChild(level);

    const btn = document.createElement("a");
    btn.href = item.url || "#";
    btn.className = "btn-primary";
    btn.style.cssText = "font-size:0.82rem;padding:0.5rem 1rem;";
    btn.textContent =
      item.type === "Video"
        ? "Watch"
        : item.type === "Link"
          ? "Open"
          : "Download";
    if (item.url && item.url !== "#") {
      btn.target = "_blank";
      btn.rel = "noopener noreferrer";
    }
    footer.appendChild(btn);
    card.appendChild(footer);

    grid.appendChild(card);
    allCards.push(card);
  });
}

function initFilter() {
  const bar = document.getElementById("resources-filter-bar");
  if (!bar) return;
  bar.querySelectorAll(".filter-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      bar
        .querySelectorAll(".filter-btn")
        .forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const filter = btn.dataset.filter;
      allCards.forEach((card) => {
        card.classList.toggle(
          "hidden",
          filter !== "all" && card.dataset.category !== filter,
        );
      });
    });
  });
}
