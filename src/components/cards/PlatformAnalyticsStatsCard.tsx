import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { statToneClasses, type StatTone } from "@/constants/custom";

type PlatformAnalyticsStat = {
  title: string;
  value: string;
  change: string;
  tone: StatTone;
};

const platformAnalyticsStats: PlatformAnalyticsStat[] = [
  {
    title: "Total Revenue",
    value: "$154,320",
    change: "+8.1%",
    tone: "emerald",
  },
  {
    title: "New Subscriptions",
    value: "215",
    change: "+5.3%",
    tone: "emerald",
  },
  {
    title: "Churn Rate",
    value: "2.9%",
    change: "0.1%",
    tone: "blue",
  },
  {
    title: "Active Users",
    value: "5,120",
    change: "-2.1%",
    tone: "rose",
  },
];

export function PlatformAnalyticsStatsCard() {
  return (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {platformAnalyticsStats.map((stat) => (
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
