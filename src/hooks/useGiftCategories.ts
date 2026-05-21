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
  ApiPaginationMeta,
  GetGiftCategoriesParams,
} from "@/types/gift-categories";

const giftCategoriesQueryKey = ["gift-categories"] as const;
const toPagination = (meta?: ApiPaginationMeta) => {
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

export const useGiftCategories = (params: GetGiftCategoriesParams = {}) => {
  return useQuery({
    queryKey: [...giftCategoriesQueryKey, params],
    queryFn: () => getGiftCategories(params),
    select: (body) => ({
      categories: body.data ?? [],
      pagination: toPagination(body.meta),
    }),
  });
};

export const useGiftCategory = (id: string) => {
  return useQuery({
    queryKey: [...giftCategoriesQueryKey, id],
    queryFn: () => getGiftCategory(id),
    enabled: !!id,
  });
};

export const useGiftCategoryLookup = () => {
  return useQuery({
    queryKey: [...giftCategoriesQueryKey, "lookup"],
    queryFn: getGiftCategoryLookup,
  });
};

export const useGiftCategoryStats = () => {
  return useQuery({
    queryKey: [...giftCategoriesQueryKey, "stats"],
    queryFn: getGiftCategoryStats,
  });
};

export const useCreateGiftCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createGiftCategory,
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
    mutationFn: updateGiftCategory,
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
    mutationFn: deleteGiftCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: giftCategoriesQueryKey });
      toast.success("Gift category deleted successfully");
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, "Failed to delete gift category. Please try again."));
    },
  });
};
