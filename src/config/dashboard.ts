export type DashboardNavItem = {
  title: string;
  href: string;
  icon: string;
  badge?: string;
  permissionKey?: string; // maps to permissions object key
};

export type DashboardNavGroup = {
  title: string;
  items: DashboardNavItem[];
};

export const dashboardNavGroups: DashboardNavGroup[] = [
  {
    title: "Core",
    items: [
      { title: "Dashboard Overview", href: "/", icon: "layout-dashboard" },
    ],
  },
  {
    title: "Administration",
    items: [
      { title: "Staff Users", href: "/staff-users", icon: "badge-check", permissionKey: "admins" },
      { title: "Role & Permissions", href: "/roles-permissions", icon: "shield-check", permissionKey: "roles" }, // Handled by roles permission row
    ],
  },
  {
    title: "Users & Providers",
    items: [
      { title: "Users List", href: "/users", icon: "users", permissionKey: "users" },
      { title: "Provider List", href: "/providers", icon: "id-card", permissionKey: "providers" },
    ],
  },
  {
    title: "Inventory",
    items: [
      { title: "Gift Listings", href: "/gifts", icon: "gift", permissionKey: "giftListings" }, // Added key
      { title: "Gift Categories", href: "/gift-categories", icon: "giftCategories", permissionKey: "giftCategories" }, // Added key
      { title: "Business Categories", href: "/business-categories", icon: "giftCategories", permissionKey: "giftCategories" }, // Added key
    ],
  },
  {
    title: "Financials",
    items: [
      { title: "Transaction Monitoring", href: "/transactions", icon: "chart-line", permissionKey: "transactions" }, // Added key
      { title: "Provider Payouts", href: "/payouts", icon: "credit-card", permissionKey: "payouts" },
      { title: "Dispute & Refund", href: "/disputes-refund", icon: "chart-line", permissionKey: "disputes" },
      // { title: "Provider Dispute", href: "/provider-dispute", icon: "rotate-ccw", permissionKey: "refunds" },
    ],
  },
  // {
  //   title: "Moderation",
  //   items: [
  //     { title: "Social & Reviews Moderation", href: "/social-reviews-moderation", icon: "rss", permissionKey: "moderation" },
  //   ],
  // },
  {
    title: "Communications",
    items: [
      { title: "Create Broadcast", href: "/create-broadcast", icon: "share-2", permissionKey: "broadcasts" },
    ],
  },
  {
    title: "System",
    items: [
      { title: "Subscription Plans", href: "/subscriptions", icon: "calendar-days", permissionKey: "settings" },
      // { title: "System Settings", href: "/settings", icon: "settings", permissionKey: "settings" },
      { title: "Platform Analytics", href: "/platform-analytics", icon: "bar-chart-3", permissionKey: "reports" },
      { title: "Refund Settings", href: "/refund-settings", icon: "bar-chart-3", permissionKey: "reports" },
      { title: "System Logs", href: "/system-logs", icon: "list-todo", permissionKey: "auditLogs" },
    ],
  },
  {
    title: "Support Chat",
    items: [
      { title: "Provider Chat", href: "/provider-chat", icon: "message-circle", permissionKey: "chat" },
      { title: "User Chat", href: "/user-chat", icon: "message-circle", permissionKey: "chat" },
    ],
  },
];

export const dashboardUser = {
  name: "Alex Rivera",
  role: "Super Admin",
  email: "marcus@gifting.com",
  avatarInitials: "AR",
};
