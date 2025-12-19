/**
 * Types for responsive navigation system
 */

// Keep branded types internal for type safety but export as string for compatibility
type ScreenPath = string & { readonly __brand: unique symbol };
type NavigationId = string & { readonly __brand: unique symbol };

export interface StackEntry {
  /** The route path (e.g., "/about") */
  path: string; // Keep as string for backward compatibility
  /** The React element to render */
  component?: React.ReactNode; // Add back for backward compatibility
  /** Optional parameters passed to the route */
  params: Record<string, any>; // Keep mutable for backward compatibility
}

export interface NavigationActions {
  /** Push a new screen to the navigation stack */
  push: (path: string, params?: Record<string, any>) => void;
  /** Remove the top screen from the navigation stack */
  pop: () => void;
  /** Pop screens until reaching the specified path */
  popTo: (path: string) => void;
  /** Pop all screens except the first one */
  popToTop: () => void;
  /** Replace the current screen with a new one */
  replace: (path: string, params?: Record<string, any>) => void;
}

export interface NavigationState {
  /** Stack of route entries representing the navigation history */
  stack: StackEntry[];
  /** Whether the store has been hydrated from persisted storage */
  isHydrated: boolean;
  /** Whether the navigation system is ready */
  isReady: boolean;
  /** Whether real browser navigation is in progress */
  isDoingRealNavigation: boolean;
  /** Navigation actions */
  actions: NavigationActions & {
    setHasHydrated: () => void;
    setHasReady: () => void;
    setIsDoingRealNavigation: (value: boolean) => void;
  };
}

// Internal state for safety features (not exported to maintain compatibility)
interface InternalNavigationState extends NavigationState {
  navigationAttempts: number;
  lastNavigationTime: number;
  actions: NavigationActions & {
    setHasHydrated: () => void;
    setHasReady: () => void;
    setIsDoingRealNavigation: (value: boolean) => void;
    resetNavigationSafety: () => void;
  };
}

// Type guards for runtime validation
export const isValidStackEntry = (entry: any): entry is StackEntry => {
  return (
    entry &&
    typeof entry === "object" &&
    typeof entry.path === "string" &&
    typeof entry.params === "object" &&
    entry.params !== null
  );
};

// Helper functions for branded types
export const toScreenPath = (path: string): ScreenPath => {
  if (!path.startsWith("/")) {
    throw new Error("ScreenPath must start with '/'");
  }
  return path as ScreenPath;
};

export const fromScreenPath = (path: ScreenPath): string => {
  return path as string;
};

export interface ResponsiveProviderProps {
  children: React.ReactNode;
}

export interface ResponsiveRouteProps {
  path: string;
  component: React.ReactNode;
}
