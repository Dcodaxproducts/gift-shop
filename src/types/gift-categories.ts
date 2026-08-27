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
  lookup?: boolean;
};

export type GiftCategory = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  iconKey: string | null;
  color: string;
  backgroundColor: string;
  imageUrl: string | null;
  totalGifts: number;
  isActive: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
};

export type CreateGiftCategoryPayload = {
  name: string;
  description?: string;
  imageUrl?: string;
  isActive?: boolean;
};

export type UpdateGiftCategoryPayload = Partial<CreateGiftCategoryPayload> & {
  status?: GiftCategoryStatus;
};
