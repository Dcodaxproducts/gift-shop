"use client";

import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  Download,
  Mail,
  MapPin,
  ReceiptText,
  Scale,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { ErrorMessage } from "@/components/common/error-message";
import type { DisputeRefundDetail } from "@/constants/disputes-refund";
import { useDispute } from "@/hooks/useDisputes";
import type { Dispute } from "@/types/disputes";
import { cn } from "@/lib/utils";
import PageHeader from "@/components/common/page-header";

const timelineItems = [
  {
    title: "Completed",
    subtitle: "System Auto-Update",
    description: "Funds successfully transferred to the merchant's escrow account.",
    date: "Nov 24, 2023",
    time: "14:32:10",
    tone: "emerald",
  },
  {
    title: "Authorized",
    subtitle: "Gateway Response",
    description: "Payment authorization received from Visa processing network.",
    date: "Nov 24, 2023",
    time: "14:31:55",
    tone: "primary",
  },
  {
    title: "Initiated",
    subtitle: "User Session",
    description: "Checkout session started by user via mobile application.",
    date: "Nov 24, 2023",
    time: "14:30:02",
    tone: "slate",
  },
] as const;

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "PKR",
  }).format(value);
}

function mapDisputeToDetail(dispute: Dispute): DisputeRefundDetail {
  return {
    id: dispute.caseId,
    customerName: dispute.customer.name,
    customerEmail: dispute.customer.email,
    transactionId: dispute.transaction.transactionId,
    amount: dispute.amount,
    category: dispute.reason,
    priority: dispute.priority as DisputeRefundDetail["priority"],
    status: dispute.status as DisputeRefundDetail["status"],
    daysOpen: 0,
    disputeTitle: "Dispute Details & Evidence Review",
    disputeReason: dispute.reason.replace(/_/g, " ").toLowerCase(),
    resolutionDeadline: dispute.sla?.remainingText ?? "No SLA deadline",
    paymentStatus: dispute.transaction.paymentStatus,
    refundEligible: dispute.refund?.eligible ? "Yes" : "No",
    processorAuthCode: dispute.transaction.processorAuthCode,
    evidence: dispute.claimDetails ? [{ name: "Customer claim", type: "text" }] : [],
    timeline: [
      { label: "Dispute created", date: new Date(dispute.createdAt).toLocaleString(), state: "complete" },
      {
        label: dispute.status.replace(/_/g, " ").toLowerCase(),
        date: dispute.lastUpdatedAt ? new Date(dispute.lastUpdatedAt).toLocaleString() : "Current",
        state: "current",
      },
      { label: "Resolution deadline", date: dispute.sla?.remainingText ?? "Pending", state: "pending" },
    ],
  };
}

function BreakdownRow({
  label,
  value,
  total,
}: {
  label: string;
  value: string;
  total?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <p className={cn("text-xs font-medium text-slate-500", total && "font-bold text-slate-900")}>
        {label}
      </p>
      <p className={cn("text-xs font-bold text-slate-700", total && "text-xl text-primary")}>
        {value}
      </p>
    </div>
  );
}

function PaymentBreakdownCard({ dispute }: { dispute: DisputeRefundDetail }) {
  const initialCharge = dispute.amount;
  const deduction = 0;
  const totalAmount = initialCharge - deduction;

  return (
    <Card>
      <CardContent>
        <p className="text-[10px] font-medium text-slate-400">
          Transactions <span className="mx-1">/</span>
          <span className="font-bold text-slate-700">{dispute.transactionId}</span>
        </p>

        <CardTitle className="mt-5 flex items-center gap-2">
          <ReceiptText className="size-4 text-primary" />
          Payment Breakdown
        </CardTitle>

        <div className="mt-7 space-y-5">
          <BreakdownRow label="Initial Charges" value={formatCurrency(initialCharge)} />
          <BreakdownRow label="Deduction" value={formatCurrency(deduction)} />
          <div className="border-t border-border pt-5">
            <BreakdownRow label="Total Amount" value={formatCurrency(totalAmount)} total />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function TransactionTimelineCard() {
  return (
    <Card>
      <CardContent>
        <div className="flex items-center justify-between gap-4">
          <CardTitle>Transaction Timeline</CardTitle>
          <p className="text-[9px] font-bold uppercase tracking-wide text-slate-400">
            Timezone: UTC -08:00
          </p>
        </div>

        <div className="mt-7 space-y-6">
          {timelineItems.map((item, index) => (
            <div key={item.title} className="grid gap-4 sm:grid-cols-[170px_minmax(0,1fr)_150px]">
              <div className="relative flex gap-4">
                {index < timelineItems.length - 1 ? (
                  <span className="absolute left-1.25 top-4 h-[calc(100%+1.5rem)] w-px bg-slate-100" />
                ) : null}
                <span
                  className={cn(
                    "relative mt-1 size-2.5 shrink-0 rounded-full",
                    item.tone === "emerald" && "bg-emerald-500",
                    item.tone === "primary" && "bg-primary",
                    item.tone === "slate" && "bg-slate-200",
                  )}
                />
                <div>
                  <p className="text-sm font-bold leading-4 text-slate-900">{item.title}</p>
                  <p className="mt-0.5 text-[10px] font-medium text-slate-400">{item.subtitle}</p>
                </div>
              </div>
              <p className="text-xs font-medium leading-5 text-slate-500">{item.description}</p>
              <p className="text-right text-[10px] font-bold text-slate-500 sm:self-center">
                {item.date} - {item.time}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function ActionLink({ icon: Icon, label }: { icon: React.ElementType; label: string }) {
  return (
    <button
      type="button"
      className="flex w-full items-center justify-between gap-4 text-left text-xs font-medium text-slate-500 transition hover:text-primary"
    >
      {label}
      <Icon className="size-4" />
    </button>
  );
}

function QuickActionsCard() {
  return (
    <Card>
      <CardContent>
        <CardTitle>Quick Actions</CardTitle>
        <div className="mt-6 space-y-3">
          <Button className="h-12 w-full rounded-xl">
            <Scale className="size-4" />
            Refund Transaction
          </Button>
          <Button variant="outline" className="h-12 w-full rounded-xl">
            <Scale className="size-4" />
            Open Dispute
          </Button>
        </div>

        <div className="mt-7 space-y-4 border-t border-border pt-6">
          <ActionLink icon={Download} label="Download PDF Receipt" />
          <ActionLink icon={Mail} label="Send Notification to User" />
        </div>
      </CardContent>
    </Card>
  );
}

function CustomerInfoCard({ dispute }: { dispute: DisputeRefundDetail }) {
  return (
    <Card className="h-fit">
      <CardContent>
        <CardTitle>Customer Info</CardTitle>

        <div className="mt-6 flex items-center gap-4">
          <span className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
            {dispute.customerName
              .split(" ")
              .map((part) => part.charAt(0))
              .slice(0, 2)
              .join("")}
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-bold text-slate-900">{dispute.customerName}</p>
            <p className="mt-0.5 truncate text-xs font-medium text-slate-500">{dispute.customerEmail}</p>
          </div>
        </div>

        <div className="mt-6 flex items-center gap-2 text-xs font-medium text-slate-500">
          <MapPin className="size-4" />
          San Francisco, CA, USA
        </div>
      </CardContent>
    </Card>
  );
}

export function DisputeDetailsPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const disputeId = params?.id ?? "";
  const { data, isError, refetch } = useDispute(disputeId);

  if (isError) {
    return (
      <ErrorMessage
        message="Dispute not found."
        onRetry={() => refetch()}
      />
    );
  }

  const dispute = data ? mapDisputeToDetail(data) : null;

  return (
    <div className="space-y-5">
      <PageHeader
        title="Transaction Details"
        actions={
          <Button variant="outline" onClick={() => router.back()}>
            <ArrowLeft className="size-3.5" strokeWidth={2.4} />
            Back to List
          </Button>
        }
      />

      {dispute ? (
        <>
          <PaymentBreakdownCard dispute={dispute} />
          <TransactionTimelineCard />

          <section className="grid gap-5 xl:grid-cols-2">
            <QuickActionsCard />
            <CustomerInfoCard dispute={dispute} />
          </section>
        </>
      ) : null}
    </div>
  );
}
