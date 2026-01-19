"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { cn } from "@muatmuat/lib/utils";
import { Checkbox, Input } from "@muatmuat/ui/Form";
import { ScrollArea } from "@muatmuat/ui/ScrollArea";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { ChevronDown, X } from "lucide-react";

export interface MultiSelectOption {
  value: string;
  label: string;
  shortLabel?: string;
}

interface MultiSelectContextProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedValues: string[];
  toggleValue: (value: string) => void;
  toggleAllValues: () => void;
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  options: MultiSelectOption[];
  placeholder: string;
  selectAllText?: string;
  clearSearch: () => void;
  enableSelectAll: boolean;
}

const MultiSelectContext = createContext<MultiSelectContextProps | null>(null);

const useMultiSelect = () => {
  const context = useContext(MultiSelectContext);
  if (!context) {
    throw new Error("useMultiSelect must be used within a MultiSelect.Root");
  }
  return context;
};

// --- Compound Components ---

interface MultiSelectComponents {
  Root: React.FC<MultiSelectRootProps>;
  Trigger: React.ForwardRefExoticComponent<
    React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Trigger> &
      React.RefAttributes<HTMLButtonElement>
  >;
  Content: React.ForwardRefExoticComponent<
    React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content> & {
      children?: React.ReactNode;
    } & React.RefAttributes<HTMLDivElement>
  >;
  Search: React.ForwardRefExoticComponent<
    SearchProps & React.RefAttributes<HTMLInputElement>
  >;
  List: React.ForwardRefExoticComponent<
    Omit<React.ComponentPropsWithoutRef<typeof ScrollArea>, "children"> &
      React.RefAttributes<HTMLDivElement>
  >;
}

/**
 * Root component: Manages state for the multi-select dropdown.
 */
interface MultiSelectRootProps {
  children: React.ReactNode;
  options: MultiSelectOption[];
  value: string[];
  onValueChange: (value: string[]) => void;
  placeholder?: string;
  selectAllText?: string;
  enableSelectAll?: boolean;
}

const Root: React.FC<MultiSelectRootProps> = ({
  children,
  options,
  value,
  onValueChange,
  placeholder = "Select options...",
  selectAllText = "Select All",
  enableSelectAll = true,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Clear search when dropdown closes
  useEffect(() => {
    if (!isOpen) {
      setSearchTerm("");
    }
  }, [isOpen]);

  // Memoize callback functions to prevent unnecessary re-renders
  const toggleValue = useCallback(
    (valueToToggle: string) => {
      onValueChange(
        value.includes(valueToToggle)
          ? value.filter((v) => v !== valueToToggle)
          : [...value, valueToToggle]
      );
    },
    [value, onValueChange]
  );

  const toggleAllValues = useCallback(() => {
    const allValues = options.map((option) => option.value);
    const allSelected = allValues.every((val) => value.includes(val));
    onValueChange(allSelected ? [] : allValues);
  }, [options, value, onValueChange]);

  const clearSearch = useCallback(() => {
    setSearchTerm("");
  }, []);

  const contextValue = {
    isOpen,
    setIsOpen,
    selectedValues: value,
    toggleValue,
    toggleAllValues,
    searchTerm,
    setSearchTerm,
    options,
    placeholder,
    selectAllText,
    clearSearch,
    enableSelectAll,
  };

  return (
    <MultiSelectContext.Provider value={contextValue}>
      <PopoverPrimitive.Root open={isOpen} onOpenChange={setIsOpen}>
        {children}
      </PopoverPrimitive.Root>
    </MultiSelectContext.Provider>
  );
};

/**
 * Trigger component: Renders the dropdown trigger, showing placeholder or selected tags.
 */
const Trigger = React.forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Trigger>
>(({ className, ...props }, ref) => {
  const { isOpen, selectedValues, options, placeholder, toggleValue } =
    useMultiSelect();

  const selectedOptions = useMemo(
    () => options.filter((opt) => selectedValues.includes(opt.value)),
    [options, selectedValues]
  );
  // 26. 03 - TM - LB - 0177
  return (
    <PopoverPrimitive.Trigger
      ref={ref}
      className={cn(
        "flex min-h-8 w-full min-w-0 items-center justify-between gap-2 rounded-[6px] border border-[#A8A8A8] bg-white px-2 py-[7px] text-xs font-medium transition-colors",
        "focus:outline-none focus:ring-1 focus:ring-offset-0",
        isOpen
          ? "border-[#176CF7]"
          : "hover:border-primary-700 data-[state=closed]:border-[#A8A8A8]",
        className
      )}
      {...props}
    >
      <div className="flex flex-1 flex-wrap items-center gap-1">
        {selectedOptions.length === 0 ? (
          <span className="font-medium text-[#868686]">{placeholder}</span>
        ) : (
          selectedOptions.map((option) => (
            <div
              key={option.value}
              className="flex h-[19px] items-center gap-1 rounded-[4px] bg-[#868686] px-1 py-0.5"
            >
              <span className="text-[12px] font-medium text-white">
                {option.shortLabel || option.label}
              </span>
              <X
                className="h-3 w-3 cursor-pointer text-white"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent dropdown from opening/closing
                  toggleValue(option.value);
                }}
              />
            </div>
          ))
        )}
      </div>
      <ChevronDown
        className={cn(
          "h-4 w-4 text-[#868686] transition-transform",
          isOpen && "rotate-180"
        )}
      />
    </PopoverPrimitive.Trigger>
  );
});
Trigger.displayName = "MultiSelect.Trigger";

/**
 * Content component: The popover content area.
 */
const Content = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content> & {
    children?: React.ReactNode;
  }
>(({ className, children, ...props }, ref) => {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        ref={ref}
        className={cn(
          "z-50 w-[var(--radix-popover-trigger-width)] rounded-[6px] border border-[#176CF7] bg-white p-3 shadow-md",
          "animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
          "data-[side=bottom]:slide-in-from-top-2 data-[side=top]:slide-in-from-bottom-2",
          className
        )}
        sideOffset={5}
        align="start"
        {...props}
      >
        {children}
      </PopoverPrimitive.Content>
    </PopoverPrimitive.Portal>
  );
});
Content.displayName = "MultiSelect.Content";

/**
 * Search component: The search input inside the popover.
 */
interface SearchProps
  extends Omit<
    React.ComponentPropsWithoutRef<typeof Input>,
    "onChange" | "placeholder"
  > {
  placeholder?: string;
}

const Search = React.forwardRef<HTMLInputElement, SearchProps>(
  ({ className, placeholder = "Search here...", ...props }, ref) => {
    const { searchTerm, setSearchTerm } = useMultiSelect();
    return (
      <Input
        ref={ref}
        placeholder={placeholder}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        appearance={{
          containerClassName: "h-8 border-[#A8A8A8]",
          inputClassName: "text-xs placeholder:text-[#868686]",
        }}
        className={cn("mb-3 w-full", className)}
        {...props}
      />
    );
  }
);
Search.displayName = "MultiSelect.Search";

/**
 * List component: The scrollable list of options.
 */
const List = React.forwardRef<
  HTMLDivElement,
  Omit<React.ComponentPropsWithoutRef<typeof ScrollArea>, "children">
>(({ className, ...props }, ref) => {
  const {
    options,
    searchTerm,
    selectedValues,
    toggleValue,
    toggleAllValues,
    selectAllText,
    enableSelectAll,
  } = useMultiSelect();

  const filteredOptions = useMemo(() => {
    // If no search term, return all options
    if (!searchTerm.trim()) {
      return options;
    }
    return options.filter((option) =>
      option.label.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [options, searchTerm]);

  return (
    <ScrollArea
      ref={ref}
      className={cn("h-[144px] w-full", className)}
      {...props}
    >
      <div className="flex flex-col gap-3 pr-3">
        {enableSelectAll && (
          <button
            className="border-b border-[#C6CBD4] pb-3 pt-2 text-left text-xs font-medium"
            onClick={() => toggleAllValues()}
          >
            {selectAllText}
          </button>
        )}
        {filteredOptions.length === 0 ? (
          <div className="flex items-center justify-center py-4 text-xs text-gray-500">
            No options found
          </div>
        ) : (
          filteredOptions.map((option) => (
            <Checkbox
              key={`${option.value}-${option.label}`}
              label={option.label}
              checked={selectedValues.includes(option.value)}
              onCheckedChange={() => toggleValue(option.value)}
              className="border-[#176CF7]"
            />
          ))
        )}
      </div>
    </ScrollArea>
  );
});
List.displayName = "MultiSelect.List";

export const MultiSelect: MultiSelectComponents = {
  Root,
  Trigger,
  Content,
  Search,
  List,
};
