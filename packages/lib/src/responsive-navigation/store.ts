import { create } from "zustand";
import { persist } from "zustand/middleware";

import { zustandDevtools } from "../utils";
import { NavigationActions, NavigationState, StackEntry } from "./types";

// Internal state for safety features (not exported to maintain compatibility)
interface InternalNavigationState extends NavigationState {
  navigationAttempts: number;
  lastNavigationTime: number;
  actions: NavigationActions & {
    setHasHydrated: () => void;
    setHasReady: () => void;
    setIsDoingRealNavigation: (value: boolean) => void;
    resetNavigationSafety: () => void;
    setNavigationAttempts: (attempts: number) => void;
  };
}

/**
 * Pure navigation store without external dependencies
 */
const useNavigationStore = create<InternalNavigationState>()(
  persist(
    zustandDevtools(
      (set) => ({
        stack: [{ path: "/", params: {} }],
        isHydrated: false as boolean,
        isReady: false as boolean,
        isDoingRealNavigation: true as boolean,
        navigationAttempts: 0,
        lastNavigationTime: 0,
        actions: {
          push: (path: string, params: Record<string, any> = {}) =>
            set((state: InternalNavigationState) => {
              try {
                // Create completely fresh params object to avoid frozen object issues
                const freshParams = params
                  ? JSON.parse(JSON.stringify(params))
                  : {};
                return {
                  stack: [...state.stack, { path, params: freshParams }],
                };
              } catch (error) {
                console.error("[ResponsiveNavigation] Push error:", error);
                return state; // Return current state on error
              }
            }),
          pop: () =>
            set((state: InternalNavigationState) => {
              if (state.stack.length > 1) {
                return { stack: state.stack.slice(0, -1) };
              }
              return state;
            }),
          popTo: (path: string) =>
            set((state: InternalNavigationState) => {
              const targetIndex = state.stack.findIndex(
                (entry: StackEntry) => entry.path === path
              );
              if (targetIndex === -1) return state;
              return { stack: state.stack.slice(0, targetIndex + 1) };
            }),
          popToTop: () =>
            set((state: InternalNavigationState) => ({
              stack: state.stack.slice(0, 1),
            })),
          replace: (path: string, params: Record<string, any> = {}) =>
            set((state: InternalNavigationState) => {
              try {
                // Create completely fresh params object to avoid frozen object issues
                const freshParams = params
                  ? JSON.parse(JSON.stringify(params))
                  : {};
                return { stack: [{ path, params: freshParams }] };
              } catch (error) {
                console.error("[ResponsiveNavigation] Replace error:", error);
                return state; // Return current state on error
              }
            }),

          setHasHydrated: () => set({ isHydrated: true }),
          setHasReady: () => set({ isReady: true }),
          setIsDoingRealNavigation: (value: boolean) =>
            set({ isDoingRealNavigation: value }),
          resetNavigationSafety: () =>
            set({ navigationAttempts: 0, lastNavigationTime: 0 }),
          setNavigationAttempts: (attempts: number) =>
            set({ navigationAttempts: attempts }),
        },
      }),
      { name: "responsive-navigation" }
    ),
    {
      name: "responsive-navigation",
      partialize: (state: InternalNavigationState) => ({
        stack: state.stack.map((entry) => ({
          path: entry.path,
          params: { ...entry.params },
        })),
        // Don't persist safety counters to maintain original persistence behavior
        navigationAttempts: 0,
        lastNavigationTime: 0,
      }),
      onRehydrateStorage: () => (state) => {
        if (!state) return;

        setTimeout(() => {
          // Ensure all rehydrated params objects are fresh copies
          if (state?.stack) {
            // Use the state parameter instead of getState() to avoid infinite loops
            const freshStack = state.stack.map((entry) => ({
              path: entry.path,
              params: { ...entry.params },
            }));

            // Only update if necessary to avoid unnecessary re-renders
            const currentStack = useNavigationStore.getState().stack;
            const hasChanged =
              JSON.stringify(currentStack) !== JSON.stringify(freshStack);

            if (hasChanged) {
              useNavigationStore.setState({
                stack: freshStack,
                // Reset safety counters on rehydrate (internal only)
                navigationAttempts: 0,
                lastNavigationTime: 0,
              });
            }
          }
          state.actions?.setHasHydrated?.();
        }, 1000);
      },
    }
  )
);

export { useNavigationStore };
