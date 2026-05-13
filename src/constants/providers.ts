import { BadgeCheck, Flower2, Gift, Package, Store, TrendingUp, TriangleAlert } from "lucide-react";
import type { ElementType } from "react";

export type ProviderTone = "purple" | "slate" | "blue" | "emerald";

export const providerToneClass: Record<ProviderTone, string> = {
  purple: "bg-[#635BFF] text-white",
  slate: "bg-slate-950 text-white",
  blue: "bg-[#0070BA] text-white",
  emerald: "bg-[#9FE870] text-[#163300]",
};

export const providerTones: ProviderTone[] = ["purple", "slate", "blue", "emerald"];

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
    status: "APPROVE",
    className: "bg-green-500! text-white hover:bg-green-600",
  },
  {
    label: "Reject",
    icon: "reject",
    status: "REJECT",
    className: "bg-red-500 text-white hover:bg-red-600",
  },
  {
    label: "Message Provider",
    icon: "message",
    status: "UPDATE_STATUS",
    className: "bg-slate-100 text-slate-900 shadow-none hover:bg-slate-200",
  },
  {
    label: "Suspend Account",
    icon: "suspend",
    status: "SUSPEND",
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
