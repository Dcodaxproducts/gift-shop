"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

type DatePickerProps = {
  id?: string;
  label?: string;
  value?: string;
  placeholder?: string;
  errorMessage?: string;
  required?: boolean;
  disabled?: boolean;
  align?: "left" | "right";
  onChange: (value: string) => void;
};

const WEEK_DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

const toDateValue = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const parseDateValue = (value?: string) => {
  if (!value) return null;
  const [year, month, day] = value.split("-").map(Number);
  if (!year || !month || !day) return null;

  const date = new Date(year, month - 1, day);
  return Number.isNaN(date.getTime()) ? null : date;
};

const formatDisplayDate = (value?: string) => {
  const date = parseDateValue(value);
  if (!date) return "";

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");

  return `${day}/${month}/${date.getFullYear()}`;
};

const getMonthDays = (monthDate: Date) => {
  const year = monthDate.getFullYear();
  const month = monthDate.getMonth();
  const firstDay = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const blanks = Array.from({ length: firstDay.getDay() }, () => null);
  const days = Array.from({ length: daysInMonth }, (_, index) => new Date(year, month, index + 1));

  return [...blanks, ...days];
};

export function DatePicker({
  id,
  label,
  value,
  placeholder = "Select date",
  errorMessage,
  required,
  disabled,
  align = "left",
  onChange,
}: DatePickerProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const selectedDate = parseDateValue(value);
  const [isOpen, setIsOpen] = useState(false);
  const [viewDate, setViewDate] = useState(() => selectedDate ?? new Date());

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, []);

  useEffect(() => {
    if (selectedDate) {
      setViewDate(selectedDate);
    }
  }, [value]);

  const monthDays = useMemo(() => getMonthDays(viewDate), [viewDate]);
  const displayValue = formatDisplayDate(value);
  const monthLabel = viewDate.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  const changeMonth = (direction: -1 | 1) => {
    setViewDate((current) => new Date(current.getFullYear(), current.getMonth() + direction, 1));
  };

  const selectDate = (date: Date) => {
    onChange(toDateValue(date));
    setIsOpen(false);
  };

  return (
    <div ref={rootRef} className="relative ">
      {label ? (
        <label htmlFor={id} className="text-xs font-medium text-slate-700">
          {label}
          {required ? <span className="ml-0.5 text-red-500">*</span> : null}
        </label>
      ) : null}

      <button
        id={id}
        type="button"
        disabled={disabled}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        className={cn(
          "flex h-12 w-full items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 text-left text-sm text-slate-900 outline-none transition focus:ring focus:ring-primary/10 disabled:cursor-not-allowed disabled:opacity-50",
          errorMessage && "border-destructive focus:border-destructive focus:ring-destructive/10",
        )}
        onClick={() => setIsOpen((current) => !current)}
      >
        <span className={cn(!displayValue && "text-slate-400")}>
          {displayValue || placeholder}
        </span>
        <CalendarDays className="size-4 shrink-0 text-slate-400" />
      </button>

      {errorMessage ? (
        <p className="px-1 text-xs font-medium leading-5 text-destructive">
          {errorMessage}
        </p>
      ) : null}

      {isOpen ? (
        <div
          role="dialog"
          className={cn(
            "absolute top-full z-30 mt-2 w-72 rounded-2xl border border-border bg-white p-3 shadow-xl shadow-slate-950/10",
            align === "right" ? "right-0" : "left-0",
          )}
        >
          <div className="flex items-center justify-between">
            <button
              type="button"
              aria-label="Previous month"
              className="flex size-8 items-center justify-center rounded-xl text-slate-500 transition hover:bg-slate-50 hover:text-slate-900"
              onClick={() => changeMonth(-1)}
            >
              <ChevronLeft className="size-4" />
            </button>
            <p className="text-xs font-semibold text-slate-900">{monthLabel}</p>
            <button
              type="button"
              aria-label="Next month"
              className="flex size-8 items-center justify-center rounded-xl text-slate-500 transition hover:bg-slate-50 hover:text-slate-900"
              onClick={() => changeMonth(1)}
            >
              <ChevronRight className="size-4" />
            </button>
          </div>

          <div className="mt-3 grid grid-cols-7 gap-1">
            {WEEK_DAYS.map((day) => (
              <div key={day} className="flex h-7 items-center justify-center text-[10px] font-semibold text-slate-400">
                {day}
              </div>
            ))}
            {monthDays.map((date, index) => {
              if (!date) {
                return <div key={`blank-${index}`} className="h-8" />;
              }

              const dateValue = toDateValue(date);
              const isSelected = value === dateValue;
              const isToday = dateValue === toDateValue(new Date());

              return (
                <button
                  key={dateValue}
                  type="button"
                  className={cn(
                    "flex h-8 items-center justify-center rounded-xl text-xs font-medium text-slate-700 transition hover:bg-primary/10 hover:text-primary",
                    isToday && "text-primary",
                    isSelected && "bg-primary text-white hover:bg-primary hover:text-white",
                  )}
                  onClick={() => selectDate(date)}
                >
                  {date.getDate()}
                </button>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
}
