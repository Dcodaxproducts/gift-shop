"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/errors";
import {
  exportAuditLogs,
  getAuditLog,
  getAuditLogs,
  getAuditLogStats,
} from "@/services/audit-logs";
import type { GetAuditLogsParams } from "@/services/audit-logs";

export const useAuditLogStats = () => {
  return useQuery({
    queryKey: ["audit-logs", "stats"],
    queryFn: getAuditLogStats,
  });
};

export const useExportAuditLogs = () => {
  return useMutation({
    mutationFn: exportAuditLogs,
    onSuccess: (data) => {
      const url = window.URL.createObjectURL(data);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `audit-logs-export-${new Date().toISOString().split("T")[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);

      toast.success("Audit logs exported successfully");
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, "Failed to export audit logs. Please try again."));
    },
  });
};

export const useAuditLogs = (params: GetAuditLogsParams = {}) => {
  return useQuery({
    queryKey: ["audit-logs", params],
    queryFn: () => getAuditLogs(params),
  });
};

export const useAuditLog = (id: string) => {
  return useQuery({
    queryKey: ["audit-logs", id],
    queryFn: () => getAuditLog(id),
    enabled: !!id,
  });
};
