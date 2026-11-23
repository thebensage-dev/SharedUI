import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Logo, LogoMark } from "./Logo.tsx";

const meta = {
  title: "Components/Logo",
  component: Logo,
  args: { name: "TheBensage" },
} satisfies Meta<typeof Logo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-end gap-4">
      <LogoMark className="size-5" />
      <LogoMark />
      <LogoMark className="size-12" />
      <LogoMark className="size-20" />
    </div>
  ),
};
