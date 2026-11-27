import clsx from "clsx";
import type { ComponentType, ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import type { SiteLinkProps } from "../SiteHeader/SiteHeader.tsx";

/** One button-styled link, with its address already worked out. */
export type ActionLink = {
  key: string | number;
  label: ReactNode;
  href: string;
  style?: "primary" | "secondary" | "accent" | "ghost" | null;
  size?: "default" | "sm" | "lg" | null;
  icon?: LucideIcon;
  iconPosition?: "start" | "end" | null;
  /** Another site: opens in a new tab. */
  external?: boolean;
  /** A page on this site: rendered with `linkComponent` (client-side navigation). */
  internal?: boolean;
  /** A file name: the browser downloads it. */
  download?: string;
};

function PlainLink(props: SiteLinkProps) {
  return <a {...props} />;
}

/**
 * Button-styled links in a row's worth of siblings (wrap them in your own flex row). With
 * `nudge`, a primary button's trailing icon moves on hover.
 */
export function ActionLinks({
  actions,
  linkComponent: Link = PlainLink,
  nudge = false,
}: {
  actions: ActionLink[];
  /** Renders links to this site (pass `next/link`'s `Link`). */
  linkComponent?: ComponentType<SiteLinkProps>;
  nudge?: boolean;
}) {
  return actions.map((action) => {
    const style = action.style ?? "primary";
    const trailing = action.iconPosition !== "start";
    const moves = nudge && style === "primary" && trailing && Boolean(action.icon);
    const Icon = action.icon;
    const glyph = Icon && (
      <Icon
        className={clsx("size-4", moves && "transition group-hover:translate-x-0.5")}
        aria-hidden
      />
    );
    const className = clsx(
      "btn",
      `btn-${style}`,
      action.size === "sm" && "btn-sm",
      action.size === "lg" && "btn-lg",
      moves && "group",
    );
    const body = (
      <>
        {!trailing && glyph}
        {action.label}
        {trailing && glyph}
      </>
    );
    if (action.internal && !action.download) {
      return (
        <Link key={action.key} href={action.href} className={className}>
          {body}
        </Link>
      );
    }
    return (
      <a
        key={action.key}
        href={action.href}
        className={className}
        download={action.download}
        {...(action.external && { target: "_blank", rel: "noopener noreferrer" })}
      >
        {body}
      </a>
    );
  });
}
