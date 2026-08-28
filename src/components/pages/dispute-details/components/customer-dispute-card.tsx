import { UserRound } from "lucide-react";

import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import type { Dispute } from "@/types/disputes";
import { cn } from "@/lib/utils";
import { StatusBadge } from "@/utils/status";

const detailValueClassName = "mt-1 text-xs font-medium text-slate-900";

function DetailItem({
  label,
  value,
  className,
}: {
  label: string;
  value: React.ReactNode;
  className?: string;
}) {
  return (
    <div className="min-w-0">
      <Label>{label}</Label>
      <p className={cn(detailValueClassName, className)}>{value}</p>
    </div>
  );
}

export function CustomerDisputeCard({ dispute }: { dispute: Dispute }) {
  const { customer, transaction, priority, status, reason, amount } = dispute;

  return (
    <Card className="p-5">
      <div className="grid gap-4 md:grid-cols-[44px_minmax(0,1fr)_auto]">
        <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <UserRound className="size-5" />
        </div>

        <div className="min-w-0">
          <h2 className="truncate text-lg font-semibold">{customer.name}</h2>
          <p className="mt-0.5 truncate text-xs text-slate-500">{customer.email}</p>
        </div>

        <div className="flex items-start gap-2">
          <StatusBadge status={priority} />
          <StatusBadge status={status} />
        </div>
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-3">
        <DetailItem label="Transaction ID" value={transaction.transactionId} />
        <DetailItem label="Amount" value={`$${amount.toFixed(2)}`} className="text-base font-bold text-primary" />
        <DetailItem label="Dispute Reason" value={reason.replace(/_/g, " ").toLowerCase()} />
      </div>
    </Card>
  );
}
