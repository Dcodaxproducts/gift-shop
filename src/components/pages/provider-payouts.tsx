import type { ElementType, ReactNode } from "react";
import { ChevronDown, Download, Eye, Filter, Plus, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  earningsTierLabels,
  monthlyPayoutLabels,
  payoutActivities,
  payoutMetrics,
  type PayoutActivity,
  type PayoutMetric,
} from "@/constants/payouts";
import { cn } from "@/lib/utils";

const metricToneClass: Record<PayoutMetric["tone"], string> = {
  purple: "text-[#8b5cf6]",
  amber: "text-[#f59e0b]",
  green: "text-[#a855f7]",
  violet: "text-[#a855f7]",
};

const metricChangeClass: Record<PayoutMetric["tone"], string> = {
  purple: "text-[#10b981]",
  amber: "text-[#ef4444]",
  green: "text-[#10b981]",
  violet: "text-[#10b981]",
};

const avatarToneClass: Record<PayoutActivity["avatarTone"], string> = {
  teal: "bg-[#0f766e] text-white",
  stone: "bg-[#d6d3d1] text-[#57534e]",
  cyan: "bg-[#67c6d5] text-white",
  dark: "bg-[#1f2937] text-white",
};

const statusToneClass: Record<PayoutActivity["status"], string> = {
  Completed: "bg-[#dcfce7] text-[#16a34a]",
  Pending: "bg-[#fef3c7] text-[#d97706]",
  "On Hold": "bg-[#ffe4ef] text-[#e11d48]",
};

function PayoutCard({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <Card className={cn("rounded-xl border border-slate-100 bg-white shadow-sm", className)}>
      {children}
    </Card>
  );
}

function PayoutMetricCard({ icon: Icon, label, value, change, tone }: PayoutMetric) {
  return (
    <PayoutCard>
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-4">
          <p className="max-w-[130px] text-[12px] font-semibold leading-4 text-slate-500">{label}</p>
          <Icon className={cn("size-4 shrink-0", metricToneClass[tone])} strokeWidth={2.4} />
        </div>
        <p className="mt-3 text-[22px] font-black leading-none tracking-tight text-[#0f172a]">{value}</p>
        <p className={cn("mt-3 text-[10px] font-black", metricChangeClass[tone])}>{change}</p>
      </CardContent>
    </PayoutCard>
  );
}

function ChartHeader({ title, helper, actions }: { title: string; helper?: string; actions?: ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div>
        <h2 className="text-[15px] font-black text-[#0f172a]">{title}</h2>
        {helper ? <p className="mt-4 text-[10px] font-medium text-slate-400">{helper}</p> : null}
      </div>
      {actions}
    </div>
  );
}

function MonthlyTrendChart() {
  return (
    <PayoutCard className="overflow-hidden">
      <CardContent className="p-6">
        <ChartHeader
          title="Monthly Payout Trend"
          actions={
            <button type="button" className="flex h-8 items-center gap-2 rounded-full bg-[#f8fafc] px-4 text-[10px] font-bold text-slate-500">
              Last 6 Months
              <ChevronDown className="size-3" strokeWidth={2.5} />
            </button>
          }
        />
        <div className="relative mt-6 h-[230px] overflow-hidden rounded-xl bg-gradient-to-b from-white via-[#faf7ff] to-[#f5efff]">
          <svg viewBox="0 0 620 235" className="absolute inset-0 h-full w-full" preserveAspectRatio="none" aria-hidden="true">
            <path
              d="M0 180 C45 72 92 62 130 92 C175 126 225 116 270 66 C313 18 366 44 405 130 C437 202 482 202 520 116 C548 54 571 -22 620 92"
              fill="none"
              stroke="#7c2bb3"
              strokeLinecap="round"
              strokeWidth="8"
            />
            <path
              d="M0 180 C45 72 92 62 130 92 C175 126 225 116 270 66 C313 18 366 44 405 130 C437 202 482 202 520 116 C548 54 571 -22 620 92 L620 235 L0 235 Z"
              fill="url(#trendFill)"
              opacity="0.22"
            />
            <defs>
              <linearGradient id="trendFill" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0" stopColor="#8b2fbe" />
                <stop offset="1" stopColor="#8b2fbe" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-x-0 bottom-4 grid grid-cols-6 px-3 text-center text-[9px] font-black text-slate-400">
            {monthlyPayoutLabels.map((label) => <span key={label}>{label}</span>)}
          </div>
        </div>
      </CardContent>
    </PayoutCard>
  );
}

function EarningsDistributionChart() {
  return (
    <PayoutCard>
      <CardContent className="p-6">
        <ChartHeader title="Earnings Distribution" helper="Breakdown by Provider Tier" />
        <div className="relative mt-8 h-[220px] rounded-xl bg-white">
          <svg viewBox="0 0 280 190" className="h-full w-full" preserveAspectRatio="none" aria-hidden="true">
            <path
              d="M8 42 C52 118 94 40 138 100 C178 156 214 70 272 126"
              fill="none"
              stroke="#8b2fbe"
              strokeLinecap="round"
              strokeWidth="6"
            />
          </svg>
          <div className="absolute inset-x-0 bottom-0 grid grid-cols-4 text-center text-[9px] font-black text-slate-400">
            {earningsTierLabels.map((label) => <span key={label}>{label}</span>)}
          </div>
        </div>
      </CardContent>
    </PayoutCard>
  );
}

function StatusPill({ status }: { status: PayoutActivity["status"] }) {
  return (
    <span className={cn("inline-flex rounded-full px-3 py-1 text-[10px] font-black", statusToneClass[status])}>
      {status}
    </span>
  );
}

function ActivityAction({ icon: Icon, label }: { icon?: ElementType; label: string }) {
  return (
    <button type="button" className="inline-flex min-h-7 items-center justify-center rounded-full bg-[#f8eaff] px-3 text-center text-[10px] font-black leading-3 text-[#9c27b0] transition hover:bg-[#f3d8ff]">
      {Icon ? <Icon className="mr-1 size-3" strokeWidth={2.4} /> : null}
      {label}
    </button>
  );
}

function RecentPayoutActivities() {
  return (
    <PayoutCard className="overflow-hidden">
      <div className="flex flex-col gap-3 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[15px] font-black text-[#0f172a]">Recent Payout Activities</h2>
        <button type="button" className="flex h-8 w-full items-center gap-2 rounded-full border border-slate-200 bg-[#f8fafc] px-4 text-left text-[10px] text-slate-400 sm:w-[260px]">
          <Filter className="size-3" />
          Filter
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[830px] border-collapse text-left">
          <thead className="bg-[#f8fafc] text-[9px] font-black uppercase tracking-[0.08em] text-slate-500">
            <tr>
              <th className="px-6 py-4">Provider</th>
              <th className="px-4 py-4">Pending<br />Amount</th>
              <th className="px-4 py-4">Last<br />Payout<br />Date</th>
              <th className="px-4 py-4">Next<br />Payout<br />Date</th>
              <th className="px-4 py-4">Status</th>
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {payoutActivities.map((activity) => (
              <tr key={activity.id}>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <span className={cn("flex size-8 items-center justify-center rounded-full text-[11px] font-black ring-2 ring-white", avatarToneClass[activity.avatarTone])}>{activity.avatar}</span>
                    <div>
                      <p className="text-[12px] font-black leading-4 text-[#0f172a]">{activity.provider}</p>
                      <p className="text-[10px] font-bold text-slate-400">ID: {activity.id}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4 text-[12px] font-black text-[#0f172a]">{activity.pendingAmount}</td>
                <td className="px-4 py-4 text-[11px] font-medium leading-4 text-slate-500">{activity.lastPayoutDate}</td>
                <td className="px-4 py-4 text-[11px] font-medium leading-4 text-slate-500">{activity.nextPayoutDate}</td>
                <td className="px-4 py-4"><StatusPill status={activity.status} /></td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-center gap-2">
                    <ActivityAction icon={Eye} label="View details" />
                    <ActivityAction icon={RotateCcw} label="Initiate" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex flex-col gap-3 border-t border-slate-100 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[10px] font-medium text-slate-400">Showing 4 of 24 providers</p>
        <div className="flex items-center gap-2">
          <button type="button" className="h-7 rounded-full border border-slate-200 bg-white px-4 text-[10px] font-black text-[#0f172a]">Previous</button>
          <button type="button" className="h-7 rounded-full border border-slate-200 bg-white px-4 text-[10px] font-black text-[#0f172a]">Next</button>
        </div>
      </div>
    </PayoutCard>
  );
}

export function ProviderPayoutsPage() {
  return (
    <div className="mx-auto max-w-[1120px] space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-[28px] font-black leading-none tracking-tight text-[#0f172a]">Provider Payouts</h1>
          <p className="mt-2 text-[13px] font-medium text-slate-500">Manage and monitor provider earnings and distributions</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="h-9 rounded-lg border-slate-100 px-4 text-[11px] font-black shadow-sm">
            <Download className="size-3.5" />
            Export
          </Button>
          <Button className="h-9 rounded-lg bg-[#8b2fbe] px-4 text-[11px] font-black shadow-sm shadow-[#8b2fbe]/20 hover:bg-[#7c2bb3]">
            <Plus className="size-3.5" />
            Bulk Payout
          </Button>
        </div>
      </div>

      <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {payoutMetrics.map((metric) => <PayoutMetricCard key={metric.label} {...metric} />)}
      </section>

      <section className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_350px]">
        <MonthlyTrendChart />
        <EarningsDistributionChart />
      </section>

      <RecentPayoutActivities />
    </div>
  );
}
