import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "outline" | "ghost";
};

const buttonVariants = {
  default:
    "bg-primary text-primary-foreground shadow-lg shadow-primary/25 hover:bg-primary/90",
  outline: "border border-gray-200 bg-white text-gray-900 hover:bg-gray-50",
  ghost: "text-gray-500 hover:bg-gray-50 hover:text-gray-900",
};

export function Button({
  className,
  variant = "default",
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex h-12 items-center justify-center rounded-full px-5 text-sm font-semibold transition disabled:pointer-events-none disabled:opacity-50",
        buttonVariants[variant],
        className,
      )}
      {...props}
    />
  );
}
