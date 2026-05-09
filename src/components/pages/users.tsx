"use client";

import { useState } from "react";
import { Download, Edit2, Eye, ListFilter, Plus, Search, X } from "lucide-react";
import { type UserTone } from "@/constants/users";
import { PageHeader } from "@/components/common/page-header";
import { DataTable } from "@/components/tables/data-table";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
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
import { useUsers, useExportUsers, useSuspendUser, useUnsuspendUser, useResetUserPassword } from "@/hooks/useUsers";
import type { User, UserStatus, UserSortBy } from "@/types/users";

const avatarToneClass: Record<UserTone, string> = {
  blue: "bg-primary/10 text-primary",
  purple: "bg-violet-50 text-violet-600",
  amber: "bg-amber-50 text-amber-600",
  emerald: "bg-emerald-50 text-emerald-600",
  rose: "bg-rose-50 text-rose-600",
};

const tones: UserTone[] = ["blue", "purple", "amber", "emerald", "rose"];

const statusLabel: Record<Exclude<User["status"], never>, string> = {
  ACTIVE: "Active",
  PENDING: "Pending",
  SUSPENDED: "Suspended",
  DISABLED: "Disabled",
};

const statusToneClass: Record<Exclude<User["status"], never>, string> = {
  ACTIVE: "bg-emerald-50 text-emerald-600",
  PENDING: "bg-amber-50 text-amber-600",
  SUSPENDED: "bg-rose-50 text-rose-600",
  DISABLED: "bg-slate-100 text-slate-500",
};

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function formatRegisteredAt(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "2-digit" });
}

function formatCurrency(value?: number) {
  if (typeof value !== "number") return "$0";
  return value.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
}

export function UsersPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<UserStatus | "all">("all");
  const [sortBy, setSortBy] = useState<UserSortBy>("createdAt");
  const limit = 10;
  const router = useRouter();

  const { data, isLoading, error } = useUsers({
    page,
    limit,
    search: search || undefined,
    status: status === "all" ? undefined : status,
    sortBy
  });
  const exportUsers = useExportUsers();
  const suspendUser = useSuspendUser();
  const unsuspendUser = useUnsuspendUser();
  const resetPassword = useResetUserPassword();

  const users = data?.users ?? [];
  const pagination = data?.pagination ?? {
    total: 0,
    page,
    limit,
    totalPages: 0,
    hasNext: false,
    hasPrevious: false,
  };

  const handleStatusChange = (value: string) => {
    setStatus(value as UserStatus | "all");
  };

  const handleSortByChange = (value: string) => {
    setSortBy(value as UserSortBy);
  };

  const handleExport = () => {
    exportUsers.mutate({
      search: search || undefined,
      status: status === "all" ? undefined : status,
      sortBy
    });
  };

  const handleSuspendUser = (userId: string) => {
    suspendUser.mutate({ id: userId });
  };

  const handleUnsuspendUser = (userId: string) => {
    unsuspendUser.mutate(userId);
  };

  const handleResetPassword = (userId: string) => {
    resetPassword.mutate({ id: userId });
  };

  return (
    <div className="space-y-5">
      <PageHeader
        title="Registered Users"
        description="Search, review, and manage customer accounts across the platform."
        actions={
          <>
            <Button variant="outline" onClick={handleExport} disabled={exportUsers.isPending}>
              <Download className="mr-2 size-3.5" />
              {exportUsers.isPending ? "Exporting..." : "Export"}
            </Button>
          </>
        }
      />

      <Card className="rounded-2xl border border-border bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-3 xl:flex-row xl:items-center">
          <div className="min-w-0 flex-1">
            <Input
              type="search"
              placeholder="Search users by name, email, or phone..."
              leftIcon={<Search className="size-4" />}
              className="h-10! rounded-2xl bg-white text-xs"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-2 gap-3 sm:flex">
            <Select value={status} onValueChange={handleStatusChange}>
              <SelectTrigger className="h-10 w-full rounded-2xl bg-slate-50 text-xs sm:w-[135px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="ACTIVE">Active</SelectItem>
                <SelectItem value="PENDING">Pending</SelectItem>
                <SelectItem value="SUSPENDED">Suspended</SelectItem>
                <SelectItem value="DISABLED">Disabled</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={handleSortByChange}>
              <SelectTrigger className="h-10 w-full rounded-2xl bg-slate-50 text-xs sm:w-[140px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="createdAt">Newest First</SelectItem>
                <SelectItem value="firstName">Name (A-Z)</SelectItem>
                <SelectItem value="email">Email (A-Z)</SelectItem>
                <SelectItem value="totalSpent">High Value</SelectItem>
                <SelectItem value="ordersCount">Most Orders</SelectItem>
              </SelectContent>
            </Select>
            <button
              type="button"
              aria-label="Open user filters"
              className="col-span-2 flex h-10 items-center justify-center gap-2 rounded-2xl bg-slate-50 px-4 text-xs font-semibold text-slate-500 transition hover:bg-primary/10 hover:text-primary sm:col-span-1 sm:size-10 sm:px-0"
            >
              <ListFilter className="size-4" strokeWidth={3} />
              <span className="sm:hidden">Filters</span>
            </button>
          </div>
        </div>
      </Card>

      <DataTable
        data={users}
        loading={isLoading}
        pagination={{ ...pagination, page, onPageChange: setPage }}
        headers={
          <>
            <TableHead>User</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Registered</TableHead>
            <TableHead>Transactions</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </>
        }
        row={(item: User, index) => {
          const fullName = `${item.firstName ?? ""} ${item.lastName ?? ""}`.trim();
          const tone = tones[index % tones.length];
          return (
            <>
              <TableCell>
                <div className="flex items-center gap-3">
                  <span className={cn("flex size-10 items-center justify-center rounded-2xl text-xs font-semibold", avatarToneClass[tone])}>
                    {getInitials(fullName)}
                  </span>
                  <span className="text-xs font-semibold text-slate-950">{fullName}</span>
                </div>
              </TableCell>
              <TableCell>
                <div className="space-y-1">
                  <p className="text-xs font-medium text-slate-600">{item.email}</p>
                  <p className="text-[10px] text-slate-400">{item.phone}</p>
                </div>
              </TableCell>
              <TableCell className="text-xs text-slate-500">{formatRegisteredAt(item.createdAt)}</TableCell>
              <TableCell className="text-xs font-semibold text-slate-950">{formatCurrency(item.totalSpent)}</TableCell>
              <TableCell>
                <span className={cn("inline-flex rounded-full px-3 py-1.5 text-[10px] font-semibold", statusToneClass[item.status])}>
                  {statusLabel[item.status]}
                </span>
              </TableCell>
              <TableCell>
                <div className="flex items-center justify-end">
                  <Button
                    variant="ghost"
                    className="size-9 rounded-full text-primary hover:bg-primary/10"
                    onClick={() => router.push(`/users/${item.id}`)}
                  >
                    <Eye className="size-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    className="size-9 rounded-full text-emerald-500 hover:bg-emerald-50"
                    onClick={() => router.push(`/users/${item.id}/edit`)}
                  >
                    <Edit2 className="size-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    className="size-9 rounded-full text-rose-500 hover:bg-rose-50"
                    onClick={() => {
                      if (item.status === "SUSPENDED") {
                        handleUnsuspendUser(item.id);
                      } else {
                        handleSuspendUser(item.id);
                      }
                    }}
                    disabled={suspendUser.isPending || unsuspendUser.isPending}
                  >
                    <X className="size-4" />
                  </Button>
                </div>
              </TableCell>
            </>
          );
        }}
      />
    </div>
  );
}
