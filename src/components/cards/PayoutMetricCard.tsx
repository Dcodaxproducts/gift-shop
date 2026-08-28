"use client";

import { CalendarDays, CheckCircle2, Hexagon, Hourglass } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { PayoutMetric, ProviderPayoutStats } from "@/types/provider-payouts";

const emptyValue = "--";

const formatDelta = (value: number, period: string) => {
  const prefix = value > 0 ? "+" : "";
  return `${prefix}${value}% vs ${period}`;
};

function buildPayoutMetrics(stats?: ProviderPayoutStats): PayoutMetric[] {
  return [
    {
      icon: CalendarDays,
      label: "Total payouts this month",
      value: stats ? `$${stats.totalPayoutsThisMonth.toFixed(2)}` : emptyValue,
      change: stats ? formatDelta(stats.totalPayoutsDeltaPercent, "last month") : emptyValue,
      tone: "purple",
    },
    {
      icon: Hourglass,
      label: "Pending payouts",
      value: stats ? `$${stats.pendingPayouts.toFixed(2)}` : emptyValue,
      change: stats ? formatDelta(stats.pendingPayoutsDeltaPercent, "last week") : emptyValue,
      tone: "amber",
    },
    {
      icon: CheckCircle2,
      label: "Completed payouts",
      value: stats ? `$${stats.completedPayouts.toFixed(2)}` : emptyValue,
      change: stats ? formatDelta(stats.completedPayoutsDeltaPercent, "last month") : emptyValue,
      tone: "green",
    },
    {
      icon: Hexagon,
      label: "Platform revenue",
      value: stats ? `$${stats.platformRevenue.toFixed(2)}` : emptyValue,
      change: stats ? formatDelta(stats.platformRevenueDeltaPercent, "last month") : emptyValue,
      tone: "violet",
    },
  ];
}

function PayoutMetricCard({ icon: Icon, label, value, change, tone, loading = false }: PayoutMetric & { loading?: boolean }) {
  return (
    <Card>
      <CardContent>
        <div className="flex items-start justify-between gap-4">
          <p className="text-xs font-semibold leading-4 text-slate-500">{label}</p>
          <Icon
            className="size-4 shrink-0 text-primary"
            strokeWidth={2.4}
          />
        </div>
        {loading ? (
          <>
            <div className="mt-3 h-5.5 w-32 animate-pulse rounded-full bg-slate-100" />
            <div className="mt-3 h-2.5 w-24 animate-pulse rounded-full bg-slate-100" />
          </>
        ) : (
          <>
            <p className="mt-3 text-[22px] font-semibold leading-none tracking-tight ">
              {value}
            </p>
            <p className={cn("mt-3 text-[10px] font-semibold", tone === "green" ? "text-green-600" : "text-red-600")}>
              {change}
            </p>
          </>
        )}
      </CardContent>
    </Card>
  );
}

export function PayoutMetricsSection({ stats, loading = false }: { stats?: ProviderPayoutStats; loading?: boolean }) {
  const metrics = buildPayoutMetrics(stats);

  return (
    <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
      {metrics.map((metric) => (
        <PayoutMetricCard key={metric.label} {...metric} loading={loading} />
      ))}
    </section>
  );
}
