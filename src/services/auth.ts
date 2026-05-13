import { api } from "@/lib/axios";

export const loginUser = async (payload: LoginPayload): Promise<LoginResponse> => {
  const { data } = await api.post<ApiResponse<LoginResponse>>("/auth/login", payload);
  return data.data as LoginResponse;
};

export const verifyAuth = async (payload: VerifyAuthPayload): Promise<AuthMessageResponse> => {
  const { data } = await api.post<ApiResponse<AuthMessageResponse>>("/auth/verify", payload);
  return data.data ?? {};
};

export const resendAuthCode = async (payload: ResendAuthPayload): Promise<AuthMessageResponse> => {
  const { data } = await api.post<ApiResponse<AuthMessageResponse>>("/auth/resend", payload);
  return data.data ?? {};
};

export const forgotPassword = async (payload: ForgotPasswordPayload): Promise<AuthMessageResponse> => {
  const { data } = await api.post<ApiResponse<AuthMessageResponse>>("/auth/forgot-password", payload);
  return data.data ?? {};
};

export const resetPassword = async (payload: ResetPasswordPayload): Promise<AuthMessageResponse> => {
  const { data } = await api.post<ApiResponse<AuthMessageResponse>>("/auth/reset", payload);
  return data.data ?? {};
};

export const changePassword = async (payload: ChangePasswordPayload): Promise<AuthMessageResponse> => {
  const { data } = await api.patch<ApiResponse<AuthMessageResponse>>("/auth/change-password", payload);
  return data.data ?? {};
};

export const getCurrentUser = async (): Promise<AuthUser> => {
  const { data } = await api.get<ApiResponse<CurrentUserResponse>>("/auth/me");
  return (data.data as CurrentUserResponse).user;
};
