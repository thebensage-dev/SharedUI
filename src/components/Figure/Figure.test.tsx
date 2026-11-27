import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Figure } from "./Figure.tsx";

describe("Figure", () => {
  it("shows the image with its alt text and caption, small when asked", () => {
    const { container } = render(
      <Figure src="/a.png" alt="A chart" width={800} height={600} caption="Last week" small />,
    );
    const img = screen.getByRole("img", { name: "A chart" });
    expect(img).toHaveAttribute("width", "800");
    expect(screen.getByText("Last week").tagName).toBe("FIGCAPTION");
    expect(container.firstChild).toHaveClass("max-w-sm");
  });
});
