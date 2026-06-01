"use client";

import { useMemo, useState } from "react";
import { ClipboardList, ShieldCheck } from "lucide-react";

import { Card } from "@/components/ui/card";
import { FilterSection } from "@/components/common/filter-section";
import { DataTable } from "@/components/tables/data-table";
import { TableCell, TableHead } from "@/components/ui/table";
import {
  providerDisputeCases,
  providerDisputeStats,
  type ProviderDisputeStatus,
} from "@/constants/provider-dispute";
import { providerDisputeCategoryOptions, providerDisputeStatusOptions } from "@/constants/filter-options";
import { cn } from "@/lib/utils";
import { StatusBadge } from "@/utils/status";
import { Button } from "../ui/button";

function formatMoney(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

function ProviderDisputeStats() {
  const [criticalStat, ...summaryStats] = providerDisputeStats;

  return (
    <section className="grid gap-4 xl:grid-cols-[150px_minmax(0,1fr)]">
      <Card className="p-5">
        <div className="flex items-start justify-between gap-3">
          <span className="flex size-10 items-center justify-center rounded-2xl bg-primary/10 text-sm font-semibold text-primary">
            {criticalStat.value}
          </span>
          <ClipboardList className="size-4 text-primary/50" />
        </div>
        <p className="mt-5 text-[9px] font-semibold uppercase tracking-[0.12em] text-slate-400">
          {criticalStat.label}
        </p>
        <p className="mt-1 text-xs font-semibold">{criticalStat.caption}</p>
      </Card>

      <Card className="grid gap-4 p-5 sm:grid-cols-2 xl:grid-cols-[1fr_1fr_1fr_220px]">
        {summaryStats.map((stat, index) => {
          const isPerformance = stat.tone === "success";

          return (
            <div
              key={stat.label}
              className={cn(
                "min-w-0",
                index > 0 && !isPerformance && "sm:border-l sm:border-border sm:pl-6",
                isPerformance && "rounded-2xl bg-emerald-50 p-4",
              )}
            >
              {isPerformance ? (
                <div className="flex items-center gap-3">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white">
                    <ShieldCheck className="size-4" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-[9px] font-semibold uppercase tracking-[0.12em] text-emerald-700">
                      {stat.label}
                    </p>
                    <p className="mt-1 text-xs font-semibold text-emerald-800">{stat.value}</p>
                  </div>
                </div>
              ) : (
                <>
                  <p className={cn("text-2xl font-semibold", stat.tone === "danger" && "text-red-600")}>
                    {stat.value}
                  </p>
                  <p className="mt-2 text-[9px] font-semibold uppercase tracking-[0.12em] text-slate-500">
                    {stat.label}
                  </p>
                </>
              )}
            </div>
          );
        })}
      </Card>
    </section>
  );
}

export function ProviderDisputePage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [status, setStatus] = useState<ProviderDisputeStatus | "all">("all");
  const limit = 10;

  const filteredCases = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return providerDisputeCases.filter((item) => {
      const matchesSearch =
        normalizedSearch.length === 0 ||
        item.id.toLowerCase().includes(normalizedSearch) ||
        item.providerName.toLowerCase().includes(normalizedSearch) ||
        item.stakeholderName.toLowerCase().includes(normalizedSearch) ||
        item.transactionId.toLowerCase().includes(normalizedSearch);

      const matchesCategory = category === "all" || item.category === category;
      const matchesStatus = status === "all" || item.status === status;

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [category, search, status]);

  const pagination = {
    total: 23,
    page,
    limit,
    totalPages: 3,
    hasNext: page < 3,
    hasPrevious: page > 1,
  };

  return (
    <div className="space-y-5">
      <ProviderDisputeStats />

      <FilterSection
        searchPlaceholder="Search gifts by name, ID, or provider..."
        searchValue={search}
        onSearchChange={(value) => {
          setSearch(value);
          setPage(1);
        }}
        filters={[
          {
            value: category,
            onChange: (value) => {
              setCategory(value);
              setPage(1);
            },
            placeholder: "All Categories",
            width: "sm:w-[150px]",
            options: providerDisputeCategoryOptions,
          },
          {
            value: status,
            onChange: (value) => {
              setStatus(value as ProviderDisputeStatus | "all");
              setPage(1);
            },
            placeholder: "All Status",
            width: "sm:w-[135px]",
            options: providerDisputeStatusOptions,
          },
        ]}
      />

      <DataTable
        data={filteredCases}
        pagination={{ ...pagination, onPageChange: setPage }}
        headers={
          <>
            <TableHead>Case Id</TableHead>
            <TableHead>Stakeholders</TableHead>
            <TableHead>Transaction</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Pipeline Status</TableHead>
            <TableHead>Lifecycle</TableHead>
            <TableHead>Risk Assessment</TableHead>
          </>
        }
        row={(item) => (
          <>
            <TableCell className="font-semibold">{item.id}</TableCell>
            <TableCell>
              <div className="space-y-1">
                <p className="font-semibold">{item.providerName}</p>
                <p className="text-[10px] text-slate-400">
                  {item.stakeholderName} ({item.stakeholderTier})
                </p>
              </div>
            </TableCell>
            <TableCell>
              <p className="font-semibold text-primary">{item.transactionId}</p>
              <div className="mt-1">
                <StatusBadge
                  status={item.syncStatus.replace(" ", "_").toUpperCase()}
                  className="px-2 py-1 text-[9px]"
                />
              </div>
            </TableCell>
            <TableCell>
              <p className="text-[10px] font-medium text-slate-500">{item.categoryLabel}</p>
              <p className="mt-1 font-semibold">{formatMoney(item.amount)}</p>
            </TableCell>
            <TableCell>
              <StatusBadge status={item.status} className="text-[9px]" />
            </TableCell>
            <TableCell className={cn("font-semibold", item.lifecycleDays >= 12 && "text-red-600")}>
              {item.lifecycleDays} Days
            </TableCell>
            <TableCell className="text-center">
              <Button
                variant="ghost"
                className="text-primary"
              >
                Review
              </Button>
            </TableCell>
          </>
        )}
      />
    </div>
  );
}
