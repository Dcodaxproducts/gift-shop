export type GiftStatus = "ACTIVE" | "PENDING" | "INACTIVE" | "REJECTED" | "DELETED";

export type GiftSortBy =
  | "createdAt"
  | "updatedAt"
  | "name"
  | "price"
  | "rating";

export type SortOrder = "ASC" | "DESC";

export type GetGiftsParams = {
  page?: number;
  limit?: number;
  search?: string;
  categoryId?: string;
  providerId?: string;
  status?: GiftStatus;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: GiftSortBy;
  sortOrder?: SortOrder;
};

export type GiftVariant = {
  id?: string;
  name: string;
  price?: number;
  sku?: string;
  stock?: number;
  isActive?: boolean;
  metadata?: Record<string, unknown>;
};

export type GiftCategorySummary = {
  id?: string;
  name?: string;
};

export type GiftProviderSummary = {
  id?: string;
  name?: string;
  businessName?: string;
};

export type Gift = {
  id: string;
  name: string;
  description?: string | null;
  categoryId?: string | null;
  categoryName?: string | null;
  category?: GiftCategorySummary | null;
  providerId?: string | null;
  providerName?: string | null;
  provider?: GiftProviderSummary | null;
  price?: number | string;
  rating?: number | string;
  imageUrl?: string | null;
  images?: string[];
  status: GiftStatus;
  isActive?: boolean;
  variants?: GiftVariant[];
  createdAt?: string;
  updatedAt?: string;
};


export type CreateGiftPayload = {
  name: string;
  description?: string;
  categoryId?: string;
  providerId?: string;
  price?: number;
  imageUrl?: string;
  images?: string[];
  status?: GiftStatus;
  isActive?: boolean;
  variants?: GiftVariant[];
};

export type UpdateGiftPayload = Partial<CreateGiftPayload>;

export type UpdateGiftStatusPayload = {
  status: Exclude<GiftStatus, "DELETED">;
  reason?: string;
};
