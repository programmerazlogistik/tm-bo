import { create } from "zustand";

export const usePromoSubscriptionStore = create((set) => ({
  currentTab: "active",
  page: 1,
  limit: 10,
  search: "",
  statusFilter: "all",

  setCurrentTab: (tab) => set({ currentTab: tab }),
  setPage: (page) => set({ page }),
  setLimit: (limit) => set({ limit }),
  setSearch: (search) => set({ search, page: 1 }), // Reset to page 1 on search
  setStatusFilter: (status) => set({ statusFilter: status, page: 1 }),
  reset: () => set({ page: 1, search: "", statusFilter: "all" }),
}));
