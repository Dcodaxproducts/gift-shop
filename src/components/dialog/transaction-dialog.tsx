"use client";

import { CheckCircle2, PauseCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { Label } from "../ui/label";
import type { ProviderPayoutBreakdown, ProviderPayoutListItem } from "@/types/provider-payouts";

type TransactionBreakdownDialogProps = {
  breakdown?: ProviderPayoutBreakdown;
  loading?: boolean;
  selectedActivity: ProviderPayoutListItem | null;
  onApprove: (id: string) => void;
  onClose: () => void;
  onHold: (id: string) => void;
  onReject: (id: string) => void;
  processing?: boolean;
};

const formatMoney = (amount?: number) => `$${Number(amount ?? 0).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

export function TransactionBreakdownDialog({
  breakdown,
  loading,
  selectedActivity,
  onApprove,
  onClose,
  onHold,
  onReject,
  processing,
}: TransactionBreakdownDialogProps) {
  const payoutId = selectedActivity?.id;

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
            {breakdown?.provider.businessName.slice(0, 2).toUpperCase() ?? selectedActivity?.provider.businessName.slice(0, 2).toUpperCase() ?? "--"}
          </span>
          <div>
            <h3 className="text-sm font-semibold">{breakdown?.provider.businessName ?? selectedActivity?.provider.businessName}</h3>
            <p className="mt-0.5 text-[10px] font-medium text-slate-400">
              ID: {breakdown?.provider.merchantId ?? selectedActivity?.provider.providerCode ?? selectedActivity?.provider.id}
            </p>
          </div>
        </div>

        {loading ? (
          <div className="space-y-3 border-t border-slate-100 pt-4">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="h-4 animate-pulse rounded-full bg-slate-100" />
            ))}
          </div>
        ) : (
          <>
            <div className="space-y-3 border-t border-slate-100 pt-4">
              <div className="flex items-center justify-between text-xs">
                <Label>Gross Amount</Label>
                <span className="font-semibold">{formatMoney(breakdown?.grossAmount ?? selectedActivity?.pendingAmount)}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <Label>Platform Fee ({breakdown?.platformFeePercent ?? 0}%)</Label>
                <span className="font-semibold text-rose-500">-{formatMoney(breakdown?.platformFee)}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <Label>Processing Fee</Label>
                <span className="font-semibold text-rose-500">-{formatMoney(breakdown?.processingFee)}</span>
              </div>
              <div className="flex items-center justify-between border-t border-slate-100 pt-3 text-sm">
                <Label>Net Payout</Label>
                <span className="text-base font-semibold text-primary">{formatMoney(breakdown?.netPayout)}</span>
              </div>
            </div>

            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                Recent Transactions
              </p>
              <div className="mt-3 space-y-3">
                {(breakdown?.recentTransactions ?? []).length === 0 ? (
                  <p className="text-xs font-medium text-slate-400">No transactions found.</p>
                ) : (
                  breakdown?.recentTransactions.map((transaction) => (
                    <div
                      key={transaction.orderNumber}
                      className="flex items-start justify-between gap-3"
                    >
                      <div>
                        <p className="text-xs font-semibold">Order #{transaction.orderNumber}</p>
                        <p className="mt-0.5 text-[10px] font-medium text-slate-400">{transaction.description}</p>
                      </div>
                      <p className="text-xs font-semibold">{formatMoney(transaction.amount)}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </>
        )}

        <div className="space-y-4 pt-2">
          <Button className="h-11 w-full rounded-full text-xs" disabled={!payoutId || processing} onClick={() => payoutId && onApprove(payoutId)}>
            <CheckCircle2 className="size-4" strokeWidth={2.5} />
            Approve Payout
          </Button>
          <div className="grid grid-cols-2 gap-2">
            <Button variant="warning" disabled={!payoutId || processing} onClick={() => payoutId && onHold(payoutId)}>
              <PauseCircle className="size-4" /> Hold
            </Button>
            <Button variant="danger" disabled={!payoutId || processing} onClick={() => payoutId && onReject(payoutId)}>
              <XCircle className="size-4" /> Reject
            </Button>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
