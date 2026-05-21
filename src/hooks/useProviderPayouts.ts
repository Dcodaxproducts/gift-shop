"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/errors";
import {
  approveProviderPayout,
  exportProviderPayouts,
  getProviderEarningDistribution,
  getProviderPayoutBreakdown,
  getProviderPayouts,
  getProviderPayoutStats,
  getProviderPayoutTrends,
  holdProviderPayout,
  rejectProviderPayout,
} from "@/services/provider-payouts";
import type {
  HoldProviderPayoutPayload,
  ProviderEarningDistributionItem,
  ProviderPayoutActionPayload,
  ProviderPayoutActionResponse,
  ProviderPayoutBreakdown,
  ProviderPayoutsParams,
  ProviderPayoutsResponse,
  ProviderPayoutStats,
  ProviderPayoutTrends,
  ProviderPayoutTrendsParams,
  RejectProviderPayoutPayload,
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

export const useProviderPayouts = (params: ProviderPayoutsParams = {}) => {
  return useQuery<ProviderPayoutsResponse>({
    queryKey: [...providerPayoutsQueryKey, "list", params],
    queryFn: () => getProviderPayouts(params),
  });
};

export const useProviderPayoutBreakdown = (id?: string) => {
  return useQuery<ProviderPayoutBreakdown>({
    queryKey: [...providerPayoutsQueryKey, "breakdown", id],
    queryFn: () => getProviderPayoutBreakdown(id as string),
    enabled: !!id,
  });
};

export const useApproveProviderPayout = () => {
  const queryClient = useQueryClient();

  return useMutation<ProviderPayoutActionResponse, Error, { id: string; payload: ProviderPayoutActionPayload }>({
    mutationFn: approveProviderPayout,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: providerPayoutsQueryKey });
      toast.success("Payout approved successfully");
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, "Failed to approve payout. Please try again."));
    },
  });
};

export const useHoldProviderPayout = () => {
  const queryClient = useQueryClient();

  return useMutation<ProviderPayoutActionResponse, Error, { id: string; payload: HoldProviderPayoutPayload }>({
    mutationFn: holdProviderPayout,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: providerPayoutsQueryKey });
      toast.success("Payout held successfully");
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, "Failed to hold payout. Please try again."));
    },
  });
};

export const useRejectProviderPayout = () => {
  const queryClient = useQueryClient();

  return useMutation<ProviderPayoutActionResponse, Error, { id: string; payload: RejectProviderPayoutPayload }>({
    mutationFn: rejectProviderPayout,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: providerPayoutsQueryKey });
      toast.success("Payout rejected successfully");
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, "Failed to reject payout. Please try again."));
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
