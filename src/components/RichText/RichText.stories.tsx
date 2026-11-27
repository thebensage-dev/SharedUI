import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { RichText } from "./RichText.tsx";

const text = (t: string, format = 0) => ({ type: "text", text: t, format });

const meta = {
  title: "Components/RichText",
  component: RichText,
  parameters: { layout: "padded" },
  args: {
    className: "max-w-prose space-y-4 leading-relaxed text-foreground-muted",
    data: {
      root: {
        children: [
          {
            type: "paragraph",
            children: [
              text("Rich text from the CMS: "),
              text("bold", 1),
              text(", "),
              text("inline code", 16),
              text(" and a "),
              { type: "link", fields: { url: "https://example.com" }, children: [text("link")] },
              text("."),
            ],
          },
          {
            type: "list",
            listType: "bullet",
            children: [
              { type: "listitem", children: [text("A bullet")] },
              { type: "listitem", children: [text("Another")] },
            ],
          },
        ],
      },
    },
  },
} satisfies Meta<typeof RichText>;

export default meta;
export const Default: StoryObj<typeof meta> = {};
