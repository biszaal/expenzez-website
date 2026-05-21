export type Store = "ios" | "android";

export const SITE_URL = "https://expenzez.com";

export const APP_STORE_URL =
  "https://apps.apple.com/gb/app/expenzez/id6751338089";

export const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.biszaaltech.expenzez";

export const SOCIAL = {
  reddit: "https://www.reddit.com/r/expenzez/",
  instagram: "https://www.instagram.com/expenzezapp/",
} as const;

export type Utm = { source: string; medium: string; campaign: string };

export function storeUrl(store: Store, utm?: Utm): string {
  const base = store === "ios" ? APP_STORE_URL : PLAY_STORE_URL;
  if (!utm) return base;
  const sep = base.includes("?") ? "&" : "?";
  const params = new URLSearchParams({
    utm_source: utm.source,
    utm_medium: utm.medium,
    utm_campaign: utm.campaign,
  });
  return `${base}${sep}${params.toString()}`;
}
