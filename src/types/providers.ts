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
  approvalStatus?: ProviderApproval;
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

export type ProviderDetails = Omit<Provider, "status"> & {
  status: string;
  serviceArea?: string | null;
  verification?: {
    label?: string;
  };
  stats?: {
    performanceStats?: number;
    performanceChangePercent?: number;
    listedItems?: number;
    listedItemsChange?: number;
    orderFulfillment?: number;
    orderFulfillmentChangePercent?: number;
    disputeCount?: number;
    disputeChangePercent?: number;
  };
};

export type ProviderItem = {
  id: string;
  imageUrl?: string | null;
  name: string;
  currency: string;
  price: number;
  salesCount: number;
  salesPercentage: number;
  status: string;
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

export type ProviderMessagePayload = Record<string, unknown>;

export type ProviderItemsParams = {
  page?: number;
  limit?: number;
  search?: string;
};
