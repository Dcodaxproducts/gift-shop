// src/components/pages/user-details/account-sidebar.tsx
import { KeyRound, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import type { UserDetail } from "@/types/users";

interface AccountSidebarProps {
  user?: UserDetail;
  isSuspended: boolean;
  subscriptionPlanType: string;
  subscriptionRenewal: string;
  subscriptionProgress: number;
  ordersCount: number;
  totalSpent: number;
  onResetPassword: () => void;
  onToggleSuspend: () => void;
}

export function AccountSidebar({
  user,
  isSuspended,
  subscriptionPlanType,
  subscriptionRenewal,
  subscriptionProgress,
  ordersCount,
  totalSpent,
  onResetPassword,
  onToggleSuspend,
}: AccountSidebarProps) {
  return (
    <aside className="space-y-5 xl:w-57.5">
      <Card>
        <CardHeader>
          <CardTitle>Account Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button
            variant="outline"
            className="w-full"
            onClick={onResetPassword}
            disabled={!user}
          >
            <KeyRound className="size-3 shrink-0" />
            <span>Reset Password</span>
          </Button>
          <Button
            variant="danger"
            className="w-full"
            onClick={onToggleSuspend}
            disabled={!user}
          >
            <ShieldAlert className="size-3 shrink-0" />
            <span>{isSuspended ? "Unsuspend User" : "Suspend User"}</span>
          </Button>
        </CardContent>
      </Card>

      <Card className="border-primary/20 bg-primary/20">
        <CardHeader>
          <CardTitle className="text-primary">Subscription Overview</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between gap-3 text-[10px]">
            <Label>Plan Type</Label>
            <span className="text-right font-semibold">{subscriptionPlanType}</span>
          </div>
          <div className="flex justify-between gap-3 text-[10px]">
            <Label>Renewal Date</Label>
            <span className="text-right font-semibold">{subscriptionRenewal}</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-white">
            <div
              className="h-full rounded-full bg-primary transition-[width]"
              style={{ width: `${Math.min(Math.max(subscriptionProgress, 0), 100)}%` }}
            />
          </div>
          <p className="text-xs leading-4 text-slate-500">
            {subscriptionProgress}% of the subscription period completed.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Quick Stats</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-3">
          <div className="rounded-xl bg-slate-50 px-2 py-3 text-center">
            <p className="text-[9px] font-semibold uppercase text-slate-400">Orders</p>
            <p className="mt-1 text-sm font-semibold">{ordersCount}</p>
          </div>
          <div className="rounded-xl bg-slate-50 px-2 py-3 text-center">
            <p className="text-[9px] font-semibold uppercase text-slate-400">Spent</p>
            <p className="mt-1 text-sm font-semibold">${totalSpent}</p>
          </div>
        </CardContent>
      </Card>
    </aside>
  );
}
