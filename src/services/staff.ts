import { api } from "@/lib/axios";
import type {
  CreateStaffPayload,
  GetStaffParams,
  StaffMember,
  UpdateStaffActiveStatusPayload,
  UpdateStaffPasswordPayload,
  UpdateStaffPayload,
} from "@/types/staff";

const ADMINS_ENDPOINT = "/admins";

export const getStaff = async (params: GetStaffParams = {}) => {
  const { data } = await api.get(ADMINS_ENDPOINT, { params });
  return (data.data ?? []) as StaffMember[];
};

export const getStaffMember = async (id: string) => {
  const { data } = await api.get(`${ADMINS_ENDPOINT}/${id}`);
  return data.data as StaffMember;
};

export const createStaff = async (payload: CreateStaffPayload) => {
  const { data } = await api.post(ADMINS_ENDPOINT, payload);
  return data.data as StaffMember;
};

export const updateStaff = async ({
  id,
  payload,
}: {
  id: string;
  payload: UpdateStaffPayload;
}) => {
  const { data } = await api.patch(`${ADMINS_ENDPOINT}/${id}`, payload);
  return data.data as StaffMember;
};

export const updateStaffActiveStatus = async ({
  id,
  payload,
}: {
  id: string;
  payload: UpdateStaffActiveStatusPayload;
}) => {
  const { data } = await api.patch(`${ADMINS_ENDPOINT}/${id}/active-status`, payload);
  return data.data as StaffMember;
};

export const updateStaffPassword = async ({
  id,
  payload,
}: {
  id: string;
  payload: UpdateStaffPasswordPayload;
}) => {
  const { data } = await api.patch(`${ADMINS_ENDPOINT}/${id}/password`, payload);
  return data.data as StaffMember;
};

export const deleteStaff = async (id: string) => {
  const { data } = await api.delete(`${ADMINS_ENDPOINT}/${id}`);
  return data.data as StaffMember;
};
