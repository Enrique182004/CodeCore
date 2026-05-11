document.addEventListener("DOMContentLoaded", function () {
  initSchools();
  initWishlist();
  initSponsors();
  initContactForm();
});

/* ── Schools + Map ── */
async function initSchools() {
  const grid = document.getElementById("schools-grid");
  let schools = [];

  try {
    const res = await fetch("data/schools.json");
    if (!res.ok) throw new Error("fetch failed");
    schools = await res.json();

    grid.textContent = "";
    schools.forEach(function (school, i) {
      grid.appendChild(buildSchoolCard(school, i));
    });
  } catch (err) {
    grid.textContent = "";
    const p = document.createElement("p");
    p.className = "error-text";
    p.textContent = "Unable to load school data. Please try again later.";
    grid.appendChild(p);
    console.error("Failed to load schools:", err);
  }

  initMap(schools);
}

function buildSchoolCard(school, index) {
  const card = document.createElement("div");
  card.className = "school-card";
  card.style.animationDelay = index * 0.15 + "s";

  const h3 = document.createElement("h3");
  h3.textContent = school.name;
  card.appendChild(h3);

  const badge = document.createElement("span");
  badge.className =
    "level-badge " +
    (school.level === "Elementary" ? "elementary" : "middle-school");
  badge.textContent = school.level;
  card.appendChild(badge);

  const p = document.createElement("p");
  p.textContent = school.description;
  card.appendChild(p);

  return card;
}

function initMap(schools) {
  const map = L.map("map").setView([31.7619, -106.485], 11);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 19,
  }).addTo(map);

  schools.forEach(function (school) {
    if (typeof school.lat !== "number" || typeof school.lng !== "number")
      return;

    const popup = document.createElement("div");
    const strong = document.createElement("strong");
    strong.textContent = school.name;
    popup.appendChild(strong);
    popup.appendChild(document.createElement("br"));
    popup.appendChild(document.createTextNode(school.level));

    L.marker([school.lat, school.lng]).addTo(map).bindPopup(popup);
  });
}

/* ── Wishlist ── */
async function initWishlist() {
  const grid = document.getElementById("wishlist-grid");

  try {
    const res = await fetch("data/wishlist.json");
    if (!res.ok) throw new Error("fetch failed");
    const items = await res.json();

    grid.textContent = "";
    items.forEach(function (item, i) {
      grid.appendChild(buildWishlistCard(item, i));
    });
  } catch (err) {
    grid.textContent = "";
    const p = document.createElement("p");
    p.className = "error-text";
    p.textContent = "Unable to load wishlist. Please try again later.";
    grid.appendChild(p);
    console.error("Failed to load wishlist:", err);
  }
}

function buildWishlistCard(item, index) {
  const card = document.createElement("div");
  card.className = "wishlist-card";
  card.style.animationDelay = index * 0.15 + "s";

  const header = document.createElement("div");
  header.className = "wishlist-card-header";

  const h3 = document.createElement("h3");
  h3.textContent = item.name;
  header.appendChild(h3);

  if (item.priority) {
    const badge = document.createElement("span");
    badge.className = "priority-badge " + item.priority.toLowerCase();
    badge.textContent = item.priority;
    header.appendChild(badge);
  }

  card.appendChild(header);

  const desc = document.createElement("p");
  desc.textContent = item.description;
  card.appendChild(desc);

  if (item.quantity) {
    const qty = document.createElement("p");
    qty.className = "wishlist-quantity";
    qty.textContent = "Quantity needed: " + item.quantity;
    card.appendChild(qty);
  }

  const btn = document.createElement("button");
  btn.className = "donate-btn";
  btn.textContent = "Donate This Item";
  btn.addEventListener("click", function () {
    const messageField = document.getElementById("message");
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
  const grid = document.getElementById("sponsors-grid");

  try {
    const res = await fetch("data/sponsors.json");
    if (!res.ok) throw new Error("fetch failed");
    const sponsors = await res.json();

    grid.textContent = "";

    if (sponsors.length === 0) {
      const p = document.createElement("p");
      p.className = "loading-text";
      p.textContent = "No sponsors listed yet.";
      grid.appendChild(p);
      return;
    }

    sponsors.forEach(function (sponsor) {
      grid.appendChild(buildSponsorCard(sponsor));
    });
  } catch (err) {
    grid.textContent = "";
    const p = document.createElement("p");
    p.className = "error-text";
    p.textContent = "Unable to load sponsor data. Please try again later.";
    grid.appendChild(p);
    console.error("Failed to load sponsors:", err);
  }
}

function buildSponsorCard(sponsor) {
  const card = document.createElement(sponsor.url ? "a" : "div");
  card.className = "sponsor-card";
  if (sponsor.url) {
    card.href = sponsor.url;
    card.target = "_blank";
    card.rel = "noopener noreferrer";
  }

  const img = document.createElement("img");
  img.src = sponsor.logo;
  img.alt = sponsor.name + " logo";
  img.addEventListener("error", function () {
    this.style.display = "none";
  });
  card.appendChild(img);

  const nameEl = document.createElement("span");
  nameEl.textContent = sponsor.name;
  card.appendChild(nameEl);

  return card;
}

/* ── Contact Form ── */
function initContactForm() {
  const form = document.getElementById("contact-form");
  const feedback = document.getElementById("form-feedback");
  const submitBtn = form.querySelector(".submit-btn");

  form.addEventListener("submit", async function (e) {
    e.preventDefault();
    feedback.className = "form-feedback";
    feedback.textContent = "";
    submitBtn.disabled = true;
    submitBtn.textContent = "Sending...";

    try {
      const res = await fetch("contact.php", {
        method: "POST",
        body: new FormData(form),
      });
      const data = await res.json();

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
