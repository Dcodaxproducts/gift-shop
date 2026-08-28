"use client";

import { RoleCard } from "@/components/cards/RolesCard";
import { RoleListSkeleton } from "@/components/skeletons";
import type { StaffRole } from "@/types/staff-roles";

type RoleListProps = {
  roles: StaffRole[];
  loading: boolean;
  selectedRoleId?: string;
  onSelect: (roleId: string) => void;
  onDelete: (role: StaffRole) => void;
};

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
