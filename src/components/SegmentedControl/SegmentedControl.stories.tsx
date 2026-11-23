import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { LayoutGrid, List } from "lucide-react";
import { useState } from "react";
import { SegmentedControl, type SegmentOption } from "./SegmentedControl.tsx";

type View = "cards" | "table";
const options: SegmentOption<View>[] = [
  { value: "cards", label: "Card view", icon: LayoutGrid },
  { value: "table", label: "Table view", icon: List },
];

const meta = {
  title: "Components/SegmentedControl",
  component: SegmentedControl<View>,
  args: { label: "View", options, value: "cards", onChange: () => {} },
  render: function Render(args) {
    const [value, setValue] = useState(args.value);
    return <SegmentedControl {...args} value={value} onChange={setValue} />;
  },
} satisfies Meta<typeof SegmentedControl<View>>;

export default meta;
export const Default: StoryObj<typeof meta> = {};
