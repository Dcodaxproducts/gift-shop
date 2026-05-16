import { cn } from "@/lib/utils";

type MetadataRow = {
  label: string;
  value: string;
  highlight?: boolean;
};

export function SystemMetadataCard({ rows }: { rows: MetadataRow[] }) {
  return (
    <div className="rounded-2xl bg-slate-50 p-5">
      <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
        System Metadata
      </p>
      <dl className="mt-4 space-y-3">
        {rows.map((row) => (
          <div key={row.label} className="flex items-center justify-between gap-3">
            <dt className="text-[11px] font-medium text-slate-500">
              {row.label}:
            </dt>
            <dd
              className={cn(
                "text-xs font-semibold",
                row.highlight ? "text-primary" : "text-slate-900",
              )}
            >
              {row.value}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
