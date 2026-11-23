/** The brand's three colours in the logo's order (red, yellow, blue). See styles/components/tones.css. */
export const TONES = ["secondary", "accent", "primary"] as const;

export type Tone = (typeof TONES)[number];

/** The class that sets a tone: icon-tile, tone-card, tag-tone, tone-dot and eyebrow follow it. */
export function toneClass(tone: Tone): `tone-${Tone}` {
  return `tone-${tone}`;
}

/** The tone for the i-th item of a list, cycling red, yellow, blue, so siblings differ. */
export function toneAt(index: number): Tone {
  const n = TONES.length;
  return TONES[((index % n) + n) % n];
}
