import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { LogIn } from "lucide-react";
import { NoteCard } from "./NoteCard.tsx";

const meta = {
  title: "Components/NoteCard",
  component: NoteCard,
  parameters: { layout: "padded" },
  args: {
    title: "Try it yourself",
    body: "Sign in with one account to edit records in the User Directory and pick the site's colours.",
    tone: "tone-accent",
  },
  argTypes: {
    tone: { control: "select", options: ["tone-primary", "tone-secondary", "tone-accent"] },
    children: { control: false },
  },
  decorators: [
    (Story) => (
      <div className="max-w-md">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof NoteCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/** Buttons go in a row under the text. */
export const WithActions: Story = {
  args: {
    tone: "tone-secondary",
    children: (
      <>
        <a href="#sign-in" className="btn btn-primary">
          <LogIn className="size-4" aria-hidden />
          Sign in
        </a>
        <a href="#request" className="btn btn-secondary">
          Request access
        </a>
      </>
    ),
  },
};
