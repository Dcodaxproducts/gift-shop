"use client";

import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type SwitchProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  checked?: boolean;
  thumbClassName?: string;
  checkedThumbClassName?: string;
};

export function Switch({
  checked = false,
  className,
  thumbClassName,
  checkedThumbClassName,
  ...props
}: SwitchProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      className={cn(
        "inline-flex h-5 w-10 items-center rounded-full p-0.5 transition cursor-pointer",
        checked ? "bg-primary" : "bg-slate-200",
        className,
      )}
      {...props}
    >
      <span
        className={cn(
          "size-4 rounded-full bg-white shadow-sm transition-transform",
          checked && "translate-x-5",
          thumbClassName,
          checked && checkedThumbClassName,
        )}
      />
    </button>
  );
}
