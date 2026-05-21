"use client";

import { ShieldCheck, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { AdminRole } from "@/types/admin-roles";

type RoleCardProps = {
  role: AdminRole;
  isSelected: boolean;
  onSelect: () => void;
  onDelete: () => void;
};

export function RoleCard({
  role,
  isSelected,
  onSelect,
  onDelete,
}: RoleCardProps) {
  return (
    <div
      role="button"
      tabIndex={0}
      aria-pressed={isSelected}
      onClick={onSelect}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onSelect();
        }
      }}
      className={cn(
        "w-full cursor-pointer rounded-2xl border bg-white p-4 text-left shadow-sm transition",
        isSelected ? "border-primary" : "border-slate-200 hover:border-slate-300",
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <span className="flex size-7 items-center justify-center rounded-full bg-slate-100 text-slate-500">
            <ShieldCheck className="size-3.5" strokeWidth={2} />
          </span>
          <p className="text-sm font-semibold text-slate-900">{role.name}</p>
        </div>

        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            onDelete();
          }}
          className="rounded-md p-1 text-slate-400 transition hover:bg-red-50 hover:text-red-500"
        >
          <Trash2 className="size-3.5" strokeWidth={2} />
        </button>
      </div>

      <p className="mt-3 text-[11px] leading-4 text-slate-500">
        {role.description ?? "No description"}
      </p>

      <p className="mt-3 text-[11px] font-medium text-primary underline underline-offset-2">
        view All {role.name}s
      </p>
    </div>
  );
}
