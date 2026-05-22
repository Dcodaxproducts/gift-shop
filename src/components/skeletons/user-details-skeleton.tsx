import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

function SkeletonBar({ className }: { className?: string }) {
  return <div className={cn("animate-pulse rounded-md bg-slate-200/60", className)} />;
}

export function UserDetailsSkeleton() {
  return (
    <div className="space-y-5">
      <div className="flex items-start justify-between gap-4">
        <SkeletonBar className="h-7 w-36" />
        <SkeletonBar className="h-9 w-24 rounded-lg" />
      </div>

      <section className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_230px]">
        <div className="space-y-5">
          <Card className="p-5 shadow-none border border-border">
            <div className="grid gap-5 md:grid-cols-[88px_minmax(0,1fr)]">
              <SkeletonBar className="size-21.5 rounded-full" />
              <div className="space-y-3 min-w-0 pt-2">
                <SkeletonBar className="h-5 w-48" />
                <SkeletonBar className="h-3 w-32" />
                
                <div className="mt-6 grid grid-cols-2 gap-x-8 gap-y-4 lg:grid-cols-3 pt-2">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="space-y-2">
                      <SkeletonBar className="h-2.5 w-16" />
                      <SkeletonBar className="h-3.5 w-28" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-5 shadow-none border border-border">
            <SkeletonBar className="h-4 w-32 mb-5" />
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="grid grid-cols-[30px_1fr_auto] items-center gap-3">
                  <SkeletonBar className="size-6 rounded-full" />
                  <div className="space-y-1.5">
                    <SkeletonBar className="h-3 w-2/5" />
                    <SkeletonBar className="h-2.5 w-3/5" />
                  </div>
                  <SkeletonBar className="h-2.5 w-12" />
                </div>
              ))}
            </div>
          </Card>
        </div>

        <aside className="space-y-5 xl:w-57.5">
          <Card className="p-4 shadow-none border border-border">
            <SkeletonBar className="h-3.5 w-24 mb-3" />
            <div className="space-y-2.5">
              <SkeletonBar className="h-9 w-full rounded-md" />
              <SkeletonBar className="h-9 w-full rounded-md" />
            </div>
          </Card>

          <Card className="p-4 shadow-none border border-border">
            <SkeletonBar className="h-3.5 w-32 mb-4" />
            <div className="space-y-3">
              <div className="flex justify-between"><SkeletonBar className="h-2.5 w-14" /><SkeletonBar className="h-2.5 w-16" /></div>
              <div className="flex justify-between"><SkeletonBar className="h-2.5 w-16" /><SkeletonBar className="h-2.5 w-20" /></div>
              <SkeletonBar className="h-2 w-full rounded-full mt-1" />
            </div>
          </Card>

          <Card className="p-4 shadow-none border border-border">
            <SkeletonBar className="h-3.5 w-20 mb-3" />
            <div className="grid grid-cols-2 gap-3">
              <SkeletonBar className="h-12 rounded-xl" />
              <SkeletonBar className="h-12 rounded-xl" />
            </div>
          </Card>
        </aside>
      </section>
    </div>
  );
}
