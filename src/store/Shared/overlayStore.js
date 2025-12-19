import { create } from "zustand";

const useOverlayStore = create((set) => ({
  isOverlayActive: false,
  actions: {
    setIsOverlayActive: (isOverlayActive) => set({ isOverlayActive }),
  },
}));

export const useOverlay = () => {
  const isOverlayActive = useOverlayStore((s) => s.isOverlayActive);
  return { isOverlayActive };
};

export const useOverlayAction = () => {
  const { setIsOverlayActive } = useOverlayStore((s) => s.actions);
  return { setIsOverlayActive };
};
