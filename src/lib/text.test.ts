import { describe, expect, it } from "vitest";
import { normalise, pluralise, searchTerms } from "./text.ts";

describe("text helpers", () => {
  it("normalises case and accents", () => {
    expect(normalise("Zoë ÅNGSTRÖM")).toBe("zoe angstrom");
    expect(searchTerms("  Ada   Lovelace ")).toEqual(["ada", "lovelace"]);
  });

  it("pluralises", () => {
    expect(pluralise(1, "user", "users")).toBe("1 user");
    expect(pluralise(3, "user", "users")).toBe("3 users");
  });
});
