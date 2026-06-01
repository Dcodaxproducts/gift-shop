"use client";

import { useMemo } from "react";
import { useParams } from "next/navigation";
import { AlertTriangle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { getDisputeRefundDetail } from "@/constants/disputes-refund";
import { cn } from "@/lib/utils";
import { CustomerDisputeCard } from "./components/customer-dispute-card";
import { EvidenceCard } from "./components/evidence-card";
import { InternalTransactionCard } from "./components/internal-transaction-card";

const actionButtonClassName = "h-10 flex-1 px-4 text-[11px] sm:flex-none";

export function DisputeDetailsPage() {
  const params = useParams<{ id: string }>();
  const dispute = useMemo(() => getDisputeRefundDetail(params?.id ?? ""), [params?.id]);

  return (
    <div className="space-y-5">
      <h1 className="text-2xl font-semibold tracking-tight">
        Case {dispute.id} {dispute.disputeTitle}
      </h1>

      <div className="flex flex-col gap-3 rounded-2xl border border-red-200 bg-red-100 px-4 py-3 text-red-700 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 items-center gap-3">
          <AlertTriangle className="size-4 shrink-0" />
          <p className="text-[11px] font-semibold">
            This dispute is approaching the 7-day resolution deadline.
          </p>
        </div>
        <span className="shrink-0 text-[10px] font-bold text-red-800">
          {dispute.resolutionDeadline}
        </span>
      </div>

      <section className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_270px]">
        <CustomerDisputeCard dispute={dispute} />
        <EvidenceCard files={dispute.evidence} />
      </section>

      <InternalTransactionCard dispute={dispute} />

      <div className="border-t border-border pt-4">
        <div className="grid gap-3 sm:grid-cols-2 xl:flex xl:items-center xl:justify-between">
          <Button variant="soft" className={cn(actionButtonClassName, "rounded-lg bg-primary/10")}>
            Add Internal Note
          </Button>
          <Button variant="soft" className={cn(actionButtonClassName, "rounded-lg bg-primary/10")}>
            View Full Timeline
          </Button>
          <Button variant="danger" className={cn(actionButtonClassName, "rounded-lg")}>
            Escalate Case
          </Button>
          <Button className={cn(actionButtonClassName, "rounded-lg shadow-lg shadow-primary/20 xl:ml-auto")}>
            Link Refund / Transaction
          </Button>
        </div>
      </div>
    </div>
  );
}
