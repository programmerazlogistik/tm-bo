/**
 * Responsive Navigation System
 *
 * A comprehensive navigation solution for Next.js applications with:
 * - Virtual navigation stack management
 * - URL synchronization for mobile browsers
 * - Safe handling of frozen objects in SSR
 * - TypeScript support with comprehensive type definitions
 */

// Core types and interfaces
export type {
  NavigationActions,
  NavigationState,
  ResponsiveProviderProps,
  ResponsiveRouteProps,
  StackEntry,
} from "./types";

// Store and state management
export { useNavigationStore } from "./store";

// Custom hooks for consuming components
export {
  useNavigationActions,
  useNavigationState,
  useResponsiveNavigation,
  useResponsiveRouteParams,
} from "./hooks";

// React components
export { ResponsiveRoute } from "./components";

// Provider component with browser navigation logic
export { ResponsiveProvider } from "./provider";

// URL synchronization component
export { ResponsiveSearchParamsSync } from "./url-sync";
export type { Props as ResponsiveSearchParamsSyncProps } from "./url-sync";

// Utility functions
export {
  createScreenSearchParam,
  isValidScreenPath,
  parseScreenSearchParam,
} from "./utils";

// Type-related utility functions
export { fromScreenPath, isValidStackEntry, toScreenPath } from "./types";

// Browser-specific navigation utilities
export * from "./browser-navigation";
