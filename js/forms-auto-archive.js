// Forms Auto-Archive - Manages ONLY your workshops
// When workshops pass their end time, they automatically move from upcoming to archive

document.addEventListener("DOMContentLoaded", function () {
  console.log("🎯 Forms Auto-Archive System: Managing workshops");

  // Define your workshops
  const workshopEvents = [
    // UPCOMING WORKSHOPS
    {
      id: "kick-off-meeting",
      icon: "🚀",
      title: "Kick Off Meeting",
      description: "Topics: Orientation and Semester Planning",
      date: "2026-01-27",
      time: "5:00 PM - 6:30 PM",
      location: "CCSB 1.0410",
      formLink: "https://forms.gle/your-link-here",
      status: "open",
    },
    {
      id: "intro-session",
      icon: "👋",
      title: "Intro Session",
      description: "Topics: Introduction to CodeCore",
      date: "2026-01-28",
      time: "5:00 PM - 6:30 PM",
      location: "CCSB 1.0410",
      formLink: "https://forms.gle/your-link-here",
      status: "open",
    },
    {
      id: "breaking-the-loop",
      icon: "🔄",
      title: "Breaking the Loop: for, while, do-while",
      description: "Topics: Loop Structures and Control Flow",
      date: "2026-02-10",
      time: "5:00 PM - 6:30 PM",
      location: "CCSB 1.0410",
      formLink: "https://forms.gle/your-link-here",
      status: "open",
    },
    {
      id: "object-oriented-thinking",
      icon: "🎯",
      title: "Object-Oriented Thinking",
      description: "Topics: Introduction to OOP Concepts",
      date: "2026-02-11",
      time: "5:00 PM - 6:30 PM",
      location: "CCSB 1.0410",
      formLink: "https://forms.gle/your-link-here",
      status: "open",
    },
    {
      id: "review-exam-1-feb17",
      icon: "📝",
      title: "Review Exam 1",
      description: "Topics: Exam 1 Preparation",
      date: "2026-02-17",
      time: "5:00 PM - 6:30 PM",
      location: "CCSB 1.0410",
      formLink: "https://forms.gle/your-link-here",
      status: "open",
    },
    {
      id: "dynamic-data-linked-lists",
      icon: "🔗",
      title: "Dynamic Data with Linked Lists",
      description: "Topics: Understanding Linked Data Structures",
      date: "2026-02-18",
      time: "5:00 PM - 6:30 PM",
      location: "CCSB 1.0410",
      formLink: "https://forms.gle/your-link-here",
      status: "open",
    },
    {
      id: "clean-methods-correct-results",
      icon: "✨",
      title: "Clean Methods, Correct Results",
      description: "Topics: Writing Effective Methods",
      date: "2026-02-24",
      time: "5:00 PM - 6:30 PM",
      location: "CCSB 1.0410",
      formLink: "https://forms.gle/your-link-here",
      status: "open",
    },
    {
      id: "review-exam-1-feb25",
      icon: "📝",
      title: "Review Exam 1",
      description: "Topics: Exam 1 Preparation",
      date: "2026-02-25",
      time: "5:00 PM - 6:30 PM",
      location: "CCSB 1.0410",
      formLink: "https://forms.gle/your-link-here",
      status: "open",
    },
    {
      id: "mastering-recursion",
      icon: "🔄",
      title: "Think Smaller: Mastering Recursion",
      description: "Topics: Recursive Problem Solving",
      date: "2026-03-03",
      time: "5:00 PM - 6:30 PM",
      location: "CCSB 1.0410",
      formLink: "https://forms.gle/your-link-here",
      status: "open",
    },
    {
      id: "recursion-revisited",
      icon: "🔁",
      title: "Recursion Revisited",
      description: "Topics: Advanced Recursion Techniques",
      date: "2026-03-04",
      time: "5:00 PM - 6:30 PM",
      location: "CCSB 1.0410",
      formLink: "https://forms.gle/your-link-here",
      status: "open",
    },
    {
      id: "iterating-strings-arrays",
      icon: "🔤",
      title: "Iterating in Strings and Arrays",
      description: "Topics: String and Array Manipulation",
      date: "2026-03-10",
      time: "5:00 PM - 6:30 PM",
      location: "CCSB 1.0410",
      formLink: "https://forms.gle/your-link-here",
      status: "open",
    },
    {
      id: "searching-sorting",
      icon: "🔍",
      title: "Searching and Sorting: The Core Algorithms",
      description: "Topics: Fundamental Algorithms",
      date: "2026-03-11",
      time: "5:00 PM - 6:30 PM",
      location: "CCSB 1.0410",
      formLink: "https://forms.gle/your-link-here",
      status: "open",
    },
    {
      id: "review-exam-2-mar24",
      icon: "📝",
      title: "Review Exam 2",
      description: "Topics: Exam 2 Preparation",
      date: "2026-03-24",
      time: "5:00 PM - 6:30 PM",
      location: "CCSB 1.0410",
      formLink: "https://forms.gle/your-link-here",
      status: "open",
    },
    {
      id: "review-exam-2-mar25",
      icon: "📝",
      title: "Review Exam 2",
      description: "Topics: Exam 2 Preparation",
      date: "2026-03-25",
      time: "5:00 PM - 6:30 PM",
      location: "CCSB 1.0410",
      formLink: "https://forms.gle/your-link-here",
      status: "open",
    },
    {
      id: "primitive-to-objects",
      icon: "🎁",
      title: "From Primitive to Objects",
      description: "Topics: Understanding Data Types",
      date: "2026-03-31",
      time: "5:00 PM - 6:30 PM",
      location: "CCSB 1.0410",
      formLink: "https://forms.gle/your-link-here",
      status: "open",
    },
    {
      id: "primitive-vs-non-primitive",
      icon: "⚖️",
      title: "Primitive vs non-primitive data types",
      description: "Topics: Data Type Comparisons",
      date: "2026-04-01",
      time: "5:00 PM - 6:30 PM",
      location: "CCSB 1.0410",
      formLink: "https://forms.gle/your-link-here",
      status: "open",
    },
    {
      id: "think-in-grids",
      icon: "🔲",
      title: "Think in Grids: 2D Arrays",
      description: "Topics: Multi-dimensional Arrays",
      date: "2026-04-07",
      time: "5:00 PM - 6:30 PM",
      location: "CCSB 1.0410",
      formLink: "https://forms.gle/your-link-here",
      status: "open",
    },
    {
      id: "lifo-vs-fifo",
      icon: "📚",
      title: "LIFO vs FIFO/Classic Structures: Real uses",
      description: "Topics: Stacks and Queues",
      date: "2026-04-08",
      time: "5:00 PM - 6:30 PM",
      location: "CCSB 1.0410",
      formLink: "https://forms.gle/your-link-here",
      status: "open",
    },
    {
      id: "nodes-links-dynamic-data",
      icon: "🔗",
      title: "Nodes, Links and Dynamic Data",
      description: "Topics: Advanced Linked Structures",
      date: "2026-04-14",
      time: "5:00 PM - 6:30 PM",
      location: "CCSB 1.0410",
      formLink: "https://forms.gle/your-link-here",
      status: "open",
    },
    {
      id: "thinking-in-trees",
      icon: "🌳",
      title: "Thinking in Trees: Binary Structures",
      description: "Topics: Binary Trees and BST",
      date: "2026-04-15",
      time: "5:00 PM - 6:30 PM",
      location: "CCSB 1.0410",
      formLink: "https://forms.gle/your-link-here",
      status: "open",
    },
    {
      id: "review-exam-3-apr21",
      icon: "📝",
      title: "Review Exam 3",
      description: "Topics: Exam 3 Preparation",
      date: "2026-04-21",
      time: "5:00 PM - 6:30 PM",
      location: "CCSB 1.0410",
      formLink: "https://forms.gle/your-link-here",
      status: "open",
    },
    {
      id: "review-exam-3-apr22",
      icon: "📝",
      title: "Review Exam 3",
      description: "Topics: Exam 3 Preparation",
      date: "2026-04-22",
      time: "5:00 PM - 6:30 PM",
      location: "CCSB 1.0410",
      formLink: "https://forms.gle/your-link-here",
      status: "open",
    },
    {
      id: "review-final-apr28",
      icon: "🎓",
      title: "Review Final",
      description: "Topics: Final Exam Preparation",
      date: "2026-04-28",
      time: "5:00 PM - 6:30 PM",
      location: "CCSB 1.0410",
      formLink: "https://forms.gle/your-link-here",
      status: "open",
    },
    {
      id: "review-final-apr29",
      icon: "🎓",
      title: "Review Final",
      description: "Topics: Final Exam Preparation",
      date: "2026-04-29",
      time: "5:00 PM - 6:30 PM",
      location: "CCSB 1.0410",
      formLink: "https://forms.gle/your-link-here",
      status: "open",
    },
    {
      id: "practice-final-may05",
      icon: "📝",
      title: "Practice Final Exam",
      description: "Topics: Final Exam Practice",
      date: "2026-05-05",
      time: "5:00 PM - 6:30 PM",
      location: "CCSB 1.0410",
      formLink: "https://forms.gle/your-link-here",
      status: "open",
    },
    {
      id: "practice-final-may06",
      icon: "📝",
      title: "Practice Final Exam",
      description: "Topics: Final Exam Practice",
      date: "2026-05-06",
      time: "5:00 PM - 6:30 PM",
      location: "CCSB 1.0410",
      formLink: "https://forms.gle/your-link-here",
      status: "open",
    },
    {
      id: "cs2-final-review",
      icon: "📝",
      title: "CS2 Final Review",
      description: "Topics: Mock Final Exam",
      date: "2026-05-06",
      time: "12:00 PM - 2:00 PM",
      location: "CCSB 1.0410",
      formLink: "",
      status: "open",
    },

    // ARCHIVE WORKSHOPS
    {
      id: "cs1-fundamentals-refresh",
      title: "CS1 Fundamentals Refresh",
      date: "2025-11-24",
      time: "4:00 PM - 7:00 PM",
      location: "CCSB 1.0410",
      description: "Topics: Review Session",
      formLink: "https://forms.gle/Ne2zp3jH5UHG7qRh6",
      status: "past",
      icon: "📚",
    },
    {
      id: "friendsgiving-fun-night",
      title: "Friendsgiving Fun Night",
      date: "2025-11-26",
      time: "4:30 PM - 7:00 PM",
      location: "CCSB 1.0410",
      description: "Topics: CS1 & CS2 Review",
      formLink: "https://forms.gle/CF5g5f3KPJrMn3wR7",
      status: "past",
      icon: "🦃",
    },
    {
      id: "cs2-mastery-workshop",
      title: "CS2 Mastery Workshop",
      date: "2025-12-01",
      time: "4:00 PM - 7:00 PM",
      location: "CCSB 1.0410",
      description: "Topics: Review Session",
      formLink: "https://forms.gle/pXTGH5kjxXdhg3kE9",
      status: "past",
      icon: "🎯",
    },
    {
      id: "christmas-coding-party",
      title: "Christmas Coding Party",
      date: "2025-12-03",
      time: "4:30 PM - 7:00 PM",
      location: "CCSB 1.0410",
      description: "Topics: CS1 & CS2 Review",
      formLink: "https://forms.gle/AqYgqdAWo74T9LVF8",
      status: "past",
      icon: "🎄",
    },
    {
      id: "link-it-up",
      title: "Link It Up!",
      date: "2025-11-17",
      time: "4:30 PM - 6:00 PM",
      location: "CCSB 1.0410",
      description: "Topics: Linked Lists",
      formLink: "https://forms.gle/cVqsvPtpjAjyDFeM9",
      status: "past",
      icon: "🔗",
    },
    {
      id: "recursive-realm",
      title: "The Recursive Realm",
      date: "2025-11-19",
      time: "4:30 PM - 6:00 PM",
      location: "CCSB 1.0410",
      description: "Topics: Recursion",
      formLink: "https://forms.gle/CthvNV7bMm2ruSPSA",
      status: "past",
      icon: "🔄",
    },
    {
      id: "big-three",
      title: "The Big Three: Loops, Arrays, Conditionals",
      date: "2025-11-10",
      time: "4:30 PM - 6:00 PM",
      location: "CCSB 1.0410",
      description: "Topics: Loops, Arrays & Conditionals",
      formLink:
        "https://drive.google.com/drive/folders/11LpZ1Go9K0r8cmaJ1s6PkjtBWZ7VIqmp?usp=sharing",
      status: "past",
      icon: "💻",
    },
    {
      id: "if-else-everything",
      title: "If, Else, and Everything In Between",
      date: "2025-11-12",
      time: "1:00 PM - 2:30 PM",
      location: "CCSB 1.0410",
      description: "Topics: Methods/Functions, Backtracking & Conditionals",
      formLink: "https://forms.gle/8bGWtmEraDgM1J2P8",
      status: "past",
      icon: "🔀",
    },
    {
      id: "recur-conquer",
      title: "Recur & Conquer",
      date: "2025-11-12",
      time: "4:30 PM - 6:00 PM",
      location: "CCSB 1.0410",
      description: "Topics: Functions/Methods, Recursion & Conditionals",
      formLink:
        "https://drive.google.com/drive/folders/1uPEJtCS_AcPpp3860xgLH024Wuv-OSVE?usp=sharing",
      status: "past",
      icon: "🎯",
    },
    {
      id: "divide-locate",
      title: "Mission: Divide & Locate",
      date: "2025-11-14",
      time: "12:00 PM - 1:30 PM",
      location: "CCSB 1.0410",
      description: "Topics: Binary Search",
      formLink: "https://forms.gle/zbheexWcLa95WNjx5",
      status: "past",
      icon: "💻",
    },
  ];

  // Initialize the workshop archiver
  if (window.workshopArchiver) {
    window.workshopArchiver.init(workshopEvents);
    console.log("✅ Workshop archiver initialized with workshops");
  } else {
    console.error(
      "❌ Workshop archiver not found! Make sure workshop-archiver.js is loaded first.",
    );
  }

  // Listen for archive events
  document.addEventListener("workshopArchived", function (e) {
    const workshop = e.detail.workshop;
    console.log(`📦 Workshop archived: ${workshop.title}`);

    // Find the workshop card in upcoming section and move it to archive
    moveWorkshopToArchive(workshop);
  });

  function moveWorkshopToArchive(workshop) {
    // Find the workshop card in the upcoming section
    const upcomingSection = document.querySelector(
      "#upcoming-workshops .forms-grid",
    );
    const archiveSection = document.querySelector(
      "#past-workshops .forms-grid",
    );

    if (!upcomingSection || !archiveSection) {
      console.error("Could not find workshop sections");
      return;
    }

    // Find and remove the workshop from upcoming
    const workshopCards = upcomingSection.querySelectorAll(".workshop-card");
    let workshopCard = null;

    workshopCards.forEach((card) => {
      const title = card.querySelector("h3").textContent.trim();
      if (title === workshop.title) {
        workshopCard = card;
      }
    });

    if (!workshopCard) {
      console.log(`Workshop "${workshop.title}" not found in upcoming section`);
      return;
    }

    // Remove from upcoming section
    workshopCard.remove();
    console.log(`Removed "${workshop.title}" from upcoming section`);

    // Create archive version in YOUR EXACT FORMAT
    const archiveHTML = createArchiveWorkshopHTML(workshop);

    // Add to archive section
    archiveSection.insertAdjacentHTML("beforeend", archiveHTML);
    console.log(
      `✅ Added "${workshop.title}" to archive section in exact format`,
    );
  }

  function createArchiveWorkshopHTML(workshop) {
    // Format date as M/D
    const [year, month, day] = workshop.date.split("-").map(Number);
    const formattedDate = `${month}/${day}`;

    // Format time with em dash
    const timeDisplay = workshop.time.replace(" - ", " – ");

    // Generate in YOUR EXACT FORMAT with disabled button
    return `
                <!-- Past Workshop: ${workshop.title} -->
                <div class="form-card workshop-card">
                    <div class="form-icon">${workshop.icon}</div>
                    <h3>${workshop.title}</h3>
                    <p><b>Topics: </b>${workshop.description.replace("Topics: ", "")}</p>
                    <div class="form-meta">
                        <span class="form-status past">Archive</span>
                        <span class="form-date">${formattedDate}, ${timeDisplay}</span>
                    </div>
                    <button class="form-button disabled" disabled style="cursor: not-allowed; opacity: 0.6; background-color: #999;">Content Coming Soon</button>
                </div>
`;
  }

  console.log("📋 Current workshop status:");
  workshopEvents.forEach((w) => {
    console.log(
      `  ${w.status === "open" ? "🟢" : "📦"} ${w.title} (${w.date}) - ${w.status}`,
    );
  });
});
