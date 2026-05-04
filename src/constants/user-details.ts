export type UserDetailTab = "overview" | "transactions" | "gift-history" | "activity-log";

export const userProfile = {
  name: "Alex Johnson",
  username: "@alexjohnson",
  email: "alex.johnson@email.com",
  phone: "+1 (555) 123-4567",
  address: "123 Market Street, San Francisco, CA",
  status: "Active",
  joinedAt: "January 12, 2026",
  lastActive: "2 hours ago",
  avatarInitials: "AJ",
  subscription: {
    plan: "Premium Plus",
    usage: 78,
    renewsAt: "Renews May 20, 2026",
  },
};

export const userProfileStats = [
  { label: "Total Gifts", value: "128" },
  { label: "Transactions", value: "$12.4K" },
  { label: "Reward Points", value: "8,420" },
] as const;

export const recentActivities = [
  { title: "Purchased Premium Gift Box", time: "2 hours ago", tone: "emerald" },
  { title: "Updated billing information", time: "Yesterday", tone: "blue" },
  { title: "Redeemed 450 reward points", time: "2 days ago", tone: "amber" },
] as const;

export const userTransactions = [
  { id: "TX-10284", title: "Premium Gift Box", date: "May 03, 2026", amount: "$240", status: "Completed" },
  { id: "TX-10231", title: "Birthday Bundle", date: "Apr 28, 2026", amount: "$180", status: "Completed" },
  { id: "TX-10188", title: "Subscription Renewal", date: "Apr 20, 2026", amount: "$49", status: "Completed" },
] as const;

export const giftHistory = [
  { title: "Wellness Gift Set", recipient: "Emma Wilson", date: "Apr 30, 2026" },
  { title: "Luxury Chocolate Box", recipient: "Michael Chen", date: "Apr 18, 2026" },
  { title: "Digital Gift Card", recipient: "Sarah Johnson", date: "Apr 05, 2026" },
] as const;

export const activityLog = [
  { title: "Logged in from Chrome on macOS", time: "Today, 10:24 AM" },
  { title: "Changed notification preferences", time: "Yesterday, 04:11 PM" },
  { title: "Connected PayPal payment method", time: "Apr 26, 2026" },
] as const;
