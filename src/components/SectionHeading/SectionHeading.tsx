import clsx from "clsx";
import type { ReactNode } from "react";

/** A section's eyebrow, h2 and intro, styled the same on every page. `id` goes on the h2, for the
 *  section's `aria-labelledby`. */
export function SectionHeading({
  id,
  title,
  intro,
  eyebrow,
  eyebrowTone,
  className,
}: {
  /** Put on the h2, so the section can point `aria-labelledby` at it. */
  id: string;
  title: ReactNode;
  intro?: ReactNode;
  /** A short label above the title. */
  eyebrow?: ReactNode;
  /** The eyebrow's brand tone class, e.g. "tone-accent". */
  eyebrowTone?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      {eyebrow && <p className={clsx("eyebrow mb-eyebrow", eyebrowTone)}>{eyebrow}</p>}
      <h2 id={id} className="title-section">
        {title}
      </h2>
      {intro && (
        <p className="mt-intro max-w-2xl leading-relaxed text-pretty text-foreground-muted">
          {intro}
        </p>
      )}
    </div>
  );
}
