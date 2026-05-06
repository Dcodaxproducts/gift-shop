import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "outline" | "ghost";
};

const buttonVariants = {
  default:
    "h-10 px-5 bg-primary text-primary-foreground hover:bg-primary/90",
  outline:
    "h-10 px-5 border border-gray-200 bg-white text-gray-900 hover:bg-gray-50",
  ghost:
    "text-gray-500 hover:text-gray-900",
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