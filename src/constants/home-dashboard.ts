export type StatCardData = {
  title: string;
  value: string;
  change: string;
  icon: "users" | "providers" | "transactions" | "revenue";
};

export type RevenueBarData = {
  month: string;
  value: number;
  ghostValue: number;
};

export type PaymentSplitData = {
  label: string;
  value: number;
  color: "primary" | "muted";
};

export type ProviderPerformanceData = {
  provider: string;
  shortCode: string;
  successRate: string;
  progress: number;
  volume: string;
  tone: "green" | "amber";
};

export type DisputeData = {
  id: string;
  user: string;
  reason: string;
  status: string;
  tone: "danger" | "warning" | "muted";
};

export const dashboardStats: StatCardData[] = [
  {
    title: "Total Users",
    value: "128,430",
    change: "+12.5%",
    icon: "users",
  },
  {
    title: "Total Providers",
    value: "1,240",
    change: "+5.2%",
    icon: "providers",
  },
  {
    title: "Transactions",
    value: "45,200",
    change: "+18.1%",
    icon: "transactions",
  },
  {
    title: "Total Revenue",
    value: "$1.24M",
    change: "+10.3%",
    icon: "revenue",
  },
];

export const monthlyRevenueTrends: RevenueBarData[] = [
  { month: "Jan", value: 34, ghostValue: 58 },
  { month: "Feb", value: 46, ghostValue: 96 },
  { month: "Mar", value: 52, ghostValue: 58 },
  { month: "Apr", value: 38, ghostValue: 58 },
  { month: "May", value: 118, ghostValue: 132 },
  { month: "Jun", value: 50, ghostValue: 58 },
  { month: "Jul", value: 55, ghostValue: 66 },
  { month: "Aug", value: 70, ghostValue: 88 },
];

export const paymentSplit: PaymentSplitData[] = [
  { label: "Gift Cards", value: 65, color: "primary" },
  { label: "Direct Payments", value: 35, color: "muted" },
];

export const providerPerformance: ProviderPerformanceData[] = [
  {
    provider: "Stripe Integration",
    shortCode: "ST",
    successRate: "99.2%",
    progress: 99.2,
    volume: "$450,230",
    tone: "green",
  },
  {
    provider: "PayPal Connect",
    shortCode: "PY",
    successRate: "97.5%",
    progress: 97.5,
    volume: "$312,900",
    tone: "green",
  },
  {
    provider: "Adyen Global",
    shortCode: "AD",
    successRate: "88.1%",
    progress: 88.1,
    volume: "$124,500",
    tone: "amber",
  },
];

export const recentDisputes: DisputeData[] = [
  {
    id: "#DISP-9021",
    user: "Marcus Wright",
    reason: "Unauthorized transaction",
    status: "High Priority",
    tone: "danger",
  },
  {
    id: "#DISP-8984",
    user: "Elena Gomez",
    reason: "Gift card code invalid",
    status: "Under Review",
    tone: "warning",
  },
  {
    id: "#DISP-8872",
    user: "Sarah Jenkins",
    reason: "Double charged on checkout",
    status: "Pending",
    tone: "muted",
  },
];
