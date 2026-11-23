import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { NavLink } from "./NavLink.tsx";

const meta = {
  title: "Next/NavLink",
  component: NavLink,
  args: { href: "/users", children: "Directory" },
  parameters: {
    // The Next.js framework mocks the App Router; set the pathname the link compares against.
    nextjs: { appDirectory: true, navigation: { pathname: "/users/42" } },
  },
} satisfies Meta<typeof NavLink>;

export default meta;
/** Active on its own route and on child routes, such as /users/42. */
export const Active: StoryObj<typeof meta> = {};

export const Inactive: StoryObj<typeof meta> = {
  args: { href: "/settings", children: "Settings" },
};

/** With `exact`, "/" is only active on the home page itself. */
export const Exact: StoryObj<typeof meta> = { args: { href: "/", exact: true, children: "Home" } };
