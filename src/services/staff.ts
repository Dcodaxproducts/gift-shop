import { api } from "@/lib/axios";
import type {
  ApiDataResponse,
  ApiListResponse,
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
  return data as ApiListResponse<StaffMember>;
};

export const getStaffMember = async (id: string) => {
  const { data } = await api.get(`${ADMINS_ENDPOINT}/${id}`);
  const body = data as ApiDataResponse<StaffMember>;

  return body.data as StaffMember;
};

export const createStaff = async (payload: CreateStaffPayload) => {
  const { data } = await api.post(ADMINS_ENDPOINT, payload);
  const body = data as ApiDataResponse<StaffMember>;

  return body.data as StaffMember;
};

export const updateStaff = async ({
  id,
  payload,
}: {
  id: string;
  payload: UpdateStaffPayload;
}) => {
  const { data } = await api.patch(`${ADMINS_ENDPOINT}/${id}`, payload);
  const body = data as ApiDataResponse<StaffMember>;

  return body.data as StaffMember;
};

export const updateStaffActiveStatus = async ({
  id,
  payload,
}: {
  id: string;
  payload: UpdateStaffActiveStatusPayload;
}) => {
  const { data } = await api.patch(`${ADMINS_ENDPOINT}/${id}/active-status`, payload);
  const body = data as ApiDataResponse<StaffMember>;

  return body.data as StaffMember;
};

export const updateStaffPassword = async ({
  id,
  payload,
}: {
  id: string;
  payload: UpdateStaffPasswordPayload;
}) => {
  const { data } = await api.patch(`${ADMINS_ENDPOINT}/${id}/password`, payload);
  const body = data as ApiDataResponse<StaffMember>;

  return body.data as StaffMember;
};

export const deleteStaff = async (id: string) => {
  const { data } = await api.delete(`${ADMINS_ENDPOINT}/${id}`);
  const body = data as ApiDataResponse<StaffMember>;

  return body.data as StaffMember;
};
