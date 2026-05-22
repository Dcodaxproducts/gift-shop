import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import type { ProviderPayoutTrendRange } from "@/types/provider-payouts";

type MonthlyPayoutChartProps = {
  data?: {
    month: string;
    amount: number;
  }[];
  range: ProviderPayoutTrendRange;
  onRangeChange: (range: ProviderPayoutTrendRange) => void;
};

const trendChartConfig = {
  amount: {
    label: "Payout",
    color: "var(--primary)",
  },
} satisfies ChartConfig;

const trendRanges: { label: string; value: ProviderPayoutTrendRange }[] = [
  { label: "Last 3 Months", value: "LAST_3_MONTHS" },
  { label: "Last 6 Months", value: "LAST_6_MONTHS" },
  { label: "Last 12 Months", value: "LAST_12_MONTHS" },
];

function MonthlyPayoutChart({ data = [], range, onRangeChange }: MonthlyPayoutChartProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-start justify-between gap-4">
          <h2 className="text-sm font-semibold ">Monthly Payout Trend</h2>
          <Select value={range} onValueChange={onRangeChange}>
            <SelectTrigger className="h-8 w-[130px] rounded-full border-0 bg-slate-50 px-4 text-[10px] text-slate-500 shadow-none">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {trendRanges.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <ChartContainer config={trendChartConfig} className="mt-6 h-[230px] w-full">
          <AreaChart data={data} margin={{ left: 0, right: 0, top: 8 }}>
            <defs>
              <linearGradient id="payoutFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--primary)" stopOpacity={0.3} />
                <stop offset="100%" stopColor="var(--primary)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} stroke="var(--border)" strokeDasharray="3 3" />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 10, fill: "var(--muted-foreground)" }}
            />
            <YAxis hide />
            <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
            <Area
              type="monotone"
              dataKey="amount"
              stroke="var(--primary)"
              strokeWidth={3}
              fill="url(#payoutFill)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

export default MonthlyPayoutChart;
