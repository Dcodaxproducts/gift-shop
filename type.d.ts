declare global {
  type LoginPayload = {
    email: string;
    password: string;
  };

  type VerifyAuthPayload = {
    email: string;
    code: string;
  };

  type ResendAuthPayload = {
    email: string;
  };

  type ForgotPasswordPayload = {
    email: string;
  };

  type ResetPasswordPayload = {
    email?: string;
    code?: string;
    token?: string;
    password: string;
    confirmPassword?: string;
  };

  type ChangePasswordPayload = {
    currentPassword?: string;
    oldPassword?: string;
    newPassword: string;
    confirmPassword?: string;
  };

  type DeletionState = {
    isDeleted: boolean;
    deletionScheduled: boolean;
    deletedAt: string | null;
    deleteAfter: string | null;
  };

  type AuthUser = {
    id: string;
    email: string;
    role: string;
    firstName: string;
    lastName: string;
    phone: string | null;
    avatarUrl: string | null;
    isVerified: boolean;
    isActive: boolean;
    mustChangePassword: boolean;
    deletionState: DeletionState;
  };

  type LoginResponse = {
    user: AuthUser;
    accessToken: string;
    refreshToken: string;
  };

  type CurrentUserResponse = {
    user: AuthUser;
  };

  type AuthMessageResponse = {
    success?: boolean;
    message?: string;
  };

  type ErrorResponse = {
    message?: string;
    error?: {
      message?: string;
    };
  };

  type ApiResponse<T = unknown> = {
    success?: boolean;
    data?: T;
    message?: string;
  };
}

export {};
