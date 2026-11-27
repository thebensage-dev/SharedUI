"use client";

import { usePathname } from "next/navigation";

/**
 * The bar along the top while a site shows unpublished CMS drafts (Next's draft mode). The link
 * goes to `exitHref` with this page's path, so leaving preview lands on the same page.
 */
export function PreviewBanner({
  label,
  exit,
  exitHref = "/preview/exit",
}: {
  /** Such as "Preview: showing unpublished changes." */
  label: string;
  /** The exit link's text. */
  exit: string;
  /** The route that turns draft mode off; it gets `?path=<this page>`. */
  exitHref?: string;
}) {
  const path = usePathname();
  return (
    <div
      role="status"
      className="sticky top-0 z-50 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 bg-primary px-4 py-2 text-center text-sm text-on-primary"
    >
      <span>{label}</span>
      <a href={`${exitHref}?path=${encodeURIComponent(path)}`} className="font-semibold underline">
        {exit}
      </a>
    </div>
  );
}
