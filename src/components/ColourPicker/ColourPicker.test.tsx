import { fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { DEFAULT_COLOURS } from "../../lib/theme.ts";
import { ColourPicker } from "./ColourPicker.tsx";

afterEach(() => {
  for (const role of ["primary", "secondary", "accent"])
    delete document.documentElement.dataset[role];
});

const group = (name: string) => within(screen.getByRole("group", { name: new RegExp(`^${name}`) }));

describe("ColourPicker", () => {
  it("picks each role on its own", () => {
    const onChange = vi.fn();
    render(
      <ColourPicker initialColours={DEFAULT_COLOURS} onChange={onChange} cookieName="ui-colours" />,
    );

    expect(group("Primary").getByRole("radio", { name: "Blue" })).toBeChecked();
    expect(group("Presets").getByRole("radio", { name: "Brand" })).toBeChecked();

    fireEvent.click(group("Secondary").getByRole("radio", { name: "Violet" }));
    expect(document.documentElement.dataset.secondary).toBe("violet");
    expect(document.documentElement.dataset.primary).toBeUndefined();
    expect(document.cookie).toContain("ui-colours=blue.violet.yellow");
    expect(onChange).toHaveBeenCalledWith({
      primary: "blue",
      secondary: "violet",
      accent: "yellow",
    });
    expect(group("Presets").getByRole("radio", { name: "Brand" })).not.toBeChecked();
  });

  it("sets all three from a preset", () => {
    render(<ColourPicker initialColours={DEFAULT_COLOURS} cookieName="ui-colours" />);

    fireEvent.click(group("Presets").getByRole("radio", { name: "Ocean" }));
    expect(document.documentElement.dataset).toMatchObject({
      primary: "teal",
      secondary: "sky",
      accent: "mint",
    });
    expect(group("Primary").getByRole("radio", { name: "Teal" })).toBeChecked();
    expect(group("Accent").getByRole("radio", { name: "Mint" })).toBeChecked();
  });
});
