import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { chartPeriodOptions, monthlyRevenueTrends } from "@/constants/home-dashboard";

const maxRevenue = Math.max(...monthlyRevenueTrends.map((item) => item.ghostValue));

export function RevenueBarChart() {
  return (
    <Card className="rounded-2xl border border-border bg-white shadow-sm">
      <CardHeader className="flex flex-row items-start justify-between gap-4 p-5 pb-0">
        <div>
          <CardTitle className="text-base font-semibold text-slate-950">
            Monthly Revenue Trends
          </CardTitle>
          <p className="mt-1 text-xs font-medium text-slate-400">
            Yearly comparative growth analysis
          </p>
        </div>
        <Select defaultValue="6-months">
          <SelectTrigger className="w-[144px]">
            <SelectValue placeholder="Select period" />
          </SelectTrigger>
          <SelectContent>
            {chartPeriodOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-5 pb-5 pt-9">
        <div className="flex h-[205px] items-end gap-1.5 sm:gap-2.5">
          {monthlyRevenueTrends.map((item) => (
            <div key={item.month} className="flex flex-1 flex-col items-center gap-3">
              <div className="relative h-[160px] w-full">
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