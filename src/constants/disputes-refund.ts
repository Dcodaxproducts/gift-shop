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

export type DisputeEvidenceFile = {
  name: string;
  type: "pdf" | "image" | "text";
};

export type TransactionTimelineItem = {
  label: string;
  date: string;
  status?: string;
  state: "complete" | "current" | "pending";
};

export type DisputeRefundDetail = DisputeRefundCase & {
  disputeTitle: string;
  disputeReason: string;
  resolutionDeadline: string;
  paymentStatus: string;
  refundEligible: string;
  processorAuthCode: string;
  evidence: DisputeEvidenceFile[];
  timeline: TransactionTimelineItem[];
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

export const disputeRefundDetails: DisputeRefundDetail[] = [
  {
    id: "#DSP-1024",
    customerName: "Jane Doe",
    customerEmail: "jane.doe@example.com",
    transactionId: "TXN-789012",
    amount: 129.99,
    category: "delivery",
    priority: "HIGH",
    status: "IN_REVIEW",
    daysOpen: 6,
    disputeTitle: "Dispute Details & Evidence Review",
    disputeReason: "Product not received",
    resolutionDeadline: "22h 14m remaining",
    paymentStatus: "Captured",
    refundEligible: "Yes",
    processorAuthCode: "AUTH-9921-X",
    evidence: [
      { name: "Order confirmation.pdf", type: "pdf" },
      { name: "Shipping_tracking.png", type: "image" },
      { name: "Customer_message.txt", type: "text" },
    ],
    timeline: [
      { label: "Order placed", date: "Apr 1, 09:12 AM", state: "complete" },
      { label: "Shipped", date: "Apr 2, 02:45 PM", state: "current" },
      { label: "Delivered Pending", date: "Estimated Apr 5", state: "pending" },
    ],
  },
];

export function getDisputeRefundDetail(id: string) {
  const normalizedId = decodeURIComponent(id).replace(/^#?/, "").toLowerCase();

  return (
    disputeRefundDetails.find((item) => item.id.replace(/^#/, "").toLowerCase() === normalizedId) ??
    disputeRefundDetails[0]
  );
}
