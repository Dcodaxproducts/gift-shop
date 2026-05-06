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
  titleClassName?: string;
  descriptionClassName?: string;
  hideHeaderBorder?: boolean;
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
  titleClassName,
  descriptionClassName,
  hideHeaderBorder = false,
}: DialogProps) {
  if (!open) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6"
      role="presentation"
    >
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
          "relative flex max-h-[calc(100vh-3rem)] w-full max-w-lg flex-col overflow-hidden rounded-3xl border border-border bg-white shadow-2xl shadow-slate-950/20",
          className,
        )}
      >
        <div
          className={cn(
            "flex shrink-0 items-start justify-between gap-4 px-6 py-5",
            !hideHeaderBorder && "border-b border-border",
            headerClassName,
          )}
        >
          <div>
            <h2
              id="dialog-title"
              className={cn(
                "text-base font-bold tracking-tight text-slate-950",
                titleClassName,
              )}
            >
              {title}
            </h2>
            {description ? (
              <p
                id="dialog-description"
                className={cn("mt-1 text-xs leading-5 text-slate-500", descriptionClassName)}
              >
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

        <div className={cn("flex-1 overflow-y-auto px-6 py-5", contentClassName)}>
          {children}
        </div>

        {footer ? (
          <div
            className={cn(
              "flex shrink-0 justify-end gap-3 border-t border-border px-6 py-4",
              footerClassName,
            )}
          >
            {footer}
          </div>
        ) : null}
      </section>
    </div>
  );
}