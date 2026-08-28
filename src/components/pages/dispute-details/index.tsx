"use client";

import { useParams, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ErrorMessage } from "@/components/common/error-message";
import PageHeader from "@/components/common/page-header";
import { useDispute } from "@/hooks/useDisputes";
import { CustomerDisputeCard } from "./components/customer-dispute-card";
import { InternalTransactionCard } from "./components/internal-transaction-card";

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

  return (
    <div className="space-y-5">
      <PageHeader
        title="Dispute Details"
        description="Review customer dispute information and internal transaction data."
        actions={
          <Button variant="outline" onClick={() => router.back()}>
            <ArrowLeft className="size-3.5" strokeWidth={2.4} />
            Back to List
          </Button>
        }
      />

      {data ? (
        <>
          <CustomerDisputeCard dispute={data} />
          <InternalTransactionCard dispute={data} />
        </>
      ) : null}
    </div>
  );
}
