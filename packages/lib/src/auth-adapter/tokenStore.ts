import { zustandDevtools } from "@muatmuat/lib/utils";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import type { AuthToken } from "./auth-adapter";

const initialAuthState = {
  accessToken: "",
  refreshToken: "",
};

interface TokenStoreState {
  isHydrated: boolean;
  accessToken: string;
  refreshToken: string;
  actions: {
    setToken: (val: AuthToken) => void;
    clearToken: () => void;
    setHasHydrated: () => void;
  };
}

export const useTokenStore = create<TokenStoreState>()(
  zustandDevtools(
    persist(
      (set) => ({
        isHydrated: false,
        ...initialAuthState,
        actions: {
          setToken: (val: AuthToken) =>
            set({
              accessToken: val.accessToken,
              refreshToken: val.refreshToken,
            }),
          clearToken: () => set({ ...initialAuthState }),
          setHasHydrated: () => set({ isHydrated: true }),
        },
      }),
      {
        name: "t-ash",
        storage: createJSONStorage(() => localStorage),
        partialize: (state) => ({
          accessToken: state.accessToken,
          refreshToken: state.refreshToken,
        }),
        onRehydrateStorage: () => (state, error) => {
          // This function is called after hydration
          setTimeout(() => {
            state?.actions?.setHasHydrated?.();
          }, 1000);
        },
      }
    ),
    {
      name: "auth-token-store",
    }
  )
);

export const useTokenActions = () => {
  const { setToken, clearToken } = useTokenStore((state) => state.actions);
  return { setToken, clearToken };
};
