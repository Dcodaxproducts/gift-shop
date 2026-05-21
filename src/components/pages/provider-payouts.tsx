"use client";

import { useState } from "react";
import {
  CalendarDays,
  CheckCircle2,
  Download,
  Hexagon,
  Hourglass,
  ListFilter,
} from "lucide-react";
import { useRouter } from "next/navigation";
import {
  payoutActivities,
  payoutActivitiesPagination,
  payoutMetrics,
  type PayoutActivity,
  type PayoutMetric,
} from "@/constants/payouts";
import { PageHeader } from "@/components/common/page-header";
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
  useProviderPayoutStats,
  useProviderPayoutTrends,
} from "@/hooks/useProviderPayouts";
import type { ProviderPayoutStats } from "@/types/provider-payouts";

const formatCurrency = (amount: number, currency: string) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
  }).format(amount);
};

const formatDelta = (value: number, period: string) => {
  const prefix = value > 0 ? "+" : "";
  return `${prefix}${value}% vs ${period}`;
};

const formatRangeLabel = (range?: string) => {
  if (!range) {
    return "Last 6 Months";
  }

  return range
    .toLowerCase()
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
};

const buildPayoutMetrics = (stats?: ProviderPayoutStats): PayoutMetric[] => {
  if (!stats) {
    return payoutMetrics;
  }

  return [
    {
      icon: CalendarDays,
      label: "Total payouts this month",
      value: formatCurrency(stats.totalPayoutsThisMonth, stats.currency),
      change: formatDelta(stats.totalPayoutsDeltaPercent, "last month"),
      tone: "purple",
    },
    {
      icon: Hourglass,
      label: "Pending payouts",
      value: formatCurrency(stats.pendingPayouts, stats.currency),
      change: formatDelta(stats.pendingPayoutsDeltaPercent, "last week"),
      tone: "amber",
    },
    {
      icon: CheckCircle2,
      label: "Completed payouts",
      value: formatCurrency(stats.completedPayouts, stats.currency),
      change: formatDelta(stats.completedPayoutsDeltaPercent, "last month"),
      tone: "green",
    },
    {
      icon: Hexagon,
      label: "Platform revenue",
      value: formatCurrency(stats.platformRevenue, stats.currency),
      change: formatDelta(stats.platformRevenueDeltaPercent, "last month"),
      tone: "violet",
    },
  ];
};

function RecentPayoutActivities() {
  const [page, setPage] = useState(1);
  const [selectedActivity, setSelectedActivity] = useState<PayoutActivity | null>(null);
  const router = useRouter();

  const closeDialog = () => setSelectedActivity(null);

  return (
    <div className="rounded-2xl border border-b-0 border-slate-200">
      <div className="flex flex-col gap-3 rounded-t-2xl bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-sm font-semibold ">Recent Payout Activities</h2>
        <Button variant="outline" className="h-9 rounded-full px-4 text-xs">
          <ListFilter className="size-3.5" />
          Filter
        </Button>
      </div>

      <DataTable
        data={payoutActivities}
        pagination={{
          ...payoutActivitiesPagination,
          page,
          onPageChange: setPage,
        }}
        isBorder={false}
        onRowClick={(activity) => router.push(`/providers/${activity.providerSlug}`)}
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
        row={(activity: PayoutActivity) => (
          <>
            <TableCell>
              <div className="flex items-center gap-3">
                <span
                  className="flex size-9 items-center justify-center rounded-full text-[11px] font-semibold bg-primary/10 text-primary"
                >
                  {activity.avatar}
                </span>
                <div>
                  <p className="text-xs font-semibold leading-4">
                    {activity.provider}
                  </p>
                  <p className="text-[10px] font-medium text-slate-400">
                    ID: {activity.id}
                  </p>
                </div>
              </div>
            </TableCell>
            <TableCell className="font-semibold">
              {activity.pendingAmount}
            </TableCell>
            <TableCell>{activity.lastPayoutDate}</TableCell>
            <TableCell>{activity.nextPayoutDate}</TableCell>
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
  const { data: stats } = useProviderPayoutStats();
  const { data: trends } = useProviderPayoutTrends({ range: "LAST_12_MONTHS" });
  const { data: earningDistribution } = useProviderEarningDistribution();
  const exportPayouts = useExportProviderPayouts();

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
            <Button
              variant="outline"
              disabled={exportPayouts.isPending}
              onClick={() => exportPayouts.mutate()}
            >
              <Download className="size-3.5" />
              Export
            </Button>
            {/* <Button>
              <Plus className="size-3.5" />
              Bulk Payout
            </Button> */}
          </>
        }
      />

      <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => (
          <PayoutMetricCard key={metric.label} {...metric} />
        ))}
      </section>

      <section className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_350px]">
        <MonthlyPayoutChart data={trendData} rangeLabel={formatRangeLabel(trends?.range)} />
        <EarningsDistributionChart data={distributionData} />
      </section>

      <RecentPayoutActivities />
    </div>
  );
}
