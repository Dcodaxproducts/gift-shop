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
        href: "/",
        icon: "layout-dashboard",
      },
    ],
  },
  {
    title: "Administration",
    items: [
      {
        title: "Admin Users",
        href: "/admin-users",
        icon: "users-round",
        active: true,
      },
      {
        title: "Create Admin",
        href: "/create-admin",
        icon: "user-plus",
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
      { title: "User Details", href: "/user-details", icon: "id-card" },
      {
        title: "Create Provider",
        href: "/create-provider",
        icon: "briefcase-business",
      },
      {
        title: "Provider List",
        href: "/providers",
        icon: "store",
      },
      {
        title: "Provider Approval",
        href: "/provider-approval",
        icon: "badge-check",
        badge: "12",
      },
    ],
  },
  {
    title: "Inventory",
    items: [
      { title: "Gift Listings", href: "/gifts", icon: "package" },
      { title: "Create Gift", href: "/create-gift", icon: "circle-plus" },
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
        title: "Social Moderation",
        href: "/social-moderation",
        icon: "rss",
      },
      {
        title: "Reviews Moderation",
        href: "/reviews",
        icon: "star",
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
