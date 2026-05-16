"use client";

import { useEffect, useMemo, useState } from "react";
import { Plus, ShieldCheck } from "lucide-react";
import { PageHeader } from "@/components/common/page-header";
import { CreateRoleDialog } from "@/components/dialog/create-role-dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { permissionModules } from "@/config/permission-modules";
import {
  useAdminRole,
  useAdminRoles,
  useUpdateAdminRolePermissions,
} from "@/hooks/usePermissions";
import { getDashboardIcon } from "@/lib/dashboard-icons";
import { cn } from "@/lib/utils";
import {
  PERMISSION_ACTIONS,
  type AdminRole,
  type PermissionAction,
  type RolePermissions,
} from "@/types/admin-roles";

function StatusIndicator({ active }: { active: boolean }) {
  return (
    <span
      className={cn(
        "flex items-center gap-1 text-[10px] font-medium",
        active ? "text-emerald-500" : "text-slate-400",
      )}
    >
      <span
        className={cn(
          "size-1.5 rounded-full",
          active ? "bg-emerald-500" : "bg-slate-300",
        )}
      />
      {active ? "Active" : "Inactive"}
    </span>
  );
}

function PermissionCheckbox({
  id,
  label,
  checked,
  onChange,
}: {
  id: string;
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <label
      htmlFor={id}
      className="flex cursor-pointer items-center gap-2 text-xs text-slate-700 select-none"
    >
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="sr-only"
      />
      <span
        className={cn(
          "flex size-4 items-center justify-center rounded border transition",
          checked
            ? "border-primary bg-primary text-white"
            : "border-slate-300 bg-white",
        )}
      >
        {checked ? (
          <svg
            viewBox="0 0 12 12"
            className="size-2.5"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="2 6 5 9 10 3" />
          </svg>
        ) : null}
      </span>
      <span className="capitalize">{label}</span>
    </label>
  );
}

function RoleCard({
  role,
  isSelected,
  onSelect,
  isDirty,
}: {
  role: AdminRole;
  isSelected: boolean;
  onSelect: () => void;
  isDirty: boolean;
}) {
  return (
    <button
      type="button"
      aria-pressed={isSelected}
      onClick={onSelect}
      className={cn(
        "w-full rounded-2xl border bg-white p-4 text-left shadow-sm transition",
        isSelected ? "border-primary" : "border-slate-200 hover:border-slate-300",
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <span className="flex size-7 items-center justify-center rounded-full bg-slate-100 text-slate-500">
            <ShieldCheck className="size-3.5" strokeWidth={2} />
          </span>
          <div>
            <p className="text-sm font-semibold text-slate-900">{role.name}</p>
            {role.isSystem ? (
              <p className="text-[9px] font-semibold tracking-wide text-slate-400">
                SYSTEM LOCKED
              </p>
            ) : isSelected && isDirty ? (
              <p className="text-[9px] font-semibold tracking-wide text-primary">
                EDITING...
              </p>
            ) : null}
          </div>
        </div>
        <StatusIndicator active={role.isActive} />
      </div>

      <p className="mt-3 text-[11px] leading-4 text-slate-500">
        {role.description ?? "No description"}
      </p>

      <p className="mt-3 text-[11px] font-medium text-primary underline underline-offset-2">
        view All {role.name}s
      </p>
    </button>
  );
}

const arePermissionsEqual = (a: RolePermissions, b: RolePermissions): boolean => {
  const keys = new Set([...Object.keys(a), ...Object.keys(b)]);
  for (const key of keys) {
    const left = [...(a[key] ?? [])].sort();
    const right = [...(b[key] ?? [])].sort();
    if (left.length !== right.length) return false;
    if (left.some((value, index) => value !== right[index])) return false;
  }
  return true;
};

const buildDefaultPermissions = (): RolePermissions => {
  const state: RolePermissions = {};
  permissionModules.forEach((module) => {
    state[module.key] = ["read", "create", "update"];
  });
  return state;
};

export function RolesPermissionsPage() {
  const [createRoleOpen, setCreateRoleOpen] = useState(false);
  const [selectedRoleId, setSelectedRoleId] = useState<string | undefined>();
  const [permissions, setPermissions] = useState<RolePermissions>({});
  const [originalPermissions, setOriginalPermissions] = useState<RolePermissions>({});

  const { data: roles = [], isLoading: rolesLoading } = useAdminRoles();
  const { data: roleDetails, isLoading: roleDetailsLoading } = useAdminRole(
    selectedRoleId,
  );
  const updatePermissionsMutation = useUpdateAdminRolePermissions();

  useEffect(() => {
    if (!selectedRoleId && roles.length > 0) {
      setSelectedRoleId(roles[0].id);
    }
  }, [roles, selectedRoleId]);

  useEffect(() => {
    if (roleDetails) {
      const filtered: RolePermissions = {};
      Object.entries(roleDetails.permissions ?? {}).forEach(([key, actions]) => {
        filtered[key] = PERMISSION_ACTIONS.filter((action) =>
          actions.includes(action),
        );
      });
      setPermissions(filtered);
      setOriginalPermissions(filtered);
    }
  }, [roleDetails]);

  const selectedRole = useMemo(
    () => roles.find((role) => role.id === selectedRoleId),
    [roles, selectedRoleId],
  );

  const isDirty = useMemo(
    () => !arePermissionsEqual(permissions, originalPermissions),
    [permissions, originalPermissions],
  );

  const toggleAction = (moduleKey: string, action: PermissionAction) => {
    setPermissions((current) => {
      const existing = current[moduleKey] ?? [];
      const next = existing.includes(action)
        ? existing.filter((entry) => entry !== action)
        : [...existing, action];
      return { ...current, [moduleKey]: next };
    });
  };

  const handleReset = () => {
    setPermissions(buildDefaultPermissions());
  };

  const handleCancel = () => {
    setPermissions(originalPermissions);
  };

  const handleSave = async () => {
    if (!selectedRoleId) return;
    const payload: RolePermissions = {};
    Object.entries(permissions).forEach(([key, actions]) => {
      if (actions.length > 0) {
        payload[key] = PERMISSION_ACTIONS.filter((action) =>
          actions.includes(action),
        );
      }
    });
    try {
      await updatePermissionsMutation.mutateAsync({
        id: selectedRoleId,
        payload: { permissions: payload },
      });
      setOriginalPermissions(payload);
    } catch {
      // toast handled in hook
    }
  };

  return (
    <div className="space-y-5">
      <PageHeader
        title="Roles List"
        description="Create and manage predefined roles to control access across different areas of the platform."
        actions={
          <Button onClick={() => setCreateRoleOpen(true)}>
            <Plus className="size-3.5" />
            Add New Role
          </Button>
        }
      />

      <CreateRoleDialog
        open={createRoleOpen}
        onOpenChange={setCreateRoleOpen}
      />

      <section className="grid gap-5 xl:grid-cols-[300px_minmax(0,1fr)]">
        <div className="space-y-3">
          {rolesLoading ? (
            Array.from({ length: 4 }).map((_, index) => (
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
            ))
          ) : roles.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-6 text-center text-xs text-slate-400">
              No roles yet
            </div>
          ) : (
            roles.map((role) => (
              <RoleCard
                key={role.id}
                role={role}
                isSelected={role.id === selectedRoleId}
                isDirty={isDirty}
                onSelect={() => setSelectedRoleId(role.id)}
              />
            ))
          )}
        </div>

        <Card className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-slate-900">
                Permission:{" "}
                <span className="text-primary">
                  {selectedRole?.name ?? "—"}
                </span>
              </p>
              <p className="mt-1 text-[11px] text-slate-400">
                Select which modules and actions are accessible for each role.
              </p>
            </div>
            <button
              type="button"
              onClick={handleReset}
              className="text-[11px] font-medium text-primary hover:underline"
            >
              Reset to default
            </button>
          </div>

          <div className="mt-6 overflow-hidden">
            <div className="grid grid-cols-[200px_minmax(0,1fr)] border-b border-slate-200 pb-3">
              <p className="text-xs font-semibold text-slate-500">Module</p>
              <p className="text-xs font-semibold text-slate-500">
                Access Rights
              </p>
            </div>

            {roleDetailsLoading ? (
              <div className="divide-y divide-slate-100">
                {Array.from({ length: 6 }).map((_, index) => (
                  <div
                    key={`perm-skeleton-${index}`}
                    className="grid grid-cols-[200px_minmax(0,1fr)] items-center py-4"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="size-4 animate-pulse rounded bg-slate-100" />
                      <div className="h-3 w-24 animate-pulse rounded-full bg-slate-100" />
                    </div>
                    <div className="grid grid-cols-4 gap-4">
                      {Array.from({ length: 4 }).map((_, actionIndex) => (
                        <div
                          key={actionIndex}
                          className="flex items-center gap-2"
                        >
                          <div className="size-4 animate-pulse rounded bg-slate-100" />
                          <div className="h-2.5 w-14 animate-pulse rounded-full bg-slate-100" />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                {permissionModules.map((module) => {
                  const Icon = getDashboardIcon(module.icon);
                  const selected = permissions[module.key] ?? [];

                  return (
                    <div
                      key={module.key}
                      className="grid grid-cols-[200px_minmax(0,1fr)] items-center py-4"
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon
                          className="size-4 text-slate-500"
                          strokeWidth={2}
                        />
                        <span className="text-xs font-medium text-slate-700">
                          {module.title}
                        </span>
                      </div>
                      <div className="grid grid-cols-4 gap-4">
                        {PERMISSION_ACTIONS.map((action) => (
                          <PermissionCheckbox
                            key={action}
                            id={`perm-${module.key}-${action}`}
                            label={action}
                            checked={selected.includes(action)}
                            onChange={() => toggleAction(module.key, action)}
                          />
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div className="mt-6 flex justify-end gap-3 border-t border-slate-100 pt-5">
            <Button
              variant="outline"
              onClick={handleCancel}
              disabled={!isDirty || updatePermissionsMutation.isPending}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={
                !selectedRoleId ||
                !isDirty ||
                updatePermissionsMutation.isPending
              }
            >
              {updatePermissionsMutation.isPending ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </Card>
      </section>
    </div>
  );
}
