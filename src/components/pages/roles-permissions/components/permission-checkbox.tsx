"use client";

import { cn } from "@/lib/utils";

type PermissionCheckboxProps = {
  id: string;
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
};

export function PermissionCheckbox({
  id,
  label,
  checked,
  onChange,
}: PermissionCheckboxProps) {
  return (
    <label
      htmlFor={id}
      className="flex cursor-pointer items-center gap-2 text-xs text-slate-700 select-none"
    >
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="sr-only"
      />
      <span
        className={cn(
          "flex size-4 items-center justify-center rounded border transition",
          checked
            ? "border-primary bg-primary text-white"
            : "border-slate-300 bg-white",
        )}
      >
        {checked ? (
          <svg
            viewBox="0 0 12 12"
            className="size-2.5"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="2 6 5 9 10 3" />
          </svg>
        ) : null}
      </span>
      <span className="capitalize">{label}</span>
    </label>
  );
}
