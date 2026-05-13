export type ProviderStatus = "ALL" | "ACTIVE" | "PENDING" | "INACTIVE" | "SUSPENDED";

export type ProviderApproval = "ALL" | "APPROVED" | "PENDING" | "REJECTED";

export type ProviderSortBy =
  | "createdAt"
  | "businessName"
  | "email"
  | "revenue";

export type SortOrder = "ASC" | "DESC";

export type GetProvidersParams = {
  page?: number;
  limit?: number;
  search?: string;
  status?: ProviderStatus;
  approval?: ProviderApproval;
  sortBy?: ProviderSortBy;
  sortOrder?: SortOrder;
};

export type Provider = {
  id: string;
  providerCode: string;
  businessName: string;
  email: string;
  phone?: string;
  avatarUrl?: string | null;
  status: Exclude<ProviderStatus, "ALL">;
  isActive: boolean;
  approvalStatus: Exclude<ProviderApproval, "ALL">;
  revenue: number;
  registeredSince: string;
  createdAt: string;
  updatedAt?: string;
};

export type ProvidersPagination = {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
};

export type GetProvidersResponse = {
  providers: Provider[];
  pagination: ProvidersPagination;
};

export type ProviderStats = {
  totalProviders: number;
  totalProvidersChangePercent: number;
  pendingApproval: number;
  activeRevenue: number;
  activeRevenueChangePercent: number;
  inactiveRate: number;
  inactiveRateChangePercent: number;
};

export type CreateProviderPayload = {
  businessName: string;
  email: string;
  phone?: string;
};
