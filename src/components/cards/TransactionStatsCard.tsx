import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const transactionStats = [
  {
    title: "Total Volume",
    value: "$124,500.00",
    change: "^12%",
    tone: "emerald",
  },
  {
    title: "Success Rate",
    value: "98.2%",
    change: "^2.1%",
    tone: "emerald",
  },
  {
    title: "Pending Review",
    value: "14",
    change: "Alert",
    tone: "amber",
  },
  {
    title: "Failed Today",
    value: "3",
    change: "-5%",
    tone: "rose",
  },
];

const toneClasses = {
  emerald: "text-emerald-600",
  amber: "text-amber-500",
  rose: "text-rose-500",
};

type TransactionStatTone = keyof typeof toneClasses;

type TransactionStat = {
  title: string;
  value: string;
  change: string;
  tone: TransactionStatTone;
};

const typedTransactionStats = transactionStats as TransactionStat[];

export function TransactionStatsCard() {
  return (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {typedTransactionStats.map((stat) => (
        <Card key={stat.title}>
          <CardContent>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              {stat.title}
            </p>
            <div className="mt-1 flex items-end justify-between gap-2">
              <p className="text-2xl font-semibold tracking-tight">{stat.value}</p>
              <span className={cn("text-[10px] font-semibold", toneClasses[stat.tone])}>
                {stat.change}
              </span>
            </div>
          </CardContent>
        </Card>
      ))}
    </section>
  );
}
