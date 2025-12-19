"use client";

import { useEffect, useMemo } from "react";

import { useDevice } from "@muatmuat/hooks/use-device";
import { cn } from "@muatmuat/lib/utils";
import { Portal } from "@radix-ui/react-portal";
import { cva } from "class-variance-authority";

import { IconComponent } from "../IconComponent";
import { useToastStore } from "./toastStore";

const toasterVariants = cva(
  // Base classes
  "pointer-events-none fixed left-0 z-[51] flex w-full flex-col gap-2 px-4 md:left-auto md:w-fit md:items-end md:px-0",
  {
    variants: {
      variant: {
        "muattrans-top": "top-[116px] md:right-6",
        "muattrans-bottom": "md:right-12",
        "muatparts-top": "top-6 md:right-6",
        "muatparts-bottom": "top-3/4 md:right-12",
      },
    },
    defaultVariants: {
      variant: "muattrans-bottom",
    },
  }
);

const toastVariants = cva(
  // Base classes
  "pointer-events-auto flex h-[48px] w-full items-center justify-between gap-3 rounded-lg border px-3 text-xs font-semibold leading-[1.2] tracking-tight text-neutral-900 md:w-[440px]",
  {
    variants: {
      type: {
        success: "border-success-400 bg-success-50",
        error: "border-error-400 bg-error-50",
        info: "border-info-400 bg-info-50",
      },
      animation: {
        enter: "animate-enter",
        leave: "animate-leave",
      },
    },
    defaultVariants: {
      type: "success",
      animation: "enter",
    },
  }
);

export interface ToasterProps {
  className?: string;
  variant?: "muattrans" | "muatparts";
  appearance?: {
    wrapperClassName?: string;
  };
  bottomOffset?: string | null;
}

/**
 * Toaster component renders a global toast notification container with responsive positioning.
 * Displays success and error messages with smooth animations and accessibility support.
 * Should be placed once at the app root level to handle notifications throughout the application.
 */

export const Toaster: React.FC<ToasterProps> = ({
  className,
  variant = "muattrans",
  appearance,
  bottomOffset,
}) => {
  const dataToast = useToastStore((state) => state.dataToast);
  const { removeToast, removeAll } = useToastStore((state) => state.actions);
  const { isMobile, mounted } = useDevice();

  const calculatedBottomOffset = useMemo(() => {
    // Getting the right offset for the toast
    // 29px is the position of Pusat Bantuan Icon
    // 70px is the height of Pusat Bantuan Icon
    // 69px is the offset from the Pusat Bantuan Icon
    if (!isMobile) return "calc(29px + 70px + 14px)";

    // Getting the height of the responsive footer
    const footerHeight =
      document.getElementById("responsive-footer")?.clientHeight || 0;

    return `calc(20px + ${footerHeight}px)`;

    // dataToast must be added to the dependency array, so we can recalculate the offset when the toast is added or removed
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMobile, dataToast]);

  // Separate toasts by position
  const topToasts = dataToast.filter((toast) => toast.position === "top");
  const bottomToasts = dataToast.filter(
    (toast) => !toast.position || toast.position === "bottom"
  );

  useEffect(() => {
    return () => {
      removeAll();
    };
  }, [removeAll]);

  if (!mounted) return null;

  const renderToast = (toast: any, index: number) => (
    <div
      key={toast.id}
      className={cn(
        toastVariants({
          type: toast.type,
          animation: toast.isLeaving ? "leave" : "enter",
        }),
        className
      )}
      style={{
        animationDelay: toast.isLeaving ? "0ms" : `${index * 150}ms`,
      }}
      role="alert"
      aria-live="polite"
    >
      <div className="flex flex-1 items-center gap-3">
        <div className="flex-shrink-0">
          <IconComponent
            src={
              toast.type === "success"
                ? "/icons/toast-succes.svg"
                : toast.type === "error"
                  ? "/icons/toast-error.svg"
                  : "/icons/toast-info.svg"
            }
            className={cn(
              toast.type === "success"
                ? "text-success-400"
                : toast.type === "error"
                  ? "text-error-400"
                  : "text-info-400"
            )}
            height={18}
            width={18}
            aria-hidden="true"
          />
        </div>
        <span className="flex-1">{toast.message}</span>
      </div>
      <button
        onClick={() => removeToast(toast.id)}
        className="flex size-6 cursor-pointer items-center justify-center rounded-full transition-colors hover:bg-black/5 focus:outline-none focus:ring-2 focus:ring-black/10"
        aria-label="Close notification"
      >
        <IconComponent
          src="/icons/toast-close.svg"
          height={16}
          width={16}
          className="text-neutral-700"
        />
      </button>
    </div>
  );

  return (
    <Portal>
      {/* Top positioned toasts */}
      {topToasts.length > 0 && (
        <div
          className={cn(
            toasterVariants({ variant: `${variant}-top` }),
            appearance?.wrapperClassName
          )}
          role="region"
          aria-label="Top notifications"
        >
          {topToasts.map((toast, index) => renderToast(toast, index))}
        </div>
      )}

      {/* Bottom positioned toasts */}
      {bottomToasts.length > 0 && (
        <div
          className={cn(
            toasterVariants({ variant: `${variant}-bottom` }),
            appearance?.wrapperClassName
          )}
          style={{
            bottom:
              bottomOffset !== null ? bottomOffset : calculatedBottomOffset,
          }}
          role="region"
          aria-label="Bottom notifications"
        >
          {bottomToasts.map((toast, index) => renderToast(toast, index))}
        </div>
      )}
    </Portal>
  );
};
