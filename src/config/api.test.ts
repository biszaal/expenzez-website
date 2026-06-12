import { describe, it, expect } from "vitest";
import { isValidEmail } from "./api";

describe("isValidEmail", () => {
  it("accepts well-formed addresses", () => {
    expect(isValidEmail("person@example.com")).toBe(true);
    expect(isValidEmail("  spaced@example.co.uk  ")).toBe(true);
  });

  it("rejects malformed or empty addresses", () => {
    expect(isValidEmail("")).toBe(false);
    expect(isValidEmail("nope")).toBe(false);
    expect(isValidEmail("a@b")).toBe(false);
    expect(isValidEmail("@example.com")).toBe(false);
  });
});
