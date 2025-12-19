/**
 * Utility functions for navigation system
 */

export const isValidScreenPath = (path: any): path is string => {
  // Type validation
  if (typeof path !== "string") return false;

  // Basic path validation
  if (!path.startsWith("/")) return false;

  // XSS protection - disallow dangerous characters
  if (/[<>:"\\|?*\x00-\x1f]/.test(path)) {
    console.warn(
      "[ResponsiveNavigation] Invalid path characters detected:",
      path
    );
    return false;
  }

  // Length limits to prevent DoS
  if (path.length > 1000) {
    console.warn("[ResponsiveNavigation] Path too long:", path.length);
    return false;
  }

  // Prevent directory traversal attacks
  if (path.includes("..") || path.includes("\\")) {
    console.warn(
      "[ResponsiveNavigation] Path traversal attempt detected:",
      path
    );
    return false;
  }

  return true;
};

export const createScreenSearchParam = (path: string): string => {
  if (!isValidScreenPath(path)) {
    console.warn(
      "[ResponsiveNavigation] Attempted to encode invalid path:",
      path
    );
    return encodeURIComponent("/");
  }

  try {
    return encodeURIComponent(path);
  } catch (error) {
    console.error("[ResponsiveNavigation] Encoding error:", error);
    return encodeURIComponent("/");
  }
};

export const parseScreenSearchParam = (searchParam: string | null): string => {
  if (!searchParam) return "/";

  try {
    const decoded = decodeURIComponent(searchParam);
    return isValidScreenPath(decoded) ? decoded : "/";
  } catch (error) {
    console.error("[ResponsiveNavigation] Decoding error:", error);
    return "/";
  }
};
