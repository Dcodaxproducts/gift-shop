import {
  chartPeriodOptions,
  dashboardStats,
  monthlyRevenueTrends,
  paymentSplit,
  providerPerformance,
  recentDisputes,
} from "@/constants/home-dashboard";
import { StatCard } from "@/components/cards/stat-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

const maxRevenue = Math.max(...monthlyRevenueTrends.map((item) => item.ghostValue));

const disputeToneClass = {
  danger: "bg-red-50 text-red-500",
  warning: "bg-amber-50 text-amber-500",
  muted: "bg-slate-100 text-slate-500",
};

const progressToneClass = {
  green: "bg-emerald-500",
  amber: "bg-amber-500",
};

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
            <Select defaultValue="12-months">
              <SelectTrigger className="w-[132px]">
                <SelectValue placeholder="Select period" />
              </SelectTrigger>
              <SelectContent>
                {chartPeriodOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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

      <section className="grid gap-5 xl:grid-cols-2">
        <Card className="rounded-2xl border border-border bg-white shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between p-5 pb-4">
            <CardTitle className="text-base font-semibold text-slate-950">
              Provider Performance
            </CardTitle>
            <button type="button" className="text-xs font-semibold text-primary">
              View All
            </button>
          </CardHeader>
          <CardContent className="p-0">
            <div className="grid grid-cols-[1.1fr_1fr_0.75fr] border-b border-border px-5 pb-3 text-[10px] font-semibold uppercase tracking-wide text-slate-400">
              <span>Provider</span>
              <span>Success Rate</span>
              <span>Total Volume</span>
            </div>
            <div className="divide-y divide-border">
              {providerPerformance.map((provider) => (
                <div
                  key={provider.provider}
                  className="grid grid-cols-[1.1fr_1fr_0.75fr] items-center gap-4 px-5 py-4"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex size-8 items-center justify-center rounded-xl bg-primary/10 text-[10px] font-semibold text-primary">
                      {provider.shortCode}
                    </span>
                    <span className="text-xs font-semibold text-slate-700">
                      {provider.provider}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 flex-1 rounded-full bg-slate-100">
                      <div
                        className={cn("h-full rounded-full", progressToneClass[provider.tone])}
                        style={{ width: `${provider.progress}%` }}
                      />
                    </div>
                    <span className="text-[10px] font-semibold text-slate-600">
                      {provider.successRate}
                    </span>
                  </div>
                  <span className="text-xs font-semibold text-slate-950">
                    {provider.volume}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border border-border bg-white shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between p-5 pb-4">
            <CardTitle className="text-base font-semibold text-slate-950">
              Recent Disputes
            </CardTitle>
            <span className="rounded-full bg-red-50 px-2 py-1 text-[10px] font-semibold text-red-500">
              4 Urgent
            </span>
          </CardHeader>
          <CardContent className="p-0">
            <div className="grid grid-cols-[0.85fr_1fr_0.75fr] border-b border-border px-5 pb-3 text-[10px] font-semibold uppercase tracking-wide text-slate-400">
              <span>ID & User</span>
              <span>Reason</span>
              <span>Status</span>
            </div>
            <div className="divide-y divide-border">
              {recentDisputes.map((dispute) => (
                <div
                  key={dispute.id}
                  className="grid grid-cols-[0.85fr_1fr_0.75fr] items-center gap-4 px-5 py-4"
                >
                  <div>
                    <p className="text-[10px] font-semibold text-primary">{dispute.id}</p>
                    <p className="mt-1 text-xs font-semibold leading-4 text-slate-700">
                      {dispute.user}
                    </p>
                  </div>
                  <p className="text-xs leading-5 text-slate-500">{dispute.reason}</p>
                  <span
                    className={cn(
                      "w-fit rounded-full px-3 py-1.5 text-[10px] font-semibold",
                      disputeToneClass[dispute.tone],
                    )}
                  >
                    {dispute.status}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
