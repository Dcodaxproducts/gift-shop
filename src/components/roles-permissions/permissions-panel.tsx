"use client";

import { PermissionCheckbox } from "@/components/roles-permissions/permission-checkbox";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { permissionModules } from "@/config/permission-modules";
import { getDashboardIcon } from "@/lib/dashboard-icons";
import {
  PERMISSION_ACTIONS,
  type PermissionAction,
  type RolePermissions,
} from "@/types/admin-roles";

type PermissionsPanelProps = {
  roleName?: string;
  permissions: RolePermissions;
  loading: boolean;
  isDirty: boolean;
  isSaving: boolean;
  onReset: () => void;
  onCancel: () => void;
  onSave: () => void;
  onToggleAction: (moduleKey: string, action: PermissionAction) => void;
};

function PermissionsSkeleton() {
  return (
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
              <div key={actionIndex} className="flex items-center gap-2">
                <div className="size-4 animate-pulse rounded bg-slate-100" />
                <div className="h-2.5 w-14 animate-pulse rounded-full bg-slate-100" />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export function PermissionsPanel({
  roleName,
  permissions,
  loading,
  isDirty,
  isSaving,
  onReset,
  onCancel,
  onSave,
  onToggleAction,
}: PermissionsPanelProps) {
  return (
    <Card className="">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-slate-900">
            Permission:{" "}
            <span className="text-primary">{roleName ?? "—"}</span>
          </p>
          <p className="mt-1 text-[11px] text-slate-400">
            Select which modules and actions are accessible for each role.
          </p>
        </div>
        <button
          type="button"
          onClick={onReset}
          className="text-[11px] font-medium text-primary hover:underline"
        >
          Reset to default
        </button>
      </div>

      <div className="mt-6 overflow-hidden">
        <div className="grid grid-cols-[200px_minmax(0,1fr)] border-b border-slate-200 pb-3">
          <p className="text-xs font-semibold text-slate-500">Module</p>
          <p className="text-xs font-semibold text-slate-500">Access Rights</p>
        </div>

        {loading ? (
          <PermissionsSkeleton />
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
                    <Icon className="size-4 text-slate-500" strokeWidth={2} />
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
                        onChange={() => onToggleAction(module.key, action)}
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
        <Button variant="outline" onClick={onCancel} disabled={!isDirty || isSaving}>
          Cancel
        </Button>
        <Button onClick={onSave} disabled={!isDirty || isSaving}>
          {isSaving ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </Card>
  );
}
