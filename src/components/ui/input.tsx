"use client";

import type { InputHTMLAttributes, ReactNode, Ref } from "react";
import { cn } from "@/lib/utils";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  errorMessage?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  ref?: Ref<HTMLInputElement>;
};

export function Input({
  className,
  errorMessage,
  leftIcon,
  rightIcon,
  ref,
  type = "text",
  ...props
}: InputProps) {
  return (
    <div className="space-y-1.5">
      <div className="relative">
        {leftIcon ? (
          <span className="pointer-events-none absolute left-4 top-1/2 flex -translate-y-1/2 text-slate-400">
            {leftIcon}
          </span>
        ) : null}
        <input
          ref={ref}
          type={type}
          className={cn(
            "flex h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:bg-white focus:ring focus:ring-primary/10 disabled:cursor-not-allowed disabled:opacity-50",
            // --- Senior Fix: Hides default up/down chevrons for type="number" ---
            "[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none",
            leftIcon ? "pl-10" : undefined,
            rightIcon ? "pr-10" : undefined,
            errorMessage ? "border-destructive bg-white focus:border-destructive focus:ring-destructive/10" : undefined,
            className,
          )}
          aria-invalid={errorMessage ? true : props["aria-invalid"]}
          {...props}
          onWheel={(e) => type === "number" && e.currentTarget.blur()}
        />
        {rightIcon ? (
          <span className="absolute right-4 top-1/2 flex -translate-y-1/2">
            {rightIcon}
          </span>
        ) : null}
      </div>
      {errorMessage ? (
        <p className="px-1 text-xs font-medium leading-5 text-destructive">{errorMessage}</p>
      ) : null}
    </div>
  );
}
