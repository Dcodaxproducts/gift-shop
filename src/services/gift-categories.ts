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
  const { data } = await api.get(GIFT_CATEGORIES_ENDPOINT, { params });
  const body = data as ApiListResponse<GiftCategory>;

  return {
    categories: body.data ?? [],
    pagination: createPagination(body.meta),
  };
};

export const getGiftCategoryLookup = async (): Promise<GiftCategoryLookupItem[]> => {
  const { data } = await api.get(`${GIFT_CATEGORIES_ENDPOINT}/lookup`);
  const body = data as ApiDataResponse<GiftCategoryLookupItem[]> | GiftCategoryLookupItem[];

  return Array.isArray(body) ? body : body.data ?? [];
};

export const getGiftCategoryStats = async (): Promise<GiftCategoryStats> => {
  const { data } = await api.get(`${GIFT_CATEGORIES_ENDPOINT}/stats`);
  const body = data as ApiDataResponse<GiftCategoryStats>;

  return body.data ?? {};
};

export const getGiftCategory = async (id: string): Promise<GiftCategory> => {
  const { data } = await api.get(`${GIFT_CATEGORIES_ENDPOINT}/${id}`);
  const body = data as ApiDataResponse<GiftCategory>;

  return body.data as GiftCategory;
};

export const createGiftCategory = async (payload: CreateGiftCategoryPayload): Promise<GiftCategory> => {
  const { data } = await api.post(GIFT_CATEGORIES_ENDPOINT, payload);
  const body = data as ApiDataResponse<GiftCategory>;

  return body.data as GiftCategory;
};

export const updateGiftCategory = async ({
  id,
  payload,
}: {
  id: string;
  payload: UpdateGiftCategoryPayload;
}): Promise<GiftCategory> => {
  const { data } = await api.patch(`${GIFT_CATEGORIES_ENDPOINT}/${id}`, payload);
  const body = data as ApiDataResponse<GiftCategory>;

  return body.data as GiftCategory;
};

export const deleteGiftCategory = async (id: string): Promise<GiftCategory> => {
  const { data } = await api.delete(`${GIFT_CATEGORIES_ENDPOINT}/${id}`);
  const body = data as ApiDataResponse<GiftCategory>;

  return body.data as GiftCategory;
};
