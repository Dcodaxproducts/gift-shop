import { api } from "@/lib/axios";
import type {
  GetUserActivityParams,
  GetUsersParams,
  GetUsersResponse,
  ResetUserPasswordPayload,
  SuspendUserPayload,
  UpdateUserPayload,
  UpdateUserStatusPayload,
  UserDetail,
} from "@/types/users";

export const getUsers = async (params: GetUsersParams = {}): Promise<GetUsersResponse> => {
  const { data } = await api.get("/users", { params });
  const meta = data.meta ?? { page: 1, limit: 10, total: 0, totalPages: 0 };
  return {
    users: data.data ?? [],
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

export const getUser = async (id: string): Promise<UserDetail> => {
  const { data } = await api.get(`/users/${id}`);
  return data.data;
};

export const updateUser = async ({ id, payload }: { id: string; payload: UpdateUserPayload }) => {
  const { data } = await api.patch(`/users/${id}`, payload);
  return data.data;
};

export const deleteUser = async (id: string) => {
  const { data } = await api.delete(`/users/${id}`);
  return data.data;
};

export const updateUserStatus = async ({ id, payload }: { id: string; payload: UpdateUserStatusPayload }) => {
  const { data } = await api.patch(`/users/${id}/status`, payload);
  return data.data;
};

export const suspendUser = async ({ id, payload }: { id: string; payload?: SuspendUserPayload }) => {
  const { data } = await api.post(`/users/${id}/suspend`, payload ?? {});
  return data.data;
};

export const unsuspendUser = async (id: string) => {
  const { data } = await api.post(`/users/${id}/unsuspend`, {});
  return data.data;
};

export const resetUserPassword = async ({ id, payload }: { id: string; payload?: ResetUserPasswordPayload }) => {
  const { data } = await api.post(`/users/${id}/reset-password`, payload ?? {});
  return data.data;
};

export const getUserActivity = async ({ id, params }: { id: string; params?: GetUserActivityParams }) => {
  const { data } = await api.get(`/users/${id}/activity`, { params });
  return data.data;
};

export const getUserStats = async (id: string) => {
  const { data } = await api.get(`/users/${id}/stats`);
  return data.data;
};

export const exportUsers = async () => {
  const { data } = await api.get("/users/export", { responseType: "blob" });
  return data;
};
