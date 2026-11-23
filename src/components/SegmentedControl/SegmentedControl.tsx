"use client";

import clsx from "clsx";
import type { LucideIcon } from "lucide-react";

export type SegmentOption<T extends string> = { value: T; label: string; icon: LucideIcon };

export function SegmentedControl<T extends string>({
  label,
  options,
  value,
  onChange,
  className,
}: {
  label: string;
  options: readonly SegmentOption<T>[];
  value: T;
  onChange: (value: T) => void;
  className?: string;
}) {
  return (
    <div role="group" aria-label={label} className={clsx("segmented", className)}>
      {options.map(({ value: option, label: optionLabel, icon: Icon }) => (
        <button
          key={option}
          type="button"
          onClick={() => onChange(option)}
          aria-pressed={value === option}
          aria-label={optionLabel}
          title={optionLabel}
        >
          <Icon className="size-4" />
        </button>
      ))}
    </div>
  );
}
