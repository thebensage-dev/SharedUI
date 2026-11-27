import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Pagination, pageList } from "./Pagination.tsx";

const props = {
  from: 13,
  to: 24,
  total: 30,
  pageSize: 12,
  pageSizes: [12, 24],
  onPageSizeChange: vi.fn(),
};

describe("pageList", () => {
  it("lists every page when there are few, and adds gaps when there are many", () => {
    expect(pageList(1, 5)).toEqual([1, 2, 3, 4, 5]);
    expect(pageList(5, 10)).toEqual([1, "…", 4, 5, 6, "…", 10]);
    expect(pageList(2, 10)).toEqual([1, 2, 3, "…", 10]);
    // A gap of exactly one page shows the page rather than "…".
    expect(pageList(4, 10)).toEqual([1, 2, 3, 4, 5, "…", 10]);
  });
});

describe("Pagination", () => {
  it("shows the range, marks the current page and moves between pages", () => {
    const onPageChange = vi.fn();
    render(<Pagination {...props} page={2} pageCount={3} onPageChange={onPageChange} />);

    expect(screen.getByText("13–24")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Page 2" })).toHaveAttribute("aria-current", "page");
    fireEvent.click(screen.getByRole("button", { name: "Next page" }));
    expect(onPageChange).toHaveBeenLastCalledWith(3);
    fireEvent.click(screen.getByRole("button", { name: "Page 1" }));
    expect(onPageChange).toHaveBeenLastCalledWith(1);
  });

  it("disables Previous on the first page and hides page buttons for a single page", () => {
    const { rerender } = render(
      <Pagination {...props} page={1} pageCount={3} onPageChange={vi.fn()} />,
    );
    expect(screen.getByRole("button", { name: "Previous page" })).toBeDisabled();

    rerender(
      <Pagination
        {...props}
        from={1}
        to={5}
        total={5}
        page={1}
        pageCount={1}
        onPageChange={vi.fn()}
      />,
    );
    expect(screen.queryByRole("button", { name: "Next page" })).not.toBeInTheDocument();
  });

  it("changes the page size", () => {
    render(<Pagination {...props} page={1} pageCount={3} onPageChange={vi.fn()} />);
    fireEvent.change(screen.getByLabelText("Per page"), { target: { value: "24" } });
    expect(props.onPageSizeChange).toHaveBeenCalledWith(24);
  });
});

describe("Pagination labels", () => {
  it("uses the app's wording when given", () => {
    render(
      <Pagination
        {...props}
        page={2}
        pageCount={3}
        onPageChange={vi.fn()}
        labels={{
          nav: "Pages",
          showing: "Rows",
          of: "out of",
          page: "Go to {page}",
          next: "Onward",
        }}
      />,
    );
    expect(screen.getByRole("navigation", { name: "Pages" })).toBeInTheDocument();
    expect(screen.getByText(/Rows/)).toHaveTextContent("Rows 13–24 out of 30");
    expect(screen.getByRole("button", { name: "Go to 2" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Onward" })).toBeInTheDocument();
    // Labels left out keep their defaults.
    expect(screen.getByRole("button", { name: "Previous page" })).toBeInTheDocument();
  });
});
