"use client";

import type { ElementType, ReactNode } from "react";
import { useState } from "react";
import {
  Check,
  CircleSlash,
  Download,
  ListFilter,
  Mail,
  Search,
  ShieldCheck,
  X,
} from "lucide-react";
import {
  providerBusinessDetails,
  providerDetailActions,
  providerDetailStats,
  providerListedItems,
  providerListedItemsPagination,
  type ProviderListedItem,
} from "@/constants/providers";
import { PageHeader } from "@/components/common/page-header";
import { DataTable } from "@/components/tables/data-table";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { TableCell, TableHead } from "@/components/ui/table";
import { cn } from "@/lib/utils";

const statBadgeTone = {
  green: "text-emerald-500",
  orange: "text-amber-500",
};

const itemIconToneClass = {
  purple: "bg-primary/10 text-primary",
  blue: "bg-indigo-50 text-indigo-500",
  violet: "bg-violet-50 text-violet-500",
};

const actionIcon = {
  approve: Check,
  reject: X,
  message: Mail,
  suspend: CircleSlash,
};

const productStatusTone = {
  Active: "bg-emerald-50 text-emerald-600",
  "Out of Stock": "bg-slate-100 text-slate-500",
};

function ProviderStatCard({
  icon: Icon,
  label,
  value,
  change,
  changeTone,
}: {
  icon: ElementType;
  label: string;
  value: string;
  change: string;
  changeTone: "green" | "orange";
}) {
  return (
    <Card className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-4">
          <span className="flex size-8 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Icon className="size-4" strokeWidth={2.5} />
          </span>
          <span className={cn("pt-1 text-[10px] font-black", statBadgeTone[changeTone])}>
            {change}
          </span>
        </div>
        <p className="mt-5 text-[11px] font-medium text-slate-400">{label}</p>
        <p className="mt-1 text-[28px] font-black leading-none tracking-tight text-slate-950">
          {value}
        </p>
      </CardContent>
    </Card>
  );
}

function SectionTitle({ children }: { children: ReactNode }) {
  return <h2 className="text-sm font-bold text-slate-950">{children}</h2>;
}

function ListedItemsCard() {
  const [page, setPage] = useState(1);

  return (
    <div className="border border-b-0 border-slate-200 rounded-2xl">
      <div className="flex flex-col gap-3 rounded-t-2xl bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
        <SectionTitle>Listed Items</SectionTitle>
        <div className="flex items-center gap-2">
          <Input
            type="search"
            placeholder="Search products..."
            leftIcon={<Search className="size-4" />}
            className="h-9! w-full rounded-full bg-slate-50 text-xs sm:w-[220px]"
          />
          <Button variant="outline" className="col-span-2 h-11 sm:col-span-1 sm:w-11 sm:px-0">
            <ListFilter className="size-4" />
            <span className="sm:hidden">More Filters</span>
          </Button>
        </div>
      </div>

      <DataTable
        data={providerListedItems}
        pagination={{
          ...providerListedItemsPagination,
          page,
          onPageChange: setPage,
        }}
        isBorder={false}
        headers={
          <>
            <TableHead>Product Name</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Sales Data</TableHead>
            <TableHead>Status</TableHead>
          </>
        }
        row={(item: ProviderListedItem) => {
          const Icon = item.icon;

          return (
            <>
              <TableCell>
                <div className="flex items-center gap-3">
                  <span
                    className={cn(
                      "flex size-8 items-center justify-center rounded-full",
                      itemIconToneClass[item.tone],
                    )}
                  >
                    <Icon className="size-3.5" strokeWidth={2.5} />
                  </span>
                  <span className="text-xs font-bold text-slate-950">{item.name}</span>
                </div>
              </TableCell>
              <TableCell className="text-xs font-bold text-primary">{item.price}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2 text-[10px] font-bold text-slate-950">
                  <span>{item.units}</span>
                  <span>{item.percent}%</span>
                </div>
                <div className="mt-1 h-1.5 w-20 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-primary"
                    style={{ width: `${item.percent}%` }}
                  />
                </div>
              </TableCell>
              <TableCell>
                <span
                  className={cn(
                    "inline-flex rounded-full px-3 py-1 text-[10px] font-bold",
                    productStatusTone[item.status as keyof typeof productStatusTone],
                  )}
                >
                  {item.status}
                </span>
              </TableCell>
            </>
          );
        }}
      />
    </div>
  );
}

function BusinessDetailsCard() {
  return (
    <Card className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      <CardContent className="p-5">
        <SectionTitle>Business Details</SectionTitle>
        <div className="mt-5 divide-y divide-slate-100">
          {providerBusinessDetails.map((detail) => (
            <div key={detail.label} className="py-3 first:pt-0">
              <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
                {detail.label}
              </p>
              <p className="mt-1 text-xs font-bold leading-4 text-slate-950">{detail.value}</p>
            </div>
          ))}
          <div className="py-3">
            <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
              Verification Status
            </p>
            <div className="mt-2 flex items-center gap-2 text-xs font-bold text-blue-600">
              <ShieldCheck className="size-4" />
              Tier 2 Verified Provider
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function QuickActionsCard() {
  return (
    <Card className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      <CardContent className="p-5">
        <SectionTitle>Quick Actions</SectionTitle>
        <div className="mt-5 space-y-3">
          {providerDetailActions.map((action) => {
            const Icon = actionIcon[action.icon];

            return (
              <Button
                key={action.label}
                className={cn("h-11 w-full rounded-2xl text-xs", action.className)}
              >
                <Icon className="size-4" strokeWidth={2.5} />
                {action.label}
              </Button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

export function ProviderDetailsPage() {
  return (
    <div className="space-y-5">
      <PageHeader
        title="Gifts & Blooms Co. Profile"
        actions={
          <>
            <Button variant="outline">
              <Download className="size-3.5" />
              Export Data
            </Button>
            <Button>Edit Details</Button>
          </>
        }
      />

      <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {providerDetailStats.map((stat) => (
          <ProviderStatCard key={stat.label} {...stat} />
        ))}
      </section>

      <section className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_330px]">
        <div className="self-start">
          <ListedItemsCard />
        </div>
        <aside className="space-y-5">
          <BusinessDetailsCard />
          <QuickActionsCard />
        </aside>
      </section>
    </div>
  );
}
