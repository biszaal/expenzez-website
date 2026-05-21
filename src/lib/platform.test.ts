import { describe, it, expect } from "vitest";
import { detectPlatform } from "./platform";

const IOS = "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15";
const IPAD = "Mozilla/5.0 (iPad; CPU OS 17_0 like Mac OS X) AppleWebKit/605.1.15";
const ANDROID = "Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36";
const DESKTOP = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36";

describe("detectPlatform", () => {
  it("detects iOS iPhone", () => expect(detectPlatform(IOS)).toBe("ios"));
  it("detects iPad", () => expect(detectPlatform(IPAD)).toBe("ios"));
  it("detects Android", () => expect(detectPlatform(ANDROID)).toBe("android"));
  it("returns other for desktop", () => expect(detectPlatform(DESKTOP)).toBe("other"));
  it("returns other for empty", () => expect(detectPlatform("")).toBe("other"));
});
