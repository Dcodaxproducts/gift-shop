import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { SystemHealthStats, SystemHealthStatus } from "@/types/system-logs";

type SystemHealthCardProps = {
  label: string;
  value: string;
  maxLabel?: string;
  progress?: number;
  status?: "Healthy" | "Warning";
  helper?: string;
  p95Label?: string;
  tone?: "green" | "red";
  variant?: "server" | "api";
};

export type HealthMetric = {
  label: string;
  value: string;
  maxLabel?: string;
  progress?: number;
  status?: "Healthy" | "Warning";
  helper?: string;
  p95Label?: string;
  tone?: "green" | "red";
};

const numberFormatter = new Intl.NumberFormat("en-US");

const formatPercent = (value: number) => `${Number(value.toFixed(1))}%`;
const formatGb = (value: number) => `${Number(value.toFixed(1))} GB`;
const formatLatency = (value: number) => `${Number(value.toFixed(2))} ms`;
const formatStatus = (status: SystemHealthStatus): "Healthy" | "Warning" => {
  return status === "WARNING" || status === "CRITICAL" ? "Warning" : "Healthy";
};
const getTone = (status: SystemHealthStatus): "green" | "red" => {
  return formatStatus(status) === "Warning" ? "red" : "green";
};

export function buildServerHealthMetrics(data: SystemHealthStats): HealthMetric[] {
  const { serverHealth } = data;

  return [
    {
      label: "CPU Usage",
      value: formatPercent(serverHealth.cpuUsagePercent),
      maxLabel: "100%",
      progress: serverHealth.cpuUsagePercent,
      status: formatStatus(serverHealth.cpuStatus),
      tone: getTone(serverHealth.cpuStatus),
    },
    {
      label: "Memory Usage",
      value: formatGb(serverHealth.memory.usedGb),
      maxLabel: formatGb(serverHealth.memory.totalGb),
      progress: serverHealth.memory.usagePercent,
      status: formatStatus(serverHealth.memory.status),
      tone: getTone(serverHealth.memory.status),
    },
    {
      label: "Disk Usage",
      value: formatGb(serverHealth.disk.usedGb),
      maxLabel: formatGb(serverHealth.disk.totalGb),
      progress: serverHealth.disk.usagePercent,
      status: formatStatus(serverHealth.disk.status),
      tone: getTone(serverHealth.disk.status),
    },
    {
      label: "Uptime",
      value: `${numberFormatter.format(serverHealth.uptimeHours)}h`,
      progress: 100,
      status: formatStatus(serverHealth.uptimeStatus),
      tone: getTone(serverHealth.uptimeStatus),
    },
  ];
}

export function buildApiHealthMetrics(data: SystemHealthStats): HealthMetric[] {
  const { apiHealth } = data;

  return [
    {
      label: "Success Rate",
      value: formatPercent(apiHealth.successRatePercent),
      progress: apiHealth.successRatePercent,
      status: "Healthy",
    },
    {
      label: "Failure Rate",
      value: formatPercent(apiHealth.failureRatePercent),
      progress: apiHealth.failureRatePercent,
      status: formatStatus(apiHealth.latencyStatus),
      tone: apiHealth.failureRatePercent > 0 ? "red" : "green",
    },
    {
      label: "Total Requests",
      value: numberFormatter.format(apiHealth.totalRequests),
      progress: Math.min(apiHealth.totalRequests, 100),
      status: formatStatus(apiHealth.latencyStatus),
    },
    {
      label: "Average Latency",
      value: formatLatency(apiHealth.averageLatencyMs),
      helper: `${numberFormatter.format(apiHealth.totalRequests)} total requests`,
      p95Label: `P95: ${formatLatency(apiHealth.p95LatencyMs)}`,
    },
  ];
}

function SystemHealthCard({
  label,
  value,
  maxLabel,
  progress,
  status = "Healthy",
  helper,
  p95Label,
  tone = "green",
  variant = "server",
}: SystemHealthCardProps) {
  const showProgress = typeof progress === "number";
  const isLatencyCard = variant === "api" && !!helper && !showProgress;

  return (
    <Card>
      <CardContent>
        <p className="text-xs font-semibold leading-4 text-slate-500">{label}</p>

        <div className="mt-3 flex items-end gap-1.5">
          <p className="text-[22px] font-semibold leading-none tracking-tight">
            {value}
          </p>
          {maxLabel ? (
            <span className="text-[10px] font-semibold leading-4 text-slate-300">
              / {maxLabel}
            </span>
          ) : null}
        </div>

        {showProgress ? (
          <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100">
            <div
              className={cn(
                "h-full rounded-full",
                tone === "red" ? "bg-red-500" : "bg-emerald-500",
              )}
              style={{ width: `${Math.min(Math.max(progress, 0), 100)}%` }}
            />
          </div>
        ) : null}

        {isLatencyCard ? (
          <div className="mt-3 space-y-0.5">
            <p className="text-[10px] font-semibold leading-4 text-slate-300">
              {helper}
            </p>
            <p className="text-[10px] font-semibold leading-4 text-slate-300">
              {p95Label ?? "P95: 505 ms"}
            </p>
          </div>
        ) : (
          <p
            className={cn(
              "mt-2 text-[10px] font-semibold",
              status === "Warning" ? "text-fuchsia-600" : "text-emerald-600",
            )}
          >
            {status}
          </p>
        )}
      </CardContent>
    </Card>
  );
}

export default SystemHealthCard;
