import { Card, CardContent, CardHeader } from "@/components/ui/card";
import type { DashboardRevenueTrends } from "@/types/dashboard";
import SectionHeader from "../common/section-header";

type RevenueBarChartProps = {
  data: DashboardRevenueTrends;
};

export function RevenueBarChart({ data }: RevenueBarChartProps) {
  const maxRevenue = Math.max(...data.values, 1);
  const revenueData = data.labels.map((label, index) => ({
    month: label,
    value: data.values[index] ?? 0,
    ghostValue: maxRevenue,
  }));

  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between gap-4">
        <SectionHeader
          title="Monthly Revenue Trends"
          description="Yearly comparative growth analysis"
        />
      </CardHeader>
      <CardContent className="pt-7">
        <div className="flex h-61.25 items-end gap-1.5 sm:gap-2.5">
          {revenueData.map((item) => (
            <div key={item.month} className="flex h-full flex-1 flex-col items-center gap-2">
              <div className="relative min-h-0 w-full flex-1">
                <div
                  className="absolute bottom-0 left-0 right-0 rounded-t-sm bg-primary/10"
                  style={{ height: `${(item.ghostValue / maxRevenue) * 100}%` }}
                />
                <div
                  className="absolute bottom-0 left-0 right-0 rounded-t-sm bg-primary"
                  style={{ height: `${(item.value / maxRevenue) * 100}%` }}
                />
              </div>
              <span className="text-[11px] font-medium text-slate-400">
                {item.month}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
