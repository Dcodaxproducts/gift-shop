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
import type { DashboardDispute, DashboardGiftVsPayment, DashboardProviderPerformance, DashboardRevenueTrends } from "@/types/dashboard";

const clientRevenueTrends: DashboardRevenueTrends = {
  range: "yearly",
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"],
  values: [45000, 62000, 58000, 74000, 69000, 88000, 96000, 104000, 118000],
};

const clientGiftVsPayment: DashboardGiftVsPayment = {
  giftCardsPercent: 68,
  directPaymentsPercent: 32,
};

const mockProviders: DashboardProviderPerformance[] = [
  {
    providerId: "prov-1",
    providerName: "Stripe Payments",
    successRate: 94,
    totalVolume: 1250000,
  },
  {
    providerId: "prov-2",
    providerName: "PayPal Service",
    successRate: 88, // This will trigger the 'bg-danger' color
    totalVolume: 840000,
  },
  {
    providerId: "prov-3",
    providerName: "Adyen Gateway",
    successRate: 97,
    totalVolume: 2100000,
  }
];

const mockDisputes: DashboardDispute[] = [
  {
    id: "disp-1",
    caseId: "CASE-2026-0981",
    userName: "Ahmed",
    reason: "Product not received after 14 days of estimated delivery.",
    status: "warning", // Apne project ke status types ke mutabiq adjust kar sakte hain (e.g., "pending")
  },
  {
    id: "disp-2",
    caseId: "CASE-2026-0432",
    userName: "Sara Malik",
    reason: "Fraudulent transaction reported by the cardholder.",
    status: "danger", // e.g., "open" ya "under_review"
  },
  {
    id: "disp-3",
    caseId: "CASE-2026-1105",
    userName: "Zainab Ali",
    reason: "Duplicate charge for a single subscription item.",
    status: "success", // e.g., "resolved" ya "closed"
  }
];

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
        <RevenueBarChart data={clientRevenueTrends} />
        <PaymentDistributionChart data={clientGiftVsPayment} />
      </section>

      <section className="grid gap-5 xl:grid-cols-2">
        <ProviderPerformanceTable providers={mockProviders} />
        {/* <ProviderPerformanceTable providers={data.providerPerformance} /> */}
        <RecentDisputesTable disputes={mockDisputes} />
        {/* <RecentDisputesTable disputes={data.recentDisputes} /> */}
      </section>
    </div>
  );
}
