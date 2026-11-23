import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { CookieNotice } from "./CookieNotice.tsx";

describe("CookieNotice", () => {
  it("shows until dismissed, then remembers it in a cookie", () => {
    render(<CookieNotice policyHref="/privacy#cookies" cookieName="test-notice" />);

    expect(screen.getByRole("link", { name: "Cookie details" })).toHaveAttribute(
      "href",
      "/privacy#cookies",
    );
    fireEvent.click(screen.getByRole("button", { name: "Got it" }));
    expect(screen.queryByRole("region", { name: "Cookie notice" })).toBeNull();
    expect(document.cookie).toContain("test-notice=dismissed");
  });

  it("stays hidden once dismissed", () => {
    document.cookie = "seen-notice=dismissed; path=/";
    render(<CookieNotice policyHref="/privacy" cookieName="seen-notice" />);
    expect(screen.queryByRole("region", { name: "Cookie notice" })).toBeNull();
  });
});
