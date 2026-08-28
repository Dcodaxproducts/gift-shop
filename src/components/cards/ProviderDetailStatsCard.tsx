import type { ElementType } from "react";
import { ShieldCheck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { statBadgeTone } from "@/constants/custom";
import { cn } from "@/lib/utils";
import type { ProviderDetails } from "@/types/providers";

function buildProviderDetailStats(data?: ProviderDetails) {
  return [
    {
      icon: ShieldCheck,
      label: "Performance",
      value: `${50}%`,
      // value: `${data?.stats?.performanceStats || 0}%`,
      change: `${data?.stats?.performanceChangePercent || 0}%`,
      changeTone: "green" as const,
    },
    {
      icon: ShieldCheck,
      label: "Listed Items",
      value: String(10),
      // value: String(data?.stats?.listedItems || 0),
      change: `${data?.stats?.listedItemsChange || 0}%`,
      changeTone: "green" as const,
    },
    {
      icon: ShieldCheck,
      label: "Order Fulfillment",
      value: String(2),
      // value: String(data?.stats?.orderFulfillment || 0),
      change: `${data?.stats?.orderFulfillmentChangePercent || 0}%`,
      changeTone: "green" as const,
    },
    {
      icon: ShieldCheck,
      label: "Dispute Count",
      value: String(8),
      // value: String(data?.stats?.disputeCount || 0),
      change: `${data?.stats?.disputeChangePercent || 0}%`,
      changeTone: "orange" as const,
    },
  ];
}

function ProviderStatCard({
  icon: Icon,
  label,
  value,
  change,
  changeTone,
}: {
  icon: ElementType;
  label: string;
  value: string;
  change: string;
  changeTone: "green" | "orange";
}) {
  return (
    <Card>
      <CardContent>
        <div className="flex items-start justify-between gap-4">
          <span className="flex size-8 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Icon className="size-4" strokeWidth={2.5} />
          </span>
          <span className={cn("pt-1 text-[10px] font-semibold", statBadgeTone[changeTone])}>
            {change}
          </span>
        </div>
        <p className="mt-5 text-[11px] font-medium text-slate-400">{label}</p>
        <p className="mt-1 text-[28px] font-semibold leading-none tracking-tight ">
          {value}
        </p>
      </CardContent>
    </Card>
  );
}

export function ProviderDetailStatsCard({ data }: { data?: ProviderDetails }) {
  const providerStats = buildProviderDetailStats(data);

  return (
    <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
      {providerStats.map((stat) => (
        <ProviderStatCard key={stat.label} {...stat} />
      ))}
    </section>
  );
}
