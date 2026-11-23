import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Avatar } from "./Avatar.tsx";

const meta = {
  title: "Components/Avatar",
  component: Avatar,
  args: { name: "Ada Lovelace", size: "md" },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Avatar name="Grace Hopper" size="sm" />
      <Avatar name="Alan Turing" size="md" />
      <Avatar name="Zoë Okafor" size="lg" />
    </div>
  ),
};
