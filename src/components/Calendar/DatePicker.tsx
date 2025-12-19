import React, { useState } from "react";

import { cn } from "@muatmuat/lib/utils";
import { Calendar } from "@muatmuat/ui/Calendar";
import { IconComponent } from "@muatmuat/ui/IconComponent";
import { Popover, PopoverContent, PopoverTrigger } from "@muatmuat/ui/Popover";

interface DatePickerProps {
  value?: Date | undefined;
  onChange?: (date: Date | undefined) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  errorMessage?: string;
}

export const DatePicker: React.FC<DatePickerProps> = ({
  value: controlledValue,
  onChange: setControlledValue,
  placeholder = "Pilih Tanggal",
  disabled = false,
  className,
  errorMessage,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  // Helper function to normalize date value for Calendar component
  const normalizeDateForCalendar = (
    dateValue: Date | undefined
  ): Date | undefined => {
    if (!dateValue) return undefined;
    return typeof dateValue === "string" ? new Date(dateValue) : dateValue;
  };

  // Always use controlled value
  const date = controlledValue;

  // Convert date for Calendar component
  const calendarDate = normalizeDateForCalendar(date);

  const handleDateSelect = (selectedDate: Date | undefined) => {
    // Ensure we're working with a Date object or undefined
    const normalizedDate =
      selectedDate instanceof Date ? selectedDate : undefined;

    if (setControlledValue) {
      setControlledValue(normalizedDate);
    }
    setIsOpen(false); // Close the popover on date selection
  };

  const formatDate = (dateToFormat: Date | string | undefined): string => {
    if (!dateToFormat) return "";
    // Convert ISO string to Date if needed
    const date =
      typeof dateToFormat === "string" ? new Date(dateToFormat) : dateToFormat;
    return date.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="flex flex-col">
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <button
            type="button"
            disabled={disabled}
            className={cn(
              "flex h-8 w-full items-center gap-2 rounded-md border border-neutral-600 bg-white px-2 py-2 text-xs font-medium",
              "focus:outline-none focus:ring-2 focus:ring-primary-500",
              "disabled:cursor-not-allowed disabled:bg-neutral-100",
              errorMessage && "border-error-500 focus:ring-error-500",
              className
            )}
          >
            <IconComponent
              src="/icons/calendar.svg" // Assuming this is the correct path
              className="size-6 text-[#868686]"
              alt="Calendar Icon"
            />
            <span className={cn(!date && "text-neutral-500")}>
              {date ? formatDate(date) : placeholder}
            </span>
          </button>
        </PopoverTrigger>
        <PopoverContent align="start" className="w-auto p-0">
          <Calendar
            mode="single"
            selected={calendarDate}
            onSelect={handleDateSelect}
            initialFocus
            className="max-w-[300px]"
            required={false}
          />
        </PopoverContent>
      </Popover>
      {errorMessage && (
        <span className="mt-1 text-xs font-medium text-error-500">
          {errorMessage}
        </span>
      )}
    </div>
  );
};
