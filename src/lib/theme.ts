// Used by the server too, so nothing here may touch the DOM at import time.
import { choices, presets } from "./palette.ts";

export const THEMES = ["light", "system", "dark"] as const;
export type Theme = (typeof THEMES)[number];

export const THEME_COOKIE = "theme";

/** Turns an untrusted cookie value into a Theme, falling back to "system". */
export function readTheme(value: string | undefined | null): Theme {
  return (THEMES as readonly string[]).includes(value ?? "") ? (value as Theme) : "system";
}

/** Class for <html>: "light" or "dark", or undefined to follow the OS. */
export const themeClass = (theme: Theme) => (theme === "system" ? undefined : theme);

/** The brand's three colour roles: primary for interaction, secondary and accent for decoration. */
export const COLOUR_ROLES = ["primary", "secondary", "accent"] as const;
export type ColourRole = (typeof COLOUR_ROLES)[number];

/** One choice per role, e.g. { primary: "blue", secondary: "red", accent: "yellow" }. */
export type Colours = { [R in ColourRole]: keyof (typeof choices)[R] };
export type Preset = keyof typeof presets;

const optionsOf = (role: ColourRole) => Object.keys(choices[role]);

export const DEFAULT_COLOURS = Object.fromEntries(
  COLOUR_ROLES.map((role) => [role, optionsOf(role)[0]]),
) as Colours;

/** One cookie for all three roles, e.g. `colours=teal.sky.mint`. */
export const COLOURS_COOKIE = "colours";

/** Turns an untrusted cookie value into Colours; unknown parts fall back to the brand default. */
export function readColours(value: string | undefined | null): Colours {
  const parts = (value ?? "").split(".");
  return Object.fromEntries(
    COLOUR_ROLES.map((role, i) => [
      role,
      optionsOf(role).includes(parts[i] ?? "") ? parts[i] : DEFAULT_COLOURS[role],
    ]),
  ) as Colours;
}

/** The cookie value for some Colours. */
export const writeColours = (colours: Colours) =>
  COLOUR_ROLES.map((role) => colours[role]).join(".");

/** Attributes to spread on <html> (`data-primary` and so on), leaving out the defaults. */
export function colourAttrs(colours: Colours) {
  const attrs: Partial<Record<`data-${ColourRole}`, string>> = {};
  for (const role of COLOUR_ROLES)
    if (colours[role] !== DEFAULT_COLOURS[role]) attrs[`data-${role}`] = String(colours[role]);
  return attrs;
}

/** The preset these Colours match, if any. */
export const presetOf = (colours: Colours): Preset | undefined =>
  (Object.keys(presets) as Preset[]).find((preset) =>
    COLOUR_ROLES.every((role) => presets[preset][role] === colours[role]),
  );

/** The Colours a preset sets. */
export const presetColours = (preset: Preset): Colours =>
  Object.fromEntries(COLOUR_ROLES.map((role) => [role, presets[preset][role]])) as Colours;

/**
 * The domain to share preference cookies on, from the main site's URL: its host (without
 * `www.`), so subdomains (users.example.com under example.com) see them too. Undefined for
 * localhost and IPs, where browsers only accept host-only cookies.
 */
export function preferenceCookieDomain(siteUrl: string | undefined | null): string | undefined {
  if (!siteUrl) return undefined;
  try {
    const host = new URL(siteUrl).hostname;
    const local = host === "localhost" || host.endsWith(".localhost");
    if (local || /^[\d.]+$/.test(host) || host.includes(":") || !host.includes("."))
      return undefined;
    return host.replace(/^www\./, "");
  } catch {
    return undefined;
  }
}

/**
 * Saves a preference cookie for a year, readable by the server on the next request. With a
 * domain it also clears any host-only cookie of the same name, which would otherwise win.
 */
export function setPreferenceCookie(
  name: string,
  value: string,
  maxAgeSeconds = 31_536_000,
  domain?: string,
) {
  // A domain the page isn't on (e.g. a site opened under another host name) would be refused.
  const host = location.hostname;
  const shared = domain && (host === domain || host.endsWith(`.${domain}`)) ? domain : undefined;
  if (shared) document.cookie = `${name}=; path=/; max-age=0; samesite=lax`;
  const scope = shared ? `; domain=${shared}` : "";
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${maxAgeSeconds}; samesite=lax${scope}`;
}

const CHANGE_EVENT = "preferencechange";

/** For useSyncExternalStore: keeps every toggle and picker on a page in step. */
export function subscribePreferences(onChange: () => void) {
  window.addEventListener(CHANGE_EVENT, onChange);
  return () => window.removeEventListener(CHANGE_EVENT, onChange);
}

/** The theme currently on <html>. */
export function currentTheme(): Theme {
  const { classList } = document.documentElement;
  return classList.contains("dark") ? "dark" : classList.contains("light") ? "light" : "system";
}

/** The Colours currently on <html>, as a cookie value (a string, so it can be a snapshot). */
export function currentColours(): string {
  const { dataset } = document.documentElement;
  return writeColours(readColours(COLOUR_ROLES.map((role) => dataset[role] ?? "").join(".")));
}

/** Applies a theme to <html> straight away and remembers it in a cookie. */
export function applyTheme(theme: Theme, cookieName = THEME_COOKIE, domain?: string) {
  setPreferenceCookie(cookieName, theme, undefined, domain);
  const root = document.documentElement;
  root.classList.remove("light", "dark");
  const cls = themeClass(theme);
  if (cls) root.classList.add(cls);
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

/** Applies Colours to <html> straight away and remembers them in a cookie. */
export function applyColours(colours: Colours, cookieName = COLOURS_COOKIE, domain?: string) {
  setPreferenceCookie(cookieName, writeColours(colours), undefined, domain);
  const attrs = colourAttrs(colours);
  for (const role of COLOUR_ROLES) {
    const value = attrs[`data-${role}`];
    if (value) document.documentElement.dataset[role] = value;
    else delete document.documentElement.dataset[role];
  }
  window.dispatchEvent(new Event(CHANGE_EVENT));
}
