import { describe, expect, it } from "vitest";
import { TONES, toneAt, toneClass } from "./tone.ts";

describe("toneAt", () => {
  it("cycles through the tones in the logo's order", () => {
    expect([0, 1, 2, 3, 4].map(toneAt)).toEqual([...TONES, TONES[0], TONES[1]]);
  });

  it("handles negative indexes", () => {
    expect(toneAt(-1)).toBe(TONES[2]);
  });
});

describe("toneClass", () => {
  it("names the CSS class", () => {
    expect(toneClass("accent")).toBe("tone-accent");
  });
});
