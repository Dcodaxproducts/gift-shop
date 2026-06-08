"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/errors";
import {
  exportTransactions,
  getTransaction,
  getTransactions,
  getTransactionStats,
} from "@/services/transactions";
import type { GetTransactionsParams } from "@/types/transactions";

export const useTransactionStats = () => {
  return useQuery({
    queryKey: ["transactions", "stats"],
    queryFn: getTransactionStats,
  });
};

export const useTransactions = (params: GetTransactionsParams = {}) => {
  return useQuery({
    queryKey: ["transactions", params],
    queryFn: () => getTransactions(params),
  });
};

export const useTransaction = (id: string) => {
  return useQuery({
    queryKey: ["transactions", id],
    queryFn: () => getTransaction(id),
    enabled: !!id,
  });
};

export const useExportTransactions = () => {
  return useMutation({
    mutationFn: exportTransactions,
    onSuccess: (data) => {
      const url = window.URL.createObjectURL(data);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `transactions-export-${new Date().toISOString().split("T")[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);

      toast.success("Transactions exported successfully");
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, "Failed to export transactions. Please try again."));
    },
  });
};
