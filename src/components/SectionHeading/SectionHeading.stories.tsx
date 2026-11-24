import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { SectionHeading } from "./SectionHeading.tsx";

const meta = {
  title: "Components/SectionHeading",
  component: SectionHeading,
  parameters: { layout: "padded" },
  args: {
    id: "projects-title",
    eyebrow: "Projects",
    eyebrowTone: "tone-accent",
    title: "Things I've built and run",
    intro:
      "Each project deploys on its own from GitHub to one small server, behind the same sign-in.",
  },
  argTypes: {
    eyebrowTone: {
      control: "select",
      options: [undefined, "tone-primary", "tone-secondary", "tone-accent"],
    },
  },
} satisfies Meta<typeof SectionHeading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/** Just the h2, as on a page's inner sections. */
export const TitleOnly: Story = { args: { eyebrow: undefined, intro: undefined } };
