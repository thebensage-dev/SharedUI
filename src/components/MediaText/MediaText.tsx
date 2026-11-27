import clsx from "clsx";
import type { ReactNode } from "react";

/** An image beside text, the image on either side; stacked (image first) on phones. */
export function MediaText({
  media,
  mediaSide = "left",
  children,
  className,
}: {
  /** The image, usually a `Figure`. */
  media: ReactNode;
  mediaSide?: "left" | "right";
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={clsx("grid items-center gap-stack md:grid-cols-2", className)}>
      <div className={clsx(mediaSide === "right" && "md:order-last")}>{media}</div>
      <div>{children}</div>
    </div>
  );
}
