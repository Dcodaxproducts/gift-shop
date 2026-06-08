"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Download } from "lucide-react";
import PageHeader from "@/components/common/page-header";
import { FilterSection } from "@/components/common/filter-section";
import { DisputeRefundStatsCard } from "@/components/cards/DisputeRefundStatsCard";
import { DataTable } from "@/components/tables/data-table";
import { Button } from "@/components/ui/button";
import { TableCell, TableHead } from "@/components/ui/table";
import { disputeRefundCategoryOptions, disputeRefundStatusOptions } from "@/constants/filter-options";
import { useDebounce } from "@/hooks/useDebounce";
import { useDisputeStats, useDisputes, useExportDisputes } from "@/hooks/useDisputes";
import type { Dispute, DisputeStatus } from "@/types/disputes";
import { StatusBadge } from "@/utils/status";

function formatCurrency(value: number, currency: string) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(value);
}

function getDaysOpen(createdAt: string) {
  const createdDate = new Date(createdAt);

  if (Number.isNaN(createdDate.getTime())) return 0;

  return Math.max(Math.ceil((Date.now() - createdDate.getTime()) / 86400000), 0);
}

export function DisputesRefundPage() {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [status, setStatus] = useState<DisputeStatus | "all">("all");
  const limit = 10;
  const debouncedSearch = useDebounce(search, 400);
  const { data: stats } = useDisputeStats();
  const exportDisputes = useExportDisputes();
  const { data: disputesResponse, isLoading } = useDisputes({
    page,
    limit,
    search: debouncedSearch || undefined,
    category: category === "all" ? undefined : category,
    status: status === "all" ? undefined : status,
  });

  const disputes = disputesResponse?.data ?? [];
  const meta = disputesResponse?.meta ?? {
    page,
    limit,
    total: 0,
    totalPages: 1,
  };

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const handleCategoryChange = (value: string) => {
    setCategory(value);
    setPage(1);
  };

  const handleStatusChange = (value: string) => {
    setStatus(value as DisputeStatus | "all");
    setPage(1);
  };

  return (
    <div className="space-y-5">
      <PageHeader
        title="Dispute & Refund Cases"
        description="Manage, review, and resolve customer disputes within allowed limits."
        actions={
          <Button onClick={() => exportDisputes.mutate()} disabled={exportDisputes.isPending}>
            <Download className="mr-2 size-3.5" />
            {exportDisputes.isPending ? "Exporting..." : "Export"}
          </Button>
        }
      />

      <DisputeRefundStatsCard data={stats} />

      <FilterSection
        searchPlaceholder="Search by case ID, customer, or transaction..."
        searchValue={search}
        onSearchChange={handleSearchChange}
        filters={[
          {
            value: category,
            onChange: handleCategoryChange,
            placeholder: "All Categories",
            width: "sm:w-37.5",
            options: disputeRefundCategoryOptions,
          },
          {
            value: status,
            onChange: handleStatusChange,
            placeholder: "All Status",
            width: "sm:w-32.5",
            options: disputeRefundStatusOptions,
          },
        ]}
      />

      <DataTable
        data={disputes}
        loading={isLoading}
        pagination={{
          total: meta.total,
          page: meta.page,
          limit,
          totalPages: meta.totalPages,
          hasNext: meta.page < meta.totalPages,
          hasPrevious: meta.page > 1,
          onPageChange: setPage,
        }}
        headers={
          <>
            <TableHead>Case ID</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Order ID</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Days Open</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </>
        }
        row={(item: Dispute) => (
          <>
            <TableCell className="font-semibold text-primary">{item.caseId}</TableCell>
            <TableCell>
              <div className="space-y-1">
                <p className="font-semibold">{item.customer.name}</p>
                <p className="text-xs text-slate-400">{item.customer.email}</p>
              </div>
            </TableCell>
            <TableCell className="text-slate-500">{item.transaction.transactionId}</TableCell>
            <TableCell className="font-semibold">{formatCurrency(item.amount, item.currency)}</TableCell>
            <TableCell>{StatusBadge({ status: item.status })}</TableCell>
            <TableCell className="font-medium">{getDaysOpen(item.createdAt)} days</TableCell>
            <TableCell className="text-right">
              <Button
                variant="ghost"
                className="text-primary"
                onClick={() => router.push(`/disputes-refund/${encodeURIComponent(item.id)}`)}
              >
                {item.status === "RESOLVED" ? "History" : "Review"}
              </Button>
            </TableCell>
          </>
        )}
      />
    </div>
  );
}
