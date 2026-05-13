import { ArrowLeftRight, CreditCard, Store, UsersRound } from "lucide-react";

export const statToneClasses = {
  blue: "bg-blue-50 text-blue-600",
  amber: "bg-amber-50 text-amber-600",
  emerald: "bg-emerald-50 text-emerald-700",
  rose: "bg-rose-50 text-rose-600",
  primary: "bg-primary/10 text-primary",
};

export const iconMap = {
  users: UsersRound,
  providers: Store,
  transactions: ArrowLeftRight,
  revenue: CreditCard,
};

export const statBadgeTone = {
  green: "text-emerald-500",
  orange: "text-amber-500",
};

export type StatTone = keyof typeof statToneClasses;