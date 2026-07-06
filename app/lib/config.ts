/**
 * Form & scheduling configuration
 *
 * Swap in your real endpoint IDs and Calendly URL below when ready.
 */

export const CONTACT_FORMSPREE_ACTION =
  "https://formspree.io/f/xrewrwqp";

/** TODO: Paste your Schedule / consultation Formspree form ID */
export const SCHEDULE_FORMSPREE_ACTION =
  "https://formspree.io/f/YOUR_SECOND_FORM_ID";

/** TODO: Paste your Calendly consultation scheduling link */
export const CALENDLY_URL =
  "https://calendly.com/YOUR-USERNAME/consultation";

export async function submitFormspreeForm(
  action: string,
  form: HTMLFormElement,
) {
  const response = await fetch(action, {
    method: "POST",
    body: new FormData(form),
    headers: { Accept: "application/json" },
  });

  if (!response.ok) {
    throw new Error("Form submission failed");
  }
}
