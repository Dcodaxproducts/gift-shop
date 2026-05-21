import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "outline" | "ghost" | "danger" | "success" | "warning" | "soft";
};

const buttonVariants = {
  default:
    "h-10 px-5 bg-primary text-primary-foreground hover:bg-primary/90",
  outline:
    "h-10 px-5 border border-gray-200 bg-white text-gray-900 hover:bg-gray-50",
  ghost:
    "text-gray-500 hover:text-gray-900",
  soft:
    "h-7 px-3 rounded-full bg-primary/10 text-[10px] text-primary hover:bg-primary/15",
  danger:
    "h-10 px-5 border border-rose-200 bg-rose-50 text-rose-600 hover:bg-rose-100 hover:border-rose-300",
  success:
    "h-10 px-5 border border-emerald-200 bg-emerald-50 text-emerald-600 hover:bg-emerald-100 hover:border-emerald-300",
  warning:
    "h-10 px-5 border border-amber-200 bg-amber-50 text-amber-600 hover:bg-amber-100 hover:border-amber-300",
};

export function Button({
  className,
  variant = "default",
  type = "button",
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-xl text-xs font-semibold transition cursor-pointer disabled:pointer-events-none disabled:opacity-50",
        buttonVariants[variant],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}