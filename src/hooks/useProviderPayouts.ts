"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/errors";
import {
  exportProviderPayouts,
  getProviderEarningDistribution,
  getProviderPayoutBreakdown,
  getProviderPayouts,
  getProviderPayoutStats,
  getProviderPayoutTrends,
  updateProviderPayoutStatus,
} from "@/services/provider-payouts";
import type {
  ProviderPayoutsParams,
  ProviderPayoutTrendsParams,
} from "@/types/provider-payouts";

const providerPayoutsQueryKey = ["provider-payouts"] as const;
<<<<<<< HEAD

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
=======
>>>>>>> 97698ead150ab7f6c82643dd59b664e96388325a

export const useProviderPayoutStats = () => {
  return useQuery({
    queryKey: [...providerPayoutsQueryKey, "stats"],
    queryFn: getProviderPayoutStats,
  });
};

export const useProviderPayoutTrends = (params: ProviderPayoutTrendsParams = {}) => {
  return useQuery({
    queryKey: [...providerPayoutsQueryKey, "trends", params],
    queryFn: () => getProviderPayoutTrends(params),
  });
};

export const useProviderEarningDistribution = () => {
  return useQuery({
    queryKey: [...providerPayoutsQueryKey, "earning-distribution"],
    queryFn: getProviderEarningDistribution,
  });
};

export const useProviderPayouts = (params: ProviderPayoutsParams = {}) => {
  return useQuery({
    queryKey: [...providerPayoutsQueryKey, "list", params],
    queryFn: () => getProviderPayouts(params),
  });
};

export const useProviderPayoutBreakdown = (id?: string) => {
  return useQuery({
    queryKey: [...providerPayoutsQueryKey, "breakdown", id],
    queryFn: () => getProviderPayoutBreakdown(id as string),
    enabled: !!id,
  });
};

export const useUpdateProviderPayoutStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProviderPayoutStatus,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: providerPayoutsQueryKey });
      toast.success(`Payout ${variables.action}d successfully`);
    },
    onError: (error, variables) => {
      toast.error(getErrorMessage(error, `Failed to ${variables.action} payout. Please try again.`));
    },
  });
};

export const useExportProviderPayouts = () => {
  return useMutation({
    mutationFn: exportProviderPayouts,
    onSuccess: (data) => {
      const url = window.URL.createObjectURL(data);
      const link = document.createElement("a");

      link.href = url;
      link.setAttribute("download", `provider-payouts-export-${new Date().toISOString().split("T")[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);

      toast.success("Provider payouts exported successfully");
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, "Failed to export provider payouts. Please try again."));
    },
  });
};
