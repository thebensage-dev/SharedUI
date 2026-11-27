import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Figure } from "./Figure.tsx";

const IMAGE =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400"><rect width="600" height="400" fill="#dfe4ea"/><path d="M90 320 240 180 350 260 430 200 530 320Z" fill="#9aa4b2"/></svg>',
  );

const meta = {
  title: "Components/Figure",
  component: Figure,
  parameters: { layout: "padded" },
  args: {
    src: IMAGE,
    alt: "A placeholder landscape",
    width: 600,
    height: 400,
    caption: "A caption",
  },
} satisfies Meta<typeof Figure>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const Small: Story = { args: { small: true } };
