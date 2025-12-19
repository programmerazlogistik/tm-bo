"use client";

import React, { useEffect } from "react";

import { cn } from "@muatmuat/lib/utils";
import { Portal } from "@radix-ui/react-portal";

import { useFakePageStore } from "./store";
import type { FakePageProps } from "./types";

/* -------------------------------------------------------------------------- */
/*                               FakePage Component                           */
/* -------------------------------------------------------------------------- */

export function FakePage({
  className,
  step,
  children,
  hideMainContent = true,
  containerId = "fake-page-portal",
  mainContentId = "app-layout",
}: FakePageProps) {
  const store = useFakePageStore();
  const { currentStep } = store;
  const isOpen = currentStep !== null;

  // Handle hiding of main layout when fake page is active
  useEffect(() => {
    if (!hideMainContent) return;

    const layout = document.getElementById(mainContentId);
    if (!layout) return;

    // Simple, predictable behavior
    if (isOpen) {
      layout.classList.add("hidden");
    } else {
      layout.classList.remove("hidden");
    }

    // Cleanup: Always ensure visibility when unmounting during navigation
    return () => {
      layout?.classList.remove("hidden");
    };
  }, [isOpen, mainContentId, hideMainContent]);

  // Render only if current step matches
  if (currentStep !== step) return null;

  const container = document.getElementById(containerId);
  if (!container) return null;

  return (
    <Portal container={container}>
      <div
        className={cn(
          "fixed inset-0 z-[100] overflow-y-auto bg-white",
          className
        )}
      >
        {children}
      </div>
    </Portal>
  );
}
