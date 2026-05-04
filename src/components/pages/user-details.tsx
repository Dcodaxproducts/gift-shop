"use client";

import { useState } from "react";
import { CalendarDays, Gift, Mail, MapPin, Phone, ShieldCheck, WalletCards } from "lucide-react";
import { EditUserDialog, SuspendUserDialog } from "@/components/dialog/user-action-dialogs";
import { PageHeader } from "@/components/common/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  activityLog,
  giftHistory,
  recentActivities,
  userProfile,
  userProfileStats,
  userTransactions,
  type UserDetailTab,
} from "@/constants/user-details";
import { cn } from "@/lib/utils";

const tabs: Array<{ id: UserDetailTab; label: string }> = [
  { id: "overview", label: "Overview" },
  { id: "transactions", label: "Transactions" },
  { id: "gift-history", label: "Gift History" },
  { id: "activity-log", label: "Activity Log" },
];

const activityToneClass = {
  emerald: "bg-emerald-50 text-emerald-500",
  blue: "bg-primary/10 text-primary",
  amber: "bg-amber-50 text-amber-500",
};

function ContactRow({ icon: Icon, label, value }: { icon: typeof Mail; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3 rounded-2xl bg-slate-50 px-4 py-3">
      <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-xl bg-white text-primary shadow-sm">
        <Icon className="size-4" />
      </span>
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">{label}</p>
        <p className="mt-1 text-xs font-semibold text-slate-700">{value}</p>
      </div>
    </div>
  );
}

function OverviewTab() {
  return (
    <div className="grid gap-5 xl:grid-cols-2">
      <Card className="rounded-2xl border border-border bg-white shadow-sm">
        <CardHeader className="p-5 pb-4">
          <CardTitle className="text-sm font-bold text-text-primary">Contact Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 px-5 pb-5">
          <ContactRow icon={Mail} label="Email Address" value={userProfile.email} />
          <ContactRow icon={Phone} label="Phone Number" value={userProfile.phone} />
          <ContactRow icon={MapPin} label="Billing Address" value={userProfile.address} />
          <ContactRow icon={CalendarDays} label="Joined" value={userProfile.joinedAt} />
        </CardContent>
      </Card>

      <Card className="rounded-2xl border border-border bg-white shadow-sm">
        <CardHeader className="p-5 pb-4">
          <CardTitle className="text-sm font-bold text-text-primary">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 px-5 pb-5">
          {recentActivities.map((activity) => (
            <div key={activity.title} className="flex items-start gap-3">
              <span className={cn("mt-1 size-2.5 rounded-full", activityToneClass[activity.tone])} />
              <div>
                <p className="text-xs font-semibold text-slate-700">{activity.title}</p>
                <p className="mt-1 text-[10px] text-slate-400">{activity.time}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

function TransactionsTab() {
  return (
    <Card className="rounded-2xl border border-border bg-white shadow-sm">
      <CardContent className="divide-y divide-border p-0">
        {userTransactions.map((transaction) => (
          <div key={transaction.id} className="flex flex-wrap items-center justify-between gap-4 px-5 py-4">
            <div>
              <p className="text-xs font-bold text-slate-950">{transaction.title}</p>
              <p className="mt-1 text-[10px] text-slate-400">{transaction.id} · {transaction.date}</p>
            </div>
            <div className="text-right">
              <p className="text-xs font-bold text-slate-950">{transaction.amount}</p>
              <p className="mt-1 text-[10px] font-semibold text-emerald-500">{transaction.status}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

function GiftHistoryTab() {
  return (
    <Card className="rounded-2xl border border-border bg-white shadow-sm">
      <CardContent className="divide-y divide-border p-0">
        {giftHistory.map((giftItem) => (
          <div key={giftItem.title} className="flex items-center gap-4 px-5 py-4">
            <span className="flex size-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <Gift className="size-4" />
            </span>
            <div>
              <p className="text-xs font-bold text-slate-950">{giftItem.title}</p>
              <p className="mt-1 text-[10px] text-slate-400">Sent to {giftItem.recipient} · {giftItem.date}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

function ActivityLogTab() {
  return (
    <Card className="rounded-2xl border border-border bg-white shadow-sm">
      <CardContent className="space-y-4 p-5">
        {activityLog.map((activity) => (
          <div key={activity.title} className="border-l-2 border-primary/20 pl-4">
            <p className="text-xs font-bold text-slate-950">{activity.title}</p>
            <p className="mt-1 text-[10px] text-slate-400">{activity.time}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

export function UserDetailsPage() {
  const [activeTab, setActiveTab] = useState<UserDetailTab>("overview");
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isSuspendDialogOpen, setIsSuspendDialogOpen] = useState(false);

  return (
    <div className="space-y-5">
      <PageHeader
        title="User Profile"
        description="View account details, activity, purchases, and subscription status."
      />

      <section className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_320px]">
        <div className="space-y-5">
          <Card className="rounded-3xl border border-border bg-white p-5 shadow-sm">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                <span className="flex size-20 items-center justify-center rounded-3xl bg-primary/10 text-2xl font-black text-primary">
                  {userProfile.avatarInitials}
                </span>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h1 className="text-2xl font-black tracking-tight text-slate-950">{userProfile.name}</h1>
                    <span className="rounded-full bg-emerald-50 px-3 py-1 text-[10px] font-bold text-emerald-600">
                      {userProfile.status}
                    </span>
                  </div>
                  <p className="mt-1 text-sm font-medium text-slate-400">{userProfile.username}</p>
                  <p className="mt-2 text-xs text-slate-500">Last active {userProfile.lastActive}</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3 sm:w-[330px]">
                {userProfileStats.map((stat) => (
                  <div key={stat.label} className="rounded-2xl bg-slate-50 px-3 py-4 text-center">
                    <p className="text-lg font-black text-slate-950">{stat.value}</p>
                    <p className="mt-1 text-[10px] font-semibold text-slate-400">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          <div className="flex gap-2 overflow-x-auto rounded-2xl border border-border bg-white p-2 shadow-sm">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "shrink-0 rounded-xl px-4 py-2 text-xs font-semibold transition",
                  activeTab === tab.id ? "bg-primary text-white shadow-lg shadow-primary/20" : "text-slate-500 hover:bg-slate-50 hover:text-slate-950",
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {activeTab === "overview" ? <OverviewTab /> : null}
          {activeTab === "transactions" ? <TransactionsTab /> : null}
          {activeTab === "gift-history" ? <GiftHistoryTab /> : null}
          {activeTab === "activity-log" ? <ActivityLogTab /> : null}
        </div>

        <aside className="space-y-5">
          <Card className="rounded-2xl border border-border bg-white shadow-sm">
            <CardHeader className="p-5 pb-4">
              <CardTitle className="text-sm font-bold text-text-primary">Account Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 px-5 pb-5">
              <Button className="h-10 w-full rounded-2xl text-xs" onClick={() => setIsEditDialogOpen(true)}>
                Edit User
              </Button>
              <Button variant="outline" className="h-10 w-full rounded-2xl text-xs text-rose-500 hover:bg-rose-50" onClick={() => setIsSuspendDialogOpen(true)}>
                Suspend User
              </Button>
            </CardContent>
          </Card>

          <Card className="rounded-2xl border border-border bg-white shadow-sm">
            <CardHeader className="p-5 pb-4">
              <CardTitle className="flex items-center gap-2 text-sm font-bold text-text-primary">
                <ShieldCheck className="size-4 text-primary" />
                Subscription Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="px-5 pb-5">
              <div className="rounded-2xl bg-primary/10 p-4">
                <p className="text-xs font-bold text-primary">{userProfile.subscription.plan}</p>
                <p className="mt-1 text-[10px] text-slate-500">{userProfile.subscription.renewsAt}</p>
                <div className="mt-4 h-2 overflow-hidden rounded-full bg-white">
                  <div className="h-full rounded-full bg-primary" style={{ width: `${userProfile.subscription.usage}%` }} />
                </div>
                <p className="mt-2 text-[10px] font-semibold text-slate-500">{userProfile.subscription.usage}% monthly usage</p>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl border border-border bg-white shadow-sm">
            <CardHeader className="p-5 pb-4">
              <CardTitle className="flex items-center gap-2 text-sm font-bold text-text-primary">
                <WalletCards className="size-4 text-primary" />
                Quick Stats
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 px-5 pb-5">
              {userProfileStats.map((stat) => (
                <div key={stat.label} className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
                  <span className="text-xs font-semibold text-slate-500">{stat.label}</span>
                  <span className="text-xs font-black text-slate-950">{stat.value}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </aside>
      </section>

      <EditUserDialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen} />
      <SuspendUserDialog open={isSuspendDialogOpen} onOpenChange={setIsSuspendDialogOpen} />
    </div>
  );
}
