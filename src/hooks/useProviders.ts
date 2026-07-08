"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/errors";
import {
  getProviders,
  getProviderStats,
  createProvider,
  exportProviders,
  getProvider,
  updateProvider,
  deleteProvider,
  updateProviderStatus,
  sendProviderMessage,
  getProviderItems,
  getProviderDocuments,
  submitProviderDocument,
  reviewProviderDocument,
} from "@/services/providers";
import type {
  GetProvidersParams,
  ProviderItemsParams,
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
    enabled: !!id,
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
    mutationFn: createProvider,
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
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProvider,
    onSuccess: async (_, { id }) => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["providers"] }),
        queryClient.invalidateQueries({ queryKey: ["providers", id] }),
      ]);
      toast.success("Provider updated successfully");
      router.push("/providers");
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, "Failed to update provider. Please try again."));
    },
  });
};

export const useDeleteProvider = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteProvider,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["providers"] });
      toast.success("Provider deleted successfully");
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, "Failed to delete provider. Please try again."));
    },
  });
};

export const useUpdateProviderStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProviderStatus,
    
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
    mutationFn: sendProviderMessage,
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
  params: ProviderItemsParams = {}
) => {
  return useQuery({
    queryKey: ["providers", id, "items", params],
    queryFn: () => getProviderItems(id, params),
    enabled: !!id,
  });
};

export const useProviderDocuments = (id: string) => {
  return useQuery({
    queryKey: ["providers", id, "documents"],
    queryFn: () => getProviderDocuments(id),
    enabled: !!id,
  });
};

export const useSubmitProviderDocument = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: submitProviderDocument,
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ["providers", id, "documents"] });
      toast.success("Document submitted successfully");
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, "Failed to submit document. Please try again."));
    },
  });
};

export const useReviewProviderDocument = (providerId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: reviewProviderDocument,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["providers", providerId, "documents"] });
      toast.success("Document review updated successfully");
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, "Failed to update document review."));
    },
  });
};
