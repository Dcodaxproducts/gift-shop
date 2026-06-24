import PageHeader from "@/components/common/page-header";
import {
  broadcastSteps,
  type BroadcastStepId,
} from "@/constants/broadcast";
import { cn } from "@/lib/utils";

export function BroadcastHeader({
  activeStep,
  completed = false,
}: {
  activeStep: BroadcastStepId;
  completed?: boolean;
}) {
  return (
    <>
      <PageHeader title="Create New Broadcast" className="sm:justify-center" />
      <div className="flex items-center justify-center gap-4 sm:gap-6">
        {broadcastSteps.map((step, index) => {
          const isActive = step.id === activeStep;
          const isDone = completed || step.id < activeStep;

          return (
            <div key={step.id} className="flex items-center gap-3 sm:gap-5">
              <div className="flex items-center gap-2.5">
                <span
                  className={cn(
                    "flex size-11 items-center justify-center rounded-full text-base font-semibold transition",
                    isActive || isDone ? "bg-primary text-white" : "bg-slate-100 text-slate-300",
                  )}
                >
                  {step.id}
                </span>
                <span className={cn("text-sm font-semibold", isActive || isDone ? "text-primary" : "text-slate-400")}>
                  {step.label}
                </span>
              </div>
              {index < broadcastSteps.length - 1 ? (
                <span className={cn("hidden h-0.5 w-19 sm:block", step.id < activeStep || completed ? "bg-primary" : "bg-slate-200")} />
              ) : null}
            </div>
          );
        })}
      </div>
    </>
  );
}
