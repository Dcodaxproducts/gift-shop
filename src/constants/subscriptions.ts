import { BarChart3, CheckCircle2, ClipboardList, Flag, Gift, Handshake, Headphones, LockKeyhole, ShieldCheck, Tag, Trash2, UsersRound, Zap } from "lucide-react";
import type { ElementType } from "react";

export type PlanManagementAction = {
  icon: ElementType;
  title: string;
  description: string;
};

export type SubscriptionFeature = {
  icon: ElementType;
  title: string;
  description: string;
  enabled: boolean;
};

export const planManagementActions: PlanManagementAction[] = [
  {
    icon: BarChart3,
    title: "Revenue Analytics",
    description: "Track churn and MRR per tier",
  },
  {
    icon: Tag,
    title: "Coupon Codes",
    description: "Create promotional discounts",
  },
  {
    icon: Flag,
    title: "Feature Flags",
    description: "Toggle plan-specific features",
  },
  {
    icon: ClipboardList,
    title: "Audit Logs",
    description: "View history of pricing changes",
  },
];

export const subscriptionFeatures: SubscriptionFeature[] = [
  {
    icon: Gift,
    title: "Custom Branding",
    description: "Allow users to add their own logos",
    enabled: true,
  },
  {
    icon: Headphones,
    title: "Priority Support",
    description: "24/7 dedicated support channel",
    enabled: false,
  },
  {
    icon: Zap,
    title: "Advanced Analytics",
    description: "Deep dive reports and exports",
    enabled: true,
  },
  {
    icon: Handshake,
    title: "API Access",
    description: "Integrate with 3rd party services",
    enabled: false,
  },
];

export const subscriptionCreateSteps = [
  { number: "1", title: "Plan Information" },
  { number: "2", title: "Pricing" },
  { number: "3", title: "Features" },
  { number: "4", title: "Usage Limits" },
] as const;

export const subscriptionPlanIcons = {
  users: UsersRound,
  check: CheckCircle2,
  security: ShieldCheck,
  lock: LockKeyhole,
  trash: Trash2,
};
