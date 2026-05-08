"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  changePassword,
  forgotPassword,
  getCurrentUser,
  loginUser,
  resendAuthCode,
  resetPassword,
  verifyAuth,
} from "@/services/auth";

const authQueryKeys = {
  currentUser: ["auth", "me"] as const,
};

const getAuthErrorMessage = (
  error: AxiosError<ErrorResponse>,
  fallback = "Something went wrong. Please try again.",
) => {
  return error.response?.data?.message ?? error.response?.data?.error?.message ?? error.message ?? fallback;
};

export const useCurrentUser = () => {
  return useQuery<AuthUser, AxiosError<ErrorResponse>>({
    queryKey: authQueryKeys.currentUser,
    queryFn: getCurrentUser,
  });
};

export const useLogin = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation<LoginResponse, AxiosError<ErrorResponse>, LoginPayload>({
    mutationFn: loginUser,
    onSuccess: (data) => {
      localStorage.setItem("token", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
      localStorage.setItem("user", JSON.stringify(data.user));
      queryClient.setQueryData(authQueryKeys.currentUser, data.user);
      toast.success("Login successful");
      router.push("/");
      router.refresh();
    },
    onError: (error) => {
      toast.error(getAuthErrorMessage(error, "Login failed. Please try again."));
    },
  });
};

export const useVerifyAuth = () => {
  return useMutation<AuthMessageResponse, AxiosError<ErrorResponse>, VerifyAuthPayload>({
    mutationFn: verifyAuth,
    onError: (error) => {
      toast.error(getAuthErrorMessage(error, "Verification failed. Please try again."));
    },
  });
};

export const useResendAuthCode = () => {
  return useMutation<AuthMessageResponse, AxiosError<ErrorResponse>, ResendAuthPayload>({
    mutationFn: resendAuthCode,
    onError: (error) => {
      toast.error(getAuthErrorMessage(error, "Unable to resend code. Please try again."));
    },
  });
};

export const useForgotPassword = () => {
  return useMutation<AuthMessageResponse, AxiosError<ErrorResponse>, ForgotPasswordPayload>({
    mutationFn: forgotPassword,
    onError: (error) => {
      toast.error(getAuthErrorMessage(error, "Unable to send reset instructions. Please try again."));
    },
  });
};

export const useResetPassword = () => {
  return useMutation<AuthMessageResponse, AxiosError<ErrorResponse>, ResetPasswordPayload>({
    mutationFn: resetPassword,
    onError: (error) => {
      toast.error(getAuthErrorMessage(error, "Unable to reset password. Please try again."));
    },
  });
};

export const useChangePassword = () => {
  return useMutation<AuthMessageResponse, AxiosError<ErrorResponse>, ChangePasswordPayload>({
    mutationFn: changePassword,
    onError: (error) => {
      toast.error(getAuthErrorMessage(error, "Unable to change password. Please try again."));
    },
  });
};
