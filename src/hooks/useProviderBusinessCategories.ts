"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/errors";
import {
  createProviderBusinessCategory,
  deleteProviderBusinessCategory,
  getProviderBusinessCategories,
  getProviderBusinessCategory,
  updateProviderBusinessCategory,
} from "@/services/provider-business-categories";
import type { GetProviderBusinessCategoriesParams } from "@/types/provider-business-categories";

const providerBusinessCategoriesQueryKey = ["provider-business-categories"] as const;

export const useProviderBusinessCategories = (
  params: GetProviderBusinessCategoriesParams = {},
) => {
  return useQuery({
    queryKey: [...providerBusinessCategoriesQueryKey, params],
    queryFn: () => getProviderBusinessCategories(params),
  });
};

export const useProviderBusinessCategory = (id: string) => {
  return useQuery({
    queryKey: [...providerBusinessCategoriesQueryKey, id],
    queryFn: () => getProviderBusinessCategory(id),
    enabled: !!id,
  });
};

export const useCreateProviderBusinessCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createProviderBusinessCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: providerBusinessCategoriesQueryKey });
      toast.success("Provider business category created successfully");
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, "Failed to create provider business category. Please try again."));
    },
  });
};

export const useUpdateProviderBusinessCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProviderBusinessCategory,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: providerBusinessCategoriesQueryKey });
      queryClient.setQueryData([...providerBusinessCategoriesQueryKey, variables.id], data);
      toast.success("Provider business category updated successfully");
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, "Failed to update provider business category. Please try again."));
    },
  });
};

export const useDeleteProviderBusinessCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteProviderBusinessCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: providerBusinessCategoriesQueryKey });
      toast.success("Provider business category deleted successfully");
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, "Failed to delete provider business category. Please try again."));
    },
  });
};
