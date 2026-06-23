"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { subscriptionPlanIcons } from "@/constants/subscriptions";
import { cn } from "@/lib/utils";
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

function formatLabel(value: string) {
  return value
    .replace(/([A-Z])/g, " $1")
    .replace(/[_-]/g, " ")
    .trim()
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function getBillingPrice(plan: SubscriptionPlan) {
  if (plan.yearlyPrice !== null && plan.yearlyPrice !== undefined) {
    return { period: "/year", price: plan.yearlyPrice };
  }

  if (plan.monthlyPrice !== null && plan.monthlyPrice !== undefined) {
    return { period: "/month", price: plan.monthlyPrice };
  }

  return { period: "", price: 0 };
}

function formatPrice(plan: SubscriptionPlan) {
  const { price } = getBillingPrice(plan);

  return new Intl.NumberFormat("en-US", {
    currency: plan.currency ?? "USD",
    maximumFractionDigits: 0,
    style: "currency",
  }).format(price);
}

function formatPeriod(plan: SubscriptionPlan) {
  return getBillingPrice(plan).period;
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

export function SubscriptionPlanCard({
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
