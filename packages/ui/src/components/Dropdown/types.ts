import * as React from "react";

import * as HoverCardPrimitive from "@radix-ui/react-hover-card";
import * as PopoverPrimitive from "@radix-ui/react-popover";

export type FilterTriggerProps =
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    isActive?: boolean;
    disabled?: boolean;
    children?: React.ReactNode;
    className?: string;
  };

export type ContentProps = React.ComponentProps<
  typeof PopoverPrimitive.Content
> & {
  className?: string;
  align?: "start" | "center" | "end";
  sideOffset?: number;
  children?: React.ReactNode;
  appearance?: {
    contentClassName?: string;
  };
};

export type HoverRootProps = React.ComponentProps<
  typeof HoverCardPrimitive.Root
> & {
  children?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  title?: string;
  className?: string;
};

export type HoverContentProps = React.ComponentProps<
  typeof HoverCardPrimitive.Content
> & {
  className?: string;
  align?: "start" | "center" | "end";
  sideOffset?: number;
  side?: "top" | "right" | "bottom" | "left";
  children?: React.ReactNode;
  appearance?: {
    wrapperClassName?: string;
  };
};

export type HoverItemProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  className?: string;
  children?: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  asChild?: boolean;
};

export type ItemProps = React.HTMLAttributes<HTMLDivElement> & {
  children?: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  isDestructive?: boolean;
  className?: string;
};
