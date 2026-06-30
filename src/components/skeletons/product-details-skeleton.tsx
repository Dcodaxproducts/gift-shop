import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

function SkeletonBar({ className }: { className?: string }) {
  return <div className={cn("animate-pulse rounded-md bg-slate-200/60", className)} />;
}

export function ProductDetailsSkeleton() {
  return (
    <div className="space-y-5">
      <SkeletonBar className="h-16 rounded-lg" />
      <div className="grid gap-5 lg:grid-cols-[minmax(0,520px)_minmax(320px,1fr)]">
        <div className="space-y-5">
          <SkeletonBar className="h-72 rounded-lg xl:h-80" />
          <Card className="rounded-lg">
            <SkeletonBar className="h-4 w-32" />
            <div className="mt-5 space-y-3">
              <SkeletonBar className="h-3 w-full" />
              <SkeletonBar className="h-3 w-11/12" />
              <SkeletonBar className="h-3 w-3/5" />
            </div>
          </Card>
        </div>
        <div className="space-y-5">
          <Card className="rounded-lg">
            <SkeletonBar className="h-4 w-28" />
            <div className="mt-5 space-y-3">
              <SkeletonBar className="h-8 w-full" />
              <SkeletonBar className="h-8 w-full" />
              <SkeletonBar className="h-8 w-full" />
            </div>
          </Card>
          <Card className="rounded-lg">
            <SkeletonBar className="h-4 w-36" />
            <div className="mt-5 space-y-3">
              <SkeletonBar className="h-8 w-full" />
              <SkeletonBar className="h-8 w-full" />
              <SkeletonBar className="h-8 w-full" />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
