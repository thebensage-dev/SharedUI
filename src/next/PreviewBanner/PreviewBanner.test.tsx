import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { PreviewBanner } from "./PreviewBanner.tsx";

vi.mock("next/navigation", () => ({ usePathname: () => "/users/7" }));

describe("PreviewBanner", () => {
  it("links to the exit route with this page's path", () => {
    render(<PreviewBanner label="Preview" exit="Leave preview" />);
    expect(screen.getByRole("status")).toHaveTextContent("Preview");
    expect(screen.getByRole("link", { name: "Leave preview" })).toHaveAttribute(
      "href",
      "/preview/exit?path=%2Fusers%2F7",
    );
  });
});
