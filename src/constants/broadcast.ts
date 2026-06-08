import { AtSign, CalendarDays, CheckCircle2, Clock3, ImageIcon, Link2, Megaphone, Monitor, Radio, Repeat2, Send, Smartphone, Sparkles, User, UsersRound, Zap } from "lucide-react";
import type { ElementType } from "react";

export type BroadcastStepId = 1 | 2 | 3 | 4;

export type BroadcastStep = {
  id: BroadcastStepId;
  label: string;
};

export type AudienceOption = {
  icon: ElementType;
  title: string;
  description: string;
};

export type SummaryItem = {
  icon: ElementType;
  label: string;
  value: string;
};

export type ChannelMetric = {
  label: string;
  value: string;
};

export const broadcastSteps: BroadcastStep[] = [
  { id: 1, label: "Content" },
  { id: 2, label: "Targeting" },
  { id: 3, label: "Schedule" },
];

export const audienceOptions: AudienceOption[] = [
  {
    icon: UsersRound,
    title: "All Users",
    description: "Broadcast to everyone",
  },
  {
    icon: User,
    title: "Provider",
    description: "Broadcast to providers",
  },
  {
    icon: User,
    title: "User",
    description: "Broadcast to users",
  },
];

export const audienceRoles = ["Admin", "Provider", "User"] as const;

export const campaignSummary: SummaryItem[] = [
  { icon: Radio, label: "Campaign Name", value: "Summer Sale Launch Event" },
  { icon: CalendarDays, label: "Scheduled For", value: "Nov 24, 2024 at 09:00 AM" },
  { icon: UsersRound, label: "Estimated Reach", value: "124,430 Users" },
];

export const deliverySummary = [
  { icon: Zap, label: "Priority", value: "High" },
  { icon: AtSign, label: "Channel", value: "Email & Push" },
] as const;

export const channelMetrics: ChannelMetric[] = [
  { label: "Email Delivery", value: "110,200" },
  { label: "Push Notifications", value: "14,230" },
];

export const finalPreviewDetails = {
  campaign: "Summer Sale Launch Event",
  audience: "iOS & Android Active Users",
  reach: "124,430",
  networkStatus: "Optimal delivery window predicted at 10:00 AM local time.",
} as const;

export const notificationIcons = {
  image: ImageIcon,
  link: Link2,
  phone: Smartphone,
  desktop: Monitor,
  clock: Clock3,
  repeat: Repeat2,
  send: Send,
  success: CheckCircle2,
  megaphone: Megaphone,
  sparkles: Sparkles,
  users: UsersRound,
  calendar: CalendarDays,
};
