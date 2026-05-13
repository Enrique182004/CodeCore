"use strict";

/* ── JSON loader with fallback (works on file:// too) ── */
async function loadJSON(url, fallback) {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("fetch failed");
    return await res.json();
  } catch {
    return fallback;
  }
}

/* ── Navbar HTML ── */
function buildNav() {
  const links = [
    { href: "index.html", label: "Home" },
    { href: "about.html", label: "About" },
    { href: "schools.html", label: "Schools" },
    { href: "students.html", label: "Students" },
    { href: "resources.html", label: "Resources" },
    { href: "sponsors.html", label: "Sponsors" },
    { href: "events.html", label: "Events" },
    { href: "contact.html", label: "Contact" },
  ];

  const current = window.location.pathname.split("/").pop() || "index.html";

  const lis = links
    .map(
      ({ href, label }) =>
        `<li><a href="${href}"${href === current ? ' class="active"' : ""}>${label}</a></li>`,
    )
    .join("");

  return `
<header class="ch-header">
  <div class="ch-header-content">
    <div class="ch-logo-group">
      <a href="../index.html" class="ch-back-link">&#8592; CodeCore Main Site</a>
      <a href="index.html" class="ch-logo">
        <img src="../images/logos/C.png" alt="CodeCore" />
        <span>CodeCore <em>Chapter</em></span>
      </a>
    </div>
    <button class="ch-hamburger" aria-label="Toggle navigation" aria-expanded="false">
      <span></span><span></span><span></span>
    </button>
    <nav class="ch-nav" id="ch-nav">
      <a href="../index.html" class="ch-nav-back">&#8592; Back to CodeCore</a>
      <ul>${lis}</ul>
      <a href="contact.html" class="ch-nav-cta">Start a Chapter</a>
    </nav>
  </div>
</header>
<div class="ch-nav-overlay" id="ch-nav-overlay"></div>`;
}

/* ── Footer HTML ── */
function buildFooter() {
  return `
<footer class="ch-footer">
  <div class="ch-footer-inner">
    <div>
      <h4>CodeCore Chapter</h4>
      <p>Empowering El Paso middle school students through STEM, coding, and responsible AI education. A program of CodeCore at UTEP.</p>
      <div class="ch-footer-social">
        <a href="https://www.instagram.com/codecoreutep" target="_blank" rel="noopener" aria-label="Instagram">
          <svg viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
        </a>
        <a href="https://www.linkedin.com/in/code-core-9a720138a" target="_blank" rel="noopener" aria-label="LinkedIn">
          <svg viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
        </a>
        <a href="mailto:codecore@utep.edu" aria-label="Email">
          <svg viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
        </a>
      </div>
    </div>
    <div>
      <h4>Quick Links</h4>
      <ul class="ch-footer-links">
        <li><a href="index.html">Home</a></li>
        <li><a href="about.html">About Us</a></li>
        <li><a href="schools.html">For Schools</a></li>
        <li><a href="students.html">Student Hub</a></li>
        <li><a href="resources.html">Resources</a></li>
        <li><a href="sponsors.html">Sponsors</a></li>
        <li><a href="events.html">Events</a></li>
        <li><a href="contact.html">Contact</a></li>
      </ul>
    </div>
    <div>
      <h4>Part of the CodeCore Family</h4>
      <p>CodeCore Chapter is the K-8 outreach program of CodeCore at UTEP — bringing the next generation of El Paso coders into the fold.</p>
      <a href="../index.html" class="ch-footer-main-link">Visit CodeCore.org →</a>
    </div>
  </div>
  <div class="ch-footer-bottom">
    <p>© 2026 CodeCore Chapter · El Paso Middle Schools · <a href="../index.html">Part of CodeCore at UTEP</a></p>
  </div>
</footer>`;
}

/* ── Inject into page ── */
function injectNav() {
  const placeholder = document.getElementById("site-nav");
  if (!placeholder) return;
  placeholder.outerHTML = buildNav();
}

function injectFooter() {
  const placeholder = document.getElementById("site-footer");
  if (!placeholder) return;
  placeholder.outerHTML = buildFooter();
}

/* ── Mobile menu ── */
function initMobileMenu() {
  const hamburger = document.querySelector(".ch-hamburger");
  const nav = document.getElementById("ch-nav");
  const overlay = document.getElementById("ch-nav-overlay");
  if (!hamburger || !nav || !overlay) return;

  function open() {
    nav.classList.add("open");
    hamburger.classList.add("open");
    overlay.classList.add("active");
    hamburger.setAttribute("aria-expanded", "true");
    document.body.classList.add("menu-open");
  }
  function close() {
    nav.classList.remove("open");
    hamburger.classList.remove("open");
    overlay.classList.remove("active");
    hamburger.setAttribute("aria-expanded", "false");
    document.body.classList.remove("menu-open");
  }

  hamburger.addEventListener("click", () =>
    nav.classList.contains("open") ? close() : open(),
  );
  overlay.addEventListener("click", close);

  nav.querySelectorAll("a").forEach((a) => a.addEventListener("click", close));
}

/* ── Boot ── */
document.addEventListener("DOMContentLoaded", () => {
  injectNav();
  injectFooter();
  initMobileMenu();
});
