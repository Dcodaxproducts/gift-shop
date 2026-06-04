import {
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  YAxis,
} from "recharts";
import { Card, CardContent } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

type EarningsDistributionChartProps = {
  data?: {
    tier: string;
    amount: number;
  }[];
};

const distributionChartConfig = {
  amount: {
    label: "Earnings",
    color: "var(--primary)",
  },
} satisfies ChartConfig;

function EarningsDistributionChart({ data = [] }: EarningsDistributionChartProps) {
  const chartData = data;

  return (
    <Card>
      <CardContent>
        <div>
          <h2 className="text-sm font-semibold">Earnings Distribution</h2>
          <p className="mt-1 text-[10px] font-medium text-slate-400">
            Breakdown by Provider Tier
          </p>
        </div>

        <ChartContainer config={distributionChartConfig} className="relative mt-6 h-[220px] w-full">
          <LineChart data={chartData} margin={{ left: 0, right: 0, top: 8 }}>
            <CartesianGrid vertical={false} stroke="var(--border)" strokeDasharray="3 3" />
            <XAxis
              dataKey="tier"
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 10, fill: "var(--muted-foreground)" }}
            />
            <YAxis hide />
              <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />

              <Line
                type="monotone"
                dataKey="amount"
                stroke="var(--primary)"
                strokeWidth={3}
                dot={{ r: 4, fill: "var(--primary)", strokeWidth: 0 }}
              />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

export default EarningsDistributionChart;
