import { dashboardStats } from "@/constants/home-dashboard";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils"
import { iconMap, statToneClasses } from "@/constants/custom";

export function HomeStatsCard() {
  const ChangeBadge = ({ change, tone }: { change: number; tone: keyof typeof statToneClasses }) => (
    <span className={cn(
      "rounded-full px-2.5 py-1 text-[10px] font-semibold leading-none",
      statToneClasses[tone]
    )}>
      {change}%
    </span>
  );

  return (
    <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
      {dashboardStats.map((stat) => {
        const Icon = iconMap[stat.icon];
        const tone = "primary" as keyof typeof statToneClasses;

        return (
          <Card key={stat.title}>
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div className={cn("flex size-9 items-center justify-center rounded-2xl", statToneClasses[tone])}>
                  <Icon className="size-4" strokeWidth={2.4} />
                </div>
                <ChangeBadge change={stat.change} tone={tone} />
              </div>
              <div className="mt-4">
                <p className="text-xs font-medium text-slate-500">{stat.title}</p>
                <div className="mt-1 flex items-end justify-between gap-2">
                  <p className="text-2xl font-semibold tracking-tight text-slate-950">
                    {stat.value}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </section>
  );
}
