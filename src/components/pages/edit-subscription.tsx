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
      <CardContent className="p-6">{children}</CardContent>
    </Card>
  );
}

function SectionTitle({ icon: Icon, title }: { icon: React.ElementType; title: string }) {
  return (
    <div className="flex items-center gap-2.5">
      <Icon className="size-4 text-primary" strokeWidth={2.4} />
      <h2 className="text-sm font-black text-slate-950">{title}</h2>
    </div>
  );
}

function TextAreaField() {
  return (
    <textarea
      id="plan-description"
      defaultValue={editSubscriptionPlan.description}
      className="min-h-[78px] w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-xs font-medium leading-5 text-slate-700 outline-none transition focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10"
    />
  );
}

function StatusCard() {
  return (
    <SectionCard>
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <span className="flex size-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-500">
            <BadgeCheck className="size-5" strokeWidth={2.4} />
          </span>
          <div>
            <p className="text-sm font-black text-slate-950">Plan Status</p>
            <p className="mt-1 text-xs font-medium text-slate-500">
              Current status is <span className="font-black text-emerald-500">Active</span>
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
      <p className="text-xs font-medium text-slate-500">Active Subscribers</p>
      <div className="mt-2 flex items-end gap-2">
        <p className="text-[32px] font-black leading-none tracking-tight text-slate-950">
          {editSubscriptionPlan.subscribers}
        </p>
        <span className="pb-1 text-xs font-black text-emerald-500">{editSubscriptionPlan.subscriberChange}</span>
      </div>
    </SectionCard>
  );
}

function GeneralInformationCard() {
  return (
    <SectionCard>
      <SectionTitle icon={Info} title="General Information" />
      <div className="mt-6 space-y-5">
        <div className="space-y-2">
          <Label htmlFor="plan-name" className="text-[11px] font-bold text-slate-700">Plan Name</Label>
          <Input id="plan-name" defaultValue={editSubscriptionPlan.name} className="h-11 rounded-xl bg-slate-50 text-xs font-medium" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="plan-description" className="text-[11px] font-bold text-slate-700">Description</Label>
          <TextAreaField />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="monthly-price" className="text-[11px] font-bold text-slate-700">Monthly Price ($)</Label>
            <Input id="monthly-price" defaultValue={editSubscriptionPlan.monthlyPrice} className="h-11 rounded-xl bg-slate-50 text-xs font-medium" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="yearly-price" className="text-[11px] font-bold text-slate-700">Yearly Price ($)</Label>
            <Input id="yearly-price" defaultValue={editSubscriptionPlan.yearlyPrice} className="h-11 rounded-xl bg-slate-50 text-xs font-medium" />
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
      <div className="mt-6 space-y-3">
        {editSubscriptionPlan.features.map((feature) => (
          <div key={feature.title} className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3">
            <div className="flex items-center gap-2.5">
              <span className="flex size-5 items-center justify-center rounded-full bg-primary/10 text-primary">
                <BadgeCheck className="size-3" strokeWidth={2.5} />
              </span>
              <p className="text-xs font-semibold text-slate-700">{feature.title}</p>
            </div>
            <button type="button" aria-label={`Remove ${feature.title}`} className="text-slate-300 transition hover:text-rose-500">
              <Trash2 className="size-3.5" strokeWidth={2.4} />
            </button>
          </div>
        ))}
        <button
          type="button"
          className="flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-dashed border-slate-300 bg-white text-xs font-black text-slate-500 transition hover:border-primary hover:text-primary"
        >
          <CirclePlus className="size-4" strokeWidth={2.4} />
          Add New Feature
        </button>
      </div>
    </SectionCard>
  );
}

function VisibilityCard() {
  return (
    <SectionCard>
      <SectionTitle icon={Eye} title="Visibility" />
      <div className="mt-5 space-y-4">
        {[
          ["public", "Public (Visible to everyone)"],
          ["private", "Private (Invite only)"],
          ["archived", "Archived (Internal use)"],
        ].map(([value, label]) => (
          <label key={value} className="flex items-center gap-3 text-xs font-semibold text-slate-700">
            <span
              className={cn(
                "flex size-4 items-center justify-center rounded-full border",
                value === editSubscriptionPlan.visibility ? "border-primary" : "border-slate-300",
              )}
            >
              {value === editSubscriptionPlan.visibility ? <span className="size-2 rounded-full bg-primary" /> : null}
            </span>
            {label}
          </label>
        ))}
      </div>
    </SectionCard>
  );
}

function SaveChangesCard() {
  return (
    <SectionCard className="bg-primary/5">
      <h2 className="text-sm font-black text-slate-950">Save Changes</h2>
      <p className="mt-4 text-xs font-medium leading-5 text-slate-500">
        Updating this plan will affect all current 1240 subscribers at their next billing cycle.
      </p>
      <Button className="mt-5 h-12 w-full rounded-xl text-xs font-black">
        <Save className="size-4" strokeWidth={2.4} />
        Update Plan
      </Button>
      <button type="button" className="mt-4 w-full text-center text-xs font-semibold text-slate-500 transition hover:text-slate-800">
        Discard Changes
      </button>
    </SectionCard>
  );
}

function DangerZoneCard() {
  return (
    <SectionCard className="border-rose-100 bg-rose-50">
      <h2 className="text-sm font-black text-rose-600">Danger Zone</h2>
      <p className="mt-3 text-xs font-medium leading-5 text-rose-400">
        Deleting this plan will prevent any new subscriptions and might affect legacy accounts.
      </p>
      <Button variant="outline" className="mt-5 h-10 w-full rounded-xl border-rose-200 bg-white text-xs font-black text-rose-600 hover:bg-rose-100">
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
          <Button variant="outline" className="h-9 rounded-xl px-4 text-xs" onClick={() => router.push("/subscriptions")}>
            <ArrowLeft className="size-3.5" strokeWidth={2.4} />
            Back to Plans
          </Button>
        }
      />

      <section className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_300px]">
        <div className="space-y-5">
          <section className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_220px]">
            <StatusCard />
            <SubscribersCard />
          </section>
          <GeneralInformationCard />
          <FeaturesLimitsCard />
        </div>

        <aside className="space-y-5 xl:sticky xl:top-6 xl:self-start">
          <VisibilityCard />
          <SaveChangesCard />
          <DangerZoneCard />
        </aside>
      </section>
    </div>
  );
}
