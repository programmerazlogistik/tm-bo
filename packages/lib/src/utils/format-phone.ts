/**
 * Formats phone numbers by adding dashes every 4 digits.
 * Removes any existing formatting and applies consistent dash formatting.
 *
 * @param phoneNumber - Raw phone number (e.g., "081234567890")
 * @returns Formatted phone number (e.g., "0812-3456-7890")
 *
 * @example
 * formatPhoneNumber("081234567890")
 * // Returns: "0812-3456-7890"
 *
 * formatPhoneNumber("0812 3456 7890")
 * // Returns: "0812-3456-7890"
 */
export const formatPhoneNumber = (phoneNumber: string): string => {
  if (!phoneNumber || typeof phoneNumber !== "string") {
    return phoneNumber;
  }

  // Remove any existing formatting (spaces, dashes, etc.)
  const cleanNumber = phoneNumber.replace(/\D/g, "");

  // Split the number into chunks of 4 digits
  const chunks: string[] = [];
  for (let i = 0; i < cleanNumber.length; i += 4) {
    chunks.push(cleanNumber.slice(i, i + 4));
  }

  // Join the chunks with dashes
  return chunks.join("-");
};

/**
 * Formats phone number with prefix for display.
 * Uses formatPhoneNumber internally to ensure consistent formatting.
 *
 * @param phoneNumber - Raw phone number
 * @returns Formatted phone number with consistent formatting
 *
 * @example
 * formatPhoneNumberWithPrefix("081234567890")
 * // Returns: "0812-3456-7890"
 */
export const formatPhoneNumberWithPrefix = (phoneNumber: string): string => {
  const formattedNumber = formatPhoneNumber(phoneNumber);
  return `${formattedNumber}`;
};
