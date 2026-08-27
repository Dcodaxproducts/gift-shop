import type { ElementType } from "react";

export type PayoutMetric = {
  icon: ElementType;
  label: string;
  value: string;
  change: string;
  tone: "purple" | "amber" | "green" | "violet";
};

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

export type ProviderPayoutActionType = "approve" | "hold" | "reject";

export type ProviderPayoutActionRequest = {
  id: string;
  action: ProviderPayoutActionType;
  payload: ProviderPayoutActionPayload | HoldProviderPayoutPayload | RejectProviderPayoutPayload;
};

export type ProviderPayoutActionResponse = {
  id: string;
  status: ProviderPayoutStatus | string;
  ledgerReleased?: boolean;
};
