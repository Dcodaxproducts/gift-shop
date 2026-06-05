import type { CSSProperties } from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

function SkeletonBar({ className, style }: { className?: string; style?: CSSProperties }) {
  return <div className={cn("animate-pulse rounded-md bg-slate-200/60", className)} style={style} />;
}

export function DashboardSkeleton() {
  return (
    <div className="space-y-5">
      <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {[...Array(4)].map((_, index) => (
          <Card key={`stat-skeleton-${index}`}>
            <div className="flex items-start justify-between">
              <SkeletonBar className="size-9 rounded-2xl" />
              <SkeletonBar className="h-5 w-12 rounded-full" />
            </div>
            <div className="mt-4 space-y-2">
              <SkeletonBar className="h-3 w-24" />
              <SkeletonBar className="h-7 w-28" />
            </div>
          </Card>
        ))}
      </section>

      <section className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_310px]">
        <Card>
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-2">
              <SkeletonBar className="h-4 w-40" />
              <SkeletonBar className="h-3 w-48" />
            </div>
            <SkeletonBar className="h-8 w-36 rounded-lg" />
          </div>
          <div className="mt-7 flex h-61.25 items-end gap-1.5 sm:gap-2.5">
            {[48, 72, 56, 86, 64, 92].map((height, index) => (
              <div key={`revenue-skeleton-${index}`} className="flex h-full flex-1 flex-col items-center gap-2">
                <SkeletonBar className="w-full rounded-t-sm" style={{ height: `${height}%` }} />
                <SkeletonBar className="h-3 w-6" />
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <div className="space-y-2">
            <SkeletonBar className="h-4 w-28" />
            <SkeletonBar className="h-3 w-40" />
          </div>
          <SkeletonBar className="mx-auto mb-7 mt-6 size-44 rounded-full" />
          <div className="space-y-3.5">
            <SkeletonBar className="h-3 w-full" />
            <SkeletonBar className="h-3 w-full" />
          </div>
        </Card>
      </section>

      <section className="grid gap-5 xl:grid-cols-2">
        {[...Array(2)].map((_, cardIndex) => (
          <Card key={`table-skeleton-${cardIndex}`}>
            <div className="flex items-center justify-between">
              <SkeletonBar className="h-5 w-40" />
              <SkeletonBar className="h-7 w-16 rounded-full" />
            </div>
            <div className="mt-5 space-y-4">
              {[...Array(3)].map((_, rowIndex) => (
                <div key={`table-row-skeleton-${cardIndex}-${rowIndex}`} className="grid grid-cols-3 gap-4">
                  <SkeletonBar className="h-8 w-full" />
                  <SkeletonBar className="h-8 w-full" />
                  <SkeletonBar className="h-8 w-full" />
                </div>
              ))}
            </div>
          </Card>
        ))}
      </section>
    </div>
  );
}
