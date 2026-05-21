import { describe, it, expect } from "vitest";
import { storeUrl, APP_STORE_URL, PLAY_STORE_URL } from "./links";

describe("storeUrl", () => {
  it("returns the iOS App Store URL for ios", () => {
    expect(storeUrl("ios")).toBe(APP_STORE_URL);
  });

  it("returns the Play Store URL for android", () => {
    expect(storeUrl("android")).toBe(PLAY_STORE_URL);
  });

  it("appends utm params when provided", () => {
    const url = storeUrl("ios", { source: "reddit", medium: "social", campaign: "launch" });
    expect(url).toContain("utm_source=reddit");
    expect(url).toContain("utm_medium=social");
    expect(url).toContain("utm_campaign=launch");
  });

  it("uses the GB App Store region (not US)", () => {
    expect(APP_STORE_URL).toContain("/gb/");
    expect(APP_STORE_URL).not.toContain("/us/");
  });
});
