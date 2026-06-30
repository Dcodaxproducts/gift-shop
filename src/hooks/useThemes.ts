"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/errors";
import {
  createSeasonalTheme,
  deleteSeasonalTheme,
  getSeasonalTheme,
  getSeasonalThemes,
  updateSeasonalTheme,
} from "@/services/themes";
import type { GetSeasonalThemesParams } from "@/types/themes";

const seasonalThemesQueryKey = ["seasonal-themes"] as const;

export const useSeasonalThemes = (
  params: GetSeasonalThemesParams = {},
) => {
  return useQuery({
    queryKey: [...seasonalThemesQueryKey, params],
    queryFn: () => getSeasonalThemes(params),
  });
};

export const useSeasonalTheme = (id: string) => {
  return useQuery({
    queryKey: [...seasonalThemesQueryKey, id],
    queryFn: () => getSeasonalTheme(id),
    enabled: !!id,
  });
};

export const useCreateSeasonalTheme = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createSeasonalTheme,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: seasonalThemesQueryKey });
      toast.success("Seasonal theme created successfully");
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, "Failed to create seasonal theme. Please try again."));
    },
  });
};

export const useUpdateSeasonalTheme = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateSeasonalTheme,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: seasonalThemesQueryKey });
      queryClient.setQueryData([...seasonalThemesQueryKey, variables.id], data);
      toast.success("Seasonal theme updated successfully");
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, "Failed to update seasonal theme. Please try again."));
    },
  });
};

export const useDeleteSeasonalTheme = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteSeasonalTheme,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: seasonalThemesQueryKey });
      toast.success("Seasonal theme deleted successfully");
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, "Failed to delete seasonal theme. Please try again."));
    },
  });
};
