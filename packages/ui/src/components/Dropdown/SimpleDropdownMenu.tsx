import { cn } from "@muatmuat/lib/utils";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";

import {
  SimpleDropdownItemProps,
  SimpleDropdownMenuContentProps,
} from "./SimpleDropdownMenu.types";

export const SimpleDropdown = DropdownMenuPrimitive.Root;
export const SimpleDropdownTrigger = DropdownMenuPrimitive.Trigger;

export const SimpleDropdownContent = ({
  side = "bottom",
  align = "start",
  className,
  children,
}: SimpleDropdownMenuContentProps) => {
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        className={cn(
          "z-50 mt-1 flex max-w-[194px] flex-col overflow-hidden rounded-md border border-neutral-300 bg-neutral-50 shadow-muat",
          className
        )}
        side={side}
        align={align}
      >
        {children}
      </DropdownMenuPrimitive.Content>
    </DropdownMenuPrimitive.Portal>
  );
};

export const SimpleDropdownItem = ({
  className,
  onSelect,
  children,
  ...props
}: SimpleDropdownItemProps) => (
  <DropdownMenuPrimitive.Item
    className={cn(
      "capsize cursor-pointer px-2.5 py-3 text-xs font-medium leading-[1.2] outline-none hover:bg-neutral-100",
      className
    )}
    onSelect={onSelect}
    {...props}
  >
    {children}
  </DropdownMenuPrimitive.Item>
);
