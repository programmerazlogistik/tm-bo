"use client";

import { useEffect } from "react";

const STACK_ITEM_SELECTOR = '[data-stack-item="true"]';
const OBSCURED_CLASS = "is-obscured";

/**
 * Manages the visibility of stackable items (modals, bottom sheets) on the page.
 * It ensures that only the topmost item is visible.
 */
export interface StackManager {
  observer: MutationObserver | null;
  manageStack: () => void;
  init: () => void;
}

export const stackManager: StackManager = {
  observer: null,

  /**
   * Queries the DOM and updates the visibility of all stackable items.
   */
  manageStack: (): void => {
    const stackItems = Array.from(
      document.querySelectorAll(STACK_ITEM_SELECTOR)
    );

    stackItems.forEach((item, index) => {
      if (index < stackItems.length - 1) {
        item.classList.add(OBSCURED_CLASS);
      } else {
        item.classList.remove(OBSCURED_CLASS);
      }
    });
  },

  /**
   * Initializes the MutationObserver to watch for changes in the DOM.
   * This should be called once when the application starts.
   */
  init: (): void => {
    if (typeof window === "undefined" || stackManager.observer) {
      return;
    }

    // The observer's callback is our manageStack function.
    // We debounce it slightly to handle rapid changes gracefully.
    let debounceTimeout: ReturnType<typeof setTimeout>;
    const debouncedManageStack = () => {
      clearTimeout(debounceTimeout);
      debounceTimeout = setTimeout(() => stackManager.manageStack(), 20);
    };

    stackManager.observer = new MutationObserver(debouncedManageStack);

    stackManager.observer.observe(document.body, {
      childList: true, // Watch for nodes being added or removed
      subtree: true, // Watch the entire body
    });
  },
};

/**
 * This component's only job is to initialize the global stack manager once.
 * It renders nothing.
 */
export const StackManagerInitializer = (): React.ReactNode => {
  useEffect(() => {
    stackManager.init();
  }, []); // Empty array ensures this runs only once on mount.

  return null;
};
