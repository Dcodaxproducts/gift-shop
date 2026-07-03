"use client";

import { RoleCard } from "@/components/cards/RolesCard";
import type { StaffRole } from "@/types/staff-roles";

type RoleListProps = {
  roles: StaffRole[];
  loading: boolean;
  selectedRoleId?: string;
  onSelect: (roleId: string) => void;
  onDelete: (role: StaffRole) => void;
};

function RoleListSkeleton() {
  return (
    <>
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={`role-skeleton-${index}`}
          className="w-full rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
        >
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-2.5">
              <div className="size-7 animate-pulse rounded-full bg-slate-100" />
              <div className="space-y-1.5">
                <div className="h-3 w-24 animate-pulse rounded-full bg-slate-100" />
                <div className="h-2 w-16 animate-pulse rounded-full bg-slate-100" />
              </div>
            </div>
            <div className="h-2 w-12 animate-pulse rounded-full bg-slate-100" />
          </div>
          <div className="mt-3 h-2.5 w-full animate-pulse rounded-full bg-slate-100" />
          <div className="mt-2 h-2.5 w-3/4 animate-pulse rounded-full bg-slate-100" />
          <div className="mt-3 h-2.5 w-20 animate-pulse rounded-full bg-slate-100" />
        </div>
      ))}
    </>
  );
}

export function RoleList({
  roles,
  loading,
  selectedRoleId,
  onSelect,
  onDelete,
}: RoleListProps) {
  if (loading) {
    return <RoleListSkeleton />;
  }

  if (roles.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-6 text-center text-xs text-slate-400">
        No roles yet
      </div>
    );
  }

  return (
    <>
      {roles.map((role) => (
        <RoleCard
          key={role.id}
          role={role}
          isSelected={role.id === selectedRoleId}
          onSelect={() => onSelect(role.id)}
          onDelete={() => onDelete(role)}
        />
      ))}
    </>
  );
}
