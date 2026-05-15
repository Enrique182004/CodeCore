"use strict";

const FALLBACK_SPONSORS = [
  {
    name: "El Paso Electric",
    logo: "images/sponsors/EPEC_logo.png",
    url: "https://www.epelectric.com/",
  },
  {
    name: "Chiquis Bakery",
    logo: "images/sponsors/chiquisBakery_logo.webp",
    url: "https://www.chiquisbakery.com/",
  },
];

const FALLBACK_WISHLIST = [
  {
    name: "Chromebooks",
    category: "Technology",
    price: 350,
    description:
      "Many students at our chapter schools don't have personal devices. Each Chromebook lets one more student participate hands-on instead of sharing.",
    quantity: 60,
  },
  {
    name: "Wireless Mouse & Keyboard Sets",
    category: "Technology",
    price: 30,
    description:
      "Reliable input devices make a huge difference in how quickly students can practice. One set per student keeps sessions running smoothly.",
    quantity: 30,
  },
  {
    name: "Mobile Power Tower",
    category: "Technology",
    price: 200,
    description:
      "A rolling charging station that powers multiple devices at once — perfect for classrooms with limited outlets during 60–90 minute sessions.",
    quantity: 4,
  },
  {
    name: "CS Unplugged Activity Cards",
    category: "Student Support",
    price: 25,
    description:
      "Card sets for teaching algorithms, binary, and logic without a screen. Great for ice-breakers and for days when technology is unavailable.",
    quantity: 20,
  },
  {
    name: "CodeCore T-Shirts",
    category: "Merchandise",
    price: 15,
    description:
      "Students who wear the CodeCore shirt feel part of something bigger. T-shirts build community identity and pride in their coding journey.",
    quantity: 200,
  },
  {
    name: "CodeCore Sweatshirts & Hoodies",
    category: "Merchandise",
    price: 35,
    description:
      "Cozy CodeCore hoodies for students and volunteers — perfect for early morning sessions and school events.",
    quantity: 100,
  },
  {
    name: "CodeCore Hats",
    category: "Merchandise",
    price: 20,
    description:
      "Branded caps that students can wear with pride at school, hackathons, and school-wide challenges across El Paso.",
    quantity: 100,
  },
  {
    name: "CodeCore Mugs",
    category: "Merchandise",
    price: 12,
    description:
      "A great thank-you gift for teachers, faculty points-of-contact, and volunteer mentors who make each chapter possible.",
    quantity: 50,
  },
  {
    name: "CodeCore Bracelets",
    category: "Merchandise",
    price: 5,
    description:
      "Fun wearable reminders that students are part of a coding community. Great as rewards and milestone gifts.",
    quantity: 200,
  },
  {
    name: "CodeCore Notebooks & Pens",
    category: "Merchandise",
    price: 8,
    description:
      "Branded notebooks for sketching algorithms, tracking project ideas, and taking notes.",
    quantity: 200,
  },
];

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
  const container = document.getElementById("sponsors-all");
  if (!container) return;
  container.textContent = "";

  sponsors.forEach((s) => {
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

    card.appendChild(top);

    const desc = document.createElement("p");
    desc.textContent = item.description;
    card.appendChild(desc);

    if (item.price) {
      const priceEl = document.createElement("p");
      priceEl.className = "sp-wish-price";
      priceEl.textContent = "$" + item.price.toFixed(2) + " per unit";
      priceEl.style.cssText =
        "font-weight:700; color:var(--teal); margin:0.5rem 0 0.25rem;";
      card.appendChild(priceEl);
    }

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
      addToCart(item.name, qty, item.category, item.price || 0);
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

function addToCart(name, qty, category, price) {
  if (cart[name]) {
    cart[name].qty += qty;
  } else {
    cart[name] = { qty, category, price };
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
  ["Item", "Category", "Price/unit", "Qty", "Subtotal", ""].forEach((label) => {
    const th = document.createElement("th");
    th.textContent = label;
    headerRow.appendChild(th);
  });
  thead.appendChild(headerRow);
  table.appendChild(thead);

  const tbody = document.createElement("tbody");
  let grandTotal = 0;

  entries.forEach(([itemName, { qty, category, price }]) => {
    const subtotal = price * qty;
    grandTotal += subtotal;
    const tr = document.createElement("tr");

    tr.appendChild(makeEl("td", { text: itemName }));
    tr.appendChild(
      makeEl("td", { text: category, style: "color:var(--text-mid)" }),
    );
    tr.appendChild(
      makeEl("td", {
        text: price ? "$" + price.toFixed(2) : "—",
        style: "color:var(--teal)",
      }),
    );
    tr.appendChild(
      makeEl("td", { text: String(qty), style: "font-weight:700" }),
    );
    tr.appendChild(
      makeEl("td", {
        text: price ? "$" + subtotal.toFixed(2) : "—",
        style: "font-weight:700",
      }),
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

  const tfoot = document.createElement("tfoot");
  const totalRow = document.createElement("tr");
  const totalLabelCell = document.createElement("td");
  totalLabelCell.colSpan = 4;
  totalLabelCell.textContent = "Estimated Total";
  totalLabelCell.style.cssText =
    "text-align:right; font-weight:700; padding-top:0.75rem;";
  const totalValueCell = document.createElement("td");
  totalValueCell.colSpan = 2;
  totalValueCell.textContent = "$" + grandTotal.toFixed(2);
  totalValueCell.style.cssText =
    "font-weight:700; color:var(--teal); font-size:1.1em; padding-top:0.75rem;";
  totalRow.appendChild(totalLabelCell);
  totalRow.appendChild(totalValueCell);
  tfoot.appendChild(totalRow);
  table.appendChild(tfoot);

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

    const grandTotal = Object.values(cart).reduce(
      (sum, { qty, price }) => sum + price * qty,
      0,
    );

    const cartSummary = Object.entries(cart)
      .map(
        ([n, { qty, price }]) =>
          n + " (x" + qty + " @ $" + price.toFixed(2) + ")",
      )
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
        "\nEstimated Total: $" +
        grandTotal.toFixed(2) +
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
