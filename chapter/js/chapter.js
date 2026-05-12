/* ── Inline data — used when fetch is unavailable (file:// protocol) ── */
var FALLBACK_SCHOOLS = [
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

var FALLBACK_WISHLIST = [
  {
    name: "Chromebooks",
    description:
      "Many students at our chapter schools don't have personal devices at home or school. Each Chromebook lets one more student participate hands-on instead of sharing.",
    quantity: 12,
    priority: "High",
  },
  {
    name: "Wireless Mice & Keyboards",
    description:
      "Borrowed school lab keyboards are often missing keys or unresponsive. A reliable set per student makes a huge difference in how quickly they can practice.",
    quantity: 20,
    priority: "High",
  },
  {
    name: "USB-C Charging Hubs",
    description:
      "School classrooms rarely have enough outlets. Multi-port hubs keep all devices charged through a full 90-minute session without interruption.",
    quantity: 4,
    priority: "Medium",
  },
  {
    name: "Raspberry Pi Kits",
    description:
      "Tiny computers that let middle schoolers build physical projects — blinking lights, temperature sensors, small robots. Perfect for hands-on engineering lessons.",
    quantity: 10,
    priority: "Medium",
  },
  {
    name: "CS Unplugged Activity Cards",
    description:
      "Printable card sets for teaching algorithms, binary, and logic without a screen. Great for ice-breakers and for days when tech is unavailable.",
    quantity: 6,
    priority: "Low",
  },
  {
    name: "Printed Coding Workbooks",
    description:
      "Take-home activity books (grades 3-8) so students can practice between sessions. Covers loops, conditionals, and basic Python exercises with step-by-step guidance.",
    quantity: 60,
    priority: "Low",
  },
];

var FALLBACK_SPONSORS = [
  {
    name: "UTEP College of Engineering",
    logo: "../images/sponsors/utep-engineering.png",
    url: "https://www.utep.edu/engineering/",
  },
  {
    name: "El Paso Electric",
    logo: "../images/sponsors/elpaso-electric.png",
    url: "https://www.epelectric.com/",
  },
  {
    name: "Hunt Companies",
    logo: "../images/sponsors/hunt-companies.png",
    url: "https://www.huntcompanies.com/",
  },
  {
    name: "Become a Sponsor",
    logo: "../images/sponsors/placeholder.png",
    url: "chapter/index.html#contact",
  },
];

/* ── Fetch helper — falls back to inline data on any error ── */
async function loadJSON(url, fallback) {
  try {
    var res = await fetch(url);
    if (!res.ok) throw new Error("HTTP " + res.status);
    return await res.json();
  } catch (err) {
    console.warn("fetch(" + url + ") failed, using inline data:", err.message);
    return fallback;
  }
}

document.addEventListener("DOMContentLoaded", function () {
  initSchools();
  initWishlist();
  initSponsors();
  initContactForm();
});

/* ── Schools + Map ── */
async function initSchools() {
  var grid = document.getElementById("schools-grid");
  var schools = await loadJSON("data/schools.json", FALLBACK_SCHOOLS);

  grid.textContent = "";
  schools.forEach(function (school, i) {
    grid.appendChild(buildSchoolCard(school, i));
  });

  try {
    initMap(schools);
  } catch (err) {
    console.error("Map failed to initialize:", err);
  }
}

function buildSchoolCard(school, index) {
  var card = document.createElement("div");
  card.className = "school-card";
  card.style.animationDelay = index * 0.15 + "s";

  var h3 = document.createElement("h3");
  h3.textContent = school.name;
  card.appendChild(h3);

  var badge = document.createElement("span");
  badge.className =
    "level-badge " +
    (school.level === "Elementary" ? "elementary" : "middle-school");
  badge.textContent = school.level;
  card.appendChild(badge);

  var p = document.createElement("p");
  p.textContent = school.description;
  card.appendChild(p);

  return card;
}

function initMap(schools) {
  var map = L.map("map").setView([31.7619, -106.485], 11);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 19,
  }).addTo(map);

  schools.forEach(function (school) {
    if (typeof school.lat !== "number" || typeof school.lng !== "number")
      return;

    var popup = document.createElement("div");
    var strong = document.createElement("strong");
    strong.textContent = school.name;
    popup.appendChild(strong);
    popup.appendChild(document.createElement("br"));
    popup.appendChild(document.createTextNode(school.level));

    L.marker([school.lat, school.lng]).addTo(map).bindPopup(popup);
  });
}

/* ── Wishlist ── */
async function initWishlist() {
  var grid = document.getElementById("wishlist-grid");
  var items = await loadJSON("data/wishlist.json", FALLBACK_WISHLIST);

  grid.textContent = "";
  items.forEach(function (item, i) {
    grid.appendChild(buildWishlistCard(item, i));
  });
}

function buildWishlistCard(item, index) {
  var card = document.createElement("div");
  card.className = "wishlist-card";
  card.style.animationDelay = index * 0.15 + "s";

  var header = document.createElement("div");
  header.className = "wishlist-card-header";

  var h3 = document.createElement("h3");
  h3.textContent = item.name;
  header.appendChild(h3);

  if (item.priority) {
    var badge = document.createElement("span");
    badge.className = "priority-badge " + item.priority.toLowerCase();
    badge.textContent = item.priority;
    header.appendChild(badge);
  }

  card.appendChild(header);

  var desc = document.createElement("p");
  desc.textContent = item.description;
  card.appendChild(desc);

  if (item.quantity) {
    var qty = document.createElement("p");
    qty.className = "wishlist-quantity";
    qty.textContent = "Quantity needed: " + item.quantity;
    card.appendChild(qty);
  }

  var btn = document.createElement("button");
  btn.className = "donate-btn";
  btn.textContent = "Donate This Item";
  btn.addEventListener("click", function () {
    var messageField = document.getElementById("message");
    if (messageField) {
      messageField.value = "I'd like to donate: " + item.name;
    }
    document.getElementById("contact").scrollIntoView({ behavior: "smooth" });
  });
  card.appendChild(btn);

  return card;
}

/* ── Sponsors ── */
async function initSponsors() {
  var grid = document.getElementById("sponsors-grid");
  var sponsors = await loadJSON("data/sponsors.json", FALLBACK_SPONSORS);

  grid.textContent = "";

  if (sponsors.length === 0) {
    var p = document.createElement("p");
    p.className = "loading-text";
    p.textContent = "No sponsors listed yet.";
    grid.appendChild(p);
    return;
  }

  sponsors.forEach(function (sponsor) {
    grid.appendChild(buildSponsorCard(sponsor));
  });
}

function buildSponsorCard(sponsor) {
  var card = document.createElement(sponsor.url ? "a" : "div");
  card.className = "sponsor-card";
  if (sponsor.url) {
    card.href = sponsor.url;
    card.target = "_blank";
    card.rel = "noopener noreferrer";
  }

  var img = document.createElement("img");
  img.src = sponsor.logo;
  img.alt = sponsor.name + " logo";
  img.addEventListener("error", function () {
    this.style.display = "none";
  });
  card.appendChild(img);

  var nameEl = document.createElement("span");
  nameEl.textContent = sponsor.name;
  card.appendChild(nameEl);

  return card;
}

/* ── Contact Form ── */
function initContactForm() {
  var form = document.getElementById("contact-form");
  var feedback = document.getElementById("form-feedback");
  var submitBtn = form.querySelector(".submit-btn");

  form.addEventListener("submit", async function (e) {
    e.preventDefault();
    feedback.className = "form-feedback";
    feedback.textContent = "";
    submitBtn.disabled = true;
    submitBtn.textContent = "Sending...";

    try {
      var res = await fetch("contact.php", {
        method: "POST",
        body: new FormData(form),
      });
      var data = await res.json();

      if (data.success) {
        feedback.className = "form-feedback success";
        feedback.textContent = "Thank you! We'll be in touch soon.";
        form.reset();
      } else {
        feedback.className = "form-feedback error";
        feedback.textContent =
          data.error || "Something went wrong. Please try again.";
      }
    } catch (err) {
      feedback.className = "form-feedback error";
      feedback.textContent =
        "Network error. Please try again or email us at codecore@utep.edu.";
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = "Send Message";
    }
  });
}
