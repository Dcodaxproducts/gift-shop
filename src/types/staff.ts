export type StaffRole = {
  id: string;
  name: string;
  slug: string;
};

export type StaffMember = {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  phone: string | null;
  title?: string | null;
  role: StaffRole;
  isActive: boolean;
  isVerified: boolean;
  createdAt: string;
  lastLoginAt: string | null;
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
  temporaryPassword?: string;
  generateTemporaryPassword?: boolean;
  mustChangePassword?: boolean;
  firstName: string;
  lastName: string;
  phone?: string;
  title?: string;
  roleId: string;
  isActive?: boolean;
  sendInviteEmail?: boolean;
};

export type UpdateStaffPayload = Partial<{
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  title: string;
  roleId: string;
  isActive : boolean
}>;

export type UpdateStaffActiveStatusPayload = {
  isActive: boolean;
};

export type UpdateStaffPasswordPayload = {
  temporaryPassword?: string;
  generateTemporaryPassword?: boolean;
  mustChangePassword?: boolean;
  sendInviteEmail?: boolean;
};
