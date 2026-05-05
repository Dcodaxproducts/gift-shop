"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Edit2, Eye, ListFilter, Plus, Search, X } from "lucide-react";
import {
  staffMembers,
  staffPagination,
  staffRoleOptions,
  staffStatusOptions,
  type StaffMember,
} from "@/constants/staff";
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

const statusToneClass = {
  Active: "bg-emerald-50 text-emerald-600",
  Inactive: "bg-slate-100 text-slate-500",
};

export function StaffUsersPage() {
  const router = useRouter();
  const [page, setPage] = useState(1);

  return (
    <div className="space-y-5">
      <PageHeader
        title="Staff Management"
        description="Manage staff accounts, roles, and permissions"
        actions={
          <Button onClick={() => router.push("/staff-users/create")}>
            <Plus className="mr-2 size-3.5" />
            Create Staff
          </Button>
        }
      />

      <Card className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-3 xl:flex-row xl:items-center">
          <div className="min-w-0 flex-1">
            <Input
              type="search"
              placeholder="Search staff by name or email..."
              leftIcon={<Search className="size-4" />}
              className="h-11! rounded-xl bg-slate-50 text-xs"
            />
          </div>
          <div className="grid grid-cols-2 gap-3 sm:flex">
            <Select defaultValue="all">
              <SelectTrigger className="h-11 w-full rounded-xl bg-slate-50 text-xs sm:w-[150px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {staffRoleOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select defaultValue="all">
              <SelectTrigger className="h-11 w-full rounded-xl bg-slate-50 text-xs sm:w-[140px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {staffStatusOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button variant="outline" className="col-span-2 h-11 sm:col-span-1 sm:w-11 sm:px-0">
              <ListFilter className="size-4" />
              <span className="sm:hidden">More Filters</span>
            </Button>
          </div>
        </div>
      </Card>

      <DataTable
        data={staffMembers}
        pagination={{ ...staffPagination, page, onPageChange: setPage }}
        headers={
          <>
            <TableHead>Staff</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created Date</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </>
        }
        row={(item: StaffMember) => (
          <>
            <TableCell>
              <div className="flex items-center gap-3">
                <span className="flex size-10 items-center justify-center rounded-2xl bg-primary/10 text-xs font-black text-primary">
                  {item.initials}
                </span>
                <span className="text-xs font-bold text-slate-950">{item.name}</span>
              </div>
            </TableCell>
            <TableCell className="text-xs text-slate-500">{item.email}</TableCell>
            <TableCell className="text-xs text-slate-700">{item.role}</TableCell>
            <TableCell>
              <span className={cn("inline-flex rounded-full px-3 py-1.5 text-[10px] font-bold", statusToneClass[item.status])}>
                {item.status}
              </span>
            </TableCell>
            <TableCell className="text-xs text-slate-500">{item.createdAt}</TableCell>
            <TableCell>
              <div className="flex items-center justify-end">
                <Button
                  variant="ghost"
                  className="size-9 rounded-full text-primary hover:bg-primary/10"
                  onClick={() => router.push(`/staff-users/${item.id}`)}
                >
                  <Eye className="size-4" />
                </Button>
                <Button
                  variant="ghost"
                  className="size-9 rounded-full text-emerald-500 hover:bg-emerald-50"
                  onClick={() => router.push(`/staff-users/${item.id}`)}
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
