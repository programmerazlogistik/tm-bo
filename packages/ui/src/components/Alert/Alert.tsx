import React from "react";

import { cn } from "@muatmuat/lib/utils";

import { IconComponent } from "../IconComponent";

export type AlertVariant = "warning" | "secondary" | "error";
export type AlertSize = "sm" | "big";

export interface AlertAppearance {
  labelClassName?: string;
  hideIcon?: boolean;
}

export interface AlertProps {
  variant?: AlertVariant;
  size?: AlertSize;
  className?: string;
  appearance?: AlertAppearance;
  children: React.ReactNode;
}

const bgVariants: Record<AlertVariant, string> = {
  warning: "bg-warning-100",
  secondary: "bg-secondary-100",
  error: "bg-error-50",
};

const iconVariants: Record<AlertVariant, string> = {
  warning: "text-secondary-400",
  secondary: "text-warning-900",
  error: "text-error-400",
};

const icon: Record<AlertVariant, string> = {
  warning: "/icons/warning24.svg",
  secondary: "/icons/warning24.svg",
  error: "/icons/warning24.svg",
};

const alertSizes: Record<AlertSize, string> = {
  sm: "p-2",
  big: "py-4 px-6",
};

export const Alert: React.FC<AlertProps> = ({
  variant = "warning",
  size = "sm",
  className,
  appearance = {
    labelClassName: "text-neutral-900",
  },
  children,
}) => {
  return (
    <div
      className={cn(
        "flex items-center gap-2 rounded-md text-xs font-medium leading-[1.2] text-neutral-900",
        bgVariants[variant],
        alertSizes[size],
        className
      )}
    >
      {!appearance.hideIcon && typeof icon[variant] === "string" && (
        <div className={cn("size-5", size === "big" && "size-6")}>
          <IconComponent
            src={icon[variant]}
            className={cn(
              "size-5",
              size === "big" && "size-6",
              iconVariants[variant]
            )}
          />
        </div>
      )}

      {typeof children === "string" ? (
        <span className={cn("text-neutral-900", appearance.labelClassName)}>
          {children}
        </span>
      ) : (
        children
      )}
    </div>
  );
};
