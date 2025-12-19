"use client";

import dynamic from "next/dynamic";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";

import { useDevice } from "@muatmuat/hooks/use-device";
import { useShallowCompareEffect } from "@muatmuat/hooks/use-shallow-effect";
import { useShallow } from "zustand/react/shallow";

import { useNavigationActions } from "./hooks";
import { useNavigationStore } from "./store";
import {
  createScreenSearchParam,
  isValidScreenPath,
  parseScreenSearchParam,
} from "./utils";

export type Props = {
  basePath: string;
};

// Navigation safety constants
const MAX_NAVIGATION_ATTEMPTS = 5;
const NAVIGATION_COOLDOWN_MS = 1000;

/**
 * Hook to handle URL synchronization with navigation state
 */
const Sync = ({ basePath }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const screenSearchParam = searchParams.get("screen");
  const stack = useNavigationStore(useShallow((state) => state.stack));
  const { isMobile } = useDevice();
  const {
    replace: replaceNavigation,
    setHasReady: setNavigationHasReady,
    setIsDoingRealNavigation,
  } = useNavigationActions();
  const isNavigationHydrated = useNavigationStore((state) => state.isHydrated);
  const hasCompletedInitialSync = useNavigationStore((state) => state.isReady);
  const navigationAttempts = useNavigationStore(
    (state) => state.navigationAttempts
  );
  const lastNavigationTime = useNavigationStore(
    (state) => state.lastNavigationTime
  );

  // Synchronize isDoingRealNavigation with stack length
  useEffect(() => {
    if (!isNavigationHydrated) return;

    const shouldBeRealNavigation = stack.length === 1;
    const currentState = useNavigationStore.getState();

    if (currentState.isDoingRealNavigation !== shouldBeRealNavigation) {
      setIsDoingRealNavigation(shouldBeRealNavigation);
    }
  }, [stack.length, isNavigationHydrated, setIsDoingRealNavigation]);

  // Handle initial URL sync on mobile - RUNS ONLY ONCE
  useShallowCompareEffect(() => {
    if (!isMobile || !isNavigationHydrated || hasCompletedInitialSync) return;

    // Get current stack state directly to avoid circular dependency
    const currentStackState = useNavigationStore.getState();
    const currentStack =
      currentStackState.stack[currentStackState.stack.length - 1];

    let needsNavigation = false;
    let targetPath = "/";
    let targetParams: Record<string, any> = {};

    if (!screenSearchParam) {
      if (currentStack?.path !== "/") {
        needsNavigation = true;
        targetPath = "/";
      }
    } else {
      const decoded = parseScreenSearchParam(screenSearchParam);
      if (decoded !== currentStack?.path) {
        needsNavigation = true;
        if (isValidScreenPath(decoded)) {
          const foundEntry = currentStackState.stack.find(
            (entry) => entry.path === decoded
          );
          if (foundEntry) {
            targetPath = decoded;
            // Create fresh params to avoid frozen object issues
            targetParams = JSON.parse(JSON.stringify(foundEntry.params));
          } else {
            targetPath = "/";
          }
        } else {
          targetPath = "/";
        }
      }
    }

    // Only navigate if needed and different from current state
    if (needsNavigation && currentStack?.path !== targetPath) {
      // Prevent infinite loops with safeguards
      const now = Date.now();
      if (
        navigationAttempts >= MAX_NAVIGATION_ATTEMPTS ||
        now - lastNavigationTime < NAVIGATION_COOLDOWN_MS
      ) {
        console.warn(
          "[ResponsiveNavigation] Navigation blocked: Too many attempts or cooldown period active"
        );
        return;
      }

      // Update safety counters in store
      const currentState = useNavigationStore.getState();
      currentState.actions.resetNavigationSafety(); // Reset counters
      // Set new counters
      useNavigationStore.setState({
        navigationAttempts: navigationAttempts + 1,
        lastNavigationTime: now,
      });

      try {
        replaceNavigation(targetPath, targetParams);
      } catch (error) {
        console.error("[ResponsiveNavigation] Navigation error:", error);
        // Reset counter on error to allow recovery
        currentState.actions.resetNavigationSafety();
      }
    }

    // Mark initial sync as complete
    setNavigationHasReady();
  }, [
    screenSearchParam,
    isMobile,
    isNavigationHydrated,
    hasCompletedInitialSync,
    replaceNavigation,
    setNavigationHasReady,
  ]);

  // Update URL when stack changes on mobile - DEFENSIVE UPDATES ONLY
  useShallowCompareEffect(() => {
    if (!isMobile || !isNavigationHydrated) return;
    const currentStack = stack[stack.length - 1];
    if (!currentStack) return; // Guard against empty stack

    // Only update URL if there's an actual difference
    const stackString = createScreenSearchParam(currentStack.path);
    if (screenSearchParam !== stackString) {
      const params = new URLSearchParams(window.location.search);
      params.set("screen", stackString);

      const cleanPathname = window.location.pathname.replace(basePath, "");

      // Only update if the URL would actually change
      const newUrl = `${cleanPathname}?${params.toString()}`;
      const currentUrl = window.location.pathname + window.location.search;

      if (newUrl !== currentUrl) {
        router.replace(newUrl, {
          scroll: false,
        });
      }
    }
  }, [
    stack,
    searchParams,
    screenSearchParam,
    isMobile,
    isNavigationHydrated,
    router,
    basePath,
  ]);

  return null;
};

export const ResponsiveSearchParamsSync = ({ basePath }: Props) => {
  return (
    <Suspense>
      <Sync basePath={basePath} />
    </Suspense>
  );
};
