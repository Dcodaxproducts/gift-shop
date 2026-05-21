import { api } from "@/lib/axios";
import type {
  ApiDataResponse,
  ApiListResponse,
  CreateProviderPayload,
  GetProvidersParams,
  Provider,
  ProviderDetails,
  ProviderItem,
  ProviderItemsParams,
  ProviderMessagePayload,
  ProviderStats,
} from "@/types/providers";

export const getProviders = async (params: GetProvidersParams = {}) => {
  const { data } = await api.get("/providers", { params });
  return data as ApiListResponse<Provider>;
};

export const getProvider = async (id: string) => {
  const { data } = await api.get(`/providers/${id}`);
  const body = data as ApiDataResponse<ProviderDetails>;

  return body.data as ProviderDetails;
};

export const getProviderStats = async () => {
  const { data } = await api.get("/providers/stats");
  const body = data as ApiDataResponse<ProviderStats>;

  return body.data as ProviderStats;
};

export const createProvider = async (payload: CreateProviderPayload) => {
  const { data } = await api.post("/providers", payload);
  return data.data;
};

export const exportProviders = async () => {
  const { data } = await api.get("/providers/export", { responseType: "blob" });
  return data;
};

export const updateProvider = async ({ id, payload }: { id: string; payload: Partial<CreateProviderPayload> }) => {
  const { data } = await api.patch(`/providers/${id}`, payload);
  const body = data as ApiDataResponse<Provider>;

  return body.data as Provider;
};

export const updateProviderStatus = async ({ id, action, reason }: { id: string; action: string; reason?: string }) => {
  const { data } = await api.patch(`/providers/${id}/status`, { action, reason });
  const body = data as ApiDataResponse<Provider>;

  return body.data as Provider;
};

export const sendProviderMessage = async ({ id, payload }: { id: string; payload: ProviderMessagePayload }) => {
  const { data } = await api.post(`/providers/${id}/message`, payload);
  const body = data as ApiDataResponse<Provider>;

  return body.data as Provider;
};

export const getProviderItems = async (
  id: string,
  params: ProviderItemsParams = {},
 ) => {
  const { data } = await api.get(`/providers/${id}/items`, { params });
  return data as ApiListResponse<ProviderItem>;
};
