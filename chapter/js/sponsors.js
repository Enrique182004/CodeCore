"use strict";

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
    name: "UTEP",
    logo: "images/sponsors/utep_logo.jpeg",
    url: "https://www.utep.edu/",
    tier: "Partner",
  },
];

const FALLBACK_WISHLIST = [
  {
    name: "Chromebooks",
    category: "Technology",
    description:
      "Many students at our chapter schools don't have personal devices. Each Chromebook lets one more student participate hands-on instead of sharing.",
    quantity: 60,
    priority: "High",
  },
  {
    name: "Wireless Mouse & Keyboard Sets",
    category: "Technology",
    description:
      "Reliable input devices make a huge difference in how quickly students can practice. One set per student keeps sessions running smoothly.",
    quantity: 30,
    priority: "High",
  },
  {
    name: "Mobile Power Tower",
    category: "Technology",
    description:
      "A rolling charging station that powers multiple devices at once — perfect for classrooms with limited outlets during 60–90 minute sessions.",
    quantity: 4,
    priority: "Medium",
  },
  {
    name: "CS Unplugged Activity Cards",
    category: "Student Support",
    description:
      "Card sets for teaching algorithms, binary, and logic without a screen. Great for ice-breakers and for days when technology is unavailable.",
    quantity: 20,
    priority: "Medium",
  },
  {
    name: "CodeCore T-Shirts",
    category: "Merchandise",
    description:
      "Students who wear the CodeCore shirt feel part of something bigger. T-shirts build community identity and pride in their coding journey.",
    quantity: 200,
    priority: "High",
  },
  {
    name: "CodeCore Sweatshirts & Hoodies",
    category: "Merchandise",
    description:
      "Cozy CodeCore hoodies for students and volunteers — perfect for early morning sessions and school events.",
    quantity: 100,
    priority: "Medium",
  },
  {
    name: "CodeCore Hats",
    category: "Merchandise",
    description:
      "Branded caps that students can wear with pride at school, hackathons, and STEM fairs across El Paso.",
    quantity: 100,
    priority: "Medium",
  },
  {
    name: "CodeCore Mugs",
    category: "Merchandise",
    description:
      "A great thank-you gift for teachers, faculty points-of-contact, and volunteer mentors who make each chapter possible.",
    quantity: 50,
    priority: "Low",
  },
  {
    name: "CodeCore Bracelets",
    category: "Merchandise",
    description:
      "Fun wearable reminders that students are part of a coding community. Great as rewards and milestone gifts.",
    quantity: 200,
    priority: "Low",
  },
  {
    name: "CodeCore Notebooks & Pens",
    category: "Merchandise",
    description:
      "Branded notebooks for sketching algorithms, tracking project ideas, and taking notes.",
    quantity: 200,
    priority: "Medium",
  },
];

const PRIORITY_CLASS = {
  High: "badge-high",
  Medium: "badge-medium",
  Low: "badge-low",
};

let wishlistCards = [];
let cart = {};

document.addEventListener("DOMContentLoaded", async () => {
  const [sponsors, wishlist] = await Promise.all([
    loadJSON("data/sponsors.json", FALLBACK_SPONSORS),
    loadJSON("data/wishlist.json", FALLBACK_WISHLIST),
  ]);
  renderSponsors(sponsors);
  renderWishlist(wishlist);
  initWishlistTabs();
  initCart();
  initForm();
});

function renderSponsors(sponsors) {
  const containers = {
    Gold: document.getElementById("sponsors-gold"),
    Silver: document.getElementById("sponsors-silver"),
    Partner: document.getElementById("sponsors-partner"),
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
    const logoPlaceholder = document.createElement("div");
    logoPlaceholder.className = "sp-logo-placeholder";
    logoPlaceholder.textContent = s.name;
    logoPlaceholder.style.display = "none";
    img.addEventListener("error", () => {
      img.style.display = "none";
      logoPlaceholder.style.display = "flex";
    });
    card.appendChild(img);
    card.appendChild(logoPlaceholder);

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
    card.dataset.name = item.name;

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

    const cartRow = document.createElement("div");
    cartRow.className = "sp-cart-row";

    const qtyInput = document.createElement("input");
    qtyInput.type = "number";
    qtyInput.min = "1";
    qtyInput.max = String(item.quantity || 999);
    qtyInput.value = "1";
    qtyInput.className = "sp-qty-input";
    qtyInput.setAttribute("aria-label", "Quantity to donate");
    cartRow.appendChild(qtyInput);

    const btn = document.createElement("button");
    btn.className = "btn-primary sp-add-btn";
    btn.textContent = "Add to Cart";
    btn.addEventListener("click", () => {
      const qty = parseInt(qtyInput.value, 10);
      if (!qty || qty < 1) return;
      addToCart(item.name, qty, item.category);
      btn.textContent = "✓ Added";
      btn.style.background = "var(--green)";
      setTimeout(() => {
        btn.textContent = "Add to Cart";
        btn.style.background = "";
      }, 1500);
    });
    cartRow.appendChild(btn);

    card.appendChild(cartRow);
    grid.appendChild(card);
    wishlistCards.push(card);
  });
}

function addToCart(name, qty, category) {
  if (cart[name]) {
    cart[name].qty += qty;
  } else {
    cart[name] = { qty, category };
  }
  updateCartUI();
}

function makeEl(tag, opts = {}) {
  const el = document.createElement(tag);
  if (opts.className) el.className = opts.className;
  if (opts.text) el.textContent = opts.text;
  if (opts.style) el.style.cssText = opts.style;
  return el;
}

function updateCartUI() {
  const cartSection = document.getElementById("donation-cart");
  const cartList = document.getElementById("cart-items-list");
  if (!cartSection || !cartList) return;

  const entries = Object.entries(cart);
  if (entries.length === 0) {
    cartSection.style.display = "none";
    return;
  }

  cartSection.style.display = "";
  cartList.textContent = "";

  const table = makeEl("table", { className: "sp-cart-table" });

  const thead = document.createElement("thead");
  const headerRow = document.createElement("tr");
  ["Item", "Category", "Qty", ""].forEach((label) => {
    const th = document.createElement("th");
    th.textContent = label;
    headerRow.appendChild(th);
  });
  thead.appendChild(headerRow);
  table.appendChild(thead);

  const tbody = document.createElement("tbody");
  entries.forEach(([itemName, { qty, category }]) => {
    const tr = document.createElement("tr");

    tr.appendChild(makeEl("td", { text: itemName }));

    const tdCat = makeEl("td", {
      text: category,
      style: "color:var(--text-mid)",
    });
    tr.appendChild(tdCat);

    tr.appendChild(
      makeEl("td", { text: String(qty), style: "font-weight:700" }),
    );

    const tdRemove = document.createElement("td");
    const removeBtn = makeEl("button", {
      className: "sp-cart-remove",
      text: "✕",
    });
    removeBtn.addEventListener("click", () => {
      delete cart[itemName];
      updateCartUI();
    });
    tdRemove.appendChild(removeBtn);
    tr.appendChild(tdRemove);

    tbody.appendChild(tr);
  });
  table.appendChild(tbody);
  cartList.appendChild(table);

  cartSection.scrollIntoView({ behavior: "smooth", block: "start" });
}

function initCart() {
  const clearBtn = document.getElementById("cart-clear");
  const submitBtn = document.getElementById("cart-submit");

  clearBtn?.addEventListener("click", () => {
    cart = {};
    updateCartUI();
  });

  submitBtn?.addEventListener("click", async () => {
    const nameEl = document.getElementById("cart-name");
    const emailEl = document.getElementById("cart-email");
    const notesEl = document.getElementById("cart-notes");
    const orgEl = document.getElementById("cart-org");
    const feedback = document.getElementById("cart-feedback");

    const name = nameEl?.value.trim() || "";
    const email = emailEl?.value.trim() || "";
    const notes = notesEl?.value.trim() || "";
    const org = orgEl?.value.trim() || "";

    if (!name || !email) {
      feedback.className = "ch-form-feedback error";
      feedback.textContent = "Please enter your name and email address.";
      return;
    }
    if (!Object.keys(cart).length) {
      feedback.className = "ch-form-feedback error";
      feedback.textContent = "Your cart is empty. Add items before submitting.";
      return;
    }

    const cartSummary = Object.entries(cart)
      .map(([n, { qty }]) => n + " (x" + qty + ")")
      .join(", ");

    const formData = new FormData();
    formData.append("form_type", "donation_cart");
    formData.append("name", name);
    formData.append("email", email);
    formData.append("organization", org);
    formData.append("cart", cartSummary);
    formData.append("notes", notes);
    formData.append(
      "message",
      "Donation cart request:\n" +
        cartSummary +
        "\n\nNotes: " +
        (notes || "None"),
    );

    submitBtn.disabled = true;
    submitBtn.textContent = "Submitting…";

    try {
      const res = await fetch("contact.php", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        feedback.className = "ch-form-feedback success";
        feedback.textContent =
          "Thank you! Our team will review your donation request and be in touch within 2 business days. No payment is required at this time.";
        cart = {};
        updateCartUI();
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
      submitBtn.disabled = false;
      submitBtn.textContent = "Submit Donation Request";
    }
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
