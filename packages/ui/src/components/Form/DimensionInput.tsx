import { type FC, useCallback } from "react";

import { cn } from "@muatmuat/lib/utils";
import {
  type NumberFormatValues,
  NumericFormat,
  type NumericFormatProps,
} from "react-number-format";

// Assuming this utility exists

/**
 * Represents a single dimension field, typically managed by a form state library.
 */
interface DimensionField {
  /** The current value of the dimension input. */
  value: number | string | null | undefined;
  /** A function to update the value of the dimension input. */
  setValue: (value: number | string) => void;
}

/**
 * Defines the structure for the manual input fields (length, width, height).
 */
interface ManualInputProps {
  panjang?: DimensionField;
  lebar?: DimensionField;
  tinggi?: DimensionField;
}

/**
 * Defines class names for customizing the appearance of the input.
 */
interface DimensionInputAppearance {
  inputClassName?: string;
}

export interface DimensionInputProps {
  /**
   * An object containing the value and setter for each dimension.
   * Designed to be compatible with react-hook-form's `Controller`.
   */
  manual?: ManualInputProps;
  /**
   * Optional class name for the main container div.
   */
  className?: string;
  /**
   * Object to customize the class names of the component's parts.
   */
  appearance?: DimensionInputAppearance;
  /**
   * If `true`, the input fields will be disabled.
   * @default false
   */
  disabled?: boolean;
}

/**
 * A composite input component for entering 3D measurements (panjang x lebar x tinggi).
 * It uses `react-number-format` for numeric formatting and is designed to integrate
 * easily with form libraries like `react-hook-form`.
 */
export const DimensionInput: FC<DimensionInputProps> = ({
  manual,
  className,
  appearance = {},
  disabled = false,
}) => {
  /**
   * A memoized factory function that generates the required props for each NumericFormat input.
   * This avoids redefining the same logic for each of the three inputs.
   */
  const getInputProps = useCallback(
    (field: DimensionField | undefined): NumericFormatProps => {
      return {
        allowNegative: false,
        decimalScale: 2,
        thousandSeparator: ".",
        decimalSeparator: ",",
        className: cn(
          "w-full min-w-0 bg-transparent text-center text-xs font-medium placeholder:text-neutral-600 focus:outline-none",
          disabled ? "cursor-not-allowed" : "cursor-text",
          appearance.inputClassName
        ),
        value: field?.value ?? "",
        onValueChange: (values: NumberFormatValues) => {
          // `setValue` expects a string or number, floatValue can be undefined.
          // Coalesce undefined to an empty string to clear the input.
          field?.setValue(values.floatValue ?? "");
        },
        isAllowed: (values: NumberFormatValues) => {
          const { floatValue } = values;
          // Allow the input to be cleared.
          if (floatValue === undefined) return true;
          // Limit the total number of digits to 6.
          const valueStr = String(floatValue).replace(".", "");
          return valueStr.length <= 6;
        },
        disabled,
      };
    },
    [appearance.inputClassName, disabled]
  );

  return (
    <div
      className={cn(
        "grid h-8 w-full grid-cols-[1fr,auto,1fr,auto,1fr] items-center gap-x-1 rounded-md border border-neutral-600 px-3",
        disabled
          ? "cursor-not-allowed bg-neutral-200"
          : "bg-neutral-50 focus-within:border-primary-700 hover:border-primary-700",
        className
      )}
    >
      <NumericFormat {...getInputProps(manual?.panjang)} placeholder="p" />
      <span className="text-xs text-neutral-600">x</span>
      <NumericFormat {...getInputProps(manual?.lebar)} placeholder="l" />
      <span className="text-xs text-neutral-600">x</span>
      <NumericFormat {...getInputProps(manual?.tinggi)} placeholder="t" />
    </div>
  );
};
