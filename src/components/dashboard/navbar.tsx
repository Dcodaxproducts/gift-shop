"use client";

import { Bell, LogOut, Menu, Search, Settings } from "lucide-react";
import { dashboardUser } from "@/config/dashboard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

type DashboardNavbarProps = {
  onToggleSidebar: () => void;
};

export function DashboardNavbar({ onToggleSidebar }: DashboardNavbarProps) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const handleLogout = () => {
    localStorage.removeItem("token");
    queryClient.clear();
    router.push("/auth/login");
    router.refresh();
  };

  return (
    <header className="sticky top-0 z-30 flex h-18.25 items-center justify-between gap-4 border-b border-border bg-white px-4 sm:px-6">
      <Button
        variant="ghost"
        aria-label="Toggle sidebar"
        onClick={onToggleSidebar}
        className="size-10 rounded-2xl bg-slate-50 text-secondary hover:bg-primary/10 hover:text-primary lg:hidden"
      >
        <Menu className="size-5" strokeWidth={2.25} />
      </Button>

      <h1 className="min-w-fit text-xl font-semibold tracking-tight text-text-primary">
        Analytics Dashboard
      </h1>


      <div className="ml-auto flex items-center gap-3 lg:ml-0">
        <Button
          variant="ghost"
          aria-label="Notifications"
          className="size-10 rounded-2xl bg-slate-50 text-secondary hover:bg-primary/10 hover:text-primary"
          onClick={() => router.push("/notifications")}
        >
          <Bell className="size-5" strokeWidth={2.25} />
        </Button>
        <Button
          variant="ghost"
          aria-label="Settings"
          className="size-10 rounded-2xl bg-slate-50 text-secondary hover:bg-primary/10 hover:text-primary"
          onClick={() => router.push("/settings")}
        >
          <Settings className="size-5" strokeWidth={2.25} />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger
            aria-label="Open profile menu"
            className="hidden items-center gap-3 rounded-2xl px-2 py-1 outline-none transition hover:bg-slate-50 sm:flex"
          >
            <div className="flex size-10 items-center justify-center rounded-full bg-[#FFD6B8] cursor-pointer text-xs font-semibold text-[#D47750]">
              {dashboardUser.avatarInitials}
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onSelect={handleLogout}>
              <LogOut className="size-4" strokeWidth={2.25} />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
