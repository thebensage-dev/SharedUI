"use client";

import clsx from "clsx";
import { Search, X } from "lucide-react";

export function SearchBox({
  value,
  onChange,
  placeholder,
  ref,
  className,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  ref?: React.Ref<HTMLInputElement>;
  className?: string;
}) {
  return (
    <div className={clsx("relative", className)}>
      <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-foreground-muted" />
      <input
        ref={ref}
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key !== "Escape") return;
          e.preventDefault();
          if (value) onChange("");
          else e.currentTarget.blur();
        }}
        placeholder={placeholder}
        aria-label="Search"
        className="input pr-10 pl-9 [&::-webkit-search-cancel-button]:hidden"
      />
      {value ? (
        <button
          type="button"
          onClick={() => onChange("")}
          aria-label="Clear search"
          className="icon-btn absolute top-1/2 right-1 -translate-y-1/2"
        >
          <X className="size-4" />
        </button>
      ) : (
        <kbd className="pointer-events-none absolute top-1/2 right-3 hidden -translate-y-1/2 sm:inline">
          /
        </kbd>
      )}
    </div>
  );
}
