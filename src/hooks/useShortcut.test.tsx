import { fireEvent, render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { useShortcut } from "./useShortcut.ts";

function Harness({ onKey }: { onKey: () => void }) {
  useShortcut("n", onKey);
  return <input aria-label="field" />;
}

describe("useShortcut", () => {
  it("fires on the key, but not while typing or with modifiers", () => {
    const onKey = vi.fn();
    const { getByLabelText } = render(<Harness onKey={onKey} />);

    fireEvent.keyDown(window, { key: "N" });
    expect(onKey).toHaveBeenCalledTimes(1);

    fireEvent.keyDown(window, { key: "n", ctrlKey: true });
    fireEvent.keyDown(getByLabelText("field"), { key: "n" });
    expect(onKey).toHaveBeenCalledTimes(1);
  });
});
