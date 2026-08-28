import { CheckCircle2, CircleDollarSign, PackageCheck, Truck } from "lucide-react";
import { cn } from "@/lib/utils";

export type TimelineState = "complete" | "current" | "pending";

const timelineIcon: Record<TimelineState, typeof CheckCircle2> = {
  complete: CircleDollarSign,
  current: Truck,
  pending: PackageCheck,
};

export function TimelineStep({
  label,
  date,
  state,
  isLast,
}: {
  label: string;
  date: string;
  state: TimelineState;
  isLast: boolean;
}) {
  const Icon = timelineIcon[state];
  const isPending = state === "pending";

  return (
    <div className="relative flex flex-1 flex-col items-center text-center">
      {!isLast ? (
        <span className="absolute left-1/2 top-3 h-px w-full bg-slate-200" aria-hidden="true" />
      ) : null}
      <span
        className={cn(
          "relative z-10 flex size-7 items-center justify-center rounded-full",
          isPending ? "bg-slate-100 text-slate-400" : "bg-primary text-white",
        )}
      >
        <Icon className="size-3.5" />
      </span>
      <p className="mt-3 text-[11px] font-bold leading-4">{label}</p>
      <p className="text-[9px] leading-4 text-slate-500">{date}</p>
    </div>
  );
}
