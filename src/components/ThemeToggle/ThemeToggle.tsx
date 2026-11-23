"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import { useSyncExternalStore } from "react";
import {
  applyTheme,
  currentTheme,
  subscribePreferences,
  THEME_COOKIE,
  type Theme,
} from "../../lib/theme.ts";
import { SegmentedControl, type SegmentOption } from "../SegmentedControl/SegmentedControl.tsx";

const OPTIONS: SegmentOption<Theme>[] = [
  { value: "light", label: "Light theme", icon: Sun },
  { value: "system", label: "Match system theme", icon: Monitor },
  { value: "dark", label: "Dark theme", icon: Moon },
];

/**
 * Light / system / dark switch. Read the cookie on the server with `readTheme()` and put
 * `themeClass(theme)` on `<html>`, so the first paint already has the right theme. Pass
 * `cookieDomain` (see `preferenceCookieDomain()`) to share the choice with subdomains.
 */
export function ThemeToggle({
  initialTheme,
  cookieName = THEME_COOKIE,
  cookieDomain,
  onChange,
  className,
}: {
  initialTheme: Theme;
  cookieName?: string;
  cookieDomain?: string;
  onChange?: (theme: Theme) => void;
  className?: string;
}) {
  const theme = useSyncExternalStore(subscribePreferences, currentTheme, () => initialTheme);

  const choose = (next: Theme) => {
    applyTheme(next, cookieName, cookieDomain);
    onChange?.(next);
  };

  return (
    <SegmentedControl
      label="Theme"
      options={OPTIONS}
      value={theme}
      onChange={choose}
      className={className ?? "h-9"}
    />
  );
}
