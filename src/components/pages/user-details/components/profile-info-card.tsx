// src/components/pages/user-details/profile-info-card.tsx
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { StatusBadge } from "@/utils/status";
import { getInitials } from "@/utils/getInitials";
import { formatDate, formatRelativeTime } from "@/utils/formatDate";
import type { UserDetail } from "@/types/users";

interface ProfileInfoCardProps {
  user?: UserDetail;
  fullName: string;
  placeholder: string;
  subscriptionTagline: string;
}

export function ProfileInfoCard({ user, fullName, placeholder, subscriptionTagline }: ProfileInfoCardProps) {
  return (
    <Card className="p-5">
      <div className="grid gap-5 md:grid-cols-[88px_minmax(0,1fr)]">
        <div className="relative size-21.5">
          <span className="flex size-21.5 items-center justify-center overflow-hidden rounded-full capitalize border border-[#a9b8e8] bg-[#d9e5df] text-xl font-semibold text-slate-700">
            {getInitials(`${user?.firstName} ${user?.lastName}`)}
          </span>
          <span className="absolute bottom-1 right-0 size-3.5 rounded-full border-2 border-white bg-emerald-500" />
        </div>
        <div className="min-w-0">
          <h2 className="text-lg font-semibold capitalize">{fullName || placeholder}</h2>
          <p className="mt-0.5 text-xs text-slate-500">{subscriptionTagline}</p>
          <div className="mt-5 grid grid-cols-2 gap-x-8 gap-y-3 lg:grid-cols-3">
            <div className="min-w-0">
              <Label>Email Address</Label>
              <p className="mt-1 w-full wrap-break-word text-[11px] font-semibold leading-4 text-slate-700">
                {user?.email ?? placeholder}
              </p>
            </div>
            <div className="min-w-0">
              <Label>Phone Number</Label>
              <p className="mt-1 w-full wrap-break-word text-[11px] font-semibold leading-4 text-slate-700">
                {user?.phone || placeholder}
              </p>
            </div>
            <div className="min-w-0">
              <Label>Account Status</Label>
              <div className="mt-1">
                <StatusBadge status={user?.status || "ACTIVE"} />
              </div>
            </div>
            <div className="min-w-0">
              <Label>Registration Date</Label>
              <p className="mt-1 w-full wrap-break-word text-[11px] font-semibold leading-4 text-slate-700">
                {formatDate(user?.registrationDate ?? user?.createdAt)}
              </p>
            </div>
            <div className="min-w-0">
              <Label>Last Login</Label>
              <p className="mt-1 w-full wrap-break-word text-[11px] font-semibold leading-4 text-slate-700">
                {formatRelativeTime(user?.lastLoginAt)}
              </p>
            </div>
            <div className="min-w-0">
              <Label>Location</Label>
              <p className="mt-1 w-full wrap-break-word text-[11px] font-semibold leading-4 text-slate-700">
                {user?.location || placeholder}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
