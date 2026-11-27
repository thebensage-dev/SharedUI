// No "use client" here: each client component carries its own, so Server Components can import this.

export { ActionLinks, type ActionLink } from "./components/ActionLinks/ActionLinks.tsx";
export { Avatar } from "./components/Avatar/Avatar.tsx";
export { BrandBlobs } from "./components/BrandBlobs/BrandBlobs.tsx";
export { ColourPicker } from "./components/ColourPicker/ColourPicker.tsx";
export { ConfirmDialog } from "./components/ConfirmDialog/ConfirmDialog.tsx";
export {
  COOKIE_NOTICE_COOKIE,
  CookieNotice,
  type CookieNoticeLabels,
} from "./components/CookieNotice/CookieNotice.tsx";
export { EmptyState } from "./components/EmptyState/EmptyState.tsx";
export { FeatureGrid, type Feature } from "./components/FeatureGrid/FeatureGrid.tsx";
export { Figure } from "./components/Figure/Figure.tsx";
export { FlowSteps, type FlowStep } from "./components/FlowSteps/FlowSteps.tsx";
export {
  Footer,
  type FooterGroup,
  type FooterLabels,
  type FooterLink,
} from "./components/Footer/Footer.tsx";
export { Highlight } from "./components/Highlight/Highlight.tsx";
export { JsonLd } from "./components/JsonLd/JsonLd.tsx";
export { LegalIntro } from "./components/LegalIntro/LegalIntro.tsx";
export { Logo, LogoMark } from "./components/Logo/Logo.tsx";
export { MediaText } from "./components/MediaText/MediaText.tsx";
export { MobileMenu } from "./components/MobileMenu/MobileMenu.tsx";
export { Modal } from "./components/Modal/Modal.tsx";
export { NoteCard } from "./components/NoteCard/NoteCard.tsx";
export {
  Pagination,
  pageList,
  type PaginationLabels,
} from "./components/Pagination/Pagination.tsx";
export { PageIntro, type Crumb } from "./components/PageIntro/PageIntro.tsx";
export { Reveal } from "./components/Reveal/Reveal.tsx";
export { RichText, type RichTextData } from "./components/RichText/RichText.tsx";
export { SearchBox, type SearchBoxLabels } from "./components/SearchBox/SearchBox.tsx";
export { SectionHeading } from "./components/SectionHeading/SectionHeading.tsx";
export {
  SegmentedControl,
  type SegmentOption,
} from "./components/SegmentedControl/SegmentedControl.tsx";
export {
  SiteHeader,
  type SiteHeaderLabels,
  type SiteLinkProps,
  type SiteNavItem,
} from "./components/SiteHeader/SiteHeader.tsx";
export { StepTimeline, type TimelineStep } from "./components/StepTimeline/StepTimeline.tsx";
export { ThemeToggle, type ThemeToggleLabels } from "./components/ThemeToggle/ThemeToggle.tsx";

export { useShortcut } from "./hooks/useShortcut.ts";

export { ICON_NAMES, iconByName, iconOrDot, type IconName } from "./lib/icons.ts";
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
