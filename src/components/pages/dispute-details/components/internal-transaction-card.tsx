import { CheckCircle2, CircleDollarSign, PackageCheck, Truck } from "lucide-react";

import { Card } from "@/components/ui/card";
import type { DisputeRefundDetail, TransactionTimelineItem } from "@/constants/disputes-refund";
import { cn } from "@/lib/utils";

const labelClassName = "text-[9px] font-medium uppercase tracking-wide text-slate-500";
const valueClassName = "mt-1 text-xs font-semibold text-slate-900";

function TransactionField({ label, value, success }: { label: string; value: string; success?: boolean }) {
  return (
    <div>
      <p className={labelClassName}>{label}</p>
      <p className={cn(valueClassName, success && "flex items-center gap-1.5")}>
        {success ? <span className="size-2 rounded-full bg-emerald-400" /> : null}
        {value}
      </p>
    </div>
  );
}

const timelineIcon = {
  complete: CircleDollarSign,
  current: Truck,
  pending: PackageCheck,
};

function TimelineStep({ item, isLast }: { item: TransactionTimelineItem; isLast: boolean }) {
  const Icon = timelineIcon[item.state];
  const isPending = item.state === "pending";

  return (
    <div className="relative flex flex-1 flex-col items-center text-center">
      {!isLast ? (
        <span className="absolute left-1/2 top-3 h-px w-full bg-slate-200" aria-hidden="true" />
      ) : null}
      <span
        className={cn(
          "relative z-10 flex size-7 items-center justify-center rounded-full",
          isPending ? "bg-slate-100 text-slate-400" : "bg-primary text-white",
        )}
      >
        <Icon className="size-3.5" />
      </span>
      <p className="mt-3 text-[11px] font-bold leading-4">{item.label}</p>
      <p className="text-[9px] leading-4 text-slate-500">{item.date}</p>
    </div>
  );
}

export function InternalTransactionCard({ dispute }: { dispute: DisputeRefundDetail }) {
  return (
    <Card className="p-5">
      <div className="flex items-center gap-4">
        <h2 className="shrink-0 text-base font-semibold">Internal Transaction Data</h2>
        <div className="h-px flex-1 bg-border" />
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-3">
        <TransactionField label="Payment Status" value={dispute.paymentStatus} success />
        <TransactionField label="Refund Eligible" value={dispute.refundEligible} success />
        <TransactionField label="Processor Auth Code" value={dispute.processorAuthCode} />
      </div>

      <div className="mt-5">
        <p className={labelClassName}>Transaction History</p>
        <div className="mt-4 flex gap-2">
          {dispute.timeline.map((item, index) => (
            <TimelineStep
              key={item.label}
              item={item}
              isLast={index === dispute.timeline.length - 1}
            />
          ))}
        </div>
      </div>
    </Card>
  );
}
