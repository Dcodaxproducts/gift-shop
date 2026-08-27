export type DashboardNavItem = {
  title: string;
  href: string;
  icon: string;
  badge?: string;
  permissionKey?: string; // maps to permissions object key
  superAdminOnly?: boolean; // visible only to super admin, hidden from staff
};

export type DashboardNavGroup = {
  title: string;
  items: DashboardNavItem[];
};

export const dashboardNavGroups: DashboardNavGroup[] = [
  {
    title: "Core",
    items: [
      { title: "Dashboard Overview", href: "/", icon: "layout-dashboard", permissionKey: "dashboard" },
    ],
  },
  {
    title: "Administration",
    items: [
      { title: "Staff Users", href: "/staff-users", icon: "badge-check", permissionKey: "staffUsers", superAdminOnly: true },
      { title: "Role & Permissions", href: "/roles-permissions", icon: "shield-check", permissionKey: "rolesPermissions", superAdminOnly: true },
    ],
  },
  {
    title: "Users & Providers",
    items: [
      { title: "Users List", href: "/users", icon: "users", permissionKey: "users" },
      { title: "Provider List", href: "/providers", icon: "id-card", permissionKey: "providers" },
      { title: "Document Management", href: "/documents", icon: "file-text", permissionKey: "documents" },
    ],
  },
  {
    title: "Inventory",
    items: [
      { title: "Gift Listings", href: "/gifts", icon: "gift", permissionKey: "gifts" },
      { title: "Gift Categories", href: "/gift-categories", icon: "giftCategories", permissionKey: "giftCategories" },
      { title: "Business Categories", href: "/business-categories", icon: "giftCategories", permissionKey: "providerBusinessCategories" },
      { title: "Seasonal Themes", href: "/seasonal-themes", icon: "palette", permissionKey: "seasonalThemes" },
    ],
  },
  {
    title: "Financials",
    items: [
      { title: "Transaction Monitoring", href: "/transactions", icon: "chart-line", permissionKey: "transactions" },
      { title: "Provider Payouts", href: "/payouts", icon: "credit-card", permissionKey: "providerPayouts" },
      { title: "Dispute & Refund", href: "/disputes-refund", icon: "chart-line", permissionKey: "disputes" },
    ],
  },
  {
    title: "Communications",
    items: [
      { title: "Create Broadcast", href: "/create-broadcast", icon: "share-2", permissionKey: "broadcasts" },
    ],
  },
  {
    title: "System",
    items: [
      { title: "Subscription Plans", href: "/subscriptions", icon: "calendar-days", permissionKey: "subscriptionPlans" },
      { title: "System Settings", href: "/settings", icon: "settings", permissionKey: "systemSettings" },
      { title: "Platform Analytics", href: "/platform-analytics", icon: "bar-chart-3", permissionKey: "analytics" },
      { title: "Refund Settings", href: "/refund-settings", icon: "bar-chart-3", permissionKey: "refundPolicies" },
      { title: "Audit Logs", href: "/audit-logs", icon: "list-todo", permissionKey: "auditLogs" },
      { title: "System Health", href: "/system-health", icon: "list-todo", permissionKey: "systemHealth" },
    ],
  },
];

export const dashboardUser = {
  name: "Super Admin",
  role: "Super Admin",
  email: "marcus@gifting.com",
  avatarInitials: "GS",
};
