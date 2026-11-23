// Generates palette.css and src/lib/palette.ts from brand/palette.json, then brand/logo.svg (the
// mark, drawn by src/lib/logo.ts). brand/ is the one source of the sites' look: Infrastructure's
// authentik image downloads palette.json and logo.svg from a tagged SharedUI release.
// Fails if a text pair of any colour choice is below WCAG AA. --check fails instead of writing.
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const check = process.argv.includes("--check");
const source = join(root, "brand/palette.json");
const { groups, choices, presets } = JSON.parse(readFileSync(source, "utf8"));
const ROLES = ["primary", "secondary", "accent"];
const NAME = /^[a-z][a-z-]*$/;
const fail = (message) => {
  throw new Error(`palette.json: ${message}`);
};

const tokens = Object.values(groups).flatMap((group) => Object.entries(group));
const base = {};
for (const [name, value] of tokens) {
  if (base[name]) fail(`"${name}" is defined twice`);
  if (!NAME.test(name)) fail(`bad name "${name}"`);
  if (!value.light || !value.dark || !value.use) fail(`"${name}" needs light, dark and use`);
  base[name] = value;
}

// A role's tokens, e.g. primary, primary-hover, primary-soft, primary-ink and on-primary.
const family = (role) =>
  Object.keys(base).filter((n) => n === role || n.startsWith(`${role}-`) || n === `on-${role}`);

const resolved = {};
for (const role of ROLES) {
  const options = Object.entries(choices?.[role] ?? {});
  if (!options.length) fail(`choices.${role} needs at least one colour`);
  resolved[role] = {};
  options.forEach(([option, { label, ...values }], index) => {
    if (!NAME.test(option)) fail(`bad ${role} choice "${option}"`);
    if (!label) fail(`${role} choice "${option}" needs a label`);
    const names = Object.keys(values);
    if (index === 0 && names.length) fail(`the first ${role} choice is the Brand default`);
    for (const name of names)
      if (!family(role).includes(name)) fail(`${role} choice "${option}" sets "${name}"`);
    if (index > 0)
      for (const name of family(role))
        if (!values[name]?.light || !values[name]?.dark)
          fail(`${role} choice "${option}" needs "${name}" with light and dark`);
    resolved[role][option] = Object.fromEntries(
      family(role).map((name) => [name, values[name] ?? base[name]]),
    );
  });
}

Object.entries(presets ?? {}).forEach(([preset, { label, ...set }], index) => {
  if (!NAME.test(preset) || !label) fail(`preset "${preset}" needs a name and a label`);
  for (const role of ROLES) {
    if (!resolved[role][set[role]]) fail(`preset "${preset}" has unknown ${role} "${set[role]}"`);
    if (index === 0 && set[role] !== Object.keys(resolved[role])[0])
      fail("the first preset must use the default choices");
  }
});

// WCAG contrast. Translucent fills are blended over the page and over a card.
const rgba = (colour) => {
  const hex = colour.match(/^#([0-9a-f]{6})$/i);
  if (hex) return [0, 2, 4].map((i) => parseInt(hex[1].slice(i, i + 2), 16)).concat(1);
  const rgb = colour.match(/^rgb\((\d+) (\d+) (\d+)(?: \/ ([\d.]+))?\)$/);
  if (rgb) return [+rgb[1], +rgb[2], +rgb[3], rgb[4] ? +rgb[4] : 1];
  fail(`can't read colour "${colour}"`);
};
const blend = (colour, under) => {
  const [r, g, b, a] = rgba(colour);
  const below = rgba(under);
  return `rgb(${[r, g, b].map((v, i) => Math.round(v * a + below[i] * (1 - a))).join(" ")})`;
};
const luminance = (colour) => {
  const [r, g, b] = rgba(colour)
    .slice(0, 3)
    .map((v) => (v / 255 <= 0.04045 ? v / 255 / 12.92 : ((v / 255 + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const contrast = (a, b) => {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};

const problems = [];
for (const role of ROLES)
  for (const [option, values] of Object.entries(resolved[role]))
    for (const theme of ["light", "dark"]) {
      const v = (name) => (values[name] ?? base[name])[theme];
      const grounds = [
        ["page", v("background")],
        ["card", v("surface")],
      ];
      const pairs = [];
      for (const [where, ground] of grounds) {
        pairs.push([`${role}-ink`, v(`${role}-ink`), where, ground, 4.5]);
        const soft = blend(v(`${role}-soft`), ground);
        pairs.push([`${role}-ink`, v(`${role}-ink`), `${role}-soft (${where})`, soft, 4.5]);
        if (role === "accent")
          pairs.push(["foreground", v("foreground"), `accent-soft (${where})`, soft, 4.5]);
      }
      for (const fill of [role, `${role}-hover`])
        if (values[fill] && values[`on-${role}`])
          pairs.push([`on-${role}`, v(`on-${role}`), fill, v(fill), 4.5]);
      if (role === "primary")
        pairs.push(["primary (focus ring)", v("primary"), "page", v("background"), 3]);
      for (const [text, a, fill, b, min] of pairs) {
        const ratio = contrast(blend(a, b), b);
        if (ratio < min)
          problems.push(
            `${role} "${option}" (${theme}): ${text} on ${fill} is ${ratio.toFixed(2)}:1, needs ${min}:1`,
          );
      }
    }
if (problems.length) fail(`contrast too low:\n  ${problems.join("\n  ")}`);

const declaration = (name, { light, dark }) =>
  light === dark ? `  --${name}: ${light};` : `  --${name}: light-dark(${light}, ${dark});`;

const header = "Generated by scripts/palette.mjs from palette.json. Don't edit: edit palette.json";

// Every choice gets a rule, the default too, so an element can show its own choice inside a page
// that uses another (the picker's swatches do).
const rules = ROLES.flatMap((role) =>
  Object.entries(resolved[role]).map(
    ([option, values]) => `
[data-${role}="${option}"] {
${Object.entries(values)
  .map(([name, value]) => declaration(name, value))
  .join("\n")}
}
`,
  ),
);

const css = `/* ${header}, then run \`npm run palette\`. */

@theme inline {
${tokens.map(([name]) => `  --color-${name}: var(--${name});`).join("\n")}
}

:root {
${tokens.map(([name, value]) => declaration(name, value)).join("\n")}
}
${rules.join("")}`;

const labels = Object.fromEntries(
  ROLES.map((role) => [
    role,
    Object.fromEntries(Object.entries(choices[role]).map(([option, { label }]) => [option, label])),
  ]),
);

const ts = `// ${header}, then run \`npm run palette\`.

export const palette = ${JSON.stringify(groups, null, 2)} as const;

export type PaletteGroup = keyof typeof palette;

/** The colours visitors can pick for each brand role, with their labels. The first is the default. */
export const choices = ${JSON.stringify(labels, null, 2)} as const;

/** Named combinations of one choice per role. The first is the default. */
export const presets = ${JSON.stringify(presets, null, 2)} as const;
`;

let stale = false;
function write(file, content) {
  const current = existsSync(file) ? readFileSync(file, "utf8") : "";
  if (current === content) return;
  if (check) {
    console.error(`Out of date: ${file}. Run \`npm run palette\`.`);
    stale = true;
  } else {
    writeFileSync(file, content);
    console.log(`Wrote ${file}`);
  }
}

write(join(root, "src/styles/palette.css"), css);
write(join(root, "src/lib/palette.ts"), ts);
if (stale) process.exit(1);

// The logo, from the palette just written (Node runs the .ts module directly). It gets a fixed
// size so authentik can use it as its logo and favicon.
const { logoSvg } = await import(new URL("../src/lib/logo.ts", import.meta.url).href);
write(
  join(root, "brand/logo.svg"),
  logoSvg().replace("<svg ", '<svg width="48" height="48" ') + "\n",
);
if (stale) process.exit(1);
