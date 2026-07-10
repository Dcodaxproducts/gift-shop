import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { TransactionStats } from "@/types/transactions";

const toneClasses = {
  emerald: "text-emerald-600",
  amber: "text-amber-500",
  rose: "text-rose-500",
};

type TransactionStatTone = keyof typeof toneClasses;

type TransactionStat = {
  title: string;
  value: string;
  change: string;
  tone: TransactionStatTone;
};

const numberFormatter = new Intl.NumberFormat("en-US");

function formatCurrency(value: number, currency: string) {
  return new Intl.NumberFormat("en-US", {
    currency,
    maximumFractionDigits: 2,
    style: "currency",
  }).format(value);
}

function formatDelta(value: number) {
  return `${value > 0 ? "+" : ""}${value}%`;
}

function buildTransactionStats(data?: TransactionStats): TransactionStat[] {
  const currency = data?.currency ?? "PKR";

  return [
    {
      title: "Total Volume",
      // value: formatCurrency(200, currency),
      value: formatCurrency(data?.totalVolume ?? 0, currency),
      change: formatDelta(data?.totalVolumeDeltaPercent ?? 0),
      tone: "emerald",
    },
    {
      title: "Success Rate",
      // value: `${100}%`,
      value: `${data?.successRate ?? 0}%`,
      change: formatDelta(data?.successRateDeltaPercent ?? 0),
      tone: "emerald",
    },
    {
      title: "Pending Review",
      // value: numberFormatter.format(5),
      value: numberFormatter.format(data?.pendingReview ?? 0),
      change: "Alert",
      tone: "amber",
    },
    {
      title: "Failed Today",
      // value: numberFormatter.format(1),
      value: numberFormatter.format(data?.failedToday ?? 0),
      change: formatDelta(data?.failedTodayDeltaPercent ?? 0),
      tone: "rose",
    },
  ];
}

export function TransactionStatsCard({ data }: { data?: TransactionStats }) {
  const stats = buildTransactionStats(data);

  return (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardContent>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              {stat.title}
            </p>
            <div className="mt-1 flex items-end justify-between gap-2">
              <p className="text-2xl font-semibold tracking-tight">{stat.value}</p>
              <span className={cn("text-[10px] font-semibold", toneClasses[stat.tone])}>
                {stat.change}
              </span>
            </div>
          </CardContent>
        </Card>
      ))}
    </section>
  );
}
