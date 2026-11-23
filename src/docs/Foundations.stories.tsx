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
