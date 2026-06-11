"use client";

import { useState } from "react";
import { Download, Eye } from "lucide-react";
import { useRouter } from "next/navigation";
import { TransactionStatsCard } from "@/components/cards/TransactionStatsCard";
import { FilterSection } from "@/components/common/filter-section";
import { DataTable } from "@/components/tables/data-table";
import { Button } from "@/components/ui/button";
import { TableCell, TableHead } from "@/components/ui/table";
import { useDebounce } from "@/hooks/useDebounce";
import {
  useExportTransactions,
  useTransactions,
  useTransactionStats,
} from "@/hooks/useTransactions";
import type { Transaction } from "@/types/transactions";
import { formatDate } from "@/utils/formatDate";
import { getInitials } from "@/utils/getInitials";
import PageHeader from "../common/page-header";
import { StatusBadge } from "@/utils/status";

export const mockTransactions: any = [
  {
    transactionId: "TXN-2026-8812",
    user: {
      name: "Zainab Malik",
    },
    gatewayProvider: "Stripe",
    type: "PAYMENT",
    amount: 1250.00,
    currency: "USD",
    status: "SUCCESS",
    createdAt: "2026-06-11T10:30:00Z",
  },
  {
    transactionId: "TXN-2026-4401",
    user: {
      name: "Ali Raza",
    },
    gatewayProvider: "PayPal",
    type: "WITHDRAWAL",
    amount: 450.50,
    currency: "USD",
    status: "PENDING",
    createdAt: "2026-06-11T14:15:00Z",
  },
  {
    transactionId: "TXN-2026-1193",
    user: {
      name: "Hamza Ahmed",
    },
    gatewayProvider: "Adyen",
    type: "GIFT",
    amount: 75.00,
    currency: "USD",
    status: "SUCCESS",
    createdAt: "2026-06-10T18:45:00Z",
  },
  {
    transactionId: "TXN-2026-9052",
    user: {
      id : "s",
      name: "Ayesha Khan",
    },
    gatewayProvider: "Razorpay",
    type: "PAYMENT",
    amount: 3200.00,
    currency: "USD",
    status: "FAILED",
    createdAt: "2026-06-09T08:20:00Z",
  },
  {
    transactionId: "TXN-2026-3310",
    user: {
      name: "Zainab Malik",
    },
    gatewayProvider: "Braintree",
    type: "PAYMENT",
    amount: 15.99,
    currency: "USD",
    status: "SUCCESS",
    createdAt: "2026-06-08T11:05:00Z",
  }
];

const transactionTypeOptions = [
  { value: "all", label: "Transaction Type" },
  { value: "PAYMENT", label: "Payment" },
  { value: "GIFT", label: "Gift" },
  { value: "WITHDRAWAL", label: "Withdrawal" },
] as const;

const transactionStatusOptions = [
  { value: "all", label: "Status" },
  { value: "SUCCESS", label: "Success" },
  { value: "PENDING", label: "Pending" },
  { value: "FAILED", label: "Failed" },
] as const;

const formatAmount = (amount: number, currency: string) => {
  return new Intl.NumberFormat("en-US", {
    currency,
    maximumFractionDigits: 2,
    style: "currency",
  }).format(amount);
};

function TransactionsTable({
  data,
  loading,
  page,
  limit,
  total,
  totalPages,
  onPageChange,
}: {
  data: Transaction[];
  loading: boolean;
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) {
  const router = useRouter();

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-white shadow-sm">
      <DataTable
        data={data}
        loading={loading}
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
        row={(item: Transaction) => (
          <>
            <TableCell className="font-medium text-slate-700">{item.transactionId}</TableCell>
            <TableCell>
              <div className="flex items-center gap-3">
                <span className="flex size-8 items-center justify-center rounded-full bg-primary/10 text-[10px] font-bold text-primary">
                  {getInitials(item.user?.name ?? "")}
                </span>
                <span className="font-semibold text-slate-900">{item.user?.name ?? "-"}</span>
              </div>
            </TableCell>
            <TableCell className="text-slate-600">{item.gatewayProvider}</TableCell>
            <TableCell>
              <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-medium text-slate-600">
                {item.type}
              </span>
            </TableCell>
            <TableCell className="font-bold text-primary">{formatAmount(item.amount, item.currency)}</TableCell>
            <TableCell>
              <StatusBadge status={item.status} />
            </TableCell>
            <TableCell className="max-w-24 text-slate-500">{formatDate(item.createdAt)}</TableCell>
            <TableCell>
              <div className="flex items-center justify-end">
                <Button
                  variant="ghost"
                  className="size-9 rounded-full text-primary hover:bg-primary/10"
                  // onClick={() => router.push("/disputes-refund/DIS-9842")}
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
  const [search, setSearch] = useState("");
  const [transactionType, setTransactionType] = useState("all");
  const [status, setStatus] = useState("all");
  const limit = 10;
  const debouncedSearch = useDebounce(search, 400);

  const { data: stats } = useTransactionStats();
  const exportTransactions = useExportTransactions();
  const { data: transactionsResponse, isLoading } = useTransactions({
    page,
    limit,
    search: debouncedSearch || undefined,
    type: transactionType === "all" ? undefined : transactionType,
    status: status === "all" ? undefined : status,
  });

  const transactions = mockTransactions;

  const meta = {
    page: 1,
    limit: 10,
    total: mockTransactions.length,
    totalPages: 1,
  };

  // const transactions = transactionsResponse?.data ?? [];
  // const meta = transactionsResponse?.meta ?? {
  //   page,
  //   limit,
  //   total: 0,
  //   totalPages: 1,
  // };

  return (
    <div className="space-y-5">
      <PageHeader
        title="Transaction Monitoring"
        actions={
          <Button onClick={() => exportTransactions.mutate()} disabled={exportTransactions.isPending}>
            <Download className="mr-2 size-3.5" />
            {exportTransactions.isPending ? "Exporting..." : "Export Report"}
          </Button>
        }
      />

      <TransactionStatsCard data={stats} />

      <FilterSection
        searchPlaceholder="Search transactions by ID, user, or provider..."
        searchValue={search}
        onSearchChange={(value) => {
          setSearch(value);
          setPage(1);
        }}
        filters={[
          {
            value: transactionType,
            onChange: (value) => {
              setTransactionType(value);
              setPage(1);
            },
            placeholder: "Transaction Type",
            width: "sm:w-[170px]",
            options: transactionTypeOptions,
          },
          {
            value: status,
            onChange: (value) => {
              setStatus(value);
              setPage(1);
            },
            placeholder: "Status",
            width: "sm:w-[130px]",
            options: transactionStatusOptions,
          },
        ]}
      />

      <TransactionsTable
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
