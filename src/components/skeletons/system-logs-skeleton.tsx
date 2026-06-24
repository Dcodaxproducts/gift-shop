import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

function SkeletonBar({ className }: { className?: string }) {
  return <div className={cn("animate-pulse rounded-md bg-slate-200/60", className)} />;
}

function MetricSkeletonCard() {
  return (
    <Card>
      <CardContent>
        <SkeletonBar className="h-4 w-24" />
        <div className="mt-3 flex items-end gap-1.5">
          <SkeletonBar className="h-6 w-20" />
          <SkeletonBar className="h-3 w-10" />
        </div>
        <SkeletonBar className="mt-4 h-2 w-full rounded-full" />
        <SkeletonBar className="mt-2 h-3 w-14" />
      </CardContent>
    </Card>
  );
}

export function SystemLogsSkeleton() {
  return (
    <div className="space-y-5">
      <div className="space-y-2">
        <SkeletonBar className="h-7 w-64" />
        <SkeletonBar className="h-4 w-96 max-w-full" />
      </div>

      <section className="space-y-4">
        <SkeletonBar className="h-4 w-28" />
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {[...Array(4)].map((_, index) => (
            <MetricSkeletonCard key={`server-health-skeleton-${index}`} />
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <SkeletonBar className="h-4 w-20" />
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {[...Array(4)].map((_, index) => (
            <MetricSkeletonCard key={`api-health-skeleton-${index}`} />
          ))}
        </div>
      </section>

      <Card>
        <CardContent>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="space-y-2">
              <SkeletonBar className="h-4 w-40" />
              <SkeletonBar className="h-3 w-56" />
            </div>
            <SkeletonBar className="h-9 w-48 rounded-xl" />
          </div>
          <SkeletonBar className="mt-6 h-65 w-full rounded-xl" />
        </CardContent>
      </Card>
    </div>
  );
}
