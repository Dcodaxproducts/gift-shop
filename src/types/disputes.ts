export type DisputeStatus = "OPEN" | "IN_REVIEW" | "ESCALATED" | "RESOLVED";
export type DisputePriority = "HIGH" | "MEDIUM" | "LOW";

export type DisputeStats = {
  openCases: number;
  openCasesDelta: number;
  awaitingAction: number;
  escalated: number;
  resolvedThisWeek: number;
  resolvedDeltaPercent: number;
  currency: string;
};

export type DisputeCustomer = {
  id: string;
  name: string;
  email: string;
};

export type DisputeTransaction = {
  id: string;
  transactionId: string;
  paymentStatus: string;
  processorAuthCode: string;
  amount: number;
  currency: string;
};

export type DisputeRefund = {
  eligible: boolean;
  eligibleReason: string;
  maxRefundAmount: number;
};

export type DisputeSla = {
  deadlineAt: string;
  remainingText: string;
  isApproachingDeadline: boolean;
};

export type Dispute = {
  id: string;
  caseId: string;
  status: DisputeStatus | string;
  priority: DisputePriority | string;
  reason: string;
  amount: number;
  currency: string;
  sla?: DisputeSla | null;
  customer: DisputeCustomer;
  transaction: DisputeTransaction;
  refund?: DisputeRefund | null;
  claimDetails?: string | null;
  createdAt: string;
  lastUpdatedAt?: string | null;
};

export type GetDisputesParams = {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  status?: string;
};

export type DisputesMeta = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

export type DisputesResponse = {
  data: Dispute[];
  meta: DisputesMeta;
};
