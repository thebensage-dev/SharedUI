import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { searchTerms } from "../../lib/text.ts";
import { Highlight } from "./Highlight.tsx";

describe("Highlight", () => {
  it("marks matches regardless of case and accents", () => {
    const { container } = render(<Highlight text="Zoë Okafor" terms={searchTerms("ZOE")} />);
    expect([...container.querySelectorAll("mark")].map((m) => m.textContent)).toEqual(["Zoë"]);
    expect(container.textContent).toBe("Zoë Okafor");
  });

  it("renders plain text without terms", () => {
    const { container } = render(<Highlight text="Ada" terms={[]} />);
    expect(container.querySelector("mark")).toBeNull();
  });
});
