"use client";

import { useMemo, useState } from "react";
import { Download, MoreVertical } from "lucide-react";
import PageHeader from "@/components/common/page-header";
import { FilterSection } from "@/components/common/filter-section";
import { PlatformAnalyticsStatsCard } from "@/components/cards/PlatformAnalyticsStatsCard";
import { DataTable } from "@/components/tables/data-table";
import { Button } from "@/components/ui/button";
import { TableCell, TableHead } from "@/components/ui/table";
import { Can } from "@/components/auth/can";
import { useDebounce } from "@/hooks/useDebounce";
import { StatusBadge } from "@/utils/status";

type RevenueTransaction = {
  id: string;
  date: string;
  userEmail: string;
  plan: "Pro" | "Enterprise" | "Basic";
  amount: string;
  status: "COMPLETED" | "PENDING" | "FAILED" | "REFUNDED";
};

const planOptions = [
  { value: "ALL", label: "All Plans" },
  { value: "Pro", label: "Pro" },
  { value: "Enterprise", label: "Enterprise" },
  { value: "Basic", label: "Basic" },
] as const;

const revenueTransactionStatuses = [
  "ALL",
  "COMPLETED",
  "PENDING",
  "FAILED",
  "REFUNDED",
] as const;

const statusOptions = revenueTransactionStatuses.map((status) => ({
  value: status,
  label: status === "ALL" ? "All Statuses" : status.replace(/_/g, " "),
}));

const revenueTransactions: RevenueTransaction[] = [
  {
    id: "txn-001",
    date: "Sep 17, 2023",
    userEmail: "alex.rivera@gmail.com",
    plan: "Pro",
    amount: "$150.00",
    status: "COMPLETED",
  },
  {
    id: "txn-002",
    date: "Sep 17, 2023",
    userEmail: "sarah.j@enterprise.co",
    plan: "Enterprise",
    amount: "$2,400.00",
    status: "COMPLETED",
  },
  {
    id: "txn-003",
    date: "Sep 16, 2023",
    userEmail: "mike.ross@pearson.com",
    plan: "Pro",
    amount: "$150.00",
    status: "PENDING",
  },
  {
    id: "txn-004",
    date: "Sep 16, 2023",
    userEmail: "joshua_dev@freelance.io",
    plan: "Basic",
    amount: "$49.00",
    status: "FAILED",
  },
  {
    id: "txn-005",
    date: "Sep 15, 2023",
    userEmail: "nina.ops@company.com",
    plan: "Enterprise",
    amount: "$2,400.00",
    status: "COMPLETED",
  },
  {
    id: "txn-006",
    date: "Sep 15, 2023",
    userEmail: "david.khan@mail.com",
    plan: "Basic",
    amount: "$49.00",
    status: "PENDING",
  },
  {
    id: "txn-007",
    date: "Sep 14, 2023",
    userEmail: "emma.wilson@studio.io",
    plan: "Pro",
    amount: "$150.00",
    status: "COMPLETED",
  },
  {
    id: "txn-008",
    date: "Sep 14, 2023",
    userEmail: "omar.finance@enterprise.co",
    plan: "Enterprise",
    amount: "$2,400.00",
    status: "REFUNDED",
  },
  {
    id: "txn-009",
    date: "Sep 13, 2023",
    userEmail: "lena.market@gmail.com",
    plan: "Pro",
    amount: "$150.00",
    status: "COMPLETED",
  },
  {
    id: "txn-010",
    date: "Sep 13, 2023",
    userEmail: "ryan.basic@mail.com",
    plan: "Basic",
    amount: "$49.00",
    status: "PENDING",
  },
  {
    id: "txn-011",
    date: "Sep 12, 2023",
    userEmail: "aisha.ops@brand.co",
    plan: "Enterprise",
    amount: "$2,400.00",
    status: "COMPLETED",
  },
  {
    id: "txn-012",
    date: "Sep 12, 2023",
    userEmail: "tom.harris@gmail.com",
    plan: "Pro",
    amount: "$150.00",
    status: "COMPLETED",
  },
];

const planClasses = {
  Pro: "bg-blue-50 text-blue-600",
  Enterprise: "bg-slate-100 text-slate-700",
  Basic: "bg-blue-50 text-blue-300",
};

function AnalyticsTransactionsTable({
  data,
  page,
  limit,
  total,
  onPageChange,
}: {
  data: RevenueTransaction[];
  page: number;
  limit: number;
  total: number;
  onPageChange: (page: number) => void;
}) {
  const totalPages = Math.max(Math.ceil(total / limit), 1);

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-white shadow-sm">
      <div className="flex flex-col gap-3 border-b border-border bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-sm font-semibold">Recent Revenue Transactions</h2>
      </div>

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
            <TableHead>Date</TableHead>
            <TableHead>User Email</TableHead>
            <TableHead>Plan</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </>
        }
        row={(item: RevenueTransaction) => (
          <>
            <TableCell>{item.date}</TableCell>
            <TableCell className="font-semibold">{item.userEmail}</TableCell>
            <TableCell>
              <span className={`rounded px-2 py-1 text-[10px] font-semibold ${planClasses[item.plan]}`}>
                {item.plan}
              </span>
            </TableCell>
            <TableCell className="font-medium text-slate-500">{item.amount}</TableCell>
            <TableCell>{StatusBadge({status: item.status})}
            </TableCell>
            <TableCell>
              <div className="flex items-center justify-end">
                <Button
                  variant="ghost"
                  className="size-9 rounded-full text-primary hover:bg-primary/10"
                >
                  <MoreVertical className="size-4" />
                </Button>
              </div>
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
  const [plan, setPlan] = useState("ALL");
  const [status, setStatus] = useState("ALL");
  const limit = 10;
  const debouncedSearch = useDebounce(search, 400);

  const filteredTransactions = useMemo(() => {
    const normalizedSearch = debouncedSearch.trim().toLowerCase();

    return revenueTransactions.filter((transaction) => {
      const matchesSearch =
        !normalizedSearch ||
        transaction.userEmail.toLowerCase().includes(normalizedSearch) ||
        transaction.id.toLowerCase().includes(normalizedSearch) ||
        transaction.plan.toLowerCase().includes(normalizedSearch) ||
        transaction.amount.toLowerCase().includes(normalizedSearch) ||
        transaction.status.toLowerCase().includes(normalizedSearch);
      const matchesPlan = plan === "ALL" || transaction.plan === plan;
      const matchesStatus = status === "ALL" || transaction.status === status;

      return matchesSearch && matchesPlan && matchesStatus;
    });
  }, [debouncedSearch, plan, status]);

  const paginatedTransactions = filteredTransactions.slice(
    (page - 1) * limit,
    page * limit,
  );

  return (
    <div className="space-y-5">
      <PageHeader
        title="Platform Analytics"
        actions={
          <Can module="analytics" action="read">
            <Button>
              <Download className="mr-2 size-3.5" />
              Export
            </Button>
          </Can>
        }
      />

      <PlatformAnalyticsStatsCard />

      <FilterSection
        searchPlaceholder="Search transactions by ID, email, plan, or status..."
        searchValue={search}
        onSearchChange={(value) => {
          setSearch(value);
          setPage(1);
        }}
        filters={[
          {
            value: plan,
            onChange: (value) => {
              setPlan(value);
              setPage(1);
            },
            placeholder: "All Plans",
            width: "sm:w-[160px]",
            options: planOptions,
          },
          {
            value: status,
            onChange: (value) => {
              setStatus(value);
              setPage(1);
            },
            placeholder: "All Statuses",
            width: "sm:w-[150px]",
            options: statusOptions,
          },
        ]}
      />

      <AnalyticsTransactionsTable
        data={paginatedTransactions}
        page={page}
        limit={limit}
        total={filteredTransactions.length}
        onPageChange={setPage}
      />
    </div>
  );
}
