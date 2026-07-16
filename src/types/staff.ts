export type StaffRole = {
  id: string;
  name: string;
  slug: string;
  description?: string;
};

export type StaffMember = {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  phone: string | null;
  avatarUrl: string | null;
  role: StaffRole;
  status: string;
  createdAt: string;
  lastLoginAt: string | null;
  mustChangePassword?: boolean;
  permissions?: Record<string, string[]>;
};

export type GetStaffParams = {
  page?: number;
  limit?: number;
  search?: string;
  roleId?: string;
  isActive?: boolean;
};


export type CreateStaffPayload = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
  roleId: string;
  isActive?: boolean;
};

export type UpdateStaffPayload = Partial<{
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
  roleId: string;
  avatarUrl: string;
  isActive: boolean;
  reason: string;
}>;

export type UpdateStaffPasswordPayload = {
  temporaryPassword?: string;
  generateTemporaryPassword?: boolean;
  mustChangePassword?: boolean;
  sendInviteEmail?: boolean;
};
