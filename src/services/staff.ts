import { api } from "@/lib/axios";
import type {
  CreateStaffPayload,
  GetStaffParams,
  GetStaffResponse,
  StaffMember,
  UpdateStaffActiveStatusPayload,
  UpdateStaffPasswordPayload,
  UpdateStaffPayload,
} from "@/types/staff";

const ADMINS_ENDPOINT = "/admins";

export const getStaff = async (params: GetStaffParams = {}): Promise<GetStaffResponse> => {
  const { data } = await api.get(ADMINS_ENDPOINT, { params });
  const meta = data.meta ?? { page: 1, limit: 10, total: 0, totalPages: 0 };

  return {
    staff: data.data ?? [],
    pagination: {
      total: meta.total,
      page: meta.page,
      limit: meta.limit,
      totalPages: meta.totalPages,
      hasNext: meta.page < meta.totalPages,
      hasPrevious: meta.page > 1,
    },
  };
};

export const getStaffMember = async (id: string): Promise<StaffMember> => {
  const { data } = await api.get(`${ADMINS_ENDPOINT}/${id}`);
  return data.data;
};

export const createStaff = async (payload: CreateStaffPayload): Promise<StaffMember> => {
  const { data } = await api.post(ADMINS_ENDPOINT, payload);
  return data.data;
};

export const updateStaff = async ({
  id,
  payload,
}: {
  id: string;
  payload: UpdateStaffPayload;
}): Promise<StaffMember> => {
  const { data } = await api.patch(`${ADMINS_ENDPOINT}/${id}`, payload);
  return data.data;
};

export const updateStaffActiveStatus = async ({
  id,
  payload,
}: {
  id: string;
  payload: UpdateStaffActiveStatusPayload;
}): Promise<StaffMember> => {
  const { data } = await api.patch(`${ADMINS_ENDPOINT}/${id}/active-status`, payload);
  return data.data;
};

export const updateStaffPassword = async ({
  id,
  payload,
}: {
  id: string;
  payload: UpdateStaffPasswordPayload;
}): Promise<StaffMember> => {
  const { data } = await api.patch(`${ADMINS_ENDPOINT}/${id}/password`, payload);
  return data.data;
};

export const deleteStaff = async (id: string): Promise<StaffMember> => {
  const { data } = await api.delete(`${ADMINS_ENDPOINT}/${id}`);
  return data.data;
};
