import clsx from "clsx";

export function Reveal({
  as: Tag = "div",
  delay = 0,
  onScroll = false,
  className,
  children,
}: {
  as?: "div" | "li";
  delay?: number;
  /** Animate as the element scrolls into view instead of on page load. */
  onScroll?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Tag
      className={clsx("reveal", onScroll && "reveal-on-scroll", className)}
      style={{ "--delay": `${delay}ms` } as React.CSSProperties}
    >
      {children}
    </Tag>
  );
}
