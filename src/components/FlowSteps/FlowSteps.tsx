import clsx from "clsx";
import { ArrowRight, type LucideIcon } from "lucide-react";
import { toneAt, toneClass } from "../../lib/tone.ts";

export type FlowStep = { icon: LucideIcon; title: string; detail: string };

/** A short left-to-right flow (top to bottom on phones): one small card per step, with arrows. */
export function FlowSteps({
  steps,
  label,
  className,
}: {
  steps: FlowStep[];
  /** Names the list for screen readers, e.g. "From a push to your browser". */
  label: string;
  className?: string;
}) {
  const columns = { 3: "md:grid-cols-3", 4: "md:grid-cols-4" }[steps.length] ?? "md:grid-cols-4";
  return (
    <ol aria-label={label} className={clsx("grid gap-3", columns, className)}>
      {steps.map(({ icon: Icon, title, detail }, i) => (
        <li
          key={title}
          className={clsx(
            "reveal-on-scroll flex flex-col items-center gap-3 md:flex-row",
            toneClass(toneAt(i)),
          )}
        >
          <div className="card flex w-full flex-1 items-center gap-3 p-4">
            <span className="icon-tile">
              <Icon aria-hidden />
            </span>
            <span className="min-w-0">
              <span className="block text-sm font-semibold">{title}</span>
              <span className="block text-xs text-foreground-muted">{detail}</span>
            </span>
          </div>
          {/* The last step keeps an invisible arrow so all the cards are the same width. */}
          <ArrowRight
            className={clsx(
              "size-4 shrink-0 rotate-90 text-foreground-muted md:rotate-0",
              i === steps.length - 1 && "max-md:hidden md:invisible",
            )}
            aria-hidden
          />
        </li>
      ))}
    </ol>
  );
}
