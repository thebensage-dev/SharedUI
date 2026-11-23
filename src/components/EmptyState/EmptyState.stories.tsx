import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Plus, SearchX } from "lucide-react";
import { EmptyState } from "./EmptyState.tsx";

const meta = {
  title: "Components/EmptyState",
  component: EmptyState,
  parameters: { layout: "padded" },
  args: {
    icon: SearchX,
    title: "No matches",
    children: "Try a different search, or clear the filters.",
  },
  argTypes: { icon: { control: false } },
} satisfies Meta<typeof EmptyState>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithAction: Story = {
  args: {
    title: "No users yet",
    children: "Add the first person to get started.",
    action: (
      <button type="button" className="btn btn-primary">
        <Plus className="size-4" /> Add user
      </button>
    ),
  },
};

/** Any of the brand's three tones, e.g. to tell apart the empty states on one page. */
export const Toned: Story = {
  args: { tone: "secondary" },
};
