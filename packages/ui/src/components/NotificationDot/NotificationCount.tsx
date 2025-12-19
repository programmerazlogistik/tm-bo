import React from "react";

import { cn } from "@muatmuat/lib/utils";
import { cva } from "class-variance-authority";

export interface NotificationCountProps {
  /** The count to display */
  count?: number;
  /** Whether to show the pulsing animation */
  animated?: boolean;
  /** Size of the counter */
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  /** Text color */
  color?:
    | "white"
    | "black"
    | "gray"
    | "red"
    | "blue"
    | "green"
    | "yellow"
    | "primary";
  /** Background color */
  backgroundColor?:
    | "red"
    | "green"
    | "blue"
    | "yellow"
    | "orange"
    | "purple"
    | "gray"
    | "primary"
    | "success"
    | "warning"
    | "error";
  /** Style variant */
  variant?: "default" | "bordered";
  /** Border color for bordered variant */
  borderColor?: string;
  /** Additional CSS classes */
  className?: string;
  /** Position type */
  position?: "absolute" | "relative" | "fixed";
  /** Position classes like "top-0 right-0" */
  positionClasses?: string;
  /** Maximum count to display (e.g., 99+) */
  maxCount?: number;
}

const notificationCountVariants = cva(
  "inline-flex items-center justify-center font-medium",
  {
    variants: {
      size: {
        xs: "h-4 w-4 text-xxs",
        sm: "h-5 w-5 text-xs",
        md: "h-6 w-6 text-sm",
        lg: "h-7 w-7 text-base",
        xl: "h-8 w-8 text-lg",
      },
      color: {
        white: "text-white",
        black: "text-black",
        gray: "text-gray-600",
        red: "text-red-600",
        blue: "text-blue-600",
        green: "text-green-600",
        yellow: "text-yellow-600",
        primary: "text-primary-600",
      },
      backgroundColor: {
        red: "bg-red-500",
        green: "bg-green-500",
        blue: "bg-blue-500",
        yellow: "bg-yellow-500",
        orange: "bg-orange-500",
        purple: "bg-purple-500",
        gray: "bg-gray-500",
        primary: "bg-primary-500",
        success: "bg-success-500",
        warning: "bg-warning-500",
        error: "bg-[#EE4343]",
      },
      variant: {
        default: "rounded-full",
        bordered:
          "h-4 min-w-fit rounded-full px-1.5 py-0.5 text-[10px] font-semibold",
      },
    },
    defaultVariants: {
      size: "sm",
      color: "white",
      backgroundColor: "red",
      variant: "default",
    },
  }
);

export const NotificationCount: React.FC<NotificationCountProps> = ({
  count = 0,
  animated = false,
  size = "sm",
  color = "white",
  backgroundColor = "red",
  variant = "default",
  borderColor = "border-red-900",
  className,
  position = "relative",
  positionClasses = "",
  maxCount = 99,
}) => {
  const countClasses = notificationCountVariants({
    size: variant === "bordered" ? undefined : size,
    color,
    backgroundColor,
    variant,
  });

  // Only show if count is between 1 and 99+
  if (count < 1) return null;

  // Format count display - show actual number up to 99, then "99+"
  const displayCount = count > maxCount ? `${maxCount}+` : count.toString();

  return (
    <span className={cn(position, positionClasses, className)}>
      <div className="relative inline-flex">
        {animated && (
          <span
            className={cn(
              "absolute inline-flex h-full w-full animate-ping opacity-75",
              variant === "bordered" ? "rounded-full" : "rounded-full",
              notificationCountVariants({ backgroundColor })
                .split(" ")
                .filter((c) => c.startsWith("bg-"))
            )}
          />
        )}
        <span
          className={cn(
            countClasses,
            "relative",
            variant === "bordered" && "border-[1.5px]",
            variant === "bordered" && borderColor
          )}
        >
          {displayCount}
        </span>
      </div>
    </span>
  );
};
