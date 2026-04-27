import { ArrowLeftRight, CreditCard, Store, UsersRound } from "lucide-react";
import type { StatCardData } from "@/constants/home-dashboard";
import { Card, CardContent } from "@/components/ui/card";

const statIconMap = {
  users: UsersRound,
  providers: Store,
  transactions: ArrowLeftRight,
  revenue: CreditCard,
};

type StatCardProps = {
  stat: StatCardData;
};

export function StatCard({ stat }: StatCardProps) {
  const Icon = statIconMap[stat.icon];

  return (
    <Card className="rounded-2xl border border-border bg-white shadow-sm">
      <CardContent className="p-4 sm:p-5">
        <div className="mb-5 flex items-start justify-between">
          <div className="flex size-9 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <Icon className="size-4" strokeWidth={2.4} />
          </div>
          <span className="rounded-full bg-emerald-50 px-2 py-1 text-[10px] font-semibold text-emerald-500">
            {stat.change}
          </span>
        </div>
        <p className="text-xs font-medium text-slate-500">{stat.title}</p>
        <p className="mt-1 text-2xl font-semibold tracking-tight text-slate-950">
          {stat.value}
        </p>
      </CardContent>
    </Card>
  );
}
