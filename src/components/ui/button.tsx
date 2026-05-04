import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "outline" | "ghost";
};

const buttonVariants = {
  default:
    "bg-primary text-primary-foreground shadow-lg shadow-primary/25 hover:bg-primary/90",
  outline: "border border-gray-200 bg-white text-gray-900 hover:bg-gray-50",
  ghost:
    "h-auto rounded-none px-0 text-gray-500 hover:bg-transparent hover:text-gray-900 hover:underline",
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
        "inline-flex h-12 items-center justify-center rounded-full px-5 text-sm font-semibold transition cursor-pointer disabled:pointer-events-none disabled:opacity-50",
        buttonVariants[variant],
        className,
      )}
      {...props}
    />
  );
}
