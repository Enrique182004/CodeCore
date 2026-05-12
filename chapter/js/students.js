"use strict";

const FALLBACK_RESOURCES = [
  {
    title: "Scratch Basics for Beginners",
    category: "Lesson Plans",
    type: "PDF",
    description:
      "Build your first Scratch project — sprites, loops, and simple animations.",
    url: "#",
    level: "Beginner",
    audience: "student",
  },
  {
    title: "Scratch Game Design Challenge",
    category: "Lesson Plans",
    type: "Link",
    description:
      "Four-week project: design and share a fully playable Scratch game.",
    url: "#",
    level: "Intermediate",
    audience: "student",
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
    title: "Intro to Data Science",
    category: "Lesson Plans",
    type: "PDF",
    description:
      "Use Python and El Paso weather data to spot real-world patterns.",
    url: "#",
    level: "Advanced",
    audience: "student",
  },
  {
    title: "Robotics Activity Pack",
    category: "Downloads",
    type: "PDF",
    description:
      "Printable activity sheets for Raspberry Pi and LEGO robotics sessions.",
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
];

const TYPE_CLASS = { PDF: "type-pdf", Video: "type-video", Link: "type-link" };

document.addEventListener("DOMContentLoaded", initStudentResources);

async function initStudentResources() {
  const all = await loadJSON("data/resources.json", FALLBACK_RESOURCES);
  const items = all.filter(
    (r) => r.audience === "student" || r.audience === "both",
  );
  const container = document.getElementById("student-resources");
  if (!container) return;

  container.textContent = "";

  if (items.length === 0) {
    const p = document.createElement("p");
    p.className = "ch-loading";
    p.textContent = "No resources found.";
    container.appendChild(p);
    return;
  }

  items.forEach((item) => {
    const card = document.createElement("div");
    card.className = "ch-card student-resource-card";

    const typeRow = document.createElement("div");
    typeRow.className = "src-type-row";

    const typeBadge = document.createElement("span");
    typeBadge.className = "type-badge " + (TYPE_CLASS[item.type] || "");
    typeBadge.textContent = item.type;
    typeRow.appendChild(typeBadge);

    const levelEl = document.createElement("span");
    levelEl.className = "src-level";
    levelEl.textContent = item.level;
    typeRow.appendChild(levelEl);

    card.appendChild(typeRow);

    const h3 = document.createElement("h3");
    h3.textContent = item.title;
    card.appendChild(h3);

    const desc = document.createElement("p");
    desc.textContent = item.description;
    card.appendChild(desc);

    const link = document.createElement("a");
    link.href = item.url || "#";
    link.className = "btn-primary";
    link.style.fontSize = "0.88rem";
    link.style.padding = "0.6rem 1.25rem";
    link.textContent = item.type === "Video" ? "Watch Now" : "Download";
    if (item.url && item.url !== "#") {
      link.target = "_blank";
      link.rel = "noopener noreferrer";
    }
    card.appendChild(link);

    container.appendChild(card);
  });
}
