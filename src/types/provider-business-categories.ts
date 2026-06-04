export type ProviderBusinessCategorySortBy =
  | "createdAt"
  | "updatedAt"
  | "name"
  | "sortOrder";

export type SortOrder = "ASC" | "DESC";

export type GetProviderBusinessCategoriesParams = {
  page?: number;
  limit?: number;
  search?: string;
  isActive?: boolean;
  sortBy?: ProviderBusinessCategorySortBy;
  sortOrder?: SortOrder;
};

export type ProviderBusinessCategory = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  iconKey: string | null;
  imageUrl: string | null;
  sortOrder: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

export type CreateProviderBusinessCategoryPayload = {
  name: string;
  description?: string;
  imageUrl?: string;
  isActive?: boolean;
};

export type UpdateProviderBusinessCategoryPayload = Partial<CreateProviderBusinessCategoryPayload>;
