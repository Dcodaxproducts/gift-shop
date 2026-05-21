import { api } from "@/lib/axios";
import type {
  ApiDataResponse,
  ApiListResponse,
  CreateGiftCategoryPayload,
  GetGiftCategoriesParams,
  GiftCategory,
  GiftCategoryLookupItem,
  GiftCategoryStats,
  UpdateGiftCategoryPayload,
} from "@/types/gift-categories";

const GIFT_CATEGORIES_ENDPOINT = "/gift-categories";

export const getGiftCategories = async (
  params: GetGiftCategoriesParams = {},
 ) => {
  const { data } = await api.get(GIFT_CATEGORIES_ENDPOINT, { params });
  return data as ApiListResponse<GiftCategory>;
};

export const getGiftCategoryLookup = async () => {
  const { data } = await api.get(`${GIFT_CATEGORIES_ENDPOINT}/lookup`);
  const body = data as ApiDataResponse<GiftCategoryLookupItem[]> | GiftCategoryLookupItem[];

  return Array.isArray(body) ? body : body.data ?? [];
};

export const getGiftCategoryStats = async () => {
  const { data } = await api.get(`${GIFT_CATEGORIES_ENDPOINT}/stats`);
  const body = data as ApiDataResponse<GiftCategoryStats>;

  return body.data ?? {};
};

export const getGiftCategory = async (id: string) => {
  const { data } = await api.get(`${GIFT_CATEGORIES_ENDPOINT}/${id}`);
  const body = data as ApiDataResponse<GiftCategory>;

  return body.data as GiftCategory;
};

export const createGiftCategory = async (payload: CreateGiftCategoryPayload) => {
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
}) => {
  const { data } = await api.patch(`${GIFT_CATEGORIES_ENDPOINT}/${id}`, payload);
  const body = data as ApiDataResponse<GiftCategory>;

  return body.data as GiftCategory;
};

export const deleteGiftCategory = async (id: string) => {
  const { data } = await api.delete(`${GIFT_CATEGORIES_ENDPOINT}/${id}`);
  const body = data as ApiDataResponse<GiftCategory>;

  return body.data as GiftCategory;
};
