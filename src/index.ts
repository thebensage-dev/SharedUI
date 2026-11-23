// No "use client" here: each client component carries its own, so Server Components can import this.

export { Avatar } from "./components/Avatar/Avatar.tsx";
export { BrandBlobs } from "./components/BrandBlobs/BrandBlobs.tsx";
export { ColourPicker } from "./components/ColourPicker/ColourPicker.tsx";
export { ConfirmDialog } from "./components/ConfirmDialog/ConfirmDialog.tsx";
export { COOKIE_NOTICE_COOKIE, CookieNotice } from "./components/CookieNotice/CookieNotice.tsx";
export { EmptyState } from "./components/EmptyState/EmptyState.tsx";
export { Footer, type FooterGroup, type FooterLink } from "./components/Footer/Footer.tsx";
export { Highlight } from "./components/Highlight/Highlight.tsx";
export { Logo, LogoMark } from "./components/Logo/Logo.tsx";
export { Modal } from "./components/Modal/Modal.tsx";
export { Pagination, pageList } from "./components/Pagination/Pagination.tsx";
export { Reveal } from "./components/Reveal/Reveal.tsx";
export { SearchBox } from "./components/SearchBox/SearchBox.tsx";
export {
  SegmentedControl,
  type SegmentOption,
} from "./components/SegmentedControl/SegmentedControl.tsx";
export { ThemeToggle } from "./components/ThemeToggle/ThemeToggle.tsx";

export { useShortcut } from "./hooks/useShortcut.ts";

export { LOGO, logoSvg } from "./lib/logo.ts";
export { choices, palette, presets, type PaletteGroup } from "./lib/palette.ts";
export { normalise, pluralise, searchTerms } from "./lib/text.ts";
export { TONES, toneAt, toneClass, type Tone } from "./lib/tone.ts";
export {
  applyColours,
  applyTheme,
  COLOUR_ROLES,
  colourAttrs,
  COLOURS_COOKIE,
  currentColours,
  currentTheme,
  DEFAULT_COLOURS,
  preferenceCookieDomain,
  presetColours,
  presetOf,
  readColours,
  readTheme,
  setPreferenceCookie,
  subscribePreferences,
  THEME_COOKIE,
  THEMES,
  themeClass,
  writeColours,
  type ColourRole,
  type Colours,
  type Preset,
  type Theme,
} from "./lib/theme.ts";
