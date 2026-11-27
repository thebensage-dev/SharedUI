import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Figure } from "../Figure/Figure.tsx";
import { MediaText } from "./MediaText.tsx";

const IMAGE =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400"><rect width="600" height="400" fill="#dfe4ea"/></svg>',
  );

const meta = {
  title: "Components/MediaText",
  component: MediaText,
  parameters: { layout: "padded" },
  args: {
    media: <Figure src={IMAGE} alt="A placeholder" width={600} height={400} />,
    mediaSide: "left",
    children: (
      <>
        <h2 className="title-section">A heading</h2>
        <p className="mt-content text-foreground-muted">Text beside the image.</p>
      </>
    ),
  },
  argTypes: {
    mediaSide: { control: "radio", options: ["left", "right"] },
    media: { control: false },
    children: { control: false },
  },
} satisfies Meta<typeof MediaText>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Left: Story = {};
export const Right: Story = { args: { mediaSide: "right" } };
