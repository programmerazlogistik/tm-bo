"use client";

/**
 * SimpleDropdown Component
 * A simplified dropdown component built on SimpleDropdownMenu
 */
import React from "react";

import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";

import {
  SimpleDropdownContent,
  SimpleDropdownItem,
  SimpleDropdownTrigger,
} from "./SimpleDropdownMenu";

export interface SimpleDropdownProps {
  /** Trigger element */
  trigger?: React.ReactNode;
  /** Dropdown items */
  items?: Array<{
    id: string;
    label: string;
    onClick?: () => void;
  }>;
  /** Additional classes */
  className?: string;
  /** Children for compound usage */
  children?: React.ReactNode;
}

// Legacy interface for backward compatibility
export interface SimpleDropdownLegacyProps {
  trigger: React.ReactNode;
  items: Array<{
    id: string;
    label: string;
    onClick?: () => void;
  }>;
  className?: string;
}

// Create the main component
const SimpleDropdownComponent = React.forwardRef<
  HTMLDivElement,
  SimpleDropdownProps & {
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    defaultOpen?: boolean;
  }
>(({ children, ...props }, _ref) => {
  return (
    <DropdownMenuPrimitive.Root {...props}>
      {children}
    </DropdownMenuPrimitive.Root>
  );
});

SimpleDropdownComponent.displayName = "SimpleDropdownComponent";

// Create compound component with sub-components
const SimpleDropdown =
  SimpleDropdownComponent as typeof SimpleDropdownComponent & {
    Trigger: typeof SimpleDropdownTrigger;
    Content: typeof SimpleDropdownContent;
    Item: typeof SimpleDropdownItem;
  };

// Attach sub-components for compound usage
SimpleDropdown.Trigger = SimpleDropdownTrigger;
SimpleDropdown.Content = SimpleDropdownContent;
SimpleDropdown.Item = SimpleDropdownItem;

SimpleDropdown.displayName = "SimpleDropdown";

export { SimpleDropdown };
