import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useRef, useState } from "react";
import { useShortcut } from "../../hooks/useShortcut.ts";
import { SearchBox } from "./SearchBox.tsx";

const meta = {
  title: "Components/SearchBox",
  component: SearchBox,
  args: { value: "", onChange: () => {}, placeholder: "Search by name or email" },
  argTypes: { value: { control: false } },
  render: function Render(args) {
    const [value, setValue] = useState("");
    const ref = useRef<HTMLInputElement>(null);
    // Pair it with useShortcut so "/" focuses the box, as the hint suggests.
    useShortcut("/", () => ref.current?.focus());
    return <SearchBox {...args} ref={ref} value={value} onChange={setValue} className="w-80" />;
  },
} satisfies Meta<typeof SearchBox>;

export default meta;

/** Press "/" to focus, Escape to clear, Escape again to leave. */
export const Default: StoryObj<typeof meta> = {};
