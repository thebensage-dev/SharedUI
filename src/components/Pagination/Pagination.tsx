"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

export function pageList(current: number, count: number): (number | "…")[] {
  if (count <= 7) return Array.from({ length: count }, (_, i) => i + 1);
  const pages = new Set([1, count, current - 1, current, current + 1]);
  const sorted = [...pages].filter((p) => p >= 1 && p <= count).sort((a, b) => a - b);
  const result: (number | "…")[] = [];
  for (const p of sorted) {
    const prev = result[result.length - 1];
    if (typeof prev === "number" && p - prev > 1) result.push(p - prev === 2 ? prev + 1 : "…");
    result.push(p);
  }
  return result;
}

export type PaginationLabels = {
  /** The `<nav>`'s name. */
  nav: string;
  /** Before the range: "Showing 1–12 of 40". */
  showing: string;
  /** Between the range and the total. */
  of: string;
  previous: string;
  next: string;
  /** A page button's name; `{page}` is its number. */
  page: string;
  perPage: string;
};

const DEFAULT_LABELS: PaginationLabels = {
  nav: "Pagination",
  showing: "Showing",
  of: "of",
  previous: "Previous page",
  next: "Next page",
  page: "Page {page}",
  perPage: "Per page",
};

type Props = {
  page: number;
  pageCount: number;
  from: number;
  to: number;
  total: number;
  pageSize: number;
  pageSizes: readonly number[];
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
  labels?: Partial<PaginationLabels>;
};

export function Pagination({
  page,
  pageCount,
  from,
  to,
  total,
  pageSize,
  pageSizes,
  onPageChange,
  onPageSizeChange,
  labels: labelOverrides,
}: Props) {
  if (total === 0) return null;
  const labels = { ...DEFAULT_LABELS, ...labelOverrides };

  return (
    <nav
      aria-label={labels.nav}
      className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-between"
    >
      <p className="text-sm text-foreground-muted" aria-live="polite">
        {labels.showing}{" "}
        <strong className="font-medium text-foreground">
          {from === to ? from : `${from}–${to}`}
        </strong>{" "}
        {labels.of} <strong className="font-medium text-foreground">{total}</strong>
      </p>

      {pageCount > 1 && (
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => onPageChange(page - 1)}
            disabled={page <= 1}
            aria-label={labels.previous}
            className="page-btn"
          >
            <ChevronLeft className="size-4" />
          </button>
          {pageList(page, pageCount).map((p, i) =>
            p === "…" ? (
              <span key={`gap-${i}`} aria-hidden className="px-1 text-foreground-muted">
                …
              </span>
            ) : (
              <button
                key={p}
                type="button"
                onClick={() => onPageChange(p)}
                aria-current={p === page ? "page" : undefined}
                aria-label={labels.page.replace("{page}", String(p))}
                className="page-btn"
              >
                {p}
              </button>
            ),
          )}
          <button
            type="button"
            onClick={() => onPageChange(page + 1)}
            disabled={page >= pageCount}
            aria-label={labels.next}
            className="page-btn"
          >
            <ChevronRight className="size-4" />
          </button>
        </div>
      )}

      <label className="flex items-center gap-2 text-sm text-foreground-muted">
        {labels.perPage}
        <select
          value={pageSize}
          onChange={(e) => onPageSizeChange(Number(e.target.value))}
          className="input h-9 w-auto"
        >
          {pageSizes.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </label>
    </nav>
  );
}
