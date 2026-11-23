import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Activity, Mail } from "lucide-react";
import { Footer } from "./Footer.tsx";

const meta = {
  title: "Components/Footer",
  component: Footer,
  parameters: { layout: "fullscreen" },
  args: {
    brand: { name: "TheBensage", href: "#" },
    tagline: "Full-stack web apps with Next.js, React and TypeScript.",
    groups: [
      {
        title: "Projects",
        links: [
          { label: "User Directory", href: "#" },
          { label: "Shared UI", href: "#" },
        ],
      },
      {
        title: "Contact",
        links: [
          { label: "Email", href: "#", icon: Mail },
          { label: "GitHub", href: "https://github.com", external: true },
          { label: "Live status", href: "#", icon: Activity },
        ],
      },
    ],
    legal: [
      { label: "Privacy", href: "#" },
      { label: "Terms", href: "#" },
    ],
  },
  argTypes: { groups: { control: false }, legal: { control: false } },
} satisfies Meta<typeof Footer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Minimal: Story = { args: { tagline: undefined, groups: [] } };
