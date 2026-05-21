export type UserStatus = "ALL" | "ACTIVE" | "PENDING" | "SUSPENDED" | "DISABLED";

export type UserSortBy =
  | "createdAt"
  | "firstName"
  | "email"
  | "totalSpent"
  | "ordersCount";

export type SortOrder = "ASC" | "DESC";

export type GetUsersParams = {
  page?: number;
  limit?: number;
  search?: string;
  status?: UserStatus;
  registrationFrom?: string;
  registrationTo?: string;
  sortBy?: UserSortBy;
  sortOrder?: SortOrder;
};

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  fullName?: string;
  email: string;
  phone?: string;
  avatarUrl?: string | null;
  userType?: string;
  role?: string;
  status: Exclude<UserStatus, "ALL">;
  isActive?: boolean;
  isVerified?: boolean;
  registrationDate?: string;
  totalSpent?: number;
  ordersCount?: number;
  createdAt: string;
  updatedAt?: string;
};


export type UserSubscription = {
  planName: string | null;
  planType: string | null;
  renewalDate: string | null;
  progressPercentage: number;
};

export type UserSuspension = {
  isSuspended: boolean;
  reason: string | null;
  comment: string | null;
  suspendedAt: string | null;
  suspendedBy: string | null;
};

export type UserQuickStats = {
  ordersCount: number;
  totalSpent: number;
};

export type UserDetail = User & {
  lastLoginAt: string | null;
  location: string | null;
  subscription: UserSubscription;
  quickStats: UserQuickStats;
  suspension: UserSuspension;
};

export type UpdateUserPayload = Partial<{
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}>;

export type UpdateUserStatusPayload = {
  status: Exclude<UserStatus, "ALL">;
};

export type SuspendUserPayload = {
  reason : string;
  comments?: string;
};

export type ResetUserPasswordPayload = {
  password?: string;
};

export type GetUserActivityParams = {
  page?: number;
  limit?: number;
};
