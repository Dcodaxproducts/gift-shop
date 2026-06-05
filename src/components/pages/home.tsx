"use client";

import { HomeStatsCard } from "@/components/cards/HomeStatsCard";
import { ErrorMessage } from "@/components/common/error-message";
import { DashboardSkeleton } from "@/components/skeletons";
import { RevenueBarChart } from "../charts/RevenueChart";
import { PaymentDistributionChart } from "../charts/PaymentChart";
import { ProviderPerformanceTable } from "../tables/ProviderPerformanceTable";
import { RecentDisputesTable } from "../tables/RecentDisputesTable";
import { useDashboard } from "@/hooks/useDashboard";
import { getErrorMessage } from "@/lib/errors";

export function HomePage() {
  const { data, error, isLoading, refetch } = useDashboard();

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  if (error || !data) {
    return (
      <ErrorMessage
        message={getErrorMessage(error, "Failed to fetch dashboard data. Please try again.")}
        onRetry={() => refetch()}
      />
    );
  }

  return (
    <div className="space-y-5">
      <HomeStatsCard data={data.overview} />

      <section className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_310px]">
        <RevenueBarChart data={data.revenueTrends} />
        <PaymentDistributionChart data={data.giftVsPayment} />
      </section>

      <section className="grid gap-5 xl:grid-cols-2">
        <ProviderPerformanceTable providers={data.providerPerformance} />
        <RecentDisputesTable disputes={data.recentDisputes} />
      </section>
    </div>
  );
}
