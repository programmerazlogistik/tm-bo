export const cleanObjectValues = (obj) => {
  if (obj === null || typeof obj !== "object") return obj;

  // Handle arrays
  if (Array.isArray(obj)) {
    const cleaned = obj.map(cleanObjectValues).filter((item) => {
      // Keep item if:
      // - It's an object/array (even if empty) — but note: empty arrays will be filtered out
      // - It's truthy and not one of the specific falsy values we want to exclude
      return !(
        item === null ||
        item === 0 ||
        item === "" ||
        item === undefined ||
        (Array.isArray(item) && item.length === 0)
      );
    });
    return cleaned.length === 0 ? null : cleaned;
  }

  // Handle objects
  const result = {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const value = cleanObjectValues(obj[key]);

      // Skip if value is one of the specified "empty" values
      if (
        value === null ||
        value === 0 ||
        value === "" ||
        value === undefined ||
        (Array.isArray(value) && value.length === 0)
      ) {
        continue;
      }

      result[key] = value;
    }
  }

  return result;
};
