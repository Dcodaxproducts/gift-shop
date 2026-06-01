// Staff filter options
export const staffRoleOptions = [
  { value: "all", label: "All Roles" },
  { value: "risk-analyst", label: "Risk Analyst" },
  { value: "support-lead", label: "Support Lead" },
  { value: "operations-manager", label: "Operations Manager" },
  { value: "compliance-officer", label: "Compliance Officer" },
] as const;

export const staffStatusOptions = [
  { value: "all", label: "All Status" },
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
] as const;

// User status options
export const userStatusOptions = [
  { value: "all", label: "All Status" },
  { value: "ACTIVE", label: "Active" },
  { value: "PENDING", label: "Pending" },
  { value: "SUSPENDED", label: "Suspended" },
  { value: "DISABLED", label: "Disabled" },
] as const;

// User sort options
export const userSortOptions = [
  { value: "createdAt", label: "Newest First" },
  { value: "firstName", label: "Name (A-Z)" },
  { value: "email", label: "Email (A-Z)" },
  { value: "totalSpent", label: "High Value" },
  { value: "ordersCount", label: "Most Orders" },
] as const;

// Provider status options
export const providerStatusOptions = [
  { value: "all", label: "All Status" },
  { value: "ACTIVE", label: "Active" },
  { value: "PENDING", label: "Pending" },
  { value: "INACTIVE", label: "Inactive" },
  { value: "SUSPENDED", label: "Suspended" },
] as const;

// Provider approval options
export const providerApprovalOptions = [
  { value: "all", label: "All Approvals" },
  { value: "APPROVED", label: "Approved" },
  { value: "PENDING", label: "Pending" },
  { value: "REJECTED", label: "Rejected" },
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

// Provider dispute filter options
export const providerDisputeCategoryOptions = [
  { value: "all", label: "All Categories" },
  { value: "non-delivery", label: "Non-Delivery" },
  { value: "quality-issue", label: "Quality Issue" },
  { value: "refund-conflict", label: "Refund Conflict" },
] as const;

export const providerDisputeStatusOptions = [
  { value: "all", label: "All Status" },
  { value: "RULING_PENDING", label: "Ruling Pending" },
  { value: "AWAITING_INFO", label: "Awaiting Info" },
  { value: "ESCALATED", label: "Escalated" },
] as const;
