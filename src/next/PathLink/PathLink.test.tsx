import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { PathLink } from "./PathLink.tsx";

vi.mock("next/navigation", () => ({ usePathname: () => "/users/42" }));

describe("PathLink", () => {
  it("marks itself current on its route and below, but not for other or hash links", () => {
    render(
      <>
        <PathLink href="/users">Directory</PathLink>
        <PathLink href="/users" exact>
          Exact
        </PathLink>
        <PathLink href="/settings">Settings</PathLink>
        <PathLink href="/users#top">Top</PathLink>
        <PathLink href="/">Home</PathLink>
      </>,
    );
    expect(screen.getByRole("link", { name: "Directory" })).toHaveAttribute("aria-current", "page");
    for (const name of ["Exact", "Settings", "Top", "Home"])
      expect(screen.getByRole("link", { name })).not.toHaveAttribute("aria-current");
  });
});
