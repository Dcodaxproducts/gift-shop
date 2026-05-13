"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/errors";
import {
  createGiftCategory,
  deleteGiftCategory,
  getGiftCategories,
  getGiftCategory,
  getGiftCategoryLookup,
  getGiftCategoryStats,
  updateGiftCategory,
} from "@/services/gift-categories";
import type {
  CreateGiftCategoryPayload,
  GetGiftCategoriesParams,
  GetGiftCategoriesResponse,
  GiftCategory,
  GiftCategoryLookupItem,
  GiftCategoryStats,
  UpdateGiftCategoryPayload,
} from "@/types/gift-categories";

const giftCategoriesQueryKey = ["gift-categories"] as const;

export const useGiftCategories = (params: GetGiftCategoriesParams = {}) => {
  return useQuery<GetGiftCategoriesResponse>({
    queryKey: [...giftCategoriesQueryKey, params],
    queryFn: () => getGiftCategories(params),
  });
};

export const useGiftCategory = (id: string) => {
  return useQuery<GiftCategory>({
    queryKey: [...giftCategoriesQueryKey, id],
    queryFn: () => getGiftCategory(id),
    enabled: !!id,
  });
};

export const useGiftCategoryLookup = () => {
  return useQuery<GiftCategoryLookupItem[]>({
    queryKey: [...giftCategoriesQueryKey, "lookup"],
    queryFn: getGiftCategoryLookup,
  });
};

export const useGiftCategoryStats = () => {
  return useQuery<GiftCategoryStats>({
    queryKey: [...giftCategoriesQueryKey, "stats"],
    queryFn: getGiftCategoryStats,
  });
};

export const useCreateGiftCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateGiftCategoryPayload) => createGiftCategory(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: giftCategoriesQueryKey });
      toast.success("Gift category created successfully");
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, "Failed to create gift category. Please try again."));
    },
  });
};

export const useUpdateGiftCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateGiftCategoryPayload }) =>
      updateGiftCategory({ id, payload }),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: giftCategoriesQueryKey });
      queryClient.setQueryData([...giftCategoriesQueryKey, variables.id], data);
      toast.success("Gift category updated successfully");
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, "Failed to update gift category. Please try again."));
    },
  });
};

export const useDeleteGiftCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteGiftCategory(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: giftCategoriesQueryKey });
      toast.success("Gift category deleted successfully");
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, "Failed to delete gift category. Please try again."));
    },
  });
};
