import { ChevronRight } from "lucide-react";
import type { ComponentType, ReactNode } from "react";
import type { SiteLinkProps } from "../SiteHeader/SiteHeader.tsx";
import { JsonLd } from "../JsonLd/JsonLd.tsx";

/** One step of the breadcrumb trail: its label and its path on this site. */
export type Crumb = { label: string; path: string };

function PlainLink(props: SiteLinkProps) {
  return <a {...props} />;
}

/**
 * The top of an inner page: breadcrumbs (also as schema.org BreadcrumbList when `siteUrl` is
 * given, for search results), the brand rule, eyebrow, the page's one h1 and its intro, with
 * buttons below. `crumbs` starts at the homepage and ends with the page itself; leave it empty
 * for no breadcrumbs.
 */
export function PageIntro({
  crumbs = [],
  breadcrumbsLabel = "Breadcrumb",
  eyebrow,
  title,
  intro,
  siteUrl,
  linkComponent: Link = PlainLink,
  children,
}: {
  crumbs?: Crumb[];
  /** The breadcrumb `<nav>`'s name for screen readers. */
  breadcrumbsLabel?: string;
  eyebrow?: string | null;
  title: string;
  intro?: string | null;
  /** The site's address (no trailing slash): adds the trail as structured data. */
  siteUrl?: string;
  /** Renders the breadcrumb links (pass `next/link`'s `Link`). */
  linkComponent?: ComponentType<SiteLinkProps>;
  /** Buttons under the intro. */
  children?: ReactNode;
}) {
  return (
    <div className="max-w-3xl">
      {siteUrl && crumbs.length > 0 && (
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: crumbs.map((crumb, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: crumb.label,
              item: siteUrl + crumb.path,
            })),
          }}
        />
      )}
      {crumbs.length > 0 && (
        <nav aria-label={breadcrumbsLabel} className="mb-8">
          <ol className="flex flex-wrap items-center gap-1 text-sm text-foreground-muted">
            {crumbs.map((crumb, i) => (
              <li key={crumb.path} className="flex items-center gap-1">
                {i > 0 && <ChevronRight className="size-3.5" aria-hidden />}
                {i === crumbs.length - 1 ? (
                  <span aria-current="page" className="text-foreground">
                    {crumb.label}
                  </span>
                ) : (
                  <Link href={crumb.path} className="hover:text-foreground">
                    {crumb.label}
                  </Link>
                )}
              </li>
            ))}
          </ol>
        </nav>
      )}
      <span aria-hidden className="brand-rule reveal" />
      {eyebrow && <p className="eyebrow tone-secondary reveal mt-4">{eyebrow}</p>}
      <h1 className="title-page reveal mt-eyebrow">{title}</h1>
      {intro && (
        <p className="reveal mt-6 text-lg leading-relaxed text-pretty text-foreground-muted">
          {intro}
        </p>
      )}
      {children && <div className="reveal mt-content flex flex-wrap gap-3">{children}</div>}
    </div>
  );
}
