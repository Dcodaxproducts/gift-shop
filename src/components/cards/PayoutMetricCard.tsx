"use client";

import {
  type PayoutMetric,
} from "@/constants/payouts";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type PayoutMetricCardProps = PayoutMetric & {
  loading?: boolean;
};

function PayoutMetricCard({ icon: Icon, label, value, change, tone, loading = false }: PayoutMetricCardProps) {
  return (
    <Card>
      <CardContent>
        <div className="flex items-start justify-between gap-4">
          <p className="text-xs font-semibold leading-4 text-slate-500">{label}</p>
          <Icon
            className="size-4 shrink-0 text-primary"
            strokeWidth={2.4}
          />
        </div>
        {loading ? (
          <>
            <div className="mt-3 h-[22px] w-32 animate-pulse rounded-full bg-slate-100" />
            <div className="mt-3 h-2.5 w-24 animate-pulse rounded-full bg-slate-100" />
          </>
        ) : (
          <>
            <p className="mt-3 text-[22px] font-semibold leading-none tracking-tight ">
              {value}
            </p>
            <p className={cn("mt-3 text-[10px] font-semibold", tone === "green" ? "text-green-600" : "text-red-600")}>
              {change}
            </p>
          </>
        )}
      </CardContent>
    </Card>
  );
}

export default PayoutMetricCard;
