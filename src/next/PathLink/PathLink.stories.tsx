import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { PathLink } from "./PathLink.tsx";

const meta = {
  title: "Next/PathLink",
  component: PathLink,
  args: {
    href: "/users",
    children: "Directory",
    className:
      "text-foreground-muted aria-[current=page]:font-semibold aria-[current=page]:text-foreground",
  },
  parameters: {
    // The Next.js framework mocks the App Router; set the pathname the link compares against.
    nextjs: { appDirectory: true, navigation: { pathname: "/users/42" } },
  },
} satisfies Meta<typeof PathLink>;

export default meta;
/** Current (aria-current="page") on its own route and below, such as /users/42. */
export const Current: StoryObj<typeof meta> = {};

export const NotCurrent: StoryObj<typeof meta> = {
  args: { href: "/settings", children: "Settings" },
};
