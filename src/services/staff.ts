import { api } from "@/lib/axios";
import type {
  CreateStaffPayload,
  GetStaffParams,
  StaffMember,
  UpdateStaffPasswordPayload,
  UpdateStaffPayload,
} from "@/types/staff";

const STAFF_ENDPOINT = "/staff";

export const getStaff = async (params: GetStaffParams = {}) => {
  const { data } = await api.get(STAFF_ENDPOINT, { params });
  return (data.data ?? []) as StaffMember[];
};

export const getStaffMember = async (id: string) => {
  const { data } = await api.get(`${STAFF_ENDPOINT}/${id}`);
  return data.data as StaffMember;
};

export const createStaff = async (payload: CreateStaffPayload) => {
  const { data } = await api.post(STAFF_ENDPOINT, payload);
  return data.data as StaffMember;
};

export const updateStaff = async ({
  id,
  payload,
}: {
  id: string;
  payload: UpdateStaffPayload;
}) => {
  const { data } = await api.patch(`${STAFF_ENDPOINT}/${id}`, payload);
  return data.data as StaffMember;
};

export const updateStaffPassword = async ({
  id,
  payload,
}: {
  id: string;
  payload: UpdateStaffPasswordPayload;
}) => {
  const { data } = await api.patch(`${STAFF_ENDPOINT}/${id}/password`, payload);
  return data.data as StaffMember;
};

export const deleteStaff = async (id: string) => {
  const { data } = await api.delete(`${STAFF_ENDPOINT}/${id}`);
  return data.data as StaffMember;
};
