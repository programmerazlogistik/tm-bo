import { create } from "zustand";

export interface LoadingState {
  isGlobalLoading: boolean;
  actions: {
    setIsGlobalLoading: (isGlobalLoading: boolean) => void;
  };
}

export interface LoadingActions {
  setIsGlobalLoading: (isGlobalLoading: boolean) => void;
}

/**
 * Zustand store for managing global loading state.
 */
export const useLoadingStore = create<LoadingState>((set) => ({
  isGlobalLoading: true,
  actions: {
    setIsGlobalLoading: (isGlobalLoading) => set({ isGlobalLoading }),
  },
}));

/**
 * Hook to access loading actions without subscribing to state changes.
 */
export const useLoadingAction = (): LoadingActions => {
  const { setIsGlobalLoading } = useLoadingStore((s) => s.actions);
  return { setIsGlobalLoading };
};
