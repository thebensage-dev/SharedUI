import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { NoteCard } from "./NoteCard.tsx";

describe("NoteCard", () => {
  it("shows the title and body in the default accent tone", () => {
    const { container } = render(<NoteCard title="Heads up" body="Something to know." />);
    expect(screen.getByText("Heads up")).toBeInTheDocument();
    expect(screen.getByText("Something to know.")).toBeInTheDocument();
    expect(container.firstChild).toHaveClass("card", "tone-card", "tone-accent");
    expect(screen.queryByRole("link")).toBeNull();
  });

  it("puts children in an action row and takes another tone", () => {
    const { container } = render(
      <NoteCard title="Try it" body="Sign in." tone="tone-secondary">
        <a href="/login">Sign in</a>
      </NoteCard>,
    );
    expect(container.firstChild).toHaveClass("tone-secondary");
    expect(screen.getByRole("link", { name: "Sign in" }).parentElement).toHaveClass("flex");
  });
});
