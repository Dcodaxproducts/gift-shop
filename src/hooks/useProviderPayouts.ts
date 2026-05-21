"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/errors";
import {
  exportProviderPayouts,
  getProviderEarningDistribution,
  getProviderPayoutStats,
  getProviderPayoutTrends,
} from "@/services/provider-payouts";
import type {
  ProviderEarningDistributionItem,
  ProviderPayoutStats,
  ProviderPayoutTrends,
  ProviderPayoutTrendsParams,
} from "@/types/provider-payouts";

const providerPayoutsQueryKey = ["provider-payouts"] as const;

export const useProviderPayoutStats = () => {
  return useQuery<ProviderPayoutStats>({
    queryKey: [...providerPayoutsQueryKey, "stats"],
    queryFn: getProviderPayoutStats,
  });
};

export const useProviderPayoutTrends = (params: ProviderPayoutTrendsParams = {}) => {
  return useQuery<ProviderPayoutTrends>({
    queryKey: [...providerPayoutsQueryKey, "trends", params],
    queryFn: () => getProviderPayoutTrends(params),
  });
};

export const useProviderEarningDistribution = () => {
  return useQuery<ProviderEarningDistributionItem[]>({
    queryKey: [...providerPayoutsQueryKey, "earning-distribution"],
    queryFn: getProviderEarningDistribution,
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
