import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { BrandBlobs } from "./BrandBlobs.tsx";

const meta = {
  title: "Components/BrandBlobs",
  component: BrandBlobs,
  parameters: { layout: "fullscreen" },
  decorators: [
    (Story) => (
      <section className="relative isolate grid min-h-80 place-items-center overflow-hidden p-10">
        <Story />
        <h2 className="text-3xl font-bold tracking-tight">Behind a hero</h2>
      </section>
    ),
  ],
} satisfies Meta<typeof BrandBlobs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
