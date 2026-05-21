"use client";

import { useState } from "react";
import {
  Download,
  ListFilter,
  Plus,
} from "lucide-react";
import { useRouter } from "next/navigation";
import {
  payoutActivities,
  payoutActivitiesPagination,
  payoutMetrics,
  type PayoutActivity,
} from "@/constants/payouts";
import { PageHeader } from "@/components/common/page-header";
import { DataTable } from "@/components/tables/data-table";
import { Button } from "@/components/ui/button";
import { TableCell, TableHead } from "@/components/ui/table";
import MonthlyPayoutChart from "../charts/MonthlyPayoutChart";
import EarningsDistributionChart from "../charts/EarningsDistributionChart";
import { StatusBadge } from "@/utils/status";
import { TransactionBreakdownDialog } from "../dialog/transaction-dialog";
import PayoutMetricCard from "../cards/PayoutMetricCard";

function RecentPayoutActivities() {
  const [page, setPage] = useState(1);
  const [selectedActivity, setSelectedActivity] = useState<PayoutActivity | null>(null);
  const router = useRouter();

  const closeDialog = () => setSelectedActivity(null);

  return (
    <div className="rounded-2xl border border-b-0 border-slate-200">
      <div className="flex flex-col gap-3 rounded-t-2xl bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-sm font-semibold ">Recent Payout Activities</h2>
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
                  className="flex size-9 items-center justify-center rounded-full text-[11px] font-semibold bg-primary/10 text-primary"
                >
                  {activity.avatar}
                </span>
                <div>
                  <p className="text-xs font-semibold leading-4">
                    {activity.provider}
                  </p>
                  <p className="text-[10px] font-medium text-slate-400">
                    ID: {activity.id}
                  </p>
                </div>
              </div>
            </TableCell>
            <TableCell className="font-semibold">
              {activity.pendingAmount}
            </TableCell>
            <TableCell>{activity.lastPayoutDate}</TableCell>
            <TableCell>{activity.nextPayoutDate}</TableCell>
            <TableCell>{StatusBadge({ status: activity.status })}</TableCell>
            <TableCell>
              <Button
                variant="soft"
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
      <TransactionBreakdownDialog
        selectedActivity={selectedActivity}
        onClose={closeDialog}
      />
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
