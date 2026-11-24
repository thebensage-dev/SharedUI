import clsx from "clsx";
import type { LucideIcon } from "lucide-react";
import { toneAt, toneClass } from "../../lib/tone.ts";

export type TimelineStep = {
  /** Shown in the step's tile; without one the tile shows the step's number. */
  icon?: LucideIcon;
  /** Who does this step, shown as a tag. */
  actor?: string;
  title: string;
  description: string;
};

const stepOf = (step: number, total: number) => `Step ${step} of ${total}`;

/** Numbered steps down a line, each in the next brand tone, optionally with who does it. */
export function StepTimeline({
  steps,
  label,
  countLabel = stepOf,
  className,
}: {
  steps: TimelineStep[];
  /** Names the list for screen readers. */
  label: string;
  /** The small label above each title ("Step 1 of 3" by default); `false` hides it. */
  countLabel?: ((step: number, total: number) => string) | false;
  className?: string;
}) {
  return (
    <ol aria-label={label} className={clsx("relative grid gap-4", className)}>
      {steps.map(({ icon: Icon, actor, title, description }, i) => {
        const count = countLabel ? countLabel(i + 1, steps.length) : null;
        return (
          <li
            key={title}
            className={clsx("reveal-on-scroll relative flex gap-4", toneClass(toneAt(i)))}
          >
            {/* The line joining this step to the next. */}
            {i < steps.length - 1 && (
              <span
                aria-hidden
                className="absolute top-12 bottom-[-1rem] left-5 w-px -translate-x-1/2 bg-border-strong"
              />
            )}
            <span
              className={clsx(
                "icon-tile relative z-10 size-10 shrink-0",
                !Icon && "rounded-full text-sm font-semibold",
              )}
            >
              {Icon ? <Icon aria-hidden /> : <span aria-hidden>{i + 1}</span>}
            </span>
            <div className="card flex-1 p-5">
              {(count || actor) && (
                <p className="mb-2 flex flex-wrap items-center gap-2">
                  {count && (
                    <span className="font-mono text-xs text-foreground-muted">{count}</span>
                  )}
                  {actor && <span className="tag tag-tone">{actor}</span>}
                </p>
              )}
              <h3 className="font-semibold tracking-tight">{title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-foreground-muted">{description}</p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
