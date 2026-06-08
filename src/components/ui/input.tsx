"use client";

import type { InputHTMLAttributes, ReactNode, Ref } from "react";
import { cn } from "@/lib/utils";

type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & {
  errorMessage?: string;
  label?: ReactNode;
  leftIcon?: ReactNode;
  onLocationError?: (message: string) => void;
  onLocationSelect?: (location: { lat: number; lng: number }) => void;
  rightIcon?: ReactNode;
  ref?: Ref<HTMLInputElement>;
  type?: InputHTMLAttributes<HTMLInputElement>["type"] | "location";
};

export function Input({
  className,
  errorMessage,
  label,
  leftIcon,
  onLocationError,
  onLocationSelect,
  rightIcon,
  ref,
  required,
  type = "text",
  ...props
}: InputProps) {
  const inputType = type === "location" ? "text" : type;

  const handleLocationSelect = () => {
    if (!onLocationSelect) return;

    if (!navigator.geolocation) {
      onLocationError?.("Location is not supported by this browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        onLocationSelect({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      () => {
        onLocationError?.("Unable to get location. Please allow location access or enter coordinates manually.");
      },
    );
  };

  return (
    <div className="space-y-1.5">
      {label ? (
        <label htmlFor={props.id} className="text-xs font-medium text-slate-700">
          {label}
          {required && <span className="ml-0.5 text-red-500">*</span>}
        </label>
      ) : null}
      <div className="relative">
        {leftIcon ? (
          <span className="pointer-events-none absolute left-4 top-1/2 flex -translate-y-1/2 text-slate-400">
            {leftIcon}
          </span>
        ) : null}
        <input
          ref={ref}
          type={inputType}
          className={cn(
            "flex h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:bg-white focus:ring focus:ring-primary/10 disabled:cursor-not-allowed disabled:opacity-50",
            "[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none",
            leftIcon ? "pl-10" : undefined,
            rightIcon || type === "location" ? "pr-10" : undefined,
            errorMessage ? "border-destructive bg-white focus:border-destructive focus:ring-destructive/10" : undefined,
            className,
          )}
          aria-invalid={errorMessage ? true : props["aria-invalid"]}
          required={required}
          {...props}
          onWheel={(e) => inputType === "number" && e.currentTarget.blur()}
        />
        {type === "location" && onLocationSelect ? (
          <button
            type="button"
            className="absolute right-3 top-1/2 flex -translate-y-1/2 text-[10px] font-semibold text-primary"
            onClick={handleLocationSelect}
          >
            Use
          </button>
        ) : null}
        {rightIcon ? (
          <span className="absolute right-4 top-1/2 flex -translate-y-1/2">
            {rightIcon}
          </span>
        ) : null}
      </div>
      {errorMessage ? (
        <p className="px-1 text-xs font-medium leading-5 text-destructive">{errorMessage}</p>
      ) : null}
    </div>
  );
}
