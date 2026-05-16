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
  const { data } = await api.get<ApiListResponse<AdminRole>>(ADMIN_ROLES_ENDPOINT);
  return data.data ?? [];
};

export const getAdminRole = async (id: string): Promise<AdminRoleDetails> => {
  const { data } = await api.get<ApiDataResponse<AdminRoleDetails>>(
    `${ADMIN_ROLES_ENDPOINT}/${id}`,
  );
  return data.data as AdminRoleDetails;
};

export const createAdminRole = async (
  payload: CreateAdminRolePayload,
): Promise<AdminRole> => {
  const { data } = await api.post<ApiDataResponse<AdminRole>>(
    ADMIN_ROLES_ENDPOINT,
    payload,
  );
  return data.data as AdminRole;
};

export const updateAdminRole = async ({
  id,
  payload,
}: {
  id: string;
  payload: UpdateAdminRolePayload;
}): Promise<AdminRole> => {
  const { data } = await api.patch<ApiDataResponse<AdminRole>>(
    `${ADMIN_ROLES_ENDPOINT}/${id}`,
    payload,
  );
  return data.data as AdminRole;
};

export const updateAdminRolePermissions = async ({
  id,
  payload,
}: {
  id: string;
  payload: UpdateAdminRolePermissionsPayload;
}): Promise<AdminRoleDetails> => {
  const { data } = await api.patch<ApiDataResponse<AdminRoleDetails>>(
    `${ADMIN_ROLES_ENDPOINT}/${id}/permissions`,
    payload,
  );
  return data.data as AdminRoleDetails;
};

export const deleteAdminRole = async (id: string): Promise<AdminRole> => {
  const { data } = await api.delete<ApiDataResponse<AdminRole>>(
    `${ADMIN_ROLES_ENDPOINT}/${id}`,
  );
  return data.data as AdminRole;
};

export const getPermissionsCatalog = async (): Promise<Record<string, string[]>> => {
  const { data } = await api.get<ApiDataResponse<Record<string, string[]>>>(
    "/permissions/catalog",
  );
  return data.data ?? {};
};
