"use client";

import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { permissionModules } from "@/config/permission-modules";
import { useCreateStaffRole } from "@/hooks/usePermissions";
import { getDashboardIcon } from "@/lib/dashboard-icons";
import { PermissionCheckbox } from "@/components/pages/roles-permissions/components/permission-checkbox";
import { buildDefaultPermissions } from "@/utils/role-permissions";
import { createRoleFormSchema, type CreateRoleFormData } from "@/validations/roles";
import {
  PERMISSION_ACTIONS,
  type PermissionAction,
  type RolePermissions,
} from "@/types/staff-roles";

type CreateRoleDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function CreateRoleDialog({ open, onOpenChange }: CreateRoleDialogProps) {
  const [status, setStatus] = useState(true);
  const [permissions, setPermissions] = useState<RolePermissions>(buildDefaultPermissions);

  const { mutate: createRole, isPending: isBusy } = useCreateStaffRole();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateRoleFormData>({
    resolver: zodResolver(createRoleFormSchema),
    defaultValues: { name: "", description: "" },
  });

  useEffect(() => {
    if (open) {
      reset();
      setStatus(true);
      setPermissions(buildDefaultPermissions());
    }
  }, [open, reset]);

  const handleReset = () => {
    if (isBusy) return;
    reset();
    setStatus(true);
    setPermissions(buildDefaultPermissions());
  };

  const toggleAction = (moduleKey: string, action: PermissionAction) => {
    setPermissions((current) => {
      const existing = current[moduleKey] ?? [];
      const next = existing.includes(action)
        ? existing.filter((entry) => entry !== action)
        : [...existing, action];
      return { ...current, [moduleKey]: next };
    });
  };

  const buildPayloadPermissions = (): RolePermissions => {
    const payload: RolePermissions = {};
    Object.entries(permissions).forEach(([moduleKey, actions]) => {
      if (actions.length > 0) {
        payload[moduleKey] = PERMISSION_ACTIONS.filter((action) =>
          actions.includes(action),
        );
      }
    });
    return payload;
  };

  const onSubmit = (data: CreateRoleFormData) => {
    createRole(
      {
        name: data.name,
        description: data.description ?? "",
        permissions: buildPayloadPermissions(),
      },
      {
        onSuccess: () => {
          reset();
          setStatus(true);
          setPermissions(buildDefaultPermissions());
          onOpenChange(false);
        },
      },
    );
  };

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen && isBusy) return;
    onOpenChange(nextOpen);
  };

  const modulePairs = useMemo(() => {
    const pairs: Array<[typeof permissionModules[number], typeof permissionModules[number] | undefined]> = [];
    for (let index = 0; index < permissionModules.length; index += 2) {
      pairs.push([permissionModules[index], permissionModules[index + 1]]);
    }
    return pairs;
  }, []);

  // status is form-state only; consumed when extending payload later
  void status;

  return (
    <Dialog
      open={open}
      onOpenChange={handleOpenChange}
      title="Create Role"
      description="Create Role from here"
      className="max-w-md"
      contentClassName="px-6 pt-4 pb-0"
      footerClassName="justify-center gap-4 border-t border-slate-100 py-4"
      footer={
        <>
          <Button
            variant="ghost"
            className="text-sm font-semibold text-slate-900 hover:bg-transparent"
            onClick={handleReset}
            disabled={isBusy}
          >
            Reset
          </Button>
          <Button className="h-11 px-8" onClick={handleSubmit(onSubmit)} disabled={isBusy}>
            {isBusy ? "Creating..." : "Create"}
          </Button>
        </>
      }
    >
      <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-5">
        <div className="space-y-2">
          <Label htmlFor="role-name">
            Role Name <span className="text-primary">*</span>
          </Label>
          <Input
            id="role-name"
            placeholder="eg. Food Kart"
            className="h-11 rounded-xl"
            errorMessage={errors.name?.message}
            {...register("name")}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="role-description">
            Role Description <span className="text-primary">*</span>
          </Label>
          <Input
            id="role-description"
            placeholder="eg. jhon doe"
            className="h-11 rounded-xl"
            errorMessage={errors.description?.message}
            {...register("description")}
          />
        </div>

        <div className="flex items-center gap-3">
          <Label className="text-xs font-medium text-slate-900">Status</Label>
          <Switch
            checked={status}
            onClick={() => setStatus((current) => !current)}
          />
        </div>

        <div className="space-y-3 pt-1">
          <div>
            <p className="text-xs font-semibold text-slate-900">Permissions</p>
            <p className="mt-0.5 text-[10px] text-slate-400">
              Select which actions this role can perform
            </p>
          </div>

          <div className="max-h-70 overflow-y-auto pr-1 space-y-5">
            {modulePairs.map(([left, right], pairIndex) => (
              <div key={pairIndex} className="grid grid-cols-2 gap-x-6">
                {[left, right].filter(Boolean).map((module) => {
                  if (!module) return null;
                  const Icon = getDashboardIcon(module.icon);
                  const selected = permissions[module.key] ?? [];
                  return (
                    <div key={module.key} className="space-y-2.5">
                      <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
                        <Icon
                          className="size-3.5 text-slate-500"
                          strokeWidth={2}
                        />
                        <span className="text-xs font-semibold text-slate-700 truncate">
                          {module.title}
                        </span>
                      </div>
                      <div className="space-y-2">
                        {module.actions.map((action) => (
                          <PermissionCheckbox
                            key={action}
                            id={`create-role-${module.key}-${action}`}
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
            ))}
          </div>
        </div>
      </div>
    </Dialog>
  );
}
