export type DashboardNavItem = {
  title: string;
  href: string;
  icon: string;
  badge?: string;
  active?: boolean;
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
        href: "/dashboard",
        icon: "layout-dashboard",
      },
    ],
  },
  {
    title: "Administration",
    items: [
      {
        title: "Admin Users",
        href: "/dashboard/admin-users",
        icon: "users-round",
        active: true,
      },
      {
        title: "Create Admin",
        href: "/dashboard/create-admin",
        icon: "user-plus",
      },
      {
        title: "Role & Permissions",
        href: "/dashboard/roles-permissions",
        icon: "shield-check",
      },
    ],
  },
  {
    title: "Users & Providers",
    items: [
      { title: "Users List", href: "/dashboard/users", icon: "users" },
      { title: "User Details", href: "/dashboard/user-details", icon: "id-card" },
      {
        title: "Create Provider",
        href: "/dashboard/create-provider",
        icon: "briefcase-business",
      },
      {
        title: "Provider List",
        href: "/dashboard/providers",
        icon: "store",
      },
      {
        title: "Provider Approval",
        href: "/dashboard/provider-approval",
        icon: "badge-check",
        badge: "12",
      },
    ],
  },
  {
    title: "Inventory",
    items: [
      { title: "Gift Listings", href: "/dashboard/gifts", icon: "package" },
      { title: "Create Gift", href: "/dashboard/create-gift", icon: "circle-plus" },
    ],
  },
  {
    title: "Financials",
    items: [
      {
        title: "Transaction Monitoring",
        href: "/dashboard/transactions",
        icon: "chart-line",
      },
      {
        title: "Provider Payouts",
        href: "/dashboard/payouts",
        icon: "credit-card",
      },
    ],
  },
  {
    title: "Moderation",
    items: [
      {
        title: "Social Moderation",
        href: "/dashboard/social-moderation",
        icon: "rss",
      },
      {
        title: "Reviews Moderation",
        href: "/dashboard/reviews",
        icon: "star",
      },
    ],
  },
  {
    title: "System",
    items: [
      {
        title: "Referral Settings",
        href: "/dashboard/referral-settings",
        icon: "share-2",
      },
      {
        title: "Subscription Plans",
        href: "/dashboard/subscriptions",
        icon: "calendar-days",
      },
      {
        title: "System Settings",
        href: "/dashboard/settings",
        icon: "settings",
      },
      {
        title: "Platform Analytics",
        href: "/dashboard/platform-analytics",
        icon: "bar-chart-3",
      },
      {
        title: "System Logs",
        href: "/dashboard/system-logs",
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
