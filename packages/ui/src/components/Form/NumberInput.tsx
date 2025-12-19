import {
  type FocusEvent,
  forwardRef,
  useCallback,
  useEffect,
  useState,
} from "react";

import { cn } from "@muatmuat/lib/utils";
// Assuming this utility exists
import { Minus, Plus } from "lucide-react";
import {
  type NumberFormatValues,
  NumericFormat,
  type NumericFormatProps,
} from "react-number-format";

import { type TranslationFunction, tMockFn } from "../../lib/mock-t";

/**
 * Defines the structure for prefix/suffix text adornments.
 */
export interface InputTextAdornment {
  left?: string;
  leftClassName?: string;
  right?: string;
  rightClassName?: string;
}

export interface NumberInputProps
  extends Omit<
    NumericFormatProps,
    | "value"
    | "defaultValue"
    | "onValueChange"
    | "onChange"
    | "min"
    | "max"
    | "isAllowed"
  > {
  /**
   * The controlled value of the input.
   */
  value?: number | null;
  /**
   * The default value for uncontrolled mode.
   * @default 0
   */
  defaultValue?: number | null;
  /**
   * Callback fired when the numeric value changes.
   */
  onValueChange?: (value: number | undefined) => void;
  /**
   * A simplified `onChange` handler compatible with standard form libraries.
   */
  onChange?: (event: { target: { value: number | undefined } }) => void;
  /**
   * The minimum allowed numeric value.
   * @default 0
   */
  min?: number;
  /**
   * The maximum allowed numeric value.
   * @default Infinity
   */
  max?: number;
  /**
   * The amount to increment or decrement with stepper buttons.
   * @default 1
   */
  stepper?: number;
  /**
   * If `true`, the stepper buttons will be hidden.
   * @default false
   */
  hideStepper?: boolean;
  /**
   * The error message to display below the input.
   */
  errorMessage?: string;
  hideErrorMessage?: boolean;
  /**
   * A translation function.
   */
  t?: TranslationFunction;
  /**
   * An object for adding prefix and suffix text.
   */
  text?: InputTextAdornment;
  /**
   * Customizes the appearance of the input and its elements.
   */
  appearance?: {
    inputClassName?: string;
  };
}

/**
 * A versatile number input component with steppers, numeric formatting, and validation.
 * It can be used as a controlled or uncontrolled component and is built upon `react-number-format`.
 */
const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>(
  (
    {
      t = tMockFn,
      value: controlledValue,
      defaultValue = 0,
      onValueChange,
      onChange,
      min = 0,
      max = Infinity,
      stepper = 1,
      className,
      disabled = false,
      thousandSeparator = ".",
      decimalSeparator = ",",
      decimalScale = 0,
      fixedDecimalScale = false,
      placeholder = "0",
      hideStepper = false,
      errorMessage,
      hideErrorMessage = false,
      text,
      onBlur,
      appearance = {
        inputClassName: "",
      },
      ...props
    },
    ref
  ) => {
    const isControlled = controlledValue !== undefined;
    const [internalValue, setInternalValue] = useState<number | null>(
      defaultValue
    );
    const [isFocused, setIsFocused] = useState(false);

    // Determine the current value based on whether the component is controlled or not.
    const value = isControlled ? controlledValue : internalValue;

    // Sync internal state if the controlled value changes from the outside.
    useEffect(() => {
      if (isControlled) {
        setInternalValue(controlledValue);
      }
    }, [controlledValue, isControlled]);

    /**
     * A memoized callback to enforce the `max` value constraint.
     */
    const isAllowed = useCallback(
      (values: NumberFormatValues) => {
        const { floatValue } = values;
        // Allow empty values or values within the max limit.
        return floatValue === undefined || floatValue <= max;
      },
      [max]
    );

    /**
     * A centralized and memoized function to trigger state updates and callbacks.
     */
    const triggerChange = useCallback(
      (newValue: number | undefined) => {
        if (!isControlled) {
          setInternalValue(newValue ?? null);
        }
        onValueChange?.(newValue);
        onChange?.({ target: { value: newValue } });
      },
      [isControlled, onChange, onValueChange]
    );

    const handleIncrement = useCallback(() => {
      const currentValue = typeof value === "number" ? value : 0;
      const newValue = Math.min(currentValue + stepper, max);
      triggerChange(newValue);
    }, [value, stepper, max, triggerChange]);

    const handleDecrement = useCallback(() => {
      const currentValue = typeof value === "number" ? value : 0;
      const newValue = Math.max(currentValue - stepper, min);
      triggerChange(newValue);
    }, [value, stepper, min, triggerChange]);

    const handleValueChange = (values: NumberFormatValues) => {
      triggerChange(values.floatValue);
    };

    const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      const numericValue = typeof value === "number" ? value : null;

      if (numericValue === null || numericValue < min) {
        triggerChange(min);
      } else if (numericValue > max) {
        triggerChange(max);
      }
      // Forward the original onBlur event if it exists.
      onBlur?.(e);
    };

    const handleFocus = () => setIsFocused(true);

    return (
      <div className={cn("flex w-full flex-col gap-2", className)}>
        <div
          className={cn(
            "flex h-8 items-center rounded-md border border-neutral-600 bg-neutral-50 p-2 transition-colors",
            disabled && "cursor-not-allowed bg-neutral-200",
            isFocused && !disabled && "border-primary-700",
            errorMessage && !disabled && "border-error-400"
          )}
        >
          {text?.left && (
            <span
              className={cn(
                "flex-shrink-0 pl-3 pr-2 text-sm font-semibold text-neutral-500",
                text?.leftClassName
              )}
            >
              {text.left}
            </span>
          )}

          {!hideStepper && (
            <button
              type="button"
              aria-label="Decrease value"
              onClick={handleDecrement}
              disabled={disabled || (value ?? min) <= min}
              className={cn(
                "disabled:cursor-not-allowed",
                !text?.left && "pl-3"
              )}
            >
              <Minus className="size-4 text-neutral-700 transition-colors disabled:text-neutral-500" />
            </button>
          )}

          <NumericFormat
            {...props}
            getInputRef={ref}
            isAllowed={isAllowed}
            value={value ?? ""}
            onValueChange={handleValueChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            thousandSeparator={thousandSeparator}
            decimalSeparator={decimalSeparator}
            decimalScale={decimalScale}
            fixedDecimalScale={fixedDecimalScale}
            allowNegative={min < 0}
            placeholder={placeholder}
            disabled={disabled}
            className={cn(
              "min-w-0 flex-grow border-none bg-transparent text-sm font-semibold text-neutral-900 outline-none hover:cursor-pointer focus:ring-0 md:text-xs",
              !hideStepper && "text-center",
              "disabled:cursor-not-allowed disabled:text-neutral-500",
              // Hide browser default number input spinners
              "[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none",
              // Dynamic padding
              hideStepper && !text?.left && "pl-3",
              hideStepper && !text?.right && "pr-3",
              appearance.inputClassName
            )}
          />

          {!hideStepper && (
            <button
              type="button"
              aria-label="Increase value"
              onClick={handleIncrement}
              disabled={disabled || (value ?? min) >= max}
              className={cn(
                "disabled:cursor-not-allowed",
                !text?.right && "pr-3"
              )}
            >
              <Plus className="size-4 text-neutral-700 transition-colors disabled:text-neutral-500" />
            </button>
          )}

          {text?.right && (
            <span
              className={cn(
                "flex-shrink-0 pl-2 pr-3 text-sm font-semibold text-neutral-500",
                text?.rightClassName
              )}
            >
              {text.right}
            </span>
          )}
        </div>
        {errorMessage && !hideErrorMessage && (
          <span className="text-xs font-medium text-error-400">
            {t(errorMessage)}
          </span>
        )}
      </div>
    );
  }
);

NumberInput.displayName = "NumberInput";

export { NumberInput };
