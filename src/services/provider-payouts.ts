import { api } from "@/lib/axios";
import type {
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
  return data.data as ProviderPayoutStats;
};

export const getProviderPayoutTrends = async (
  params: ProviderPayoutTrendsParams = {},
) => {
  const { data } = await api.get(`${PROVIDER_PAYOUTS_ENDPOINT}/trends`, { params });
  return data.data as ProviderPayoutTrends;
};

export const getProviderEarningDistribution = async () => {
  const { data } = await api.get(`${PROVIDER_PAYOUTS_ENDPOINT}/earning-distribution`);
  return (data.data ?? []) as ProviderEarningDistributionItem[];
};

export const getProviderPayouts = async (params: ProviderPayoutsParams = {}) => {
  const { data } = await api.get(PROVIDER_PAYOUTS_ENDPOINT, { params });
  return (data.data ?? []) as ProviderPayoutListItem[];
};

export const getProviderPayoutBreakdown = async (id: string) => {
  const { data } = await api.get(`${PROVIDER_PAYOUTS_ENDPOINT}/${id}/breakdown`);
  return data.data as ProviderPayoutBreakdown;
};

export const updateProviderPayoutStatus = async ({
  id,
  action,
  payload,
}: ProviderPayoutActionRequest) => {
  const { data } = await api.post(`${PROVIDER_PAYOUTS_ENDPOINT}/${id}/${action}`, payload);
  return data.data as ProviderPayoutActionResponse;
};

export const exportProviderPayouts = async () => {
  const { data } = await api.get(`${PROVIDER_PAYOUTS_ENDPOINT}/export`, {
    responseType: "blob",
  });

  return data;
};
