import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { MobileMenu } from "./MobileMenu.tsx";

function renderMenu() {
  render(
    <div>
      <p>Outside</p>
      <MobileMenu label="Site menu">
        <a href="#projects" className="mobile-menu-link">
          Projects
        </a>
        <button type="button">Inside button</button>
      </MobileMenu>
    </div>,
  );
  return screen.getByRole("button", { name: "Site menu" });
}

describe("MobileMenu", () => {
  it("starts closed and toggles open", () => {
    const toggle = renderMenu();
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    expect(screen.getByText("Projects").closest("[hidden]")).not.toBeNull();

    fireEvent.click(toggle);
    expect(toggle).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText("Projects").closest("[hidden]")).toBeNull();
  });

  it("closes on Escape and gives focus back to the button", () => {
    const toggle = renderMenu();
    fireEvent.click(toggle);
    fireEvent.keyDown(document, { key: "Escape" });
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    expect(toggle).toHaveFocus();
  });

  it("closes on a click outside, but not on a control inside", () => {
    const toggle = renderMenu();
    fireEvent.click(toggle);
    fireEvent.pointerDown(screen.getByText("Inside button"));
    expect(toggle).toHaveAttribute("aria-expanded", "true");
    fireEvent.pointerDown(screen.getByText("Outside"));
    expect(toggle).toHaveAttribute("aria-expanded", "false");
  });

  it("closes when a link inside is followed", () => {
    const toggle = renderMenu();
    fireEvent.click(toggle);
    fireEvent.click(screen.getByText("Projects"));
    expect(toggle).toHaveAttribute("aria-expanded", "false");
  });
});
