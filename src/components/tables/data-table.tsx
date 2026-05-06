"use client";

import {
  Table,
  TableBody,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Pagination from "@/components/pagination";
import { cn } from "@/lib/utils";

type DataTableProps<T> = {
  data: T[];
  headers: React.ReactNode;
  row: (row: T, index: number) => React.ReactNode;
  tableClassName?: string;
  isBorder?: boolean;
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
  tableClassName,
  isBorder = true,
  pagination,
  showPagination = true,
}: DataTableProps<T>) {
  if (data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-border bg-white py-20 shadow-sm">
        <p className="text-sm font-medium text-slate-400">No data found.</p>
      </div>
    );
  }

  return (
    <div className={`flex h-full flex-col justify-between overflow-hidden bg-white shadow-sm${isBorder ? "rounded-2xl border border-border" : "border border-border"}`}>
      <div className="overflow-x-auto">
        <Table className={cn(tableClassName)}>
          <TableHeader>
            <TableRow className="hover:bg-transparent">{headers}</TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item, index) => (
              <TableRow key={index}>{row(item, index)}</TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {showPagination && pagination ? <Pagination {...pagination} /> : null}
    </div>
  );
}
