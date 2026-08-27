"use client";

import { Children } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Pagination from "@/components/pagination";
import { cn } from "@/lib/utils";

type DataTableProps<T> = {
  data: T[];
  headers: React.ReactNode;
  row: (row: T, index: number) => React.ReactNode;
  getRowClassName?: (row: T, index: number) => string | undefined;
  onRowClick?: (row: T, index: number) => void;
  tableClassName?: string;
  containerClassName?: string;
  isBorder?: boolean;
  loading?: boolean;
  skeletonRows?: number;
  pagination?: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNext: boolean;
    hasPrevious: boolean;
    onPageChange?: (page: number) => void;
  };
  showPagination?: boolean;
};

export function DataTable<T>({
  data,
  headers,
  row,
  getRowClassName,
  onRowClick,
  tableClassName,
  containerClassName,
  isBorder = true,
  loading = false,
  skeletonRows,
  pagination,
  showPagination = true,
}: DataTableProps<T>) {
  const columnCount = Children.count(headers);
  const rowCount = skeletonRows ?? pagination?.limit ?? 5;

  const resolvedContainerClassName = cn(
    "flex h-full flex-col justify-between overflow-hidden bg-white shadow-sm",
    isBorder ? "rounded-2xl border border-border" : "",
    containerClassName,
  );

  if (!loading && data.length === 0) {
    return (
      <div className={cn(resolvedContainerClassName, "items-center justify-center py-20")}>
        <p className="text-sm font-medium text-slate-400">No data found.</p>
      </div>
    );
  }

  return (
    <div className={resolvedContainerClassName}>
      <div className="overflow-x-auto">
        <Table className={cn(tableClassName)}>
          <TableHeader>
            <TableRow className="hover:bg-transparent">{headers}</TableRow>
          </TableHeader>
          <TableBody>
            {loading
              ? Array.from({ length: rowCount }).map((_, rowIndex) => (
                  <TableRow key={`skeleton-${rowIndex}`} className="hover:bg-transparent">
                    {Array.from({ length: columnCount }).map((_, cellIndex) => (
                      <TableCell key={cellIndex}>
                        <div className="h-3 w-full max-w-35 animate-pulse rounded-full bg-slate-100" />
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              : data.map((item, index) => (
                  <TableRow
                    key={index}
                    className={cn(onRowClick && "cursor-pointer", getRowClassName?.(item, index))}
                    onClick={() => onRowClick?.(item, index)}
                  >
                    {row(item, index)}
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </div>
      {showPagination && pagination ? <Pagination {...pagination} /> : null}
    </div>
  );
}
