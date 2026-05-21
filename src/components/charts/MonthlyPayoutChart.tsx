import {
    ChevronDown,
} from "lucide-react";
import {
    Area,
    AreaChart,
    CartesianGrid,
    XAxis,
    YAxis,
} from "recharts";
import {
    monthlyPayoutData,
} from "@/constants/payouts";
import { Card, CardContent } from "@/components/ui/card";
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent
} from "@/components/ui/chart";

const trendChartConfig = {
  amount: {
    label: "Payout",
    color: "var(--primary)",
  },
} satisfies ChartConfig;

function MonthlyPayoutChart() {
    return (
        <Card className="rounded-2xl border border-slate-200 bg-white shadow-sm">
            <CardContent className="p-6">
                <div className="flex items-start justify-between gap-4">
                    <h2 className="text-sm font-semibold ">Monthly Payout Trend</h2>
                    <button
                        type="button"
                        className="flex h-8 items-center gap-2 rounded-full bg-slate-50 px-4 text-[10px] text-slate-500"
                    >
                        Last 6 Months
                        <ChevronDown className="size-3" strokeWidth={2.5} />
                    </button>
                </div>

                <ChartContainer config={trendChartConfig} className="mt-6 h-[230px] w-full">
                    <AreaChart data={monthlyPayoutData} margin={{ left: 0, right: 0, top: 8 }}>
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
