import { api } from "@/lib/axios";

export const loginUser = async (payload: LoginPayload) => {
  const { data } = await api.post("/auth/login", payload);
  return data.data as LoginResponse;
};

export const forgotPassword = async (payload: ForgotPasswordPayload) => {
  const { data } = await api.post("/auth/forgot-password", payload);
  return data.data ?? {};
};

export const resetPassword = async (payload: ResetPasswordPayload) => {
  const { data } = await api.post("/auth/reset", payload);
  return data.data ?? {};
};

export const getCurrentUser = async () => {
  const { data } = await api.get("/auth/me");
  return data.data;
};
