import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { FolderKanban, LogIn, Mail } from "lucide-react";
import { ThemeToggle } from "../ThemeToggle/ThemeToggle.tsx";
import { MobileMenu } from "./MobileMenu.tsx";

const meta = {
  title: "Components/MobileMenu",
  component: MobileMenu,
  parameters: { viewport: { defaultViewport: "mobile1" } },
  args: { label: "Menu", className: "flex justify-end", children: null },
} satisfies Meta<typeof MobileMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * The header menu on phones. Links go in `mobile-menu-link` rows, other controls in
 * `mobile-menu-row`, with `mobile-menu-divider` between groups. (`className` here keeps it visible
 * at any width; in an app the default `sm:hidden` hides it from `sm` up.)
 */
export const Default: Story = {
  render: (args) => (
    <div className="h-96">
      <MobileMenu {...args}>
        <a href="#projects" className="mobile-menu-link">
          <FolderKanban aria-hidden />
          Projects
        </a>
        <a href="#contact" className="mobile-menu-link">
          <Mail aria-hidden />
          Contact
        </a>
        <hr className="mobile-menu-divider" />
        <div className="mobile-menu-row">
          Theme
          <ThemeToggle initialTheme="system" />
        </div>
        <a href="#sign-in" className="mobile-menu-link">
          <LogIn aria-hidden />
          Sign in
        </a>
      </MobileMenu>
    </div>
  ),
};
