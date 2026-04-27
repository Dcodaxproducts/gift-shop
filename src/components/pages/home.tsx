import {
  dashboardStats,
  monthlyRevenueTrends,
  paymentSplit,
} from "@/constants/home-dashboard";
import { StatCard } from "@/components/cards/stat-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const maxRevenue = Math.max(...monthlyRevenueTrends.map((item) => item.ghostValue));

export function HomePage() {
  return (
    <div className="space-y-5">
      <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {dashboardStats.map((stat) => (
          <StatCard key={stat.title} stat={stat} />
        ))}
      </section>

      <section className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_310px]">
        <Card className="rounded-2xl border border-border bg-white shadow-sm">
          <CardHeader className="flex flex-row items-start justify-between gap-4 p-5 pb-0">
            <div>
              <CardTitle className="text-base font-semibold text-slate-950">
                Monthly Revenue Trends
              </CardTitle>
              <p className="mt-1 text-xs font-medium text-slate-400">
                Yearly comparative growth analysis
              </p>
            </div>
            <button
              type="button"
              className="rounded-full bg-slate-100 px-3 py-2 text-xs font-medium text-slate-500"
            >
              Last 12 Months⌄
            </button>
          </CardHeader>
          <CardContent className="px-5 pb-5 pt-9">
            <div className="flex h-[205px] items-end gap-1.5 sm:gap-2.5">
              {monthlyRevenueTrends.map((item) => (
                <div key={item.month} className="flex flex-1 flex-col items-center gap-3">
                  <div className="relative h-[160px] w-full">
                    <div
                      className="absolute bottom-0 left-0 right-0 rounded-t-sm bg-primary/10"
                      style={{ height: `${(item.ghostValue / maxRevenue) * 100}%` }}
                    />
                    <div
                      className="absolute bottom-0 left-0 right-0 rounded-t-sm bg-primary"
                      style={{ height: `${(item.value / maxRevenue) * 100}%` }}
                    />
                  </div>
                  <span className="text-[11px] font-medium text-slate-400">
                    {item.month}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border border-border bg-white shadow-sm">
          <CardHeader className="p-5 pb-0">
            <CardTitle className="text-base font-semibold text-slate-950">
              Gift vs Payment
            </CardTitle>
            <p className="mt-1 text-xs font-medium text-slate-400">
              Service utilization distribution
            </p>
          </CardHeader>
          <CardContent className="p-5">
            <div className="mx-auto mb-7 mt-6 flex size-44 items-center justify-center rounded-full bg-[conic-gradient(var(--primary)_0_65%,#e2e8f0_65%_100%)]">
              <div className="flex size-32 flex-col items-center justify-center rounded-full bg-white text-center">
                <span className="text-3xl font-semibold text-slate-950">65%</span>
                <span className="mt-1 text-[10px] font-semibold uppercase text-slate-400">
                  Gift Usage
                </span>
              </div>
            </div>
            <div className="space-y-3.5">
              {paymentSplit.map((item) => (
                <div key={item.label} className="flex items-center text-xs font-medium">
                  <span
                    className={cn(
                      "mr-2 size-2 rounded-full",
                      item.color === "primary" ? "bg-primary" : "bg-slate-300",
                    )}
                  />
                  <span className="text-slate-500">{item.label}</span>
                  <span className="ml-auto font-semibold text-slate-950">{item.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
