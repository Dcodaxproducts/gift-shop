"use client";

import { useState } from "react";
import { Edit2, Eye, ListFilter, Plus, Search, X } from "lucide-react";
import {
  providerDirectoryItems,
  providerPagination,
  providerStats,
  type ProviderApproval,
  type ProviderDirectoryItem,
  type ProviderStatus,
  type ProviderTone,
} from "@/constants/providers";
import { PageHeader } from "@/components/common/page-header";
import { DataTable } from "@/components/tables/data-table";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TableCell, TableHead } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

const statBadgeClass = {
  blue: "bg-[#eef2ff] text-[#4f46e5]",
  amber: "bg-[#fff7ed] text-[#f97316]",
  emerald: "bg-[#ecfdf5] text-[#10b981]",
  rose: "bg-[#fff1f2] text-[#f43f5e]",
};

const providerToneClass: Record<ProviderTone, string> = {
  stripe: "bg-[#635BFF] text-white",
  revolut: "bg-slate-950 text-white",
  paypal: "bg-[#0070BA] text-white",
  wise: "bg-[#9FE870] text-[#163300]",
};

const statusToneClass: Record<ProviderStatus, string> = {
  Active: "bg-emerald-50 text-emerald-600",
  Pending: "bg-amber-50 text-amber-600",
  Inactive: "bg-slate-100 text-slate-500",
};

const approvalToneClass: Record<ProviderApproval, string> = {
  Approved: "bg-primary/10 text-primary",
  Pending: "bg-amber-50 text-amber-600",
  Rejected: "bg-rose-50 text-rose-600",
};

function getProviderInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function PillBadge({ label, className }: { label: string; className: string }) {
  return (
    <span className={cn("inline-flex rounded-full px-3 py-1.5 text-[10px] font-bold", className)}>
      {label}
    </span>
  );
}

function ProviderStats() {
  return (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {providerStats.map((stat) => (
        <Card
          key={stat.title}
          className="rounded-[22px] border border-slate-100 bg-white shadow-sm shadow-slate-100/80"
        >
          <CardContent className="p-5">
            <p className="text-[13px] font-semibold text-slate-500">
              {stat.title}
            </p>
            <div className="mt-3 flex items-center justify-between gap-3">
              <p className="text-xl font-bold leading-none tracking-tight text-slate-950">
                {stat.value}
              </p>
              <span
                className={cn(
                  "rounded-full px-2.5 py-1 text-[11px] font-bold leading-none",
                  statBadgeClass[stat.tone],
                )}
              >
                {stat.change}
              </span>
            </div>
          </CardContent>
        </Card>
      ))}
    </section>
  );
}

export function ProvidersPage() {
  const [page, setPage] = useState(1);
  const router = useRouter();

  return (
    <div className="space-y-5">
      <PageHeader
        title="Providers"
        description="Manage fintech service providers and their performance metrics."
        actions={
          <Button className="h-10! rounded-xl text-xs">
            <Plus className="mr-2 size-3.5" />
            Add Provider
          </Button>
        }
      />

      <ProviderStats />

      <Card className="rounded-2xl border border-border bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-3 xl:flex-row xl:items-center">
          <div className="min-w-0 flex-1">
            <Input
              type="search"
              placeholder="Search providers by name, email, or status..."
              leftIcon={<Search className="size-4" />}
              className="h-10! rounded-2xl bg-white text-xs"
            />
          </div>
          <div className="grid grid-cols-2 gap-3 sm:flex">
            <Select defaultValue="all">
              <SelectTrigger className="h-10 w-full rounded-2xl bg-slate-50 text-xs sm:w-[140px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="all">
              <SelectTrigger className="h-10 w-full rounded-2xl bg-slate-50 text-xs sm:w-[150px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Approvals</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
            <button
              type="button"
              aria-label="Open provider filters"
              className="col-span-2 flex h-10 items-center justify-center gap-2 rounded-2xl bg-slate-50 px-4 text-xs font-semibold text-slate-500 transition hover:bg-primary/10 hover:text-primary sm:col-span-1 sm:size-10 sm:px-0"
            >
              <ListFilter className="size-4" strokeWidth={3} />
              <span className="sm:hidden">Filters</span>
            </button>
          </div>
        </div>
      </Card>

      <DataTable
        data={providerDirectoryItems}
        pagination={{ ...providerPagination, page, onPageChange: setPage }}
        headers={
          <>
            <TableHead>Provider</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Approval</TableHead>
            <TableHead>Revenue</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </>
        }
        row={(item: ProviderDirectoryItem) => (
          <>
            <TableCell>
              <div className="flex items-center gap-3">
                <span className={cn("flex size-10 items-center justify-center rounded-2xl text-xs font-black shadow-sm", providerToneClass[item.tone])}>
                  {getProviderInitials(item.name)}
                </span>
                <span className="text-xs font-bold text-slate-950">{item.name}</span>
              </div>
            </TableCell>
            <TableCell className="text-xs text-slate-500">{item.email}</TableCell>
            <TableCell>
              <PillBadge label={item.status} className={statusToneClass[item.status]} />
            </TableCell>
            <TableCell>
              <PillBadge label={item.approval} className={approvalToneClass[item.approval]} />
            </TableCell>
            <TableCell className="text-xs font-bold text-slate-950">{item.revenue}</TableCell>
            <TableCell>
              <div className="flex items-center justify-end">
                <Button
                  variant="ghost"
                  className="size-9 rounded-full text-primary hover:bg-primary/10"
                  onClick={() => router.push(`/providers/${item.id}`)}
                >
                  <Eye className="size-4" />
                </Button>
                <Button
                  variant="ghost"
                  className="size-9 rounded-full text-emerald-500 hover:bg-emerald-50"
                >
                  <Edit2 className="size-4" />
                </Button>
                <Button
                  variant="ghost"
                  className="size-9 rounded-full text-rose-500 hover:bg-rose-50"
                >
                  <X className="size-4" />
                </Button>
              </div>
            </TableCell>
          </>
        )}
      />
    </div>
  );
}
