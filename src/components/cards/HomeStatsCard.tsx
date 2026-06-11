import { Card, CardContent } from "@/components/ui/card";
import type { DashboardOverview } from "@/types/dashboard";
import { ArrowLeftRight, CreditCard, Store, UsersRound, type LucideIcon } from "lucide-react";

type HomeStatsCardProps = {
  data: DashboardOverview;
};

type HomeStatCard = {
  title: string;
  value: string;
  change: number;
  icon: LucideIcon;
};

const numberFormatter = new Intl.NumberFormat("en-US");
const compactCurrencyFormatter = new Intl.NumberFormat("en-US", {
  currency: "USD",
  maximumFractionDigits: 2,
  notation: "compact",
  style: "currency",
});

function buildHomeStatCards(data: DashboardOverview): HomeStatCard[] {
  return [
    {
      title: "Total Users",
      value: numberFormatter.format(data.totalUsers),
      change: data.totalUsersDeltaPercent,
      icon: UsersRound,
    },
    {
      title: "Total Providers",
      value: numberFormatter.format(data.totalProviders),
      change: data.totalProvidersDeltaPercent,
      icon: Store,
    },
    {
      title: "Transactions",
      value: compactCurrencyFormatter.format(200),
      // value: numberFormatter.format(data.transactions),
      change: data.transactionsDeltaPercent,
      icon: ArrowLeftRight,
    },
    {
      title: "Total Revenue",
      value: compactCurrencyFormatter.format(200),
      // value: compactCurrencyFormatter.format(data.totalRevenue),
      change: data.totalRevenueDeltaPercent,
      icon: CreditCard,
    },
  ];
}

export function HomeStatsCard({ data }: HomeStatsCardProps) {
  const stats = buildHomeStatCards(data);

  const ChangeBadge = ({ change }: { change: number }) => (
    <span className="rounded-full bg-primary/10 px-2.5 py-1 text-[10px] font-semibold leading-none text-primary">
      {change}%
    </span>
  );

  return (
    <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <Card key={stat.title}>
            <CardContent>
              <div className="flex items-start justify-between">
                <div className="flex size-9 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Icon className="size-4" strokeWidth={2.4} />
                </div>
                <ChangeBadge change={stat.change} />
              </div>
              <div className="mt-4">
                <p className="text-xs font-medium text-slate-500">{stat.title}</p>
                <div className="mt-1 flex items-end justify-between gap-2">
                  <p className="text-2xl font-semibold tracking-tight ">
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
