"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/errors";
import {
  createGift,
  deleteGift,
  getGift,
  getGifts,
  updateGift,
  updateGiftStatus,
} from "@/services/gift";
import type {
  CreateGiftPayload,
  GetGiftsParams,
  UpdateGiftPayload,
  UpdateGiftStatusPayload,
} from "@/types/gifts";

const giftsQueryKey = ["gifts"] as const;

export const useGifts = (params: GetGiftsParams = {}) => {
  return useQuery({
    queryKey: [...giftsQueryKey, params],
    queryFn: () => getGifts(params),
  });
};

export const useGift = (id: string) => {
  return useQuery({
    queryKey: [...giftsQueryKey, id],
    queryFn: () => getGift(id),
    enabled: !!id,
  });
};

export const useCreateGift = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateGiftPayload) => createGift(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: giftsQueryKey });
      toast.success("Gift created successfully");
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, "Failed to create gift. Please try again."));
    },
  });
};

export const useUpdateGift = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateGiftPayload }) => updateGift({ id, payload }),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: giftsQueryKey });
      queryClient.setQueryData([...giftsQueryKey, variables.id], data);
      toast.success("Gift updated successfully");
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, "Failed to update gift. Please try again."));
    },
  });
};

export const useUpdateGiftStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateGiftStatusPayload }) =>
      updateGiftStatus({ id, payload }),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: giftsQueryKey });
      queryClient.setQueryData([...giftsQueryKey, variables.id], data);
      toast.success("Gift status updated successfully");
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, "Failed to update gift status. Please try again."));
    },
  });
};

export const useDeleteGift = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteGift(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: giftsQueryKey });
      toast.success("Gift deleted successfully");
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, "Failed to delete gift. Please try again."));
    },
  });
};
