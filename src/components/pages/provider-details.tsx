import type { ElementType, ReactNode } from "react";
import { Check, CircleSlash, Download, Mail, ShieldCheck, SlidersHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  providerBusinessDetails,
  providerDetailActions,
  providerDetailStats,
  providerListedItems,
} from "@/constants/providers";
import { cn } from "@/lib/utils";

const statToneClass = {
  purple: "bg-[#f1e7ff] text-[#8b5cf6]",
  green: "text-[#22c55e]",
  orange: "text-[#f97316]",
};

const itemIconToneClass = {
  purple: "bg-[#f1e7ff] text-[#8b5cf6]",
  blue: "bg-[#e9f0ff] text-[#6366f1]",
  violet: "bg-[#efe7ff] text-[#8b5cf6]",
};

const actionToneClass = {
  approve: "bg-[#22c55e] text-white hover:bg-[#16a34a]",
  reject: "bg-[#f43f46] text-white hover:bg-[#e11d48]",
  neutral: "bg-[#eef2f7] text-[#334155] shadow-none hover:bg-[#e2e8f0]",
};

const actionIcon = {
  approve: Check,
  reject: X,
  message: Mail,
  suspend: CircleSlash,
};

function ProviderDetailCard({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <Card className={cn("rounded-[18px] border border-slate-100 bg-white shadow-sm", className)}>
      {children}
    </Card>
  );
}

function ProviderStatCard({ icon: Icon, label, value, change, changeTone }: { icon: ElementType; label: string; value: string; change: string; changeTone: "green" | "orange" }) {
  return (
    <ProviderDetailCard>
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-4">
          <span className={cn("flex size-8 items-center justify-center rounded-full", statToneClass.purple)}>
            <Icon className="size-4" strokeWidth={2.5} />
          </span>
          <span className={cn("pt-1 text-[10px] font-black", statToneClass[changeTone])}>{change}</span>
        </div>
        <p className="mt-5 text-[11px] font-medium text-slate-400">{label}</p>
        <p className="mt-1 text-[28px] font-black leading-none tracking-tight text-[#0f172a]">{value}</p>
      </CardContent>
    </ProviderDetailCard>
  );
}

function SectionTitle({ children }: { children: ReactNode }) {
  return <h2 className="text-[15px] font-black text-[#0f172a]">{children}</h2>;
}

function ProductStatusPill({ status }: { status: string }) {
  const isActive = status === "Active";

  return (
    <span
      className={cn(
        "inline-flex rounded-full px-3 py-1 text-[10px] font-bold",
        isActive ? "bg-[#dcfce7] text-[#16a34a]" : "bg-[#eef2f7] text-[#64748b]",
      )}
    >
      {status}
    </span>
  );
}

function ListedItemsTable() {
  return (
    <ProviderDetailCard className="overflow-hidden">
      <div className="flex flex-col gap-3 border-b border-slate-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        <SectionTitle>Listed Items</SectionTitle>
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-full min-w-[180px] items-center gap-2 rounded-full bg-[#f8fafc] px-3 text-[10px] text-slate-400 sm:w-[220px]">
            <span className="size-1.5 rounded-full border border-slate-300" />
            <span>Search products...</span>
          </div>
          <button
            type="button"
            aria-label="Filter listed items"
            className="flex size-8 items-center justify-center rounded-full bg-[#f8fafc] text-slate-400"
          >
            <SlidersHorizontal className="size-3.5" />
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[600px] border-collapse text-left">
          <thead className="bg-[#f8fafc] text-[9px] font-black uppercase tracking-wide text-slate-400">
            <tr>
              <th className="px-5 py-3">Product Name</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">Sales Data</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {providerListedItems.map((item) => {
              const Icon = item.icon;

              return (
                <tr key={item.name}>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <span className={cn("flex size-8 items-center justify-center rounded-full", itemIconToneClass[item.tone])}>
                        <Icon className="size-3.5" strokeWidth={2.5} />
                      </span>
                      <span className="text-[12px] font-black text-[#0f172a]">{item.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-[11px] font-bold text-[#7c3aed]">{item.price}</td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <div>
                        <div className="flex items-center gap-2 text-[9px] font-black text-[#0f172a]">
                          <span>{item.units}</span>
                          <span>{item.percent}%</span>
                        </div>
                        <div className="mt-1 h-1.5 w-20 overflow-hidden rounded-full bg-slate-100">
                          <div className="h-full rounded-full bg-[#7c3aed]" style={{ width: `${item.percent}%` }} />
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <ProductStatusPill status={item.status} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <button type="button" className="w-full border-t border-slate-100 py-3 text-center text-[11px] font-black text-[#7c3aed]">
        View All 1,240 Items
      </button>
    </ProviderDetailCard>
  );
}

function BusinessDetailsCard() {
  return (
    <ProviderDetailCard>
      <CardContent className="p-5">
        <SectionTitle>Business Details</SectionTitle>
        <div className="mt-5 divide-y divide-slate-100">
          {providerBusinessDetails.map((detail) => (
            <div key={detail.label} className="py-3 first:pt-0">
              <p className="text-[9px] font-black uppercase tracking-wide text-slate-400">{detail.label}</p>
              <p className="mt-1 text-[11px] font-black leading-4 text-[#0f172a]">{detail.value}</p>
            </div>
          ))}
          <div className="py-3">
            <p className="text-[9px] font-black uppercase tracking-wide text-slate-400">Verification Status</p>
            <div className="mt-2 flex items-center gap-2 text-[11px] font-black text-[#2563eb]">
              <ShieldCheck className="size-4" />
              Tier 2 Verified Provider
            </div>
          </div>
        </div>
      </CardContent>
    </ProviderDetailCard>
  );
}

function QuickActionsCard() {
  return (
    <ProviderDetailCard>
      <CardContent className="p-5">
        <SectionTitle>Quick Actions</SectionTitle>
        <div className="mt-5 space-y-3">
          {providerDetailActions.map((action) => {
            const Icon = actionIcon[action.icon];

            return (
              <Button
                key={action.label}
                className={cn("h-11 w-full rounded-2xl text-[13px] font-black shadow-none", actionToneClass[action.tone])}
              >
                <Icon className="size-4" strokeWidth={2.5} />
                {action.label}
              </Button>
            );
          })}
        </div>
      </CardContent>
    </ProviderDetailCard>
  );
}

export function ProviderDetailsPage() {
  return (
    <div className="mx-auto max-w-[1120px] space-y-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-[22px] font-black tracking-tight text-[#0f172a]">Gifts &amp; Blooms Co. Profile</h1>
        <div className="flex gap-3">
          <Button variant="outline" className="h-9 rounded-full border-slate-100 px-5 text-[11px] font-black shadow-sm">
            <Download className="size-3.5" />
            Export Data
          </Button>
          <Button className="h-9 rounded-full bg-[#7c3aed] px-5 text-[11px] font-black shadow-sm shadow-[#7c3aed]/20 hover:bg-[#6d28d9]">
            Edit Details
          </Button>
        </div>
      </div>

      <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {providerDetailStats.map((stat) => (
          <ProviderStatCard key={stat.label} {...stat} />
        ))}
      </section>

      <section className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_330px]">
        <ListedItemsTable />
        <aside className="space-y-5">
          <BusinessDetailsCard />
          <QuickActionsCard />
        </aside>
      </section>
    </div>
  );
}
