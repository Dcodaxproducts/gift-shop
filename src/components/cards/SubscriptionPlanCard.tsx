"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Can } from "@/components/auth/can";
import { Card, CardContent } from "@/components/ui/card";
import { subscriptionPlanIcons } from "@/constants/subscriptions";
import { cn } from "@/lib/utils";
import { getBilling, getFeatureLabels, getLimitLabels } from "@/utils/subscription-plan";
import type { SubscriptionPlan } from "@/types/subscription-plans";

function PlanFeature({ feature }: { feature: string }) {
  const CheckIcon = subscriptionPlanIcons.check;

  return (
    <li className="flex items-start gap-2.5 text-[12px] font-medium leading-5 text-slate-600">
      <CheckIcon className="mt-0.5 size-4 shrink-0 text-primary" strokeWidth={2.4} />
      <span>{feature}</span>
    </li>
  );
}

export function SubscriptionPlanCard({
  onDelete,
  plan,
}: {
  onDelete: (plan: SubscriptionPlan) => void;
  plan: SubscriptionPlan;
}) {
  const router = useRouter();
  const { price, period } = getBilling(plan);
  const features = [...getFeatureLabels(plan), ...getLimitLabels(plan)];

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
          <p className="text-[40px] font-semibold leading-none tracking-tight ">{price}</p>
          <span className="pb-1 text-sm font-medium text-slate-400">{period}</span>
        </div>

        <ul className="mt-8 space-y-4">
          {features.map((feature) => (
            <PlanFeature key={feature} feature={feature} />
          ))}
        </ul>

        <div className="mt-auto grid grid-cols-2 gap-3 pt-8">
          <Can module="subscriptionPlans" action="update">
            <Button
              onClick={() => router.push(`/subscriptions/${plan.id}`)}
            >
              Edit Plan
            </Button>
          </Can>
          <Can module="subscriptionPlans" action="delete">
            <Button
              variant="ghost"
              className="bg-slate-100 text-slate-700 hover:bg-slate-200"
              onClick={() => onDelete(plan)}
            >
              Delete
            </Button>
          </Can>
        </div>
      </CardContent>
    </Card>
  );
}
