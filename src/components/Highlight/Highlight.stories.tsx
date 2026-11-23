import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { searchTerms } from "../../lib/text.ts";
import { Highlight } from "./Highlight.tsx";

const meta = {
  title: "Components/Highlight",
  component: Highlight,
  args: { text: "Zoë Okafor, Málaga", terms: searchTerms("zoe mal") },
  render: (args) => (
    <p>
      <Highlight {...args} />
    </p>
  ),
} satisfies Meta<typeof Highlight>;

export default meta;

/** Matching ignores case and accents: "zoe" marks "Zoë". */
export const Default: StoryObj<typeof meta> = {};
