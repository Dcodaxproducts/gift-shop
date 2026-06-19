"use client";

import { useState } from "react";
import { Download, Edit2, Eye, X } from "lucide-react";
import PageHeader from "@/components/common/page-header";
import { FilterSection } from "@/components/common/filter-section";
import { DataTable } from "@/components/tables/data-table";
import { Button } from "@/components/ui/button";
import { TableCell, TableHead } from "@/components/ui/table";
import { useRouter } from "next/navigation";
import { useDeleteUser, useExportUsers, useUsers } from "@/hooks/useUsers";
import type { User, UserStatus, UserSortBy } from "@/types/users";
import { EditUserDialog } from "@/components/dialog/edit-user-dialog";
import { ConfirmDialog } from "@/components/dialog/confirm-dialog";
import { StatusBadge } from "@/utils/status";
import { getInitials } from "@/utils/getInitials";
import { formatDate } from "@/utils/formatDate";
import { useDebounce } from "@/hooks/useDebounce";
import { userSortOptions, userStatusOptions } from "@/constants/filter-options";

export function UsersPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<UserStatus | "all">("all");
  const [sortBy, setSortBy] = useState<UserSortBy>("createdAt");
  const [editUser, setEditUser] = useState<User | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<User | null>(null);
  const limit = 10;
  const router = useRouter();
  const debouncedSearch = useDebounce(search, 400);

  const { data: users = [], isLoading } = useUsers({
    page,
    limit,
    search: debouncedSearch || undefined,
    status: status === "all" ? undefined : status,
    sortBy
  });
  console.log(users)
  const exportUsers = useExportUsers();
  const { mutate, isPending } = useDeleteUser();

  const hasNextPage = users.length === limit;

  const pagination = {
    total: (page - 1) * limit + users.length + (hasNextPage ? 1 : 0),
    page,
    limit,
    totalPages: page + (hasNextPage ? 1 : 0),
    hasNext: hasNextPage,
    hasPrevious: page > 1,
  };

  const handleStatusChange = (value: string) => {
    setStatus(value as UserStatus | "all");
  };

  const handleSortByChange = (value: string) => {
    setSortBy(value as UserSortBy);
  };

  const handleExport = () => {
    exportUsers.mutate();
  };

  return (
    <div className="space-y-5">
      <PageHeader
        title="Registered Users"
        description="Search, review, and manage customer accounts across the platform."
        actions={
          <>
            <Button variant="outline" onClick={handleExport} disabled={users?.length === 0 || exportUsers.isPending}>
              <Download className="mr-2 size-3.5" />
              {exportUsers.isPending ? "Exporting..." : "Export"}
            </Button>
          </>
        }
      />

      <FilterSection
        searchPlaceholder="Search users by name, email, or phone..."
        searchValue={search}
        onSearchChange={setSearch}
        filters={[
          {
            value: status,
            onChange: handleStatusChange,
            placeholder: "Status",
            width: "sm:w-[135px]",
            options: userStatusOptions,
          },
          {
            value: sortBy,
            onChange: handleSortByChange,
            placeholder: "Sort By",
            width: "sm:w-[140px]",
            options: userSortOptions,
          },
        ]}
      />

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
        row={(item: User) => {
          const fullName = `${item.firstName ?? ""} ${item.lastName ?? ""}`.trim();
          return (
            <>
              <TableCell>
                <div className="flex items-center gap-3">
                  <span className="flex bg-primary/10 text-primary size-10 items-center justify-center rounded-2xl text-xs font-semibold">
                    {getInitials(fullName)}
                  </span>
                  <span className="text-xs font-semibold  capitalize">{fullName}</span>
                </div>
              </TableCell>
              <TableCell>
                <div className="space-y-1">
                  <p className="text-xs font-medium text-slate-600">{item.email}</p>
                  <p className="text-[10px] text-slate-400">{item.phone}</p>
                </div>
              </TableCell>
              <TableCell className="text-xs text-slate-500">{formatDate(item.createdAt)}</TableCell>
              <TableCell className="text-xs font-semibold ">${item.totalSpent}</TableCell>
              <TableCell>
                <StatusBadge status={item.status} />
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
                    onClick={() => setEditUser(item)}
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
          );
        }}
      />
      <EditUserDialog
        open={!!editUser}
        onOpenChange={(open) => {
          if (!open) setEditUser(null);
        }}
        user={editUser ?? undefined}
      />

      <ConfirmDialog
        open={!!deleteTarget}
        onOpenChange={(open) => {
          if (!open) setDeleteTarget(null);
        }}
        title="Delete User"
        description="Are you sure you want to delete this user? This action cannot be undone."
        confirmLabel="Delete"
        loading={isPending}
        onConfirm={() => {
          if (!deleteTarget) return;
          mutate(deleteTarget.id, {
            onSuccess: () => setDeleteTarget(null),
          });
        }}
      />
    </div>
  );
}
