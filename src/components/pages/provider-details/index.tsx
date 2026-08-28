"use client";

import { useState } from "react";
import PageHeader from "@/components/common/page-header";
import { useProvider } from "@/hooks/useProviders";
import { useParams, useSearchParams } from "next/navigation";
import ProviderItemsTable from "@/components/tables/ProviderItemsTable";
import ProviderDocumentsTab from "@/components/tables/ProviderDocumentsTab";
import { ProviderDetailStatsCard } from "@/components/cards/ProviderDetailStatsCard";
import BusinessDetailsCard from "./components/BusinessDetailsCard";
import QuickActionsCard from "./components/QuickActionsCard";
import { ProviderDetailsTabs, type TabKey } from "./components/ProviderDetailsTabs";

export function ProviderDetailsPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const { data } = useProvider(params.id as string);

  const initialTab = (searchParams.get("tab") as TabKey) || "overview";
  const [activeTab, setActiveTab] = useState<TabKey>(initialTab);

  const providerId = params.id as string;

  return (
    <div className="space-y-5">
      <PageHeader
        title={data?.businessName || "Provider Profile"}
      />

      <ProviderDetailsTabs activeTab={activeTab} onTabChange={setActiveTab} />

      {activeTab === "overview" && (
        <>
          <ProviderDetailStatsCard data={data} />

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
