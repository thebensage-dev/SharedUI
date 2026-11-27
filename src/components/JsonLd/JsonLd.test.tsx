import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { JsonLd } from "./JsonLd.tsx";

describe("JsonLd", () => {
  it("writes the data as JSON that cannot close its script tag", () => {
    const { container } = render(<JsonLd data={{ name: "</script><b>" }} />);
    const script = container.querySelector("script");
    expect(script).toHaveAttribute("type", "application/ld+json");
    expect(script?.innerHTML).not.toContain("</script>");
    expect(JSON.parse(script!.innerHTML)).toEqual({ name: "</script><b>" });
  });
});
