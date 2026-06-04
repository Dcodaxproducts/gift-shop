import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { paymentSplit } from "@/constants/home-dashboard";
import { cn } from "@/lib/utils";
import SectionHeader from "../common/section-header";

export function PaymentDistributionChart() {
  return (
    <Card>
      <CardHeader>
        <SectionHeader
          title="Gift vs Payment"
          description="Service utilization distribution"
        />
      </CardHeader>
      <CardContent>
        <div className="mx-auto mb-7 mt-6 flex size-44 items-center justify-center rounded-full bg-[conic-gradient(var(--primary)_0_65%,#e2e8f0_65%_100%)]">
          <div className="flex size-32 flex-col items-center justify-center rounded-full bg-white text-center">
            <span className="text-3xl font-semibold ">65%</span>
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
              <span className="ml-auto font-semibold ">{item.value}%</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}