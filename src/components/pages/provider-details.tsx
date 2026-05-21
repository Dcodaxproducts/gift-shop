"use client";

import type { ElementType } from "react";
import {
  ListFilter,
  ShieldCheck,
} from "lucide-react";
import {
} from "@/constants/providers";
import { PageHeader } from "@/components/common/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import QuickActionsCard from "../cards/QuickActionsCard";
import { useProvider } from "@/hooks/useProviders";
import { useParams } from "next/navigation";
import ProviderItemsTable from "../tables/ProviderItemsTable";
import BusinessDetailsCard from "../cards/BusinessDetailsCard";
import { statBadgeTone } from "@/constants/custom";

function buildProviderDetailStats(data?: any) {
  return [
    {
      icon: ShieldCheck,
      label: "Performance",
      value: `${data?.stats?.performanceStats || 0}%`,
      change: `${data?.stats?.performanceChangePercent || 0}%`,
      changeTone: "green" as const,
    },
    {
      icon: ShieldCheck,
      label: "Listed Items",
      value: String(data?.stats?.listedItems || 0),
      change: `${data?.stats?.listedItemsChange || 0}%`,
      changeTone: "green" as const,
    },
    {
      icon: ShieldCheck,
      label: "Order Fulfillment",
      value: String(data?.stats?.orderFulfillment || 0),
      change: `${data?.stats?.orderFulfillmentChangePercent || 0}%`,
      changeTone: "green" as const,
    },
    {
      icon: ShieldCheck,
      label: "Dispute Count",
      value: String(data?.stats?.disputeCount || 0),
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
    <Card className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-4">
          <span className="flex size-8 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Icon className="size-4" strokeWidth={2.5} />
          </span>
          <span className={cn("pt-1 text-[10px] font-semibold", statBadgeTone[changeTone])}>
            {change}
          </span>
        </div>
        <p className="mt-5 text-[11px] font-medium text-slate-400">{label}</p>
        <p className="mt-1 text-[28px] font-semibold leading-none tracking-tight text-slate-950">
          {value}
        </p>
      </CardContent>
    </Card>
  );
}

export function ProviderDetailsPage() {
  const params = useParams();
  const { data } = useProvider(params.id as string);

  const providerStats = buildProviderDetailStats(data);

  return (
    <div className="space-y-5">
      <PageHeader
        title={data?.businessName || "Provider Profile"}
        // actions={
        //   <Button>
        //     <ListFilter className="size-3.5" />
        //     Filter
        //   </Button>
        // }
      />

      <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {providerStats.map((stat) => (
          <ProviderStatCard key={stat.label} {...stat} />
        ))}
      </section>

      <section className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_330px]">
        <div className="self-start">
          <ProviderItemsTable providerId={params.id as string} />
        </div>
        <aside className="space-y-5">
          <BusinessDetailsCard data={data} />
          <QuickActionsCard provider={data} />
        </aside>
      </section>
    </div>
  );
}
