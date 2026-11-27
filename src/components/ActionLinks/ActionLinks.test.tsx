import { render, screen } from "@testing-library/react";
import { ArrowRight, Download } from "lucide-react";
import { describe, expect, it } from "vitest";
import { ActionLinks } from "./ActionLinks.tsx";

const Internal = (props: { href: string; className?: string; children?: React.ReactNode }) => (
  <a data-internal {...props} />
);

describe("ActionLinks", () => {
  it("styles each link and sends this site's links through linkComponent", () => {
    render(
      <ActionLinks
        linkComponent={Internal}
        nudge
        actions={[
          { key: 1, label: "Home", href: "/", internal: true, icon: ArrowRight, size: "lg" },
          {
            key: 2,
            label: "GitHub",
            href: "https://github.com",
            external: true,
            style: "secondary",
          },
          {
            key: 3,
            label: "CV",
            href: "/cv.pdf",
            internal: true,
            download: "cv.pdf",
            icon: Download,
            iconPosition: "start",
            size: "sm",
          },
        ]}
      />,
    );
    const home = screen.getByRole("link", { name: "Home" });
    expect(home).toHaveAttribute("data-internal");
    expect(home).toHaveClass("btn", "btn-primary", "btn-lg", "group");
    const github = screen.getByRole("link", { name: "GitHub" });
    expect(github).toHaveAttribute("target", "_blank");
    expect(github).toHaveClass("btn-secondary");
    const cv = screen.getByRole("link", { name: "CV" });
    expect(cv).not.toHaveAttribute("data-internal");
    expect(cv).toHaveAttribute("download", "cv.pdf");
    expect(cv).toHaveClass("btn-sm");
  });
});
