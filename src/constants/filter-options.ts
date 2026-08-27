// Staff filter options
export const staffRoleOptions = [
  { value: "all", label: "All Roles" },
  { value: "risk-analyst", label: "Risk Analyst" },
  { value: "support-lead", label: "Support Lead" },
  { value: "operations-manager", label: "Operations Manager" },
  { value: "compliance-officer", label: "Compliance Officer" },
] as const;

export const staffStatusOptions = [
  { value: "ALL", label: "All Status" },
  { value: "ACTIVE", label: "Active" },
  { value: "DISABLED", label: "Inactive" },
] as const;

// User status options
export const userStatusOptions = [
  { value: "all", label: "All Status" },
  { value: "PENDING", label: "Pending" },
  { value: "APPROVED", label: "Approved" },
  { value: "REJECTED", label: "Rejected" },
  { value: "SUSPENDED", label: "Suspended" },
  { value: "BLOCKED", label: "Blocked" },
] as const;

// Provider status options
export const providerStatusOptions = [
  { value: "all", label: "All Status" },
  { value: "ACTIVE", label: "Active" },
  { value: "PENDING", label: "Pending" },
  { value: "INACTIVE", label: "Inactive" },
  { value: "SUSPENDED", label: "Suspended" },
] as const;

// Dispute refund filter options
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

export const transactionTypeOptions = [
  { value: "all", label: "All" },
  { value: "PAYMENT", label: "Payment" },
  { value: "GIFT", label: "Gift" },
  { value: "WITHDRAWAL", label: "Withdrawal" },
  { value: "SUBSCRIPTION_PAYMENT", label: "Subscription Payment" },
  { value: "RECURRING_PAYMENT", label: "Recurring Payment" },
  { value: "WALLET_TOP_UP", label: "Wallet Top-up" },
] as const;

export const transactionStatusOptions = [
  { value: "all", label: "Status" },
  { value: "SUCCESS", label: "Success" },
  { value: "PENDING", label: "Pending" },
  { value: "FAILED", label: "Failed" },
] as const;

export const auditLogStatusOptions = [
  { value: "all", label: "Status" },
  { value: "SUCCESS", label: "Success" },
  { value: "FAILED", label: "Failed" },
  { value: "PENDING", label: "Pending" },
  { value: "WARNING", label: "Warning" },
] as const;

export const auditLogSeverityOptions = [
  { value: "all", label: "Severity" },
  { value: "LOW", label: "Low" },
  { value: "MEDIUM", label: "Medium" },
  { value: "HIGH", label: "High" },
  { value: "CRITICAL", label: "Critical" },
] as const;

export const giftStatusOptions = [
  { value: "all", label: "All Status" },
  { value: "ACTIVE", label: "Active" },
  { value: "INACTIVE", label: "Inactive" },
] as const;