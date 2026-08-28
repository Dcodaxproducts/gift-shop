"use client";

import { useState } from "react";
import { Download } from "lucide-react";
import PageHeader from "@/components/common/page-header";
import { FilterSection } from "@/components/common/filter-section";
import { PlatformAnalyticsStatsCard } from "@/components/cards/PlatformAnalyticsStatsCard";
import { DataTable } from "@/components/tables/data-table";
import { Button } from "@/components/ui/button";
import { TableCell, TableHead } from "@/components/ui/table";
import { Can } from "@/components/auth/can";
import { useDebounce } from "@/hooks/useDebounce";
import {
  useExportPlatformAnalyticsReport,
  usePlatformAnalyticsStats,
  useRevenueTransactions,
} from "@/hooks/usePlatformAnalytics";
import type { RevenueTransaction } from "@/types/platform-analytics";
import { formatDate } from "@/utils/formatDate";

function AnalyticsTransactionsTable({
  data,
  loading,
  page,
  limit,
  total,
  totalPages,
  onPageChange,
}: {
  data: RevenueTransaction[];
  loading: boolean;
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) {
  return (
    <div className="rounded-2xl border border-b-0 border-slate-200">
      <div className="flex flex-col gap-3 rounded-t-2xl bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-sm font-semibold">Recent Revenue Transactions</h2>
      </div>

      <DataTable
        data={data}
        loading={loading}
        isBorder={false}
        pagination={{
          total,
          page,
          limit,
          totalPages,
          hasNext: page < totalPages,
          hasPrevious: page > 1,
          onPageChange,
        }}
        headers={
          <>
            <TableHead>User Email</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Provider</TableHead>
            <TableHead>Category</TableHead>
          </>
        }
        row={(item: RevenueTransaction) => (
          <>
            <TableCell className="font-semibold">{item.userEmail}</TableCell>
            <TableCell className="font-medium text-slate-500">
              ${item.amount.toFixed(2)}
            </TableCell>
            <TableCell>{formatDate(item.date)}</TableCell>
            <TableCell>{item.provider.businessName}</TableCell>
            <TableCell>
              <span className="rounded bg-slate-100 px-2 py-1 text-[10px] font-semibold text-slate-700">
                {item.category.name}
              </span>
            </TableCell>
          </>
        )}
      />
    </div>
  );
}

export function PlatformAnalyticsPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const limit = 10;
  const debouncedSearch = useDebounce(search, 400);

  const { data: stats } = usePlatformAnalyticsStats();
  const exportReport = useExportPlatformAnalyticsReport();
  const { data: transactionsResponse, isLoading } = useRevenueTransactions({
    page,
    limit,
    search: debouncedSearch || undefined,
  });

  const transactions = transactionsResponse?.data ?? [];
  const meta = transactionsResponse?.meta ?? {
    page,
    limit,
    total: 0,
    totalPages: 1,
  };

  return (
    <div className="space-y-5">
      <PageHeader
        title="Platform Analytics"
        description="Monitor platform-wide performance metrics and revenue trends."
        actions={
          <Can module="analytics" action="read">
            <Button onClick={() => exportReport.mutate({})} disabled={exportReport.isPending}>
              <Download className="mr-2 size-3.5" />
              {exportReport.isPending ? "Exporting..." : "Export"}
            </Button>
          </Can>
        }
      />

      <PlatformAnalyticsStatsCard data={stats} />

      <FilterSection
        searchPlaceholder="Search transactions by email, provider, or category..."
        searchValue={search}
        onSearchChange={(value) => {
          setSearch(value);
          setPage(1);
        }}
      />

      <AnalyticsTransactionsTable
        data={transactions}
        loading={isLoading}
        page={meta.page}
        limit={meta.limit}
        total={meta.total}
        totalPages={meta.totalPages}
        onPageChange={setPage}
      />
    </div>
  );
}
