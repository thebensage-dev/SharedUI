/** Lower-cases and strips accents, so "Zoë" matches "zoe". */
export const normalise = (s: string) => s.normalize("NFD").replace(/\p{M}/gu, "").toLowerCase();

export const searchTerms = (q: string) => normalise(q).split(/\s+/).filter(Boolean);

/** "1 user", "3 users". */
export const pluralise = (count: number, one: string, many: string) =>
  `${count} ${count === 1 ? one : many}`;
