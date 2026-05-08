"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { loginUser } from "@/services/auth";

export const useLogin = () => {
  const router = useRouter();

  return useMutation<LoginResponse, Error, LoginPayload>({
    mutationFn: loginUser,
    onSuccess: (data) => {
      const token = data.token ?? data.accessToken;

      if (token) {
        window.localStorage.setItem("token", token);
      }

      router.push("/");
      router.refresh();
    },
  });
};
