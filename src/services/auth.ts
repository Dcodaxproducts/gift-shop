import { api } from "@/lib/axios";

export const loginUser = async (payload: LoginPayload): Promise<LoginResponse> => {
  const { data } = await api.post("/auth/login", payload);
  const body = data as ApiResponse<LoginResponse>;

  return body.data as LoginResponse;
};

export const verifyAuth = async (payload: VerifyAuthPayload): Promise<AuthMessageResponse> => {
  const { data } = await api.post("/auth/verify", payload);
  const body = data as ApiResponse<AuthMessageResponse>;

  return body.data ?? {};
};

export const resendAuthCode = async (payload: ResendAuthPayload): Promise<AuthMessageResponse> => {
  const { data } = await api.post("/auth/resend", payload);
  const body = data as ApiResponse<AuthMessageResponse>;

  return body.data ?? {};
};

export const forgotPassword = async (payload: ForgotPasswordPayload): Promise<AuthMessageResponse> => {
  const { data } = await api.post("/auth/forgot-password", payload);
  const body = data as ApiResponse<AuthMessageResponse>;

  return body.data ?? {};
};

export const resetPassword = async (payload: ResetPasswordPayload): Promise<AuthMessageResponse> => {
  const { data } = await api.post("/auth/reset", payload);
  const body = data as ApiResponse<AuthMessageResponse>;

  return body.data ?? {};
};

export const changePassword = async (payload: ChangePasswordPayload): Promise<AuthMessageResponse> => {
  const { data } = await api.patch("/auth/change-password", payload);
  const body = data as ApiResponse<AuthMessageResponse>;

  return body.data ?? {};
};

export const getCurrentUser = async () => {
  const { data } = await api.get("/auth/me");
  return data.data;
};
