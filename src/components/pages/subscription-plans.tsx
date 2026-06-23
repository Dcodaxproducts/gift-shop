"use client";

import { useState } from "react";
import { Plus, Settings2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { SubscriptionPlanCard } from "@/components/cards/SubscriptionPlanCard";
import PageHeader from "@/components/common/page-header";
import { ConfirmDialog } from "@/components/dialog/confirm-dialog";
import { SubscriptionPlanCardSkeleton } from "@/components/skeletons";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  planManagementActions,
} from "@/constants/subscriptions";
import { useDeleteSubscriptionPlan, useSubscriptionPlans } from "@/hooks/useSubscriptionPlans";
import type { SubscriptionPlan } from "@/types/subscription-plans";
import SectionHeader from "../common/section-header";

function PlanManagementPanel() {
  return (
    <Card className=" bg-primary/5 border-primary/20">
      <CardContent>
        <SectionHeader
          icon={Settings2}
          title="Plan Management Actions"
          className="text-xl"
        />

        <div className="mt-7 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {planManagementActions.map((action) => {
            const Icon = action.icon;

            return (
              <button
                key={action.title}
                type="button"
                className="rounded-2xl bg-white p-5 text-left cursor-context shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <Icon className="size-5 text-primary" strokeWidth={2.4} />
                <h3 className="mt-4 text-[13px] font-semibold leading-4 ">{action.title}</h3>
                <p className="mt-1 text-[11px] font-medium leading-4 text-slate-400">{action.description}</p>
              </button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

export function SubscriptionPlansPage() {
  const router = useRouter();
  const [deleteTarget, setDeleteTarget] = useState<SubscriptionPlan | null>(null);
  const { data: plans = [], isLoading } = useSubscriptionPlans({ limit: 10 });
  
  const { mutate: deleteSubscriptionPlan, isPending: isDeleting } = useDeleteSubscriptionPlan();

  return (
    <div className="space-y-8">
      <PageHeader
        title="Subscription Plans"
        description="Configure global pricing tiers and feature entitlements for your SaaS."
        actions={
          <Button
            onClick={() => router.push("/subscriptions/create")}
          >
            <Plus className="mr-2 size-3.5" />
            Create New Plan
          </Button>
        }
      />

      <ConfirmDialog
        open={!!deleteTarget}
        onOpenChange={(open) => {
          if (!open) {
            setDeleteTarget(null);
          }
        }}
        title="Delete Subscription Plan"
        description="Are you sure you want to delete this subscription plan? This action cannot be undone."
        confirmLabel="Delete"
        loading={isDeleting}
        onConfirm={() => {
          if (!deleteTarget) return;

          deleteSubscriptionPlan(deleteTarget.id, {
            onSuccess: () => setDeleteTarget(null),
          });
        }}
      />

      <section className="grid gap-7 xl:grid-cols-3">
        {isLoading
          ? [...Array(3)].map((_, index) => (
            <SubscriptionPlanCardSkeleton key={`subscription-plan-card-skeleton-${index}`} />
          ))
          : plans.map((plan) => (
            <SubscriptionPlanCard key={plan.id} plan={plan} onDelete={setDeleteTarget} />
          ))}
      </section>

      <PlanManagementPanel />
    </div>
  );
}
