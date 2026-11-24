import { render, screen, within } from "@testing-library/react";
import { Search, Filter } from "lucide-react";
import { describe, expect, it } from "vitest";
import { FeatureGrid } from "./FeatureGrid.tsx";

describe("FeatureGrid", () => {
  it("renders a card per feature in turning tones, with tags when given", () => {
    render(
      <FeatureGrid
        columns={2}
        tagsLabel="Built with"
        features={[
          { icon: Search, title: "Search", description: "Find people." },
          { icon: Filter, title: "Filters", description: "Narrow it down.", tags: ["nuqs", "SQL"] },
        ]}
      />,
    );
    const cards = screen.getAllByRole("heading", { level: 3 }).map((h) => h.closest("li")!);
    expect(cards).toHaveLength(2);
    expect(cards[0]!.className).not.toBe(cards[1]!.className);
    expect(screen.queryAllByRole("list", { name: "Built with" })).toHaveLength(1);
    const tags = within(screen.getByRole("list", { name: "Built with" })).getAllByRole("listitem");
    expect(tags.map((t) => t.textContent)).toEqual(["nuqs", "SQL"]);
    expect(screen.getAllByRole("list")[0]).not.toHaveClass("lg:grid-cols-3");
  });
});
