"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { loginUser } from "@/services/auth";

export const useLogin = () => {
  const router = useRouter();

  return useMutation<LoginResponse, AxiosError<ErrorResponse>, LoginPayload>({
    mutationFn: loginUser,
    onSuccess: (data) => {
      window.localStorage.setItem("token", data.accessToken);
      window.localStorage.setItem("refreshToken", data.refreshToken);
      window.localStorage.setItem("user", JSON.stringify(data.user));

      toast.success("Login successful");
      router.push("/");
      router.refresh();
    },
    onError: (error) => {
      toast.error(error.response?.data?.message ?? "Login failed. Please try again.");
    },
  });
};
