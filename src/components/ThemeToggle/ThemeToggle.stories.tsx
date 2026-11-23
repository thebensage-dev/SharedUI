import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import { ThemeToggle } from "./ThemeToggle.tsx";

const meta = {
  title: "Components/ThemeToggle",
  component: ThemeToggle,
  args: { initialTheme: "system", onChange: fn() },
  argTypes: { initialTheme: { control: "inline-radio", options: ["light", "system", "dark"] } },
} satisfies Meta<typeof ThemeToggle>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Clicking a theme switches this page live and saves a `theme` cookie. Every toggle on a page stays in step. */
export const Default: Story = {};
