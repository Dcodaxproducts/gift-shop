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
        icon: "users-round",
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
        icon: "store",
      }
    ],
  },
  {
    title: "Inventory",
    items: [
      { title: "Gift Listings", href: "/gifts", icon: "package" }
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
];

export const dashboardUser = {
  name: "Alex Rivera",
  role: "Super Admin",
  email: "marcus@gifting.com",
  avatarInitials: "AR",
};
