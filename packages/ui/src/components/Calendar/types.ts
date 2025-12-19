import * as React from "react";

import {
  DayPickerProps,
  type DayProps,
  type WeekNumberProps,
} from "react-day-picker";

// =============================================================================
// Base Types
// =============================================================================

/** Status variants for form components */
export type ComponentStatus = "error" | "success";

/** Calendar mode options */
export type CalendarMode = "single" | "multiple" | "range";

/** Date selection types based on calendar mode - compatible with react-day-picker */
export type DateSelection =
  | Date
  | Date[]
  | { from?: Date; to?: Date } // Made from/to optional to match react-day-picker
  | undefined;

/** Callback for date selection changes */
export type DateChangeHandler = (date: DateSelection | undefined) => void;

/** Common date constraints */
export interface DateConstraints {
  /** Minimum selectable date */
  minDate?: Date;
  /** Maximum selectable date */
  maxDate?: Date;
}

/** Common event handlers for picker components */
export interface PickerEventHandlers<T = Date> {
  /** Called when value changes */
  onChange?: (date: T) => void;
  /** Called when apply button is clicked */
  onApply?: (date: T) => void;
  /** Called when cancel button is clicked */
  onCancel?: (date: T) => void;
}

/** Common UI props for picker components */
export interface PickerUIProps {
  /** Disable the picker */
  disabled?: boolean;
  /** Status for styling */
  status?: ComponentStatus;
  /** Date format string */
  dateFormat?: string;
}

/** Common calendar props */
export interface BaseCalendarProps {
  /** Calendar selection mode */
  mode?: CalendarMode;
  /** Currently selected date(s) */
  selected?: DateSelection;
  /** Called when selection changes */
  onChange?: DateChangeHandler;
  /** Focus calendar on mount */
  initialFocus?: boolean;
  /** Minimum selectable date */
  minDate?: Date;
  /** Maximum selectable date */
  maxDate?: Date;
}

// =============================================================================
// Calendar Component Types
// =============================================================================

export type CalendarProps = {
  className?: string;
  classNames?: Partial<Record<string, string>>;
  showOutsideDays?: boolean;
  captionLayout?: "label" | "dropdown";
  _buttonVariant?: "ghost";
  formatters?: DayPickerProps["formatters"];
  components?: DayPickerProps["components"];
  required?: boolean;
  mode?: CalendarMode;
  selected?: DateSelection;
  onChange?: DateChangeHandler;
  onSelect?: DateChangeHandler; // Add onSelect prop to support direct callback
  initialFocus?: boolean;
  minDate?: Date;
  maxDate?: Date;
  disabled?: boolean;
} & Omit<
  DayPickerProps,
  | "className"
  | "classNames"
  | "showOutsideDays"
  | "captionLayout"
  | "formatters"
  | "components"
  | "mode"
  | "selected"
  | "onSelect"
  | "initialFocus"
  | "fromDate"
  | "toDate"
  | "disabled"
  | "required"
>;

export type CalendarDayButtonProps = DayProps;
export type CalendarWeekNumberProps = WeekNumberProps;

// =============================================================================
// Date Picker Types
// =============================================================================

/** Props for simple date picker without time */
export interface DatePickerWebProps
  extends PickerEventHandlers<Date | undefined>,
    DateConstraints,
    PickerUIProps {
  /** Current date value (null for empty) */
  value?: Date | null;
  /** Placeholder text for empty state */
  placeholder?: string;
  /** Additional CSS class for container */
  className?: string;
  /** The error message to display below the picker */
  errorMessage?: string;
  /** Hide the error message display */
  hideErrorMessage?: boolean;
  /** Translation function */
  t?: (key: string, values?: Record<string, any>, fallback?: string) => string;
}

// =============================================================================
// Date Time Picker Types
// =============================================================================

/** Props for date-time picker with time selection */
export interface DateTimePickerWebProps
  extends PickerEventHandlers<Date | undefined>,
    DateConstraints,
    PickerUIProps {
  /** Current date-time value (null/undefined for empty) */
  value?: Date | null;
  /** Placeholder text for empty state */
  placeholder?: string;
  /** Show time selection */
  showTime?: boolean;
  /** Show seconds in time selection */
  showSeconds?: boolean;
  /** Step for minute selection */
  timeStep?: number;
  /** Additional CSS class for container */
  className?: string;
  /** The error message to display below the picker */
  errorMessage?: string;
}

/** Props for responsive date-time picker */
export interface DateTimePickerResponsiveProps
  extends PickerEventHandlers<Date>,
    DateConstraints {
  /** Current date-time value */
  value?: Date;
  /** Child components */
  children: React.ReactNode;
  /** Use modal overlay instead of inline */
  useModal?: boolean;
  /** Modal title */
  title?: string;
  /** Show clear button */
  showClear?: boolean;
  /** Calendar mode */
  mode?: CalendarMode;
  /** Selected date(s) for calendar */
  selected?: Date | Date[];
  /** Calendar selection handler */
  onChange?: DateChangeHandler;
  /** Focus calendar on mount */
  initialFocus?: boolean;
  /** Disable the picker */
  disabled?: boolean;
  /** The error message to display below the picker */
  errorMessage?: string;
}

// =============================================================================
// Responsive Picker Types
// =============================================================================

/** Props for responsive date picker using native date input */
export interface DatePickerResponsiveProps
  extends PickerEventHandlers<string | undefined>,
    DateConstraints,
    PickerUIProps {
  /** Current date value (null for empty) - string format for native date input */
  value?: string | null;
  /** Placeholder text for empty state */
  placeholder?: string;
  /** Additional CSS class for container */
  className?: string;
  /** The error message to display below the picker */
  errorMessage?: string;
  /** Hide the error message display */
  hideErrorMessage?: boolean;
  /** Translation function */
  t?: (key: string, values?: Record<string, any>, fallback?: string) => string;
  /** Custom appearance overrides */
  appearance?: {
    containerClassName?: string;
    inputClassName?: string;
    errorMessageClassName?: string;
  };
  /** @deprecated Use status="error" instead */
  isError?: boolean;
}

// =============================================================================
// Time Picker Types
// =============================================================================

/** Props for time selection column component */
export interface TimeColumnProps {
  /** Array of time values to display */
  values: number[];
  /** Currently selected value */
  selectedValue: number;
  /** Called when a value is selected */
  onChange: (value: number) => void;
  /** Number of visible items in the column */
  visibleItemCount?: number;
}

// =============================================================================
// Legacy Type Aliases (for backward compatibility)
// =============================================================================

/** @deprecated Use PickerUIProps['status'] instead */
export type DateTimePickerStatus = ComponentStatus;

/** @deprecated Use DateConstraints instead */
export type DateRangeConstraints = DateConstraints;
