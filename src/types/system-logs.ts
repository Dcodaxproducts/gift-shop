export type SystemHealthRange = "DAILY" | "WEEKLY" | "MONTHLY";

export type SystemHealthStatus = "HEALTHY" | "WARNING" | "CRITICAL" | string;

export type SystemResourceUsage = {
  usedGb: number;
  totalGb: number;
  usagePercent: number;
  status: SystemHealthStatus;
};

export type SystemHealthStats = {
  serverHealth: {
    cpuUsagePercent: number;
    cpuStatus: SystemHealthStatus;
    memory: SystemResourceUsage;
    disk: SystemResourceUsage;
    uptimeHours: number;
    uptimeStatus: SystemHealthStatus;
  };
  apiHealth: {
    successRatePercent: number;
    failureRatePercent: number;
    totalRequests: number;
    averageLatencyMs: number;
    p95LatencyMs: number;
    latencyStatus: SystemHealthStatus;
  };
};

export type SystemLatencyGraphPoint = {
  label: string;
  averageLatencyMs: number;
  p95LatencyMs: number;
  totalRequests: number;
  failureRatePercent: number;
};

export type SystemLatencyGraph = {
  range: SystemHealthRange;
  points: SystemLatencyGraphPoint[];
};
