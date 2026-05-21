import { api } from "@/lib/axios";
import type {
  ApiDataResponse,
  ApiListResponse,
  ProviderEarningDistributionItem,
  ProviderPayoutActionRequest,
  ProviderPayoutActionResponse,
  ProviderPayoutBreakdown,
  ProviderPayoutListItem,
  ProviderPayoutsParams,
  ProviderPayoutsResponse,
  ProviderPayoutStats,
  ProviderPayoutTrends,
  ProviderPayoutTrendsParams,
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
  const { data } = await api.get(`${PROVIDER_PAYOUTS_ENDPOINT}/stats`);
  const body = data as ApiDataResponse<ProviderPayoutStats>;

  return body.data as ProviderPayoutStats;
};

export const getProviderPayoutTrends = async (
  params: ProviderPayoutTrendsParams = {},
): Promise<ProviderPayoutTrends> => {
  const { data } = await api.get(`${PROVIDER_PAYOUTS_ENDPOINT}/trends`, { params });
  const body = data as ApiDataResponse<ProviderPayoutTrends>;

  return body.data as ProviderPayoutTrends;
};

export const getProviderEarningDistribution = async (): Promise<ProviderEarningDistributionItem[]> => {
  const { data } = await api.get(`${PROVIDER_PAYOUTS_ENDPOINT}/earning-distribution`);
  const body = data as ApiDataResponse<ProviderEarningDistributionItem[]>;

  return body.data ?? [];
};

export const getProviderPayouts = async (params: ProviderPayoutsParams = {}): Promise<ProviderPayoutsResponse> => {
  const { data } = await api.get(PROVIDER_PAYOUTS_ENDPOINT, { params });
  const body = data as ApiListResponse<ProviderPayoutListItem>;

  return {
    payouts: body.data ?? [],
    pagination: createPagination(body.meta),
  };
};

export const getProviderPayoutBreakdown = async (id: string): Promise<ProviderPayoutBreakdown> => {
  const { data } = await api.get(`${PROVIDER_PAYOUTS_ENDPOINT}/${id}/breakdown`);
  const body = data as ApiDataResponse<ProviderPayoutBreakdown>;

  return body.data as ProviderPayoutBreakdown;
};

export const updateProviderPayoutStatus = async ({
  id,
  action,
  payload,
}: ProviderPayoutActionRequest): Promise<ProviderPayoutActionResponse> => {
  const { data } = await api.post(`${PROVIDER_PAYOUTS_ENDPOINT}/${id}/${action}`, payload);
  const body = data as ApiDataResponse<ProviderPayoutActionResponse>;

  return body.data as ProviderPayoutActionResponse;
};

export const exportProviderPayouts = async (): Promise<Blob> => {
  const { data } = await api.get(`${PROVIDER_PAYOUTS_ENDPOINT}/export`, {
    responseType: "blob",
  });

  return data;
};
