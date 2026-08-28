"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import PageHeader from "@/components/common/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {
  subscriptionCreateSteps,
  subscriptionFeatures,
  type SubscriptionFeature,
} from "@/constants/subscriptions";
import type { CreateSubscriptionPlanPayload, SubscriptionPlan } from "@/types/subscription-plans";

const featureKeyMap: Record<string, string> = {
  "Custom Branding": "customBranding",
  "Priority Support": "prioritySupport",
  "Advanced Analytics": "advancedAnalytics",
  "API Access": "apiAccess",
};

const initialFeatures = subscriptionFeatures.reduce<Record<string, boolean>>((acc, feature) => {
  acc[featureKeyMap[feature.title] ?? feature.title] = feature.enabled;
  return acc;
}, {});

type BillingCycle = "monthly" | "yearly";

type SubscriptionPlanFormPageProps = {
  defaultValues?: SubscriptionPlan;
  mode: "create" | "edit";
  onSubmit: (payload: CreateSubscriptionPlanPayload) => void;
  saving?: boolean;
};

function StepTitle({ number, title }: { number: string; title: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="flex size-7 items-center justify-center rounded-full bg-[#f3e8ff] text-[11px] font-semibold text-primary">
        {number}
      </span>
      <h2 className="text-sm font-semibold ">{title}</h2>
    </div>
  );
}

function FormSection({ stepIndex, children }: { stepIndex: number; children: React.ReactNode }) {
  const step = subscriptionCreateSteps[stepIndex];

  return (
    <Card className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      <CardContent>
        <StepTitle number={step.number} title={step.title} />
        <div className="mt-6">{children}</div>
      </CardContent>
    </Card>
  );
}

function FeatureToggle({
  enabled,
  feature,
  onToggle,
}: {
  enabled: boolean;
  feature: SubscriptionFeature;
  onToggle: () => void;
}) {
  const Icon = feature.icon;

  return (
    <div className="flex items-center justify-between gap-4 border-b border-slate-100 py-4 last:border-b-0">
      <div className="flex items-start gap-3">
        <span className="mt-0.5 flex size-5 items-center justify-center text-slate-400">
          <Icon className="size-4" strokeWidth={2.2} />
        </span>
        <div>
          <p className="text-[12px] font-semibold ">{feature.title}</p>
          <p className="mt-0.5 text-[10px] font-medium leading-4 text-slate-400">{feature.description}</p>
        </div>
      </div>
      <Switch checked={enabled} onClick={onToggle} />
    </div>
  );
}

function resolveFeatures(plan?: SubscriptionPlan) {
  if (!plan?.features) return initialFeatures;

  if (Array.isArray(plan.features)) {
    const nextFeatures = { ...initialFeatures };
    plan.features.forEach((feature) => {
      const key = typeof feature === "string" ? feature : feature.title;
      nextFeatures[key] = true;
    });
    return nextFeatures;
  }

  return { ...initialFeatures, ...plan.features };
}

export function SubscriptionPlanFormPage({
  defaultValues,
  mode,
  onSubmit,
  saving = false,
}: SubscriptionPlanFormPageProps) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [billingCycle, setBillingCycle] = useState<BillingCycle>("monthly");
  const [price, setPrice] = useState("");
  const [isPopular, setIsPopular] = useState(false);
  const [features, setFeatures] = useState<Record<string, boolean>>(initialFeatures);
  const [maxGiftsPerMonth, setMaxGiftsPerMonth] = useState("");
  const [maxGroupGiftingEvents, setMaxGroupGiftingEvents] = useState("");

  useEffect(() => {
    if (!defaultValues) return;

    const nextBillingCycle = defaultValues.yearlyPrice && !defaultValues.monthlyPrice ? "yearly" : "monthly";
    setName(defaultValues.name ?? "");
    setDescription(defaultValues.description ?? "");
    setBillingCycle(nextBillingCycle);
    setPrice(String(nextBillingCycle === "monthly" ? defaultValues.monthlyPrice ?? "" : defaultValues.yearlyPrice ?? ""));
    setIsPopular(Boolean(defaultValues.isPopular));
    setFeatures(resolveFeatures(defaultValues));
    setMaxGiftsPerMonth(String(defaultValues.limits?.maxGiftsPerMonth ?? ""));
    setMaxGroupGiftingEvents(String(defaultValues.limits?.maxGroupGiftingEvents ?? ""));
  }, [defaultValues]);

  const updateFeature = (key: string) => {
    setFeatures((current) => ({ ...current, [key]: !current[key] }));
  };

  const parseNumber = (value: string) => {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : 0;
  };

  const handleSubmit = () => {
    const numericPrice = parseNumber(price);
    onSubmit({
      name,
      description,
      currency: "USD",
      visibility: "PUBLIC",
      isVisible: true,
      status: "ACTIVE",
      isPopular,
      features,
      limits: {
        maxGiftsPerMonth: parseNumber(maxGiftsPerMonth),
        maxGroupGiftingEvents: parseNumber(maxGroupGiftingEvents),
        maxTeamMembers: defaultValues?.limits?.maxTeamMembers ?? 0,
        storageGb: defaultValues?.limits?.storageGb ?? 0,
      },
      // Only one billing cycle applies — zero out the other so it isn't kept from a previous value.
      ...(billingCycle === "monthly"
        ? { monthlyPrice: numericPrice, yearlyPrice: 0 }
        : { yearlyPrice: numericPrice, monthlyPrice: 0 }),
    });
  };

  return (
    <div className="space-y-5">
      <PageHeader
        title={mode === "create" ? "Create Subscription Plan" : "Edit Subscription Plan"}
        description="Configure a new subscription tier for your global customer base."
      />

      <FormSection stepIndex={0}>
        <div className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="plan-name" className="text-[11px] font-semibold text-slate-700">Plan Name</Label>
            <Input id="plan-name" placeholder="e.g. Professional Plan" className="h-11 rounded-xl bg-white text-xs" value={name} onChange={(event) => setName(event.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description" className="text-[11px] font-semibold text-slate-700">Description</Label>
            <textarea
              id="description"
              placeholder="Describe what this plan is best for..."
              className="min-h-23 w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-xs text-slate-900 outline-none placeholder:text-slate-400 focus:border-primary"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />
          </div>
          <div className="flex items-center justify-between rounded-xl border border-slate-100 px-4 py-3">
            <div>
              <p className="text-[12px] font-semibold">Mark as Popular</p>
              <p className="mt-0.5 text-[10px] font-medium text-slate-400">Highlight this plan on the plans page.</p>
            </div>
            <Switch checked={isPopular} onClick={() => setIsPopular((current) => !current)} />
          </div>
        </div>
      </FormSection>

      <FormSection stepIndex={1}>
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-2">
            <Label className="text-[11px] font-semibold text-slate-700">Billing Cycle</Label>
            <Select value={billingCycle} onValueChange={(value) => setBillingCycle(value as BillingCycle)}>
              <SelectTrigger className="h-11 rounded-xl bg-white text-xs">
                <SelectValue placeholder="Select billing cycle" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="yearly">Yearly</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="plan-price" className="text-[11px] font-semibold text-slate-700">
              {billingCycle === "monthly" ? "Monthly Price (USD)" : "Yearly Price (USD)"}
            </Label>
            <div className="flex h-11 items-center rounded-xl border border-slate-200 bg-white px-4 focus-within:border-primary">
              <span className="text-xs font-semibold text-slate-400">$</span>
              <input id="plan-price" placeholder="0.00" className="h-full min-w-0 flex-1 bg-transparent pl-3 text-xs text-slate-900 outline-none placeholder:text-slate-400" value={price} onChange={(event) => setPrice(event.target.value)} />
            </div>
          </div>
        </div>
      </FormSection>

      <FormSection stepIndex={2}>
        <div className="divide-y divide-slate-100">
          {subscriptionFeatures.map((feature) => {
            const key = featureKeyMap[feature.title] ?? feature.title;

            return (
              <FeatureToggle
                key={feature.title}
                enabled={features[key]}
                feature={feature}
                onToggle={() => updateFeature(key)}
              />
            );
          })}
        </div>
      </FormSection>

      <FormSection stepIndex={3}>
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="max-gifts" className="text-[11px] font-semibold text-slate-700">Max gifts per month</Label>
            <Input id="max-gifts" placeholder="e.g. 50" className="h-11 rounded-xl text-xs" value={maxGiftsPerMonth} onChange={(event) => setMaxGiftsPerMonth(event.target.value)} />
            <p className="text-[10px] font-medium text-slate-400">Use -1 for unlimited</p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="max-events" className="text-[11px] font-semibold text-slate-700">Max group gifting events</Label>
            <Input id="max-events" placeholder="e.g. 10" className="h-11 rounded-xl text-xs" value={maxGroupGiftingEvents} onChange={(event) => setMaxGroupGiftingEvents(event.target.value)} />
            <p className="text-[10px] font-medium text-slate-400">Per calendar month</p>
          </div>
        </div>
      </FormSection>

      <div className="flex justify-end gap-3 pt-2">
        <Button variant="outline" className="h-10 rounded-xl px-6" disabled={saving} onClick={() => router.push("/subscriptions")}>Cancel</Button>
        <Button className="h-10 rounded-xl px-7" disabled={saving} onClick={handleSubmit}>
          {saving ? "Saving..." : mode === "create" ? "Save Plan" : "Update Plan"}
        </Button>
      </div>
    </div>
  );
}
