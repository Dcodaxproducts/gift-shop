export type StaffStatus = "Active" | "Inactive";

export type StaffMember = {
  id: string;
  name: string;
  email: string;
  role: string;
  status: StaffStatus;
  initials: string;
  createdAt: string;
};

export const staffMembers: StaffMember[] = [
  { id: "jordan-henderson", name: "Jordan Henderson", email: "jordan.h@example.com", role: "Risk Analyst", status: "Active", initials: "JH", createdAt: "May 02, 2026" },
  { id: "sophia-turner", name: "Sophia Turner", email: "sophia.t@example.com", role: "Support Lead", status: "Active", initials: "ST", createdAt: "Apr 26, 2026" },
  { id: "liam-carter", name: "Liam Carter", email: "liam.c@example.com", role: "Operations Manager", status: "Inactive", initials: "LC", createdAt: "Apr 11, 2026" },
  { id: "ava-bennett", name: "Ava Bennett", email: "ava.b@example.com", role: "Compliance Officer", status: "Active", initials: "AB", createdAt: "Mar 30, 2026" },
];

export const staffPagination = {
  total: 48,
  limit: 4,
  totalPages: 12,
  hasNext: true,
  hasPrevious: false,
};

export const staffPermissionSummary = [
  "User Management",
  "Risk Review",
  "Transaction Oversight",
  "Reporting Access",
] as const;
