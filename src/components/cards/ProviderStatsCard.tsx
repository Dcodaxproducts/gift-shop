import type { ProviderStats as ProviderStatsData } from "@/types/providers";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { statToneClasses, type StatTone } from "@/constants/custom";

function buildProviderStatCards(data?: ProviderStatsData) {
  const stats = data ?? {
    totalProviders: 0,
    totalProvidersChangePercent: 0,
    pendingApproval: 0,
    activeRevenue: 0,
    activeRevenueChangePercent: 0,
    inactiveRate: 0,
    inactiveRateChangePercent: 0,
  };

  return [
    {
      title: "Total Providers",
      value: stats.totalProviders.toLocaleString(),
      change: stats.totalProvidersChangePercent,
      tone: "blue" as StatTone,
    },
    {
      title: "Pending Approval",
      value: stats.pendingApproval.toLocaleString(),
      change: null,
      tone: "amber" as StatTone,
    },
    {
      title: "Active Revenue",
      value: `$${stats.activeRevenue}`,
      change: stats.activeRevenueChangePercent,
      tone: "emerald" as StatTone,
    },
    {
      title: "Inactive Rate",
      value: `${stats.inactiveRate}%`,
      change: stats.inactiveRateChangePercent,
      tone: "rose" as StatTone,
    },
  ];
}

export function ProviderStatsCard({ data }: { data?: ProviderStatsData }) {
  const stats = buildProviderStatCards(data);

  const ChangeBadge = ({ change, tone }: { change: number | null; tone: StatTone }) => {
    if (change === null || change === undefined) return null;
    
    return (
      <span className={cn(
        "rounded-full px-2.5 py-1 text-[10px] font-semibold leading-none",
        statToneClasses[tone]
      )}>
        {change}%
      </span>
    );
  };

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
                <ChangeBadge change={stat.change} tone={stat.tone} />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </section>
  );
}
