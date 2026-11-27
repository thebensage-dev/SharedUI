import { Circle, Mail } from "lucide-react";
import { describe, expect, it } from "vitest";
import { ICON_NAMES, iconByName, iconOrDot } from "./icons.ts";

describe("icons by name", () => {
  it("finds a named icon, falls back to a dot, and is empty for no name", () => {
    expect(iconByName("Mail")).toBe(Mail);
    expect(iconByName("NotAnIcon")).toBe(Circle);
    expect(iconByName("")).toBeUndefined();
    expect(iconOrDot(null)).toBe(Circle);
    expect(ICON_NAMES).toContain("PenTool");
  });
});
