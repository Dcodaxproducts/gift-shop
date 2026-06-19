export type CancellationTier = {
  id?: string;
  daysBeforeDelivery: number;
  deductionPercent: number;
  label: string;
};

export type RefundPolicySettings = {
  allowRefund: boolean;
  cancellationTiers: CancellationTier[];
  lastUpdatedAt?: string | null;
  lastUpdatedBy?: {
    id: string;
    name: string;
  } | null;
};

export type UpdateRefundPolicySettingsPayload = {
  allowRefund: boolean;
  cancellationTiers: Array<Omit<CancellationTier, "id">>;
};
