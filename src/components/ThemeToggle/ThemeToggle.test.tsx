import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ThemeToggle } from "./ThemeToggle.tsx";

afterEach(() => {
  document.documentElement.className = "";
});

describe("ThemeToggle", () => {
  it("marks the starting theme and switches on click", () => {
    const onChange = vi.fn();
    render(<ThemeToggle initialTheme="system" onChange={onChange} cookieName="ui-theme" />);

    expect(screen.getByRole("button", { name: "Match system theme" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );

    fireEvent.click(screen.getByRole("button", { name: "Dark theme" }));
    expect(screen.getByRole("button", { name: "Dark theme" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    expect(document.documentElement).toHaveClass("dark");
    expect(document.cookie).toContain("ui-theme=dark");
    expect(onChange).toHaveBeenCalledWith("dark");
  });
});
