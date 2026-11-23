import clsx from "clsx";
import type { LucideIcon } from "lucide-react";
import { toneClass, type Tone } from "../../lib/tone.ts";

export function EmptyState({
  icon: Icon,
  title,
  children,
  action,
  tone = "primary",
}: {
  icon: LucideIcon;
  title: React.ReactNode;
  children?: React.ReactNode;
  action?: React.ReactNode;
  /** Colour of the icon, from the brand's three. */
  tone?: Tone;
}) {
  return (
    <div
      className={clsx(
        "card flex flex-col items-center border-dashed px-6 py-14 text-center shadow-none",
        toneClass(tone),
      )}
    >
      <span className="icon-tile size-12 rounded-full">
        <Icon className="size-6" />
      </span>
      <h2 className="mt-4 font-semibold">{title}</h2>
      {children && <p className="mt-1 max-w-sm text-sm text-foreground-muted">{children}</p>}
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
