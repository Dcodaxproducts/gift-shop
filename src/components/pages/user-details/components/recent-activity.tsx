// src/components/pages/user-details/recent-activity.tsx
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { formatRelativeTime } from "@/utils/formatDate";
import { activityConfig, type ActivityItem } from "@/constants/user-activity";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export function RecentActivity({ data }: { data: ActivityItem[] }) {
  const hasActivities = data && data.length > 0;

  return (
    <Card>
      <CardContent>
        <CardTitle>Recent Activity</CardTitle>
        <div className="mt-4 space-y-4">
          {!hasActivities ? (
            <p className="text-xs text-slate-400">No recent activity recorded.</p>
          ) : (
            data.map((activity: ActivityItem) => {
              let configKey = activity.type as string;
              if (activity.type === "LOGIN") {
                const isFailed = activity.title.toLowerCase().includes("failed");
                configKey = isFailed ? "LOGIN_FAILED" : "LOGIN_SUCCESS";
              }

              const config = activityConfig[configKey] || activityConfig.DEFAULT;
              const IconComponent = config.icon;

              return (
                <div key={activity.id} className="grid grid-cols-[30px_1fr_auto] items-start gap-3">
                  <span className={cn("flex size-6 items-center justify-center rounded-full", config.toneClass)}>
                    <IconComponent className="size-3" />
                  </span>
                  <div className="min-w-0">
                    <Label className="text-[11px] leading-4 text-slate-800 block truncate">
                      {activity.title}
                    </Label>
                    <p className="mt-0.5 text-[10px] text-slate-500 wrap-break-word line-clamp-2">
                      {activity.description}
                    </p>
                  </div>
                  <p className="text-[10px] text-slate-400 whitespace-nowrap">
                    {formatRelativeTime(activity.createdAt)}
                  </p>
                </div>
              );
            })
          )}
        </div>

        {hasActivities && (
          <Button
            variant="ghost"
            className="mt-5 w-full"
          >
            View All Activity
          </Button>
        )}
      </CardContent>
    </Card>
  );
}