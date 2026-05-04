export type ProviderStatus = "Active" | "Pending" | "Inactive";
export type ProviderApproval = "Approved" | "Pending" | "Rejected";
export type ProviderTone = "stripe" | "revolut" | "paypal" | "wise";

export type ProviderDirectoryItem = {
  name: string;
  email: string;
  status: ProviderStatus;
  approval: ProviderApproval;
  revenue: string;
  tone: ProviderTone;
};

export const providerStats = [
  {
    title: "Total Providers",
    value: "1,284",
    change: "+12%",
    helper: "from last month",
    tone: "blue",
  },
  {
    title: "Pending Approval",
    value: "42",
    change: "High Priority",
    helper: "needs review",
    tone: "amber",
  },
  {
    title: "Active Revenue",
    value: "$4.2M",
    change: "+18.5%",
    helper: "from last month",
    tone: "emerald",
  },
  {
    title: "Inactive Rate",
    value: "2.4%",
    change: "-0.8%",
    helper: "from last month",
    tone: "rose",
  },
] as const;

export const providerDirectoryItems: ProviderDirectoryItem[] = [
  {
    name: "Stripe",
    email: "partners@stripe.com",
    status: "Active",
    approval: "Approved",
    revenue: "$1.2M",
    tone: "stripe",
  },
  {
    name: "Revolut",
    email: "business@revolut.com",
    status: "Pending",
    approval: "Pending",
    revenue: "$850K",
    tone: "revolut",
  },
  {
    name: "PayPal",
    email: "enterprise@paypal.com",
    status: "Active",
    approval: "Approved",
    revenue: "$950K",
    tone: "paypal",
  },
  {
    name: "Wise",
    email: "providers@wise.com",
    status: "Inactive",
    approval: "Rejected",
    revenue: "$340K",
    tone: "wise",
  },
];

export const providerPagination = {
  total: 1284,
  limit: 4,
  totalPages: 321,
  hasNext: true,
  hasPrevious: false,
};
