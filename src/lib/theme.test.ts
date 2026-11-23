import { afterEach, describe, expect, it } from "vitest";
import {
  applyColours,
  applyTheme,
  colourAttrs,
  DEFAULT_COLOURS,
  preferenceCookieDomain,
  presetColours,
  presetOf,
  readColours,
  readTheme,
  themeClass,
  writeColours,
} from "./theme.ts";

describe("readTheme", () => {
  it("accepts known themes and falls back to system", () => {
    expect(readTheme("dark")).toBe("dark");
    expect(readTheme("light")).toBe("light");
    expect(readTheme(undefined)).toBe("system");
    expect(readTheme("purple")).toBe("system");
  });
});

describe("themeClass", () => {
  it("gives no class for system, so the OS decides", () => {
    expect(themeClass("system")).toBeUndefined();
    expect(themeClass("dark")).toBe("dark");
  });
});

describe("applyTheme", () => {
  afterEach(() => {
    document.documentElement.className = "";
    document.cookie = "theme=; max-age=0; path=/";
  });

  it("swaps the class on <html> and saves the cookie", () => {
    applyTheme("dark");
    expect(document.documentElement.classList.contains("dark")).toBe(true);
    expect(document.cookie).toContain("theme=dark");

    applyTheme("system");
    expect(document.documentElement.classList.contains("dark")).toBe(false);
    expect(document.cookie).toContain("theme=system");
  });
});

describe("readColours", () => {
  it("reads one choice per role and falls back per role", () => {
    expect(readColours("teal.sky.mint")).toEqual({
      primary: "teal",
      secondary: "sky",
      accent: "mint",
    });
    expect(readColours("teal.nope")).toEqual({ ...DEFAULT_COLOURS, primary: "teal" });
    expect(readColours(undefined)).toEqual(DEFAULT_COLOURS);
    expect(DEFAULT_COLOURS).toEqual({ primary: "blue", secondary: "red", accent: "yellow" });
    expect(writeColours(readColours("slate.teal.yellow"))).toBe("slate.teal.yellow");
  });

  it("gives attributes only for non-default roles", () => {
    expect(colourAttrs(DEFAULT_COLOURS)).toEqual({});
    expect(colourAttrs({ ...DEFAULT_COLOURS, accent: "lime" })).toEqual({ "data-accent": "lime" });
  });

  it("matches presets", () => {
    expect(presetOf(DEFAULT_COLOURS)).toBe("brand");
    expect(presetOf(presetColours("ocean"))).toBe("ocean");
    expect(presetOf({ ...DEFAULT_COLOURS, primary: "slate" })).toBeUndefined();
  });
});

describe("preferenceCookieDomain", () => {
  it("shares on real hosts only", () => {
    expect(preferenceCookieDomain("https://example.com")).toBe("example.com");
    expect(preferenceCookieDomain("https://www.example.com/")).toBe("example.com");
    expect(preferenceCookieDomain("http://localhost:8080")).toBeUndefined();
    expect(preferenceCookieDomain("http://users.localhost:8080")).toBeUndefined();
    expect(preferenceCookieDomain("http://127.0.0.1:3001")).toBeUndefined();
    expect(preferenceCookieDomain("not a url")).toBeUndefined();
    expect(preferenceCookieDomain(undefined)).toBeUndefined();
  });
});

describe("applyColours", () => {
  afterEach(() => {
    for (const role of ["primary", "secondary", "accent"])
      delete document.documentElement.dataset[role];
    document.cookie = "colours=; max-age=0; path=/";
  });

  it("sets data-<role> on <html>, clears defaults, and saves one cookie", () => {
    applyColours({ primary: "green", secondary: "red", accent: "mint" });
    expect(document.documentElement.dataset.primary).toBe("green");
    expect(document.documentElement.dataset.secondary).toBeUndefined();
    expect(document.documentElement.dataset.accent).toBe("mint");
    expect(document.cookie).toContain("colours=green.red.mint");

    applyColours(DEFAULT_COLOURS);
    expect(document.documentElement.dataset.primary).toBeUndefined();
    expect(document.cookie).toContain("colours=blue.red.yellow");
  });
});
