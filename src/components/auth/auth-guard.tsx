"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/axios";

type AuthGuardProps = {
  children: React.ReactNode;
};

export function AuthGuard({ children }: AuthGuardProps) {
  const router = useRouter();
  const pathname = usePathname();
  const queryClient = useQueryClient();
  const isAuthRoute = pathname?.startsWith("/auth") ?? false;
  const [isChecked, setIsChecked] = useState(isAuthRoute);

  useEffect(() => {
    const logout = () => {
      localStorage.removeItem("token");
      queryClient.clear();
      router.replace("/auth/login");
    };

    if (!isAuthRoute) {
      const token = localStorage.getItem("token");
      if (!token) {
        logout();
        return;
      }
      setIsChecked(true);
    } else {
      setIsChecked(true);
    }

    const interceptorId = api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error?.response?.status === 401) {
          logout();
        }
        return Promise.reject(error);
      },
    );

    return () => {
      api.interceptors.response.eject(interceptorId);
    };
  }, [isAuthRoute, queryClient, router]);

  if (!isChecked) return null;

  return <>{children}</>;
}
