export type StaffStatus = "Active" | "Inactive";

export type StaffMember = {
  id: string;
  name: string;
  email: string;
  role: string;
  status: StaffStatus;
  initials: string;
};

export const staffMembers: StaffMember[] = [
  { id: "jordan-henderson", name: "Jordan Henderson", email: "jordan.h@example.com", role: "Risk Analyst", status: "Active", initials: "JH" },
  { id: "sophia-turner", name: "Sophia Turner", email: "sophia.t@example.com", role: "Support Lead", status: "Active", initials: "ST" },
  { id: "liam-carter", name: "Liam Carter", email: "liam.c@example.com", role: "Operations Manager", status: "Inactive", initials: "LC" },
];

export const staffPermissionSummary = [
  "User Management",
  "Risk Review",
  "Transaction Oversight",
  "Reporting Access",
] as const;
