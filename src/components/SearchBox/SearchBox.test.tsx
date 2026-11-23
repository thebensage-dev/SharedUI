import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { SearchBox } from "./SearchBox.tsx";

describe("SearchBox", () => {
  it("reports typing and clears on Escape or the clear button", () => {
    const onChange = vi.fn();
    const { rerender } = render(<SearchBox value="" onChange={onChange} placeholder="Search" />);
    fireEvent.change(screen.getByRole("searchbox"), { target: { value: "ada" } });
    expect(onChange).toHaveBeenLastCalledWith("ada");

    rerender(<SearchBox value="ada" onChange={onChange} placeholder="Search" />);
    fireEvent.keyDown(screen.getByRole("searchbox"), { key: "Escape" });
    expect(onChange).toHaveBeenLastCalledWith("");

    onChange.mockClear();
    fireEvent.click(screen.getByRole("button", { name: "Clear search" }));
    expect(onChange).toHaveBeenCalledWith("");
  });
});
