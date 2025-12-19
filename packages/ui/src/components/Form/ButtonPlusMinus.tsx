"use client";

import * as React from "react";

import { cn } from "@muatmuat/lib/utils";

import { IconComponent } from "../IconComponent";

export interface ButtonPlusMinusProps {
  value?: number;
  onChange?: (value: number) => void;
  onIncrement?: (value: number) => void;
  onDecrement?: (value: number) => void;
  minValue?: number;
  maxValue?: number;
  disabled?: boolean;
  className?: string;
  appearance?: {
    inputClassName?: string;
  };
}

/**
 * ButtonPlusMinus component for incrementing/decrementing numeric values
 */
const ButtonPlusMinus: React.FC<ButtonPlusMinusProps> = ({
  value = 0,
  onChange,
  onIncrement,
  onDecrement,
  minValue = 0,
  maxValue,
  disabled = false,
  className,
  appearance,
}) => {
  // Ensure value is always a number
  const numericValue = isNaN(value) ? 0 : Number(value);
  const disabledDecrement = disabled || numericValue === minValue;
  const disabledIncrement = disabled || numericValue === maxValue;

  const handleDecrement = () => {
    if (disabledDecrement || numericValue <= minValue) {
      return;
    }

    const newValue = numericValue - 1;
    onChange?.(newValue);
    onDecrement?.(newValue);
  };

  const handleIncrement = () => {
    if (
      disabledIncrement ||
      (maxValue !== undefined && numericValue >= maxValue)
    ) {
      return;
    }

    const newValue = numericValue + 1;
    onChange?.(newValue);
    onIncrement?.(newValue);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;

    const inputValue = e.target.value;

    // Only allow numeric values
    if (/^\d*$/.test(inputValue)) {
      const newValue =
        inputValue === ""
          ? 0
          : parseInt(inputValue.replace(/^0+/, "") || "0", 10);
      onChange?.(newValue);
    }
  };

  const handleInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (disabled) return;

    let newValue = parseInt(e.target.value, 10);

    // Apply constraints
    if (isNaN(newValue)) newValue = 0;
    if (maxValue !== undefined && newValue > maxValue) newValue = maxValue;
    if (newValue < minValue) newValue = minValue;

    onChange?.(newValue);
  };

  return (
    <div
      className={cn(
        "flex h-8 w-[110px] items-center justify-between rounded-md border border-neutral-600 px-3",
        disabled && "bg-neutral-200"
      )}
    >
      <button
        className={cn("disabled:cursor-not-allowed")}
        onClick={handleDecrement}
        disabled={disabledDecrement}
      >
        <IconComponent
          className={cn(disabledDecrement && "icon-stroke-neutral-500")}
          src="/icons/minus16.svg"
        />
      </button>

      <input
        type="number"
        className={cn(
          "w-full max-w-8 select-none text-center text-xs font-medium leading-[14.4px] outline-none",
          disabled ? "text-neutral-500" : "text-neutral-900",
          appearance?.inputClassName
        )}
        value={numericValue}
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        disabled={disabled}
      />

      <button
        className={cn("disabled:cursor-not-allowed")}
        onClick={handleIncrement}
        disabled={disabledIncrement}
      >
        <IconComponent
          className={cn(disabledIncrement && "icon-stroke-neutral-500")}
          src="/icons/plus16.svg"
        />
      </button>
    </div>
  );
};

export { ButtonPlusMinus };
