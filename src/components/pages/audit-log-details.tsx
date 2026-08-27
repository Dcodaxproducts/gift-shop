"use client";

import { ArrowLeft } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import PageHeader from "@/components/common/page-header";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuditLog } from "@/hooks/useAuditLogs";
import type { AuditLogJsonValue } from "@/services/audit-logs";
import { formatDate } from "@/utils/formatDate";
import { formatLabel } from "@/utils/formatLabel";
import { StatusBadge } from "@/utils/status";
import { cn } from "@/lib/utils";

function SeverityBadge({ severity }: { severity?: string }) {
  const value = severity ?? "LOW";
  const toneClass =
    {
      LOW: "bg-slate-100 text-slate-500",
      MEDIUM: "bg-blue-50 text-blue-600",
      HIGH: "bg-amber-50 text-amber-600",
      CRITICAL: "bg-red-50 text-red-500",
    }[value.toUpperCase()] ?? "bg-slate-100 text-slate-500";

  return (
    <span className={cn("inline-flex rounded-full px-3 py-1.5 text-[10px] font-semibold", toneClass)}>
      {formatLabel(value)}
    </span>
  );
}

function DetailRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-border py-3 last:border-b-0">
      <dt className="text-xs font-medium text-slate-500">{label}</dt>
      <dd className="max-w-[70%] text-right text-xs font-semibold text-slate-900">{value}</dd>
    </div>
  );
}

function JsonBlock({ title, value }: { title: string; value: AuditLogJsonValue | null }) {
  return (
    <Card>
      <CardTitle>{title}</CardTitle>
      <CardContent>
        <pre className="max-h-96 overflow-auto rounded-2xl bg-slate-950 p-4 text-xs leading-6 text-slate-100">
          {value ? JSON.stringify(value, null, 2) : "No data"}
        </pre>
      </CardContent>
    </Card>
  );
}

export function AuditLogDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const { data, isLoading } = useAuditLog(id);

  return (
    <div className="space-y-5">
      <PageHeader
        title={data?.logReference ?? "Audit Log Detail"}
        description="Review the full audit trail entry and captured change payload."
        actions={
          <Button variant="outline" onClick={() => router.push("/audit-logs")}>
            <ArrowLeft className="mr-2 size-3.5" />
            Back
          </Button>
        }
      />

      <section className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_360px]">
        <div className="space-y-5">
          <Card>
            <CardTitle>Audit Event</CardTitle>
            <CardContent>
              <dl>
                <DetailRow label="Action" value={data?.actionLabel ?? formatLabel(data?.action)} />
                <DetailRow label="Module" value={data?.module ?? "-"} />
                <DetailRow label="Status" value={data?.status ? <StatusBadge status={data.status} /> : "-"} />
                <DetailRow label="Severity" value={<SeverityBadge severity={data?.severity} />} />
                <DetailRow label="Created At" value={formatDate(data?.createdAt)} />
              </dl>
            </CardContent>
          </Card>

          <div className="grid gap-5 lg:grid-cols-2">
            <JsonBlock title="Before JSON" value={data?.beforeJson ?? null} />
            <JsonBlock title="After JSON" value={data?.afterJson ?? null} />
          </div>
        </div>
 
        <aside className="space-y-5">
          <Card>
            <CardTitle>Actor</CardTitle>
            <CardContent>
              <dl>
                <DetailRow label="Name" value={data?.actorSnapshot?.name ?? "-"} />
                <DetailRow label="Email" value={data?.actorSnapshot?.email ?? "-"} />
                <DetailRow label="Role" value={formatLabel(data?.actorSnapshot?.role ?? data?.actorType)} />
                <DetailRow label="Actor ID" value={data?.actorId ?? "-"} />
              </dl>
            </CardContent>
          </Card>

          <Card>
            <CardTitle>Target</CardTitle>
            <CardContent>
              <dl>
                <DetailRow label="Target Type" value={formatLabel(data?.targetType)} />
                <DetailRow label="Target ID" value={data?.targetId ?? "-"} />
              </dl>
            </CardContent>
          </Card>

          {isLoading ? (
            <Card>
              <CardContent>
                <div className="space-y-3">
                  <div className="h-3 w-3/4 animate-pulse rounded-full bg-slate-100" />
                  <div className="h-3 w-1/2 animate-pulse rounded-full bg-slate-100" />
                  <div className="h-3 w-2/3 animate-pulse rounded-full bg-slate-100" />
                </div>
              </CardContent>
            </Card>
          ) : null}
        </aside>
      </section>
    </div>
  );
}
