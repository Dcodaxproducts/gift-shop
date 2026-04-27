import { cn } from "@/lib/utils";

export type StatusTone = "active" | "pending" | "inactive" | "danger" | "success";

const statusToneClass: Record<StatusTone, string> = {
  active: "bg-emerald-50 text-emerald-600",
  pending: "bg-amber-50 text-amber-600",
  inactive: "bg-slate-100 text-slate-500",
  danger: "bg-red-50 text-red-500",
  success: "bg-emerald-50 text-emerald-600",
};

export function getStatusClass(status: StatusTone, className?: string) {
  return cn(statusToneClass[status], className);
}
