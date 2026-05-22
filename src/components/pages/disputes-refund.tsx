"use client";

import { useMemo, useState } from "react";
import { ChevronUp, Eye, RefreshCw, Search } from "lucide-react";
import PageHeader from "@/components/common/page-header";
import { DisputeRefundStatsCard } from "@/components/cards/DisputeRefundStatsCard";
import { DataTable } from "@/components/tables/data-table";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TableCell, TableHead } from "@/components/ui/table";
import {
  disputeRefundCases,
  disputeRefundCategoryOptions,
  disputeRefundStatusOptions,
  type DisputeRefundCase,
  type DisputeRefundPriority,
  type DisputeRefundStatus,
} from "@/constants/disputes-refund";
import { cn } from "@/lib/utils";
import { StatusBadge } from "@/utils/status";

const priorityClassName: Record<DisputeRefundPriority, string> = {
  HIGH: "text-red-600",
  MEDIUM: "text-slate-600",
  LOW: "text-slate-400",
};

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

export function DisputesRefundPage() {
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

      <Card className="p-4">
        <div className="flex flex-col gap-3 xl:flex-row xl:items-center">
          <div className="min-w-0 flex-1">
            <Input
              type="search"
              placeholder="Search by case ID, customer, or transaction..."
              leftIcon={<Search className="size-4" />}
              className="h-10! rounded-2xl bg-white text-xs"
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                setPage(1);
              }}
            />
          </div>

          <div className="grid grid-cols-2 gap-3 sm:flex">
            <Select
              value={category}
              onValueChange={(value) => {
                setCategory(value);
                setPage(1);
              }}
            >
              <SelectTrigger className="h-10 w-full rounded-2xl bg-slate-50 text-xs sm:w-37.5">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                {disputeRefundCategoryOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={status}
              onValueChange={(value) => {
                setStatus(value as DisputeRefundStatus | "all");
                setPage(1);
              }}
            >
              <SelectTrigger className="h-10 w-full rounded-2xl bg-slate-50 text-xs sm:w-32.5">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                {disputeRefundStatusOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

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
            <TableHead>Transaction ID</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Priority</TableHead>
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
                <p className="text-xs font-semibold">{item.customerName}</p>
                <p className="text-[10px] text-slate-400">{item.customerEmail}</p>
              </div>
            </TableCell>
            <TableCell className="text-[10px] font-medium text-slate-500">{item.transactionId}</TableCell>
            <TableCell className="font-semibold">{formatCurrency(item.amount)}</TableCell>
            <TableCell>
              <span className={cn("inline-flex items-center gap-1 text-xs font-semibold", priorityClassName[item.priority])}>
                <ChevronUp className="size-3" />
                {item.priority.charAt(0) + item.priority.slice(1).toLowerCase()}
              </span>
            </TableCell>
            <TableCell>{StatusBadge({ status: item.status })}</TableCell>
            <TableCell className="font-medium">{item.daysOpen} days</TableCell>
            <TableCell className="text-right">
              <Button variant="ghost" className="h-8 px-2 text-[10px] font-semibold text-primary">
                {item.status === "RESOLVED" ? "History" : "Review"}
              </Button>
            </TableCell>
          </>
        )}
      />
    </div>
  );
}
