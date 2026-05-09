"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

type PaginationProps = {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
  onPageChange?: (page: number) => void;
};

const SIBLING_COUNT = 1;
const BOUNDARY_COUNT = 1;
const ELLIPSIS = "ellipsis" as const;

type PageItem = number | typeof ELLIPSIS;

function range(start: number, end: number): number[] {
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

function getPageItems(currentPage: number, totalPages: number): PageItem[] {
  const totalNumbersToShow = SIBLING_COUNT * 2 + BOUNDARY_COUNT * 2 + 3;

  if (totalPages <= totalNumbersToShow) {
    return range(1, totalPages);
  }

  const startPages = range(1, BOUNDARY_COUNT);
  const endPages = range(totalPages - BOUNDARY_COUNT + 1, totalPages);
  const siblingsStart = Math.max(currentPage - SIBLING_COUNT, BOUNDARY_COUNT + 2);
  const siblingsEnd = Math.min(currentPage + SIBLING_COUNT, totalPages - BOUNDARY_COUNT - 1);

  const items: PageItem[] = [...startPages];

  if (siblingsStart > BOUNDARY_COUNT + 2) {
    items.push(ELLIPSIS);
  } else if (BOUNDARY_COUNT + 1 < totalPages - BOUNDARY_COUNT) {
    items.push(BOUNDARY_COUNT + 1);
  }

  items.push(...range(siblingsStart, siblingsEnd));

  if (siblingsEnd < totalPages - BOUNDARY_COUNT - 1) {
    items.push(ELLIPSIS);
  } else if (totalPages - BOUNDARY_COUNT > BOUNDARY_COUNT + 1) {
    items.push(totalPages - BOUNDARY_COUNT);
  }

  items.push(...endPages);
  return items;
}

export default function Pagination({
  total,
  page,
  limit,
  totalPages,
  hasNext,
  hasPrevious,
  onPageChange,
}: PaginationProps) {
  if (total === 0) return null;

  const safeTotalPages = Math.max(totalPages, 1);
  const start = (page - 1) * limit + 1;
  const end = Math.min(page * limit, total);
  const items = getPageItems(page, safeTotalPages);

  return (
    <div className="flex flex-col gap-3 border-t border-border px-5 py-4 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
      <p>
        Showing <span className="font-semibold text-slate-700">{start}</span> to{" "}
        <span className="font-semibold text-slate-700">{end}</span> of{" "}
        <span className="font-semibold text-slate-700">{total.toLocaleString()}</span> results
      </p>
      <div className="flex items-center gap-2">
        <button
          type="button"
          disabled={!hasPrevious}
          onClick={() => onPageChange?.(page - 1)}
          className="flex size-8 items-center justify-center rounded-xl border border-border text-slate-400 transition hover:border-primary hover:text-primary disabled:opacity-40"
        >
          <ChevronLeft className="size-4" />
        </button>
        {items.map((item, index) =>
          item === ELLIPSIS ? (
            <span key={`ellipsis-${index}`} className="px-1 text-slate-300">
              ...
            </span>
          ) : (
            <button
              key={item}
              type="button"
              onClick={() => onPageChange?.(item)}
              className={cn(
                "flex size-8 items-center justify-center rounded-xl border border-border text-xs font-semibold transition hover:border-primary hover:text-primary",
                item === page && "border-primary bg-primary text-white hover:text-white",
              )}
            >
              {item}
            </button>
          ),
        )}
        <button
          type="button"
          disabled={!hasNext}
          onClick={() => onPageChange?.(page + 1)}
          className="flex size-8 items-center justify-center rounded-xl border border-border text-slate-400 transition hover:border-primary hover:text-primary disabled:opacity-40"
        >
          <ChevronRight className="size-4" />
        </button>
      </div>
    </div>
  );
}
