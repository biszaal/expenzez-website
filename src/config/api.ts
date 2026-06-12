// Backend API base (AWS API Gateway, expenzez-backend-prod). Override per
// environment with VITE_API_URL in Netlify if needed.
export const API_BASE =
  (import.meta.env.VITE_API_URL as string) ||
  "https://zwin017u7e.execute-api.eu-west-2.amazonaws.com";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidEmail(email: string): boolean {
  const e = (email || "").trim();
  return e.length > 0 && e.length <= 254 && EMAIL_RE.test(e);
}

// Single opt-in: POST the email to the marketing subscribe endpoint.
export async function subscribeEmail(email: string): Promise<void> {
  const res = await fetch(`${API_BASE}/marketing/subscribe`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: email.trim(), source: "website" }),
  });

  if (!res.ok) {
    let message = "Subscription failed. Please try again.";
    try {
      const data = await res.json();
      if (data?.error) message = data.error;
    } catch {
      /* non-JSON error body — keep the default message */
    }
    throw new Error(message);
  }
}
