"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { DataTable } from "@/components/tables/data-table";
import { Button } from "@/components/ui/button";
import { TableCell } from "@/components/ui/table";
import { Can } from "@/components/auth/can";
import { StatusBadge } from "@/utils/status";
import { TransactionBreakdownDialog } from "../dialog/transaction-dialog";
import { useProviderPayouts } from "@/hooks/useProviderPayouts";
import type { ProviderPayoutListItem } from "@/types/provider-payouts";
import { formatDate } from "@/utils/formatDate";

const recentPayoutColumns = ["Provider", "Pending Amount", "Last Payout Date", "Next Payout Date", "Status", "Actions"];

export function RecentPayoutActivities() {
  const [page, setPage] = useState(1);
  const [selectedActivity, setSelectedActivity] = useState<ProviderPayoutListItem | null>(null);
  const router = useRouter();
  const limit = 4;
  const { data: payouts = [], isLoading: isPayoutsLoading } = useProviderPayouts({
    page,
    limit,
    sortBy: "createdAt",
    sortOrder: "DESC",
  });

  const hasNextPage = payouts.length === limit;

  const pagination = {
    total: (page - 1) * limit + payouts.length + (hasNextPage ? 1 : 0),
    page,
    limit,
    totalPages: page + (hasNextPage ? 1 : 0),
    hasNext: hasNextPage,
    hasPrevious: page > 1,
  };

  const closeDialog = () => setSelectedActivity(null);

  const renderPayoutRow = (activity: ProviderPayoutListItem) => (
    <>
      <TableCell>
        <div className="flex items-center gap-3">
          <span className="flex size-9 items-center justify-center rounded-full bg-primary/10 text-[11px] font-semibold text-primary">
            {activity.provider.businessName.charAt(0)}
          </span>
          <div>
            <p className="text-xs font-semibold leading-4">{activity.provider.businessName}</p>
            <p className="text-[10px] font-medium text-slate-400">ID: {activity.provider.providerCode ?? activity.provider.id}</p>
          </div>
        </div>
      </TableCell>
      <TableCell className="font-semibold">${activity.pendingAmount.toFixed(2)}</TableCell>
      <TableCell>{formatDate(activity.lastPayoutDate)}</TableCell>
      <TableCell>{formatDate(activity.nextPayoutDate)}</TableCell>
      <TableCell>
        <StatusBadge status={activity.status} />
      </TableCell>
      <TableCell>
        <div className="flex items-center justify-end">
          <Can module="providerPayouts" action="update">
            <Button
              variant="soft"
              onClick={(event) => {
                event.stopPropagation();
                setSelectedActivity(activity);
              }}
            >
              Initiate
            </Button>
          </Can>
        </div>
      </TableCell>
    </>
  );

  return (
    <div className="rounded-2xl border border-b-0 border-slate-200">
      <div className="flex flex-col gap-3 rounded-t-2xl bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-sm font-semibold ">Recent Payout Activities</h2>
      </div>

      <DataTable
        data={payouts}
        pagination={{ ...pagination, onPageChange: setPage }}
        isBorder={false}
        loading={isPayoutsLoading}
        skeletonRows={4}
        onRowClick={(activity) => router.push(`/providers/${activity.provider.id}`)}
        headers={recentPayoutColumns}
        row={renderPayoutRow}
      />
      
      <TransactionBreakdownDialog
        selectedActivity={selectedActivity}
        onClose={closeDialog}
      />
    </div>
  );
}
