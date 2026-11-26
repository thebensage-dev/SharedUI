import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ArrowRight, Blocks, Plus, Rocket, Search, Trash2 } from "lucide-react";
import { palette, type PaletteGroup } from "../lib/palette.ts";
import { TONES, toneClass } from "../lib/tone.ts";

const meta = {
  title: "Foundations",
  parameters: { layout: "padded" },
  tags: ["!autodocs"],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

type Token = { light: string; dark: string; use: string };
const GROUPS = Object.entries(palette) as [PaletteGroup, Record<string, Token>][];

function Swatch({ light, dark }: { light: string; dark: string }) {
  return (
    <span className="flex size-12 shrink-0 overflow-hidden rounded-lg border border-border">
      <span className="flex-1" style={{ background: light }} />
      <span className="flex-1" style={{ background: dark }} />
    </span>
  );
}

export const Colours: Story = {
  render: () => (
    <div className="grid max-w-5xl gap-10">
      <p className="max-w-2xl text-sm text-foreground-muted">
        Defined once, by role, in <code>brand/palette.json</code>. Use them as <code>bg-*</code>,{" "}
        <code>text-*</code> and <code>border-*</code> utilities or <code>var(--name)</code>, never
        raw colours. The sites, this Storybook, the sign-in pages and the emails all come from that
        file. Left half of each swatch: light theme. Right half: dark theme.
      </p>
      {GROUPS.map(([group, tokens]) => (
        <section key={group}>
          <h2 className="eyebrow mb-3">{group}</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {Object.entries(tokens).map(([name, { light, dark, use }]) => (
              <div key={name} className="card flex items-center gap-3 p-3">
                <Swatch light={light} dark={dark} />
                <span className="min-w-0">
                  <code className="text-sm font-semibold">{name}</code>
                  <span className="block text-xs text-foreground-muted">{use}</span>
                  <span className="block truncate font-mono text-[11px] text-foreground-muted">
                    {light === dark ? light : `${light} / ${dark}`}
                  </span>
                </span>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  ),
};

const PAIRS = [
  ["foreground", "background", "Body text on the page"],
  ["foreground-muted", "surface", "Secondary text on a card"],
  ["on-primary", "primary", "Primary button"],
  ["primary-ink", "primary-soft", "Selected item"],
  ["secondary-ink", "secondary-soft", "Secondary tone: tile, tag"],
  ["accent-ink", "accent-soft", "Accent tone: tile, tag"],
  ["foreground", "accent-soft", "Search match (Highlight)"],
  ["on-accent", "accent", "Accent button"],
  ["on-secondary", "secondary", "Secondary swatch (ColourPicker)"],
  ["on-danger", "danger", "Destructive button"],
  ["danger-ink", "danger-soft", "Error message"],
  ["success-ink", "success-soft", "Success message"],
  ["warning-ink", "warning-soft", "Warning message"],
] as const;

export const Pairings: Story = {
  render: () => (
    <div className="grid max-w-3xl gap-3 sm:grid-cols-2">
      {PAIRS.map(([text, fill, use]) => (
        <div
          key={text + fill}
          className="rounded-xl border border-border p-4"
          style={{ color: `var(--${text})`, background: `var(--${fill})` }}
        >
          <p className="font-semibold">{use}</p>
          <p className="font-mono text-xs opacity-90">
            text-{text} on bg-{fill}
          </p>
        </div>
      ))}
    </div>
  ),
};

export const Buttons: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <button type="button" className="btn btn-primary">
        <Plus className="size-4" /> Primary
      </button>
      <button type="button" className="btn btn-secondary">
        Secondary
      </button>
      <button type="button" className="btn btn-accent">
        Accent
      </button>
      <button type="button" className="btn btn-danger">
        Danger
      </button>
      <button type="button" className="btn btn-danger-outline">
        <Trash2 className="size-4" /> Danger outline
      </button>
      <button type="button" className="btn btn-primary" disabled>
        Disabled
      </button>
      <button type="button" className="icon-btn" aria-label="Next">
        <ArrowRight className="size-4" />
      </button>
      <a href="#links" className="link">
        Link
      </a>
    </div>
  ),
};

export const Forms: Story = {
  render: () => (
    <div className="card grid max-w-md gap-4 p-6">
      <div>
        <label className="label" htmlFor="name">
          Name
        </label>
        <input id="name" className="input" placeholder="Ada Lovelace" />
      </div>
      <div>
        <label className="label" htmlFor="email">
          Email
        </label>
        <input id="email" className="input" aria-invalid="true" defaultValue="ada@" />
        <p className="field-error">Enter a valid email address.</p>
      </div>
      <div>
        <label className="label" htmlFor="country">
          Country
        </label>
        <select id="country" className="input">
          <option>United Kingdom</option>
          <option>Ireland</option>
        </select>
      </div>
      <div>
        <label className="label" htmlFor="bio">
          Bio
        </label>
        <textarea id="bio" className="input" rows={3} />
      </div>
    </div>
  ),
};

export const TagsAndBadges: Story = {
  name: "Tags and badges",
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <span className="tag">Tag</span>
      <button type="button" className="toggle-chip" aria-pressed="false">
        Chip
      </button>
      <button type="button" className="toggle-chip" aria-pressed="true">
        Selected chip
      </button>
      <span className="filter-tag">Filter ×</span>
      <span className="count-badge">3</span>
      <span className="code-badge">GB</span>
      <span className="eyebrow">Eyebrow</span>
      <kbd>/</kbd>
    </div>
  ),
};

const TONE_ICONS = { secondary: Rocket, accent: Search, primary: Blocks } as const;

/**
 * The three brand colours as tones. A `tone-*` class (or `toneClass(toneAt(i))` in a list) colours
 * the `eyebrow`, `icon-tile`, `tag-tone`, `tone-dot` and `tone-card` inside it. Primary stays the
 * colour of actions, focus and selection; search matches are the accent's highlighter yellow.
 */
export const Tones: Story = {
  render: () => (
    <div className="grid max-w-4xl gap-8">
      <div className="grid gap-4 sm:grid-cols-3">
        {TONES.map((tone) => {
          const Icon = TONE_ICONS[tone];
          return (
            <a key={tone} href="#tones" className={`card tone-card p-5 ${toneClass(tone)}`}>
              <span className="icon-tile">
                <Icon />
              </span>
              <p className="eyebrow mt-4">tone-{tone}</p>
              <p className="mt-1 font-semibold">A toned card</p>
              <span className="tag tag-tone mt-3 inline-flex items-center gap-1.5">
                <span className="tone-dot" />
                tag-tone
              </span>
            </a>
          );
        })}
      </div>
      <div className="brand-wash card grid gap-3 p-8">
        <span className="brand-rule" />
        <h2 className="text-2xl font-bold tracking-tight">
          brand-wash with a <span className="gradient-text">brand-rule</span>
        </h2>
        <p className="text-sm text-foreground-muted">
          For a hero or a call-to-action panel. Use one wash per page.
        </p>
      </div>
    </div>
  ),
};

export const Motion: Story = {
  render: () => (
    <div className="relative isolate grid gap-6 overflow-hidden p-10">
      <div
        className="blob -top-10 left-10 -z-10 size-64"
        style={{ "--blob": "var(--secondary)" } as React.CSSProperties}
      />
      <div
        className="blob top-10 right-10 -z-10 size-56"
        style={{ "--blob": "var(--accent)", animationDelay: "-5s" } as React.CSSProperties}
      />
      <div
        className="blob -bottom-16 left-1/3 -z-10 size-64"
        style={{ "--blob": "var(--primary)", animationDelay: "-10s" } as React.CSSProperties}
      />
      <h2 className="reveal text-3xl font-bold">
        Fast, <span className="gradient-text">reliable</span> web apps
      </h2>
      <p className="float card w-fit p-4">I float</p>
      <p>
        <span className="typewriter" style={{ "--chars": 12 } as React.CSSProperties}>
          Hello there!
        </span>
      </p>
    </div>
  ),
};

const SPACING = [
  ["section", "5–6rem", "py-section", "Top and bottom of a full-width section or band"],
  ["subsection", "4rem", "mt-subsection", "Between the sections of an inner page"],
  ["stack", "2.5rem", "mt-stack", "Between blocks inside a section (stats, a grid, a diagram)"],
  [
    "content",
    "2rem",
    "mt-content",
    "From a section heading to its content, and before a closing link",
  ],
  ["intro", "0.75rem", "mt-intro", "From a title to its intro"],
  ["eyebrow", "0.5rem", "mb-eyebrow", "From an eyebrow to its title"],
] as const;

/** A tinted band exactly as tall as the token, labelled in the gutter to its right (the parent
 *  leaves room for it), so even the 0.5rem gap is readable. */
function Gap({ name, label }: { name: string; label: string }) {
  return (
    <div
      aria-hidden
      className="relative bg-primary-soft"
      style={{ height: `var(--spacing-${name})` }}
    >
      <span className="absolute top-1/2 left-full ml-3 flex -translate-y-1/2 items-center gap-2 font-mono text-[11px] whitespace-nowrap text-primary-ink">
        <span className="h-px w-3 bg-primary" />
        {label}
      </span>
    </div>
  );
}

/**
 * Layout spacing tokens in `tokens.css`, usable with any spacing utility (`py-section`,
 * `mt-content`, `gap-stack`) or as `var(--spacing-<name>)`. Use these for layout and keep
 * Tailwind's scale for spacing inside a component.
 */
export const Spacing: Story = {
  render: () => (
    <div className="grid max-w-4xl gap-stack">
      <section>
        <h2 className="eyebrow mb-3">Scale</h2>
        <div className="card divide-y divide-border">
          {SPACING.map(([name, size, utility, use]) => (
            <div
              key={name}
              className="grid gap-x-6 gap-y-2 px-5 py-4 sm:grid-cols-[9rem_6rem_1fr] sm:items-center"
            >
              <p>
                <code className="text-sm font-semibold">{utility}</code>
                <span className="block font-mono text-xs text-foreground-muted">{size}</span>
              </p>
              <span aria-hidden className="block h-2 w-24 rounded-full bg-surface-muted">
                <span
                  className="block h-full rounded-full bg-primary"
                  style={{ width: `var(--spacing-${name})` }}
                />
              </span>
              <p className="text-sm text-foreground-muted">{use}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="eyebrow mb-3">In a section</h2>
        <div className="card overflow-hidden py-6 pr-32 pl-6 sm:pr-36">
          <div className="brand-wash grid place-items-center rounded-xl py-8">
            <p className="font-mono text-xs text-foreground-muted">A hero or band ends here</p>
          </div>
          <Gap name="section" label="py-section" />
          {/* SectionHeading, with its two inner gaps drawn in. */}
          <p className="eyebrow tone-secondary">Eyebrow</p>
          <Gap name="eyebrow" label="mb-eyebrow" />
          <h3 className="title-section">Section title</h3>
          <Gap name="intro" label="mt-intro" />
          <p className="max-w-2xl leading-relaxed text-pretty text-foreground-muted">
            An intro under the title. SectionHeading spaces its eyebrow, title and intro like this.
          </p>
          <Gap name="content" label="mt-content" />
          <div className="grid gap-4 sm:grid-cols-3">
            {TONES.map((tone) => (
              <div key={tone} className={`card tone-card p-4 ${toneClass(tone)}`}>
                <p className="title-card">Card</p>
              </div>
            ))}
          </div>
          <Gap name="section" label="py-section" />
          <div className="grid place-items-center rounded-xl border border-dashed border-border py-8">
            <p className="font-mono text-xs text-foreground-muted">The next section starts here</p>
          </div>
        </div>
      </section>
    </div>
  ),
};

const TITLES = [
  ["title-display", "h1", "The homepage hero, once per site"],
  ["title-page", "h1", "An inner page's title, under its eyebrow"],
  ["title-section", "h2", "A section title (SectionHeading uses it)"],
  ["title-card", "h3", "A card or list item title"],
] as const;

/** One title class per level, so every page's headings match. An eyebrow sits above page and
 *  section titles, `mb-eyebrow` above the title; an intro follows `mt-intro` below it. */
export const Titles: Story = {
  render: () => (
    <div className="grid max-w-4xl gap-6">
      {TITLES.map(([cls, tag, use]) => (
        <div key={cls} className="grid gap-2 border-b border-border pb-6">
          <p className="flex flex-wrap gap-x-3 font-mono text-xs text-foreground-muted">
            <code className="font-semibold text-foreground">.{cls}</code>
            <span>{tag}</span>
            <span>{use}</span>
          </p>
          <p className={cls}>Fast, reliable web apps</p>
        </div>
      ))}
    </div>
  ),
};
