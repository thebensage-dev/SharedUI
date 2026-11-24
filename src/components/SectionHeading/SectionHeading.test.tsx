import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SectionHeading } from "./SectionHeading.tsx";

describe("SectionHeading", () => {
  it("puts the id on the h2 and shows the eyebrow and intro", () => {
    render(
      <section aria-labelledby="s-title">
        <SectionHeading
          id="s-title"
          title="Features"
          eyebrow="What it does"
          eyebrowTone="tone-accent"
          intro="All of it."
        />
      </section>,
    );
    const heading = screen.getByRole("heading", { level: 2, name: "Features" });
    expect(heading).toHaveAttribute("id", "s-title");
    expect(screen.getByRole("region", { name: "Features" })).toBeInTheDocument();
    expect(screen.getByText("What it does")).toHaveClass("eyebrow", "tone-accent");
    expect(screen.getByText("All of it.")).toBeInTheDocument();
  });

  it("leaves out the eyebrow and intro when not given", () => {
    const { container } = render(<SectionHeading id="t" title="Only a title" />);
    expect(container.querySelectorAll("p")).toHaveLength(0);
  });
});
