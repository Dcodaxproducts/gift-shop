import { CheckCircle2, XCircle, ShieldAlert, UserRound, ArrowLeftRight, ShoppingBag, History } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface ActivityItem {
  id: string;
  type: "ALL" | "LOGIN" | "PROFILE_UPDATE" | "SECURITY" | "PAYMENT" | "ORDER";
  title: string;
  description: string;
  createdAt: string;
}

export const activityConfig: Record<
  string,
  { toneClass: string; icon: LucideIcon }
> = {
  LOGIN_SUCCESS: {
    toneClass: "bg-emerald-100 text-emerald-500",
    icon: CheckCircle2,
  },
  LOGIN_FAILED: {
    toneClass: "bg-rose-100 text-rose-500",
    icon: XCircle,
  },
  SECURITY: {
    toneClass: "bg-violet-100 text-violet-500",
    icon: ShieldAlert,
  },
  PROFILE_UPDATE: {
    toneClass: "bg-blue-100 text-blue-500",
    icon: UserRound,
  },
  PAYMENT: {
    toneClass: "bg-amber-100 text-amber-500",
    icon: ArrowLeftRight,
  },
  ORDER: {
    toneClass: "bg-sky-100 text-sky-500",
    icon: ShoppingBag,
  },
  DEFAULT: {
    toneClass: "bg-slate-100 text-slate-500",
    icon: History,
  }
};
