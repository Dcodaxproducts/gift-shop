export function PermissionsPanelSkeleton() {
  return (
    <div className="divide-y divide-slate-100">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={`perm-skeleton-${index}`}
          className="grid grid-cols-[200px_minmax(0,1fr)] items-center py-4"
        >
          <div className="flex items-center gap-2.5">
            <div className="size-4 animate-pulse rounded bg-slate-100" />
            <div className="h-3 w-24 animate-pulse rounded-full bg-slate-100" />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, actionIndex) => (
              <div key={actionIndex} className="flex items-center gap-2">
                <div className="size-4 animate-pulse rounded bg-slate-100" />
                <div className="h-2.5 w-14 animate-pulse rounded-full bg-slate-100" />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
