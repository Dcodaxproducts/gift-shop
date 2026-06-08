import * as React from "react"

import { cn } from "@/lib/utils"

type TextareaProps = React.ComponentProps<"textarea"> & {
  errorMessage?: string;
};

function Textarea({ className, errorMessage, ...props }: TextareaProps) {
  return (
    <div className="space-y-1.5">
      <textarea
        data-slot="textarea"
        className={cn(
          "flex field-sizing-content min-h-16 w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm transition-colors outline-none placeholder:text-slate-400 disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
          errorMessage ? "border-destructive bg-white focus:border-destructive focus:ring-destructive/10" : undefined,
          className
        )}
        aria-invalid={errorMessage ? true : props["aria-invalid"]}
        {...props}
      />
      {errorMessage ? (
        <p className="px-1 text-xs font-medium leading-5 text-destructive">{errorMessage}</p>
      ) : null}
    </div>
  )
}

export { Textarea }
