"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Edit2, Plus, X } from "lucide-react";
import PageHeader from "@/components/common/page-header";
import { FilterSection } from "@/components/common/filter-section";
import { DataTable } from "@/components/tables/data-table";
import { Button } from "@/components/ui/button";
import { TableCell, TableHead } from "@/components/ui/table";
import { ConfirmDialog } from "@/components/dialog/confirm-dialog";
import { StatusBadge } from "@/utils/status";
import { staffStatusOptions } from "@/constants/filter-options";
import { useStaffRoles } from "@/hooks/usePermissions";
import { useDeleteStaff, useStaffList } from "@/hooks/useStaff";
import { useDebounce } from "@/hooks/useDebounce";
import { formatDate } from "@/utils/formatDate";
import type { StaffMember } from "@/types/staff";

export function StaffUsersPage() {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("all");
  const [status, setStatus] = useState("all");
  const [deleteTarget, setDeleteTarget] = useState<StaffMember | null>(null);
  const limit = 10;
  const debouncedSearch = useDebounce(search, 400);

  const { data: roles = [] } = useStaffRoles();
  const { data: staff = [], isLoading } = useStaffList({
    page,
    limit,
    search: debouncedSearch || undefined,
    roleId: role === "all" ? undefined : role,
    isActive: status === "all" ? undefined : status === "active",
  });
  const { mutate: deleteStaff, isPending } = useDeleteStaff();

  const roleOptions = useMemo(
    () => [
      { value: "all", label: "All Roles" },
      ...roles.map((item) => ({ value: item.id, label: item.name })),
    ],
    [roles],
  );

  const hasNextPage = staff.length === limit;
  const pagination = {
    total: (page - 1) * limit + staff.length + (hasNextPage ? 1 : 0),
    page,
    limit,
    totalPages: page + (hasNextPage ? 1 : 0),
    hasNext: hasNextPage,
    hasPrevious: page > 1,
  };

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
            options: roleOptions,
          },
          {
            value: status,
            onChange: setStatus,
            placeholder: "Status",
            width: "sm:w-[140px]",
            options: staffStatusOptions.map((option) => ({
              value: option.value,
              label: option.label,
            })),
          },
        ]}
      />

      <DataTable
        data={staff}
        loading={isLoading}
        pagination={{ ...pagination, page, onPageChange: setPage }}
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
            <TableCell className="font-semibold ">
              {item.fullName || `${item.firstName} ${item.lastName}`}
            </TableCell>
            <TableCell className="text-slate-500">{item.email}</TableCell>
            <TableCell className="text-slate-700">{item.role.name}</TableCell>
            <TableCell>
              <StatusBadge status={item.status} />
            </TableCell>
            <TableCell className="text-slate-500">{formatDate(item.createdAt)}</TableCell>
            <TableCell>
              <div className="flex items-center justify-end">
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
                  onClick={() => setDeleteTarget(item)}
                >
                  <X className="size-4" />
                </Button>
              </div>
            </TableCell>
          </>
        )}
      />

      <ConfirmDialog
        open={!!deleteTarget}
        onOpenChange={(open) => {
          if (!open) setDeleteTarget(null);
        }}
        title="Delete Staff"
        description="Are you sure you want to delete this staff member? This action cannot be undone."
        confirmLabel="Delete"
        loading={isPending}
        onConfirm={() => {
          if (!deleteTarget) return;
          deleteStaff(deleteTarget.id, {
            onSuccess: () => setDeleteTarget(null),
          });
        }}
      />
    </div>
  );
}
