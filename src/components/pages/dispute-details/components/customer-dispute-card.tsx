import { UserRound } from "lucide-react";

import { Card } from "@/components/ui/card";
import type { DisputeRefundDetail } from "@/constants/disputes-refund";
import { cn } from "@/lib/utils";

const detailLabelClassName = "text-[9px] font-medium uppercase tracking-wide text-slate-500";
const detailValueClassName = "mt-1 text-xs font-medium text-slate-900";

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

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
      <p className={detailLabelClassName}>{label}</p>
      <p className={cn(detailValueClassName, className)}>{value}</p>
    </div>
  );
}

function DetailBadge({ children, tone }: { children: string; tone: "danger" | "info" }) {
  return (
    <span
      className={cn(
        "inline-flex h-6 items-center rounded-full px-3 text-[9px] font-bold uppercase",
        tone === "danger" ? "bg-red-100 text-red-600" : "bg-blue-100 text-slate-500",
      )}
    >
      {children}
    </span>
  );
}

export function CustomerDisputeCard({ dispute }: { dispute: DisputeRefundDetail }) {
  return (
    <Card className="p-5">
      <div className="grid gap-4 md:grid-cols-[44px_minmax(0,1fr)_auto]">
        <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <UserRound className="size-5" />
        </div>

        <div className="min-w-0">
          <h2 className="truncate text-lg font-semibold">{dispute.customerName}</h2>
          <p className="mt-0.5 truncate text-xs text-slate-500">{dispute.customerEmail}</p>
        </div>

        <div className="flex items-start gap-2">
          <DetailBadge tone="danger">{dispute.priority}</DetailBadge>
          <DetailBadge tone="info">{dispute.status.replace("_", " ")}</DetailBadge>
        </div>
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-3">
        <DetailItem label="Transaction ID" value={dispute.transactionId} />
        <DetailItem label="Amount" value={formatCurrency(dispute.amount)} className="text-base font-bold text-primary" />
        <DetailItem label="Dispute Reason" value={dispute.disputeReason} />
      </div>
    </Card>
  );
}
