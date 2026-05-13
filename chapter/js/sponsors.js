"use strict";

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
    url: "",
    tier: "Community",
  },
  {
    name: "Become a Sponsor",
    logo: "../images/sponsors/placeholder.png",
    url: "sponsors.html#sponsor-form",
    tier: "Community",
  },
];

const FALLBACK_WISHLIST = [
  {
    name: "Chromebooks",
    category: "Technology",
    description: "Each Chromebook lets one more student participate hands-on.",
    quantity: 12,
    priority: "High",
  },
  {
    name: "Wireless Mice & Keyboards",
    category: "Technology",
    description:
      "Reliable input devices make a huge difference in how quickly students can practice.",
    quantity: 20,
    priority: "High",
  },
  {
    name: "USB-C Charging Hubs",
    category: "Technology",
    description: "Keep all devices charged through a full 90-minute session.",
    quantity: 4,
    priority: "Medium",
  },
  {
    name: "Raspberry Pi Kits",
    category: "Technology",
    description:
      "Tiny computers for physical projects — sensors, blinking lights, small robots.",
    quantity: 10,
    priority: "Medium",
  },
  {
    name: "Printed Coding Workbooks",
    category: "Student Support",
    description:
      "Take-home activity books for grades 3–8 to practice between sessions.",
    quantity: 60,
    priority: "Low",
  },
  {
    name: "CS Unplugged Activity Cards",
    category: "Student Support",
    description: "Teach algorithms, binary, and logic without a screen.",
    quantity: 6,
    priority: "Low",
  },
  {
    name: "CodeCore Chapter T-Shirts",
    category: "Merchandise",
    description:
      "Build community identity and pride in students' coding journey.",
    quantity: 100,
    priority: "Medium",
  },
  {
    name: "STEM Notebooks & Pens",
    category: "Student Support",
    description:
      "Branded notebooks for sketching algorithms and tracking project ideas.",
    quantity: 80,
    priority: "Low",
  },
];

const PRIORITY_CLASS = {
  High: "badge-high",
  Medium: "badge-medium",
  Low: "badge-low",
};
let wishlistCards = [];

document.addEventListener("DOMContentLoaded", async () => {
  const [sponsors, wishlist] = await Promise.all([
    loadJSON("data/sponsors.json", FALLBACK_SPONSORS),
    loadJSON("data/wishlist.json", FALLBACK_WISHLIST),
  ]);
  renderSponsors(sponsors);
  renderWishlist(wishlist);
  initWishlistTabs();
  initForm();
});

function renderSponsors(sponsors) {
  const containers = {
    Gold: document.getElementById("sponsors-gold"),
    Silver: document.getElementById("sponsors-silver"),
    Community: document.getElementById("sponsors-community"),
  };

  Object.values(containers).forEach((el) => {
    if (el) el.textContent = "";
  });

  sponsors.forEach((s) => {
    const container = containers[s.tier] || containers.Community;
    if (!container) return;

    const card = document.createElement(s.url ? "a" : "div");
    card.className = "sp-card";
    if (s.url) {
      card.href = s.url;
      card.target = "_blank";
      card.rel = "noopener noreferrer";
    }

    const img = document.createElement("img");
    img.src = s.logo;
    img.alt = s.name + " logo";
    img.addEventListener("error", () => {
      img.style.display = "none";
    });
    card.appendChild(img);

    const name = document.createElement("span");
    name.textContent = s.name;
    card.appendChild(name);

    container.appendChild(card);
  });
}

function renderWishlist(items) {
  const grid = document.getElementById("wishlist-grid");
  if (!grid) return;
  grid.textContent = "";
  wishlistCards = [];

  items.forEach((item) => {
    const card = document.createElement("div");
    card.className = "ch-card sp-wish-card";
    card.dataset.category = item.category;

    const top = document.createElement("div");
    top.className = "sp-wish-card-top";

    const h3 = document.createElement("h3");
    h3.textContent = item.name;
    top.appendChild(h3);

    const badge = document.createElement("span");
    badge.className = PRIORITY_CLASS[item.priority] || "";
    badge.textContent = item.priority;
    top.appendChild(badge);

    card.appendChild(top);

    const desc = document.createElement("p");
    desc.textContent = item.description;
    card.appendChild(desc);

    if (item.quantity) {
      const qty = document.createElement("p");
      qty.className = "sp-wish-qty";
      qty.textContent = "Quantity needed: " + item.quantity;
      card.appendChild(qty);
    }

    const btn = document.createElement("button");
    btn.className = "btn-primary";
    btn.style.cssText =
      "font-size:0.88rem;padding:0.6rem 1.25rem;border:none;cursor:pointer;";
    btn.textContent = "Donate This Item";
    btn.addEventListener("click", () => {
      const msg = document.getElementById("sp-message");
      if (msg) msg.value = "I'd like to donate: " + item.name;
      document
        .getElementById("sponsor-form")
        ?.scrollIntoView({ behavior: "smooth" });
    });
    card.appendChild(btn);

    grid.appendChild(card);
    wishlistCards.push(card);
  });
}

function initWishlistTabs() {
  const tabs = document.getElementById("wishlist-tabs");
  if (!tabs) return;
  tabs.querySelectorAll(".sp-wish-tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs
        .querySelectorAll(".sp-wish-tab")
        .forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");
      const cat = tab.dataset.cat;
      wishlistCards.forEach((card) => {
        card.classList.toggle(
          "hidden",
          cat !== "all" && card.dataset.category !== cat,
        );
      });
    });
  });
}

function initForm() {
  const form = document.getElementById("sponsor-interest-form");
  const feedback = document.getElementById("sp-feedback");
  const submit = document.getElementById("sp-submit");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    feedback.className = "ch-form-feedback";
    feedback.textContent = "";
    submit.disabled = true;
    submit.textContent = "Sending…";

    try {
      const res = await fetch("contact.php", {
        method: "POST",
        body: new FormData(form),
      });
      const data = await res.json();
      if (data.success) {
        feedback.className = "ch-form-feedback success";
        feedback.textContent =
          "Thank you! Our partnerships team will be in touch within 2 business days.";
        form.reset();
      } else {
        feedback.className = "ch-form-feedback error";
        feedback.textContent =
          data.error || "Something went wrong. Please try again.";
      }
    } catch {
      feedback.className = "ch-form-feedback error";
      feedback.textContent =
        "Network error. Please email us at codecore@utep.edu.";
    } finally {
      submit.disabled = false;
      submit.textContent = "Send Message";
    }
  });
}
