/**
 * Options for Intl.NumberFormat configuration.
 */
export interface NumberFormatOptions {
  style?: "decimal" | "currency" | "percent" | "unit";
  currency?: string;
  maximumFractionDigits?: number;
  currencyDisplay?: "code" | "symbol" | "narrowSymbol" | "name";
  [key: string]: any;
}

/**
 * Translation function type for formatNumberShorthand.
 */
export type TranslationFunction = (
  key: string,
  options?: any,
  fallback?: string
) => string;

/**
 * Formats a number as Indonesian Rupiah currency.
 * Uses Indonesian locale and removes extra spaces from the Rp prefix.
 *
 * @param num - Number to format as currency
 * @param opts - Additional formatting options
 * @returns Formatted currency string (e.g., "Rp1.000.000")
 *
 * @example
 * idrFormat(1000000)
 * // Returns: "Rp1.000.000"
 */
export const idrFormat = (num: number, opts?: NumberFormatOptions): string =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
    ...opts,
  })
    .format(num || 0)
    .replace(/Rp\s+/g, "Rp");

/**
 * Formats a number with thousand separators using Indonesian locale.
 * Does not include currency symbols, only number formatting.
 *
 * @param num - Number to format with separators
 * @param opts - Additional formatting options
 * @returns Formatted number string (e.g., "1.000.000")
 *
 * @example
 * thousandSeparator(1000000)
 * // Returns: "1.000.000"
 */
export const thousandSeparator = (
  num: number,
  opts?: NumberFormatOptions
): string =>
  new Intl.NumberFormat("id-ID", {
    maximumFractionDigits: 0,
    currencyDisplay: "narrowSymbol",
    ...opts,
  }).format(num || 0);

/**
 * Formats a number with comma as decimal separator.
 * Converts decimal point to comma following Indonesian number format.
 *
 * @param value - Value to format (will be parsed as float)
 * @returns Formatted number with comma separator or original value if invalid
 *
 * @example
 * formatNumberWithComma(3.5)
 * // Returns: "3,5"
 */
export const formatNumberWithComma = (value: any): string => {
  if (value === null || value === undefined) return "";

  const num = parseFloat(value);
  if (isNaN(num)) return value;

  // Format to at least 1 decimal place and use comma as separator
  return num.toFixed(1).replace(".", ",");
};

/**
 * Formats a number into a shorthand string based on Indonesian notation.
 * - Billions (>= 1,000,000,000) are formatted with an "M" (Miliar) suffix.
 * - Millions (>= 1,000,000) are formatted with a "JT" (Juta) suffix.
 * - Thousands (>= 1,000) are formatted with an "RB" (Ribu) suffix.
 * - Numbers < 1,000 are returned as is.
 * The format does not include spaces or decimals (e.g., "45RB", "12JT", "1M").
 *
 * @param value - The number to format. Handles values up to 99,999,999,999.
 * @param t - The translation function (defaults to returning fallback)
 * @returns The formatted number as a string, or the original value if input is not a valid number.
 *
 * @example
 * formatNumberShorthand(1500)
 * // Returns: "1RB"
 *
 * formatNumberShorthand(2500000)
 * // Returns: "2JT"
 *
 * formatNumberShorthand(3500000000)
 * // Returns: "3M"
 */
export const formatNumberShorthand = (
  value: any,
  t: TranslationFunction = (key, options, fallback) => fallback || ""
): string => {
  // Return original value if it's not a number or is null/undefined
  if (isNaN(parseFloat(value)) || !isFinite(value)) {
    return value;
  }

  const num = Number(value);
  const absNum = Math.abs(num);

  // Using numeric separators for better readability of thresholds
  const MILIAR = 1_000_000_000;
  const JUTA = 1_000_000;
  const RIBU = 1_000;

  let formattedString: string;

  // Logic must be ordered from largest to smallest threshold
  if (absNum >= MILIAR) {
    formattedString = `${Math.floor(absNum / MILIAR)}${t("formatNumberShorthand.billion", {}, "M")}`;
  } else if (absNum >= JUTA) {
    formattedString = `${Math.floor(absNum / JUTA)}${t("formatNumberShorthand.million", {}, "JT")}`;
  } else if (absNum >= RIBU) {
    formattedString = `${Math.floor(absNum / RIBU)}${t("formatNumberShorthand.thousand", {}, "RB")}`;
  } else {
    // For numbers less than 1,000, return them as an integer string
    formattedString = String(Math.floor(absNum));
  }

  // Add the negative sign back if the original number was negative
  return num < 0 ? `-${formattedString}` : formattedString;
};
