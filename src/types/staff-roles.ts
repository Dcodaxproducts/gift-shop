export type PermissionAction = "read" | "create" | "update" | "delete";

export const PERMISSION_ACTIONS: PermissionAction[] = [
  "read",
  "create",
  "update",
  "delete",
];

export type RolePermissions = Record<string, PermissionAction[]>;

export type StaffRole = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  isSystem: boolean;
  isActive: boolean;
  StaffCount?: number;
  createdAt: string;
};

export type StaffRoleDetails = StaffRole & {
  permissions: RolePermissions;
};

export type CreateStaffRolePayload = {
  name: string;
  description: string;
  permissions: RolePermissions;
};

export type UpdateStaffRolePayload = Partial<{
  name: string;
  description: string;
  isActive: boolean;
}>;

export type UpdateStaffRolePermissionsPayload = {
  permissions: RolePermissions;
};
