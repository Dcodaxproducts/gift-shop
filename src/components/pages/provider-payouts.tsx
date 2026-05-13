"use client";

import { useState } from "react";
import {
  CheckCircle2,
  Download,
  ListFilter,
  PauseCircle,
  Plus,
  XCircle,
} from "lucide-react";
import { useRouter } from "next/navigation";
import {
  payoutActivities,
  payoutActivitiesPagination,
  payoutBreakdown,
  payoutMetrics,
  type PayoutActivity,
  type PayoutMetric,
} from "@/constants/payouts";
import { PageHeader } from "@/components/common/page-header";
import { DataTable } from "@/components/tables/data-table";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog } from "@/components/ui/dialog";
import { TableCell, TableHead } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import MonthlyPayoutChart from "../charts/MonthlyPayoutChart";
import EarningsDistributionChart from "../charts/EarningsDistributionChart";

const metricToneClass: Record<PayoutMetric["tone"], string> = {
  purple: "text-primary",
  amber: "text-amber-500",
  green: "text-primary",
  violet: "text-primary",
};

const metricChangeClass: Record<PayoutMetric["tone"], string> = {
  purple: "text-emerald-500",
  amber: "text-rose-500",
  green: "text-emerald-500",
  violet: "text-emerald-500",
};

const avatarToneClass: Record<PayoutActivity["avatarTone"], string> = {
  teal: "bg-teal-700 text-white",
  stone: "bg-stone-300 text-stone-600",
  cyan: "bg-cyan-400 text-white",
  dark: "bg-slate-800 text-white",
};

const statusToneClass: Record<PayoutActivity["status"], string> = {
  Completed: "bg-emerald-50 text-emerald-600",
  Pending: "bg-amber-50 text-amber-600",
  "On Hold": "bg-rose-50 text-rose-600",
};

function PayoutMetricCard({ icon: Icon, label, value, change, tone }: PayoutMetric) {
  return (
    <Card>
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-4">
          <p className="text-xs font-semibold leading-4 text-slate-500">{label}</p>
          <Icon
            className={cn("size-4 shrink-0", metricToneClass[tone])}
            strokeWidth={2.4}
          />
        </div>
        <p className="mt-3 text-[22px] font-semibold leading-none tracking-tight text-slate-950">
          {value}
        </p>
        <p className={cn("mt-3 text-[10px] font-semibold", metricChangeClass[tone])}>
          {change}
        </p>
      </CardContent>
    </Card>
  );
}


function RecentPayoutActivities() {
  const [page, setPage] = useState(1);
  const [selectedActivity, setSelectedActivity] = useState<PayoutActivity | null>(null);
  const router = useRouter();

  const closeDialog = () => setSelectedActivity(null);

  return (
    <div className="rounded-2xl border border-b-0 border-slate-200">
      <div className="flex flex-col gap-3 rounded-t-2xl bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-sm font-semibold text-slate-950">Recent Payout Activities</h2>
        <Button variant="outline" className="h-9 rounded-full px-4 text-xs">
          <ListFilter className="size-3.5" />
          Filter
        </Button>
      </div>

      <DataTable
        data={payoutActivities}
        pagination={{
          ...payoutActivitiesPagination,
          page,
          onPageChange: setPage,
        }}
        isBorder={false}
        onRowClick={(activity) => router.push(`/providers/${activity.providerSlug}`)}
        headers={
          <>
            <TableHead>Provider</TableHead>
            <TableHead>Pending Amount</TableHead>
            <TableHead>Last Payout Date</TableHead>
            <TableHead>Next Payout Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </>
        }
        row={(activity: PayoutActivity) => (
          <>
            <TableCell>
              <div className="flex items-center gap-3">
                <span
                  className={cn(
                    "flex size-9 items-center justify-center rounded-full text-[11px] font-semibold",
                    avatarToneClass[activity.avatarTone],
                  )}
                >
                  {activity.avatar}
                </span>
                <div>
                  <p className="text-xs font-semibold leading-4 text-slate-950">
                    {activity.provider}
                  </p>
                  <p className="text-[10px] font-medium text-slate-400">
                    ID: {activity.id}
                  </p>
                </div>
              </div>
            </TableCell>
            <TableCell className="text-xs font-semibold text-slate-950">
              {activity.pendingAmount}
            </TableCell>
            <TableCell className="text-xs text-slate-500">{activity.lastPayoutDate}</TableCell>
            <TableCell className="text-xs text-slate-500">{activity.nextPayoutDate}</TableCell>
            <TableCell>
              <span
                className={cn(
                  "inline-flex rounded-full px-3 py-1 text-[10px] font-semibold",
                  statusToneClass[activity.status],
                )}
              >
                {activity.status}
              </span>
            </TableCell>
            <TableCell>
              <Button
                variant="ghost"
                className="h-7 rounded-full bg-primary/10 px-3 text-[10px] text-primary hover:bg-primary/15"
                onClick={(event) => {
                  event.stopPropagation();
                  setSelectedActivity(activity);
                }}
              >
                Initiate
              </Button>
            </TableCell>
          </>
        )}
      />

      <Dialog
        open={Boolean(selectedActivity)}
        onOpenChange={(open) => {
          if (!open) {
            closeDialog();
          }
        }}
        title="Transaction Breakdown"
        hideHeaderBorder
        className="max-w-[420px] rounded-2xl"
        headerClassName="px-6 pt-5 pb-0"
        contentClassName="px-6 pt-4 pb-6"
      >
        <div className="space-y-5">
          <div className="flex items-center gap-3">
            <span className="flex size-11 items-center justify-center rounded-2xl bg-primary/10 text-sm font-semibold text-primary">
              CT
            </span>
            <div>
              <h3 className="text-sm font-semibold text-slate-950">{payoutBreakdown.provider}</h3>
              <p className="mt-0.5 text-[10px] font-medium text-slate-400">
                ID: {payoutBreakdown.merchantId}
              </p>
            </div>
          </div>

          <div className="space-y-3 border-t border-slate-100 pt-4">
            <div className="flex items-center justify-between text-xs">
              <span className="font-medium text-slate-500">Gross Amount</span>
              <span className="font-semibold text-slate-950">{payoutBreakdown.grossAmount}</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="font-medium text-slate-500">Platform Fee (10%)</span>
              <span className="font-semibold text-rose-500">{payoutBreakdown.platformFee}</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="font-medium text-slate-500">Processing Fee</span>
              <span className="font-semibold text-rose-500">{payoutBreakdown.processingFees}</span>
            </div>
            <div className="flex items-center justify-between border-t border-slate-100 pt-3 text-sm">
              <span className="font-semibold text-slate-950">Net Payout</span>
              <span className="text-base font-semibold text-primary">{payoutBreakdown.netPayout}</span>
            </div>
          </div>

          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
              Recent Transactions
            </p>
            <div className="mt-3 space-y-3">
              {payoutBreakdown.recentTransactions.map((transaction) => (
                <div
                  key={transaction.orderId}
                  className="flex items-start justify-between gap-3"
                >
                  <div>
                    <p className="text-xs font-semibold text-slate-950">Order #{transaction.orderId}</p>
                    <p className="mt-0.5 text-[10px] font-medium text-slate-400">{transaction.date}</p>
                  </div>
                  <p className="text-xs font-semibold text-slate-950">{transaction.amount}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2 pt-2">
            <Button className="h-11 w-full rounded-full text-xs">
              <CheckCircle2 className="size-4" strokeWidth={2.5} />
              Approve Payout
            </Button>
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant="outline"
                className="h-10 rounded-full text-xs"
              >
                <PauseCircle className="size-4" strokeWidth={2.5} />
                Hold
              </Button>
              <Button
                variant="outline"
                className="h-10 rounded-full border-rose-200 text-xs text-rose-500 hover:bg-rose-50"
              >
                <XCircle className="size-4" strokeWidth={2.5} />
                Reject
              </Button>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
}

export function ProviderPayoutsPage() {
  return (
    <div className="space-y-5">
      <PageHeader
        title="Provider Payouts"
        description="Manage and monitor provider earnings and distributions"
        actions={
          <>
            <Button variant="outline">
              <Download className="size-3.5" />
              Export
            </Button>
            <Button>
              <Plus className="size-3.5" />
              Bulk Payout
            </Button>
          </>
        }
      />

      <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {payoutMetrics.map((metric) => (
          <PayoutMetricCard key={metric.label} {...metric} />
        ))}
      </section>

      <section className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_350px]">
        <MonthlyPayoutChart />
        <EarningsDistributionChart />
      </section>

      <RecentPayoutActivities />
    </div>
  );
}
