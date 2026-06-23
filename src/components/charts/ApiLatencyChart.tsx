"use client";

import { useState } from "react";
import { RefreshCw } from "lucide-react";
import {
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  YAxis,
} from "recharts";
import { Card, CardContent } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useSystemLatencyGraph } from "@/hooks/useSystemLogs";
import type { SystemHealthRange } from "@/types/system-logs";

type LatencyPeriod = "Daily" | "Weekly" | "Monthly";

const latencyChartConfig = {
  latency: {
    label: "Latency",
    color: "#ff5b5f",
  },
} satisfies ChartConfig;

const periods: LatencyPeriod[] = ["Daily", "Weekly", "Monthly"];
const rangeByPeriod: Record<LatencyPeriod, SystemHealthRange> = {
  Daily: "DAILY",
  Weekly: "WEEKLY",
  Monthly: "MONTHLY",
};

const numberFormatter = new Intl.NumberFormat("en-US");

function ApiLatencyChart() {
  const [period, setPeriod] = useState<LatencyPeriod>("Daily");
  const { data, refetch, isFetching } = useSystemLatencyGraph(rangeByPeriod[period]);
  const points = data?.points ?? [];
  const totalRequests = points.reduce((total, point) => total + point.totalRequests, 0);
  const latencyData = points.map((point) => ({
    day: point.label,
    latency: Number((point.averageLatencyMs / 1000).toFixed(2)),
  }));

  return (
    <Card>
      <CardContent>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-semibold">API Latency Over Time</h2>
              <span className="rounded bg-fuchsia-50 px-1.5 py-0.5 text-[8px] font-bold uppercase text-fuchsia-600">
                {numberFormatter.format(totalRequests)} Requests
              </span>
            </div>
            <p className="mt-1 text-[10px] font-medium text-slate-400">
              Monitor real-time API reliability and response times
            </p>
          </div>

          <div className="inline-flex h-9 items-center rounded-xl border border-slate-100 bg-white p-1 shadow-sm">
            {periods.map((item) => (
              <Button
                key={item}
                variant="ghost"
                className={cn(
                  "h-7 rounded-lg px-3 text-[10px] text-slate-500 hover:text-slate-900",
                  period === item && "bg-primary text-primary-foreground hover:text-primary-foreground",
                )}
                onClick={() => setPeriod(item)}
              >
                {item}
              </Button>
            ))}
            <button
              type="button"
              className="ml-1 flex size-7 items-center justify-center rounded-lg border-l border-slate-100 text-slate-400"
              aria-label="Refresh latency chart"
              onClick={() => refetch()}
              disabled={isFetching}
            >
              <RefreshCw className={cn("size-3.5", isFetching && "animate-spin")} />
            </button>
          </div>
        </div>

        <ChartContainer config={latencyChartConfig} className="mt-6 h-[260px] w-full">
          <LineChart data={latencyData} margin={{ left: 0, right: 8, top: 8, bottom: 0 }}>
            <CartesianGrid vertical={false} stroke="var(--border)" strokeOpacity={0.45} />
            <XAxis
              dataKey="day"
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 10, fill: "var(--muted-foreground)" }}
            />
            <YAxis
              domain={[0, 2]}
              ticks={[0, 0.5, 1, 1.5, 2]}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 10, fill: "var(--muted-foreground)" }}
              width={26}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
            <Line
              type="monotone"
              dataKey="latency"
              stroke="#ff5b5f"
              strokeWidth={3}
              dot={{ r: 2, fill: "var(--primary)", strokeWidth: 0 }}
              activeDot={{ r: 4, fill: "#ff5b5f", strokeWidth: 0 }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

export default ApiLatencyChart;
