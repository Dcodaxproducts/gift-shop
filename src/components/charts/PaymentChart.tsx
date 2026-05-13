import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { paymentSplit } from "@/constants/home-dashboard";
import { cn } from "@/lib/utils";

export function PaymentDistributionChart() {
  return (
    <Card className="rounded-2xl border border-border bg-white shadow-sm">
      <CardHeader className="p-5 pb-0">
        <CardTitle className="text-base font-semibold text-slate-950">
          Gift vs Payment
        </CardTitle>
        <p className="mt-1 text-xs font-medium text-slate-400">
          Service utilization distribution
        </p>
      </CardHeader>
      <CardContent className="p-5">
        <div className="mx-auto mb-7 mt-6 flex size-44 items-center justify-center rounded-full bg-[conic-gradient(var(--primary)_0_65%,#e2e8f0_65%_100%)]">
          <div className="flex size-32 flex-col items-center justify-center rounded-full bg-white text-center">
            <span className="text-3xl font-semibold text-slate-950">65%</span>
            <span className="mt-1 text-[10px] font-semibold uppercase text-slate-400">
              Gift Usage
            </span>
          </div>
        </div>
        <div className="space-y-3.5">
          {paymentSplit.map((item) => (
            <div key={item.label} className="flex items-center text-xs font-medium">
              <span
                className={cn(
                  "mr-2 size-2 rounded-full",
                  item.color === "primary" ? "bg-primary" : "bg-slate-300",
                )}
              />
              <span className="text-slate-500">{item.label}</span>
              <span className="ml-auto font-semibold text-slate-950">{item.value}%</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}