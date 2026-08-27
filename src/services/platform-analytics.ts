import { api } from "@/lib/axios";
import type {
  GetPlatformAnalyticsReportParams,
  GetRevenueTransactionsParams,
  PlatformAnalyticsStats,
  RevenueTransaction,
  RevenueTransactionsMeta,
} from "@/types/platform-analytics";

const PLATFORM_ANALYTICS_ENDPOINT = "/admin/platform-analytics";

export const getPlatformAnalyticsStats = async () => {
  const { data } = await api.get(`${PLATFORM_ANALYTICS_ENDPOINT}/stats`);
  return data.data as PlatformAnalyticsStats;
};

export const getRevenueTransactions = async (params: GetRevenueTransactionsParams = {}) => {
  const { data } = await api.get(`${PLATFORM_ANALYTICS_ENDPOINT}/revenue-transactions`, { params });

  return {
    data: (data.data ?? []) as RevenueTransaction[],
    meta: (data.meta ?? {
      page: params.page ?? 1,
      limit: params.limit ?? 10,
      total: data.data?.length ?? 0,
      totalPages: 1,
    }) as RevenueTransactionsMeta,
  };
};

export const getPlatformAnalyticsReport = async (params: GetPlatformAnalyticsReportParams = {}) => {
  const { data } = await api.get(`${PLATFORM_ANALYTICS_ENDPOINT}/report`, {
    params,
    responseType: "blob",
  });
  return data;
};
