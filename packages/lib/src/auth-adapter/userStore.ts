import { zustandDevtools } from "@muatmuat/lib/utils";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import type { DefaultAuthUserWithLoggedIn } from "./auth-adapter";

interface UserStoreState {
  dataUser: DefaultAuthUserWithLoggedIn | null;
  dataMatrix: any | null;
  isLoading: boolean;
  actions: {
    setUser: (val: DefaultAuthUserWithLoggedIn) => void;
    setDataMatrix: (data: any) => void;
    clearUser: () => void;
    setLoading: (loading: boolean) => void;
  };
}

export const useUserStore = create<UserStoreState>()(
  zustandDevtools(
    persist(
      (set) => ({
        dataUser: null,
        dataMatrix: null,
        isLoading: true,
        actions: {
          setUser: (val: DefaultAuthUserWithLoggedIn) =>
            set((state) => ({
              dataUser: {
                ...(state?.dataUser ? state.dataUser : {}),
                ...val,
              },
            })),
          setDataMatrix: (data: any) =>
            set((state) => ({
              dataMatrix: {
                ...(state?.dataMatrix ? state.dataMatrix : {}),
                ...data,
              },
            })),
          clearUser: () =>
            set({ dataUser: { isLoggedIn: false }, dataMatrix: null }),
          setLoading: (loading) => {
            set({ isLoading: loading });
          },
        },
      }),
      {
        name: "t-ng",
        storage: createJSONStorage(() => localStorage),
        partialize: (state) => ({
          dataUser: state.dataUser,
          dataMatrix: state.dataMatrix,
        }),
        onRehydrateStorage: () => (state, error) => {
          if (error) {
            state?.actions?.clearUser?.();
          }
        },
      }
    ),
    {
      name: "auth-user-store",
    }
  )
);

export const useUserActions = () => {
  return useUserStore((state) => state.actions);
};
