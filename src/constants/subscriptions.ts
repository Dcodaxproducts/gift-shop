import { BarChart3, CheckCircle2, ClipboardList, Flag, Gift, Handshake, Headphones, LockKeyhole, ShieldCheck, Tag, Trash2, UsersRound, Zap } from "lucide-react";
import type { ElementType } from "react";

export type SubscriptionPlan = {
  id: string;
  name: string;
  tier: string;
  price: string;
  period: string;
  users: string;
  features: string[];
  isPopular?: boolean;
};

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

export type SubscriptionEditFeature = {
  title: string;
};

export const subscriptionPlans: SubscriptionPlan[] = [
  {
    id: "basic",
    name: "Basic",
    tier: "Starter",
    price: "$29",
    period: "/month",
    users: "1,240 Users",
    features: [
      "Up to 10 orders",
      "Basic Analytics",
      "Email Support",
      "Community Access",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    tier: "Growth",
    price: "$99",
    period: "/month",
    users: "8,520 Users",
    isPopular: true,
    features: [
      "Unlimited orders",
      "Advanced Analytics",
      "24/7 Priority Support",
      "Custom Domains",
      "Team Collaboration Tools",
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    tier: "Scale",
    price: "$299",
    period: "/month",
    users: "450 Users",
    features: [
      "Everything in Pro",
      "SSO & SAML Security",
      "Dedicated Account Manager",
      "Custom Contracts & SLA",
    ],
  },
];

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

export const editSubscriptionPlan = {
  name: "Pro Tier",
  description: "Best for growing teams and advanced professional projects. Includes all essential features plus priority support and automation.",
  monthlyPrice: "49",
  yearlyPrice: "499",
  subscribers: "1,240",
  subscriberChange: "+5.2%",
  features: [
    { title: "Up to 25 team members" },
    { title: "100GB Cloud Storage" },
    { title: "Custom API Access" },
  ] satisfies SubscriptionEditFeature[],
  visibility: "public",
} as const;

export const subscriptionPlanIcons = {
  users: UsersRound,
  check: CheckCircle2,
  security: ShieldCheck,
  lock: LockKeyhole,
  trash: Trash2,
};
