import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useId, useState } from "react";
import { Modal } from "./Modal.tsx";

const meta = {
  title: "Components/Modal",
  component: Modal,
  args: { open: false, onClose: () => {}, labelledBy: "", size: "md", children: null },
  argTypes: { children: { control: false }, open: { control: false } },
  render: function Render(args) {
    const [open, setOpen] = useState(false);
    const titleId = useId();
    return (
      <>
        <button type="button" className="btn btn-primary" onClick={() => setOpen(true)}>
          Open modal
        </button>
        <Modal {...args} open={open} onClose={() => setOpen(false)} labelledBy={titleId}>
          <div className="p-6">
            <h2 id={titleId} className="text-lg font-semibold">
              A native dialog
            </h2>
            <p className="mt-2 text-sm text-foreground-muted">
              Escape, the backdrop or the button closes it. Focus is trapped by the browser.
            </p>
            <div className="mt-6 flex justify-end">
              <button type="button" className="btn btn-secondary" onClick={() => setOpen(false)}>
                Close
              </button>
            </div>
          </div>
        </Modal>
      </>
    );
  },
} satisfies Meta<typeof Modal>;

export default meta;
export const Default: StoryObj<typeof meta> = {};
