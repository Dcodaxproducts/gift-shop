import { api } from "@/lib/axios";

export const loginUser = async (payload: any) => {
  const { data } = await api.post("/auth/login", payload);
  return data.data;
};

export const verifyAuth = async (payload: any) => {
  const { data } = await api.post("/auth/verify", payload);
  return data.data;
};

export const resendAuthCode = async (payload: any) => {
  const { data } = await api.post("/auth/resend", payload);
  return data.data;
};

export const forgotPassword = async (payload: any) => {
  const { data } = await api.post("/auth/forgot", payload);
  return data.data;
};

export const resetPassword = async (payload: any) => {
  const { data } = await api.post("/auth/reset", payload);
  return data.data;
};

export const changePassword = async (payload: any) => {
  const { data } = await api.patch("/auth/change-password", payload);
  return data.data;
};

export const getCurrentUser = async () => {
  const { data } = await api.get("/auth/me");
  return data.data.user;
};
