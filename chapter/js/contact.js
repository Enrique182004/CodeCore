"use strict";

document.addEventListener("DOMContentLoaded", () => {
  initForm({
    formId: "school-form",
    feedbackId: "sc-feedback",
    submitId: "sc-submit",
    label: "Submit School Interest",
    subject: (f) => "New School Chapter Interest — " + (f["School Name"] || ""),
    success: "Thank you! We'll be in touch within 48 hours.",
  });
  initForm({
    formId: "sponsor-form",
    feedbackId: "sp-feedback",
    submitId: "sp-submit",
    label: "Send Message",
    subject: (f) =>
      "New Sponsor Inquiry — " + (f["Organization"] || f["Name"] || ""),
    success: "Thank you! Our team will respond within 2 business days.",
  });
});

function initForm({ formId, feedbackId, submitId, label, subject, success }) {
  const form = document.getElementById(formId);
  const feedback = document.getElementById(feedbackId);
  const submit = document.getElementById(submitId);
  if (!form || !feedback || !submit) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    feedback.className = "ch-form-feedback";
    feedback.textContent = "";
    if (!form.reportValidity()) return;

    submit.disabled = true;
    submit.textContent = "Sending…";

    try {
      const fields = formToFields(form);
      await sendToOrgEmail(subject(fields), fields, form.elements.email?.value);
      feedback.className = "ch-form-feedback success";
      feedback.textContent = success;
      form.reset();
    } catch {
      feedback.className = "ch-form-feedback error";
      feedback.textContent =
        "Sorry, your message couldn't be sent. Please email us at " +
        ORG_EMAIL +
        ".";
    } finally {
      submit.disabled = false;
      submit.textContent = label;
    }
  });
}
