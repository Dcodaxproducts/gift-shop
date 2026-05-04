"use client";

import { X } from "lucide-react";
import { cn } from "@/lib/utils";

type DialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
  headerClassName?: string;
  contentClassName?: string;
  footerClassName?: string;
};

export function Dialog({
  open,
  onOpenChange,
  title,
  description,
  children,
  footer,
  className,
  headerClassName,
  contentClassName,
  footerClassName,
}: DialogProps) {
  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6" role="presentation">
      <button
        type="button"
        aria-label="Close dialog overlay"
        className="absolute inset-0 bg-slate-950/35 backdrop-blur-sm"
        onClick={() => onOpenChange(false)}
      />
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="dialog-title"
        aria-describedby={description ? "dialog-description" : undefined}
        className={cn(
          "relative w-full max-w-lg overflow-hidden rounded-3xl border border-border bg-white shadow-2xl shadow-slate-950/20",
          className,
        )}
      >
        <div className={cn("flex items-start justify-between gap-4 border-b border-border px-6 py-5", headerClassName)}>
          <div>
            <h2 id="dialog-title" className="text-lg font-black tracking-tight text-text-primary">
              {title}
            </h2>
            {description ? (
              <p id="dialog-description" className="mt-1 text-xs leading-5 text-slate-500">
                {description}
              </p>
            ) : null}
          </div>
          <button
            type="button"
            aria-label="Close dialog"
            onClick={() => onOpenChange(false)}
            className="rounded-full p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
          >
            <X className="size-4" />
          </button>
        </div>
        <div className={cn("px-6 py-5", contentClassName)}>{children}</div>
        {footer ? <div className={cn("flex justify-end gap-3 border-t border-border px-6 py-4", footerClassName)}>{footer}</div> : null}
      </section>
    </div>
  );
}
