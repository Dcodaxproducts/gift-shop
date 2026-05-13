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