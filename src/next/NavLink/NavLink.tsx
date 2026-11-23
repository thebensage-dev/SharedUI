"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

/** Header link that marks itself as the current page (aria-current) on its route and below. */
export function NavLink({
  href,
  exact = false,
  children,
}: {
  href: string;
  /** Only active on exactly this path, not on child routes (useful for "/"). */
  exact?: boolean;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const active = pathname === href || (!exact && pathname.startsWith(`${href}/`));

  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={clsx(
        "rounded-lg px-3 py-1.5 text-sm font-medium transition",
        active ? "bg-surface-muted text-foreground" : "text-foreground-muted hover:text-foreground",
      )}
    >
      {children}
    </Link>
  );
}
