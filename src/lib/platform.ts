export type Platform = "ios" | "android" | "other";

export function detectPlatform(userAgent: string): Platform {
  const ua = userAgent || "";
  if (/android/i.test(ua)) return "android";
  if (/iphone|ipad|ipod/i.test(ua)) return "ios";
  return "other";
}
