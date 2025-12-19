"use client";

import { useEffect } from "react";

import { useDevice } from "@muatmuat/hooks/use-device";

import { useNavigationActions } from "./hooks";
import { useNavigationStore } from "./store";
import { parseScreenSearchParam } from "./utils";

/**
 * Hook to handle browser back/forward navigation
 */
export const useBrowserNavigation = () => {
  const { isMobile } = useDevice();
  const { popTo } = useNavigationActions();

  useEffect(() => {
    if (!isMobile) return; // Only handle on mobile

    const handlePopState = () => {
      try {
        const state = useNavigationStore.getState();

        // If we're doing a real navigation (from router.back()), don't interfere
        if (state.isDoingRealNavigation) {
          state.actions.setIsDoingRealNavigation(false);
          return;
        }

        const searchParams = new URLSearchParams(window.location.search);
        const newScreen = searchParams.get("screen") ?? "/";
        const decodedScreen = parseScreenSearchParam(newScreen);

        const currentStack = state.stack;
        const topOfStackPath = currentStack[currentStack.length - 1]?.path;

        // Only sync if the URL state is different from the stack state
        if (decodedScreen !== topOfStackPath) {
          // Check if the target screen exists in our stack
          const targetIndex = currentStack.findIndex(
            (entry) => entry.path === decodedScreen
          );

          if (targetIndex !== -1) {
            // If target exists in stack, pop to it
            popTo(decodedScreen);
          } else {
            // If target doesn't exist in stack, it means we went back beyond our virtual navigation
            // Reset to the base route
            const { replace: replaceNavigation } =
              useNavigationStore.getState().actions;
            replaceNavigation(decodedScreen);
          }
        }
      } catch (error) {
        console.error("[ResponsiveNavigation] Popstate handler error:", error);
        // Reset to safe state on error
        const { replace: replaceNavigation } =
          useNavigationStore.getState().actions;
        replaceNavigation("/");
      }
    };

    // Add event listener with proper error handling
    try {
      window.addEventListener("popstate", handlePopState);
    } catch (error) {
      console.error(
        "[ResponsiveNavigation] Failed to add popstate listener:",
        error
      );
    }

    // Cleanup function with proper error handling
    return () => {
      try {
        window.removeEventListener("popstate", handlePopState);
      } catch (error) {
        console.error(
          "[ResponsiveNavigation] Failed to remove popstate listener:",
          error
        );
      }
    };
  }, [popTo, isMobile]);
};
