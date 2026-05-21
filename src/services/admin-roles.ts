import { api } from "@/lib/axios";
import type {
  AdminRole,
  AdminRoleDetails,
  ApiDataResponse,
  ApiListResponse,
  CreateAdminRolePayload,
  UpdateAdminRolePayload,
  UpdateAdminRolePermissionsPayload,
} from "@/types/admin-roles";

const ADMIN_ROLES_ENDPOINT = "/admin-roles";

export const getAdminRoles = async (): Promise<AdminRole[]> => {
  const { data } = await api.get(ADMIN_ROLES_ENDPOINT);
  const body = data as ApiListResponse<AdminRole>;

  return body.data ?? [];
};

export const getAdminRole = async (id: string): Promise<AdminRoleDetails> => {
  const { data } = await api.get(`${ADMIN_ROLES_ENDPOINT}/${id}`);
  const body = data as ApiDataResponse<AdminRoleDetails>;

  return body.data as AdminRoleDetails;
};

export const createAdminRole = async (
  payload: CreateAdminRolePayload,
): Promise<AdminRole> => {
  const { data } = await api.post(ADMIN_ROLES_ENDPOINT, payload);
  const body = data as ApiDataResponse<AdminRole>;

  return body.data as AdminRole;
};

export const updateAdminRole = async ({
  id,
  payload,
}: {
  id: string;
  payload: UpdateAdminRolePayload;
}): Promise<AdminRole> => {
  const { data } = await api.patch(`${ADMIN_ROLES_ENDPOINT}/${id}`, payload);
  const body = data as ApiDataResponse<AdminRole>;

  return body.data as AdminRole;
};

export const updateAdminRolePermissions = async ({
  id,
  payload,
}: {
  id: string;
  payload: UpdateAdminRolePermissionsPayload;
}): Promise<AdminRoleDetails> => {
  const { data } = await api.patch(`${ADMIN_ROLES_ENDPOINT}/${id}/permissions`, payload);
  const body = data as ApiDataResponse<AdminRoleDetails>;

  return body.data as AdminRoleDetails;
};

export const deleteAdminRole = async (id: string): Promise<AdminRole> => {
  const { data } = await api.delete(`${ADMIN_ROLES_ENDPOINT}/${id}`);
  const body = data as ApiDataResponse<AdminRole>;

  return body.data as AdminRole;
};

export const getPermissionsCatalog = async (): Promise<Record<string, string[]>> => {
  const { data } = await api.get("/permissions/catalog");
  const body = data as ApiDataResponse<Record<string, string[]>>;

  return body.data ?? {};
};
