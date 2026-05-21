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

export type ProviderPayoutTrendRange = "LAST_3_MONTHS" | "LAST_6_MONTHS" | "LAST_12_MONTHS";

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

export type ProviderPayoutStatus =
  | "PENDING"
  | "PROCESSING"
  | "COMPLETED"
  | "FAILED"
  | "ON_HOLD"
  | "REJECTED"
  | "CANCELLED";

export type ProviderPayoutListProvider = {
  id: string;
  businessName: string;
  providerCode?: string | null;
  avatarUrl?: string | null;
};

export type ProviderPayoutListItem = {
  id: string;
  provider: ProviderPayoutListProvider;
  pendingAmount: number;
  currency: string;
  lastPayoutDate?: string | null;
  nextPayoutDate?: string | null;
  status: ProviderPayoutStatus | string;
};

export type ProviderPayoutsParams = {
  page?: number;
  limit?: number;
  sortBy?: "createdAt" | "amount" | "status" | "nextPayoutDate";
  sortOrder?: "ASC" | "DESC";
};

export type ProviderPayoutsPagination = {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
};

export type ProviderPayoutsResponse = {
  payouts: ProviderPayoutListItem[];
  pagination: ProviderPayoutsPagination;
};

export type ProviderPayoutBreakdown = {
  payoutId: string;
  provider: {
    id: string;
    businessName: string;
    merchantId: string;
  };
  grossAmount: number;
  platformFee: number;
  platformFeePercent: number;
  processingFee: number;
  netPayout: number;
  currency: string;
  recentTransactions: {
    orderNumber: string;
    description: string;
    amount: number;
  }[];
};

export type ProviderPayoutActionPayload = {
  comment?: string;
  notifyProvider: boolean;
};

export type HoldProviderPayoutPayload = ProviderPayoutActionPayload & {
  reason: "BANK_VERIFICATION_PENDING" | "COMPLIANCE_REVIEW" | "PROVIDER_DOCUMENTS_REQUIRED" | "OTHER";
};

export type RejectProviderPayoutPayload = ProviderPayoutActionPayload & {
  reason: "INVALID_BANK_ACCOUNT" | "FRAUD_RISK" | "COMPLIANCE_REJECTED" | "PROVIDER_INELIGIBLE" | "OTHER";
};

export type ProviderPayoutActionResponse = {
  id: string;
  status: ProviderPayoutStatus | string;
  ledgerReleased?: boolean;
};

export type ApiPaginationMeta = {
  page?: number;
  limit?: number;
  total?: number;
  totalPages?: number;
};

export type ApiListResponse<T> = {
  data?: T[];
  meta?: ApiPaginationMeta;
};

export type ApiDataResponse<T> = {
  data?: T;
};
