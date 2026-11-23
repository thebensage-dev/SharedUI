import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Reveal } from "./Reveal.tsx";

const meta = {
  title: "Components/Reveal",
  component: Reveal,
  args: { delay: 0, onScroll: false, children: null },
  argTypes: { children: { control: false } },
  render: (args) => (
    <div className="grid gap-3">
      {[0, 1, 2].map((i) => (
        <Reveal key={i} {...args} delay={(args.delay ?? 0) + i * 120} className="card w-72 p-4">
          Card {i + 1} fades up
        </Reveal>
      ))}
    </div>
  ),
} satisfies Meta<typeof Reveal>;

export default meta;

/** Re-run with the "Remount" button in the toolbar. Reduced-motion users see it in place. */
export const Staggered: StoryObj<typeof meta> = {};
