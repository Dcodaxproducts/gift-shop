"use client";

import { useMemo, useState } from "react";
import { Plus } from "lucide-react";
import PageHeader from "@/components/common/page-header";
import { ConfirmDialog } from "@/components/dialog/confirm-dialog";
import { CreateRoleDialog } from "@/components/dialog/create-role-dialog";
import { PermissionsPanel } from "@/components/roles-permissions/permissions-panel";
import { RoleList } from "@/components/roles-permissions/role-list";
import { Button } from "@/components/ui/button";
import {
  useStaffRole,
  useStaffRoles,
  useDeleteStaffRole,
  useUpdateStaffRolePermissions,
} from "@/hooks/usePermissions";
import {
  arePermissionsEqual,
  buildDefaultPermissions,
  normalizeRolePermissions,
  sanitizePermissionsPayload,
  togglePermissionAction,
} from "@/utils/role-permissions";
import type { StaffRole, PermissionAction, RolePermissions } from "@/types/staff-roles";

export function RolesPermissionsPage() {
  const [createRoleOpen, setCreateRoleOpen] = useState(false);
  const [selectedRoleIdState, setSelectedRoleIdState] = useState<string | undefined>();
  const [permissionsDraft, setPermissionsDraft] = useState<{
    roleId?: string;
    permissions: RolePermissions;
    originalPermissions: RolePermissions;
  }>({ permissions: {}, originalPermissions: {} });
  const [deleteTarget, setDeleteTarget] = useState<StaffRole | null>(null);

  const { data: roles = [], isLoading: rolesLoading } = useStaffRoles();
  const selectedRoleId = selectedRoleIdState ?? roles[0]?.id;
  const { data: roleDetails, isLoading: roleDetailsLoading } = useStaffRole(
    selectedRoleId,
  );
  const updatePermissionsMutation = useUpdateStaffRolePermissions();
  const { mutate: deleteRole, isPending: isDeleting } = useDeleteStaffRole();

  const normalizedRolePermissions = useMemo(
    () => normalizeRolePermissions(roleDetails?.permissions),
    [roleDetails],
  );
  const permissionsState = permissionsDraft.roleId === roleDetails?.id
    ? permissionsDraft
    : {
        roleId: roleDetails?.id,
        permissions: normalizedRolePermissions,
        originalPermissions: normalizedRolePermissions,
      };
  const { permissions, originalPermissions } = permissionsState;

  const selectedRole = useMemo(
    () => roles.find((role) => role.id === selectedRoleId),
    [roles, selectedRoleId],
  );

  const isDirty = useMemo(
    () => !arePermissionsEqual(permissions, originalPermissions),
    [permissions, originalPermissions],
  );

  const handleToggleAction = (moduleKey: string, action: PermissionAction) => {
    setPermissionsDraft({
      ...permissionsState,
      permissions: togglePermissionAction(permissions, moduleKey, action),
    });
  };

  const handleReset = () => {
    setPermissionsDraft({
      ...permissionsState,
      permissions: buildDefaultPermissions(),
    });
  };

  const handleCancel = () => {
    setPermissionsDraft({
      ...permissionsState,
      permissions: originalPermissions,
    });
  };

  const handleSave = async () => {
    if (!selectedRoleId) return;

    const payload = sanitizePermissionsPayload(permissions);

    try {
      await updatePermissionsMutation.mutateAsync({
        id: selectedRoleId,
        payload: { permissions: payload },
      });
      setPermissionsDraft({
        roleId: selectedRoleId,
        permissions: payload,
        originalPermissions: payload,
      });
    } catch {
      // toast handled in hook
    }
  };

  const handleDeleteConfirm = () => {
    if (!deleteTarget) return;

    deleteRole(deleteTarget.id, {
      onSuccess: () => {
        if (selectedRoleId === deleteTarget.id) {
          setSelectedRoleIdState(undefined);
        }
        setDeleteTarget(null);
      },
    });
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

      <CreateRoleDialog open={createRoleOpen} onOpenChange={setCreateRoleOpen} />

      <section className="grid gap-5 xl:grid-cols-[300px_minmax(0,1fr)]">
        <div className="space-y-3">
          <RoleList
            roles={roles}
            loading={rolesLoading}
            selectedRoleId={selectedRoleId}
            onSelect={setSelectedRoleIdState}
            onDelete={setDeleteTarget}
          />
        </div>

        <PermissionsPanel
          roleName={selectedRole?.name}
          permissions={permissions}
          loading={roleDetailsLoading}
          isDirty={isDirty}
          isSaving={updatePermissionsMutation.isPending}
          onReset={handleReset}
          onCancel={handleCancel}
          onSave={handleSave}
          onToggleAction={handleToggleAction}
        />
      </section>

      <ConfirmDialog
        open={!!deleteTarget}
        onOpenChange={(open) => {
          if (!open) setDeleteTarget(null);
        }}
        title="Delete Role"
        description={
          deleteTarget
            ? `Are you sure you want to delete "${deleteTarget.name}"? This action cannot be undone.`
            : undefined
        }
        confirmLabel="Delete"
        loading={isDeleting}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
}
