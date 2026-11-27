import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { PageIntro } from "./PageIntro.tsx";

const meta = {
  title: "Components/PageIntro",
  component: PageIntro,
  parameters: { layout: "padded" },
  args: {
    crumbs: [
      { label: "Home", path: "/" },
      { label: "Platform", path: "/platform" },
    ],
    eyebrow: "How it fits together",
    title: "Platform",
    intro: "One sign-in, shared components and a CMS behind every page.",
  },
  argTypes: { children: { control: false }, linkComponent: { control: false } },
} satisfies Meta<typeof PageIntro>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const WithButtons: Story = {
  args: {
    children: (
      <a className="btn btn-primary" href="#">
        Get started
      </a>
    ),
  },
};
export const NoBreadcrumbs: Story = { args: { crumbs: [] } };
