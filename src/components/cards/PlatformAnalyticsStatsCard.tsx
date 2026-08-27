import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { statToneClasses, type StatTone } from "@/constants/custom";
import type { PlatformAnalyticsStats } from "@/types/platform-analytics";

type PlatformAnalyticsStat = {
  title: string;
  value: string;
  change: string;
  tone: StatTone;
};

const numberFormatter = new Intl.NumberFormat("en-US");

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    currency: "USD",
    maximumFractionDigits: 2,
    style: "currency",
  }).format(value);
}

function formatDelta(value: number) {
  return `${value > 0 ? "+" : ""}${value}%`;
}

function buildPlatformAnalyticsStats(data?: PlatformAnalyticsStats): PlatformAnalyticsStat[] {
  return [
    {
      title: "Total Revenue",
      value: formatCurrency(data?.totalRevenue.value ?? 0),
      change: formatDelta(data?.totalRevenue.changePercent ?? 0),
      tone: "emerald",
    },
    {
      title: "New Subscriptions",
      value: numberFormatter.format(data?.newSubscriptions.value ?? 0),
      change: formatDelta(data?.newSubscriptions.changePercent ?? 0),
      tone: "emerald",
    },
    {
      title: "Churn Rate",
      value: `${data?.churnRate.value ?? 0}%`,
      change: formatDelta(data?.churnRate.changePercent ?? 0),
      tone: "blue",
    },
    {
      title: "Active Users",
      value: numberFormatter.format(data?.activeUsers.value ?? 0),
      change: formatDelta(data?.activeUsers.changePercent ?? 0),
      tone: "rose",
    },
  ];
}

export function PlatformAnalyticsStatsCard({ data }: { data?: PlatformAnalyticsStats }) {
  const stats = buildPlatformAnalyticsStats(data);

  return (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardContent>
            <div>
              <p className="text-xs font-medium text-slate-500">{stat.title}</p>
              <div className="mt-1 flex items-end justify-between gap-2">
                <p className="text-2xl font-semibold tracking-tight ">
                  {stat.value}
                </p>
                <span
                  className={cn(
                    "rounded-full px-2.5 py-1 text-[10px] font-semibold leading-none",
                    statToneClasses[stat.tone],
                  )}
                >
                  {stat.change}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </section>
  );
}
