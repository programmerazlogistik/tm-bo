import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { Role } from "@/services/globals/getProfile";

export const tempRoleStore = create<{
  role: Role;
  setRole: (role: Role) => void;
  clearRole: () => void;
}>()(
  persist(
    (set) => ({
      role: "admin",
      setRole: (role) => {
        set({ role });
      },
      clearRole: () => {
        set({ role: "admin" });
      },
    }),
    {
      name: "dev-role-storage", // name of the item in localStorage
      storage: createJSONStorage(() => localStorage),
    }
  )
);

/**
 * Clear the persisted development role from localStorage
 */
export const clearDevRoleStorage = () => {
  localStorage.removeItem("dev-role-storage");
  tempRoleStore.setState({ role: "admin" });
};

/**
 * Check if there's a persisted development role
 */
export const hasPersistedDevRole = () => {
  return localStorage.getItem("dev-role-storage") !== null;
};
