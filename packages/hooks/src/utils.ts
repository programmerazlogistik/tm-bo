/**
 * Performs shallow equality comparison between two values.
 * Based on fast-shallow-equal implementation.
 */
export function shallowEqual(a: any, b: any): boolean {
  if (a === b) return true;

  if (!(a instanceof Object) || !(b instanceof Object)) return false;

  const keys = Object.keys(a);
  const length = keys.length;

  // Check if all keys from a exist in b
  for (let i = 0; i < length; i++) {
    const key = keys[i]!;
    if (!(key in b)) return false;
  }

  // Check if all values are equal
  for (let i = 0; i < length; i++) {
    const key = keys[i]!;
    if (a[key] !== b[key]) return false;
  }

  // Check if b has the same number of keys
  return length === Object.keys(b).length;
}
