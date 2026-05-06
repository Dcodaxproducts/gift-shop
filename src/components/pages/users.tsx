"use client";

import { useState } from "react";
import { Download, Edit2, Eye, ListFilter, Plus, Search, X } from "lucide-react";
import {
  registeredUsers,
  registeredUsersPagination,
  type RegisteredUser,
  type RegisteredUserStatus,
  type UserTone,
} from "@/constants/users";
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

const avatarToneClass: Record<UserTone, string> = {
  blue: "bg-primary/10 text-primary",
  purple: "bg-violet-50 text-violet-600",
  amber: "bg-amber-50 text-amber-600",
  emerald: "bg-emerald-50 text-emerald-600",
  rose: "bg-rose-50 text-rose-600",
};

const statusToneClass: Record<RegisteredUserStatus, string> = {
  Active: "bg-emerald-50 text-emerald-600",
  Inactive: "bg-slate-100 text-slate-500",
  Suspended: "bg-rose-50 text-rose-600",
};

function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function UsersPage() {
  const [page, setPage] = useState(1);
  const router = useRouter();

  return (
    <div className="space-y-5">
      <PageHeader
        title="Registered Users"
        description="Search, review, and manage customer accounts across the platform."
        actions={
          <>
            <Button variant="outline">
              <Download className="mr-2 size-3.5" />
              Export
            </Button>
            <Button
              // onClick={() => router.push("/users/create")}
            >
              <Plus className="mr-2 size-3.5" />
              Add User
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
            />
          </div>
          <div className="grid grid-cols-2 gap-3 sm:flex">
            <Select defaultValue="all">
              <SelectTrigger className="h-10 w-full rounded-2xl bg-slate-50 text-xs sm:w-[135px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="suspended">Suspended</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="recent">
              <SelectTrigger className="h-10 w-full rounded-2xl bg-slate-50 text-xs sm:w-[140px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recent">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
                <SelectItem value="high-value">High Value</SelectItem>
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
        data={registeredUsers}
        pagination={{ ...registeredUsersPagination, page, onPageChange: setPage }}
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
        row={(item: RegisteredUser) => (
          <>
            <TableCell>
              <div className="flex items-center gap-3">
                <span className={cn("flex size-10 items-center justify-center rounded-2xl text-xs font-semibold", avatarToneClass[item.tone])}>
                  {getInitials(item.name)}
                </span>
                <span className="text-xs font-semibold text-slate-950">{item.name}</span>
              </div>
            </TableCell>
            <TableCell>
              <div className="space-y-1">
                <p className="text-xs font-medium text-slate-600">{item.email}</p>
                <p className="text-[10px] text-slate-400">{item.phone}</p>
              </div>
            </TableCell>
            <TableCell className="text-xs text-slate-500">{item.registeredAt}</TableCell>
            <TableCell className="text-xs font-semibold text-slate-950">{item.transactions}</TableCell>
            <TableCell>
              <span className={cn("inline-flex rounded-full px-3 py-1.5 text-[10px] font-semibold", statusToneClass[item.status])}>
                {item.status}
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
