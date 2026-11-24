import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { BookOpen, FolderGit2, FolderKanban, Mail, Palette, Server, Users } from "lucide-react";
import { SiteHeader } from "./SiteHeader.tsx";

const meta = {
  title: "Components/SiteHeader",
  component: SiteHeader,
  parameters: { layout: "fullscreen" },
  args: {
    brand: { name: "TheBensage", href: "#" },
    nav: [
      { label: "Projects", href: "#projects", icon: FolderKanban },
      { label: "Platform", href: "#platform", icon: Server, current: true },
      { label: "API", href: "#api", icon: BookOpen },
      { label: "Colours", href: "#theme", icon: Palette, wideOnly: true },
      { label: "Contact", href: "mailto:hello@example.com", icon: Mail, external: true },
      { label: "GitHub", href: "https://github.com", icon: FolderGit2, external: true },
    ],
    theme: "system",
    user: null,
    accountHref: "#account",
    signInHref: "#sign-in",
  },
  argTypes: { nav: { control: false }, linkComponent: { control: false } },
} satisfies Meta<typeof SiteHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Signed out: a Sign in link at the end. "Platform" is the current page. */
export const SignedOut: Story = {};

/** Signed in: the name links to the account page, then a sign-out button. */
export const SignedIn: Story = {
  args: {
    user: { name: "Ada Lovelace" },
    labels: {
      signOut: "Sign out (of every app)",
      account: "Your account: name, email and password",
    },
  },
};

/** The User Directory's header: one link, sticky on a blurred surface. */
export const Sticky: Story = {
  args: {
    brand: { name: "User Directory", href: "#" },
    nav: [{ label: "Directory", href: "#users", icon: Users, current: true }],
    sticky: true,
  },
  render: (args) => (
    <div className="h-[150vh]">
      <SiteHeader {...args} />
      <p className="mx-auto max-w-5xl px-6 py-10 text-foreground-muted">Scroll: the bar stays.</p>
    </div>
  ),
};

/** Phones: the logo and a menu button holding the same links, theme and sign-in. */
export const Phone: Story = {
  args: { user: { name: "Ada Lovelace" } },
  parameters: { viewport: { defaultViewport: "mobile1" } },
  render: (args) => (
    <div className="h-[32rem]">
      <SiteHeader {...args} />
    </div>
  ),
};
