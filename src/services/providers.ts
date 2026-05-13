import { api } from "@/lib/axios";
import type {
  CreateProviderPayload,
  GetProvidersParams,
  GetProvidersResponse,
  Provider,
} from "@/types/providers";

export const getProviders = async (params: GetProvidersParams = {}): Promise<GetProvidersResponse> => {
  const { data } = await api.get("/providers", { params });
  const meta = data.meta ?? { page: 1, limit: 10, total: 0, totalPages: 0 };
  return {
    providers: data.data ?? [],
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

export const getProvider = async (id: string) => {
  const { data } = await api.get(`/providers/${id}`);
  return data.data;
};

export const getProviderStats = async () => {
  const { data } = await api.get("/providers/stats");
  return data.data;
};

export const createProvider = async (payload: CreateProviderPayload): Promise<Provider> => {
  const { data } = await api.post("/providers", payload);
  return data.data;
};

export const exportProviders = async () => {
  const { data } = await api.get("/providers/export", { responseType: "blob" });
  return data;
};

export const updateProvider = async (id: string, payload: Partial<CreateProviderPayload>): Promise<Provider> => {
  const { data } = await api.patch(`/providers/${id}`, payload);
  return data.data;
};

export const updateProviderStatus = async (id: string, action: string, reason?: string): Promise<Provider> => {
  const { data } = await api.patch(`/providers/${id}/status`, { action, reason });
  return data.data;
};

export const sendProviderMessage = async (id: string, payload: Record<string, any>) => {
  const { data } = await api.post(`/providers/${id}/message`, payload);
  return data.data;
};

export const getProviderItems = async (
  id: string,
  params: { page?: number; limit?: number; search?: string } = {}
) => {
  const { data } = await api.get(`/providers/${id}/items`, { params });
  const meta = data.meta ?? { page: 1, limit: 10, total: 0, totalPages: 0 };
  return {
    items: data.data ?? [],
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
