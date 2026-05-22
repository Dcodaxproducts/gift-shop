export type DisputeRefundStatus = "OPEN" | "IN_REVIEW" | "ESCALATED" | "RESOLVED";
export type DisputeRefundPriority = "HIGH" | "MEDIUM" | "LOW";

export type DisputeRefundCase = {
  id: string;
  customerName: string;
  customerEmail: string;
  transactionId: string;
  amount: number;
  category: string;
  priority: DisputeRefundPriority;
  status: DisputeRefundStatus;
  daysOpen: number;
};

export const disputeRefundStats = [
  {
    label: "Open Cases",
    value: "12",
    change: "+2 today",
    tone: "primary",
    icon: "users",
  },
  {
    label: "Awaiting Action",
    value: "05",
    change: "+5.2%",
    tone: "primary",
    icon: "store",
  },
  {
    label: "Escalated",
    value: "02",
    change: "+18.1%",
    tone: "danger",
    icon: "shuffle",
  },
  {
    label: "Resolved This Week",
    value: "25",
    change: "+10.3%",
    tone: "primary",
    icon: "refund",
  },
] as const;

export const disputeRefundCategoryOptions = [
  { value: "all", label: "All Categories" },
  { value: "delivery", label: "Delivery" },
  { value: "payment", label: "Payment" },
  { value: "quality", label: "Quality" },
  { value: "refund", label: "Refund" },
] as const;

export const disputeRefundStatusOptions = [
  { value: "all", label: "All Status" },
  { value: "OPEN", label: "Open" },
  { value: "IN_REVIEW", label: "In Review" },
  { value: "ESCALATED", label: "Escalated" },
  { value: "RESOLVED", label: "Resolved" },
] as const;

export const disputeRefundCases: DisputeRefundCase[] = [
  {
    id: "#DIS-9842",
    customerName: "Eleanor Pena",
    customerEmail: "eleanor.p@gmail.com",
    transactionId: "TRX-78229410",
    amount: 492,
    category: "payment",
    priority: "HIGH",
    status: "ESCALATED",
    daysOpen: 8,
  },
  {
    id: "#DIS-9843",
    customerName: "Albert Flores",
    customerEmail: "albert.f@enterprise.com",
    transactionId: "TRX-99018274",
    amount: 1204.5,
    category: "refund",
    priority: "MEDIUM",
    status: "IN_REVIEW",
    daysOpen: 3,
  },
  {
    id: "#DIS-9844",
    customerName: "Jane Cooper",
    customerEmail: "jane.coop@icloud.com",
    transactionId: "TRX-11203948",
    amount: 89.99,
    category: "quality",
    priority: "LOW",
    status: "OPEN",
    daysOpen: 1,
  },
  {
    id: "#DIS-9845",
    customerName: "Guy Hawkins",
    customerEmail: "guy.h@outlook.com",
    transactionId: "TRX-88273645",
    amount: 250,
    category: "delivery",
    priority: "MEDIUM",
    status: "RESOLVED",
    daysOpen: 12,
  },
];
