"use client";

import SystemHealthCard, {
  buildApiHealthMetrics,
  buildServerHealthMetrics,
} from "@/components/cards/SystemHealthCard";
import ApiLatencyChart from "@/components/charts/ApiLatencyChart";
import PageHeader from "@/components/common/page-header";
import { useSystemLogs } from "@/hooks/useSystemLogs";

export function SystemLogsPage() {
  const { data } = useSystemLogs();
  const serverHealthMetrics = data ? buildServerHealthMetrics(data) : [];
  const apiHealthMetrics = data ? buildApiHealthMetrics(data) : [];
  
  return (
    <div className="space-y-5">
      <PageHeader
        title="System Health Monitoring"
        description="Track system performance, uptime, and integrations in real time."
      />

      <section className="space-y-4">
        <h2 className="text-sm font-semibold">Server Health</h2>
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {serverHealthMetrics.map((metric) => (
            <SystemHealthCard key={metric.label} {...metric} variant="server" />
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-sm font-semibold">API Health</h2>
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {apiHealthMetrics.map((metric) => (
            <SystemHealthCard key={metric.label} {...metric} variant="api" />
          ))}
        </div>
      </section>

      <ApiLatencyChart />
    </div>
  );
}
