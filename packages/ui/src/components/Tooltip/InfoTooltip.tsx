"use client";

import React from "react";

import { cn } from "@muatmuat/lib/utils";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";

import { IconComponent } from "../IconComponent";

interface InfoTooltipAppearance {
  iconClassName?: string;
}

interface InfoTooltipProps {
  trigger?: React.ReactNode;
  icon?: string;
  side?: "top" | "right" | "bottom" | "left";
  align?: "center" | "start" | "end";
  sideOffset?: number;
  className?: string;
  appearance?: InfoTooltipAppearance;
  children?: React.ReactNode;
  render?: React.ReactNode;
}

export const InfoTooltip: React.FC<InfoTooltipProps> = ({
  // You can pass a custom trigger element like a <button> or <span>
  trigger = null,
  // Or you can just pass an icon path to use the default trigger
  icon = "/icons/info16.svg",
  side = "top",
  align = "center",
  sideOffset = 8,
  className,
  appearance = {
    iconClassName: "text-neutral-600",
  },
  children,
  render,
}) => {
  return (
    <TooltipPrimitive.Provider delayDuration={100}>
      <TooltipPrimitive.Root>
        {/* <TooltipPrimitive.Root open={true}> */}
        <TooltipPrimitive.Trigger asChild>
          {trigger ? (
            trigger
          ) : (
            <button
              className={cn(
                "inline-flex items-center justify-center",
                appearance.iconClassName
              )}
            >
              <IconComponent src={icon} alt="Info" width={16} height={16} />
            </button>
          )}
        </TooltipPrimitive.Trigger>
        <TooltipPrimitive.Portal>
          <TooltipPrimitive.Content
            side={side}
            align={align}
            sideOffset={sideOffset}
            className={cn(
              "z-20 max-w-[280px] rounded-lg border bg-white p-3 text-xs font-medium shadow-md md:max-w-[336px]",
              className
            )}
          >
            {children || render}
            <TooltipPrimitive.Arrow className="fill-white" />
          </TooltipPrimitive.Content>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
};
