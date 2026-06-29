"use client";

import { useState } from "react";
import { Download, Eye } from "lucide-react";
import { useRouter } from "next/navigation";
import PageHeader from "@/components/common/page-header";
import { FilterSection } from "@/components/common/filter-section";
import { AuditStatsCard } from "@/components/cards/AuditStatsCard";
import { DataTable } from "@/components/tables/data-table";
import { Button } from "@/components/ui/button";
import { TableCell, TableHead } from "@/components/ui/table";
import { useDebounce } from "@/hooks/useDebounce";
import { useAuditLogStats, useAuditLogs, useExportAuditLogs } from "@/hooks/useAuditLogs";
import type { AuditLog, AuditLogSeverity, AuditLogStatus } from "@/services/audit-logs";
import { formatDate } from "@/utils/formatDate";
import { getInitials } from "@/utils/getInitials";
import { StatusBadge } from "@/utils/status";
import { cn } from "@/lib/utils";

function formatLabel(value: string | null | undefined) {
  if (!value) return "-";

  return value
    .replace(/[_-]/g, " ")
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function SeverityBadge({ severity }: { severity: string }) {
  const toneClass =
    {
      LOW: "bg-slate-100 text-slate-500",
      MEDIUM: "bg-blue-50 text-blue-600",
      HIGH: "bg-amber-50 text-amber-600",
      CRITICAL: "bg-red-50 text-red-500",
    }[severity.toUpperCase()] ?? "bg-slate-100 text-slate-500";

  return (
    <span className={cn("inline-flex rounded-full px-3 py-1.5 text-[10px] font-semibold", toneClass)}>
      {formatLabel(severity)}
    </span>
  );
}

const auditLogStatusOptions = [
  { value: "all", label: "Status" },
  { value: "SUCCESS", label: "Success" },
  { value: "FAILED", label: "Failed" },
  { value: "PENDING", label: "Pending" },
  { value: "WARNING", label: "Warning" },
] as const;

const auditLogSeverityOptions = [
  { value: "all", label: "Severity" },
  { value: "LOW", label: "Low" },
  { value: "MEDIUM", label: "Medium" },
  { value: "HIGH", label: "High" },
  { value: "CRITICAL", label: "Critical" },
] as const;

export function AuditLogsPage() {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<AuditLogStatus | "all">("all");
  const [severity, setSeverity] = useState<AuditLogSeverity | "all">("all");
  const limit = 10;
  const debouncedSearch = useDebounce(search, 400);

  const { data: statsData } = useAuditLogStats();
  const exportAuditLogs = useExportAuditLogs();
  const { data: auditLogsResponse, isLoading } = useAuditLogs({
    page,
    limit,
    search: debouncedSearch || undefined,
    status: status === "all" ? undefined : status,
    severity: severity === "all" ? undefined : severity,
  });

  const auditLogs = auditLogsResponse?.data ?? [];
  const meta = auditLogsResponse?.meta ?? {
    page,
    limit,
    total: 0,
    totalPages: 1,
  };

  return (
    <div className="space-y-5">
      <PageHeader
        title="Audit Logs"
        description="Review admin activity, security events, and system audit history."
        actions={
          <Button
            variant="outline"
            onClick={() => exportAuditLogs.mutate()}
            disabled={auditLogs.length === 0 || exportAuditLogs.isPending}
          >
            <Download className="mr-2 size-3.5" />
            {exportAuditLogs.isPending ? "Exporting..." : "Export"}
          </Button>
        }
      />

      <AuditStatsCard data={statsData} />

      <FilterSection
        searchPlaceholder="Search by actor name or email..."
        searchValue={search}
        onSearchChange={(value) => {
          setSearch(value);
          setPage(1);
        }}
        filters={[
          {
            value: status,
            onChange: (value) => {
              setStatus(value as AuditLogStatus | "all");
              setPage(1);
            },
            placeholder: "Status",
            width: "sm:w-[140px]",
            options: auditLogStatusOptions,
          },
          {
            value: severity,
            onChange: (value) => {
              setSeverity(value as AuditLogSeverity | "all");
              setPage(1);
            },
            placeholder: "Severity",
            width: "sm:w-[150px]",
            options: auditLogSeverityOptions,
          },
        ]}
      />

      <DataTable
        data={auditLogs}
        loading={isLoading}
        pagination={{
          total: meta.total,
          page: meta.page,
          limit: meta.limit,
          totalPages: meta.totalPages,
          hasNext: meta.page < meta.totalPages,
          hasPrevious: meta.page > 1,
          onPageChange: setPage,
        }}
        headers={
          <>
            <TableHead>Log Reference</TableHead>
            <TableHead>Actor</TableHead>
            <TableHead>Action</TableHead>
            <TableHead>Module</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Severity</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </>
        }
        row={(item: AuditLog) => (
          <>
            <TableCell className="font-medium text-slate-700">{item.logReference}</TableCell>
            <TableCell>
              <div className="flex items-center gap-3">
                <span className="flex size-8 items-center justify-center rounded-full bg-primary/10 text-[10px] font-bold text-primary">
                  {getInitials(item.actorSnapshot?.name ?? item.actorType)}
                </span>
                <span>
                  <span className="block max-w-36 truncate font-semibold text-slate-900">
                    {item.actorSnapshot?.name ?? formatLabel(item.actorType)}
                  </span>
                  <span className="block max-w-36 truncate text-xs text-slate-500">
                    {item.actorSnapshot?.email ?? formatLabel(item.actorType)}
                  </span>
                </span>
              </div>
            </TableCell>
            <TableCell>
              <span className="block max-w-40 truncate font-medium text-slate-700">
                {item.actionLabel || formatLabel(item.action)}
              </span>
            </TableCell>
            <TableCell className="text-slate-600">{item.module}</TableCell>
            <TableCell>
              <StatusBadge status={item.status} />
            </TableCell>
            <TableCell>
              <SeverityBadge severity={item.severity} />
            </TableCell>
            <TableCell className="max-w-24 text-slate-500">{formatDate(item.createdAt)}</TableCell>
            <TableCell>
              <div className="flex items-center justify-end">
                <Button
                  variant="ghost"
                  className="size-9 rounded-full text-primary hover:bg-primary/10"
                  onClick={() => router.push(`/audit-logs/${item.id}`)}
                >
                  <Eye className="size-4" />
                </Button>
              </div>
            </TableCell>
          </>
        )}
      />
    </div>
  );
}
