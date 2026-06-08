import { ArrowLeftRight, BadgeDollarSign, Store, UsersRound } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { DisputeStats } from "@/types/disputes";

const statIcons = {
  users: UsersRound,
  store: Store,
  shuffle: ArrowLeftRight,
  refund: BadgeDollarSign,
};

const statToneClasses = {
  primary: {
    icon: "bg-primary/10 text-primary",
    value: "",
  },
  danger: {
    icon: "bg-primary/10 text-primary",
    value: "text-red-600",
  },
};

function formatDelta(value: number) {
  return `${value > 0 ? "+" : ""}${value}%`;
}

function buildDisputeRefundStats(data?: DisputeStats) {
  return [
    {
      label: "Open Cases",
      value: String(data?.openCases ?? 0),
      change: formatDelta(data?.openCasesDelta ?? 0),
      tone: "primary",
      icon: "users",
    },
    {
      label: "Awaiting Action",
      value: String(data?.awaitingAction ?? 0),
      change: "Alert",
      tone: "primary",
      icon: "store",
    },
    {
      label: "Escalated",
      value: String(data?.escalated ?? 0),
      change: "Alert",
      tone: "danger",
      icon: "shuffle",
    },
    {
      label: "Resolved This Week",
      value: String(data?.resolvedThisWeek ?? 0),
      change: formatDelta(data?.resolvedDeltaPercent ?? 0),
      tone: "primary",
      icon: "refund",
    },
  ] as const;
}

export function DisputeRefundStatsCard({ data }: { data?: DisputeStats }) {
  const stats = buildDisputeRefundStats(data);

  return (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => {
        const Icon = statIcons[stat.icon];
        const tone = statToneClasses[stat.tone];

        return (
          <Card key={stat.label}>
            <CardContent>
              <div className="flex items-start justify-between gap-3">
                <span className={cn("flex size-9 items-center justify-center rounded-xl", tone.icon)}>
                  <Icon className="size-4" strokeWidth={2.4} />
                </span>
                <span className="rounded-full bg-emerald-50 px-2 py-1 text-[10px] font-semibold leading-none text-emerald-500">
                  {stat.change}
                </span>
              </div>
              <p className="mt-5 text-xs font-medium text-slate-500">{stat.label}</p>
              <p className={cn("mt-1 text-2xl font-semibold leading-none tracking-tight", tone.value)}>
                {stat.value}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </section>
  );
}
