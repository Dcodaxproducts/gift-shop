"use client";

import { useState } from "react";
import PageHeader from "@/components/common/page-header";
import MonthlyPayoutChart from "../charts/MonthlyPayoutChart";
import EarningsDistributionChart from "../charts/EarningsDistributionChart";
import { PayoutMetricsSection } from "../cards/PayoutMetricCard";
import { RecentPayoutActivities } from "../tables/RecentPayoutActivities";
import {
  useProviderEarningDistribution,
  useProviderPayoutStats,
  useProviderPayoutTrends,
} from "@/hooks/useProviderPayouts";
import type { ProviderPayoutTrendRange } from "@/types/provider-payouts";

export function ProviderPayoutsPage() {
  const [trendRange, setTrendRange] = useState<ProviderPayoutTrendRange>("LAST_12_MONTHS");
  const { data: stats, isLoading: isStatsLoading } = useProviderPayoutStats();
  const { data: trends } = useProviderPayoutTrends({ range: trendRange });
  const { data: earningDistribution } = useProviderEarningDistribution();

  const trendData = trends?.labels.map((label, index) => ({
    month: label,
    amount: trends.values[index] ?? 0,
  }));

  const distributionData = earningDistribution?.map((item) => ({
    tier: item.tierName,
    amount: item.totalEarnings,
  }));

  return (
    <div className="space-y-5">
      <PageHeader
        title="Provider Payouts"
        description="Manage and monitor provider earnings and distributions"
      />

      <PayoutMetricsSection stats={stats} loading={isStatsLoading} />

      <section className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_350px]">
        <MonthlyPayoutChart data={trendData ?? []} range={trendRange} onRangeChange={setTrendRange} />
        <EarningsDistributionChart data={distributionData ?? []} />
      </section>

      <RecentPayoutActivities />
    </div>
  );
}
