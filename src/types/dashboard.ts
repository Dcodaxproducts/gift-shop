export type DashboardOverview = {
  totalUsers: number;
  totalUsersDeltaPercent: number;
  totalProviders: number;
  totalProvidersDeltaPercent: number;
  transactions: number;
  transactionsDeltaPercent: number;
  totalRevenue: number;
  totalRevenueDeltaPercent: number;
};

export type DashboardRevenueTrends = {
  range: string;
  labels: string[];
  values: number[];
};

export type DashboardGiftVsPayment = {
  giftCardsPercent: number;
  directPaymentsPercent: number;
};

export type DashboardProviderPerformance = {
  providerId: string;
  providerName: string;
  successRate: number;
  totalVolume: number;
};

export type DashboardDispute = {
  id: string;
  caseId: string;
  userName: string;
  reason: string;
  status: string;
};

export type DashboardData = {
  overview: DashboardOverview;
  revenueTrends: DashboardRevenueTrends;
  giftVsPayment: DashboardGiftVsPayment;
  providerPerformance: DashboardProviderPerformance[];
  recentDisputes: DashboardDispute[];
};
