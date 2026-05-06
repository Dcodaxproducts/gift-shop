"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PageHeader } from "@/components/common/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  subscriptionCreateSteps,
  subscriptionFeatures,
  type SubscriptionFeature,
} from "@/constants/subscriptions";

function StepTitle({ number, title }: { number: string; title: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="flex size-7 items-center justify-center rounded-full bg-[#f3e8ff] text-[11px] font-black text-[#8b2fbe]">
        {number}
      </span>
      <h2 className="text-sm font-black text-slate-950">{title}</h2>
    </div>
  );
}

function FormSection({ stepIndex, children }: { stepIndex: number; children: React.ReactNode }) {
  const step = subscriptionCreateSteps[stepIndex];

  return (
    <Card className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      <CardContent className="p-6">
        <StepTitle number={step.number} title={step.title} />
        <div className="mt-6">{children}</div>
      </CardContent>
    </Card>
  );
}

function FeatureToggle({ feature }: { feature: SubscriptionFeature }) {
  const [enabled, setEnabled] = useState(feature.enabled);
  const Icon = feature.icon;

  return (
    <div className="flex items-center justify-between gap-4 border-b border-slate-100 py-4 last:border-b-0">
      <div className="flex items-start gap-3">
        <span className="mt-0.5 flex size-5 items-center justify-center text-slate-400">
          <Icon className="size-4" strokeWidth={2.2} />
        </span>
        <div>
          <p className="text-[12px] font-black text-slate-950">{feature.title}</p>
          <p className="mt-0.5 text-[10px] font-medium leading-4 text-slate-400">{feature.description}</p>
        </div>
      </div>
      <Switch checked={enabled} onClick={() => setEnabled((current) => !current)} />
    </div>
  );
}

export function CreateSubscriptionPage() {
  const router = useRouter();

  return (
    <div className="mx-auto max-w-[920px] space-y-5">
      <PageHeader
        title="Create Subscription Plan"
        description="Configure a new subscription tier for your global customer base."
      />

      <FormSection stepIndex={0}>
        <div className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="plan-name" className="text-[11px] font-bold text-slate-700">Plan Name</Label>
            <Input id="plan-name" placeholder="e.g. Professional Plan" className="h-11 rounded-xl bg-white text-xs" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description" className="text-[11px] font-bold text-slate-700">Description</Label>
            <textarea
              id="description"
              placeholder="Describe what this plan is best for..."
              className="min-h-[92px] w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-xs text-slate-900 outline-none placeholder:text-slate-400 focus:border-primary"
            />
          </div>
        </div>
      </FormSection>

      <FormSection stepIndex={1}>
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="monthly-price" className="text-[11px] font-bold text-slate-700">Monthly Price (USD)</Label>
            <div className="flex h-11 items-center rounded-xl border border-slate-200 bg-white px-4 focus-within:border-primary">
              <span className="text-xs font-bold text-slate-400">$</span>
              <input
                id="monthly-price"
                placeholder="0.00"
                className="h-full min-w-0 flex-1 bg-transparent pl-3 text-xs text-slate-900 outline-none placeholder:text-slate-400"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="yearly-price" className="text-[11px] font-bold text-slate-700">Yearly Price (USD)</Label>
            <div className="flex h-11 items-center rounded-xl border border-slate-200 bg-white px-4 focus-within:border-primary">
              <span className="text-xs font-bold text-slate-400">$</span>
              <input
                id="yearly-price"
                placeholder="0.00"
                className="h-full min-w-0 flex-1 bg-transparent pl-3 text-xs text-slate-900 outline-none placeholder:text-slate-400"
              />
            </div>
            <p className="text-[10px] font-medium text-slate-400">Leave empty to calculate automatically (e.g. Monthly x 10)</p>
          </div>
        </div>
      </FormSection>

      <FormSection stepIndex={2}>
        <div className="divide-y divide-slate-100">
          {subscriptionFeatures.map((feature) => (
            <FeatureToggle key={feature.title} feature={feature} />
          ))}
        </div>
      </FormSection>

      <FormSection stepIndex={3}>
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="max-gifts" className="text-[11px] font-bold text-slate-700">Max gifts per month</Label>
            <Input id="max-gifts" placeholder="e.g. 50" className="h-11 rounded-xl text-xs" />
            <p className="text-[10px] font-medium text-slate-400">Use -1 for unlimited</p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="max-events" className="text-[11px] font-bold text-slate-700">Max group gifting events</Label>
            <Input id="max-events" placeholder="e.g. 10" className="h-11 rounded-xl text-xs" />
            <p className="text-[10px] font-medium text-slate-400">Per calendar month</p>
          </div>
        </div>
      </FormSection>

      <div className="flex justify-end gap-3 pt-2">
        <Button variant="outline" className="h-10 rounded-xl px-6" onClick={() => router.push("/subscriptions")}>Cancel</Button>
        <Button className="h-10 rounded-xl px-7">Save Plan</Button>
      </div>
    </div>
  );
}
