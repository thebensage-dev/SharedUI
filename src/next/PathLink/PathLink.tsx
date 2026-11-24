"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/**
 * `next/link` that marks itself `aria-current="page"` on its route and below, unless the caller
 * already set `aria-current`. Links with a `#` never mark themselves. Made for `SiteHeader`'s
 * `linkComponent`, when the server doesn't know the current path (e.g. in a root layout).
 */
export function PathLink({
  href,
  exact = false,
  "aria-current": ariaCurrent,
  ...rest
}: {
  href: string;
  /** Only current on exactly this path, not on child routes. */
  exact?: boolean;
  className?: string;
  children?: ReactNode;
  "aria-current"?: "page";
  "aria-label"?: string;
}) {
  const pathname = usePathname();
  const onPath =
    href.startsWith("/") &&
    !href.includes("#") &&
    (pathname === href || (!exact && href !== "/" && pathname.startsWith(`${href}/`)));

  return <Link href={href} aria-current={ariaCurrent ?? (onPath ? "page" : undefined)} {...rest} />;
}
