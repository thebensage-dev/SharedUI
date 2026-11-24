import { render, screen } from "@testing-library/react";
import { KeyRound } from "lucide-react";
import { describe, expect, it } from "vitest";
import { StepTimeline } from "./StepTimeline.tsx";

const steps = [
  { icon: KeyRound, actor: "You", title: "Sign up", description: "Once." },
  { icon: KeyRound, actor: "Me", title: "Approve", description: "By hand." },
];

describe("StepTimeline", () => {
  it("shows the count and actor for each step", () => {
    render(<StepTimeline label="Access" steps={steps} />);
    expect(screen.getByRole("list", { name: "Access" })).toBeInTheDocument();
    expect(screen.getByText("Step 1 of 2")).toBeInTheDocument();
    expect(screen.getByText("Step 2 of 2")).toBeInTheDocument();
    expect(screen.getByText("Me")).toHaveClass("tag-tone");
  });

  it("takes a custom count label", () => {
    render(<StepTimeline label="Access" steps={steps} countLabel={(n, t) => `${n}/${t}`} />);
    expect(screen.getByText("2/2")).toBeInTheDocument();
  });

  it("numbers the tiles when steps have no icon, actor or count", () => {
    render(
      <StepTimeline
        label="How it works"
        countLabel={false}
        steps={[
          { title: "Read", description: "From the API." },
          { title: "Write", description: "Through actions." },
        ]}
      />,
    );
    expect(screen.queryByText(/Step \d/)).toBeNull();
    const items = screen.getAllByRole("listitem");
    expect(items[1]).toHaveTextContent(/^2Write/);
    expect(items[0]!.querySelectorAll(".tag")).toHaveLength(0);
  });
});
