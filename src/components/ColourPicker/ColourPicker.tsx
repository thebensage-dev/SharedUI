"use client";

import clsx from "clsx";
import { Check } from "lucide-react";
import { useId, useSyncExternalStore } from "react";
import { choices, presets } from "../../lib/palette.ts";
import {
  applyColours,
  COLOUR_ROLES,
  COLOURS_COOKIE,
  currentColours,
  presetColours,
  presetOf,
  readColours,
  subscribePreferences,
  writeColours,
  type ColourRole,
  type Colours,
  type Preset,
} from "../../lib/theme.ts";

const ROLE_LABELS: Record<ColourRole, string> = {
  primary: "Primary",
  secondary: "Secondary",
  accent: "Accent",
};

/**
 * Picks the brand's three colours (`choices` in palette.json) one role at a time, or all three
 * from a preset. Read the cookie on the server with `readColours()` and spread
 * `colourAttrs(colours)` on `<html>`, so the first paint already has them. Pass `cookieDomain`
 * to share the choice with subdomains.
 */
export function ColourPicker({
  initialColours,
  presetsLabel = "Presets",
  roleLabels = ROLE_LABELS,
  hints,
  cookieName = COLOURS_COOKIE,
  cookieDomain,
  onChange,
  className,
}: {
  initialColours: Colours;
  presetsLabel?: string;
  roleLabels?: Record<ColourRole, string>;
  /** A short note under each role's name, e.g. where it is used. */
  hints?: Partial<Record<ColourRole, string>>;
  cookieName?: string;
  cookieDomain?: string;
  onChange?: (colours: Colours) => void;
  className?: string;
}) {
  const id = useId();
  const colours = readColours(
    useSyncExternalStore(subscribePreferences, currentColours, () => writeColours(initialColours)),
  );
  const activePreset = presetOf(colours);

  const choose = (next: Colours) => {
    applyColours(next, cookieName, cookieDomain);
    onChange?.(next);
  };

  return (
    <div className={clsx("colour-picker", className)}>
      <fieldset>
        <legend className="label">{presetsLabel}</legend>
        <div className="presets">
          {(Object.keys(presets) as Preset[]).map((preset) => (
            <label key={preset} className="preset">
              <input
                type="radio"
                name={`${id}-preset`}
                value={preset}
                checked={activePreset === preset}
                onChange={() => choose(presetColours(preset))}
              />
              <span aria-hidden className="preset-dots">
                {COLOUR_ROLES.map((role) => (
                  <span
                    key={role}
                    className={`preset-dot swatch-${role}`}
                    {...{ [`data-${role}`]: presets[preset][role] }}
                  />
                ))}
              </span>
              {presets[preset].label}
            </label>
          ))}
        </div>
      </fieldset>

      {COLOUR_ROLES.map((role) => {
        const options = Object.entries(choices[role]) as [string, string][];
        const current = options.find(([option]) => option === colours[role])?.[1];
        return (
          <fieldset key={role}>
            <legend className="label">
              {roleLabels[role]}
              <span className="font-normal text-foreground-muted"> · {current}</span>
            </legend>
            {hints?.[role] && <p className="colour-hint">{hints[role]}</p>}
            <div className="swatches">
              {options.map(([option, label]) => (
                <label
                  key={option}
                  className={`swatch swatch-${role}`}
                  title={label}
                  {...{ [`data-${role}`]: option }}
                >
                  <input
                    type="radio"
                    name={`${id}-${role}`}
                    value={option}
                    checked={colours[role] === option}
                    onChange={() => choose({ ...colours, [role]: option })}
                    aria-label={label}
                  />
                  <Check aria-hidden />
                </label>
              ))}
            </div>
          </fieldset>
        );
      })}
    </div>
  );
}
