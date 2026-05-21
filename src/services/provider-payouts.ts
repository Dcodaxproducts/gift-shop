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
  ProviderPayoutStats,
  ProviderPayoutTrends,
  ProviderPayoutTrendsParams,
} from "@/types/provider-payouts";

const PROVIDER_PAYOUTS_ENDPOINT = "/admin/provider-payouts";

export const getProviderPayoutStats = async () => {
  const { data } = await api.get(`${PROVIDER_PAYOUTS_ENDPOINT}/stats`);
  const body = data as ApiDataResponse<ProviderPayoutStats>;

  return body.data as ProviderPayoutStats;
};

export const getProviderPayoutTrends = async (
  params: ProviderPayoutTrendsParams = {},
) => {
  const { data } = await api.get(`${PROVIDER_PAYOUTS_ENDPOINT}/trends`, { params });
  const body = data as ApiDataResponse<ProviderPayoutTrends>;

  return body.data as ProviderPayoutTrends;
};

export const getProviderEarningDistribution = async () => {
  const { data } = await api.get(`${PROVIDER_PAYOUTS_ENDPOINT}/earning-distribution`);
  const body = data as ApiDataResponse<ProviderEarningDistributionItem[]>;

  return body.data ?? [];
};

export const getProviderPayouts = async (params: ProviderPayoutsParams = {}) => {
  const { data } = await api.get(PROVIDER_PAYOUTS_ENDPOINT, { params });
  return data as ApiListResponse<ProviderPayoutListItem>;
};

export const getProviderPayoutBreakdown = async (id: string) => {
  const { data } = await api.get(`${PROVIDER_PAYOUTS_ENDPOINT}/${id}/breakdown`);
  const body = data as ApiDataResponse<ProviderPayoutBreakdown>;

  return body.data as ProviderPayoutBreakdown;
};

export const updateProviderPayoutStatus = async ({
  id,
  action,
  payload,
}: ProviderPayoutActionRequest) => {
  const { data } = await api.post(`${PROVIDER_PAYOUTS_ENDPOINT}/${id}/${action}`, payload);
  const body = data as ApiDataResponse<ProviderPayoutActionResponse>;

  return body.data as ProviderPayoutActionResponse;
};

export const exportProviderPayouts = async () => {
  const { data } = await api.get(`${PROVIDER_PAYOUTS_ENDPOINT}/export`, {
    responseType: "blob",
  });

  return data;
};
