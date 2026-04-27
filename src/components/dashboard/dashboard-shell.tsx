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
    <div className="min-h-screen bg-surface text-text-primary lg:flex">
      <DashboardSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
      <div className="min-w-0 flex-1">
        <DashboardNavbar onToggleSidebar={() => setIsSidebarOpen((value) => !value)} />
        <main className="p-5 sm:p-6">{children}</main>
      </div>
    </div>
  );
}
