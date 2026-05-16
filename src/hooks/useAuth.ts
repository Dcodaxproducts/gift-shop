"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/errors";
import {
  changePassword,
  forgotPassword,
  getCurrentUser,
  loginUser,
  resendAuthCode,
  resetPassword,
  verifyAuth,
} from "@/services/auth";

export const useCurrentUser = () => {
  return useQuery({
    queryKey: ["currentUser"],
    queryFn: getCurrentUser,
  });
};

export const useLogin = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      localStorage.setItem("token", data.accessToken);
      queryClient.setQueryData(["currentUser"], data.user);
      toast.success("Login successful");
      router.push("/");
      router.refresh();
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, "Login failed. Please try again."));
    },
  });
};

export const useVerifyAuth = () => {
  return useMutation({
    mutationFn: verifyAuth,
    onError: (error) => {
      toast.error(getErrorMessage(error, "Verification failed. Please try again."));
    },
  });
};

export const useResendAuthCode = () => {
  return useMutation({
    mutationFn: resendAuthCode,
    onError: (error) => {
      toast.error(getErrorMessage(error, "Unable to resend code. Please try again."));
    },
  });
};

export const useForgotPassword = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: forgotPassword,
    onSuccess: () => {
      toast.success("Password reset instructions sent. Please check your email.");
      router.push("/auth/reset-password");
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, "Unable to send reset instructions. Please try again."));
    },
  });
};

export const useResetPassword = () => {
  return useMutation({
    mutationFn: resetPassword,
    onError: (error) => {
      toast.error(getErrorMessage(error, "Unable to reset password. Please try again."));
    },
  });
};

export const useChangePassword = () => {
  return useMutation({
    mutationFn: changePassword,
    onError: (error) => {
      toast.error(getErrorMessage(error, "Unable to change password. Please try again."));
    },
  });
};
