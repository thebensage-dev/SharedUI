import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import { DEFAULT_COLOURS } from "../../lib/theme.ts";
import { ColourPicker } from "./ColourPicker.tsx";

const meta = {
  title: "Components/ColourPicker",
  component: ColourPicker,
  args: { initialColours: DEFAULT_COLOURS, onChange: fn() },
  decorators: [
    (Story) => (
      <div className="grid max-w-xl gap-8 sm:grid-cols-[1fr_auto]">
        <Story />
        <div className="grid content-start gap-3 text-sm">
          <button type="button" className="btn btn-primary">
            Primary
          </button>
          <span aria-hidden className="brand-rule" />
          <span className="tag tag-tone tone-secondary w-fit">Secondary</span>
          <button type="button" className="btn btn-accent">
            Accent
          </button>
        </div>
      </div>
    ),
  ],
} satisfies Meta<typeof ColourPicker>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * One row per brand role plus presets that set all three. Picking recolours this page live and
 * saves a `colours` cookie (e.g. `teal.sky.mint`).
 */
export const Default: Story = {};

/** Each role can carry a note on where it shows. */
export const WithHints: Story = {
  args: {
    hints: {
      primary: "Buttons, links, focus rings",
      secondary: "Decoration: tiles, tags, rules",
      accent: "Warm calls to action, highlights",
    },
  },
};
