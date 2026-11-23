import { normalise } from "../../lib/text.ts";

export function Highlight({ text, terms }: { text: string; terms: string[] }) {
  if (terms.length === 0) return text;

  // Normalise per character so positions in the normalised string map back to the original.
  const chars = [...text];
  let normalised = "";
  const owner: number[] = [];
  chars.forEach((ch, i) => {
    const n = normalise(ch);
    normalised += n;
    for (let k = 0; k < n.length; k++) owner.push(i);
  });

  const marked = chars.map(() => false);
  for (const term of terms) {
    for (let at = normalised.indexOf(term); at !== -1; at = normalised.indexOf(term, at + 1)) {
      for (let k = at; k < at + term.length; k++) marked[owner[k]] = true;
    }
  }

  const parts: { text: string; mark: boolean }[] = [];
  chars.forEach((ch, i) => {
    const last = parts.at(-1);
    if (last?.mark === marked[i]) last.text += ch;
    else parts.push({ text: ch, mark: marked[i] });
  });

  return parts.map((p, i) =>
    p.mark ? (
      <mark key={i} className="rounded-sm bg-accent-soft text-foreground">
        {p.text}
      </mark>
    ) : (
      p.text
    ),
  );
}
