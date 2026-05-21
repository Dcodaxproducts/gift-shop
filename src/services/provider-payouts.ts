import { api } from "@/lib/axios";
import type {
  ApiDataResponse,
  ApiListResponse,
  HoldProviderPayoutPayload,
  ProviderEarningDistributionItem,
  ProviderPayoutActionPayload,
  ProviderPayoutActionResponse,
  ProviderPayoutBreakdown,
  ProviderPayoutListItem,
  ProviderPayoutsParams,
  ProviderPayoutsResponse,
  ProviderPayoutStats,
  ProviderPayoutTrends,
  ProviderPayoutTrendsParams,
  RejectProviderPayoutPayload,
} from "@/types/provider-payouts";

const PROVIDER_PAYOUTS_ENDPOINT = "/admin/provider-payouts";

const createPagination = (meta?: ApiListResponse<ProviderPayoutListItem>["meta"]) => {
  const page = meta?.page ?? 1;
  const limit = meta?.limit ?? 10;
  const total = meta?.total ?? 0;
  const totalPages = meta?.totalPages ?? 0;

  return {
    total,
    page,
    limit,
    totalPages,
    hasNext: page < totalPages,
    hasPrevious: page > 1,
  };
};

export const getProviderPayoutStats = async (): Promise<ProviderPayoutStats> => {
  const { data } = await api.get<ApiDataResponse<ProviderPayoutStats>>(`${PROVIDER_PAYOUTS_ENDPOINT}/stats`);
  return data.data as ProviderPayoutStats;
};

export const getProviderPayoutTrends = async (
  params: ProviderPayoutTrendsParams = {},
): Promise<ProviderPayoutTrends> => {
  const { data } = await api.get<ApiDataResponse<ProviderPayoutTrends>>(`${PROVIDER_PAYOUTS_ENDPOINT}/trends`, { params });
  return data.data as ProviderPayoutTrends;
};

export const getProviderEarningDistribution = async (): Promise<ProviderEarningDistributionItem[]> => {
  const { data } = await api.get<ApiDataResponse<ProviderEarningDistributionItem[]>>(`${PROVIDER_PAYOUTS_ENDPOINT}/earning-distribution`);
  return data.data ?? [];
};

export const getProviderPayouts = async (params: ProviderPayoutsParams = {}): Promise<ProviderPayoutsResponse> => {
  const { data } = await api.get<ApiListResponse<ProviderPayoutListItem>>(PROVIDER_PAYOUTS_ENDPOINT, { params });

  return {
    payouts: data.data ?? [],
    pagination: createPagination(data.meta),
  };
};

export const getProviderPayoutBreakdown = async (id: string): Promise<ProviderPayoutBreakdown> => {
  const { data } = await api.get<ApiDataResponse<ProviderPayoutBreakdown>>(`${PROVIDER_PAYOUTS_ENDPOINT}/${id}/breakdown`);
  return data.data as ProviderPayoutBreakdown;
};

export const approveProviderPayout = async ({
  id,
  payload,
}: {
  id: string;
  payload: ProviderPayoutActionPayload;
}): Promise<ProviderPayoutActionResponse> => {
  const { data } = await api.post<ApiDataResponse<ProviderPayoutActionResponse>>(`${PROVIDER_PAYOUTS_ENDPOINT}/${id}/approve`, payload);
  return data.data as ProviderPayoutActionResponse;
};

export const holdProviderPayout = async ({
  id,
  payload,
}: {
  id: string;
  payload: HoldProviderPayoutPayload;
}): Promise<ProviderPayoutActionResponse> => {
  const { data } = await api.post<ApiDataResponse<ProviderPayoutActionResponse>>(`${PROVIDER_PAYOUTS_ENDPOINT}/${id}/hold`, payload);
  return data.data as ProviderPayoutActionResponse;
};

export const rejectProviderPayout = async ({
  id,
  payload,
}: {
  id: string;
  payload: RejectProviderPayoutPayload;
}): Promise<ProviderPayoutActionResponse> => {
  const { data } = await api.post<ApiDataResponse<ProviderPayoutActionResponse>>(`${PROVIDER_PAYOUTS_ENDPOINT}/${id}/reject`, payload);
  return data.data as ProviderPayoutActionResponse;
};

export const exportProviderPayouts = async (): Promise<Blob> => {
  const { data } = await api.get(`${PROVIDER_PAYOUTS_ENDPOINT}/export`, {
    responseType: "blob",
  });

  return data;
};
