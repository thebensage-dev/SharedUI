import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Filter, KeyRound, Link2, MoonStar, Search, ShieldCheck } from "lucide-react";
import { FeatureGrid } from "./FeatureGrid.tsx";

const meta = {
  title: "Components/FeatureGrid",
  component: FeatureGrid,
  parameters: { layout: "padded" },
  args: {
    features: [
      {
        icon: Search,
        title: "Flexible search",
        description:
          "Multi-word, accent-insensitive search across names, jobs, cities and interests.",
      },
      {
        icon: Filter,
        title: "Combined filters",
        description: "Filter by country, age range and interests, with removable chips.",
      },
      {
        icon: Link2,
        title: "Shareable views",
        description:
          "Search, filters, sort and page all live in the URL, so any view can be shared.",
      },
      {
        icon: ShieldCheck,
        title: "Shared validation",
        description: "One schema checks the form as you type and again on the server.",
      },
      {
        icon: MoonStar,
        title: "Light and dark themes",
        description: "Follows the system setting or your choice, with no flash on load.",
      },
      {
        icon: KeyRound,
        title: "One sign-in",
        description: "Every app signs in through the same identity provider.",
      },
    ],
  },
  argTypes: { features: { control: false } },
} satisfies Meta<typeof FeatureGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Each card takes the next brand tone. */
export const Default: Story = {};

export const TwoColumnsWithTags: Story = {
  args: {
    columns: 2,
    features: [
      {
        icon: KeyRound,
        title: "Single sign-on",
        description: "One account for the site, the User Directory and the API docs.",
        tags: ["authentik", "OIDC", "PKCE"],
      },
      {
        icon: ShieldCheck,
        title: "Groups decide access",
        description: "Editors and members are groups, approved by hand.",
        tags: ["authentik"],
      },
    ],
  },
};
