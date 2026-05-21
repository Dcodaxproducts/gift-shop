"use client";

import {
  type PayoutMetric,
} from "@/constants/payouts";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

function PayoutMetricCard({ icon: Icon, label, value, change, tone }: PayoutMetric) {
  return (
    <Card>
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-4">
          <p className="text-xs font-semibold leading-4 text-slate-500">{label}</p>
          <Icon
            className="size-4 shrink-0 text-primary"
            strokeWidth={2.4}
          />
        </div>
        <p className="mt-3 text-[22px] font-semibold leading-none tracking-tight ">
          {value}
        </p>
        <p className={cn("mt-3 text-[10px] font-semibold", tone === "green" ? "text-green-600" : "text-red-600")}>
          {change}
        </p>
      </CardContent>
    </Card>
  );
}

export default PayoutMetricCard;