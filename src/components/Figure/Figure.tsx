import clsx from "clsx";

/** An image with an optional caption. `small` centres it at about half the column. */
export function Figure({
  src,
  alt,
  width,
  height,
  caption,
  small = false,
  className,
}: {
  src: string;
  /** What the image shows, for screen readers. */
  alt: string;
  /** The file's own size, so the page keeps its place while the image loads. */
  width?: number | null;
  height?: number | null;
  caption?: string | null;
  small?: boolean;
  className?: string;
}) {
  return (
    <figure className={clsx(small && "mx-auto max-w-sm", className)}>
      <img
        src={src}
        alt={alt}
        width={width ?? undefined}
        height={height ?? undefined}
        loading="lazy"
        className="h-auto w-full rounded-2xl border border-border"
      />
      {caption && (
        <figcaption className="mt-2 text-center text-sm text-foreground-muted">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
