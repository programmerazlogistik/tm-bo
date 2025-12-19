import * as React from "react";

import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";

export type SimpleDropdownMenuContentProps = React.ComponentProps<
  typeof DropdownMenuPrimitive.Content
> & {
  side?: "left" | "right" | "top" | "bottom";
  align?: "start" | "center" | "end";
  className?: string;
  children?: React.ReactNode;
};

export type SimpleDropdownItemProps = React.ComponentProps<
  typeof DropdownMenuPrimitive.Item
> & {
  className?: string;
  onSelect?: () => void;
  children?: React.ReactNode;
};
