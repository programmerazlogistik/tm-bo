import type { ComponentProps } from "react";

import { cn } from "@muatmuat/lib/utils";
import * as HoverCardPrimitive from "@radix-ui/react-hover-card";

type HoverCardRootProps = ComponentProps<typeof HoverCardPrimitive.Root>;
type HoverCardTriggerProps = ComponentProps<typeof HoverCardPrimitive.Trigger>;
type HoverCardContentProps = ComponentProps<typeof HoverCardPrimitive.Content>;

export interface SimpleHoverProps extends Omit<HoverCardRootProps, "children"> {
  children: React.ReactNode;
}

export interface SimpleHoverTriggerProps extends HoverCardTriggerProps {}

export interface SimpleHoverContentProps
  extends Omit<HoverCardContentProps, "children"> {
  children: React.ReactNode;
  side?: "top" | "right" | "bottom" | "left";
  align?: "start" | "center" | "end";
  className?: string;
}

export interface SimpleHoverItemProps extends ComponentProps<"div"> {
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  className?: string;
  children: React.ReactNode;
}

export const SimpleHover: React.FC<SimpleHoverProps> = ({
  children,
  ...props
}) => (
  <HoverCardPrimitive.Root openDelay={200} closeDelay={100} {...props}>
    {children}
  </HoverCardPrimitive.Root>
);

export const SimpleHoverTrigger = HoverCardPrimitive.Trigger;

export const SimpleHoverContent: React.FC<SimpleHoverContentProps> = ({
  side = "bottom",
  align = "start",
  className,
  children,
}) => {
  return (
    <HoverCardPrimitive.Portal>
      <HoverCardPrimitive.Content
        className={cn(
          "z-50 mt-1 flex w-[194px] flex-col overflow-hidden rounded-md border border-neutral-300 bg-neutral-50 shadow-muat",
          className
        )}
        side={side}
        align={align}
      >
        {children}
      </HoverCardPrimitive.Content>
    </HoverCardPrimitive.Portal>
  );
};

export const SimpleHoverItem: React.FC<SimpleHoverItemProps> = ({
  className,
  onClick,
  children,
  ...props
}) => (
  <div
    className={cn(
      "cursor-pointer px-2.5 py-3 text-xs font-medium leading-[1.2] outline-none hover:bg-neutral-100",
      className
    )}
    onClick={onClick}
    {...props}
  >
    {children}
  </div>
);
