import { cn } from "@/lib/utils";

export type StatusTone = "active" | "pending" | "inactive" | "danger" | "success" | "suspended" | "primary" | "info" | "medium";

const statusToneClass: Record<StatusTone, string> = {
  active: "bg-emerald-50 text-emerald-600",
  pending: "bg-amber-50 text-amber-600",
  inactive: "bg-slate-100 text-slate-500",
  danger: "bg-red-50 text-red-500",
  success: "bg-emerald-50 text-emerald-600",
  suspended: "bg-rose-50 text-rose-600",
  primary: "bg-primary/10 text-primary",
  info: "bg-blue-50 text-slate-500",
  medium: "bg-blue-50 text-blue-600",
};

// Map your database/API status to the visual Tone
const statusToToneMap: Record<string, StatusTone> = {
  ACTIVE: "active",
  PENDING: "pending",
  INACTIVE: "inactive",
  SUSPENDED: "suspended",
  REJECTED: "danger",
  APPROVED: "success",
  SUCCESS: "success",
  COMPLETED: "success",
  REFUNDED: "info",
  OPEN: "primary",
  IN_REVIEW: "info",
  ESCALATED: "danger",
  HIGH_PRIORITY: "danger",
  UNDER_REVIEW: "info",
  RESOLVED: "success",
  FAILED: "danger",
  RULING_PENDING: "primary",
  AWAITING_INFO: "info",
  VERIFIED: "success",
  PENDING_SYNC: "inactive",
  YES: "success",
  NO: "inactive",
  LOW: "inactive",
  MEDIUM: "medium",
  HIGH: "pending",
  CRITICAL: "danger",
};

interface StatusBadgeProps {
  status: string;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const normalizedStatus = status.toUpperCase();
  const tone = statusToToneMap[normalizedStatus] || "inactive";
  
  const label = status
    .replace(/[_-]/g, " ")
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());

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
