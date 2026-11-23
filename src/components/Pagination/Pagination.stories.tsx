import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useState } from "react";
import { Pagination } from "./Pagination.tsx";

const meta = {
  title: "Components/Pagination",
  component: Pagination,
  parameters: { layout: "padded" },
  args: {
    page: 1,
    pageCount: 1,
    from: 1,
    to: 1,
    total: 137,
    pageSize: 12,
    pageSizes: [12, 24, 48],
    onPageChange: () => {},
    onPageSizeChange: () => {},
  },
  argTypes: { page: { control: false }, pageSize: { control: false } },
  render: function Render(args) {
    const [page, setPage] = useState(5);
    const [pageSize, setPageSize] = useState(args.pageSize);
    const pageCount = Math.max(1, Math.ceil(args.total / pageSize));
    const current = Math.min(page, pageCount);
    return (
      <Pagination
        {...args}
        page={current}
        pageCount={pageCount}
        pageSize={pageSize}
        from={(current - 1) * pageSize + 1}
        to={Math.min(current * pageSize, args.total)}
        onPageChange={setPage}
        onPageSizeChange={(size) => {
          setPageSize(size);
          setPage(1);
        }}
      />
    );
  },
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const FewPages: Story = { args: { total: 30 } };
