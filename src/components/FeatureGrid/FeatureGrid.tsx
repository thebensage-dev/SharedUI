import clsx from "clsx";
import type { LucideIcon } from "lucide-react";
import { toneAt, toneClass } from "../../lib/tone.ts";

export type Feature = {
  icon: LucideIcon;
  title: string;
  description: string;
  /** Small tags along the bottom of the card, e.g. the tools a feature uses. */
  tags?: string[];
};

/** Cards with an icon, a title and a paragraph, each in the next brand tone. */
export function FeatureGrid({
  features,
  columns = 3,
  tagsLabel = "Tools",
  className,
}: {
  features: Feature[];
  /** Columns from `lg` up (two from `sm`). */
  columns?: 2 | 3 | 4;
  /** Names each card's tag list for screen readers. */
  tagsLabel?: string;
  className?: string;
}) {
  return (
    <ul
      className={clsx(
        "grid gap-5 sm:grid-cols-2",
        columns === 3 && "lg:grid-cols-3",
        columns === 4 && "lg:grid-cols-4",
        className,
      )}
    >
      {features.map(({ icon: Icon, title, description, tags }, i) => (
        <li
          key={title}
          className={clsx("card reveal-on-scroll flex flex-col gap-3 p-6", toneClass(toneAt(i)))}
        >
          <span className="icon-tile">
            <Icon aria-hidden />
          </span>
          <h3 className="font-semibold tracking-tight">{title}</h3>
          <p className="text-sm leading-relaxed text-foreground-muted">{description}</p>
          {tags && (
            <ul className="mt-auto flex flex-wrap gap-2 pt-1" aria-label={tagsLabel}>
              {tags.map((tag) => (
                <li key={tag} className="tag text-foreground-muted">
                  {tag}
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ul>
  );
}
