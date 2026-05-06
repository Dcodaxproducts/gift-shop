import { CalendarDays, CheckCircle2, Clock3, DollarSign, Hexagon, Hourglass, TrendingUp, Wallet } from "lucide-react";
import type { ElementType } from "react";

export type PayoutMetric = {
  icon: ElementType;
  label: string;
  value: string;
  change: string;
  tone: "purple" | "amber" | "green" | "violet";
};

export type PayoutActivity = {
  provider: string;
  id: string;
  avatar: string;
  avatarTone: "teal" | "stone" | "cyan" | "dark";
  pendingAmount: string;
  lastPayoutDate: string;
  nextPayoutDate: string;
  status: "Completed" | "Pending" | "On Hold";
};

export const payoutMetrics: PayoutMetric[] = [
  {
    icon: CalendarDays,
    label: "Total payouts this month",
    value: "$128,430.00",
    change: "+12.5% vs last month",
    tone: "purple",
  },
  {
    icon: Hourglass,
    label: "Pending payouts",
    value: "$12,250.00",
    change: "-2.4% vs last week",
    tone: "amber",
  },
  {
    icon: CheckCircle2,
    label: "Completed payouts",
    value: "$116,180.00",
    change: "+14.2% vs last month",
    tone: "green",
  },
  {
    icon: Hexagon,
    label: "Platform revenue",
    value: "$19,264.50",
    change: "+8.7% vs last month",
    tone: "violet",
  },
];

export const payoutActivities: PayoutActivity[] = [
  {
    provider: "TechSolutions Inc.",
    id: "PRV-90210",
    avatar: "T",
    avatarTone: "teal",
    pendingAmount: "$3,420.00",
    lastPayoutDate: "Oct 12, 2023",
    nextPayoutDate: "Nov 12, 2023",
    status: "Completed",
  },
  {
    provider: "CreativeFlow Studio",
    id: "PRV-44321",
    avatar: "C",
    avatarTone: "stone",
    pendingAmount: "$1,890.50",
    lastPayoutDate: "Oct 15, 2023",
    nextPayoutDate: "Nov 15, 2023",
    status: "Pending",
  },
  {
    provider: "GlobalLogistics",
    id: "PRV-7209",
    avatar: "G",
    avatarTone: "cyan",
    pendingAmount: "$12,450.00",
    lastPayoutDate: "Oct 01, 2023",
    nextPayoutDate: "Nov 01, 2023",
    status: "Completed",
  },
  {
    provider: "UrbanConsultants",
    id: "PRV-88776",
    avatar: "U",
    avatarTone: "dark",
    pendingAmount: "$560.00",
    lastPayoutDate: "Oct 20, 2023",
    nextPayoutDate: "Nov 20, 2023",
    status: "On Hold",
  },
];

export const monthlyPayoutLabels = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN"] as const;
export const earningsTierLabels = ["FREE", "PRO", "ENTERP.", "AGENCY"] as const;

export const payoutSummaryIcons = {
  trend: TrendingUp,
  wallet: Wallet,
  clock: Clock3,
  dollar: DollarSign,
};

export const payoutActivitiesPagination = {
  total: 1284,
  limit: 4,
  totalPages: 321,
  hasNext: true,
  hasPrevious: false,
};

export const monthlyPayoutData = [
  { month: "Jan", amount: 12000 },
  { month: "Feb", amount: 18500 },
  { month: "Mar", amount: 15800 },
  { month: "Apr", amount: 24200 },
  { month: "May", amount: 19600 },
  { month: "Jun", amount: 28400 },
];

export const earningsDistributionData = [
  { tier: "Tier 1", amount: 14500 },
  { tier: "Tier 2", amount: 8200 },
  { tier: "Tier 3", amount: 18900 },
  { tier: "Tier 4", amount: 11200 },
];
