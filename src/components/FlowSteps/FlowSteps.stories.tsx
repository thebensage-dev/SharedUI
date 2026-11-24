import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Container, GitBranch, Globe, Rocket } from "lucide-react";
import { FlowSteps } from "./FlowSteps.tsx";

const meta = {
  title: "Components/FlowSteps",
  component: FlowSteps,
  parameters: { layout: "padded" },
  args: {
    label: "From a push to your browser",
    steps: [
      { icon: GitBranch, title: "Push to main", detail: "GitHub runs the checks" },
      { icon: Container, title: "Build an image", detail: "Pushed to the registry" },
      { icon: Rocket, title: "Deploy", detail: "Coolify swaps it in" },
      { icon: Globe, title: "Live", detail: "Behind HTTPS on the VPS" },
    ],
  },
  argTypes: { steps: { control: false } },
} satisfies Meta<typeof FlowSteps>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Left to right from `md`, top to bottom on phones. */
export const Default: Story = {};

export const ThreeSteps: Story = {
  args: {
    label: "How an email reaches you",
    steps: [
      { icon: GitBranch, title: "An app sends it", detail: "Over SMTP" },
      { icon: Container, title: "The relay signs it", detail: "SPF, DKIM, DMARC" },
      { icon: Globe, title: "Your inbox", detail: "Delivered" },
    ],
  },
};
