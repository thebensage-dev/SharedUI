import { render, screen } from "@testing-library/react";
import { Globe, Rocket, GitBranch } from "lucide-react";
import { describe, expect, it } from "vitest";
import { FlowSteps } from "./FlowSteps.tsx";

describe("FlowSteps", () => {
  it("lists the steps in order under the label, with columns for their count", () => {
    render(
      <FlowSteps
        label="Deploy flow"
        steps={[
          { icon: GitBranch, title: "Push", detail: "To main" },
          { icon: Rocket, title: "Deploy", detail: "Coolify" },
          { icon: Globe, title: "Live", detail: "HTTPS" },
        ]}
      />,
    );
    const list = screen.getByRole("list", { name: "Deploy flow" });
    expect(list.tagName).toBe("OL");
    expect(list).toHaveClass("md:grid-cols-3");
    expect(screen.getAllByRole("listitem").map((li) => li.textContent)).toEqual([
      "PushTo main",
      "DeployCoolify",
      "LiveHTTPS",
    ]);
  });
});
