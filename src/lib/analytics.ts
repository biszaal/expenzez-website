import type { Store } from "../config/links";

const GA4_ID = (import.meta.env.VITE_GA4_ID as string) || "G-M980SYM4LN";
const CONSENT_KEY = "expenzez_consent";

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

function gtag(...args: unknown[]) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(args);
}

let initialized = false;

/** Loads gtag with consent denied by default (GDPR-safe). Call once at startup. */
export function initAnalytics() {
  if (initialized || typeof window === "undefined" || !GA4_ID) return;
  initialized = true;

  window.gtag = gtag as Window["gtag"];
  gtag("consent", "default", {
    ad_storage: "denied",
    analytics_storage: "denied",
  });
  gtag("js", new Date());
  gtag("config", GA4_ID, { anonymize_ip: true });

  const s = document.createElement("script");
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`;
  document.head.appendChild(s);

  if (getConsent() === "granted") grantConsent();
}

export function getConsent(): "granted" | "denied" | null {
  if (typeof window === "undefined") return null;
  return (localStorage.getItem(CONSENT_KEY) as "granted" | "denied" | null) ?? null;
}

export function grantConsent() {
  localStorage.setItem(CONSENT_KEY, "granted");
  gtag("consent", "update", { analytics_storage: "granted" });
}

export function denyConsent() {
  localStorage.setItem(CONSENT_KEY, "denied");
  gtag("consent", "update", { analytics_storage: "denied" });
}

/** Fires a download_click event. No-op if analytics not initialized. */
export function trackDownload(store: Store | "unknown", location: string) {
  if (!initialized) return;
  gtag("event", "download_click", { store, location });
}
