import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "outline" | "ghost";
};

const buttonVariants = {
  default: "bg-[#2d2118] text-white shadow-sm hover:bg-[#493423]",
  outline:
    "border border-[#d9bda4] bg-white text-[#2d2118] hover:bg-[#fff8f2]",
  ghost: "text-[#6d5543] hover:bg-[#fff8f2] hover:text-[#2d2118]",
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
        "inline-flex h-11 items-center justify-center rounded-full px-5 text-sm font-semibold transition disabled:pointer-events-none disabled:opacity-50",
        buttonVariants[variant],
        className,
      )}
      {...props}
    />
  );
}
