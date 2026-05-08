import { api } from "@/lib/axios";

export const loginUser = async (payload: LoginPayload): Promise<LoginResponse> => {
  const { data } = await api.post<ApiResponse<LoginResponse>>("/api/v1/auth/login", payload);

  return data.data ?? (data as LoginResponse);
};
