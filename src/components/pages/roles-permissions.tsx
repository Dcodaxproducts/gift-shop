"use client";

import { useEffect, useMemo, useState } from "react";
import { Plus } from "lucide-react";
import { PageHeader } from "@/components/common/page-header";
import { ConfirmDialog } from "@/components/dialog/confirm-dialog";
import { CreateRoleDialog } from "@/components/dialog/create-role-dialog";
import { PermissionsPanel } from "@/components/roles-permissions/permissions-panel";
import { RoleList } from "@/components/roles-permissions/role-list";
import { Button } from "@/components/ui/button";
import {
  useAdminRole,
  useAdminRoles,
  useDeleteAdminRole,
  useUpdateAdminRolePermissions,
} from "@/hooks/usePermissions";
import {
  arePermissionsEqual,
  buildDefaultPermissions,
  normalizeRolePermissions,
  sanitizePermissionsPayload,
  togglePermissionAction,
} from "@/utils/role-permissions";
import type { AdminRole, PermissionAction, RolePermissions } from "@/types/admin-roles";

export function RolesPermissionsPage() {
  const [createRoleOpen, setCreateRoleOpen] = useState(false);
  const [selectedRoleId, setSelectedRoleId] = useState<string | undefined>();
  const [permissions, setPermissions] = useState<RolePermissions>({});
  const [originalPermissions, setOriginalPermissions] = useState<RolePermissions>({});
  const [deleteTarget, setDeleteTarget] = useState<AdminRole | null>(null);

  const { data: roles = [], isLoading: rolesLoading } = useAdminRoles();
  const { data: roleDetails, isLoading: roleDetailsLoading } = useAdminRole(
    selectedRoleId,
  );
  const updatePermissionsMutation = useUpdateAdminRolePermissions();
  const { mutate: deleteRole, isPending: isDeleting } = useDeleteAdminRole();

  useEffect(() => {
    if (!selectedRoleId && roles.length > 0) {
      setSelectedRoleId(roles[0].id);
    }
  }, [roles, selectedRoleId]);

  useEffect(() => {
    if (roleDetails) {
      const normalized = normalizeRolePermissions(roleDetails.permissions);
      setPermissions(normalized);
      setOriginalPermissions(normalized);
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

  const handleToggleAction = (moduleKey: string, action: PermissionAction) => {
    setPermissions((current) => togglePermissionAction(current, moduleKey, action));
  };

  const handleReset = () => {
    setPermissions(buildDefaultPermissions());
  };

  const handleCancel = () => {
    setPermissions(originalPermissions);
  };

  const handleSave = async () => {
    if (!selectedRoleId) return;

    const payload = sanitizePermissionsPayload(permissions);

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

  const handleDeleteConfirm = () => {
    if (!deleteTarget) return;

    deleteRole(deleteTarget.id, {
      onSuccess: () => {
        if (selectedRoleId === deleteTarget.id) {
          setSelectedRoleId(undefined);
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
            onSelect={setSelectedRoleId}
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
