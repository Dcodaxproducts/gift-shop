import SystemHealthCard from "@/components/cards/SystemHealthCard";
import ApiLatencyChart from "@/components/charts/ApiLatencyChart";
import PageHeader from "@/components/common/page-header";

const serverHealthMetrics = [
  {
    label: "CPU Usage",
    value: "6.5%",
    maxLabel: "100%",
    progress: 6.5,
    status: "Healthy" as const,
  },
  {
    label: "Memory Usage",
    value: "2.6 GB",
    maxLabel: "3.8 GB",
    progress: 68,
    status: "Healthy" as const,
  },
  {
    label: "Disk Usage",
    value: "28.3 GB",
    maxLabel: "33.7 GB",
    progress: 84,
    status: "Warning" as const,
    tone: "red" as const,
  },
  {
    label: "Uptime",
    value: "3500h",
    progress: 100,
    status: "Healthy" as const,
  },
];

const apiHealthMetrics = [
  {
    label: "Success Rate",
    value: "100%",
    progress: 100,
    status: "Healthy" as const,
  },
  {
    label: "Failure Rate",
    value: "0%",
    progress: 0,
    status: "Healthy" as const,
  },
  {
    label: "Total Requests",
    value: "177",
    progress: 58,
    status: "Healthy" as const,
  },
  {
    label: "Average Latency",
    value: "245.59 ms",
    helper: "177 total requests",
  },
];

export function SystemLogsPage() {
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
