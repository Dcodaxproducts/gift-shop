export type PermissionAction = "read" | "create" | "update" | "delete";

export const PERMISSION_ACTIONS: PermissionAction[] = [
  "read",
  "create",
  "update",
  "delete",
];

export type RolePermissions = Record<string, PermissionAction[]>;

export type AdminRole = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  isSystem: boolean;
  isActive: boolean;
  adminCount?: number;
  createdAt: string;
};

export type AdminRoleDetails = AdminRole & {
  permissions: RolePermissions;
};

export type CreateAdminRolePayload = {
  name: string;
  description: string;
  permissions: RolePermissions;
};

export type UpdateAdminRolePayload = Partial<{
  name: string;
  description: string;
  isActive: boolean;
}>;

export type UpdateAdminRolePermissionsPayload = {
  permissions: RolePermissions;
};
