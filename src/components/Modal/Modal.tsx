"use client";

import clsx from "clsx";
import { useEffect, useRef } from "react";

const WIDTHS = { sm: "max-w-sm", md: "max-w-md", lg: "max-w-2xl" };

export function Modal({
  open,
  onClose,
  labelledBy,
  size = "md",
  children,
}: {
  open: boolean;
  onClose: () => void;
  labelledBy: string;
  size?: keyof typeof WIDTHS;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      aria-labelledby={labelledBy}
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      onClick={(e) => {
        // Clicking the backdrop targets the dialog element itself.
        if (e.target === ref.current) onClose();
      }}
      className={clsx(
        "card m-auto max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] overflow-y-auto p-0 text-foreground shadow-2xl",
        WIDTHS[size],
      )}
    >
      {children}
    </dialog>
  );
}
