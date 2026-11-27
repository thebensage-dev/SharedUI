import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { MediaText } from "./MediaText.tsx";

describe("MediaText", () => {
  it("puts the image after the text on wide screens when it goes on the right", () => {
    render(
      <MediaText media={<span>image</span>} mediaSide="right">
        <p>words</p>
      </MediaText>,
    );
    expect(screen.getByText("image").parentElement).toHaveClass("md:order-last");
    expect(screen.getByText("words")).toBeInTheDocument();
  });
});
