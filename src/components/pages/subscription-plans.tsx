"use client";

import { Plus, Settings2, UsersRound } from "lucide-react";
import { useRouter } from "next/navigation";
import { PageHeader } from "@/components/common/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  planManagementActions,
  subscriptionPlanIcons,
  subscriptionPlans,
  type SubscriptionPlan,
} from "@/constants/subscriptions";
import { cn } from "@/lib/utils";

function PlanFeature({ feature }: { feature: string }) {
  const CheckIcon = subscriptionPlanIcons.check;

  return (
    <li className="flex items-start gap-2.5 text-[12px] font-medium leading-5 text-slate-600">
      <CheckIcon className="mt-0.5 size-4 shrink-0 text-[#8b2fbe]" strokeWidth={2.4} />
      <span>{feature}</span>
    </li>
  );
}

function SubscriptionPlanCard({ plan }: { plan: SubscriptionPlan }) {
  const router = useRouter();

  return (
    <Card
      className={cn(
        "relative overflow-visible rounded-2xl border bg-white shadow-sm",
        plan.isPopular ? "border-[#8b2fbe] shadow-[#8b2fbe]/20" : "border-slate-200",
      )}
    >
      {plan.isPopular ? (
        <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#8b2fbe] px-6 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-white shadow-sm">
          Most Popular
        </div>
      ) : null}
      <CardContent className="flex min-h-[500px] flex-col p-6">
        <div className="flex items-center justify-between gap-4">
          <span className="rounded-md bg-[#f8eaff] px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-[#8b2fbe]">
            {plan.tier}
          </span>
          <span className="flex items-center gap-1 text-[10px] font-bold uppercase text-slate-400">
            <UsersRound className="size-3.5" />
            {plan.users}
          </span>
        </div>

        <h2 className="mt-3 text-2xl font-black tracking-tight text-slate-950">{plan.name}</h2>
        <div className="mt-8 flex items-end gap-1">
          <p className="text-[40px] font-black leading-none tracking-tight text-slate-950">{plan.price}</p>
          <span className="pb-1 text-sm font-medium text-slate-400">{plan.period}</span>
        </div>

        <ul className="mt-8 space-y-4">
          {plan.features.map((feature) => (
            <PlanFeature key={feature} feature={feature} />
          ))}
        </ul>

        <div className="mt-auto grid grid-cols-2 gap-3 pt-8">
          <Button
            className="h-12 rounded-2xl text-[12px] font-black"
            onClick={() => router.push(`/subscriptions/${plan.id}`)}
          >
            Edit Plan
          </Button>
          <Button variant="ghost" className="h-12 rounded-2xl bg-slate-100 text-[12px] font-black text-slate-700 hover:bg-slate-200">
            Deactivate
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function PlanManagementPanel() {
  return (
    <Card className="rounded-[28px] border border-[#eadcf4] bg-[#f3edf8] shadow-sm">
      <CardContent className="p-8">
        <div className="flex items-center gap-2.5">
          <Settings2 className="size-5 text-primary" strokeWidth={2.4} />
          <h2 className="text-xl font-black tracking-tight text-slate-950">Plan Management Actions</h2>
        </div>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {planManagementActions.map((action) => {
            const Icon = action.icon;

            return (
              <button
                key={action.title}
                type="button"
                className="rounded-2xl bg-white p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <Icon className="size-5 text-primary" strokeWidth={2.4} />
                <h3 className="mt-4 text-[13px] font-black leading-4 text-slate-950">{action.title}</h3>
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

  return (
    <div className="space-y-8">
      <PageHeader
        title="Subscription Plans"
        description="Configure global pricing tiers and feature entitlements for your SaaS."
        actions={
          <Button
            className="h-12 rounded-2xl px-7 text-[13px] font-black"
            onClick={() => router.push("/subscriptions/create")}
          >
            <Plus className="size-4" strokeWidth={2.6} />
            Create New Plan
          </Button>
        }
      />

      <section className="grid gap-7 xl:grid-cols-3">
        {subscriptionPlans.map((plan) => (
          <SubscriptionPlanCard key={plan.id} plan={plan} />
        ))}
      </section>

      <PlanManagementPanel />
    </div>
  );
}
