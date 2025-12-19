import { create } from "zustand";

/* -------------------------------------------------------------------------- */
/*                                Zustand Store                               */
/* -------------------------------------------------------------------------- */

export type FakePageState = {
  currentStep: string | null;
  history: string[];
  next: (step: string) => void;
  back: () => void;
  close: () => void;
  // Router functions that will be set by URL sync
  pushStep: (step: string) => void;
  goBack: () => void;
  closePage: () => void;
};

// Internal state with safety features (not exported to maintain compatibility)
interface InternalFakePageState extends FakePageState {
  _initialized: boolean;
  actions: FakePageState & {
    setInitialized: () => void;
    updateRouterFunctions: (funcs: {
      pushStep: (step: string) => void;
      goBack: () => void;
      closePage: () => void;
    }) => void;
  };
}

const useFakePageStore = create<InternalFakePageState>((set, get) => ({
  currentStep: null,
  history: [],
  _initialized: false,
  next: (step) =>
    set((state) => {
      try {
        return {
          currentStep: step,
          history: [...state.history, step],
        };
      } catch (error) {
        console.error("[FakePage] Next error:", error);
        return state; // Return current state on error
      }
    }),
  back: () => {
    const { history } = get();
    if (history.length > 1) {
      const newHistory = history.slice(0, -1);
      set({ currentStep: newHistory.at(-1)!, history: newHistory });
    } else {
      set({ currentStep: null, history: [] });
    }
  },
  close: () => set({ currentStep: null, history: [] }),
  // Initialize with empty functions - will be set by FakePageSync
  pushStep: () => {},
  goBack: () => {},
  closePage: () => {},
  actions: {
    currentStep: null,
    history: [],
    next: (step) =>
      set((state) => {
        try {
          return {
            currentStep: step,
            history: [...state.history, step],
          };
        } catch (error) {
          console.error("[FakePage] Next error:", error);
          return state; // Return current state on error
        }
      }),
    back: () => {
      const { history } = get();
      if (history.length > 1) {
        const newHistory = history.slice(0, -1);
        set({ currentStep: newHistory.at(-1)!, history: newHistory });
      } else {
        set({ currentStep: null, history: [] });
      }
    },
    close: () => set({ currentStep: null, history: [] }),
    pushStep: () => {},
    goBack: () => {},
    closePage: () => {},
    setInitialized: () => set({ _initialized: true }),
    updateRouterFunctions: (funcs) =>
      set((state) => {
        try {
          // Create fresh function references to avoid frozen object issues
          return {
            pushStep: (...args) => funcs.pushStep(...args),
            goBack: (...args) => funcs.goBack(...args),
            closePage: (...args) => funcs.closePage(...args),
          };
        } catch (error) {
          console.error("[FakePage] Router function update error:", error);
          return state; // Return current state on error
        }
      }),
  },
}));

export { useFakePageStore };
