"use client";

import React, { useRef } from "react";

import { cn } from "@muatmuat/lib/utils";
import { format } from "date-fns";
import { id } from "date-fns/locale";

import { IconComponent } from "../IconComponent";
import { DatePickerResponsiveProps } from "./types";

// Simplified type for translation function
type TranslationFunction = (
  key: string,
  values?: Record<string, any>,
  fallback?: string
) => string;

const tMockFn: TranslationFunction = (key, _, fallback) => fallback || key;

const DatePickerResponsiveImplementation = (
  {
    value,
    onChange,
    onApply,
    // onCancel is no longer needed with auto-apply
    minDate,
    maxDate,
    disabled = false,
    dateFormat = "dd MMM yyyy", // Default format without time
    placeholder = "Select Date",
    className,
    errorMessage,
    hideErrorMessage = false,
    status,
    t = tMockFn,
    // Additional native date input specific props
    appearance = {
      containerClassName: "",
      inputClassName: "",
      errorMessageClassName: "",
    },
    // @deprecated legacy prop
    isError,
  }: DatePickerResponsiveProps,
  ref: React.ForwardedRef<HTMLDivElement>
) => {
  const datePickerRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = e.target.value;
    if (onChange) onChange(newDate);
    if (onApply) onApply(newDate);
  };

  const handleClick = () => {
    if (!disabled && datePickerRef.current) {
      datePickerRef.current.showPicker();
    }
  };

  // Determine error state (prefer new status prop, fall back to legacy isError or errorMessage)
  const showErrorState = status === "error" || isError || !!errorMessage;

  // Convert Date objects to string format for native date input
  const minDateString = minDate
    ? format(minDate, 'yyyy-MM-dd')
    : undefined;
  const maxDateString = maxDate
    ? format(maxDate, 'yyyy-MM-dd')
    : undefined;

  // Format the display value using date-fns or show placeholder
  const displayValue = value
    ? format(new Date(value), dateFormat, { locale: id })
    : placeholder;

  return (
    <div
      ref={ref}
      className={cn(
        "flex w-full flex-col gap-y-2",
        appearance.containerClassName,
        className
      )}
    >
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
        onClick={handleClick}
      >
        <IconComponent
          src="/icons/calendar16.svg"
          className={cn(
            "size-4 text-neutral-700",
            showErrorState && "text-error-400"
          )}
        />
        <span
          className={cn(
            "w-full min-w-0 border-none bg-transparent text-sm font-semibold text-neutral-900 outline-none placeholder:text-neutral-600",
            disabled ? "cursor-not-allowed" : "cursor-text",
            !value && "text-neutral-500"
          )}
        >
          {displayValue}
        </span>
        <input
          className={cn(
            "absolute -top-[314px] opacity-0",
            appearance.inputClassName
          )}
          type="date"
          onChange={handleChange}
          ref={datePickerRef}
          disabled={disabled}
          max={maxDateString}
          min={minDateString}
        />
      </div>

      {/* Error Message */}
      {showErrorState && errorMessage && !hideErrorMessage && (
        <span
          className={cn(
            "text-xs font-medium text-error-400",
            appearance.errorMessageClassName
          )}
        >
          {t(errorMessage)}
        </span>
      )}
    </div>
  );
};

export const DatePickerResponsive = React.memo(
  React.forwardRef(DatePickerResponsiveImplementation)
);
DatePickerResponsive.displayName = "DatePickerResponsive";
