import { cn } from "@/lib/utils";

export type StatusTone = "active" | "pending" | "inactive" | "danger" | "success" | "suspended";

const statusToneClass: Record<StatusTone, string> = {
  active: "bg-emerald-50 text-emerald-600",
  pending: "bg-amber-50 text-amber-600",
  inactive: "bg-slate-100 text-slate-500",
  danger: "bg-red-50 text-red-500",
  success: "bg-emerald-50 text-emerald-600",
  suspended: "bg-rose-50 text-rose-600",
};

// Map your database/API status to the visual Tone
const statusToToneMap: Record<string, StatusTone> = {
  ACTIVE: "active",
  PENDING: "pending",
  INACTIVE: "inactive",
  SUSPENDED: "suspended",
  REJECTED: "danger",
  APPROVED: "success",
};

interface StatusBadgeProps {
  status: string;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const normalizedStatus = status.toUpperCase();
  const tone = statusToToneMap[normalizedStatus] || "inactive";
  
  // Format Label: "ACTIVE" -> "Active"
  const label = status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();

  return (
    <span className={cn(
      "inline-flex rounded-full px-3 py-1.5 text-[10px] font-semibold transition-colors",
      statusToneClass[tone],
      className
    )}>
      {label}
    </span>
  );
}