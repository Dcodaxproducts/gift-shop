import type { InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type InputProps = InputHTMLAttributes<HTMLInputElement>;

export function Input({ className, type = "text", ...props }: InputProps) {
  return (
    <input
      type={type}
      className={cn(
        "flex h-12 w-full rounded-2xl border border-[#ead4c1] bg-white px-4 text-sm text-[#2d2118] shadow-sm outline-none transition placeholder:text-[#a8917e] focus:border-[#2d2118] focus:ring-4 focus:ring-[#f4c7a2]/35 disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}
