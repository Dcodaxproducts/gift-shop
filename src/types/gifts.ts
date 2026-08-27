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
  originalPrice?: number;
  sku?: string;
  stock?: number;
  stockQuantity?: number;
  isPopular?: boolean;
  isDefault?: boolean;
  sortOrder?: number;
  isActive?: boolean;
  metadata?: Record<string, unknown>;
};

export type GiftCategorySummary = {
  id?: string;
  name?: string;
  isActive?: boolean;
  deletedAt?: string | null;
};

export type GiftProviderSummary = {
  id?: string;
  name?: string;
  businessName?: string;
};

export type Gift = {
  id: string;
  name: string;
  shortDescription?: string | null;
  description?: string | null;
  categoryId?: string | null;
  categoryName?: string | null;
  category?: GiftCategorySummary | null;
  providerId?: string | null;
  providerName?: string | null;
  provider?: GiftProviderSummary | null;
  price?: number;
  currency?: string;
  rating?: number | string;
  reviewCount?: number;
  moderationStatus?: string;

  imageUrl?: string | null;
  imageUrls?: string[];
  imagesUrl?: string | null;
  images?: string[];
  status: GiftStatus;
  isActive?: boolean;
  isFeatured?: boolean;
  tags?: string[];
  variants?: GiftVariant[];
  createdAt?: string;
  updatedAt?: string;
};


export type CreateGiftPayload = {
  name: string;
  description: string;
  categoryId: string;
  price: number;
  providerId: string;
  imageUrls: string[];
  status?: "ACTIVE" | "INACTIVE";
  variants?: {
    name: string;
    price: number;
  }[];
};

export type UpdateGiftPayload = Partial<CreateGiftPayload>;

export type UpdateGiftStatusPayload = {
  status: Exclude<GiftStatus, "DELETED">;
  reason?: string;
};
