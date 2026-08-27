export type PlatformAnalyticsStatMetric = {
  value: number;
  changePercent: number;
};

export type PlatformAnalyticsStats = {
  totalRevenue: PlatformAnalyticsStatMetric;
  newSubscriptions: PlatformAnalyticsStatMetric;
  churnRate: PlatformAnalyticsStatMetric;
  activeUsers: PlatformAnalyticsStatMetric;
};

export type RevenueTransactionProvider = {
  id: string;
  businessName: string;
};

export type RevenueTransactionCategory = {
  id: string;
  name: string;
};

export type RevenueTransaction = {
  id: string;
  date: string;
  userEmail: string;
  amount: number;
  currency: string;
  provider: RevenueTransactionProvider;
  category: RevenueTransactionCategory;
};

export type GetRevenueTransactionsParams = {
  page?: number;
  limit?: number;
  search?: string;
};

export type RevenueTransactionsMeta = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

export type RevenueTransactionsResponse = {
  data: RevenueTransaction[];
  meta: RevenueTransactionsMeta;
};

export type GetPlatformAnalyticsReportParams = {
  startDate?: string;
  endDate?: string;
};
