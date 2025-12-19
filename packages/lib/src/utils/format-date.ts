import {
  addDays,
  differenceInDays,
  format,
  isPast,
  isSameDay,
  parseISO,
  subDays,
} from "date-fns";
import { enUS, id } from "date-fns/locale";

/**
 * Date input type - accepts string, Date, or number.
 */
export type DateInput = string | Date | number | null | undefined;

/**
 * Options for formatDate function.
 */
export interface FormatDateOptions {
  padDay?: boolean;
  withWIB?: boolean;
}

/**
 * Options for formatLoadTime function.
 */
export interface FormatLoadTimeOptions {
  showOneLine?: boolean;
  shortenSameDay?: boolean;
}

/**
 * Date classification utility object.
 */
export interface DateClassifier {
  getClasifyPeriode: (val: number) => string;
  getClasifyPeriodeByRange: (value: DateInput) => string;
}

/**
 * [INTERNAL] A robust, centralized function to parse various date inputs.
 * Returns a valid Date object or null if the input is invalid.
 * @private
 * @param dateInput - Date input to parse
 * @returns Valid Date object or null if invalid
 */
const _parseDate = (dateInput: DateInput): Date | null => {
  if (!dateInput) return null;
  try {
    // Standardize input to a Date object. parseISO is best for strings.
    const date =
      typeof dateInput === "string" ? parseISO(dateInput) : new Date(dateInput);

    // The getTime() of an invalid date is NaN. This is the best check.
    if (isNaN(date.getTime())) {
      throw new Error(`Invalid date value received: ${dateInput}`);
    }
    return date;
  } catch (error) {
    console.error(error instanceof Error ? error.message : String(error));
    return null;
  }
};

/**
 * Formats an ISO string into "d MMM yyyy HH:mm WIB" format.
 * Allows for day padding (e.g., '03' vs '3') and WIB timezone suffix control.
 *
 * @param isoString - Date input to format
 * @param options - Formatting options
 * @returns Formatted date string or empty string if invalid
 *
 * @example
 * formatDate("2023-12-25T10:30:00Z")
 * // Returns: "25 Des 2023 10:30 WIB"
 *
 * formatDate("2023-12-25T10:30:00Z", { padDay: true, withWIB: false })
 * // Returns: "25 Des 2023 10:30"
 */
const defaultFormatOptions = { padDay: false, withWIB: true };
export function formatDate(
  isoString: DateInput,
  options: FormatDateOptions = defaultFormatOptions
): string {
  const { padDay, withWIB } = { ...defaultFormatOptions, ...options };
  const date = _parseDate(isoString);
  if (!date) return "";

  const formatString = padDay ? "dd MMM yyyy HH:mm" : "d MMM yyyy HH:mm";
  const formattedDate = format(date, formatString, { locale: id });
  return withWIB ? `${formattedDate} WIB` : formattedDate;
}

/**
 * Formats an ISO string into "HH:mm WIB" format.
 *
 * @param isoString - Date input to format
 * @returns Formatted time string or empty string if invalid
 *
 * @example
 * formatTime("2023-12-25T10:30:00Z")
 * // Returns: "10:30 WIB"
 */
export function formatTime(isoString: DateInput): string {
  const date = _parseDate(isoString);
  if (!date) return "";

  const formattedTime = format(date, "HH:mm", { locale: id });
  return `${formattedTime} WIB`;
}

/**
 * Formats an ISO string with the full month name.
 *
 * @param isoString - Date input to format
 * @returns Formatted date string with full month name
 *
 * @example
 * formatDateFullMonth("2023-12-25T10:30:00Z")
 * // Returns: "25 Desember 2023 10:30 WIB"
 */
export function formatDateFullMonth(isoString: DateInput): string {
  const date = _parseDate(isoString);
  if (!date) return "";

  const formattedDate = format(date, "d MMMM yyyy HH:mm", { locale: id });
  return `${formattedDate} WIB`;
}

/**
 * DEPRECATED USAGE WARNING: This function uses the native `toLocaleDateString`,
 * which can have inconsistent results across different JS environments (browsers vs. Node.js).
 * Refactoring to date-fns/format is recommended for full consistency if possible.
 * The implementation below is a cleaned-up version of the original.
 *
 * @param dateString - Date input to format
 * @param ops - Array of options to include in formatting
 * @param wib - Whether to include WIB suffix
 * @param newFormat - Custom format options
 * @returns Formatted date string
 *
 * @example
 * formatDateInput("2023-12-25T10:30:00Z", ["day", "month", "year"])
 * // Returns: "25 Des 2023 WIB"
 */
export function formatDateInput(
  dateString: DateInput,
  ops: string[] = [],
  wib: boolean = true,
  newFormat?: Record<string, string>
): string {
  const date = _parseDate(dateString);
  if (!date) return "";

  try {
    // The core logic using toLocaleDateString is preserved as requested.
    const allOptions: Intl.DateTimeFormatOptions = {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: "Asia/Jakarta",
    };

    const selectedOptions = newFormat
      ? newFormat
      : Object.fromEntries(
          Object.entries(allOptions).filter(([key]) => ops.includes(key))
        );

    const resultDate = date
      .toLocaleDateString("id-ID", selectedOptions)
      .replace(",", ""); // e.g., "31 Jul 2025 02:45"

    if (wib) return `${resultDate} WIB`;
    return resultDate;
  } catch (error) {
    console.error("Error in formatDateInput:", error);
    return "";
  }
}

/**
 * An object containing date classification methods, preserving the original API
 * without the unsafe "new ClasifyDate()" instantiation on import.
 */
export const clasifyformatdate: DateClassifier = {
  /**
   * Gets a date string from a number of days in the past.
   * @param val - Number of days in the past
   * @returns Date string in YYYY-MM-DD format
   */
  getClasifyPeriode(val: number): string {
    const pastDate = subDays(new Date(), val);
    return format(pastDate, "yyyy-MM-dd");
  },
  /**
   * Converts a date value to YYYY-MM-DD format.
   * @param value - Date input to format
   * @returns Date string in YYYY-MM-DD format
   */
  getClasifyPeriodeByRange(value: DateInput): string {
    const date = _parseDate(value);
    return date ? format(date, "yyyy-MM-dd") : "";
  },
};

/**
 * Gets a future date by adding a number of days to today.
 *
 * @param daysToAdd - Number of days to add to current date
 * @returns Future date
 *
 * @example
 * getAdjustedDate(7)
 * // Returns: Date object 7 days from now
 */
export const getAdjustedDate = (daysToAdd: number): Date => {
  return addDays(new Date(), daysToAdd);
};

/**
 * Converts a date string to English format "d MMM yyyy HH:mm".
 *
 * @param dateString - Date input to format
 * @returns Formatted date string in English
 *
 * @example
 * convertDate("2023-12-25T10:30:00Z")
 * // Returns: "25 Dec 2023 10:30"
 */
export function convertDate(dateString: DateInput): string {
  const date = _parseDate(dateString);
  if (!date) return "";
  return format(date, "d MMM yyyy HH:mm", { locale: enUS });
}

/**
 * Formats an ISO string to a short date format "d MMM yyyy".
 *
 * @param isoString - Date input to format
 * @returns Formatted short date string
 *
 * @example
 * formatShortDate("2023-12-25T10:30:00Z")
 * // Returns: "25 Des 2023"
 */
export const formatShortDate = (isoString: DateInput): string => {
  const date = _parseDate(isoString);
  if (!date) return "";
  return format(date, "d MMM yyyy", { locale: id });
};

/**
 * Formats an ISO string to "DD Mon YYYY" format (e.g., "21 Agu 2025").
 *
 * @param isoString - Date input to format
 * @returns Formatted date string with padded day
 *
 * @example
 * formatDateToDDMonYYYY("2023-12-25T10:30:00Z")
 * // Returns: "25 Des 2023"
 */
export const formatDateToDDMonYYYY = (isoString: DateInput): string => {
  const date = _parseDate(isoString);
  if (!date) return "";
  return format(date, "dd MMM yyyy", { locale: id });
};

/**
 * Formats a date range, intelligently showing time remaining for upcoming end dates.
 *
 * @param startDate - Start date of the range
 * @param endDate - End date of the range
 * @returns Formatted date range string
 *
 * @example
 * formatDateRange("2023-12-20", "2023-12-25")
 * // Returns: "20 Des 2023 - 25 Des 2023" or time remaining message
 */
export const formatDateRange = (
  startDate: DateInput,
  endDate: DateInput
): string => {
  const start = _parseDate(startDate);
  const end = _parseDate(endDate);

  // If there's an end date, check for time remaining first.
  if (end && !isPast(end)) {
    const daysRemaining = differenceInDays(end, new Date());
    if (daysRemaining < 1) {
      return "Berakhir dalam 24 jam";
    }
    if (daysRemaining <= 7) {
      return `Berakhir ${daysRemaining + 1} hari lagi`;
    }
  }

  // Fallback to standard date range formatting.
  const formattedStart = start ? formatShortDate(start) : "";
  const formattedEnd = end ? formatShortDate(end) : "";

  if (formattedStart && formattedEnd) {
    // If start and end dates are the same, just show one.
    return formattedStart === formattedEnd
      ? formattedStart
      : `${formattedStart} - ${formattedEnd}`;
  }

  // Return whichever one is valid, or a default message.
  return formattedStart || formattedEnd || "";
};

/**
 * Formats load time based on start and end dates.
 * If only loadTimeStart is present, formats as "DD MMM YYYY HH:mm WIB".
 * If both are present and on the same day, formats as "DD MMM YYYY HH:mm WIB s/d HH:mm WIB".
 * If both are present and on different days, formats as "DD MMM YYYY HH:mm WIB s/d DD MMM YYYY HH:mm WIB".
 *
 * @param loadTimeStart - Start time for loading
 * @param loadTimeEnd - End time for loading
 * @param options - Formatting options
 * @returns Formatted load time string
 *
 * @example
 * formatLoadTime("2023-12-25T10:30:00Z", "2023-12-25T15:30:00Z")
 * // Returns: "25 Des 2023 10:30 WIB s/d 15:30 WIB"
 */
export function formatLoadTime(
  loadTimeStart: DateInput,
  loadTimeEnd: DateInput,
  options: FormatLoadTimeOptions = { showOneLine: false, shortenSameDay: true }
): string {
  const startDate = _parseDate(loadTimeStart);
  const endDate = _parseDate(loadTimeEnd);

  if (!startDate) return "";

  const formattedStartDate = format(startDate, "dd MMM yyyy", { locale: id });
  const formattedStartTime = `${format(startDate, "HH:mm", { locale: id })} WIB`;

  if (!endDate) {
    return `${formattedStartDate} ${formattedStartTime}`;
  }

  const formattedEndDate = format(endDate, "dd MMM yyyy", { locale: id });
  const formattedEndTime = `${format(endDate, "HH:mm", { locale: id })} WIB`;

  const separator = options.showOneLine ? " " : " ";

  if (isSameDay(startDate, endDate)) {
    if (options.shortenSameDay) {
      return `${formattedStartDate} ${formattedStartTime} s/d${separator}${formattedEndTime}`;
    } else {
      return `${formattedStartDate} ${formattedStartTime} s/d ${formattedEndDate} ${formattedEndTime}`;
    }
  } else {
    return `${formattedStartDate} ${formattedStartTime} s/d${separator}${formattedEndDate} ${formattedEndTime}`;
  }
}

/**
 * Helper function to format DD-MM-YYYY to YYYY-MM-DD without timezone issues.
 * Handles both dash and slash separators.
 *
 * @param dateStr - Date string to format
 * @returns Formatted date string in YYYY-MM-DD format
 *
 * @example
 * formatToYYYYMMDD("25-12-2023")
 * // Returns: "2023-12-25"
 *
 * formatToYYYYMMDD("25/12/2023")
 * // Returns: "2023-12-25"
 */
export const formatToYYYYMMDD = (dateStr: string): string => {
  if (!dateStr) return "";

  // Handle DD-MM-YYYY format (with dashes)
  const dashParts = dateStr.split("-");
  if (dashParts.length === 3 && dashParts[0] && dashParts[0].length <= 2) {
    return `${dashParts[2]}-${dashParts[1]}-${dashParts[0]}`;
  }

  // Handle DD/MM/YYYY format (with slashes)
  const slashParts = dateStr.split("/");
  if (slashParts.length === 3 && slashParts[0] && slashParts[0].length <= 2) {
    return `${slashParts[2]}-${slashParts[1]}-${slashParts[0]}`;
  }

  // If already in YYYY-MM-DD format, return as is
  return dateStr;
};
