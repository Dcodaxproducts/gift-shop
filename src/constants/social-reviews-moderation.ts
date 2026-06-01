export type ReviewActivityStatus = "FLAGGED" | "APPROVED" | "HIDDEN";

export type ReviewActivity = {
  time: string;
  reviewer: string;
  action: ReviewActivityStatus;
  moderator: string;
};

export const reviewSystemStats = [
  {
    label: "Total Reviews",
    value: "12,484",
    change: "+2.4%",
    icon: "reviews",
    tone: "primary",
  },
  {
    label: "Flagged Pending",
    value: "23",
    badge: "Urgent",
    icon: "flag",
    tone: "danger",
  },
  {
    label: "Hidden Reviews",
    value: "156",
    icon: "hidden",
    tone: "muted",
  },
  {
    label: "Avg. Rating (30d)",
    value: "4.2",
    suffix: "/5 stars",
    icon: "star",
    tone: "primary",
  },
] as const;

export const reviewQuickActions = [
  {
    title: "Configure Policies",
    icon: "settings",
  },
  {
    title: "Moderate Flagged(23)",
    icon: "flag",
  },
  {
    title: "Visibility Rules",
    icon: "eye",
  },
] as const;

export const reviewActivities: ReviewActivity[] = [
  {
    time: "2 hours ago",
    reviewer: "Amelia Harper",
    action: "FLAGGED",
    moderator: "admin_jdoe",
  },
  {
    time: "4 hours ago",
    reviewer: "Noah Wilson",
    action: "APPROVED",
    moderator: "admin_jdoe",
  },
  {
    time: "Yesterday",
    reviewer: "Sophia Chen",
    action: "HIDDEN",
    moderator: "moderator_khan",
  },
];

export const reviewerEligibilityOptions = [
  "Any registered user",
  "Verified purchase only",
  "Users with 1+ completed booking",
] as const;

export const requiredReviewFields = [
  { label: "Rating (1-5 stars)", checked: true },
  { label: "Title", checked: true },
  { label: "Comment text", checked: true },
  { label: "Photo upload", checked: false },
  { label: "Video upload", checked: false },
] as const;
