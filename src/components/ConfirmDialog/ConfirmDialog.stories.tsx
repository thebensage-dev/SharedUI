import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { LogOut } from "lucide-react";
import { useState } from "react";
import { ConfirmDialog } from "./ConfirmDialog.tsx";

const meta = {
  title: "Components/ConfirmDialog",
  component: ConfirmDialog,
  args: {
    open: false,
    title: "Delete Ada Lovelace?",
    description: "This removes their profile for good.",
    onConfirm: () => {},
    onCancel: () => {},
  },
  argTypes: { open: { control: false }, icon: { control: false } },
  render: function Render(args) {
    const [open, setOpen] = useState(false);
    const [busy, setBusy] = useState(false);
    const confirm = () => {
      setBusy(true);
      setTimeout(() => {
        setBusy(false);
        setOpen(false);
      }, 1000);
    };
    return (
      <>
        <button type="button" className="btn btn-danger-outline" onClick={() => setOpen(true)}>
          Open dialog
        </button>
        <ConfirmDialog
          {...args}
          open={open}
          busy={busy}
          onConfirm={confirm}
          onCancel={() => setOpen(false)}
        />
      </>
    );
  },
} satisfies Meta<typeof ConfirmDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const CustomIcon: Story = {
  args: {
    title: "Sign out?",
    description: "You'll need to sign in again.",
    icon: LogOut,
    confirmLabel: "Sign out",
    busyLabel: "Signing out…",
  },
};
