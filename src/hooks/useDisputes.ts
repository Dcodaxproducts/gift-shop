"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/errors";
import {
  exportDisputes,
  getDispute,
  getDisputes,
  getDisputeStats,
} from "@/services/disputes";
import type { GetDisputesParams } from "@/types/disputes";

export const useDisputeStats = () => {
  return useQuery({
    queryKey: ["disputes", "stats"],
    queryFn: getDisputeStats,
  });
};

export const useDisputes = (params: GetDisputesParams = {}) => {
  return useQuery({
    queryKey: ["disputes", params],
    queryFn: () => getDisputes(params),
  });
};

export const useDispute = (id: string) => {
  return useQuery({
    queryKey: ["disputes", id],
    queryFn: () => getDispute(id),
    enabled: !!id,
  });
};

export const useExportDisputes = () => {
  return useMutation({
    mutationFn: exportDisputes,
    onSuccess: (data) => {
      const url = window.URL.createObjectURL(data);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `disputes-export-${new Date().toISOString().split("T")[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);

      toast.success("Disputes exported successfully");
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, "Failed to export disputes. Please try again."));
    },
  });
};
