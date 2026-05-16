"use client";

import { useState } from "react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { Card, CardContent } from "@/components/ui/card";
import { salesAxisMax, salesPerformanceData } from "@/constants/product-details";
import { cn } from "@/lib/utils";

type Range = "daily" | "weekly";

const rangeOptions: Array<{ value: Range; label: string }> = [
  { value: "daily", label: "Daily" },
  { value: "weekly", label: "Weekly" },
];

const formatYAxis = (value: number) => (value === 0 ? "0" : `$${value}k`);

export function SalesPerformanceCard() {
  const [range, setRange] = useState<Range>("daily");

  return (
    <Card className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <CardContent className="p-0">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-sm font-semibold text-slate-950">
              Sales Performance
            </h2>
            <p className="mt-1 text-[11px] text-slate-400">
              Daily revenue for the last 30 days
            </p>
          </div>
          <div className="flex items-center rounded-full bg-slate-100 p-0.5">
            {rangeOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => setRange(option.value)}
                className={cn(
                  "h-7 rounded-full px-4 text-[11px] font-semibold transition",
                  range === option.value
                    ? "bg-white text-primary shadow-sm"
                    : "text-slate-400 hover:text-slate-600",
                )}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 h-[220px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={salesPerformanceData[range]}
              margin={{ top: 8, right: 0, left: 0, bottom: 0 }}
              barCategoryGap="12%"
            >
              <YAxis
                tickLine={false}
                axisLine={false}
                width={42}
                domain={[0, salesAxisMax]}
                ticks={[0, 2.5, 5, 7.5, 10]}
                tickFormatter={formatYAxis}
                tick={{ fontSize: 10, fill: "#94a3b8" }}
                reversed={false}
              />
              <XAxis
                dataKey="label"
                tickLine={false}
                axisLine={false}
                interval={0}
                tick={{ fontSize: 10, fill: "#94a3b8" }}
                tickMargin={8}
              />
              <Bar
                dataKey="value"
                stackId="sales"
                fill="var(--primary)"
                radius={[0, 0, 0, 0]}
              />
              <Bar
                dataKey="cap"
                stackId="sales"
                fill="var(--primary)"
                fillOpacity={0.18}
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
