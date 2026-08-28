"use client";

import { useState } from "react";
import { Download } from "lucide-react";
import { TransactionStatsCard } from "@/components/cards/TransactionStatsCard";
import { FilterSection } from "@/components/common/filter-section";
import { DataTable } from "@/components/tables/data-table";
import { Button } from "@/components/ui/button";
import { TableCell } from "@/components/ui/table";
import { Can } from "@/components/auth/can";
import { useDebounce } from "@/hooks/useDebounce";
import {
  useExportTransactions,
  useTransactions,
  useTransactionStats,
} from "@/hooks/useTransactions";
import type { Transaction } from "@/types/transactions";
import { formatDate } from "@/utils/formatDate";
import PageHeader from "../common/page-header";
import { StatusBadge } from "@/utils/status";
import MyImage from "../common/MyImage";
import { transactionStatusOptions, transactionTypeOptions } from "@/constants/filter-options";

const transactionColumns = ["User", "Transaction Id", "Provider", "Type", "Amount", "Status", "Date"];

const renderTransactionRow = (item: Transaction) => (
  <>
    <TableCell>
      <div className="flex items-center gap-3">
        <span className="relative block size-11 overflow-hidden rounded-2xl bg-slate-100 shadow-sm">
          <MyImage
            src={item?.user?.avatarUrl}
            alt="provider-logo"
            fill
            sizes="44px"
          />
        </span>

        <span className="max-w-32.5 text-xs font-semibold leading-4 ">
          {item.user?.name ?? "-"}
        </span>
      </div>
    </TableCell>
    <TableCell className="font-medium text-slate-700">{item.transactionId}</TableCell>
    <TableCell className="text-slate-600">{item.gatewayProvider}</TableCell>
    <TableCell>
      <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-medium text-slate-600">
        {item.type}
      </span>
    </TableCell>
    <TableCell className="font-bold text-primary">${item.amount.toFixed(2)}</TableCell>
    <TableCell>
      <StatusBadge status={item.status} />
    </TableCell>
    <TableCell className="max-w-24 text-slate-500">{formatDate(item.createdAt)}</TableCell>
  </>
);

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
    transactionType: transactionType === "all" ? undefined : transactionType,
    status: status === "all" ? undefined : status,
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
        title="Transaction Monitoring"
        description="Track and monitor all platform transactions in real time."
        actions={
          <Can module="transactions" action="read">
            <Button onClick={() => exportTransactions.mutate()} disabled={exportTransactions.isPending}>
              <Download className="mr-2 size-3.5" />
              {exportTransactions.isPending ? "Exporting..." : "Export Report"}
            </Button>
          </Can>
        }
      />

      <TransactionStatsCard data={stats} />

      <FilterSection
        searchPlaceholder="Search by customer name or email..."
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

      <DataTable
        data={transactions}
        loading={isLoading}
        pagination={{
          total: meta.total,
          page: meta.page,
          limit: meta.limit,
          totalPages: meta.totalPages,
          hasNext: meta.page < meta.totalPages,
          hasPrevious: meta.page > 1,
          onPageChange: setPage,
        }}
        headers={transactionColumns}
        row={renderTransactionRow}
      />
    </div>
  );
}
