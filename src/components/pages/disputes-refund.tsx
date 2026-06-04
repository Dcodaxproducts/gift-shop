"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, RefreshCw } from "lucide-react";
import PageHeader from "@/components/common/page-header";
import { FilterSection } from "@/components/common/filter-section";
import { DisputeRefundStatsCard } from "@/components/cards/DisputeRefundStatsCard";
import { DataTable } from "@/components/tables/data-table";
import { Button } from "@/components/ui/button";
import { TableCell, TableHead } from "@/components/ui/table";
import {
  disputeRefundCases,
  type DisputeRefundCase,
  type DisputeRefundPriority,
  type DisputeRefundStatus,
} from "@/constants/disputes-refund";
import { disputeRefundCategoryOptions, disputeRefundStatusOptions } from "@/constants/filter-options";
import { StatusBadge } from "@/utils/status";

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

export function DisputesRefundPage() {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [status, setStatus] = useState<DisputeRefundStatus | "all">("all");
  const limit = 10;

  const filteredCases = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return disputeRefundCases.filter((item) => {
      const matchesSearch =
        normalizedSearch.length === 0 ||
        item.id.toLowerCase().includes(normalizedSearch) ||
        item.customerName.toLowerCase().includes(normalizedSearch) ||
        item.customerEmail.toLowerCase().includes(normalizedSearch) ||
        item.transactionId.toLowerCase().includes(normalizedSearch);

      const matchesCategory = category === "all" || item.category === category;
      const matchesStatus = status === "all" || item.status === status;

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [category, search, status]);

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const handleCategoryChange = (value: string) => {
    setCategory(value);
    setPage(1);
  };

  const handleStatusChange = (value: string) => {
    setStatus(value as DisputeRefundStatus | "all");
    setPage(1);
  };

  return (
    <div className="space-y-5">
      <PageHeader
        title="Dispute & Refund Cases"
        description="Manage, review, and resolve customer disputes within allowed limits."
        actions={
          <>
            <Button variant="outline">
              <RefreshCw className="size-3.5" />
              Refresh Queue
            </Button>
            <Button>
              <Eye className="size-3.5" />
              Review Case
            </Button>
          </>
        }
      />

      <DisputeRefundStatsCard />

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
        data={filteredCases}
        pagination={{
          total: 1284,
          page,
          limit,
          totalPages: 128,
          hasNext: page < 128,
          hasPrevious: page > 1,
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
        row={(item: DisputeRefundCase) => (
          <>
            <TableCell className="font-semibold text-primary">{item.id}</TableCell>
            <TableCell>
              <div className="space-y-1">
                <p className="font-semibold">{item.customerName}</p>
                <p className="text-xs text-slate-400">{item.customerEmail}</p>
              </div>
            </TableCell>
            <TableCell className="text-slate-500">{item.transactionId}</TableCell>
            <TableCell className="font-semibold">{formatCurrency(item.amount)}</TableCell>
            <TableCell>{StatusBadge({ status: item.status })}</TableCell>
            <TableCell className="font-medium">{item.daysOpen} days</TableCell>
            <TableCell className="text-right">
              <Button
                variant="ghost"
                className="text-primary" 
                onClick={() => router.push(`/disputes-refund/${encodeURIComponent(item.id.replace("#", ""))}`)}
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
