"use client";

import { ArrowLeft, BadgeCheck, CirclePlus, Eye, Info, Save, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { PageHeader } from "@/components/common/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { editSubscriptionPlan } from "@/constants/subscriptions";
import { cn } from "@/lib/utils";

function SectionCard({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <Card className={cn("rounded-2xl border border-slate-200 bg-white shadow-sm", className)}>
      <CardContent className="p-5">{children}</CardContent>
    </Card>
  );
}

function SectionTitle({ icon: Icon, title }: { icon: React.ElementType; title: string }) {
  return (
    <div className="flex items-center gap-2.5">
      <Icon className="size-4 text-primary" strokeWidth={2.4} />
      <h2 className="text-sm font-semibold ">{title}</h2>
    </div>
  );
}

function StatusCard() {
  return (
    <SectionCard>
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="flex size-9 items-center justify-center rounded-full bg-emerald-100 text-emerald-500">
            <BadgeCheck className="size-4" strokeWidth={2.4} />
          </span>
          <div>
            <p className="text-sm font-semibold ">Plan Status</p>
            <p className="mt-0.5 text-[11px] font-medium text-slate-500">
              Current status is{" "}
              <span className="font-semibold text-emerald-500">Active</span>
            </p>
          </div>
        </div>
        <Switch checked className="h-6 w-11" />
      </div>
    </SectionCard>
  );
}

function SubscribersCard() {
  return (
    <SectionCard>
      <p className="text-[11px] font-medium text-slate-500">Active Subscribers</p>
      <div className="mt-2 flex items-end gap-2">
        <p className="text-[28px] font-semibold leading-none tracking-tight ">
          {editSubscriptionPlan.subscribers}
        </p>
        <span className="pb-1 text-[11px] font-semibold text-emerald-500">
          {editSubscriptionPlan.subscriberChange}
        </span>
      </div>
    </SectionCard>
  );
}

function GeneralInformationCard() {
  return (
    <SectionCard>
      <SectionTitle icon={Info} title="General Information" />
      <div className="mt-5 space-y-4">
        <div className="space-y-2">
          <Label htmlFor="plan-name">Plan Name</Label>
          <Input
            id="plan-name"
            defaultValue={editSubscriptionPlan.name}
            className="h-11! rounded-xl bg-slate-50 text-xs"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="plan-description">Description</Label>
          <textarea
            id="plan-description"
            defaultValue={editSubscriptionPlan.description}
            className="min-h-[88px] w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-xs leading-5 text-slate-700 outline-none transition focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10"
          />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="monthly-price">Monthly Price ($)</Label>
            <Input
              id="monthly-price"
              defaultValue={editSubscriptionPlan.monthlyPrice}
              className="h-11! rounded-xl bg-slate-50 text-xs"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="yearly-price">Yearly Price ($)</Label>
            <Input
              id="yearly-price"
              defaultValue={editSubscriptionPlan.yearlyPrice}
              className="h-11! rounded-xl bg-slate-50 text-xs"
            />
          </div>
        </div>
      </div>
    </SectionCard>
  );
}

function FeaturesLimitsCard() {
  return (
    <SectionCard>
      <SectionTitle icon={CirclePlus} title="Features & Limits" />
      <div className="mt-5 space-y-2.5">
        {editSubscriptionPlan.features.map((feature) => (
          <div
            key={feature.title}
            className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3"
          >
            <div className="flex items-center gap-2.5">
              <span className="flex size-5 items-center justify-center rounded-full bg-primary/10 text-primary">
                <BadgeCheck className="size-3" strokeWidth={2.5} />
              </span>
              <p className="text-xs font-semibold text-slate-700">{feature.title}</p>
            </div>
            <button
              type="button"
              aria-label={`Remove ${feature.title}`}
              className="text-slate-300 transition hover:text-rose-500"
            >
              <Trash2 className="size-3.5" strokeWidth={2.4} />
            </button>
          </div>
        ))}
        <button
          type="button"
          className="flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-dashed border-slate-300 bg-white text-xs font-semibold text-slate-500 transition hover:border-primary hover:text-primary"
        >
          <CirclePlus className="size-4" strokeWidth={2.4} />
          Add New Feature
        </button>
      </div>
    </SectionCard>
  );
}

function VisibilityCard() {
  const options = [
    { value: "public", label: "Public (Visible to everyone)" },
    { value: "private", label: "Private (Invite only)" },
    { value: "archived", label: "Archived (Internal use)" },
  ];

  return (
    <SectionCard>
      <SectionTitle icon={Eye} title="Visibility" />
      <div className="mt-4 space-y-3">
        {options.map((option) => {
          const checked = option.value === editSubscriptionPlan.visibility;
          return (
            <label
              key={option.value}
              className="flex items-center gap-2.5 text-xs font-medium text-slate-700"
            >
              <span
                className={cn(
                  "flex size-4 shrink-0 items-center justify-center rounded-full border",
                  checked ? "border-primary" : "border-slate-300",
                )}
              >
                {checked ? <span className="size-2 rounded-full bg-primary" /> : null}
              </span>
              {option.label}
            </label>
          );
        })}
      </div>
    </SectionCard>
  );
}

function SaveChangesCard() {
  return (
    <SectionCard className="bg-primary/5">
      <h2 className="text-sm font-semibold ">Save Changes</h2>
      <p className="mt-2 text-[11px] leading-5 text-slate-500">
        Updating this plan will affect any current 1,240 subscribers at their next billing cycle.
      </p>
      <Button className="mt-4 h-11 w-full rounded-xl text-xs">
        <Save className="size-4" strokeWidth={2.4} />
        Update Plan
      </Button>
      <button
        type="button"
        className="mt-3 w-full text-center text-xs font-semibold text-slate-500 transition hover:text-slate-800"
      >
        Discard Changes
      </button>
    </SectionCard>
  );
}

function DangerZoneCard() {
  return (
    <SectionCard className="border-rose-100 bg-rose-50/60">
      <h2 className="text-sm font-semibold text-rose-600">Danger Zone</h2>
      <p className="mt-2 text-[11px] leading-5 text-rose-400">
        Deleting this plan will prevent any new subscriptions and might affect legacy accounts.
      </p>
      <Button
        variant="outline"
        className="mt-4 h-9 w-full rounded-xl border-rose-200 bg-white text-xs text-rose-600 hover:bg-rose-100"
      >
        Delete Plan
      </Button>
    </SectionCard>
  );
}

export function EditSubscriptionPage() {
  const router = useRouter();

  return (
    <div className="space-y-5">
      <PageHeader
        title="Edit Subscription Plan"
        description="Modify details and limits for the Pro Tier plan"
        actions={
          <Button variant="outline" onClick={() => router.push("/subscriptions")}>
            <ArrowLeft className="size-3.5" strokeWidth={2.4} />
            Back to Plans
          </Button>
        }
      />

      <section className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_300px]">
        <div className="space-y-5">
          <StatusCard />
          <GeneralInformationCard />
          <FeaturesLimitsCard />
        </div>

        <aside className="space-y-5 xl:sticky xl:top-6 xl:self-start">
          <SubscribersCard />
          <VisibilityCard />
          <SaveChangesCard />
          <DangerZoneCard />
        </aside>
      </section>
    </div>
  );
}