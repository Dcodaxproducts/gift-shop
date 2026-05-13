import { HomeStatsCard } from "@/components/cards/HomeStatsCard";
import { RevenueBarChart } from "../charts/RevenueChart";
import { PaymentDistributionChart } from "../charts/PaymentChart";
import { ProviderPerformanceTable } from "../tables/ProviderPerformanceTable";
import { RecentDisputesTable } from "../tables/RecentDisputesTable";

export function HomePage() {
  return (
    <div className="space-y-5">
      <HomeStatsCard />

      <section className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_310px]">
        <RevenueBarChart />
        <PaymentDistributionChart />
      </section>

      <section className="grid gap-5 xl:grid-cols-2">
        <ProviderPerformanceTable />
        <RecentDisputesTable />
      </section>
    </div>
  );
}