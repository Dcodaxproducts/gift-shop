import { api } from "@/lib/axios";
import type {
  AdminRole,
  AdminRoleDetails,
  CreateAdminRolePayload,
  UpdateAdminRolePayload,
  UpdateAdminRolePermissionsPayload,
} from "@/types/admin-roles";

const ADMIN_ROLES_ENDPOINT = "/admin-roles";

export const getAdminRoles = async () => {
  const { data } = await api.get(ADMIN_ROLES_ENDPOINT);
  return (data.data ?? []) as AdminRole[];
};

export const getAdminRole = async (id: string) => {
  const { data } = await api.get(`${ADMIN_ROLES_ENDPOINT}/${id}`);
  return data.data as AdminRoleDetails;
};

export const createAdminRole = async (
  payload: CreateAdminRolePayload,
) => {
  const { data } = await api.post(ADMIN_ROLES_ENDPOINT, payload);
  return data.data as AdminRole;
};

export const updateAdminRole = async ({
  id,
  payload,
}: {
  id: string;
  payload: UpdateAdminRolePayload;
}) => {
  const { data } = await api.patch(`${ADMIN_ROLES_ENDPOINT}/${id}`, payload);
  return data.data as AdminRole;
};

export const updateAdminRolePermissions = async ({
  id,
  payload,
}: {
  id: string;
  payload: UpdateAdminRolePermissionsPayload;
}) => {
  const { data } = await api.patch(`${ADMIN_ROLES_ENDPOINT}/${id}/permissions`, payload);
  return data.data as AdminRoleDetails;
};

export const deleteAdminRole = async (id: string) => {
  const { data } = await api.delete(`${ADMIN_ROLES_ENDPOINT}/${id}`);
  return data.data as AdminRole;
};

export const getPermissionsCatalog = async () => {
  const { data } = await api.get("/permissions/catalog");
  return (data.data ?? {}) as Record<string, string[]>;
};
