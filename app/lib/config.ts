export const CONTACT_FORMSPREE_ACTION =
  "https://formspree.io/f/xbdvbord";

export const SCHEDULE_FORMSPREE_ACTION =
  "https://formspree.io/f/xrewrwqp";

export const CALENDLY_URL = "https://calendly.com/florakayferg/30min";

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
