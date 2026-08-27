"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/errors";
import {
  getPlatformAnalyticsReport,
  getPlatformAnalyticsStats,
  getRevenueTransactions,
} from "@/services/platform-analytics";
import type {
  GetPlatformAnalyticsReportParams,
  GetRevenueTransactionsParams,
} from "@/types/platform-analytics";

export const usePlatformAnalyticsStats = () => {
  return useQuery({
    queryKey: ["platform-analytics", "stats"],
    queryFn: getPlatformAnalyticsStats,
  });
};

export const useRevenueTransactions = (params: GetRevenueTransactionsParams = {}) => {
  return useQuery({
    queryKey: ["platform-analytics", "revenue-transactions", params],
    queryFn: () => getRevenueTransactions(params),
  });
};

export const useExportPlatformAnalyticsReport = () => {
  return useMutation({
    mutationFn: (params: GetPlatformAnalyticsReportParams = {}) => getPlatformAnalyticsReport(params),
    onSuccess: (data) => {
      const url = window.URL.createObjectURL(data);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `platform-analytics-report-${new Date().toISOString().split("T")[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);

      toast.success("Platform analytics report generated successfully");
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, "Failed to generate platform analytics report. Please try again."));
    },
  });
};
