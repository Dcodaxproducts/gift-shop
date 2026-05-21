"use client";

import { useEffect } from "react";
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
  const canRender = isAuthRoute || (typeof window !== "undefined" && !!localStorage.getItem("token"));

  useEffect(() => {
    const logout = () => {
      localStorage.removeItem("token");
      queryClient.clear();
      router.replace("/auth/login");
    };

    if (!canRender) {
      logout();
      return undefined;
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
  }, [canRender, queryClient, router]);

  if (!canRender) return null;

  return <>{children}</>;
}
