import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { PreviewBanner } from "./PreviewBanner.tsx";

const meta = {
  title: "Next/PreviewBanner",
  component: PreviewBanner,
  args: { label: "Preview: showing unpublished changes.", exit: "Exit preview" },
  parameters: { nextjs: { appDirectory: true, navigation: { pathname: "/skills" } } },
} satisfies Meta<typeof PreviewBanner>;

export default meta;
export const Default: StoryObj<typeof meta> = {};
