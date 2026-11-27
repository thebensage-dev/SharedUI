import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { PageIntro } from "./PageIntro.tsx";

describe("PageIntro", () => {
  it("shows the trail, heading and intro, with structured data when given the site", () => {
    const { container } = render(
      <PageIntro
        crumbs={[
          { label: "Home", path: "/" },
          { label: "Skills", path: "/skills" },
        ]}
        breadcrumbsLabel="Trail"
        eyebrow="What I do"
        title="Skills"
        intro="The tools I use."
        siteUrl="https://example.com"
      >
        <a href="/contact">Contact</a>
      </PageIntro>,
    );
    expect(screen.getByRole("navigation", { name: "Trail" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute("href", "/");
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Skills");
    expect(screen.getByText("The tools I use.")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Contact" })).toBeInTheDocument();
    const data = container.querySelector('script[type="application/ld+json"]');
    expect(data?.innerHTML).toContain("https://example.com/skills");
  });

  it("leaves out the trail and structured data when there are no crumbs", () => {
    const { container } = render(<PageIntro title="Hello" siteUrl="https://example.com" />);
    expect(screen.queryByRole("navigation")).toBeNull();
    expect(container.querySelector("script")).toBeNull();
  });
});
