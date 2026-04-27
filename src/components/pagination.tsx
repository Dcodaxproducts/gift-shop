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

export default function Pagination({
  total,
  page,
  limit,
  totalPages,
  hasNext,
  hasPrevious,
  onPageChange,
}: PaginationProps) {
  const start = (page - 1) * limit + 1;
  const end = Math.min(page * limit, total);
  const pages = [1, 2, 3];

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
        {pages.map((item) => (
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
        ))}
        <span className="px-1 text-slate-300">...</span>
        <button
          type="button"
          onClick={() => onPageChange?.(totalPages)}
          className="flex size-8 items-center justify-center rounded-xl border border-border text-xs font-semibold transition hover:border-primary hover:text-primary"
        >
          {totalPages}
        </button>
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
