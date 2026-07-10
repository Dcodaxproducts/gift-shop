"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const HEALTH_CHECK_URL = process.env.NEXT_PUBLIC_API_BASE_URL!;
type Status = "checking" | "connected" | "error";

export function ServerHealthCheck({ children }: { children: React.ReactNode }) {
  const [status, setStatus] = useState<Status>("checking");

  const checkServer = async () => {
    setStatus("checking");

    if (!HEALTH_CHECK_URL) {
      setStatus("error");
      return;
    }

    try {
      const res = await fetch(HEALTH_CHECK_URL, {
        method: "HEAD",
        cache: "no-store",
      });

      // Any response means server is running (even 404)
      setStatus("connected");
    } catch {
      setStatus("error");
    }
  };

  useEffect(() => {
    checkServer();
  }, []);


  if (status === "checking") {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <div className="text-center space-y-3">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        </div>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <div className="mx-auto max-w-md text-center space-y-4 p-8">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-rose-100">
            <svg
              className="h-8 w-8 text-rose-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
              />
            </svg>
          </div>

          <h1 className="text-xl font-semibold text-gray-900">
            We&apos;ll be right back
          </h1>
          <p className="text-sm text-gray-500">
            Our servers are taking a short break. This usually resolves
            quickly — please try again in a moment.
          </p>
          <Button onClick={checkServer}>Try Again</Button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
