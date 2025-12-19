/**
 * Interface for objects with namaMuatan property structure.
 */
export interface MuatanItem {
  namaMuatan: {
    value: string;
  };
}

/**
 * Combines two arrays and returns a new array with unique elements only.
 * Uses Set to ensure uniqueness and maintains order of first occurrence.
 *
 * @template T
 * @param arr1 - First array to combine
 * @param arr2 - Second array to combine
 * @returns New array containing unique elements from both input arrays
 *
 * @example
 * const result = addArraysUnique([1, 2, 3], [3, 4, 5]);
 * // Returns: [1, 2, 3, 4, 5]
 */
export const addArraysUnique = <T>(arr1: T[], arr2: T[]): T[] => {
  // Combine the arrays using the spread syntax
  const combinedArray = [...arr1, ...arr2];

  // Use a Set to store unique elements (Sets only allow unique values)
  const uniqueSet = new Set(combinedArray);

  // Convert the Set back to an array using the spread syntax
  const uniqueArray = [...uniqueSet];

  return uniqueArray;
};

/**
 * Returns elements from the first array that are not present in the second array.
 * Performs a difference operation between two arrays.
 *
 * @template T
 * @param arr1 - Array to filter from
 * @param arr2 - Array containing elements to exclude
 * @returns New array containing elements from arr1 that are not in arr2
 *
 * @example
 * const result = getElementsNotInSecondArray([1, 2, 3, 4], [2, 4]);
 * // Returns: [1, 3]
 */
export const getElementsNotInSecondArray = <T>(arr1: T[], arr2: T[]): T[] => {
  const result = arr1.filter((element) => !arr2.includes(element));
  return result;
};

/**
 * Type guard to check if an item is a valid MuatanItem
 */
function isValidMuatanItem(item: unknown): item is MuatanItem {
  return (
    typeof item === "object" &&
    item !== null &&
    typeof (item as MuatanItem).namaMuatan === "object" &&
    (item as MuatanItem).namaMuatan !== null &&
    typeof (item as MuatanItem).namaMuatan.value === "string"
  );
}

/**
 * Compares two arrays by their namaMuatan.value property only.
 * Returns true if both arrays contain the same namaMuatan values (order doesn't matter).
 * Used to check if cargo information has no changes in cargo names.
 *
 * @param array1 - First array of muatan items to compare
 * @param array2 - Second array of muatan items to compare
 * @returns True if both arrays have the same namaMuatan values, false otherwise
 *
 * @example
 * const items1 = [{ namaMuatan: { value: "Rice" } }, { namaMuatan: { value: "Sugar" } }];
 * const items2 = [{ namaMuatan: { value: "Sugar" } }, { namaMuatan: { value: "Rice" } }];
 * const result = compareArraysByNameOnly(items1, items2);
 * // Returns: true
 */
export const compareArraysByNameOnly = (
  array1: MuatanItem[],
  array2: MuatanItem[]
): boolean => {
  // If arrays have different lengths, they can't have the same names
  if (array1.length !== array2.length) {
    return false;
  }

  // Create a map of namaMuatan values from the first array
  const namesMap = new Map<string, boolean>();

  for (const item of array1) {
    if (!isValidMuatanItem(item)) {
      return false; // Invalid structure
    }
    namesMap.set(item.namaMuatan.value, true);
  }

  // Check if all namaMuatan values from the second array exist in the first array
  for (const item of array2) {
    if (!isValidMuatanItem(item)) {
      return false; // Invalid structure
    }

    // If a namaMuatan value doesn't exist in the first array, return false
    if (!namesMap.has(item.namaMuatan.value)) {
      return false;
    }

    // Remove the name from the map to ensure no duplicates
    namesMap.delete(item.namaMuatan.value);
  }

  // If all names were found and accounted for, namesMap should be empty
  return namesMap.size === 0;
};
