import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

function SkeletonBar({ className }: { className?: string }) {
  return <div className={cn("animate-pulse rounded-md bg-slate-200/60", className)} />;
}

export function SubscriptionPlanCardSkeleton() {
  return (
    <Card className="relative overflow-visible border-slate-200">
      <CardContent className="flex min-h-125 flex-col">
        <div className="flex items-center justify-between gap-4">
          <SkeletonBar className="h-6 w-24" />
        </div>

        <div className="mt-3 space-y-2">
          <SkeletonBar className="h-7 w-4/5" />
          <SkeletonBar className="h-7 w-3/5" />
        </div>

        <div className="mt-8 flex items-end gap-1">
          <SkeletonBar className="h-10 w-28" />
          <SkeletonBar className="mb-1 h-4 w-12" />
        </div>

        <div className="mt-8 space-y-4">
          {[...Array(5)].map((_, index) => (
            <div key={`subscription-plan-feature-skeleton-${index}`} className="flex items-start gap-2.5">
              <SkeletonBar className="mt-0.5 size-4 shrink-0 rounded-full" />
              <SkeletonBar className="h-4 w-full" />
            </div>
          ))}
        </div>

        <div className="mt-auto grid grid-cols-2 gap-3 pt-8">
          <SkeletonBar className="h-10 w-full rounded-md" />
          <SkeletonBar className="h-10 w-full rounded-md" />
        </div>
      </CardContent>
    </Card>
  );
}
