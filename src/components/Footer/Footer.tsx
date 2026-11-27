import { ArrowUpRight, type LucideIcon } from "lucide-react";
import clsx from "clsx";
import { Logo } from "../Logo/Logo.tsx";

export type FooterLink = {
  label: string;
  href: string;
  /** Opens in a new tab (target="_blank", rel="noopener noreferrer") with an arrow icon. */
  external?: boolean;
  icon?: LucideIcon;
};
export type FooterGroup = { title: string; links: FooterLink[] };

export type FooterLabels = {
  /** The link columns' `<nav>` name. */
  nav: string;
  /** Read out after a link that opens in a new tab. */
  newTab: string;
  /** After "© <year> <owner>.". */
  rights: string;
};

const DEFAULT_LABELS: FooterLabels = {
  nav: "Footer",
  newTab: "(opens in a new tab)",
  rights: "All rights reserved.",
};

function FooterAnchor({ link, newTab }: { link: FooterLink; newTab: string }) {
  const Icon = link.icon;
  return (
    <a
      href={link.href}
      className="inline-flex items-center gap-1.5 text-foreground-muted transition hover:text-foreground"
      {...(link.external && { target: "_blank", rel: "noopener noreferrer" })}
    >
      {Icon && <Icon className="size-4" aria-hidden />}
      {link.label}
      {link.external && (
        <>
          <ArrowUpRight className="size-3.5 opacity-60" aria-hidden />
          <span className="sr-only">{newTab}</span>
        </>
      )}
    </a>
  );
}

/** Brand and tagline, columns of links, then the copyright and legal links. */
export function Footer({
  brand,
  tagline,
  groups = [],
  legal = [],
  owner = brand.name,
  className,
  labels: labelOverrides,
}: {
  brand: { name: string; href: string };
  tagline?: React.ReactNode;
  groups?: FooterGroup[];
  legal?: FooterLink[];
  /** Copyright holder; defaults to the brand name. */
  owner?: string;
  className?: string;
  labels?: Partial<FooterLabels>;
}) {
  const labels = { ...DEFAULT_LABELS, ...labelOverrides };
  return (
    <footer className={clsx("border-t border-border bg-surface/60", className)}>
      <div className="mx-auto w-full max-w-5xl px-4 py-12 sm:px-6">
        {/* Brand above the links until there is room for both side by side; the link columns
            fill the row and wrap (two on phones), however many there are. */}
        <div className="grid gap-10 lg:grid-cols-[minmax(0,16rem)_minmax(0,1fr)] lg:gap-16">
          <div className="max-w-sm">
            <a href={brand.href} className="rounded-md">
              <Logo name={brand.name} />
            </a>
            {tagline && (
              <p className="mt-3 text-sm leading-relaxed text-foreground-muted">{tagline}</p>
            )}
          </div>

          {groups.length > 0 && (
            <nav
              aria-label={labels.nav}
              className="grid grid-cols-[repeat(auto-fit,minmax(8rem,1fr))] gap-x-8 gap-y-8"
            >
              {groups.map((group) => (
                <div key={group.title}>
                  <h2 className="eyebrow">{group.title}</h2>
                  <ul className="mt-3 space-y-2.5 text-sm">
                    {group.links.map((link) => (
                      <li key={link.href}>
                        <FooterAnchor link={link} newTab={labels.newTab} />
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>
          )}
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-border pt-6 text-xs text-foreground-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {owner}. {labels.rights}
          </p>
          {legal.length > 0 && (
            <ul className="flex flex-wrap gap-x-5 gap-y-2">
              {legal.map((link) => (
                <li key={link.href}>
                  <FooterAnchor link={link} newTab={labels.newTab} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </footer>
  );
}
