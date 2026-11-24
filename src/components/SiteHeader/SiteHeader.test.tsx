import { render, screen, within } from "@testing-library/react";
import { FolderGit2, FolderKanban, Server } from "lucide-react";
import { describe, expect, it } from "vitest";
import { SiteHeader, type SiteLinkProps } from "./SiteHeader.tsx";

const nav = [
  { label: "Projects", href: "/#projects", icon: FolderKanban },
  { label: "Platform", href: "/platform", icon: Server, current: true },
  { label: "GitHub", href: "https://github.com/x", icon: FolderGit2, external: true },
];

const desktop = () => within(screen.getByRole("navigation", { name: "Main" }));

describe("SiteHeader", () => {
  it("shows the nav with aria-current and a sign-in link when signed out", () => {
    render(
      <SiteHeader
        brand={{ name: "Site", href: "/" }}
        nav={nav}
        theme="system"
        user={null}
        signInHref="/auth/login"
      />,
    );
    expect(screen.getByRole("link", { name: "Site, home" })).toHaveAttribute("href", "/");
    expect(desktop().getByRole("link", { name: "Platform" })).toHaveAttribute(
      "aria-current",
      "page",
    );
    expect(desktop().getByRole("link", { name: "Projects" })).not.toHaveAttribute("aria-current");
    const github = desktop().getByRole("link", { name: "GitHub" });
    expect(github).toHaveAttribute("target", "_blank");
    expect(github).toHaveAttribute("rel", "noopener noreferrer");
    expect(desktop().getByRole("link", { name: "Sign in" })).toHaveAttribute("href", "/auth/login");
    expect(screen.queryByRole("button", { name: "Sign out" })).toBeNull();
    // The phone menu holds the same links.
    expect(screen.getAllByRole("link", { name: "Platform", hidden: true })).toHaveLength(2);
  });

  it("shows the account link and a sign-out form when signed in", () => {
    const { container } = render(
      <SiteHeader
        brand={{ name: "Site", href: "/" }}
        nav={nav}
        theme="light"
        user={{ name: "Ada" }}
        accountHref="https://auth.example/account"
        signInHref="/auth/login"
        signOutAction="/logout"
        labels={{ signOut: "Leave", account: "Account" }}
      />,
    );
    expect(desktop().queryByRole("link", { name: "Sign in" })).toBeNull();
    expect(desktop().getByRole("link", { name: /Account/ })).toHaveAttribute(
      "href",
      "https://auth.example/account",
    );
    expect(desktop().getByRole("button", { name: "Leave" })).toBeInTheDocument();
    const forms = container.querySelectorAll("form");
    expect([...forms].map((f) => f.getAttribute("action"))).toEqual(["/logout", "/logout"]);
  });

  it("renders internal links with linkComponent and stays put unless sticky", () => {
    const Custom = (props: SiteLinkProps) => <a data-custom="" {...props} />;
    const { container, rerender } = render(
      <SiteHeader
        brand={{ name: "Site", href: "/" }}
        nav={nav}
        theme="system"
        user={null}
        linkComponent={Custom}
      />,
    );
    expect(desktop().getByRole("link", { name: "Projects" })).toHaveAttribute("data-custom");
    expect(desktop().getByRole("link", { name: "GitHub" })).not.toHaveAttribute("data-custom");
    expect(container.querySelector("header")).not.toHaveClass("sticky");

    rerender(
      <SiteHeader
        brand={{ name: "Site", href: "/" }}
        nav={nav}
        theme="system"
        user={null}
        sticky
      />,
    );
    expect(container.querySelector("header")).toHaveClass("sticky");
  });
});
