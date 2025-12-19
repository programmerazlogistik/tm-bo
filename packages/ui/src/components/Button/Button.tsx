import React from "react";

import { cn } from "@muatmuat/lib/utils";
import { cva } from "class-variance-authority";

import { IconComponent } from "../IconComponent";

export type ButtonVariant =
  | "muattrans-primary"
  | "muattrans-outline-primary"
  | "muattrans-primary-secondary"
  | "muattrans-error"
  | "muattrans-error-secondary"
  | "muattrans-warning"
  | "muatparts-primary"
  | "muatparts-primary-secondary"
  | "muatparts-error"
  | "muatparts-error-secondary"
  | "muatparts-warning"
  | "link";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  children?: React.ReactNode;
  className?: string;
  iconLeft?: string | React.ReactNode;
  iconRight?: string | React.ReactNode;
  disabled?: boolean;
  keepDisabledStyle?: boolean;
  appearance?: {
    iconClassName?: string;
  };
}

const buttonVariants = cva(
  "flex h-10 flex-shrink-0 items-center justify-center gap-1 rounded-[24px] py-3 text-sm font-semibold leading-[16.8px] transition-colors md:h-8 md:px-6",
  {
    variants: {
      variant: {
        "muattrans-primary":
          "bg-[--muat-trans-primary-400] text-neutral-900 hover:bg-[--muat-trans-primary-500]",
        "muattrans-outline-primary":
          "border border-neutral-900 bg-neutral-50 text-neutral-900",
        "muattrans-primary-secondary":
          "border border-[--muat-trans-secondary-900] bg-neutral-50 text-[--muat-trans-secondary-900] hover:bg-[--muat-trans-secondary-50]",
        "muattrans-error": "bg-error-400 text-neutral-50 hover:bg-error-600",
        "muattrans-error-secondary":
          "border border-error-400 bg-neutral-50 text-error-400 hover:bg-error-50",
        "muattrans-warning":
          "bg-secondary-500 text-primary-700 hover:bg-secondary-300",
        "muatparts-primary":
          "bg-primary-700 text-neutral-50 hover:bg-primary-800",
        "muatparts-primary-secondary":
          "border border-primary-700 bg-neutral-50 text-primary-700 hover:bg-primary-50",
        "muatparts-error": "bg-error-400 text-neutral-50 hover:bg-error-600",
        "muatparts-error-secondary":
          "border border-error-400 bg-neutral-50 text-error-400 hover:bg-error-50",
        "muatparts-warning": "border border-secondary-400 text-secondary-400",
        link: "border-0 bg-transparent p-0 px-0 font-medium text-primary-700 no-underline hover:text-primary-800 md:h-[14px] md:px-0",
        unknown: "bg-neutral-200 text-neutral-900",
      },
      disabled: {
        true: "cursor-not-allowed bg-neutral-200 text-neutral-600 hover:bg-neutral-200",
        "true-secondary":
          "cursor-not-allowed border border-neutral-600 bg-neutral-200 text-neutral-600 hover:bg-neutral-200",
      },
    },
    defaultVariants: {
      variant: "muattrans-primary",
      disabled: false,
    },
  }
);

const iconColorVariants: Record<ButtonVariant, string> = {
  "muattrans-primary": "text-neutral-900",
  "muattrans-outline-primary": "text-neutral-900",
  "muattrans-primary-secondary": "text-muat-trans-secondary-900",
  "muattrans-error": "text-white",
  "muattrans-error-secondary": "text-error-400",
  "muattrans-warning": "text-primary-700",
  "muatparts-primary": "text-white",
  "muatparts-primary-secondary": "text-primary-700",
  "muatparts-error": "text-white",
  "muatparts-error-secondary": "text-error-400",
  "muatparts-warning": "text-primary-700",
  link: "text-primary-700",
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "muattrans-primary",
      children = "Button",
      className,
      iconLeft = null,
      iconRight = null,
      disabled = false,
      keepDisabledStyle = false,
      appearance = {
        iconClassName: "",
      },
      ...buttonProps
    },
    ref
  ) => {
    const isSecondaryVariant = variant.includes("secondary");
    const disabledVariant = isSecondaryVariant ? "true-secondary" : true;
    const iconColorClass = disabled ? "icon-gray" : iconColorVariants[variant];

    return (
      <button
        ref={ref}
        disabled={disabled}
        className={cn(
          buttonVariants({
            variant: disabled && !keepDisabledStyle ? undefined : variant,
            disabled: disabled && !keepDisabledStyle ? disabledVariant : false,
            className,
          })
        )}
        {...buttonProps}
      >
        {typeof iconLeft === "string" ? (
          <IconComponent
            loader={false}
            src={iconLeft}
            height={16}
            width={16}
            className={cn(iconColorClass, appearance.iconClassName)}
          />
        ) : (
          iconLeft
        )}
        <span>{children}</span>
        {typeof iconRight === "string" ? (
          <IconComponent
            loader={false}
            src={iconRight}
            height={16}
            width={16}
            className={cn(iconColorClass, appearance.iconClassName)}
          />
        ) : (
          iconRight
        )}
      </button>
    );
  }
);

Button.displayName = "Button";
