/**
 * Valibot nested error structure.
 */
export interface ValibotNestedErrors {
  [fieldName: string]: string[] | undefined;
}

/**
 * Flat error object for form state.
 */
export interface FlatErrorObject {
  [fieldName: string]: string;
}

/**
 * Maps nested Valibot errors to a flat error object.
 * Extracts the first error message from each field's error array.
 * Useful for converting Valibot's nested error structure to a simple key-value format.
 *
 * @param valibotErrors - The `nested` error object from Valibot's `flatten`
 * @returns A flat error object for form state management
 *
 * @example
 * const valibotErrors = {
 *   email: ["Invalid email format", "Email is required"],
 *   password: ["Password too short"]
 * };
 * const flatErrors = mapValibotErrors(valibotErrors);
 * // Returns: { email: "Invalid email format", password: "Password too short" }
 */
export const mapValibotErrors = (
  valibotErrors: ValibotNestedErrors
): FlatErrorObject => {
  const newErrors: FlatErrorObject = {};

  for (const fieldName in valibotErrors) {
    const messageArray = valibotErrors[fieldName];
    if (messageArray?.[0]) {
      newErrors[fieldName] = messageArray[0];
    }
  }

  return newErrors;
};
