"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, ShieldCheck } from "lucide-react";
import { DataTable } from "@/components/tables/data-table";
import { Input } from "@/components/ui/input";
import { TableCell, TableHead } from "@/components/ui/table";
import { StatusBadge } from "@/utils/status";
import { useProviderItems } from "@/hooks/useProviders";
import MyImage from "@/components/common/MyImage";
import { useDebounce } from "@/hooks/useDebounce";
import type { ProviderItem } from "@/types/providers";

function ProviderItemsTable({ providerId }: { providerId: string }) {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 400);

  const limit = 10;
  const { data: items = [], isLoading } = useProviderItems(providerId, {
    page,
    limit,
    ...(debouncedSearch ? { search: debouncedSearch } : {}),
  });

  const hasNextPage = items.length === limit;
  const pagination = {
    total: (page - 1) * limit + items.length + (hasNextPage ? 1 : 0),
    page,
    limit,
    totalPages: page + (hasNextPage ? 1 : 0),
    hasNext: hasNextPage,
    hasPrevious: page > 1,
  };

  return (
    <div className="overflow-hidden border border-slate-200 rounded-2xl">
      <div className="flex flex-col gap-3 rounded-t-2xl bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-sm font-semibold ">Listed Items</h2>
        <div className="flex items-center gap-2">
          <Input
            type="search"
            placeholder="Search products..."
            leftIcon={<Search className="size-4" />}
            className="h-9! w-full rounded-full bg-slate-50 text-xs sm:w-55"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <DataTable
        data={items}
        loading={isLoading}
        pagination={{
          total: pagination.total,
          page: pagination.page,
          limit: pagination.limit,
          totalPages: pagination.totalPages,
          hasNext: pagination.hasNext,
          hasPrevious: pagination.hasPrevious,
          onPageChange: setPage,
        }}
        isBorder={false}
        showPagination={page > 1 || hasNextPage}
        onRowClick={(item: ProviderItem) => router.push(`/product/${item.id}/details`)}
        headers={
          <>
            <TableHead>Product Name</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Sales Data</TableHead>
            <TableHead>Status</TableHead>
          </>
        }
        row={(item: ProviderItem) => (
          <>
            <TableCell>
              <div className="flex items-center gap-3">
                {item.imageUrl ? (
                  <MyImage
                    src="/fallback.png"
                    alt={item.name}
                    className="size-8 rounded-full object-cover"
                    width={32}
                    height={32}
                  />
                ) : (
                  <span className="flex size-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <ShieldCheck className="size-3.5" strokeWidth={2.5} />
                  </span>
                )}
                <span className="text-xs font-semibold ">{item.name}</span>
              </div>
            </TableCell>
            <TableCell className="text-xs font-semibold">
              ${item.price.toFixed(2)}
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2 text-[10px] font-semibold ">
                <span>{item.salesCount} units</span>
                <span>{item.salesPercentage}%</span>
              </div>
              <div className="mt-1 h-1.5 w-20 overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-primary"
                  style={{ width: `${item.salesPercentage}%` }}
                />
              </div>
            </TableCell>
            <TableCell>
              <StatusBadge status={item.status} />
            </TableCell>
          </>
        )}
      />
    </div>
  );
}

export default ProviderItemsTable;
