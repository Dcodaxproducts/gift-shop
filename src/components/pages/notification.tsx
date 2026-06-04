"use client";

import { Bell } from "lucide-react";
import PageHeader from "../common/page-header";

export function NotificationsPage() {
  // Replace with real data fetching logic
  const notifications: unknown[] = [];

  const hasNotifications = notifications.length > 0;

  return (
    <div className="flex flex-col gap-6 h-full">
      <PageHeader 
        title="Notifications"
        description="Stay updated with the latest activity across the platform."
      />

      {/* Content */}
      {hasNotifications ? (
        <div className="flex flex-col gap-3">
        </div>
      ) : (
        <NotificationsEmpty />
      )}
    </div>
  );
}

function NotificationsEmpty() {
  return (
    <div className="flex flex-1 items-center justify-center min-h-[60vh]">
      <div className="flex flex-col items-center gap-4 text-center max-w-sm px-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
          <Bell className="h-8 w-8 text-primary" strokeWidth={1.5} />
        </div>
        <div className="flex flex-col gap-1">
          <h3 className="text-lg font-semibold tracking-tight">
            No notifications found
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            You&apos;re all caught up! New notifications will appear here when
            there&apos;s activity to report.
          </p>
        </div>
      </div>
    </div>
  );
}