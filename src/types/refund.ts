export type RefundPolicySettings = {
  allowCancellation?: boolean;
  cancellationDeductionPercent?: number;
  lastUpdatedAt?: string | null;
  lastUpdatedBy?: {
    id: string;
    name: string;
  } | null;
};

export type UpdateRefundPolicySettingsPayload = {
  allowCancellation?: boolean;
  cancellationDeductionPercent?: number;
};
