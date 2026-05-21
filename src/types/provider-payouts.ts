export type ProviderPayoutStats = {
  totalPayoutsThisMonth: number;
  totalPayoutsDeltaPercent: number;
  pendingPayouts: number;
  pendingPayoutsDeltaPercent: number;
  completedPayouts: number;
  completedPayoutsDeltaPercent: number;
  platformRevenue: number;
  platformRevenueDeltaPercent: number;
  currency: string;
};

export type ProviderPayoutTrendRange = "LAST_6_MONTHS" | "LAST_12_MONTHS";

export type ProviderPayoutTrendsParams = {
  range?: ProviderPayoutTrendRange;
};

export type ProviderPayoutTrends = {
  range: ProviderPayoutTrendRange | string;
  labels: string[];
  values: number[];
  currency: string;
};

export type ProviderEarningDistributionItem = {
  tierId: string;
  tierName: string;
  providerCount: number;
  totalEarnings: number;
  currency: string;
};
