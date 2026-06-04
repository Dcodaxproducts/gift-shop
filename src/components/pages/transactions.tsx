"use client";

import { useMemo, useState } from "react";
import { CalendarDays, Download, Eye } from "lucide-react";
import { useRouter } from "next/navigation";
import { TransactionStatsCard } from "@/components/cards/TransactionStatsCard";
import { DataTable } from "@/components/tables/data-table";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TableCell, TableHead } from "@/components/ui/table";
import { getInitials } from "@/utils/getInitials";
import { cn } from "@/lib/utils";
import PageHeader from "../common/page-header";
import { StatusBadge } from "@/utils/status";

type TransactionStatus = "success" | "pending" | "failed";

type TransactionItem = {
  id: string;
  user: string;
  provider: string;
  type: "Payment" | "Gift" | "Withdrawal";
  amount: string;
  status: TransactionStatus;
  date: string;
};

const dateRangeOptions = [
  { value: "all", label: "Date Range" },
  { value: "today", label: "Today" },
  { value: "week", label: "This Week" },
  { value: "month", label: "This Month" },
] as const;

const typeOptions = [
  { value: "all", label: "Transaction Type" },
  { value: "Payment", label: "Payment" },
  { value: "Gift", label: "Gift" },
  { value: "Withdrawal", label: "Withdrawal" },
] as const;

const statusOptions = [
  { value: "all", label: "Status" },
  { value: "success", label: "Success" },
  { value: "pending", label: "Pending" },
  { value: "failed", label: "Failed" },
] as const;

const transactions: TransactionItem[] = [
  {
    id: "#TXN-882194",
    user: "Sarah Jenkins",
    provider: "Stripe",
    type: "Payment",
    amount: "$1,250.00",
    status: "success",
    date: "Oct 24, 2026 - 14:20",
  },
  {
    id: "#TXN-882195",
    user: "Marcus Thorne",
    provider: "PayPal",
    type: "Gift",
    amount: "$50.00",
    status: "pending",
    date: "Oct 24, 2026 - 14:20",
  },
  {
    id: "#TXN-882196",
    user: "Emma Vane",
    provider: "Bank Transfer",
    type: "Withdrawal",
    amount: "$3,400.00",
    status: "failed",
    date: "Oct 24, 2026 - 14:20",
  },
  {
    id: "#TXN-882197",
    user: "Liam Cooper",
    provider: "Internal",
    type: "Gift",
    amount: "$150.00",
    status: "success",
    date: "Oct 24, 2026 - 14:20",
  },
  {
    id: "#TXN-882198",
    user: "Sophia West",
    provider: "Stripe",
    type: "Payment",
    amount: "$89.99",
    status: "success",
    date: "Oct 24, 2026 - 14:20",
  },
  {
    id: "#TXN-882199",
    user: "Noah Blake",
    provider: "PayPal",
    type: "Gift",
    amount: "$75.00",
    status: "pending",
    date: "Oct 23, 2026 - 11:40",
  },
  {
    id: "#TXN-882200",
    user: "Mia Stone",
    provider: "Stripe",
    type: "Payment",
    amount: "$310.00",
    status: "success",
    date: "Oct 23, 2026 - 10:18",
  },
];

const statusClasses = {
  success: "bg-emerald-50 text-emerald-600",
  pending: "bg-amber-50 text-amber-600",
  failed: "bg-rose-50 text-rose-600",
};

function TransactionsFilters({
  dateRange,
  type,
  status,
  onDateRangeChange,
  onTypeChange,
  onStatusChange,
}: {
  dateRange: string;
  type: string;
  status: string;
  onDateRangeChange: (value: string) => void;
  onTypeChange: (value: string) => void;
  onStatusChange: (value: string) => void;
}) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="grid gap-3 sm:flex">
        <Select value={dateRange} onValueChange={onDateRangeChange}>
          <SelectTrigger className="h-9 rounded-xl bg-white text-xs sm:w-[130px]">
            <CalendarDays className="size-3.5 text-slate-500" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {dateRangeOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={type} onValueChange={onTypeChange}>
          <SelectTrigger className="h-9 rounded-xl bg-white text-xs sm:w-[160px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {typeOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={status} onValueChange={onStatusChange}>
          <SelectTrigger className="h-9 rounded-xl bg-white text-xs sm:w-[120px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {statusOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Button className="h-9 rounded-xl">
        <Download className="size-3.5" />
        Export Report
      </Button>
    </div>
  );
}

function TransactionStatusBadge({ status }: { status: TransactionStatus }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-bold uppercase",
        statusClasses[status],
      )}
    >
      <span className="mr-1.5 size-1.5 rounded-full bg-current" />
      {status}
    </span>
  );
}

function TransactionsTable({
  data,
  page,
  limit,
  total,
  onPageChange,
}: {
  data: TransactionItem[];
  page: number;
  limit: number;
  total: number;
  onPageChange: (page: number) => void;
}) {
  const router = useRouter();
  const totalPages = Math.max(Math.ceil(total / limit), 1);

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-white shadow-sm">
      <DataTable
        data={data}
        isBorder={false}
        containerClassName="rounded-none border-0 shadow-none"
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
            <TableHead>Transaction ID</TableHead>
            <TableHead>User</TableHead>
            <TableHead>Provider</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </>
        }
        row={(item: TransactionItem) => (
          <>
            <TableCell className="font-medium text-slate-700">{item.id}</TableCell>
            <TableCell>
              <div className="flex items-center gap-3">
                <span className="flex size-8 items-center justify-center rounded-full bg-primary/10 text-[10px] font-bold text-primary">
                  {getInitials(item.user)}
                </span>
                <span className="font-semibold text-slate-900">{item.user}</span>
              </div>
            </TableCell>
            <TableCell className="text-slate-600">{item.provider}</TableCell>
            <TableCell>
              <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-medium text-slate-600">
                {item.type}
              </span>
            </TableCell>
            <TableCell className="font-bold text-primary">{item.amount}</TableCell>
            <TableCell>
              <StatusBadge status={item.status} />
            </TableCell>
            <TableCell className="max-w-24 text-slate-500">{item.date}</TableCell>
            <TableCell>
              <div className="flex items-center justify-end">
                <Button
                  variant="ghost"
                  className="size-9 rounded-full text-primary hover:bg-primary/10"
                  onClick={() => router.push("/disputes-refund/DIS-9842")}
                >
                  <Eye className="size-4" />
                </Button>
              </div>
            </TableCell>
          </>
        )}
      />
    </div>
  );
}

export function TransactionsPage() {
  const [page, setPage] = useState(1);
  const [dateRange, setDateRange] = useState("all");
  const [type, setType] = useState("all");
  const [status, setStatus] = useState("all");
  const limit = 5;

  const filteredTransactions = useMemo(() => {
    return transactions.filter((transaction) => {
      const matchesType = type === "all" || transaction.type === type;
      const matchesStatus = status === "all" || transaction.status === status;

      return matchesType && matchesStatus;
    });
  }, [status, type]);

  const paginatedTransactions = filteredTransactions.slice(
    (page - 1) * limit,
    page * limit,
  );

  const resetPage = (callback: (value: string) => void) => (value: string) => {
    callback(value);
    setPage(1);
  };

  return (
    <div className="space-y-5">
      <PageHeader
        title="Transaction Monitoring"
        actions={
          <Button>
            <Download className="mr-2 size-3.5" />
            Export Report
          </Button>
        }
      />

      <TransactionStatsCard />

      <TransactionsTable
        data={paginatedTransactions}
        page={page}
        limit={limit}
        total={filteredTransactions.length}
        onPageChange={setPage}
      />
    </div>
  );
}
