"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/errors";
import {
  createDocument,
  deleteDocument,
  getDocuments,
  updateDocument,
} from "@/services/documents";
import type { GetDocumentsParams } from "@/services/documents";

const documentsQueryKey = ["documents"] as const;

export const useDocuments = (params: GetDocumentsParams = {}) => {
  return useQuery({
    queryKey: [...documentsQueryKey, params],
    queryFn: () => getDocuments(params),
  });
};

export const useCreateDocument = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createDocument,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: documentsQueryKey });
      toast.success("Document definition created successfully");
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, "Failed to create document definition. Please try again."));
    },
  });
};

export const useUpdateDocument = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateDocument,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: documentsQueryKey });
      toast.success("Document definition updated successfully");
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, "Failed to update document definition. Please try again."));
    },
  });
};

export const useDeleteDocument = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteDocument,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: documentsQueryKey });
      toast.success("Document definition deactivated successfully");
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, "Failed to deactivate document definition. Please try again."));
    },
  });
};
