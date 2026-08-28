"use client";

import { cn } from "@/lib/utils";

export const TABS = [
  { key: "overview", label: "Overview" },
  { key: "documents", label: "Documents" },
] as const;

export type TabKey = (typeof TABS)[number]["key"];

export function ProviderDetailsTabs({
  activeTab,
  onTabChange,
}: {
  activeTab: TabKey;
  onTabChange: (tab: TabKey) => void;
}) {
  return (
    <div className="flex gap-1 border-b border-slate-200">
      {TABS.map((tab) => (
        <button
          key={tab.key}
          type="button"
          onClick={() => onTabChange(tab.key)}
          className={cn(
            "px-4 py-2.5 text-sm font-semibold transition-colors",
            activeTab === tab.key
              ? "border-b-2 border-primary text-primary"
              : "text-slate-400 hover:text-slate-600",
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
