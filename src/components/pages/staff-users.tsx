"use client";

import { useRouter } from "next/navigation";
import { Plus, Search } from "lucide-react";
import { staffMembers, type StaffMember } from "@/constants/staff";
import { PageHeader } from "@/components/common/page-header";
import { DataTable } from "@/components/tables/data-table";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { TableCell, TableHead } from "@/components/ui/table";
import { cn } from "@/lib/utils";

const statusToneClass = {
  Active: "bg-emerald-50 text-emerald-600",
  Inactive: "bg-slate-100 text-slate-500",
};

export function StaffUsersPage() {
  const router = useRouter();

  return (
    <div className="space-y-5">
      <PageHeader
        title="Staff Management"
        description="Manage staff accounts, roles, and permissions"
        actions={
          <Button className="h-10 rounded-xl px-5 text-xs" onClick={() => router.push("/create-staff")}>
            <Plus className="mr-2 size-3.5" />
            Add Staff
          </Button>
        }
      />

      <Card className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <Input
          type="search"
          placeholder="Search staff members..."
          leftIcon={<Search className="size-4" />}
          className="h-11! rounded-xl bg-slate-50 text-xs"
        />
      </Card>

      <DataTable
        data={staffMembers}
        showPagination={false}
        headers={
          <>
            <TableHead>Staff</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
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
            <TableCell>
              <div className="flex justify-end">
                <Button variant="ghost" className="text-primary" onClick={() => router.push(`/staff-users/${item.id}`)}>
                  Edit
                </Button>
              </div>
            </TableCell>
          </>
        )}
      />
    </div>
  );
}
