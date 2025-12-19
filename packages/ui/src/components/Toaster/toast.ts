import { type ToastPosition, useToastStore } from "./toastStore";

export interface ToastInput {
  message: string;
  type: "success" | "error" | "info";
  duration?: number;
}

type ToastConfig = {
  duration?: number;
  position?: ToastPosition;
};

export const toast = {
  success: (message: string, config?: ToastConfig) => {
    useToastStore.getState().actions.addToast({
      message,
      type: "success",
      duration: config?.duration,
      position: config?.position,
    });
  },

  error: (message: string, config?: ToastConfig) => {
    useToastStore.getState().actions.addToast({
      message,
      type: "error",
      duration: config?.duration,
      position: config?.position,
    });
  },

  info: (message: string, config?: ToastConfig) => {
    useToastStore.getState().actions.addToast({
      message,
      type: "info",
      duration: config?.duration,
      position: config?.position,
    });
  },
};
