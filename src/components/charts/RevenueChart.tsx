import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { chartPeriodOptions, monthlyRevenueTrends } from "@/constants/home-dashboard";
import SectionHeader from "../common/section-header";

const maxRevenue = Math.max(...monthlyRevenueTrends.map((item) => item.ghostValue));

export function RevenueBarChart() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between gap-4">
        <SectionHeader
          title="Monthly Revenue Trends"
          description="Yearly comparative growth analysis"
        />
        <Select defaultValue="6-months">
          <SelectTrigger className="w-36 h-8 font-medium text-xs">
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
      <CardContent className="pt-7">
        <div className="flex h-61.25 items-end gap-1.5 sm:gap-2.5">
          {monthlyRevenueTrends.map((item) => (
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
