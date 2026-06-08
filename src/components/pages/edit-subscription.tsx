"use client";

import { useParams, useRouter } from "next/navigation";
import { ErrorMessage } from "@/components/common/error-message";
import { SubscriptionPlanFormPage } from "@/components/pages/subscription-plan-form";
import { useEditSubscriptionPlan, useSubscriptionPlan } from "@/hooks/useSubscriptionPlans";
import type { CreateSubscriptionPlanPayload } from "@/types/subscription-plans";

export function EditSubscriptionPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const planId = params?.id ?? "";
  const { data: plan, isError, refetch } = useSubscriptionPlan(planId);
  const editSubscriptionPlan = useEditSubscriptionPlan();

  const handleSubmit = (payload: CreateSubscriptionPlanPayload) => {
    if (!planId) return;

    editSubscriptionPlan.mutate(
      { id: planId, payload },
      { onSuccess: () => router.push("/subscriptions") },
    );
  };

  if (isError) {
    return (
      <ErrorMessage
        message="Subscription plan not found."
        onRetry={() => refetch()}
      />
    );
  }

  return (
    <SubscriptionPlanFormPage
      defaultValues={plan}
      mode="edit"
      onSubmit={handleSubmit}
      saving={editSubscriptionPlan.isPending}
    />
  );
}
