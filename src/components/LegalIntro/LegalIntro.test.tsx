import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { LegalIntro } from "./LegalIntro.tsx";

describe("LegalIntro", () => {
  it("puts the label and date in one eyebrow above the heading", () => {
    render(
      <LegalIntro
        updatedLabel="Last updated"
        updated="25 November 2026"
        title="Terms"
        intro="Plain words."
      />,
    );
    expect(screen.getByText("Last updated 25 November 2026")).toHaveClass("eyebrow");
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Terms");
    expect(screen.getByText("Plain words.")).toBeInTheDocument();
  });
});
