"use client";

import { useState } from "react";
import {
  CalendarDays,
  CheckCircle2,
  Download,
  Hexagon,
  Hourglass,
} from "lucide-react";
import { useRouter } from "next/navigation";
import {
  type PayoutMetric,
} from "@/constants/payouts";
import PageHeader from "@/components/common/page-header";
import { DataTable } from "@/components/tables/data-table";
import { Button } from "@/components/ui/button";
import { TableCell, TableHead } from "@/components/ui/table";
import MonthlyPayoutChart from "../charts/MonthlyPayoutChart";
import EarningsDistributionChart from "../charts/EarningsDistributionChart";
import { StatusBadge } from "@/utils/status";
import { TransactionBreakdownDialog } from "../dialog/transaction-dialog";
import PayoutMetricCard from "../cards/PayoutMetricCard";
import {
  useExportProviderPayouts,
  useProviderEarningDistribution,
  useProviderPayouts,
  useProviderPayoutStats,
  useProviderPayoutTrends,
} from "@/hooks/useProviderPayouts";
import type {
  ProviderPayoutListItem,
  ProviderPayoutStats,
  ProviderPayoutTrendRange,
} from "@/types/provider-payouts";
import { formatDate } from "@/utils/formatDate";

const formatMoney = (amount: number, currency = "USD") => {
  const normalizedAmount = Number(amount);
  const safeAmount = Number.isFinite(normalizedAmount) ? normalizedAmount : 0;

  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(safeAmount);
  } catch {
    return `${safeAmount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${currency}`;
  }
};

const formatDelta = (value: number, period: string) => {
  const prefix = value > 0 ? "+" : "";
  return `${prefix}${value}% vs ${period}`;
};

const emptyValue = "--";

const buildPayoutMetrics = (stats?: ProviderPayoutStats): PayoutMetric[] => {
  return [
    {
      icon: CalendarDays,
      label: "Total payouts this month",
      value: stats ? formatMoney(stats.totalPayoutsThisMonth, stats.currency) : emptyValue,
      change: stats ? formatDelta(stats.totalPayoutsDeltaPercent, "last month") : emptyValue,
      tone: "purple",
    },
    {
      icon: Hourglass,
      label: "Pending payouts",
      value: stats ? formatMoney(stats.pendingPayouts, stats.currency) : emptyValue,
      change: stats ? formatDelta(stats.pendingPayoutsDeltaPercent, "last week") : emptyValue,
      tone: "amber",
    },
    {
      icon: CheckCircle2,
      label: "Completed payouts",
      value: stats ? formatMoney(stats.completedPayouts, stats.currency) : emptyValue,
      change: stats ? formatDelta(stats.completedPayoutsDeltaPercent, "last month") : emptyValue,
      tone: "green",
    },
    {
      icon: Hexagon,
      label: "Platform revenue",
      value: stats ? formatMoney(stats.platformRevenue, stats.currency) : emptyValue,
      change: stats ? formatDelta(stats.platformRevenueDeltaPercent, "last month") : emptyValue,
      tone: "violet",
    },
  ];
};

function RecentPayoutActivities() {
  const [page, setPage] = useState(1);
  const [selectedActivity, setSelectedActivity] = useState<ProviderPayoutListItem | null>(null);
  const router = useRouter();
  const limit = 4;
  const { data: payouts = [], isLoading: isPayoutsLoading } = useProviderPayouts({
    page,
    limit,
    sortBy: "createdAt",
    sortOrder: "DESC",
  });

  const hasNextPage = payouts.length === limit;
  const pagination = {
    total: (page - 1) * limit + payouts.length + (hasNextPage ? 1 : 0),
    page,
    limit,
    totalPages: page + (hasNextPage ? 1 : 0),
    hasNext: hasNextPage,
    hasPrevious: page > 1,
  };

  const closeDialog = () => setSelectedActivity(null);

  return (
    <div className="rounded-2xl border border-b-0 border-slate-200">
      <div className="flex flex-col gap-3 rounded-t-2xl bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-sm font-semibold ">Recent Payout Activities</h2>
      </div>

      <DataTable
        data={payouts}
        pagination={{ ...pagination, onPageChange: setPage }}
        isBorder={false}
        loading={isPayoutsLoading}
        skeletonRows={4}
        onRowClick={(activity) => router.push(`/providers/${activity.provider.id}`)}
        headers={
          <>
            <TableHead>Provider</TableHead>
            <TableHead>Pending Amount</TableHead>
            <TableHead>Last Payout Date</TableHead>
            <TableHead>Next Payout Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </>
        }
        row={(activity: ProviderPayoutListItem) => (
          <>
            <TableCell>
              <div className="flex items-center gap-3">
                <span className="flex size-9 items-center justify-center rounded-full bg-primary/10 text-[11px] font-semibold text-primary">
                  {activity.provider.businessName.charAt(0)}
                </span>
                <div>
                  <p className="text-xs font-semibold leading-4">{activity.provider.businessName}</p>
                  <p className="text-[10px] font-medium text-slate-400">ID: {activity.provider.providerCode ?? activity.provider.id}</p>
                </div>
              </div>
            </TableCell>
            <TableCell className="font-semibold">{formatMoney(activity.pendingAmount, activity.currency)}</TableCell>
            <TableCell>{formatDate(activity.lastPayoutDate)}</TableCell>
            <TableCell>{formatDate(activity.nextPayoutDate)}</TableCell>
            <TableCell>{StatusBadge({ status: activity.status })}</TableCell>
            <TableCell>
              <Button
                variant="soft"
                onClick={(event) => {
                  event.stopPropagation();
                  setSelectedActivity(activity);
                }}
              >
                Initiate
              </Button>
            </TableCell>
          </>
        )}
      />
      <TransactionBreakdownDialog
        selectedActivity={selectedActivity}
        onClose={closeDialog}
      />
    </div>
  );
}

export function ProviderPayoutsPage() {
  const [trendRange, setTrendRange] = useState<ProviderPayoutTrendRange>("LAST_12_MONTHS");
  const { data: stats, isLoading: isStatsLoading } = useProviderPayoutStats();
  const { data: trends } = useProviderPayoutTrends({ range: trendRange });
  const { data: earningDistribution } = useProviderEarningDistribution();
  const { mutate: exportPayouts, isPending: isExportPending } = useExportProviderPayouts();

  const metrics = buildPayoutMetrics(stats);
  const trendData = trends?.labels.map((label, index) => ({
    month: label,
    amount: trends.values[index] ?? 0,
  }));
  const distributionData = earningDistribution?.map((item) => ({
    tier: item.tierName,
    amount: item.totalEarnings,
  }));

  return (
    <div className="space-y-5">
      <PageHeader
        title="Provider Payouts"
        description="Manage and monitor provider earnings and distributions"
        actions={
          <>
            <Button variant="outline" disabled={isExportPending} onClick={() => exportPayouts()}>
              <Download className="size-3.5" />
              Export
            </Button>
          </>
        }
      />

      <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => (
          <PayoutMetricCard key={metric.label} {...metric} loading={isStatsLoading} />
        ))}
      </section>

      <section className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_350px]">
        <MonthlyPayoutChart data={trendData ?? []} range={trendRange} onRangeChange={setTrendRange} />
        <EarningsDistributionChart data={distributionData ?? []} />
      </section>

      <RecentPayoutActivities />
    </div>
  );
}
