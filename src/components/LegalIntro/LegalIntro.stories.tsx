import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { LegalIntro } from "./LegalIntro.tsx";

const meta = {
  title: "Components/LegalIntro",
  component: LegalIntro,
  parameters: { layout: "padded" },
  args: {
    updatedLabel: "Last updated",
    updated: "25 November 2026",
    title: "Privacy notice",
    intro: "What this site stores about you, and why.",
  },
} satisfies Meta<typeof LegalIntro>;

export default meta;
export const Default: StoryObj<typeof meta> = {};
