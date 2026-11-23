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
}: Props) {
  if (total === 0) return null;

  return (
    <nav
      aria-label="Pagination"
      className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-between"
    >
      <p className="text-sm text-foreground-muted" aria-live="polite">
        Showing{" "}
        <strong className="font-medium text-foreground">
          {from === to ? from : `${from}–${to}`}
        </strong>{" "}
        of <strong className="font-medium text-foreground">{total}</strong>
      </p>

      {pageCount > 1 && (
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => onPageChange(page - 1)}
            disabled={page <= 1}
            aria-label="Previous page"
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
                aria-label={`Page ${p}`}
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
            aria-label="Next page"
            className="page-btn"
          >
            <ChevronRight className="size-4" />
          </button>
        </div>
      )}

      <label className="flex items-center gap-2 text-sm text-foreground-muted">
        Per page
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
