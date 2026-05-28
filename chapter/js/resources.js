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
  // GAMES
  {
    title: "CodeCombat",
    category: "Games",
    type: "Link",
    description:
      "Medieval-style online game where you control characters by typing real code. Great for young people and beginner adults.",
    url: "https://codecombat.com/",
    level: "Beginner",
    audience: "student",
  },
  {
    title: "Learn Code with Python — boot.dev",
    category: "Games",
    type: "Link",
    description:
      "Interactive, game-like Python course that teaches coding through hands-on challenges and projects.",
    url: "https://www.boot.dev/courses/learn-code-python",
    level: "Beginner",
    audience: "student",
  },
  {
    title: "Codedex",
    category: "Games",
    type: "Link",
    description:
      "Fun and beginner-friendly platform to learn how to code through gamified lessons and quests.",
    url: "https://www.codedex.io/",
    level: "Beginner",
    audience: "student",
  },
  {
    title: "Coding for Kids — Python Courses",
    category: "Games",
    type: "Link",
    description:
      "Kid-friendly Python courses designed to introduce programming concepts through guided exercises.",
    url: "https://codingforkids.io/en",
    level: "Beginner",
    audience: "student",
  },
  {
    title: "Flexbox Froggy",
    category: "Games",
    type: "Link",
    description:
      "Interactive puzzle game that teaches CSS Flexbox by guiding frogs to lily pads.",
    url: "https://flexboxfroggy.com/",
    level: "Intermediate",
    audience: "student",
  },
  {
    title: "CSS Grid Garden",
    category: "Games",
    type: "Link",
    description:
      "Learn CSS Grid Layout fundamentals through fun, visual gardening challenges.",
    url: "https://cssgridgarden.com/",
    level: "Intermediate",
    audience: "student",
  },
  {
    title: "Learn Git Branching",
    category: "Games",
    type: "Link",
    description:
      "Interactive visual game that teaches Git branching, merging, rebasing, and version control concepts.",
    url: "https://learngitbranching.js.org/?locale=es_EN",
    level: "Intermediate",
    audience: "both",
  },
  {
    title: "Minecraft Adventurer — Code.org",
    category: "Games",
    type: "Link",
    description:
      "Teaches core CS concepts — commands, repeat loops, and if statements — through a Minecraft-themed coding workspace.",
    url: "https://studio.code.org/s/mc/lessons/1/levels/1",
    level: "Beginner",
    audience: "student",
  },
  {
    title: "Scratch — Imagine, Program, Share",
    category: "Games",
    type: "Link",
    description:
      "Free block-coding website where students can create games, animations, and interactive stories.",
    url: "https://scratch.mit.edu/",
    level: "Beginner",
    audience: "student",
  },
  {
    title: "Blockly Games: Maze",
    category: "Games",
    type: "Link",
    description:
      "Maze game that teaches sequencing, loops, and conditionals through visual block coding.",
    url: "https://blockly.games/maze",
    level: "Beginner",
    audience: "student",
  },
  {
    title: "Blockly Games",
    category: "Games",
    type: "Link",
    description:
      "Collection of puzzle-style coding games that teach programming logic using drag-and-drop blocks.",
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
  // VIDEOS
  {
    title: "Start Coding with Java in 10 Minutes",
    category: "Videos",
    type: "Video",
    description:
      "Short, beginner-friendly Java tutorial that covers core concepts like variables, loops, and methods.",
    url: "#",
    level: "Beginner",
    audience: "student",
  },
  {
    title: "Understanding Data Types in Programming",
    category: "Videos",
    type: "Video",
    description:
      "Clear explanation of data types — integers, strings, booleans, and more — for absolute beginners.",
    url: "#",
    level: "Beginner",
    audience: "both",
  },
  {
    title: "Intro to Programming: A Beginner's Guide",
    category: "Videos",
    type: "Video",
    description:
      "Overview of fundamental programming concepts for anyone just starting their coding journey.",
    url: "#",
    level: "Beginner",
    audience: "both",
  },
  {
    title: "Coding for Kids Explained — What & Why",
    category: "Videos",
    type: "Video",
    description:
      "Kid-friendly breakdown of what coding is, why it matters, and how it impacts everyday life.",
    url: "#",
    level: "Beginner",
    audience: "student",
  },
  {
    title: "Introduction to Coding for Young Kids",
    category: "Videos",
    type: "Video",
    description:
      "Age-appropriate introduction to coding concepts designed for elementary-age learners.",
    url: "#",
    level: "Beginner",
    audience: "student",
  },
  {
    title: "Programming Games with Solar 2D",
    category: "Videos",
    type: "Video",
    description:
      "YouTube series showing how to build games using the Solar 2D game engine and Lua scripting.",
    url: "https://www.youtube.com/watch?v=zjxJDW6LSEU&list=PLpyspNLjzwBlgvpGJYOZIFdqB2Dcebxp_",
    level: "Intermediate",
    audience: "student",
  },
  {
    title: "Programming Games with Lua",
    category: "Videos",
    type: "Video",
    description:
      "Video guide to building games using Lua, the scripting language behind Solar 2D and Roblox.",
    url: "https://www.youtube.com/watch?v=Nsfuj8hFrVU",
    level: "Intermediate",
    audience: "student",
  },
  {
    title: "Real-Life Algorithms: Paper Airplanes",
    category: "Videos",
    type: "Video",
    description:
      "Code.org unplugged activity that explains algorithms using paper airplanes — no screen required.",
    url: "#",
    level: "Beginner",
    audience: "both",
  },
  // TUTORIALS
  {
    title: "SQLBolt — Learn SQL",
    category: "Tutorials",
    type: "Link",
    description:
      "Free interactive introduction to SQL — covers SELECT, filtering, joins, and more through hands-on exercises.",
    url: "https://sqlbolt.com",
    level: "Intermediate",
    audience: "both",
  },
  {
    title: "The Odin Project — Foundations",
    category: "Tutorials",
    type: "Link",
    description:
      "Hands-on introduction to all the essential tools needed to build real, working websites — HTML, CSS, JavaScript, Git.",
    url: "https://www.theodinproject.com/paths/foundations/courses/foundations",
    level: "Beginner",
    audience: "both",
  },
  {
    title: "The Odin Project — Full Stack JavaScript",
    category: "Tutorials",
    type: "Link",
    description:
      "In-depth introduction to JavaScript and full-stack web development, building on the Foundations path.",
    url: "https://www.theodinproject.com/paths/full-stack-javascript",
    level: "Intermediate",
    audience: "both",
  },
  {
    title: "GeeksForGeeks",
    category: "Tutorials",
    type: "Link",
    description:
      "Comprehensive library of tutorials, coding problems, and explanations across all major computer science topics.",
    url: "https://www.geeksforgeeks.org/",
    level: "Intermediate",
    audience: "both",
  },
  {
    title: "Android Developers — Get Started",
    category: "Tutorials",
    type: "Link",
    description:
      "Official Android development guides and video tutorials for building your first Android app.",
    url: "https://developer.android.com/get-started/overview?hl=es-419",
    level: "Intermediate",
    audience: "both",
  },
  // TOOLS
  {
    title: "Visual Studio Code",
    category: "Tools",
    type: "Link",
    description:
      "Free, lightweight code editor from Microsoft — the most popular editor for web and Python development.",
    url: "https://code.visualstudio.com/download",
    level: "Beginner",
    audience: "both",
  },
  {
    title: "Git — Windows Installer",
    category: "Tools",
    type: "Link",
    description:
      "Official Git installer for Windows. Required for version control and working with GitHub repositories.",
    url: "https://git-scm.com/install/windows",
    level: "Beginner",
    audience: "both",
  },
  {
    title: "Android Studio",
    category: "Tools",
    type: "Link",
    description:
      "Official IDE for Android development. Includes an emulator, debugger, and Kotlin/Java toolchain.",
    url: "https://developer.android.com/get-started/overview?hl=es-419",
    level: "Intermediate",
    audience: "both",
  },
  {
    title: "Solar2D — 2D Game Engine",
    category: "Tools",
    type: "Link",
    description:
      "Free, open-source 2D game engine using the Lua scripting language. Great for building mobile games.",
    url: "https://solar2d.com/",
    level: "Intermediate",
    audience: "student",
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
