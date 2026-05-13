"use strict";

document.addEventListener("DOMContentLoaded", () => {
  initForm("school-form", "sc-feedback", "sc-submit");
  initForm("sponsor-form", "sp-feedback", "sp-submit");
});

function initForm(formId, feedbackId, submitId) {
  const form = document.getElementById(formId);
  const feedback = document.getElementById(feedbackId);
  const submit = document.getElementById(submitId);
  if (!form || !feedback || !submit) return;

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
          formId === "school-form"
            ? "Thank you! We'll be in touch within 48 hours."
            : "Thank you! Our team will respond within 2 business days.";
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
      submit.textContent =
        formId === "school-form" ? "Submit School Interest" : "Send Message";
    }
  });
}
