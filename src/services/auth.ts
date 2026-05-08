import { api } from "@/lib/axios";

const toMessageResponse = <T>(response: ApiResponse<T>): T | AuthMessageResponse => {
  return response.data ?? { success: response.success, message: response.message };
};

export const loginUser = async (payload: LoginPayload): Promise<LoginResponse> => {
  const { data } = await api.post<ApiResponse<LoginResponse>>("/auth/login", payload);

  if (!data.data) {
    throw new Error(data.message ?? "Login response is missing data.");
  }

  return data.data;
};

export const verifyAuth = async (payload: VerifyAuthPayload): Promise<AuthMessageResponse> => {
  const { data } = await api.post<ApiResponse<AuthMessageResponse>>("/auth/verify", payload);

  return toMessageResponse(data);
};

export const resendAuthCode = async (payload: ResendAuthPayload): Promise<AuthMessageResponse> => {
  const { data } = await api.post<ApiResponse<AuthMessageResponse>>("/auth/resend", payload);

  return toMessageResponse(data);
};

export const forgotPassword = async (payload: ForgotPasswordPayload): Promise<AuthMessageResponse> => {
  const { data } = await api.post<ApiResponse<AuthMessageResponse>>("/auth/forgot", payload);

  return toMessageResponse(data);
};

export const resetPassword = async (payload: ResetPasswordPayload): Promise<AuthMessageResponse> => {
  const { data } = await api.post<ApiResponse<AuthMessageResponse>>("/auth/reset", payload);

  return toMessageResponse(data);
};

export const changePassword = async (payload: ChangePasswordPayload): Promise<AuthMessageResponse> => {
  const { data } = await api.patch<ApiResponse<AuthMessageResponse>>("/auth/change-password", payload);

  return toMessageResponse(data);
};

export const getCurrentUser = async (): Promise<AuthUser> => {
  const { data } = await api.get<ApiResponse<CurrentUserResponse>>("/auth/me");

  if (!data.data?.user) {
    throw new Error(data.message ?? "User response is missing data.");
  }

  return data.data.user;
};
