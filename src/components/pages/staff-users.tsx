"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Edit2, Eye, Plus, X } from "lucide-react";
import {
  staffMembers,
  staffPagination,
  type StaffMember,
} from "@/constants/staff";
import { PageHeader } from "@/components/common/page-header";
import { FilterSection } from "@/components/common/filter-section";
import { DataTable } from "@/components/tables/data-table";
import { Button } from "@/components/ui/button";
import { TableCell, TableHead } from "@/components/ui/table"
import { StatusBadge } from "@/utils/status";
import { staffRoleOptions, staffStatusOptions } from "@/constants/filter-options";

export function StaffUsersPage() {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("all");
  const [status, setStatus] = useState("all");

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

      <FilterSection
        searchPlaceholder="Search staff by name or email..."
        searchValue={search}
        onSearchChange={setSearch}
        filters={[
          {
            value: role,
            onChange: setRole,
            placeholder: "Role",
            width: "sm:w-[150px]",
            options: staffRoleOptions.map(option => ({ value: option.value, label: option.label }))
          },
          {
            value: status,
            onChange: setStatus,
            placeholder: "Status",
            width: "sm:w-[140px]",
            options: staffStatusOptions.map(option => ({ value: option.value, label: option.label }))
          },
        ]}
      />

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
                <span className="flex size-10 items-center justify-center rounded-2xl bg-primary/10 font-semibold text-primary">
                  {item.initials}
                </span>
                <span className="font-semibold text-slate-950">{item.name}</span>
              </div>
            </TableCell>
            <TableCell className="text-slate-500">{item.email}</TableCell>
            <TableCell className="text-slate-700">{item.role}</TableCell>
            <TableCell>
              <StatusBadge status={item.status} />
            </TableCell>
            <TableCell className="text-slate-500">{item.createdAt}</TableCell>
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
