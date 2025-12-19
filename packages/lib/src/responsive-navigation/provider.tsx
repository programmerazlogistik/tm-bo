"use client";

import { useRef } from "react";

import { useDevice } from "@muatmuat/hooks/use-device";
import { useShallowCompareEffect } from "@muatmuat/hooks/use-shallow-effect";
import { useShallow } from "zustand/react/shallow";

import { useBrowserNavigation } from "./browser-navigation";
import { useNavigationActions } from "./hooks";
import { useNavigationStore } from "./store";
import { ResponsiveProviderProps } from "./types";

/**
 * Responsive navigation provider that orchestrates all navigation logic
 */
export const ResponsiveProvider = ({ children }: ResponsiveProviderProps) => {
  const { isMobile } = useDevice();

  // CONSOLIDATED store subscription to prevent multiple re-renders
  const navigationState = useNavigationStore(
    useShallow((state) => ({
      stack: state.stack,
      isHydrated: state.isHydrated,
    }))
  );

  const { replace: replaceNavigation, setHasReady: setNavigationHasReady } =
    useNavigationActions();

  const { stack, isHydrated: isNavigationHydrated } = navigationState;
  const hasCheckedInitial = useRef(false);

  // Handle browser navigation
  useBrowserNavigation();

  // Initialize navigation state on mobile - FIXED to prevent infinite loops
  useShallowCompareEffect(() => {
    if (hasCheckedInitial.current || !isMobile || !isNavigationHydrated) return;
    hasCheckedInitial.current = true;

    const currentStack = stack[stack.length - 1];
    if (currentStack?.path !== "/") {
      replaceNavigation("/");
    }
    setNavigationHasReady();
  }, [
    stack.length, // Use stack.length instead of stack object to prevent infinite loops
    stack[stack.length - 1]?.path, // Only track the current path
    isMobile,
    isNavigationHydrated,
    replaceNavigation,
    setNavigationHasReady,
  ]);

  return children;
};
