"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/errors";
import {
  getProviders,
  getProviderStats,
  createProvider,
  exportProviders,
  getProvider,
  updateProvider,
  updateProviderStatus,
  sendProviderMessage,
  getProviderItems,
} from "@/services/providers";
import type {
  CreateProviderPayload,
  GetProvidersParams,
  ProviderMessagePayload,
} from "@/types/providers";

export const useProviders = (params: GetProvidersParams = {}) => {
  return useQuery({
    queryKey: ["providers", params],
    queryFn: () => getProviders(params),
  });
};

export const useProvider = (id: string) => {
  return useQuery({
    queryKey: ["providers", id],
    queryFn: () => getProvider(id),
  });
};

export const useProviderStats = () => {
  return useQuery({
    queryKey: ["providers", "stats"],
    queryFn: () => getProviderStats(),
  });
};

export const useCreateProvider = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateProviderPayload) => createProvider(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["providers"] });
      toast.success("Provider created successfully");
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, "Failed to create provider. Please try again."));
    },
  });
};

export const useExportProviders = () => {
  return useMutation({
    mutationFn: exportProviders,
    onSuccess: (data) => {
      const url = window.URL.createObjectURL(data);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `providers-export-${new Date().toISOString().split("T")[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);

      toast.success("Providers exported successfully");
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, "Failed to export providers. Please try again."));
    },
  });
};


export const useUpdateProvider = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: Partial<CreateProviderPayload> }) =>
      updateProvider(id, payload),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ["providers"] });
      queryClient.invalidateQueries({ queryKey: ["providers", id] });
      toast.success("Provider updated successfully");
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, "Failed to update provider. Please try again."));
    },
  });
};

export const useUpdateProviderStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, action, reason }: { id: string; action: string; reason?: string }) =>
      updateProviderStatus(id, action, reason), 
    
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ["providers"] });
      queryClient.invalidateQueries({ queryKey: ["providers", id] });
      toast.success("Provider status updated successfully");
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, "Failed to update provider status."));
    },
  });
};

export const useSendProviderMessage = () => {
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: ProviderMessagePayload }) =>
      sendProviderMessage(id, payload),
    onSuccess: () => {
      toast.success("Message sent successfully");
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, "Failed to send message. Please try again."));
    },
  });
};

export const useProviderItems = (
  id: string,
  params: { page?: number; limit?: number; search?: string } = {}
) => {
  return useQuery({
    queryKey: ["providers", id, "items", params],
    queryFn: () => getProviderItems(id, params),
    enabled: !!id,
  });
};
