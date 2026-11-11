"use strict";

const FALLBACK_RESOURCES = [
  {
    title: "CodeCombat — Dungeons of Kithgard",
    category: "Games",
    type: "Link",
    description:
      "Start here! The first CodeCombat level: type real code to move your hero, grab the gem, and escape the dungeon. Free to play right in the browser.",
    url: "https://codecombat.com/play/level/dungeons-of-kithgard?&fromCampaign=dungeon",
    level: "Beginner",
    audience: "both",
  },
  {
    title: "Scratch — Imagine, Program, Share",
    category: "Games",
    type: "Link",
    description:
      "Free drag-and-drop block coding from MIT. Students build games, animations, and interactive stories. Core tool for creative coding modules.",
    url: "https://scratch.mit.edu/",
    level: "Beginner",
    audience: "student",
  },
  {
    title: "Blockly Games",
    category: "Games",
    type: "Link",
    description:
      "Collection of puzzle-style coding games by Google that teach programming logic step by step — maze, bird, turtle, and more.",
    url: "https://blockly.games/",
    level: "Beginner",
    audience: "student",
  },
  {
    title: "Code.org Sprite Lab",
    category: "Games",
    type: "Link",
    description:
      "Students create their own games and animations using drag-and-drop coding blocks. Great for grades 3–5.",
    url: "https://code.org/en-US/tools/sprite-lab",
    level: "Beginner",
    audience: "student",
  },
  {
    title: "Code.org Hour of Code",
    category: "Games",
    type: "Link",
    description:
      "Self-paced coding activities from beginner to intermediate, including Minecraft, Star Wars, and Frozen-themed projects. Great for any session opener.",
    url: "https://code.org/learn",
    level: "Beginner",
    audience: "student",
  },
  {
    title: "Code.org CS Fundamentals",
    category: "Games",
    type: "Link",
    description:
      "Full structured curriculum for grades 3–8 covering sequences, loops, events, conditionals, and functions. Each lesson includes an unplugged warm-up and a coding activity.",
    url: "https://studio.code.org",
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
