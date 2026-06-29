import { api } from "@/lib/axios";

const AUDIT_LOGS_ENDPOINT = "/audit-logs";

export type AuditLogStatus = "SUCCESS" | "FAILED" | "PENDING" | "WARNING";

export type AuditLogSeverity = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";

export type AuditLogActorSnapshot = {
  id: string;
  name?: string | null;
  role?: string | null;
  email?: string | null;
  adminTitle?: string | null;
};

export type AuditLogJsonValue =
  | string
  | number
  | boolean
  | null
  | AuditLogJsonValue[]
  | { [key: string]: AuditLogJsonValue };

export type AuditLog = {
  id: string;
  logReference: string;
  actorId: string | null;
  actorType: string;
  actorSnapshot: AuditLogActorSnapshot | null;
  targetId: string | null;
  targetType: string | null;
  action: string;
  actionLabel: string;
  module: string;
  status: AuditLogStatus;
  severity: AuditLogSeverity;
  beforeJson: AuditLogJsonValue | null;
  afterJson: AuditLogJsonValue | null;
  ipAddress: string | null;
  createdAt: string;
};

export type AuditLogStats = {
  criticalAlerts24h: number;
  totalLogs: number;
  successCount: number;
  failedCount: number;
};

export type GetAuditLogsParams = {
  page?: number;
  limit?: number;
  search?: string;
  action?: string;
  actorType?: string;
  targetType?: string;
  status?: AuditLogStatus;
  severity?: AuditLogSeverity;
  module?: string;
  from?: string;
  to?: string;
};

type AuditLogsResponse = {
  data: AuditLog[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};

export const getAuditLogStats = async () => {
  const { data } = await api.get(`${AUDIT_LOGS_ENDPOINT}/stats`);
  return data.data as AuditLogStats;
};

export const exportAuditLogs = async () => {
  const { data } = await api.get(`${AUDIT_LOGS_ENDPOINT}/export`, { responseType: "blob" });
  return data;
};

export const getAuditLogs = async (params: GetAuditLogsParams = {}) => {
  const { data } = await api.get(AUDIT_LOGS_ENDPOINT, { params });

  return {
    data: (data.data ?? []) as AuditLog[],
    meta: (data.meta ?? {
      page: params.page ?? 1,
      limit: params.limit ?? 10,
      total: data.data?.length ?? 0,
      totalPages: 1,
    }) as AuditLogsResponse["meta"],
  };
};

export const getAuditLog = async (id: string) => {
  const { data } = await api.get(`${AUDIT_LOGS_ENDPOINT}/${id}`);
  return data.data as AuditLog;
};
