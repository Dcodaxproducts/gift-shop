import { api } from "@/lib/axios";
import type {
  ApiDataResponse,
  ApiListResponse,
  GetUserActivityParams,
  GetUsersParams,
  ResetUserPasswordPayload,
  SuspendUserPayload,
  UpdateUserPayload,
  UpdateUserStatusPayload,
  User,
  UserDetail,
} from "@/types/users";

export const getUsers = async (params: GetUsersParams = {}) => {
  const { data } = await api.get("/users", { params });
  return data as ApiListResponse<User>;
};

export const getUser = async (id: string) => {
  const { data } = await api.get(`/users/${id}`);
  const body = data as ApiDataResponse<UserDetail>;

  return body.data as UserDetail;
};

export const updateUser = async ({ id, payload }: { id: string; payload: UpdateUserPayload }) => {
  const { data } = await api.patch(`/users/${id}`, payload);
  const body = data as ApiDataResponse<UserDetail>;

  return body.data as UserDetail;
};

export const deleteUser = async (id: string) => {
  const { data } = await api.delete(`/users/${id}`);
  const body = data as ApiDataResponse<UserDetail>;

  return body.data as UserDetail;
};

export const updateUserStatus = async ({ id, payload }: { id: string; payload: UpdateUserStatusPayload }) => {
  const { data } = await api.patch(`/users/${id}/status`, payload);
  const body = data as ApiDataResponse<UserDetail>;

  return body.data as UserDetail;
};

export const suspendUser = async ({ id, payload }: { id: string; payload?: SuspendUserPayload }) => {
  const { data } = await api.post(`/users/${id}/suspend`, payload ?? {});
  const body = data as ApiDataResponse<UserDetail>;

  return body.data as UserDetail;
};

export const unsuspendUser = async (id: string) => {
  const { data } = await api.post(`/users/${id}/unsuspend`, {});
  const body = data as ApiDataResponse<UserDetail>;

  return body.data as UserDetail;
};

export const resetUserPassword = async ({ id, payload }: { id: string; payload?: ResetUserPasswordPayload }) => {
  const { data } = await api.post(`/users/${id}/reset-password`, payload ?? {});
  const body = data as ApiDataResponse<UserDetail>;

  return body.data as UserDetail;
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
