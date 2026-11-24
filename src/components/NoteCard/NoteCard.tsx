import clsx from "clsx";
import type { ReactNode } from "react";

/** A small card with a coloured top edge: a title, a paragraph and optional buttons. */
export function NoteCard({
  title,
  body,
  tone = "tone-accent",
  className,
  children,
}: {
  title: ReactNode;
  body: ReactNode;
  /** A brand tone class, e.g. "tone-accent". */
  tone?: string;
  className?: string;
  /** Buttons or links, in a row under the text. */
  children?: ReactNode;
}) {
  return (
    <div className={clsx("card tone-card p-5", tone, className)}>
      <p className="font-semibold tracking-tight">{title}</p>
      <p className="mt-1 text-sm leading-relaxed text-foreground-muted">{body}</p>
      {children && <div className="mt-4 flex flex-wrap gap-3">{children}</div>}
    </div>
  );
}
