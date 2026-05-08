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
      localStorage.setItem("token", data.accessToken);
      toast.success("Login successful");
      router.push("/");
      router.refresh();
    },
    onError: (error) => {
      let errorMessage = "Login failed. Please try again.";

      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.response?.data && (error.response.data as any).error?.message) {
        errorMessage = (error.response.data as any).error.message;
      } else if (error.message) {
        errorMessage = error.message;
      }

      toast.error(errorMessage);
    },
  });
};
