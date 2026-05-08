declare global {
  type LoginPayload = {
    email: string;
    password: string;
  };

  type AuthUser = {
    id?: string;
    name?: string;
    email?: string;
    role?: string;
  };

  type LoginResponse = {
    token?: string;
    accessToken?: string;
    user?: AuthUser;
  };

  type ErrorResponse = {
    message?: string;
  };

  type ApiResponse<T> = {
    data?: T;
    message?: string;
    success?: boolean;
  } & T;
}

export {};
