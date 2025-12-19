import * as React from "react";

import { cn } from "@muatmuat/lib/utils";
import { Dropdown } from "@muatmuat/ui/Dropdown";
import { ChevronDown } from "lucide-react";

export interface ActionDropdownTriggerProps
  extends React.HTMLAttributes<HTMLDivElement> {
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  disabled?: boolean;
  children?: React.ReactNode;
  className?: string;
}

export interface ActionDropdownContentProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
}

export interface ActionDropdownItemProps
  extends React.HTMLAttributes<HTMLDivElement> {
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  children?: React.ReactNode;
  className?: string;
}

const Root = Dropdown.Root;
Root.displayName = "ActionDropdownRoot";

const Trigger = React.forwardRef<HTMLDivElement, ActionDropdownTriggerProps>(
  ({ onClick, disabled = false, className, children, ...props }, ref) => {
    return (
      <Dropdown.Trigger asChild>
        <div
          ref={ref}
          className={cn(
            "box-border flex h-[33px] w-[61px] cursor-pointer items-center justify-center gap-2 rounded-[6px] border border-neutral-400 bg-white p-2 transition-colors hover:bg-neutral-50",
            disabled && "cursor-not-allowed opacity-60",
            className
          )}
          onClick={onClick}
          aria-label="Atur Menu"
          role="button"
          tabIndex={disabled ? -1 : 0}
          {...props}
        >
          <div className="flex items-center gap-1">
            <span className="text-[12px] font-semibold leading-[14px] text-neutral-600">
              {children || "Atur"}
            </span>
            <ChevronDown width={14} height={14} className="text-neutral-600" />
          </div>
        </div>
      </Dropdown.Trigger>
    );
  }
);
Trigger.displayName = "ActionDropdownTrigger";

const Content = React.forwardRef<HTMLDivElement, ActionDropdownContentProps>(
  ({ children, className, ...props }, ref) => (
    <Dropdown.Content
      ref={ref}
      side="bottom"
      align="start"
      // Custom Styling from Figma
      className={cn(
        "h-auto w-auto rounded-md border-neutral-400 bg-white p-0 text-sm shadow-md",
        className
      )}
      sideOffset={1}
      {...props}
    >
      <div className="flex flex-col">{children}</div>
    </Dropdown.Content>
  )
);
Content.displayName = "ActionDropdownContent";

const Item = React.forwardRef<HTMLDivElement, ActionDropdownItemProps>(
  ({ children, onClick, className, ...props }, ref) => {
    // Styles match the Figma inner item structure (Frame 48097553 etc.)
    const baseClasses =
      "flex py-1.5 w-full items-center px-3 text-left text-xs font-normal hover:bg-neutral-100 transition-colors cursor-pointer";

    return (
      <div
        ref={ref}
        role="menuitem"
        tabIndex={0}
        onClick={onClick}
        className={cn(baseClasses, className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);
Item.displayName = "ActionDropdownItem";

export type ActionDropdownComponents = {
  Root: typeof Dropdown.Root;
  Trigger: React.ForwardRefExoticComponent<
    ActionDropdownTriggerProps & React.RefAttributes<HTMLDivElement>
  >;
  Content: React.ForwardRefExoticComponent<
    ActionDropdownContentProps & React.RefAttributes<HTMLDivElement>
  >;
  Item: React.ForwardRefExoticComponent<
    ActionDropdownItemProps & React.RefAttributes<HTMLDivElement>
  >;
};

const ActionDropdown: ActionDropdownComponents = {
  Root: Root,
  Trigger: Trigger,
  Content: Content,
  Item: Item,
};

export { ActionDropdown };
