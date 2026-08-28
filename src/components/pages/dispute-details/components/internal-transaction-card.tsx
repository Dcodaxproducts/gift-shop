import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import type { Dispute } from "@/types/disputes";
import { cn } from "@/lib/utils";
import { TimelineStep, type TimelineState } from "./timeline-step";

const valueClassName = "mt-1 text-xs font-semibold text-slate-900";

function TransactionField({ label, value, success }: { label: string; value: string; success?: boolean }) {
  return (
    <div>
      <Label>{label}</Label>
      <p className={cn(valueClassName, success && "flex items-center gap-1.5")}>
        {success ? <span className="size-2 rounded-full bg-emerald-400" /> : null}
        {value}
      </p>
    </div>
  );
}

export function InternalTransactionCard({ dispute }: { dispute: Dispute }) {
  const { transaction, refund, createdAt, status, lastUpdatedAt, sla } = dispute;

  const timeline: { label: string; date: string; state: TimelineState }[] = [
    { label: "Dispute created", date: new Date(createdAt).toLocaleString(), state: "complete" },
    {
      label: status.replace(/_/g, " ").toLowerCase(),
      date: lastUpdatedAt ? new Date(lastUpdatedAt).toLocaleString() : "Current",
      state: "current",
    },
    { label: "Resolution deadline", date: sla?.remainingText ?? "Pending", state: "pending" },
  ];

  return (
    <Card className="p-5">
      <div className="flex items-center gap-4">
        <h2 className="shrink-0 text-base font-semibold">Internal Transaction Data</h2>
        <div className="h-px flex-1 bg-border" />
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-3">
        <TransactionField label="Payment Status" value={transaction.paymentStatus} success />
        <TransactionField label="Refund Eligible" value={refund?.eligible ? "Yes" : "No"} success />
        <TransactionField label="Processor Auth Code" value={transaction.processorAuthCode} />
      </div>

      <div className="mt-5">
        <Label>Transaction History</Label>
        <div className="mt-4 flex gap-2">
          {timeline.map((item, index) => (
            <TimelineStep
              key={item.label}
              label={item.label}
              date={item.date}
              state={item.state}
              isLast={index === timeline.length - 1}
            />
          ))}
        </div>
      </div>
    </Card>
  );
}
