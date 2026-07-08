"use client";

import { useState, type ElementType } from "react";
import {
  ShieldCheck,
} from "lucide-react";
import PageHeader from "@/components/common/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import QuickActionsCard from "../cards/QuickActionsCard";
import { useProvider } from "@/hooks/useProviders";
import { useParams, useSearchParams } from "next/navigation";
import ProviderItemsTable from "../tables/ProviderItemsTable";
import ProviderDocumentsTab from "../tables/ProviderDocumentsTab";
import BusinessDetailsCard from "../cards/BusinessDetailsCard";
import { statBadgeTone } from "@/constants/custom";
import type { ProviderDetails } from "@/types/providers";

const TABS = [
  { key: "overview", label: "Overview" },
  { key: "documents", label: "Documents" },
] as const;

type TabKey = (typeof TABS)[number]["key"];

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
    <Card >
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

export function ProviderDetailsPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const { data } = useProvider(params.id as string);

  const initialTab = (searchParams.get("tab") as TabKey) || "overview";
  const [activeTab, setActiveTab] = useState<TabKey>(initialTab);

  const providerStats = buildProviderDetailStats(data);
  const providerId = params.id as string;

  return (
    <div className="space-y-5">
      <PageHeader
        title={data?.businessName || "Provider Profile"}
      />

      <div className="flex gap-1 border-b border-slate-200">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setActiveTab(tab.key)}
            className={cn(
              "px-4 py-2.5 text-sm font-semibold transition-colors",
              activeTab === tab.key
                ? "border-b-2 border-primary text-primary"
                : "text-slate-400 hover:text-slate-600",
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "overview" && (
        <>
          <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {providerStats.map((stat) => (
              <ProviderStatCard key={stat.label} {...stat} />
            ))}
          </section>

          <section className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_330px]">
            <div className="self-start">
              <ProviderItemsTable providerId={providerId} />
            </div>
            <aside className="space-y-5">
              <BusinessDetailsCard data={data} />
              <QuickActionsCard provider={data} />
            </aside>
          </section>
        </>
      )}

      {activeTab === "documents" && (
        <ProviderDocumentsTab providerId={providerId} />
      )}
    </div>
  );
}
