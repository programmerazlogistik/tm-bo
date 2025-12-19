import { create } from "zustand";

export type ToastType = "success" | "error" | "info";
export type ToastPosition = "top" | "bottom";

export interface Toast {
  id: string;
  type: ToastType;
  message: string;
  duration?: number;
  position?: ToastPosition;
  isLeaving?: boolean;
  timeoutId?: ReturnType<typeof setTimeout>;
  createdAt: number;
}

export interface ToastInput {
  type: ToastType;
  message: string;
  duration?: number;
  position?: ToastPosition;
}

export interface ToastActions {
  addToast: (toast: Omit<Toast, "id" | "timeoutId" | "createdAt">) => void;
  removeToast: (id: string) => void;
  removeAll: () => void;
}

export interface ToastState {
  dataToast: Toast[];
  actions: ToastActions;
}

const MAX_TOASTS = 3;
const TOAST_LIMIT_BUFFER = 1000; // 1 second buffer between removing old toasts

/**
 * Zustand store for managing toast notifications with automatic cleanup and animation states.
 */
export const useToastStore = create<ToastState>((set, get) => ({
  dataToast: [],
  actions: {
    /**
     * Adds a new toast notification to the store.
     * Automatically manages toast limits and creates unique IDs.
     */
    addToast: (toast: Omit<Toast, "id" | "timeoutId" | "createdAt">) => {
      const id = Math.random().toString(36).substring(2, 11);
      const currentToasts = get().dataToast;

      // If we're at the limit, remove the oldest toast first
      if (currentToasts.length >= MAX_TOASTS) {
        const oldestToast = currentToasts[0];
        if (oldestToast) {
          get().actions.removeToast(oldestToast.id);
        }

        // Add a small delay before adding the new toast to prevent visual glitches
        setTimeout(() => {
          get().actions.addToast(toast);
        }, TOAST_LIMIT_BUFFER);
        return;
      }

      // Create the timeout first so we can store its ID
      const timeoutId = setTimeout(() => {
        get().actions.removeToast(id);
      }, toast.duration || 6000);

      set((state) => ({
        dataToast: [
          ...state.dataToast,
          {
            ...toast,
            id,
            timeoutId,
            createdAt: Date.now(),
          },
        ].sort((a, b) => b.createdAt - a.createdAt), // Keep newest toasts at the end
      }));
    },

    /**
     * Removes a toast notification by ID with animation.
     * Sets leaving state first, then removes after animation completes.
     */
    removeToast: (id: string) => {
      // First set the leaving state
      set((state) => ({
        dataToast: state.dataToast.map((t) =>
          t.id === id ? { ...t, isLeaving: true } : t
        ),
      }));

      // Wait for animation to complete before removing
      setTimeout(() => {
        // Clear the timeout first
        const toast = get().dataToast.find((t) => t.id === id);
        if (toast?.timeoutId) {
          clearTimeout(toast.timeoutId);
        }

        // Then remove the toast from state
        set((state) => ({
          dataToast: state.dataToast.filter((t) => t.id !== id),
        }));
      }, 150); // Match this with the leave animation duration in tailwind.config.js
    },

    /**
     * Removes all toast notifications with animation.
     * Sets all toasts to leaving state, then clears after animation completes.
     */
    removeAll: () => {
      // Set all toasts to leaving state
      set((state) => ({
        dataToast: state.dataToast.map((t) => ({ ...t, isLeaving: true })),
      }));

      // Wait for animation before clearing
      setTimeout(() => {
        // Clear all timeouts first
        get().dataToast.forEach((toast) => {
          if (toast.timeoutId) {
            clearTimeout(toast.timeoutId);
          }
        });

        // Then clear the state
        set({ dataToast: [] });
      }, 150);
    },
  },
}));

/**
 * Hook to access toast action methods.
 */
export const useToastActions = (): ToastActions => {
  return useToastStore((state) => state.actions);
};
