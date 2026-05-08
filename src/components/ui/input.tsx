import type { InputHTMLAttributes, ReactNode, Ref } from "react";
import { cn } from "@/lib/utils";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  ref?: Ref<HTMLInputElement>;
};

export function Input({
  className,
  leftIcon,
  rightIcon,
  ref,
  type = "text",
  ...props
}: InputProps) {
  return (
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
          "flex h-12 w-full rounded-[16px] border border-slate-200 bg-slate-50 px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10 disabled:cursor-not-allowed disabled:opacity-50",
          leftIcon ? "pl-10" : undefined,
          rightIcon ? "pr-10" : undefined,
          className,
        )}
        {...props}
      />
      {rightIcon ? (
        <span className="absolute right-4 top-1/2 flex -translate-y-1/2 text-slate-400">
          {rightIcon}
        </span>
      ) : null}
    </div>
  );
}
