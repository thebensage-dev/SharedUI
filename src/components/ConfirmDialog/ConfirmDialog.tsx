"use client";

import { Trash2, type LucideIcon } from "lucide-react";
import { useId } from "react";
import { Modal } from "../Modal/Modal.tsx";

export function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel = "Delete",
  busyLabel = "Deleting…",
  cancelLabel = "Cancel",
  busy = false,
  icon: Icon = Trash2,
  onConfirm,
  onCancel,
}: {
  open: boolean;
  title: string;
  description: React.ReactNode;
  confirmLabel?: string;
  busyLabel?: string;
  cancelLabel?: string;
  busy?: boolean;
  /** Icon in the round badge; a bin by default. */
  icon?: LucideIcon;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  const titleId = useId();

  return (
    <Modal open={open} onClose={() => !busy && onCancel()} labelledBy={titleId} size="sm">
      <div className="p-6">
        <div className="flex gap-4">
          <span className="grid size-10 shrink-0 place-items-center rounded-full bg-danger-soft text-danger-ink">
            <Icon className="size-5" />
          </span>
          <div>
            <h2 id={titleId} className="font-semibold">
              {title}
            </h2>
            <p className="mt-1 text-sm text-foreground-muted">{description}</p>
          </div>
        </div>
        <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <button type="button" onClick={onCancel} disabled={busy} className="btn btn-secondary">
            {cancelLabel}
          </button>
          <button type="button" onClick={onConfirm} disabled={busy} className="btn btn-danger">
            {busy ? busyLabel : confirmLabel}
          </button>
        </div>
      </div>
    </Modal>
  );
}
