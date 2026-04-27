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

export const dashboardStats: StatCardData[] = [
  { title: "Total Users", value: "128,430", change: "+12.5%", icon: "users" },
  { title: "Total Providers", value: "1,240", change: "+5.2%", icon: "providers" },
  { title: "Transactions", value: "45,200", change: "+18.1%", icon: "transactions" },
  { title: "Total Revenue", value: "$1.24M", change: "+10.3%", icon: "revenue" },
];

export const monthlyRevenueTrends: RevenueBarData[] = [
  { month: "Jan", value: 42, ghostValue: 70 },
  { month: "Feb", value: 54, ghostValue: 116 },
  { month: "Mar", value: 57, ghostValue: 70 },
  { month: "Apr", value: 45, ghostValue: 70 },
  { month: "May", value: 126, ghostValue: 139 },
  { month: "Jun", value: 53, ghostValue: 70 },
  { month: "Jul", value: 61, ghostValue: 78 },
  { month: "Aug", value: 76, ghostValue: 109 },
];

export const paymentSplit: PaymentSplitData[] = [
  { label: "Gift Cards", value: 65, color: "primary" },
  { label: "Direct Payments", value: 35, color: "muted" },
];
