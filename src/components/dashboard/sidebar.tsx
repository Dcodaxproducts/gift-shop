import Link from "next/link";
import {
  BadgeCheck,
  BarChart3,
  BriefcaseBusiness,
  CalendarDays,
  ChartLine,
  CirclePlus,
  CreditCard,
  Gift,
  IdCard,
  LayoutDashboard,
  ListTodo,
  Package,
  Rss,
  Search,
  Settings,
  Share2,
  ShieldCheck,
  Star,
  Store,
  UserPlus,
  Users,
  UsersRound,
  X,
} from "lucide-react";
import { dashboardNavGroups, dashboardUser } from "@/config/dashboard";
import { cn } from "@/lib/utils";

const iconMap = {
  "badge-check": BadgeCheck,
  "bar-chart-3": BarChart3,
  "briefcase-business": BriefcaseBusiness,
  "calendar-days": CalendarDays,
  "chart-line": ChartLine,
  "circle-plus": CirclePlus,
  "credit-card": CreditCard,
  "id-card": IdCard,
  "layout-dashboard": LayoutDashboard,
  "list-todo": ListTodo,
  package: Package,
  rss: Rss,
  settings: Settings,
  "share-2": Share2,
  "shield-check": ShieldCheck,
  star: Star,
  store: Store,
  "user-plus": UserPlus,
  users: Users,
  "users-round": UsersRound,
};

type DashboardSidebarProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function DashboardSidebar({ isOpen, onClose }: DashboardSidebarProps) {
  return (
    <>
      <button
        type="button"
        aria-label="Close sidebar overlay"
        onClick={onClose}
        className={cn(
          "fixed inset-0 z-40 bg-slate-950/25 transition-opacity lg:hidden",
          isOpen ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      />

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-[238px] flex-col border-r border-border bg-white transition-transform duration-300 lg:static lg:z-auto lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-[73px] items-center justify-between px-5">
          <Link href="/dashboard" className="flex items-center gap-3">
            <span className="flex size-9 items-center justify-center rounded-full bg-primary text-white shadow-lg shadow-primary/25">
              <Gift className="size-5" />
            </span>
            <span className="text-[17px] font-black tracking-tight text-text-primary">
              Gift Platform
            </span>
          </Link>
          <button
            type="button"
            aria-label="Close sidebar"
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 lg:hidden"
          >
            <X className="size-4" />
          </button>
        </div>

        <div className="px-4 pb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-slate-300" />
            <input
              type="search"
              placeholder="Quick find..."
              className="h-9 w-full rounded-2xl border border-transparent bg-slate-50 pl-9 pr-3 text-xs text-slate-500 outline-none placeholder:text-slate-400 focus:border-primary/20 focus:bg-white focus:ring-4 focus:ring-primary/10"
            />
          </div>
        </div>

        <nav className="min-h-0 flex-1 overflow-y-auto px-3 pb-5">
          <div className="space-y-4">
            {dashboardNavGroups.map((group) => (
              <div key={group.title}>
                <p className="mb-2 px-2 text-[10px] font-black uppercase tracking-[0.12em] text-slate-300">
                  {group.title}
                </p>
                <div className="space-y-1">
                  {group.items.map((item) => {
                    const Icon = iconMap[item.icon as keyof typeof iconMap];

                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                          "flex h-9 items-center gap-3 rounded-2xl px-3 text-xs font-semibold text-slate-500 transition hover:bg-slate-50 hover:text-text-primary",
                          item.active && "bg-primary/10 text-primary hover:bg-primary/10 hover:text-primary",
                        )}
                      >
                        <Icon className="size-4 shrink-0" />
                        <span className="min-w-0 flex-1 truncate">{item.title}</span>
                        {item.badge ? (
                          <span className="rounded-full bg-primary px-1.5 py-0.5 text-[10px] font-bold text-white">
                            {item.badge}
                          </span>
                        ) : null}
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </nav>

        <div className="border-t border-border px-5 py-5">
          <p className="mb-2 text-[10px] font-medium text-slate-400">Logged in as</p>
          <div className="flex items-center gap-3">
            <div className="flex size-9 items-center justify-center rounded-full bg-[#FFE7B8] text-xs font-black text-[#B7791F]">
              {dashboardUser.avatarInitials}
            </div>
            <p className="truncate text-xs font-semibold text-slate-500">
              {dashboardUser.email}
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}
