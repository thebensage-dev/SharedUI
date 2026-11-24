import clsx from "clsx";
import { LogIn, LogOut, UserCog, type LucideIcon } from "lucide-react";
import type { ComponentType, ReactNode } from "react";
import type { Theme } from "../../lib/theme.ts";
import { Logo } from "../Logo/Logo.tsx";
import { MobileMenu } from "../MobileMenu/MobileMenu.tsx";
import { ThemeToggle } from "../ThemeToggle/ThemeToggle.tsx";

export type SiteNavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
  /** A plain `<a>`, never the app's link component; `http(s)` links open in a new tab. */
  external?: boolean;
  /** Marks the link with `aria-current="page"`. */
  current?: boolean;
  /** Left out of the desktop row below `lg`, where it would crowd the bar (still in the menu). */
  wideOnly?: boolean;
};

/** What the header passes to `linkComponent` for the logo and the internal nav links. */
export type SiteLinkProps = {
  href: string;
  className?: string;
  children?: ReactNode;
  "aria-current"?: "page";
  "aria-label"?: string;
};

export type SiteHeaderLabels = {
  signIn: string;
  signOut: string;
  /** The account link's title, and its name when only the icon shows. */
  account: string;
  /** The phone menu button's name. */
  menu: string;
  /** The theme row in the phone menu. */
  theme: string;
  /** The desktop `<nav>`'s name. */
  nav: string;
};

const DEFAULT_LABELS: SiteHeaderLabels = {
  signIn: "Sign in",
  signOut: "Sign out",
  account: "Your account",
  menu: "Menu",
  theme: "Theme",
  nav: "Main",
};

function PlainLink(props: SiteLinkProps) {
  return <a {...props} />;
}

/**
 * The top bar on every page. From `md` up: the links, theme toggle and sign-in in a row. On
 * phones: the logo and a menu button (`MobileMenu`) holding the same links and controls, so
 * nothing scrolls sideways.
 *
 * Internal links render with `linkComponent` (pass `next/link`'s `Link`, or `PathLink` from
 * `@thebensage-dev/ui/next` to mark the current page from the URL); a plain `<a>` otherwise.
 * Signed in, it shows the name (linking to `accountHref`) and a sign-out button posting to
 * `signOutAction`; signed out, a Sign in link when `signInHref` is set.
 */
export function SiteHeader({
  brand,
  nav,
  theme,
  cookieDomain,
  user,
  accountHref,
  signInHref,
  signOutAction = "/auth/logout",
  labels: labelOverrides,
  sticky = false,
  linkComponent: Link = PlainLink,
  className,
}: {
  /** The logo's name and where it links (usually "/"). */
  brand: { name: string; href: string };
  nav: SiteNavItem[];
  /** The theme read from the cookie on the server, for `ThemeToggle`. */
  theme: Theme;
  /** Shares the theme choice with subdomains (see `preferenceCookieDomain()`). */
  cookieDomain?: string;
  user: { name: string } | null;
  /** The identity provider's account page; no link when missing. */
  accountHref?: string | null;
  /** No sign-in link when missing (sign-in not configured). */
  signInHref?: string;
  /** Where the sign-out form posts. */
  signOutAction?: string;
  labels?: Partial<SiteHeaderLabels>;
  /** Stays at the top on scroll, on a blurred surface with a bottom border. */
  sticky?: boolean;
  linkComponent?: ComponentType<SiteLinkProps>;
  className?: string;
}) {
  const labels = { ...DEFAULT_LABELS, ...labelOverrides };

  const link = (item: SiteNavItem, linkClass: string, withIcon: boolean) => {
    const content = (
      <>
        {withIcon && <item.icon aria-hidden />}
        {item.label}
      </>
    );
    const current = item.current ? ("page" as const) : undefined;
    if (item.external) {
      const newTab = /^https?:/.test(item.href)
        ? ({ target: "_blank", rel: "noopener noreferrer" } as const)
        : {};
      return (
        <a
          key={item.label}
          href={item.href}
          className={linkClass}
          aria-current={current}
          {...newTab}
        >
          {content}
        </a>
      );
    }
    return (
      <Link key={item.label} href={item.href} className={linkClass} aria-current={current}>
        {content}
      </Link>
    );
  };

  const toggle = <ThemeToggle initialTheme={theme} cookieDomain={cookieDomain} />;

  return (
    <header
      className={clsx(
        sticky && "sticky top-0 z-10 border-b border-border bg-surface/80 backdrop-blur",
        className,
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-5xl items-center justify-between px-4 sm:px-6">
        <Link href={brand.href} className="rounded-md" aria-label={`${brand.name}, home`}>
          <Logo name={brand.name} />
        </Link>

        {/* Phones */}
        <MobileMenu label={labels.menu} className="md:hidden">
          {nav.map((item) => link(item, "mobile-menu-link", true))}
          <hr className="mobile-menu-divider" />
          <div className="mobile-menu-row">
            {labels.theme}
            {toggle}
          </div>
          {user ? (
            <>
              {accountHref && (
                <a href={accountHref} className="mobile-menu-link" title={labels.account}>
                  <UserCog aria-hidden />
                  <span className="truncate">{user.name}</span>
                </a>
              )}
              <form action={signOutAction} method="post">
                <button type="submit" className="mobile-menu-link w-full">
                  <LogOut aria-hidden />
                  {labels.signOut}
                </button>
              </form>
            </>
          ) : (
            signInHref && (
              <a href={signInHref} className="mobile-menu-link">
                <LogIn aria-hidden />
                {labels.signIn}
              </a>
            )
          )}
        </MobileMenu>

        {/* md and up */}
        <nav
          aria-label={labels.nav}
          className="hidden items-center gap-5 text-sm font-medium text-foreground-muted md:flex"
        >
          {nav.map((item) =>
            link(
              item,
              item.wideOnly
                ? "hidden hover:text-foreground aria-[current=page]:text-foreground lg:inline"
                : "hover:text-foreground aria-[current=page]:text-foreground",
              false,
            ),
          )}
          {toggle}
          {user ? (
            <form action={signOutAction} method="post" className="flex items-center gap-2">
              {accountHref ? (
                <a
                  href={accountHref}
                  className="flex items-center gap-1.5 hover:text-foreground"
                  title={labels.account}
                >
                  <UserCog className="size-4" aria-hidden />
                  <span className="hidden max-w-32 truncate lg:inline">{user.name}</span>
                  <span className="sr-only lg:hidden">{labels.account}</span>
                </a>
              ) : (
                <span className="hidden max-w-32 truncate lg:inline">{user.name}</span>
              )}
              <button
                type="submit"
                className="icon-btn"
                title={labels.signOut}
                aria-label={labels.signOut}
              >
                <LogOut className="size-4" />
              </button>
            </form>
          ) : (
            signInHref && (
              <a href={signInHref} className="flex items-center gap-1.5 hover:text-foreground">
                <LogIn className="size-4" aria-hidden />
                {labels.signIn}
              </a>
            )
          )}
        </nav>
      </div>
    </header>
  );
}
