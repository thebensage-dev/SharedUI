import clsx from "clsx";

const BLOBS = [
  { colour: "--secondary", className: "-top-24 -left-16 size-80", delay: "0s" },
  { colour: "--accent", className: "top-10 -right-20 size-72", delay: "-6s" },
  { colour: "--primary", className: "-bottom-32 left-1/3 size-96", delay: "-11s" },
];

/**
 * The brand's three colours drifting behind a hero (decoration, hidden from screen readers).
 * Put it first in a `relative isolate overflow-hidden` parent.
 */
export function BrandBlobs({ className }: { className?: string }) {
  return (
    <div aria-hidden className={clsx("pointer-events-none absolute inset-0 -z-10", className)}>
      {BLOBS.map((b) => (
        <div
          key={b.colour}
          className={clsx("blob", b.className)}
          style={{ "--blob": `var(${b.colour})`, animationDelay: b.delay } as React.CSSProperties}
        />
      ))}
    </div>
  );
}
