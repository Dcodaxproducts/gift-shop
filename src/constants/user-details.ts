export type UserDetailTab = "overview" | "transactions" | "gift-history" | "activity-log";

export const userProfile = {
  name: "Alex Johnson",
  username: "@alexjohnson",
  email: "alex.johnson@example.com",
  phone: "+1 (555) 234-5678",
  address: "New York, USA",
  status: "Active",
  joinedAt: "Oct 12, 2023",
  lastActive: "2 hours ago",
  avatarInitials: "AJ",
  subscription: {
    plan: "Premium Plus",
    usage: 78,
    renewsAt: "Renews May 20, 2026",
  },
};

export const userProfileStats = [
  { label: "Orders", value: "24" },
  { label: "Spent", value: "$1.2k" },
] as const;

export const recentActivities = [
  { title: "Logged in from new device", description: "iPhone 14 Pro · New York, US", time: "2h ago", tone: "amber" },
  { title: "Successful payment of $49.00", description: "Premium Plan Renewal · Visa ...4242", time: "Yesterday", tone: "emerald" },
  { title: "Profile information updated", description: "Changed phone number and address", time: "Oct 24, 2023", tone: "blue" },
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
