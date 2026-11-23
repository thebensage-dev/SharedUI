import clsx from "clsx";
import { LOGO } from "../../lib/logo.ts";

/** The brand mark. logoSvg() is the same drawing as a file, for favicons. */
export function LogoMark({ className }: { className?: string }) {
  const { tile, lines, lineHeight } = LOGO;
  return (
    <svg viewBox={LOGO.viewBox} className={clsx("size-7 shrink-0", className)} aria-hidden>
      <rect width={tile.width} height={tile.height} rx={tile.rx} fill={tile.fill} />
      {lines.map((l) => (
        <rect
          key={l.y}
          x={l.x}
          y={l.y}
          width={l.width}
          height={lineHeight}
          rx={lineHeight / 2}
          fill={l.fill}
        />
      ))}
    </svg>
  );
}

/** Mark plus name. Wrap it in a link to the home page where it's used as one. */
export function Logo({ name, className }: { name: React.ReactNode; className?: string }) {
  return (
    <span
      className={clsx("inline-flex items-center gap-2.5 font-semibold tracking-tight", className)}
    >
      <LogoMark />
      {name}
    </span>
  );
}
