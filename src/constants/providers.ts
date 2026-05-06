import { BadgeCheck, Flower2, Gift, Package, Store, TrendingUp, TriangleAlert } from "lucide-react";
import type { ElementType } from "react";

export type ProviderStatus = "Active" | "Pending" | "Inactive";
export type ProviderApproval = "Approved" | "Pending" | "Rejected";
export type ProviderTone = "stripe" | "revolut" | "paypal" | "wise";

export type ProviderDirectoryItem = {
  id: string;
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
    id: "stripe",
    name: "Stripe",
    email: "partners@stripe.com",
    status: "Active",
    approval: "Approved",
    revenue: "$1.2M",
    tone: "stripe",
  },
  {
    id: "revolut",
    name: "Revolut",
    email: "business@revolut.com",
    status: "Pending",
    approval: "Pending",
    revenue: "$850K",
    tone: "revolut",
  },
  {
    id: "paypal",
    name: "PayPal",
    email: "enterprise@paypal.com",
    status: "Active",
    approval: "Approved",
    revenue: "$950K",
    tone: "paypal",
  },
  {
    id: "wise",
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

export type ProviderDetailStat = {
  icon: ElementType;
  label: string;
  value: string;
  change: string;
  changeTone: "green" | "orange";
};

export type ProviderListedItem = {
  icon: ElementType;
  name: string;
  price: string;
  units: string;
  percent: number;
  status: "Active" | "Out of Stock";
  tone: "purple" | "blue" | "violet";
};

export const providerDetailStats: ProviderDetailStat[] = [
  {
    icon: TrendingUp,
    label: "Performance Stats",
    value: "94.8%",
    change: "+2.4%",
    changeTone: "green",
  },
  {
    icon: Store,
    label: "Listed Items",
    value: "1,240",
    change: "+120",
    changeTone: "green",
  },
  {
    icon: BadgeCheck,
    label: "Order Fulfillment",
    value: "98.2%",
    change: "+0.5%",
    changeTone: "green",
  },
  {
    icon: TriangleAlert,
    label: "Dispute Count",
    value: "5",
    change: "-1%",
    changeTone: "orange",
  },
];

export const providerListedItems: ProviderListedItem[] = [
  {
    icon: Gift,
    name: "Premium Gift Box",
    price: "$45.00",
    units: "850 units",
    percent: 70,
    status: "Active",
    tone: "purple",
  },
  {
    icon: BadgeCheck,
    name: "Digital Voucher",
    price: "$10.00",
    units: "2,100 units",
    percent: 95,
    status: "Active",
    tone: "violet",
  },
  {
    icon: Flower2,
    name: "Flower Bouquet",
    price: "$35.00",
    units: "420 units",
    percent: 40,
    status: "Out of Stock",
    tone: "violet",
  },
  {
    icon: Package,
    name: "Luxury Hamper",
    price: "$120.00",
    units: "150 units",
    percent: 25,
    status: "Active",
    tone: "purple",
  },
  {
    icon: Flower2,
    name: "Flower Bouquet",
    price: "$35.00",
    units: "420 units",
    percent: 40,
    status: "Out of Stock",
    tone: "violet",
  },
];

export const providerBusinessDetails = [
  { label: "Provider ID", value: "PROV-88219-X" },
  { label: "Company Name", value: "Gifts & Blooms Co. Ltd" },
  { label: "Contact Email", value: "contact@giftsandblooms.com" },
  { label: "Headquarters", value: "New York, USA" },
  { label: "Registered Since", value: "Jan 12, 2023" },
] as const;

export const providerDetailActions = [
  {
    label: "Approve",
    icon: "approve",
    className: "bg-green-500! text-white hover:bg-green-600",
  },
  {
    label: "Reject",
    icon: "reject",
    className: "bg-red-500 text-white hover:bg-red-600",
  },
  {
    label: "Message Provider",
    icon: "message",
    className: "bg-slate-100 text-slate-900 shadow-none hover:bg-slate-200",
  },
  {
    label: "Suspend Account",
    icon: "suspend",
    className: "bg-slate-100 text-slate-900 shadow-none hover:bg-slate-200",
  },
] as const;

export const providerListedItemsPagination = {
  total: 1284,
  limit: 4,
  totalPages: 321,
  hasNext: true,
  hasPrevious: false,
};
