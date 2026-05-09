"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { CreditCard, Gift, History, KeyRound, Mail, Pencil, RotateCcw, ShieldAlert, UserRound } from "lucide-react";
import { EditUserDialog, SuspendUserDialog } from "@/components/dialog/user-action-dialogs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { recentActivities, type UserDetailTab } from "@/constants/user-details";
import { useUser } from "@/hooks/useUsers";
import { cn } from "@/lib/utils";
import type { UserDetail } from "@/types/users";
import { PageHeader } from "../common/page-header";

const tabs: Array<{ id: UserDetailTab; label: string; icon: typeof UserRound }> = [
  { id: "overview", label: "Overview", icon: UserRound },
  { id: "transactions", label: "Transactions", icon: CreditCard },
  { id: "gift-history", label: "Gift History", icon: Gift },
  { id: "activity-log", label: "Activity Log", icon: History },
];

const activityToneClass = {
  emerald: "bg-emerald-100 text-emerald-500",
  blue: "bg-blue-100 text-blue-500",
  amber: "bg-violet-100 text-violet-500",
};

const statusLabel: Record<UserDetail["status"], string> = {
  ACTIVE: "Active",
  PENDING: "Pending",
  SUSPENDED: "Suspended",
  DISABLED: "Disabled",
};

const statusToneClass: Record<UserDetail["status"], string> = {
  ACTIVE: "bg-emerald-100 text-emerald-600",
  PENDING: "bg-amber-100 text-amber-600",
  SUSPENDED: "bg-rose-100 text-rose-600",
  DISABLED: "bg-slate-100 text-slate-500",
};

const statusDotClass: Record<UserDetail["status"], string> = {
  ACTIVE: "bg-emerald-500",
  PENDING: "bg-amber-500",
  SUSPENDED: "bg-rose-500",
  DISABLED: "bg-slate-400",
};

const PLACEHOLDER = "—";

function getInitials(firstName?: string, lastName?: string) {
  const first = firstName?.[0] ?? "";
  const last = lastName?.[0] ?? "";
  return `${first}${last}`.toUpperCase() || "?";
}

function formatDate(value: string | null | undefined) {
  if (!value) return PLACEHOLDER;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return PLACEHOLDER;
  return date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "2-digit" });
}

function formatRelativeTime(value: string | null | undefined) {
  if (!value) return "Never";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Never";
  const diffMs = Date.now() - date.getTime();
  const diffMinutes = Math.round(diffMs / 60000);
  if (diffMinutes < 1) return "Just now";
  if (diffMinutes < 60) return `${diffMinutes}m ago`;
  const diffHours = Math.round(diffMinutes / 60);
  if (diffHours < 24) return `${diffHours}h ago`;
  const diffDays = Math.round(diffHours / 24);
  if (diffDays < 7) return `${diffDays}d ago`;
  return formatDate(value);
}

function formatCurrency(value: number) {
  return value.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
}

function formatCompactCurrency(value: number) {
  if (value >= 1000) {
    return `$${(value / 1000).toFixed(value % 1000 === 0 ? 0 : 1)}k`;
  }
  return formatCurrency(value);
}

function ProfileField({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0">
      <p className="text-[9px] font-semibold uppercase tracking-[0.12em] text-slate-400">{label}</p>
      <p className="mt-1 w-full wrap-break-word text-[11px] font-semibold leading-4 text-slate-700">{value}</p>
    </div>
  );
}

function TabsBar({ activeTab, onTabChange }: { activeTab: UserDetailTab; onTabChange: (tab: UserDetailTab) => void }) {
  return (
    <div className="flex gap-7 border-b border-border px-5 pt-4">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const active = tab.id === activeTab;

        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onTabChange(tab.id)}
            className={cn(
              "flex items-center gap-2 border-b-2 pb-3 text-xs font-semibold transition",
              active ? "border-[#7c3aed] text-[#7c3aed]" : "border-transparent text-slate-500 hover:text-slate-800",
            )}
          >
            <Icon className="size-3.5" />
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}

function OverviewTab() {
  return (
    <CardContent className="px-5 pb-5 pt-4">
      <h2 className="text-xs font-semibold uppercase tracking-wide text-slate-950">Recent Activity</h2>
      <div className="mt-4 space-y-4">
        {recentActivities.map((activity) => (
          <div key={activity.title} className="grid grid-cols-[30px_1fr_auto] items-start gap-3">
            <span className={cn("flex size-6 items-center justify-center rounded-full", activityToneClass[activity.tone])}>
              <RotateCcw className="size-3" />
            </span>
            <div>
              <p className="text-[11px] font-semibold leading-4 text-slate-800">{activity.title}</p>
              <p className="mt-0.5 text-[10px] text-slate-500">{activity.description}</p>
            </div>
            <p className="text-[10px] text-slate-400">{activity.time}</p>
          </div>
        ))}
      </div>
      <button
        type="button"
        className="mt-5 h-8 w-full rounded-lg bg-slate-50 text-[11px] font-semibold text-slate-700 transition hover:bg-slate-100"
      >
        View All Activity
      </button>
    </CardContent>
  );
}

function SkeletonBar({ className }: { className?: string }) {
  return <div className={cn("h-3 animate-pulse rounded-full bg-slate-100", className)} />;
}

export function UserDetailsPage() {
  const params = useParams<{ id: string }>();
  const userId = params?.id ?? "";
  const { data: user, isLoading } = useUser(userId);

  const [activeTab, setActiveTab] = useState<UserDetailTab>("overview");
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isSuspendDialogOpen, setIsSuspendDialogOpen] = useState(false);

  const fullName = user?.fullName?.trim() || `${user?.firstName ?? ""} ${user?.lastName ?? ""}`.trim();
  const subscriptionTagline = user?.subscription?.planName ? `${user.subscription.planName} Plan` : "No active subscription";
  const subscriptionPlanType = user?.subscription?.planType ?? PLACEHOLDER;
  const subscriptionRenewal = formatDate(user?.subscription?.renewalDate);
  const subscriptionProgress = user?.subscription?.progressPercentage ?? 0;
  const ordersCount = user?.quickStats?.ordersCount ?? 0;
  const totalSpent = user?.quickStats?.totalSpent ?? 0;
  const isSuspended = user?.suspension?.isSuspended ?? false;

  return (
    <div className="space-y-5">
      <div className="flex items-start justify-between gap-4">
        <PageHeader title="User Details" />
        <Button
          variant="outline"
          className="h-9 rounded-xl px-4 text-[11px]"
          onClick={() => setIsEditDialogOpen(true)}
          disabled={isLoading || !user}
        >
          <Pencil className="mr-2 size-3.5" />
          Edit User
        </Button>
      </div>

      <section className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_230px]">
        <div className="space-y-5">
          <Card className="rounded-xl border border-border bg-white p-5 shadow-sm">
            <div className="grid gap-5 md:grid-cols-[88px_minmax(0,1fr)]">
              <div className="relative size-[86px]">
                <span className="flex size-[86px] items-center justify-center overflow-hidden rounded-full border border-[#a9b8e8] bg-[#d9e5df] text-xl font-semibold text-slate-700">
                  {isLoading ? "" : getInitials(user?.firstName, user?.lastName)}
                </span>
                <span
                  className={cn(
                    "absolute bottom-1 right-0 size-3.5 rounded-full border-2 border-white",
                    user ? statusDotClass[user.status] : "bg-slate-300",
                  )}
                />
              </div>
              <div className="min-w-0">
                {isLoading ? (
                  <SkeletonBar className="h-5 w-40" />
                ) : (
                  <h2 className="text-lg font-semibold text-slate-950">{fullName || PLACEHOLDER}</h2>
                )}
                <p className="mt-0.5 text-xs text-slate-500">{subscriptionTagline}</p>
                <div className="mt-5 grid grid-cols-2 gap-x-8 gap-y-3 lg:grid-cols-3">
                  <ProfileField label="Email Address" value={user?.email ?? PLACEHOLDER} />
                  <ProfileField label="Phone Number" value={user?.phone || PLACEHOLDER} />
                  <div className="min-w-0">
                    <p className="text-[9px] font-semibold uppercase tracking-[0.12em] text-slate-400">Account Status</p>
                    <span
                      className={cn(
                        "mt-1 inline-flex rounded-full px-3 py-1 text-[10px] font-semibold",
                        user ? statusToneClass[user.status] : "bg-slate-100 text-slate-500",
                      )}
                    >
                      {user ? statusLabel[user.status] : PLACEHOLDER}
                    </span>
                  </div>
                  <ProfileField label="Registration Date" value={formatDate(user?.registrationDate ?? user?.createdAt)} />
                  <ProfileField label="Last Login" value={formatRelativeTime(user?.lastLoginAt)} />
                  <ProfileField label="Location" value={user?.location || PLACEHOLDER} />
                </div>
              </div>
            </div>
          </Card>

          <Card className="overflow-hidden rounded-xl border border-border bg-white shadow-sm">
            <TabsBar activeTab={activeTab} onTabChange={setActiveTab} />
            {activeTab === "overview" ? <OverviewTab /> : null}
            {activeTab !== "overview" ? (
              <CardContent className="px-5 py-5">
                <p className="text-sm font-semibold text-slate-950">{tabs.find((tab) => tab.id === activeTab)?.label}</p>
                <p className="mt-2 text-xs text-slate-500">Detailed history will appear here.</p>
              </CardContent>
            ) : null}
          </Card>
        </div>

        <aside className="space-y-5 xl:w-[230px]">
          <Card className="rounded-xl border border-border bg-white shadow-sm">
            <CardHeader className="p-4 pb-3">
              <CardTitle className="text-[12px] font-semibold text-slate-950">Account Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 px-4 pb-4">
              <Button
                variant="outline"
                className="h-10 w-full justify-center gap-2 rounded-lg px-3 text-[11px] leading-none"
                onClick={() => setIsEditDialogOpen(true)}
                disabled={isLoading || !user}
              >
                <KeyRound className="size-3 shrink-0" />
                <span>Reset Password</span>
              </Button>
              <Button
                variant="outline"
                className="h-10 w-full justify-center gap-2 rounded-lg border-rose-200 px-3 text-[11px] leading-none text-rose-600 hover:bg-rose-50"
                onClick={() => setIsSuspendDialogOpen(true)}
                disabled={isLoading || !user}
              >
                <ShieldAlert className="size-3 shrink-0" />
                <span>{isSuspended ? "Unsuspend User" : "Suspend User"}</span>
              </Button>
              <Button className="h-12 w-full justify-center gap-2 rounded-lg bg-slate-950 px-3 text-[11px] leading-none shadow-none hover:bg-slate-800">
                <Mail className="size-3 shrink-0" />
                <span className="text-center leading-3">Send Notification</span>
              </Button>
            </CardContent>
          </Card>

          <Card className="rounded-xl border border-[#e0d7ff] bg-[#f1eaff] shadow-sm">
            <CardHeader className="p-4 pb-3">
              <CardTitle className="text-[12px] font-semibold text-[#7c3aed]">Subscription Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 px-4 pb-4">
              <div className="flex justify-between gap-3 text-[10px]">
                <span className="text-slate-500">Plan Type</span>
                <span className="text-right font-semibold text-slate-950">{subscriptionPlanType}</span>
              </div>
              <div className="flex justify-between gap-3 text-[10px]">
                <span className="text-slate-500">Renewal Date</span>
                <span className="text-right font-semibold text-slate-950">{subscriptionRenewal}</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-white">
                <div
                  className="h-full rounded-full bg-[#7c3aed] transition-[width]"
                  style={{ width: `${Math.min(Math.max(subscriptionProgress, 0), 100)}%` }}
                />
              </div>
              <p className="text-[9px] leading-4 text-slate-500">
                {subscriptionProgress}% of the subscription period completed.
              </p>
            </CardContent>
          </Card>

          <Card className="rounded-xl border border-border bg-white shadow-sm">
            <CardHeader className="p-4 pb-3">
              <CardTitle className="text-[12px] font-semibold text-slate-950">Quick Stats</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-3 px-4 pb-4">
              <div className="rounded-xl bg-slate-50 px-2 py-3 text-center">
                <p className="text-[9px] font-semibold uppercase text-slate-400">Orders</p>
                <p className="mt-1 text-sm font-semibold text-slate-950">{ordersCount}</p>
              </div>
              <div className="rounded-xl bg-slate-50 px-2 py-3 text-center">
                <p className="text-[9px] font-semibold uppercase text-slate-400">Spent</p>
                <p className="mt-1 text-sm font-semibold text-slate-950">{formatCompactCurrency(totalSpent)}</p>
              </div>
            </CardContent>
          </Card>
        </aside>
      </section>

      <EditUserDialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen} />
      <SuspendUserDialog open={isSuspendDialogOpen} onOpenChange={setIsSuspendDialogOpen} />
    </div>
  );
}
