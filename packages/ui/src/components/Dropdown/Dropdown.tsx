"use client";

import * as React from "react";

import { cn } from "@muatmuat/lib/utils";
import * as HoverCardPrimitive from "@radix-ui/react-hover-card";
import * as PopoverPrimitive from "@radix-ui/react-popover";

import { IconComponent } from "../IconComponent";
import {
  ContentProps,
  FilterTriggerProps,
  HoverContentProps,
  HoverItemProps,
  HoverRootProps,
  ItemProps,
} from "./types";

// 1. Root Component (Popover Wrapper)
const Root = PopoverPrimitive.Root;
const Trigger = PopoverPrimitive.Trigger;

const FilterTrigger = React.forwardRef<HTMLButtonElement, FilterTriggerProps>(
  ({ isActive = false, disabled = false, ...props }, ref) => (
    <Trigger ref={ref} {...props} asChild>
      <button
        className={cn(
          "flex h-8 w-[104px] items-center gap-2 rounded-md border border-neutral-600 bg-neutral-50 p-3",
          isActive && "border-primary-700",
          disabled && "bg-neutral-200"
        )}
      >
        <span
          className={cn(
            `flex-grow text-left text-xs font-medium text-neutral-600`,
            isActive && "text-primary-700"
          )}
        >
          Filter
        </span>
        <IconComponent
          src="/icons/filter16.svg"
          className={cn(
            `size-4 shrink-0 text-neutral-600`,
            isActive && "text-primary-700"
          )}
        />
      </button>
    </Trigger>
  )
);
FilterTrigger.displayName = "FilterTrigger";

// 3. Content Component (The first-level dropdown content)
const Content = React.forwardRef<HTMLDivElement, ContentProps>(
  ({ className, align = "center", sideOffset = 4, ...props }, ref) => (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        ref={ref}
        align={align}
        sideOffset={sideOffset}
        className={cn(
          "z-50 w-48 overflow-hidden rounded-md border border-neutral-400 bg-neutral-50 shadow-md outline-none animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
          className
        )}
        {...props}
      />
    </PopoverPrimitive.Portal>
  )
);
Content.displayName = PopoverPrimitive.Content.displayName;

// 4. Item Component (An item in the first-level dropdown that triggers a sub-menu on hover)
const HoverRoot: React.FC<HoverRootProps> = ({
  title,
  children,
  className,
}) => (
  <HoverCardPrimitive.Root openDelay={100} closeDelay={100}>
    <HoverCardPrimitive.Trigger asChild>
      <div
        className={cn(
          "flex cursor-pointer items-center justify-between px-3 py-2 text-xs font-medium hover:bg-neutral-200 focus:outline-none",
          className
        )}
        tabIndex={0}
      >
        <span>{title}</span>
        <IconComponent
          src="/icons/chevron-right.svg"
          className="h-4 w-4 text-neutral-400"
          alt={`Open submenu for ${title}`}
        />
      </div>
    </HoverCardPrimitive.Trigger>
    {children}
  </HoverCardPrimitive.Root>
);

// 5. SubContent Component (The second-level dropdown content that appears on hover)
const HoverContent = React.forwardRef<HTMLDivElement, HoverContentProps>(
  (
    {
      className,
      appearance = {
        wrapperClassName: "",
      },
      align = "start",
      sideOffset = 2,
      side = "right",
      ...props
    },
    ref
  ) => (
    <HoverCardPrimitive.Portal>
      <HoverCardPrimitive.Content
        ref={ref}
        align={align}
        sideOffset={sideOffset}
        side={side}
        className={cn(
          "z-50 w-48 overflow-hidden rounded-md border border-neutral-400 bg-white text-neutral-900 shadow-lg outline-none animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
          className
        )}
        {...props}
      >
        {/* Wrapper for fixed height and scrolling */}
        <div
          className={cn(
            "flex max-h-48 flex-col overflow-y-auto",
            appearance.wrapperClassName
          )}
        >
          {props.children}
        </div>
      </HoverCardPrimitive.Content>
    </HoverCardPrimitive.Portal>
  )
);
HoverContent.displayName = HoverCardPrimitive.Content.displayName;

// 6. SubItem Component (A clickable item within the SubContent)
const HoverItem = React.forwardRef<HTMLButtonElement, HoverItemProps>(
  ({ children, onClick, className, asChild = false, ...props }, ref) => {
    if (asChild && React.isValidElement(children)) {
      const childElement = children as React.ReactElement<any>;
      return React.cloneElement(childElement, {
        ...props,
        ref,
        onClick,
        className: cn(
          childElement.props.className, // keep child's classes
          className // add parent classes
        ),
      });
    }
    return (
      <button
        onClick={onClick}
        className={cn(
          "flex h-8 w-full flex-shrink-0 items-center rounded px-2.5 text-left text-xs font-medium text-neutral-900 hover:bg-neutral-100 focus:outline-none focus-visible:bg-neutral-100",
          className
        )}
      >
        {children}
      </button>
    );
  }
);
HoverItem.displayName = "HoverItem";

const Item = React.forwardRef<HTMLDivElement, ItemProps>(
  ({ children, onClick, className, isDestructive = false, ...props }, ref) => {
    const baseClasses =
      "flex h-[26px] w-full items-center px-3 py-[6px] text-left text-xs font-normal hover:bg-neutral-100 transition-colors cursor-pointer";

    return (
      <div
        ref={ref}
        role="menuitem"
        tabIndex={-1} // Makes it focusable but not part of natural tab order (managed by Popover/Menu)
        onClick={onClick}
        className={cn(
          baseClasses,
          isDestructive ? "!text-error-500" : "text-neutral-900", // Red text for destructive action
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
Item.displayName = "DropdownItem";

// Type definitions for the Dropdown components
export type DropdownComponents = {
  Root: typeof PopoverPrimitive.Root;
  Trigger: typeof PopoverPrimitive.Trigger;
  FilterTrigger: React.ForwardRefExoticComponent<
    FilterTriggerProps & React.RefAttributes<HTMLButtonElement>
  >;
  Content: React.ForwardRefExoticComponent<
    ContentProps & React.RefAttributes<HTMLDivElement>
  >;
  HoverRoot: React.FC<HoverRootProps>;
  HoverContent: React.ForwardRefExoticComponent<
    HoverContentProps & React.RefAttributes<HTMLDivElement>
  >;
  HoverItem: React.ForwardRefExoticComponent<
    HoverItemProps & React.RefAttributes<HTMLButtonElement>
  >;
  Item: React.ForwardRefExoticComponent<
    ItemProps & React.RefAttributes<HTMLDivElement>
  >;
};

// Main Dropdown compound component
const Dropdown = ({
  children,
  ...props
}: {
  children: React.ReactNode;
  [key: string]: any;
}) => {
  return <Root {...props}>{children}</Root>;
};

// Attach sub-components to the main component
Dropdown.Root = Root;
Dropdown.Trigger = Trigger;
Dropdown.FilterTrigger = FilterTrigger;
Dropdown.Content = Content;
Dropdown.HoverRoot = HoverRoot;
Dropdown.HoverContent = HoverContent;
Dropdown.HoverItem = HoverItem;
Dropdown.Item = Item;

Dropdown.displayName = "Dropdown";

export { Dropdown };
