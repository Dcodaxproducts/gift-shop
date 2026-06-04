import { api } from "@/lib/axios";
import type {
  CreateGiftCategoryPayload,
  GetGiftCategoriesParams,
  GiftCategory,
  UpdateGiftCategoryPayload,
} from "@/types/gift-categories";

const GIFT_CATEGORIES_ENDPOINT = "/gift-categories";

export const getGiftCategories = async (
  params: GetGiftCategoriesParams = {},
 ) => {
  const { data } = await api.get(GIFT_CATEGORIES_ENDPOINT, { params });
  return (data.data ?? []) as GiftCategory[];
};


export const createGiftCategory = async (payload: CreateGiftCategoryPayload) => {
  const { data } = await api.post(GIFT_CATEGORIES_ENDPOINT, payload);
  return data.data as GiftCategory;
};

export const updateGiftCategory = async ({
  id,
  payload,
}: {
  id: string;
  payload: UpdateGiftCategoryPayload;
}) => {
  const { data } = await api.patch(`${GIFT_CATEGORIES_ENDPOINT}/${id}`, payload);
  return data.data as GiftCategory;
};

export const deleteGiftCategory = async (id: string) => {
  const { data } = await api.delete(`${GIFT_CATEGORIES_ENDPOINT}/${id}`);
  return data.data as GiftCategory;
};
