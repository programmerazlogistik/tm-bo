"use client";

import { useRouter } from "next/navigation";

import { useShallow } from "zustand/react/shallow";

import { useNavigationStore } from "./store";

/**
 * Hook for responsive navigation with router integration
 */
export const useResponsiveNavigation = () => {
  const router = useRouter();
  const {
    push,
    pop: popFromStack,
    popTo,
    popToTop,
    replace,
  } = useNavigationStore((state) => state.actions);
  const stack = useNavigationStore(useShallow((state) => state.stack));

  const pop = () => {
    // If stack has more than one entry, pop from virtual stack
    if (stack.length > 1) {
      if (process.env.NODE_ENV === "development") {
        console.log("[ResponsiveNavigation] Popping from virtual stack");
      }
      popFromStack();
    } else {
      // If stack only has one entry, use real Next.js router back
      if (process.env.NODE_ENV === "development") {
        console.log("[ResponsiveNavigation] Using router.back()");
      }
      router.back();
    }
  };

  return { push, pop, popTo, popToTop, replace };
};

/**
 * Hook to access current route parameters
 */
export const useResponsiveRouteParams = () => {
  const stack = useNavigationStore(useShallow((state) => state.stack));
  return stack[stack.length - 1]?.params || {};
};

/**
 * Hook to access navigation state - consolidated subscription
 */
export const useNavigationState = () => {
  return useNavigationStore(
    useShallow((state) => ({
      stack: state.stack,
      isHydrated: state.isHydrated,
      isReady: state.isReady,
      isDoingRealNavigation: state.isDoingRealNavigation,
      navigationAttempts: state.navigationAttempts,
      lastNavigationTime: state.lastNavigationTime,
    }))
  );
};

/**
 * Hook to access navigation actions
 */
export const useNavigationActions = () => {
  return useNavigationStore((state) => state.actions);
};
