import { formatLabel } from "@/utils/formatLabel";
import type { SubscriptionPlan } from "@/types/subscription-plans";

export function getBilling(plan: SubscriptionPlan) {
  const [price, period] =
    plan.yearlyPrice != null && plan.yearlyPrice > 0
      ? [plan.yearlyPrice, "/year"]
      : plan.monthlyPrice != null && plan.monthlyPrice > 0
        ? [plan.monthlyPrice, "/month"]
        : [0, ""];

  return {
    price: new Intl.NumberFormat("en-US", {
      currency: plan.currency ?? "USD",
      maximumFractionDigits: 0,
      style: "currency",
    }).format(price),
    period,
  };
}

export function getFeatureLabels(plan: SubscriptionPlan) {
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

export function getLimitLabels(plan: SubscriptionPlan) {
  if (!plan.limits) return [];

  return Object.entries(plan.limits).map(([key, value]) => `${formatLabel(key)}: ${value}`);
}
