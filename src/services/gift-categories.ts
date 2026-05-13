import { api } from "@/lib/axios";
import type {
  ApiDataResponse,
  ApiListResponse,
  CreateGiftCategoryPayload,
  GetGiftCategoriesParams,
  GetGiftCategoriesResponse,
  GiftCategory,
  GiftCategoryLookupItem,
  GiftCategoryStats,
  UpdateGiftCategoryPayload,
} from "@/types/gift-categories";

const GIFT_CATEGORIES_ENDPOINT = "/gift-categories";

const createPagination = (meta?: ApiListResponse<GiftCategory>["meta"]) => {
  const page = meta?.page ?? 1;
  const limit = meta?.limit ?? 10;
  const total = meta?.total ?? 0;
  const totalPages = meta?.totalPages ?? 0;

  return {
    total,
    page,
    limit,
    totalPages,
    hasNext: page < totalPages,
    hasPrevious: page > 1,
  };
};

export const getGiftCategories = async (
  params: GetGiftCategoriesParams = {},
): Promise<GetGiftCategoriesResponse> => {
  const { data } = await api.get<ApiListResponse<GiftCategory>>(GIFT_CATEGORIES_ENDPOINT, { params });

  return {
    categories: data.data ?? [],
    pagination: createPagination(data.meta),
  };
};

export const getGiftCategoryLookup = async (): Promise<GiftCategoryLookupItem[]> => {
  const { data } = await api.get<ApiDataResponse<GiftCategoryLookupItem[]> | GiftCategoryLookupItem[]>(
    `${GIFT_CATEGORIES_ENDPOINT}/lookup`,
  );

  return Array.isArray(data) ? data : data.data ?? [];
};

export const getGiftCategoryStats = async (): Promise<GiftCategoryStats> => {
  const { data } = await api.get<ApiDataResponse<GiftCategoryStats>>(`${GIFT_CATEGORIES_ENDPOINT}/stats`);
  return data.data ?? {};
};

export const getGiftCategory = async (id: string): Promise<GiftCategory> => {
  const { data } = await api.get<ApiDataResponse<GiftCategory>>(`${GIFT_CATEGORIES_ENDPOINT}/${id}`);
  return data.data as GiftCategory;
};

export const createGiftCategory = async (payload: CreateGiftCategoryPayload): Promise<GiftCategory> => {
  const { data } = await api.post<ApiDataResponse<GiftCategory>>(GIFT_CATEGORIES_ENDPOINT, payload);
  return data.data as GiftCategory;
};

export const updateGiftCategory = async ({
  id,
  payload,
}: {
  id: string;
  payload: UpdateGiftCategoryPayload;
}): Promise<GiftCategory> => {
  const { data } = await api.patch<ApiDataResponse<GiftCategory>>(`${GIFT_CATEGORIES_ENDPOINT}/${id}`, payload);
  return data.data as GiftCategory;
};

export const deleteGiftCategory = async (id: string): Promise<GiftCategory> => {
  const { data } = await api.delete<ApiDataResponse<GiftCategory>>(`${GIFT_CATEGORIES_ENDPOINT}/${id}`);
  return data.data as GiftCategory;
};
