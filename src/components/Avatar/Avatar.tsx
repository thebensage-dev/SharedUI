import clsx from "clsx";
const SIZES = {
  sm: "size-8 text-xs",
  md: "size-11 text-sm",
  lg: "size-20 text-2xl",
};

function initials(name: string) {
  const parts = name.trim().split(/\s+/);
  const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
  return ((parts[0]?.[0] ?? "?") + last).toUpperCase();
}

function hueFor(name: string) {
  let hash = 0;
  for (const ch of name) hash = (hash * 31 + ch.charCodeAt(0)) >>> 0;
  return hash % 360;
}

/** Initials on a colour picked from the name, so the same name always gets the same colour. */
export function Avatar({
  name,
  size = "md",
  className,
}: {
  name: string;
  size?: keyof typeof SIZES;
  className?: string;
}) {
  return (
    <span
      aria-hidden
      className={clsx("avatar", SIZES[size], className)}
      style={{ "--hue": hueFor(name) } as React.CSSProperties}
    >
      {initials(name)}
    </span>
  );
}
