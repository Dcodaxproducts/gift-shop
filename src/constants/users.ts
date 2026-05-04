export type RegisteredUserStatus = "Active" | "Inactive" | "Suspended";
export type UserTone = "blue" | "purple" | "amber" | "emerald" | "rose";

export type RegisteredUser = {
  id: number;
  name: string;
  email: string;
  phone: string;
  registeredAt: string;
  transactions: string;
  status: RegisteredUserStatus;
  tone: UserTone;
};

export const registeredUsersStats = [
  { title: "Total Users", value: "24,892", change: "+14% from last month", tone: "blue" },
  { title: "New This Month", value: "1,284", change: "+8% from last month", tone: "emerald" },
  { title: "Active Users", value: "18,421", change: "+11% from last month", tone: "purple" },
  { title: "Suspended", value: "86", change: "-2% from last month", tone: "rose" },
] as const;

export const registeredUsers: RegisteredUser[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    phone: "+1 (555) 123-4567",
    registeredAt: "Jan 12, 2026",
    transactions: "$12,450",
    status: "Active",
    tone: "blue",
  },
  {
    id: 2,
    name: "Michael Chen",
    email: "michael.chen@email.com",
    phone: "+1 (555) 234-5678",
    registeredAt: "Jan 09, 2026",
    transactions: "$8,920",
    status: "Active",
    tone: "purple",
  },
  {
    id: 3,
    name: "Emma Wilson",
    email: "emma.wilson@email.com",
    phone: "+1 (555) 345-6789",
    registeredAt: "Dec 28, 2025",
    transactions: "$4,310",
    status: "Inactive",
    tone: "amber",
  },
  {
    id: 4,
    name: "David Rodriguez",
    email: "david.rodriguez@email.com",
    phone: "+1 (555) 456-7890",
    registeredAt: "Dec 21, 2025",
    transactions: "$15,780",
    status: "Suspended",
    tone: "rose",
  },
  {
    id: 5,
    name: "Olivia Brown",
    email: "olivia.brown@email.com",
    phone: "+1 (555) 567-8901",
    registeredAt: "Dec 16, 2025",
    transactions: "$6,540",
    status: "Active",
    tone: "emerald",
  },
];

export const registeredUsersPagination = {
  total: 24892,
  limit: 5,
  totalPages: 4979,
  hasNext: true,
  hasPrevious: false,
};
