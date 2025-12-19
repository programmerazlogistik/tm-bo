"use client";

import { type ElementRef, forwardRef } from "react";

import { Check, ChevronDown } from "@muatmuat/icons";
import { cn } from "@muatmuat/lib/utils";
import type {
  SelectProps as RadixSelectProps,
  SelectItemProps,
} from "@radix-ui/react-select";
import * as SelectPrimitive from "@radix-ui/react-select";

import { type TranslationFunction, tMockFn } from "../../lib/mock-t";

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps
  extends Omit<RadixSelectProps, "value" | "onValueChange" | "disabled"> {
  options?: SelectOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  notFoundText?: string;
  disabled?: boolean;
  className?: string;
  errorMessage?: string | null;
  hideErrorMessage?: boolean;
  contentClassName?: string;
  searchable?: boolean;
  t?: TranslationFunction;
}

const SelectItem = ({
  className,
  children,
  ...props
}: SelectItemProps & {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn(
        "inline-flex w-full cursor-pointer items-center justify-between gap-2.5 px-2.5 py-3 text-left text-xs leading-[14.4px] transition-colors duration-150",
        "font-medium text-black outline-none hover:border-none hover:bg-neutral-200 hover:outline-none",
        "text-wrap break-words data-[state=checked]:bg-neutral-50 data-[state=checked]:font-semibold data-[state=checked]:text-black",
        className
      )}
      {...props}
    >
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
      <SelectPrimitive.ItemIndicator>
        <Check className="text-[#176CF7]" width={16} height={16} />
      </SelectPrimitive.ItemIndicator>
    </SelectPrimitive.Item>
  );
};

const SelectComponent = (
  props: SelectProps,
  ref: React.ForwardedRef<ElementRef<typeof SelectPrimitive.Content>>
) => {
  const {
    t = tMockFn,
    options = [],
    value,
    onChange,
    placeholder = "Select item...",
    notFoundText = "Data Tidak Ditemukan",
    disabled = false,
    className = "w-full",
    errorMessage = null,
    contentClassName,
    hideErrorMessage = false,

    searchable = false,
    ...restProps
  } = props;

  return (
    <div className="relative flex w-full flex-col gap-2">
      <SelectPrimitive.Root
        data-slot="select"
        value={value}
        onValueChange={onChange}
        disabled={disabled}
        {...restProps}
      >
        <SelectPrimitive.Trigger
          data-slot="select-trigger"
          data-size={"sm"}
          className={cn(
            "group",
            "flex h-8 items-center justify-between gap-2 rounded-md border px-3 text-sm font-semibold leading-[14.4px] transition-colors duration-200 md:text-xs md:font-medium",
            "bg-white text-black focus:outline-none focus:ring-1 focus:ring-primary-700/20",
            "border-neutral-600 hover:border-primary-700 data-[state=open]:border-primary-700",
            errorMessage && "border-red-500 focus:border-red-500",
            disabled && "cursor-not-allowed bg-gray-50 opacity-50",
            !value && "text-neutral-600",
            "min-w-0 [&>span]:line-clamp-1",
            className
          )}
        >
          <SelectPrimitive.Value
            data-slot="select-value"
            placeholder={placeholder}
          />
          <SelectPrimitive.Icon asChild>
            <ChevronDown
              width={16}
              height={16}
              className="flex-shrink-0 transition-transform duration-200 group-data-[state=open]:rotate-180"
            />
          </SelectPrimitive.Icon>
        </SelectPrimitive.Trigger>

        <SelectPrimitive.Portal>
          <SelectPrimitive.Content
            ref={ref}
            data-slot="select-content"
            className={cn(
              "z-[52] overflow-hidden rounded-md border border-neutral-300 bg-white text-xs font-medium shadow-lg"
            )}
            position="popper"
            sideOffset={4}
          >
            <SelectPrimitive.Viewport
              className={cn(
                "w-full min-w-[var(--radix-select-trigger-width)] scroll-my-1 p-0",
                "scrollbar-thin scrollbar-thumb-neutral-400 scrollbar-track-neutral-100 overflow-y-auto",
                "[&::-webkit-scrollbar-thumb]:bg-neutral-400 [&::-webkit-scrollbar-track]:bg-neutral-100 [&::-webkit-scrollbar]:w-3",
                "[&::-webkit-scrollbar-thumb:rounded-sm] max-w-[200px] [&::-webkit-scrollbar-thumb:hover]:bg-neutral-500",
                "max-h-64",
                contentClassName
              )}
            >
              {options.length === 0 ? (
                <div className="px-2.5 py-2 text-center text-xs text-neutral-900">
                  {notFoundText}
                </div>
              ) : (
                options.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))
              )}
            </SelectPrimitive.Viewport>
          </SelectPrimitive.Content>
        </SelectPrimitive.Portal>
      </SelectPrimitive.Root>
      {errorMessage && !hideErrorMessage && (
        <span className="text-xs font-medium text-error-400">
          {t(errorMessage)}
        </span>
      )}
    </div>
  );
};

// Wrap with forwardRef for ref forwarding
const Select = forwardRef(SelectComponent);
Select.displayName = "Select";

export { Select, SelectItem };
