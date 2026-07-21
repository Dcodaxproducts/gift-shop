"use client";

import { useState } from "react";
import { DashboardNavbar } from "@/components/dashboard/navbar";
import { DashboardSidebar } from "@/components/dashboard/sidebar";

type DashboardShellProps = {
  children: React.ReactNode;
};

export function DashboardShell({ children }: DashboardShellProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="h-screen overflow-hidden bg-surface text-text-primary lg:flex">
      <DashboardSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
      <div className="flex h-screen min-w-0 flex-1 flex-col overflow-hidden">
        <DashboardNavbar onToggleSidebar={() => setIsSidebarOpen((value) => !value)} />
        <main className="min-h-0 flex-1 overflow-y-auto p-5 sm:p-6">{children}</main>
      </div>
    </div>
  );
}
