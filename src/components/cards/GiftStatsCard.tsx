import { CalendarCheck, CheckCircle2, Smile } from "lucide-react";
import { giftInventoryStats } from "@/constants/gifts";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const statIconMap = {
  gifts: CalendarCheck,
  active: CheckCircle2,
  pending: Smile,
};

const GiftCard = () => {
  return (
    <section className="grid gap-5 md:grid-cols-3">
      {giftInventoryStats.map((stat) => {
        const Icon = statIconMap[stat.icon];

        return (
          <Card key={stat.title} className="rounded-2xl border border-border bg-white shadow-sm">
            <CardContent className="flex items-start justify-between p-5">
              <div>
                <p className="text-xs font-medium text-slate-500">{stat.title}</p>
                <p className="mt-1 text-2xl font-semibold tracking-tight text-slate-950">
                  {stat.value}
                </p>
                <p
                  className={cn(
                    "mt-4 text-[10px] font-semibold",
                    stat.trend === "up" ? "text-emerald-500" : "text-red-500"
                  )}
                >
                  {stat.change}
                </p>
              </div>

              <span
                className={cn(
                  "flex size-9 items-center justify-center rounded-2xl",
                  stat.icon === "gifts" && "bg-primary/10 text-primary",
                  stat.icon === "active" && "bg-emerald-50 text-emerald-500",
                  stat.icon === "pending" && "bg-amber-50 text-amber-500"
                )}
              >
                <Icon className="size-4" strokeWidth={2.25} />
              </span>
            </CardContent>
          </Card>
        );
      })}
    </section>
  );
};

export default GiftCard;