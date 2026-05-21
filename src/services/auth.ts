import { api } from "@/lib/axios";

export const loginUser = async (payload: LoginPayload) => {
  const { data } = await api.post("/auth/login", payload);
  const body = data as ApiResponse<LoginResponse>;

  return body.data as LoginResponse;
};

export const verifyAuth = async (payload: VerifyAuthPayload) => {
  const { data } = await api.post("/auth/verify", payload);
  const body = data as ApiResponse<AuthMessageResponse>;

  return body.data ?? {};
};

export const resendAuthCode = async (payload: ResendAuthPayload) => {
  const { data } = await api.post("/auth/resend", payload);
  const body = data as ApiResponse<AuthMessageResponse>;

  return body.data ?? {};
};

export const forgotPassword = async (payload: ForgotPasswordPayload) => {
  const { data } = await api.post("/auth/forgot-password", payload);
  const body = data as ApiResponse<AuthMessageResponse>;

  return body.data ?? {};
};

export const resetPassword = async (payload: ResetPasswordPayload) => {
  const { data } = await api.post("/auth/reset", payload);
  const body = data as ApiResponse<AuthMessageResponse>;

  return body.data ?? {};
};

export const changePassword = async (payload: ChangePasswordPayload) => {
  const { data } = await api.patch("/auth/change-password", payload);
  const body = data as ApiResponse<AuthMessageResponse>;

  return body.data ?? {};
};

export const getCurrentUser = async () => {
  const { data } = await api.get("/auth/me");
  return data.data;
};
