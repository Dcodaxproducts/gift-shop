import { Bell, Menu, Search, Settings } from "lucide-react";
import { dashboardUser } from "@/config/dashboard";
import { Input } from "@/components/ui/input";

type DashboardNavbarProps = {
  onToggleSidebar: () => void;
};

export function DashboardNavbar({ onToggleSidebar }: DashboardNavbarProps) {
  return (
    <header className="sticky top-0 z-30 flex h-[73px] items-center gap-4 border-b border-border bg-white px-4 sm:px-6">
      <button
        type="button"
        aria-label="Toggle sidebar"
        onClick={onToggleSidebar}
        className="flex size-10 items-center justify-center rounded-2xl bg-slate-50 text-slate-500 transition hover:bg-primary/10 hover:text-primary lg:hidden"
      >
        <Menu className="size-5" />
      </button>

      <h1 className="min-w-fit text-xl font-semibold tracking-tight text-text-primary sm:text-2xl">
        Analytics Dashboard
      </h1>

      <div className="ml-auto hidden w-full max-w-[365px] lg:block">
        <Input
          type="search"
          placeholder="Search analytics, users, or providers..."
          leftIcon={<Search className="size-4" />}
          className="h-10! text-xs"
        />
      </div>

      <div className="ml-auto flex items-center gap-3 lg:ml-0">
        <button
          type="button"
          aria-label="Notifications"
          className="flex size-10 items-center justify-center rounded-2xl bg-slate-50 text-slate-600 transition hover:bg-primary/10 hover:text-primary"
        >
          <Bell className="size-5" fill="black" />
        </button>
        <button
          type="button"
          aria-label="Settings"
          className="flex size-10 items-center justify-center rounded-2xl bg-slate-50 text-slate-600 transition hover:bg-primary/10 hover:text-primary"
        >
          <Settings className="size-5" fill="black" />
        </button>

        <div className="hidden items-center gap-3 pl-4 sm:flex">
          <div className="text-right">
            <p className="text-xs font-black text-text-primary">{dashboardUser.name}</p>
            <p className="text-[11px] font-medium text-slate-400">{dashboardUser.role}</p>
          </div>
          <div className="flex size-10 items-center justify-center rounded-full bg-[#FFD6B8] text-xs font-black text-[#D47750]">
            {dashboardUser.avatarInitials}
          </div>
        </div>
      </div>
    </header>
  );
}
