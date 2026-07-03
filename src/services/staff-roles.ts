import { api } from "@/lib/axios";
import {
  StaffRole,
  StaffRoleDetails,
  CreateStaffRolePayload,
  UpdateStaffRolePayload,
  UpdateStaffRolePermissionsPayload,
} from "@/types/staff-roles";

const STAFF_ROLE_ENDPOINT = "/staff-roles";

export const getStaffRoles = async () => {
  const { data } = await api.get(STAFF_ROLE_ENDPOINT);
  return (data.data ?? []) as StaffRole[];
};

export const getStaffRole = async (id: string) => {
  const { data } = await api.get(`${STAFF_ROLE_ENDPOINT}/${id}`);
  return data.data as StaffRoleDetails;
};

export const createStaffRole = async (
  payload: CreateStaffRolePayload,
) => {
  const { data } = await api.post(STAFF_ROLE_ENDPOINT, payload);
  return data.data as StaffRole;
};

export const updateStaffRole = async ({
  id,
  payload,
}: {
  id: string;
  payload: UpdateStaffRolePayload;
}) => {
  const { data } = await api.patch(`${STAFF_ROLE_ENDPOINT}/${id}`, payload);
  return data.data as StaffRole;
};

export const updateStaffRolePermissions = async ({
  id,
  payload,
}: {
  id: string;
  payload: UpdateStaffRolePermissionsPayload;
}) => {
  const { data } = await api.patch(`${STAFF_ROLE_ENDPOINT}/${id}/permissions`, payload);
  return data.data as StaffRoleDetails;
};

export const deleteStaffRole = async (id: string) => {
  const { data } = await api.delete(`${STAFF_ROLE_ENDPOINT}/${id}`);
  return data.data as StaffRole;
};