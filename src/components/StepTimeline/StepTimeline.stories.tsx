import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { KeyRound, MailCheck, UserPlus } from "lucide-react";
import { StepTimeline } from "./StepTimeline.tsx";

const meta = {
  title: "Components/StepTimeline",
  component: StepTimeline,
  parameters: { layout: "padded" },
  args: {
    label: "Getting access",
    steps: [
      {
        icon: UserPlus,
        actor: "You",
        title: "Create an account",
        description: "Sign up once with your email; the same account works on every app.",
      },
      {
        icon: MailCheck,
        actor: "Me",
        title: "I approve the request",
        description: "Access is a group in authentik, added by hand after a quick look.",
      },
      {
        icon: KeyRound,
        actor: "authentik",
        title: "You're signed in everywhere",
        description: "The next page you open signs you in silently.",
      },
    ],
  },
  argTypes: { steps: { control: false }, countLabel: { control: false } },
} satisfies Meta<typeof StepTimeline>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Icons, "Step N of M" and who does each step. */
export const Default: Story = {};

/** No icons, actors or count label: the tiles show the step numbers. */
export const Numbered: Story = {
  args: {
    label: "How it works",
    countLabel: false,
    steps: [
      {
        title: "Server Components read the data",
        description: "Pages call the People API and stream ready-made HTML.",
      },
      {
        title: "The URL drives the list",
        description: "Search and filters live in the address bar; the API pages in SQL.",
      },
      {
        title: "Server Actions make the changes",
        description: "Validated actions send your token to the API, then revalidate the page.",
      },
    ],
  },
};
