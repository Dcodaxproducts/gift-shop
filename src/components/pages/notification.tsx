"use client";

import { useState } from "react";
import { Bell } from "lucide-react";
import PageHeader from "../common/page-header";
import { Button } from "../ui/button";
import Pagination from "../pagination";
import {
  useMarkAllNotificationsRead,
  useMarkNotificationRead,
  useNotificationSummary,
  useNotifications,
} from "@/hooks/useNotifications";
import type { Notification } from "@/services/notifications";
import { formatRelativeTime } from "@/utils/formatDate";
import { cn } from "@/lib/utils";

export function NotificationsPage() {
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data: summary } = useNotificationSummary();
  const { data: notificationsResponse, isLoading } = useNotifications({ page, limit });
  const markNotificationRead = useMarkNotificationRead();
  const markAllNotificationsRead = useMarkAllNotificationsRead();

  const notifications = notificationsResponse?.data ?? [];
  const meta = notificationsResponse?.meta ?? { page, limit, total: 0, totalPages: 1 };
  const hasUnread = (summary?.unread ?? 0) > 0;

  return (
    <div className="flex flex-col gap-6 h-full">
      <PageHeader
        title="Notifications"
        description="Stay updated with the latest activity across the platform."
        actions={
          hasUnread ? (
            <Button
              variant="outline"
              onClick={() => markAllNotificationsRead.mutate()}
              disabled={markAllNotificationsRead.isPending}
            >
              {markAllNotificationsRead.isPending ? "Marking..." : "Mark all as read"}
            </Button>
          ) : undefined
        }
      />

      {isLoading ? (
        <NotificationsSkeleton />
      ) : notifications.length > 0 ? (
        <div className="flex flex-col overflow-hidden rounded-2xl border border-border bg-white shadow-sm">
          <div className="divide-y divide-border">
            {notifications.map((notification) => (
              <NotificationRow
                key={notification.id}
                notification={notification}
                onRead={() => markNotificationRead.mutate(notification.id)}
              />
            ))}
          </div>
          <Pagination
            total={meta.total}
            page={meta.page}
            limit={meta.limit}
            totalPages={meta.totalPages}
            hasNext={meta.page < meta.totalPages}
            hasPrevious={meta.page > 1}
            onPageChange={setPage}
          />
        </div>
      ) : (
        <NotificationsEmpty />
      )}
    </div>
  );
}

function NotificationRow({
  notification,
  onRead,
}: {
  notification: Notification;
  onRead: () => void;
}) {
  return (
    <div
      role={notification.isRead ? undefined : "button"}
      onClick={notification.isRead ? undefined : onRead}
      className={cn(
        "flex items-start gap-3 px-5 py-4 transition-colors",
        !notification.isRead && "cursor-pointer bg-primary/5 hover:bg-primary/10",
      )}
    >
      <span
        className={cn(
          "mt-1.5 size-2 shrink-0 rounded-full",
          notification.isRead ? "bg-transparent" : "bg-primary",
        )}
      />
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-slate-900">{notification.title}</p>
        <p className="mt-0.5 text-xs leading-relaxed text-slate-500">{notification.message}</p>
      </div>
      <span className="shrink-0 text-[11px] text-slate-400">
        {formatRelativeTime(notification.createdAt)}
      </span>
    </div>
  );
}

function NotificationsSkeleton() {
  return (
    <div className="flex flex-col divide-y divide-border overflow-hidden rounded-2xl border border-border bg-white shadow-sm">
      {Array.from({ length: 5 }).map((_, index) => (
        <div key={index} className="flex items-start gap-3 px-5 py-4">
          <span className="mt-1.5 size-2 shrink-0 animate-pulse rounded-full bg-slate-100" />
          <div className="flex-1 space-y-2">
            <div className="h-3 w-1/3 animate-pulse rounded-full bg-slate-100" />
            <div className="h-3 w-2/3 animate-pulse rounded-full bg-slate-100" />
          </div>
        </div>
      ))}
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
