"use client";

import clsx from "clsx";
import { Menu, X } from "lucide-react";
import { useEffect, useId, useRef, useState, type ReactNode } from "react";

/**
 * A menu button for small screens: the header shows just this button, and its panel holds the
 * links and controls that don't fit (navigation, theme, sign-in). Hidden from `sm` up by default
 * (`className` to change that), where the full header shows instead.
 *
 * Closes on Escape (focus goes back to the button), on a click outside, and when a link inside is
 * followed. Put links in `mobile-menu-link` rows and anything else (a `ThemeToggle`, a form) in
 * `mobile-menu-row`, so every menu looks the same.
 */
export function MobileMenu({
  children,
  label = "Menu",
  className,
}: {
  children: ReactNode;
  /** The button's accessible name. */
  label?: string;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const root = useRef<HTMLDivElement>(null);
  const button = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      button.current?.focus();
    };
    const onPointer = (event: PointerEvent) => {
      if (!root.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open]);

  return (
    <div ref={root} className={clsx("relative", className ?? "sm:hidden")}>
      <button
        ref={button}
        type="button"
        className="icon-btn size-9"
        aria-label={label}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
      >
        {open ? <X className="size-5" aria-hidden /> : <Menu className="size-5" aria-hidden />}
      </button>
      <div
        id={panelId}
        hidden={!open}
        className="menu-panel mobile-menu-panel"
        // Following a link (same page or not) closes the menu.
        onClick={(event) => {
          if ((event.target as HTMLElement).closest("a")) setOpen(false);
        }}
      >
        {children}
      </div>
    </div>
  );
}
