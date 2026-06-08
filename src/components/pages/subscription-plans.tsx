"use client";

import { useState } from "react";
import { Plus, Settings2 } from "lucide-react";
import { useRouter } from "next/navigation";
import PageHeader from "@/components/common/page-header";
import { ConfirmDialog } from "@/components/dialog/confirm-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  planManagementActions,
  subscriptionPlanIcons,
} from "@/constants/subscriptions";
import { useDeleteSubscriptionPlan, useSubscriptionPlans } from "@/hooks/useSubscriptionPlans";
import { cn } from "@/lib/utils";
import type { SubscriptionPlan } from "@/types/subscription-plans";
import SectionHeader from "../common/section-header";

function PlanFeature({ feature }: { feature: string }) {
  const CheckIcon = subscriptionPlanIcons.check;

  return (
    <li className="flex items-start gap-2.5 text-[12px] font-medium leading-5 text-slate-600">
      <CheckIcon className="mt-0.5 size-4 shrink-0 text-primary" strokeWidth={2.4} />
      <span>{feature}</span>
    </li>
  );
}

function formatLabel(value: string) {
  return value
    .replace(/([A-Z])/g, " $1")
    .replace(/[_-]/g, " ")
    .trim()
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function formatPrice(plan: SubscriptionPlan) {
  const price = plan.monthlyPrice ?? plan.yearlyPrice ?? 0;

  return new Intl.NumberFormat("en-US", {
    currency: plan.currency ?? "USD",
    maximumFractionDigits: 0,
    style: "currency",
  }).format(price);
}

function formatPeriod(plan: SubscriptionPlan) {
  if (plan.monthlyPrice !== null && plan.monthlyPrice !== undefined) return "/month";
  if (plan.yearlyPrice !== null && plan.yearlyPrice !== undefined) return "/year";
  return "";
}

function getFeatureLabels(plan: SubscriptionPlan) {
  if (Array.isArray(plan.features)) {
    return plan.features.map((feature) => (
      typeof feature === "string" ? formatLabel(feature) : feature.title
    ));
  }

  if (plan.features && typeof plan.features === "object") {
    return Object.entries(plan.features)
      .filter(([, enabled]) => Boolean(enabled))
      .map(([feature]) => formatLabel(feature));
  }

  return [];
}

function getLimitLabels(plan: SubscriptionPlan) {
  if (!plan.limits) return [];

  return Object.entries(plan.limits).map(([key, value]) => `${formatLabel(key)}: ${value}`);
}

function SubscriptionPlanCard({
  onDelete,
  plan,
}: {
  onDelete: (plan: SubscriptionPlan) => void;
  plan: SubscriptionPlan;
}) {
  const router = useRouter();
  const features = getFeatureLabels(plan);
  const limits = getLimitLabels(plan);

  return (
    <Card
      className={cn(
        "relative overflow-visible",
        plan.isPopular ? "border-primary shadow-primary/20" : "border-slate-200",
      )}
    >
      {plan.isPopular ? (
        <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary px-6 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-white shadow-sm">
          Most Popular
        </div>
      ) : null}
      <CardContent className="flex min-h-125 flex-col">
        <div className="flex items-center justify-between gap-4">
          <span className="rounded-md bg-[#f8eaff] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-primary">
            {plan.name}
          </span>
        </div>

        <h2 className="mt-3 text-2xl font-semibold tracking-tight first-letter:uppercase">{plan.description}</h2>
        <div className="mt-8 flex items-end gap-1">
          <p className="text-[40px] font-semibold leading-none tracking-tight ">{formatPrice(plan)}</p>
          <span className="pb-1 text-sm font-medium text-slate-400">{formatPeriod(plan)}</span>
        </div>

        <ul className="mt-8 space-y-4">
          {features.map((feature) => (
            <PlanFeature key={feature} feature={feature} />
          ))}
          {limits.map((limit) => (
            <PlanFeature key={limit} feature={limit} />
          ))}
        </ul>

        <div className="mt-auto grid grid-cols-2 gap-3 pt-8">
          <Button
            onClick={() => router.push(`/subscriptions/${plan.id}`)}
          >
            Edit Plan
          </Button>
          <Button
            variant="ghost"
            className="bg-slate-100 text-slate-700 hover:bg-slate-200"
            onClick={() => onDelete(plan)}
          >
            Delete
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

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
  const { data: plans = [] } = useSubscriptionPlans({ limit: 10 });
  console.log(plans)
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
        {plans.map((plan) => (
          <SubscriptionPlanCard key={plan.id} plan={plan} onDelete={setDeleteTarget} />
        ))}
      </section>

      <PlanManagementPanel />
    </div>
  );
}
