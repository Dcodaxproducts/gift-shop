export type GiftCategoryStatus = "ACTIVE" | "INACTIVE" | "ARCHIVED" | "DELETED";

export type GiftCategorySortBy =
  | "createdAt"
  | "updatedAt"
  | "name"
  | "totalGifts"
  | "sortOrder";

export type SortOrder = "ASC" | "DESC";

export type GetGiftCategoriesParams = {
  page?: number;
  limit?: number;
  search?: string;
  status?: GiftCategoryStatus;
  isActive?: boolean;
  isVisible?: boolean;
  sortBy?: GiftCategorySortBy;
  sortOrder?: SortOrder;
};

export type GiftCategory = {
  id: string;
  name: string;
  description?: string | null;
  iconUrl?: string | null;
  icon?: string | null;
  displayPattern?: string | null;
  isActive?: boolean;
  isVisible?: boolean;
  visibleOnStorefront?: boolean;
  status?: GiftCategoryStatus;
  totalGifts?: number;
  giftsCount?: number;
  sortOrder?: number;
  createdAt?: string;
  updatedAt?: string;
};

export type GiftCategoryLookupItem = Pick<GiftCategory, "id" | "name" | "iconUrl" | "icon"> & {
  slug?: string;
};

export type GiftCategoriesPagination = {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
};

export type GetGiftCategoriesResponse = {
  categories: GiftCategory[];
  pagination: GiftCategoriesPagination;
};

export type GiftCategoryStats = {
  totalCategories?: number;
  activeCategories?: number;
  inactiveCategories?: number;
  visibleCategories?: number;
  hiddenCategories?: number;
  totalGifts?: number;
};

export type CreateGiftCategoryPayload = {
  name: string;
  description?: string;
  iconUrl?: string;
  icon?: string;
  displayPattern?: string;
  isActive?: boolean;
  isVisible?: boolean;
  visibleOnStorefront?: boolean;
  sortOrder?: number;
};

export type UpdateGiftCategoryPayload = Partial<CreateGiftCategoryPayload> & {
  status?: GiftCategoryStatus;
};

export type ApiPaginationMeta = {
  total?: number;
  page?: number;
  limit?: number;
  totalPages?: number;
};

export type ApiListResponse<T> = {
  data?: T[];
  meta?: ApiPaginationMeta;
};

export type ApiDataResponse<T> = {
  data?: T;
};
