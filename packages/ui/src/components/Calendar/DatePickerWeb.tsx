"use client";

import React, { useEffect, useState } from "react";

import { cn } from "@muatmuat/lib/utils";
import { format } from "date-fns";
import { id } from "date-fns/locale";

import { IconComponent } from "../IconComponent";
import { Popover, PopoverContent, PopoverTrigger } from "../Popover";
import { Calendar } from "./Calendar";
import { DatePickerWebProps, DateSelection } from "./types";

// Simplified type for translation function
type TranslationFunction = (
  key: string,
  values?: Record<string, any>,
  fallback?: string
) => string;

const tMockFn: TranslationFunction = (key, _, fallback) => fallback || key;

const DatePickerWebImplementation = (
  {
    value: initialValue,
    onChange,
    onApply,
    // onCancel is no longer needed with auto-apply
    minDate,
    maxDate,
    disabled = false,
    dateFormat = "dd MMM yyyy", // Default format without time
    placeholder = "Placeholder",
    className,
    errorMessage,
    hideErrorMessage = false,
    t = tMockFn,
  }: DatePickerWebProps,
  _ref: React.ForwardedRef<HTMLDivElement>
) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null | undefined>(
    initialValue
  );

  // Update internal state when controlled value changes
  useEffect(() => {
    setSelectedDate(initialValue);
  }, [initialValue]);

  // Auto-apply date selection handler
  const handleDateSelect = (date: DateSelection | undefined) => {
    // Immediately apply the selected date
    const selectedDate = Array.isArray(date)
      ? date[0]
      : date instanceof Date
        ? date
        : undefined;
    setSelectedDate(selectedDate);
    if (onChange) onChange(selectedDate);
    if (onApply) onApply(selectedDate);

    // Close the popover after selection
    setIsOpen(false);
  };

  const showErrorState = !!errorMessage;

  // Format the display value or show placeholder
  const displayValue = selectedDate
    ? format(selectedDate, dateFormat, { locale: id })
    : placeholder;

  return (
    <div className={cn("flex w-full flex-col gap-y-2", className)}>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <div
            className={cn(
              "flex h-8 w-full cursor-pointer items-center rounded-md border bg-neutral-50 px-3 transition-colors",
              // Default & Hover & Focus states
              "border-neutral-600 focus-within:border-primary-700 hover:border-primary-700",
              // Error state
              showErrorState && "border-error-400",
              // Disabled state
              disabled &&
                "cursor-not-allowed border-neutral-600 bg-neutral-200 hover:border-neutral-600"
            )}
          >
            <span
              className={cn(
                "w-full min-w-0 border-none bg-transparent text-sm font-semibold text-neutral-900 outline-none placeholder:text-neutral-600",
                !selectedDate && "text-neutral-500"
              )}
            >
              {displayValue}
            </span>
            <IconComponent
              src="/icons/calendar24.svg"
              className={cn(
                "size-4 text-neutral-700",
                showErrorState && "text-error-400"
              )}
            />
          </div>
        </PopoverTrigger>
        <PopoverContent className="p-3" align="start" side="bottom">
          <Calendar
            mode="single"
            className="w-full bg-transparent p-0"
            selected={selectedDate as DateSelection}
            onChange={handleDateSelect}
            initialFocus
            minDate={minDate}
            maxDate={maxDate}
            disabled={disabled}
          />
        </PopoverContent>
      </Popover>

      {/* Error Message */}
      {errorMessage && !hideErrorMessage && (
        <span className="text-xs font-medium text-error-400">
          {t(errorMessage)}
        </span>
      )}
    </div>
  );
};

// Renamed component
export const DatePickerWeb = React.memo(
  React.forwardRef(DatePickerWebImplementation)
);
DatePickerWeb.displayName = "DatePickerWeb";
