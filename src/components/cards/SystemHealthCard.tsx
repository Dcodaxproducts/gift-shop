import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type SystemHealthCardProps = {
  label: string;
  value: string;
  maxLabel?: string;
  progress?: number;
  status?: "Healthy" | "Warning";
  helper?: string;
  tone?: "green" | "red";
  variant?: "server" | "api";
};

function SystemHealthCard({
  label,
  value,
  maxLabel,
  progress,
  status = "Healthy",
  helper,
  tone = "green",
  variant = "server",
}: SystemHealthCardProps) {
  const showProgress = typeof progress === "number";
  const isLatencyCard = variant === "api" && !!helper && !showProgress;

  return (
    <Card>
      <CardContent>
        <p className="text-xs font-semibold leading-4 text-slate-500">{label}</p>

        <div className="mt-3 flex items-end gap-1.5">
          <p className="text-[22px] font-semibold leading-none tracking-tight">
            {value}
          </p>
          {maxLabel ? (
            <span className="text-[10px] font-semibold leading-4 text-slate-300">
              / {maxLabel}
            </span>
          ) : null}
        </div>

        {showProgress ? (
          <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100">
            <div
              className={cn(
                "h-full rounded-full",
                tone === "red" ? "bg-red-500" : "bg-emerald-500",
              )}
              style={{ width: `${Math.min(Math.max(progress, 0), 100)}%` }}
            />
          </div>
        ) : null}

        {isLatencyCard ? (
          <div className="mt-3 space-y-0.5">
            <p className="text-[10px] font-semibold leading-4 text-slate-300">
              {helper}
            </p>
            <p className="text-[10px] font-semibold leading-4 text-slate-300">
              P95: 505 ms
            </p>
          </div>
        ) : (
          <p
            className={cn(
              "mt-2 text-[10px] font-semibold",
              status === "Warning" ? "text-fuchsia-600" : "text-emerald-600",
            )}
          >
            {status}
          </p>
        )}
      </CardContent>
    </Card>
  );
}

export default SystemHealthCard;
