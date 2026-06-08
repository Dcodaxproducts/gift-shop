"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/errors";
import {
  forgotPassword,
  getCurrentUser,
  loginUser,
  resetPassword,
  verifyResetOtp,
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

export const useForgotPassword = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: forgotPassword,
    onSuccess: (_, variables) => {
      sessionStorage.setItem("resetEmail", variables.email);
      sessionStorage.removeItem("resetOtp");
      toast.success("Password reset OTP sent. Please check your email.");
      router.push("/auth/verify-reset-otp");
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, "Unable to send reset instructions. Please try again."));
    },
  });
};

export const useVerifyResetOtp = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: verifyResetOtp,
    onSuccess: (_, variables) => {
      sessionStorage.setItem("resetEmail", variables.email);
      sessionStorage.setItem("resetOtp", variables.otp);
      toast.success("OTP verified successfully");
      router.push("/auth/reset-password");
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, "Invalid OTP. Please try again."));
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
