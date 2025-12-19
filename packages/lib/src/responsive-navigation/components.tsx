"use client";

import React from "react";

import { useShallow } from "zustand/react/shallow";

import { useNavigationStore } from "./store";
import { ResponsiveRouteProps } from "./types";

// Note: ResponsiveProvider is exported from ./provider.tsx to avoid duplication
// This file focuses on other components

/**
 * Component that conditionally renders based on current navigation path
 */
export const ResponsiveRoute = React.memo(
  ({ path, component }: ResponsiveRouteProps) => {
    const navigationState = useNavigationStore(
      useShallow((state) => ({
        currentPath: state.stack[state.stack.length - 1]?.path,
        isReady: state.isReady,
      }))
    );

    if (path !== navigationState.currentPath || !navigationState.isReady)
      return null;

    return component;
  },
  (prevProps, nextProps) => {
    // Custom comparison function for optimal performance
    return (
      prevProps.path === nextProps.path &&
      prevProps.component === nextProps.component
    );
  }
);
