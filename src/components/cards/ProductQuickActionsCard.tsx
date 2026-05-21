import { Copy, ExternalLink, Trash2 } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type ActionTone = "default" | "danger";

type ProductQuickAction = {
  label: string;
  icon: LucideIcon;
  tone?: ActionTone;
  onClick?: () => void;
};

const defaultActions: ProductQuickAction[] = [
  { label: "View on Storefront", icon: ExternalLink },
  { label: "Duplicate Product", icon: Copy },
  { label: "Delete Item", icon: Trash2, tone: "danger" },
];

export function ProductQuickActionsCard({
  actions = defaultActions,
}: {
  actions?: ProductQuickAction[];
}) {
  return (
    <Card className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <CardContent className="p-0">
        <h2 className="text-sm font-semibold ">Quick Actions</h2>
        <div className="mt-4 space-y-3">
          {actions.map((action) => {
            const Icon = action.icon;
            const isDanger = action.tone === "danger";

            return (
              <button
                key={action.label}
                type="button"
                onClick={action.onClick}
                className={cn(
                  "flex h-11 w-full items-center gap-2.5 rounded-2xl border px-4 text-xs font-semibold transition",
                  isDanger
                    ? "border-transparent text-rose-500 hover:bg-rose-50"
                    : "border-slate-200 text-slate-900 hover:bg-slate-50",
                )}
              >
                <Icon className="size-4" strokeWidth={2.25} />
                {action.label}
              </button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
