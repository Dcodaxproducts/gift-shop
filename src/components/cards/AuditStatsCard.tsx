import type { AuditLogStats } from "@/services/audit-logs";
import { Card, CardContent } from "@/components/ui/card";
import { statToneClasses, type StatTone } from "@/constants/custom";

type AuditStatsCardItem = {
  title: string;
  value: string;
  tone: StatTone;
};

function formatNumber(value: number | string | null | undefined) {
  const numericValue = Number(value ?? 0);
  return Number.isNaN(numericValue) ? "0" : numericValue.toLocaleString();
}

function buildAuditStatCards(data?: AuditLogStats): AuditStatsCardItem[] {
  return [
    {
      title: "Total Logs",
      value: formatNumber(data?.totalLogs),
      tone: "blue",
    },
    {
      title: "Success Count",
      value: formatNumber(data?.successCount),
      tone: "emerald",
    },
    {
      title: "Failed Count",
      value: formatNumber(data?.failedCount),
      tone: "rose",
    },
    {
      title: "Critical Alerts 24h",
      value: formatNumber(data?.criticalAlerts24h),
      tone: "amber",
    },
  ];
}

export function AuditStatsCard({ data }: { data?: AuditLogStats }) {
  const stats = buildAuditStatCards(data);

  return (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardContent>
            <div>
              <p className="text-xs font-medium text-slate-500">{stat.title}</p>
              <div className="mt-1 flex items-end justify-between gap-2">
                <p className="text-2xl font-semibold tracking-tight">{stat.value}</p>
                <span className={`rounded-full px-2.5 py-1 text-[10px] font-semibold leading-none ${statToneClasses[stat.tone]}`}>
                  Live
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </section>
  );
}
