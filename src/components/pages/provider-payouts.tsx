"use client";

import { useState } from "react";
import {
  ChevronDown,
  Download,
  ListFilter,
  Plus
} from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  YAxis,
} from "recharts";
import {
  earningsDistributionData,
  monthlyPayoutData,
  payoutActivities,
  payoutActivitiesPagination,
  payoutMetrics,
  type PayoutActivity,
  type PayoutMetric,
} from "@/constants/payouts";
import { PageHeader } from "@/components/common/page-header";
import { DataTable } from "@/components/tables/data-table";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { TableCell, TableHead } from "@/components/ui/table";
import { cn } from "@/lib/utils";

const metricToneClass: Record<PayoutMetric["tone"], string> = {
  purple: "text-primary",
  amber: "text-amber-500",
  green: "text-primary",
  violet: "text-primary",
};

const metricChangeClass: Record<PayoutMetric["tone"], string> = {
  purple: "text-emerald-500",
  amber: "text-rose-500",
  green: "text-emerald-500",
  violet: "text-emerald-500",
};

const avatarToneClass: Record<PayoutActivity["avatarTone"], string> = {
  teal: "bg-teal-700 text-white",
  stone: "bg-stone-300 text-stone-600",
  cyan: "bg-cyan-400 text-white",
  dark: "bg-slate-800 text-white",
};

const statusToneClass: Record<PayoutActivity["status"], string> = {
  Completed: "bg-emerald-50 text-emerald-600",
  Pending: "bg-amber-50 text-amber-600",
  "On Hold": "bg-rose-50 text-rose-600",
};

const trendChartConfig = {
  amount: {
    label: "Payout",
    color: "var(--primary)",
  },
} satisfies ChartConfig;

const distributionChartConfig = {
  amount: {
    label: "Earnings",
    color: "var(--primary)",
  },
} satisfies ChartConfig;

function PayoutMetricCard({ icon: Icon, label, value, change, tone }: PayoutMetric) {
  return (
    <Card className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-4">
          <p className="text-xs font-semibold leading-4 text-slate-500">{label}</p>
          <Icon
            className={cn("size-4 shrink-0", metricToneClass[tone])}
            strokeWidth={2.4}
          />
        </div>
        <p className="mt-3 text-[22px] font-semibold leading-none tracking-tight text-slate-950">
          {value}
        </p>
        <p className={cn("mt-3 text-[10px] font-bold", metricChangeClass[tone])}>
          {change}
        </p>
      </CardContent>
    </Card>
  );
}

function MonthlyTrendChart() {
  return (
    <Card className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      <CardContent className="p-6">
        <div className="flex items-start justify-between gap-4">
          <h2 className="text-sm font-bold text-slate-950">Monthly Payout Trend</h2>
          <button
            type="button"
            className="flex h-8 items-center gap-2 rounded-full bg-slate-50 px-4 text-[10px] text-slate-500"
          >
            Last 6 Months
            <ChevronDown className="size-3" strokeWidth={2.5} />
          </button>
        </div>

        <ChartContainer config={trendChartConfig} className="mt-6 h-[230px] w-full">
          <AreaChart data={monthlyPayoutData} margin={{ left: 0, right: 0, top: 8 }}>
            <defs>
              <linearGradient id="payoutFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--primary)" stopOpacity={0.3} />
                <stop offset="100%" stopColor="var(--primary)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} stroke="var(--border)" strokeDasharray="3 3" />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 10, fill: "var(--muted-foreground)" }}
            />
            <YAxis hide />
            <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
            <Area
              type="monotone"
              dataKey="amount"
              stroke="var(--primary)"
              strokeWidth={3}
              fill="url(#payoutFill)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

function EarningsDistributionChart() {
  return (
    <Card className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      <CardContent className="p-6">
        <div>
          <h2 className="text-sm font-bold text-slate-950">Earnings Distribution</h2>
          <p className="mt-1 text-[10px] font-medium text-slate-400">
            Breakdown by Provider Tier
          </p>
        </div>

        <ChartContainer config={distributionChartConfig} className="mt-6 h-[220px] w-full">
          <LineChart data={earningsDistributionData} margin={{ left: 0, right: 0, top: 8 }}>
            <CartesianGrid vertical={false} stroke="var(--border)" strokeDasharray="3 3" />
            <XAxis
              dataKey="tier"
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 10, fill: "var(--muted-foreground)" }}
            />
            <YAxis hide />
            <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
            <Line
              type="monotone"
              dataKey="amount"
              stroke="var(--primary)"
              strokeWidth={3}
              dot={{ r: 4, fill: "var(--primary)", strokeWidth: 0 }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

function RecentPayoutActivities() {
  const [page, setPage] = useState(1);

  return (
    <div className="rounded-2xl border border-b-0 border-slate-200">
      <div className="flex flex-col gap-3 rounded-t-2xl bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-sm font-bold text-slate-950">Recent Payout Activities</h2>
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
                  className={cn(
                    "flex size-9 items-center justify-center rounded-full text-[11px] font-black",
                    avatarToneClass[activity.avatarTone],
                  )}
                >
                  {activity.avatar}
                </span>
                <div>
                  <p className="text-xs font-bold leading-4 text-slate-950">
                    {activity.provider}
                  </p>
                  <p className="text-[10px] font-medium text-slate-400">
                    ID: {activity.id}
                  </p>
                </div>
              </div>
            </TableCell>
            <TableCell className="text-xs font-bold text-slate-950">
              {activity.pendingAmount}
            </TableCell>
            <TableCell className="text-xs text-slate-500">{activity.lastPayoutDate}</TableCell>
            <TableCell className="text-xs text-slate-500">{activity.nextPayoutDate}</TableCell>
            <TableCell>
              <span
                className={cn(
                  "inline-flex rounded-full px-3 py-1 text-[10px] font-bold",
                  statusToneClass[activity.status],
                )}
              >
                {activity.status}
              </span>
            </TableCell>
            <TableCell>
                <Button
                  variant="ghost"
                  className="h-7 rounded-full bg-primary/10 px-3 text-[10px] text-primary hover:bg-primary/15"
                >
                  Initiate
                </Button>
            </TableCell>
          </>
        )}
      />
    </div>
  );
}

export function ProviderPayoutsPage() {
  return (
    <div className="space-y-5">
      <PageHeader
        title="Provider Payouts"
        description="Manage and monitor provider earnings and distributions"
        actions={
          <>
            <Button variant="outline">
              <Download className="size-3.5" />
              Export
            </Button>
            <Button>
              <Plus className="size-3.5" />
              Bulk Payout
            </Button>
          </>
        }
      />

      <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {payoutMetrics.map((metric) => (
          <PayoutMetricCard key={metric.label} {...metric} />
        ))}
      </section>

      <section className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_350px]">
        <MonthlyTrendChart />
        <EarningsDistributionChart />
      </section>

      <RecentPayoutActivities />
    </div>
  );
}