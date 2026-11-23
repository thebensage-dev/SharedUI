import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Footer } from "./Footer.tsx";

describe("Footer", () => {
  it("opens external links in a new tab and keeps internal ones in place", () => {
    render(
      <Footer
        brand={{ name: "Site", href: "/" }}
        groups={[
          {
            title: "Links",
            links: [
              { label: "GitHub", href: "https://github.com", external: true },
              { label: "Home", href: "/" },
            ],
          },
        ]}
        legal={[{ label: "Privacy", href: "/privacy" }]}
      />,
    );

    const github = screen.getByRole("link", { name: /GitHub/ });
    expect(github).toHaveAttribute("target", "_blank");
    expect(github).toHaveAttribute("rel", "noopener noreferrer");
    expect(github).toHaveAccessibleName("GitHub (opens in a new tab)");
    expect(screen.getByRole("link", { name: "Home" })).not.toHaveAttribute("target");
    expect(screen.getByRole("link", { name: "Privacy" })).toHaveAttribute("href", "/privacy");
    expect(screen.getByText(/All rights reserved/)).toHaveTextContent(
      `© ${new Date().getFullYear()} Site.`,
    );
  });
});
