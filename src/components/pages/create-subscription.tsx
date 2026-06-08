"use client";

import { useRouter } from "next/navigation";
import { SubscriptionPlanFormPage } from "@/components/pages/subscription-plan-form";
import { useCreateSubscriptionPlan } from "@/hooks/useSubscriptionPlans";
import type { CreateSubscriptionPlanPayload } from "@/types/subscription-plans";

export function CreateSubscriptionPage() {
  const router = useRouter();
  const createSubscriptionPlan = useCreateSubscriptionPlan();

  const handleSubmit = (payload: CreateSubscriptionPlanPayload) => {
    createSubscriptionPlan.mutate(payload, {
      onSuccess: () => router.push("/subscriptions"),
    });
  };

  return (
    <SubscriptionPlanFormPage
      mode="create"
      onSubmit={handleSubmit}
      saving={createSubscriptionPlan.isPending}
    />
  );
}
