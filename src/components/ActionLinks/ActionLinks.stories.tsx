import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ArrowRight, Code, UserPlus } from "lucide-react";
import { ActionLinks } from "./ActionLinks.tsx";

const meta = {
  title: "Components/ActionLinks",
  component: ActionLinks,
  parameters: { layout: "padded" },
  decorators: [
    (Story) => (
      <div className="flex flex-wrap gap-3">
        <Story />
      </div>
    ),
  ],
  args: {
    nudge: true,
    actions: [
      { key: 1, label: "Request access", href: "#", icon: UserPlus, iconPosition: "start" },
      {
        key: 2,
        label: "On GitHub",
        href: "#",
        style: "secondary",
        icon: Code,
        iconPosition: "start",
      },
      { key: 3, label: "Read more", href: "#", style: "ghost", icon: ArrowRight },
    ],
  },
  argTypes: { linkComponent: { control: false } },
} satisfies Meta<typeof ActionLinks>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const Sizes: Story = {
  args: {
    actions: [
      { key: 1, label: "Small", href: "#", size: "sm" },
      { key: 2, label: "Default", href: "#" },
      { key: 3, label: "Large", href: "#", size: "lg", icon: ArrowRight },
    ],
  },
};
