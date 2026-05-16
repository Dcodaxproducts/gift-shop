export type DashboardNavItem = {
  title: string;
  href: string;
  icon: string;
  badge?: string;
};

export type DashboardNavGroup = {
  title: string;
  items: DashboardNavItem[];
};

export const dashboardNavGroups: DashboardNavGroup[] = [
  {
    title: "Core",
    items: [
      {
        title: "Dashboard Overview",
        href: "/",
        icon: "layout-dashboard",
      },
    ],
  },
  {
    title: "Administration",
    items: [
      {
        title: "Staff Users",
        href: "/staff-users",
        icon: "badge-check",
      },
      {
        title: "Role & Permissions",
        href: "/roles-permissions",
        icon: "shield-check",
      },
    ],
  },
  {
    title: "Users & Providers",
    items: [
      { title: "Users List", href: "/users", icon: "users" },
      {
        title: "Provider List",
        href: "/providers",
        icon: "id-card",
      },
      {
        title: "Add Provider",
        href: "/providers/create",
        icon: "user-plus",
      },
    ],
  },
  {
    title: "Inventory",
    items: [
      { title: "Gift Listings", href: "/gifts", icon: "gift" },
      { title: "Gift Categories", href: "/gift-categories", icon: "package" },
    ],
  },
  {
    title: "Financials",
    items: [
      {
        title: "Transaction Monitoring",
        href: "/transactions",
        icon: "chart-line",
      },
      {
        title: "Provider Payouts",
        href: "/payouts",
        icon: "credit-card",
      },
      {
        title: "Refund",
        href: "/refund",
        icon: "rotate-ccw",
      },
    ],
  },
  {
    title: "Disputes",
    items: [
      {
        title: "Dispute Management",
        href: "/dispute-management",
        icon: "chart-line",
      },
    ],
  },
  {
    title: "Moderation",
    items: [
      {
        title: "Social & Reviews Moderation",
        href: "/social-reviews-moderation",
        icon: "rss",
      },
    ],
  },
  {
    title: "Communications",
    items: [
      {
        title: "Create Broadcast",
        href: "/create-broadcast",
        icon: "share-2",
      },
    ],
  },
  {
    title: "System",
    items: [
      {
        title: "Referral Settings",
        href: "/referral-settings",
        icon: "share-2",
      },
      {
        title: "Subscription Plans",
        href: "/subscriptions",
        icon: "calendar-days",
      },
      {
        title: "System Settings",
        href: "/settings",
        icon: "settings",
      },
      {
        title: "Platform Analytics",
        href: "/platform-analytics",
        icon: "bar-chart-3",
      },
      {
        title: "System Logs",
        href: "/system-logs",
        icon: "list-todo",
      },
    ],
  },
  {
    title: "Support Chat",
    items: [
      {
        title: "Provider Chat",
        href: "/provider-chat",
        icon: "message-circle",
      },
      {
        title: "User Chat",
        href: "/user-chat",
        icon: "message-circle",
      }
    ],
  },
];

export const dashboardUser = {
  name: "Alex Rivera",
  role: "Super Admin",
  email: "marcus@gifting.com",
  avatarInitials: "AR",
};
