import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CookieNotice } from "./CookieNotice.tsx";

const meta = {
  title: "Components/CookieNotice",
  component: CookieNotice,
  parameters: { layout: "fullscreen" },
  // A fresh cookie name per story render, so "Got it" in one visit doesn't hide it for good.
  args: { policyHref: "#", cookieName: `story-cookie-notice-${Date.now()}` },
  render: (args) => (
    <div className="min-h-64 p-6 text-sm text-foreground-muted">
      The notice sits in the bottom corner until it's dismissed.
      <CookieNotice {...args} />
    </div>
  ),
} satisfies Meta<typeof CookieNotice>;

export default meta;

export const Default: StoryObj<typeof meta> = {};
