declare global {
  type LoginPayload = {
    email: string;
    password: string;
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

  type ErrorResponse = {
    message?: string;
  };

  type ApiResponse<T> = {
    success: boolean;
    data: T;
    message?: string;
  };
}

export {};
