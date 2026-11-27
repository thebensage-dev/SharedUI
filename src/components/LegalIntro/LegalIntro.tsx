/**
 * The top of a legal page (privacy notice, terms): the brand rule, "Last updated" and the date
 * in one eyebrow, the page's one h1 and an optional intro paragraph.
 */
export function LegalIntro({
  updatedLabel,
  updated,
  title,
  intro,
}: {
  /** Such as "Last updated". */
  updatedLabel?: string | null;
  /** The date as it should read, such as "25 November 2026". */
  updated?: string | null;
  title: string;
  intro?: string | null;
}) {
  const eyebrow = [updatedLabel, updated].filter(Boolean).join(" ");
  return (
    <>
      <span aria-hidden className="brand-rule" />
      {eyebrow && <p className="eyebrow tone-primary mt-4">{eyebrow}</p>}
      <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">{title}</h1>
      {intro && <p className="mt-6 leading-relaxed text-foreground-muted">{intro}</p>}
    </>
  );
}
