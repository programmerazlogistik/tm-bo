import { zustandDevtools } from "@muatmuat/lib/utils";
import { create } from "zustand";

// ============================================================================
// Type Definitions
// ============================================================================

interface ImageUploaderError {
  message: string;
  type: string;
}

interface ImageUploaderState {
  activeIndex: number;
  image: string | null;
  imageFile: File | null;
  isReadyUploadPhoto: boolean;
  previewImage: string | null;
  // 25. 18 - Web - LB - 0317
  error: ImageUploaderError;
}

interface ImageUploaderActions {
  setActiveIndex: (activeIndex: number) => void;
  // 25. 18 - Web - LB - 0317
  setError: (error: ImageUploaderError) => void;
  setImage: (image: string | null) => void;
  setImageFile: (imageFile: File | null) => void;
  setIsReadyUploadPhoto: (isReadyUploadPhoto: boolean) => void;
  setPreviewImage: (previewImage: string | null) => void;
  reset: () => void;
}

interface ImageUploaderStore extends ImageUploaderState {
  actions: ImageUploaderActions;
}

// ============================================================================
// Store Implementation
// ============================================================================

const defaultValues: ImageUploaderState = {
  activeIndex: -1,
  image: null,
  imageFile: null,
  isReadyUploadPhoto: false,
  previewImage: null,
  // 25. 18 - Web - LB - 0317
  error: {
    message: "",
    type: "",
  },
};

export const useImageUploaderStore = create<ImageUploaderStore>()(
  zustandDevtools((set) => ({
    ...defaultValues,
    actions: {
      setActiveIndex: (activeIndex) => set({ activeIndex }),
      // 25. 18 - Web - LB - 0317
      setError: (error) => set({ error }),
      setImage: (image) =>
        set({
          image,
        }),
      setImageFile: (imageFile) =>
        set({
          imageFile,
        }),
      setIsReadyUploadPhoto: (isReadyUploadPhoto) =>
        set({ isReadyUploadPhoto }),
      setPreviewImage: (previewImage) => set({ previewImage }),
      reset: () =>
        set({
          ...defaultValues,
        }),
    },
  }))
);

export const useImageUploaderActions = () => {
  const {
    reset,
    setActiveIndex,
    setImage,
    setImageFile,
    setPreviewImage,
    setIsReadyUploadPhoto,
    // 25. 18 - Web - LB - 0317
    setError,
  } = useImageUploaderStore((state) => state.actions);
  return {
    reset,
    setActiveIndex,
    setImage,
    setImageFile,
    setPreviewImage,
    setIsReadyUploadPhoto,
    // 25. 18 - Web - LB - 0317
    setError,
  };
};

export type {
  ImageUploaderError,
  ImageUploaderState,
  ImageUploaderActions,
  ImageUploaderStore,
};
