export type TransactionStatus = "SUCCESS" | "PENDING" | "FAILED";

export type TransactionType = "PAYMENT" | "GIFT" | "WITHDRAWAL";

export type TransactionUser = {
  id: string;
  name: string;
  avatarUrl?: string | null;
};

export type Transaction = {
  id: string;
  transactionId: string;
  user: TransactionUser;
  gatewayProvider: string;
  type: TransactionType | string;
  amount: number;
  currency: string;
  status: TransactionStatus | string;
  createdAt: string;
};

export type TransactionStats = {
  totalVolume: number;
  totalVolumeDeltaPercent: number;
  successRate: number;
  successRateDeltaPercent: number;
  pendingReview: number;
  failedToday: number;
  failedTodayDeltaPercent: number;
  currency: string;
};

export type GetTransactionsParams = {
  page?: number;
  limit?: number;
  search?: string;
  type?: TransactionType | string;
  status?: TransactionStatus | string;
};

export type TransactionsMeta = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

export type TransactionsResponse = {
  data: Transaction[];
  meta: TransactionsMeta;
};
