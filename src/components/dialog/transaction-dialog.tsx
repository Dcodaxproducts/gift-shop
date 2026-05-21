"use client";

import { CheckCircle2, PauseCircle, XCircle } from "lucide-react";
import { payoutBreakdown } from "@/constants/payouts";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import type { PayoutActivity } from "@/constants/payouts";
import { Label } from "../ui/label";

type TransactionBreakdownDialogProps = {
  selectedActivity: PayoutActivity | null;
  onClose: () => void;
};

export function TransactionBreakdownDialog({
  selectedActivity,
  onClose,
}: TransactionBreakdownDialogProps) {
  return (
    <Dialog
      open={Boolean(selectedActivity)}
      onOpenChange={(open) => {
        if (!open) onClose();
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
            <h3 className="text-sm font-semibold">{payoutBreakdown.provider}</h3>
            <p className="mt-0.5 text-[10px] font-medium text-slate-400">
              ID: {payoutBreakdown.merchantId}
            </p>
          </div>
        </div>

        <div className="space-y-3 border-t border-slate-100 pt-4">
          <div className="flex items-center justify-between text-xs">
            <Label>Gross Amount</Label>
            <span className="font-semibold">{payoutBreakdown.grossAmount}</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <Label>Platform Fee (10%)</Label>
            <span className="font-semibold text-rose-500">{payoutBreakdown.platformFee}</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <Label>Processing Fee</Label>
            <span className="font-semibold text-rose-500">{payoutBreakdown.processingFees}</span>
          </div>
          <div className="flex items-center justify-between border-t border-slate-100 pt-3 text-sm">
            <Label>Net Payout</Label>
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
                  <p className="text-xs font-semibold">Order #{transaction.orderId}</p>
                  <p className="mt-0.5 text-[10px] font-medium text-slate-400">{transaction.date}</p>
                </div>
                <p className="text-xs font-semibold">{transaction.amount}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4 pt-2">
          <Button className="h-11 w-full rounded-full text-xs">
            <CheckCircle2 className="size-4" strokeWidth={2.5} />
            Approve Payout
          </Button>
          <div className="grid grid-cols-2 gap-2">
            <Button variant="warning">
              <PauseCircle className="size-4" /> Hold
            </Button>
            <Button variant="danger">
              <XCircle className="size-4" /> Reject
            </Button>
          </div>
        </div>
      </div>
    </Dialog>
  );
}