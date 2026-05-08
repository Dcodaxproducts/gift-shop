import { api } from "@/lib/axios";

export const loginUser = async (payload: LoginPayload): Promise<LoginResponse> => {
  const { data } = await api.post<ApiResponse<LoginResponse>>("/auth/login", payload);

  return data.data;
};
