import { api } from "@/lib/axios";
import type {
  CreateProviderBusinessCategoryPayload,
  GetProviderBusinessCategoriesParams,
  ProviderBusinessCategory,
  UpdateProviderBusinessCategoryPayload,
} from "@/types/provider-business-categories";

const PROVIDER_BUSINESS_CATEGORIES_ENDPOINT = "/provider-business-categories";

export const getProviderBusinessCategories = async (
  params: GetProviderBusinessCategoriesParams = {},
) => {
  const { data } = await api.get(PROVIDER_BUSINESS_CATEGORIES_ENDPOINT, { params });
  const categories = data.data?.items ?? data.data?.data ?? data.data?.results ?? data.data ?? [];

  return categories as ProviderBusinessCategory[];
};

export const createProviderBusinessCategory = async (
  payload: CreateProviderBusinessCategoryPayload,
) => {
  const { data } = await api.post(PROVIDER_BUSINESS_CATEGORIES_ENDPOINT, payload);
  return data.data as ProviderBusinessCategory;
};

export const updateProviderBusinessCategory = async ({
  id,
  payload,
}: {
  id: string;
  payload: UpdateProviderBusinessCategoryPayload;
}) => {
  const { data } = await api.patch(`${PROVIDER_BUSINESS_CATEGORIES_ENDPOINT}/${id}`, payload);
  return data.data as ProviderBusinessCategory;
};

export const deleteProviderBusinessCategory = async (id: string) => {
  const { data } = await api.delete(`${PROVIDER_BUSINESS_CATEGORIES_ENDPOINT}/${id}`);
  return data.data as ProviderBusinessCategory;
};
