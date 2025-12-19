import React from "react";

import { cn } from "@muatmuat/lib/utils";
import { cva } from "class-variance-authority";

export interface NotificationDotProps {
  /** Whether to show the pulsing animation */
  animated?: boolean;
  /** Size of the dot */
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  /** Color of the dot */
  color?:
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
  /** Additional CSS classes */
  className?: string;
  /** Position type */
  position?: "absolute" | "relative" | "fixed";
  /** Position classes like "top-0 right-0" */
  positionClasses?: string;
}

const notificationDotVariants = cva("rounded-full", {
  variants: {
    size: {
      xs: "h-1 w-1",
      sm: "h-1.5 w-1.5",
      md: "h-2 w-2",
      lg: "h-2.5 w-2.5",
      xl: "h-3 w-3",
    },
    color: {
      red: "bg-red-500",
      green: "bg-green-500",
      blue: "bg-blue-500",
      yellow: "bg-yellow-500",
      orange: "bg-orange-500",
      purple: "bg-purple-500",
      gray: "bg-gray-500",
      primary: "bg-primary-500",
      success: "bg-success-500",
      warning: "bg-warning-900",
      error: "bg-error-500",
    },
  },
  defaultVariants: {
    size: "sm",
    color: "red",
  },
});

export const NotificationDot: React.FC<NotificationDotProps> = ({
  animated = true,
  size = "sm",
  color = "red",
  className,
  position = "relative",
  positionClasses = "",
}) => {
  const dotClasses = notificationDotVariants({ size, color });

  return (
    <span className={cn(position, positionClasses, className)}>
      <div className="relative flex">
        {animated && (
          <span
            className={cn("absolute inline-flex animate-ping", dotClasses)}
          />
        )}
        <span className={cn("relative inline-flex", dotClasses)} />
      </div>
    </span>
  );
};
