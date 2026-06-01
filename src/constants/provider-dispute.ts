export type ProviderDisputeStatus = "RULING_PENDING" | "AWAITING_INFO" | "ESCALATED";

export type ProviderDisputeCase = {
  id: string;
  providerName: string;
  stakeholderName: string;
  stakeholderTier: string;
  transactionId: string;
  syncStatus: "Verified" | "Pending Sync";
  category: "non-delivery" | "quality-issue" | "refund-conflict";
  categoryLabel: string;
  amount: number;
  status: ProviderDisputeStatus;
  lifecycleDays: number;
};

export const providerDisputeStats = [
  {
    label: "Critical open cases",
    value: "08",
    caption: "Action Required Today",
    tone: "default",
  },
  {
    label: "Evidence phase",
    value: "03",
    tone: "default",
  },
  {
    label: "Under review",
    value: "04",
    tone: "default",
  },
  {
    label: "Escalations",
    value: "01",
    tone: "danger",
  },
  {
    label: "Performance",
    value: "14 Resolved This Week",
    tone: "success",
  },
] as const;

export const providerDisputeCases: ProviderDisputeCase[] = [
  {
    id: "#PRV-101",
    providerName: "Acme Corp",
    stakeholderName: "John Smith",
    stakeholderTier: "Tier 1",
    transactionId: "TXN-998",
    syncStatus: "Verified",
    category: "non-delivery",
    categoryLabel: "Non-Delivery",
    amount: 650,
    status: "RULING_PENDING",
    lifecycleDays: 5,
  },
  {
    id: "#PRV-102",
    providerName: "Global Logistics",
    stakeholderName: "Jane Doe",
    stakeholderTier: "Standard",
    transactionId: "TXN-772",
    syncStatus: "Pending Sync",
    category: "quality-issue",
    categoryLabel: "Quality Issue",
    amount: 120,
    status: "AWAITING_INFO",
    lifecycleDays: 12,
  },
  {
    id: "#PRV-105",
    providerName: "TechSolutions Inc",
    stakeholderName: "Mark Peterson",
    stakeholderTier: "VIP",
    transactionId: "TXN-501",
    syncStatus: "Verified",
    category: "refund-conflict",
    categoryLabel: "Refund Conflict",
    amount: 2450,
    status: "ESCALATED",
    lifecycleDays: 15,
  },
];
