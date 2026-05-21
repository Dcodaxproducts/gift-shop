import { api } from "@/lib/axios";
import type {
  ProviderEarningDistributionItem,
  ProviderPayoutStats,
  ProviderPayoutTrends,
  ProviderPayoutTrendsParams,
} from "@/types/provider-payouts";

const PROVIDER_PAYOUTS_ENDPOINT = "/admin/provider-payouts";

export const getProviderPayoutStats = async (): Promise<ProviderPayoutStats> => {
  const { data } = await api.get(`${PROVIDER_PAYOUTS_ENDPOINT}/stats`);
  return data.data;
};

export const getProviderPayoutTrends = async (
  params: ProviderPayoutTrendsParams = {},
): Promise<ProviderPayoutTrends> => {
  const { data } = await api.get(`${PROVIDER_PAYOUTS_ENDPOINT}/trends`, { params });
  return data.data;
};

export const getProviderEarningDistribution = async (): Promise<ProviderEarningDistributionItem[]> => {
  const { data } = await api.get(`${PROVIDER_PAYOUTS_ENDPOINT}/earning-distribution`);
  return data.data ?? [];
};

export const exportProviderPayouts = async (): Promise<Blob> => {
  const { data } = await api.get(`${PROVIDER_PAYOUTS_ENDPOINT}/export`, {
    responseType: "blob",
  });

  return data;
};
