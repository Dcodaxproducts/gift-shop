import { CheckCircle2, Megaphone, Monitor, Smartphone, User, UsersRound } from "lucide-react";
import type { ElementType } from "react";
import type { BroadcastAudience } from "@/types/broadcast";

export type BroadcastStepId = 1 | 2 | 3;

export type BroadcastStep = {
  id: BroadcastStepId;
  label: string;
};

export type AudienceOption = {
  value: BroadcastAudience;
  icon: ElementType;
  title: string;
  description: string;
};

export const broadcastSteps: BroadcastStep[] = [
  { id: 1, label: "Message" },
  { id: 2, label: "Audience" },
  { id: 3, label: "Send" },
];

export const audienceOptions: AudienceOption[] = [
  {
    value: "ALL_USERS",
    icon: UsersRound,
    title: "All Users",
    description: "Broadcast to everyone",
  },
  {
    value: "PROVIDER",
    icon: User,
    title: "Provider",
    description: "Broadcast to providers",
  },
  {
    value: "USER",
    icon: User,
    title: "User",
    description: "Broadcast to users",
  },
];

export const notificationIcons = {
  phone: Smartphone,
  desktop: Monitor,
  success: CheckCircle2,
  megaphone: Megaphone,
  users: UsersRound,
};
