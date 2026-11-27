import { render, screen } from "@testing-library/react";
import { Inbox } from "lucide-react";
import { describe, expect, it } from "vitest";
import { EmptyState } from "./EmptyState.tsx";

describe("EmptyState", () => {
  it("titles itself with an h2, or the page's h1 when asked", () => {
    const { rerender } = render(<EmptyState icon={Inbox} title="Nothing here" />);
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent("Nothing here");
    rerender(<EmptyState icon={Inbox} title="Not found" headingLevel={1} />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Not found");
  });
});
