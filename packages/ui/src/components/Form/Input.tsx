import {
  type ChangeEvent,
  type InputHTMLAttributes,
  type ReactNode,
  forwardRef,
} from "react";

import { cn } from "@muatmuat/lib/utils";
// Assuming this utility exists
import { X } from "lucide-react";

import { type TranslationFunction, tMockFn } from "../../lib/mock-t";
import { IconComponent } from "../IconComponent";

// Assuming component exists

/**
 * Defines the structure for icons that can be placed inside the input.
 * The value can be a URL string or a React component.
 */
export type InputIcon = {
  left?: string | ReactNode;
  onClickLeft?: () => void;
  right?: string | ReactNode;
  onClickRight?: () => void;
};

/**
 * Defines the structure for static text that can be placed inside the input.
 */
export type InputText = {
  left?: string;
  right?: string;
};

/**
 * Defines class names for customizing the appearance of the input component's parts.
 */
export type InputAppearance = {
  containerClassName?: string;
  inputClassName?: string;
  errorMessageClassName?: string;
  supportiveTextClassName?: string;
  iconClassName?: string;
};

/**

 * A standard translation function signature.
 */

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  /**
   * The current value of the input. Required for the `withReset` feature to work correctly.
   */
  value?: string;
  /**
   * The name of the input element, submitted with the form data.
   */
  name?: string;
  /**
   * A translation function. If not provided, a mock function will be used.
   * @default tMockFn
   */
  t?: TranslationFunction;
  /**
   * An optional icon or custom React node to display on the left or right side.
   */
  icon?: InputIcon;
  /**
   * An optional static text to display on the left or right side.
   */
  text?: InputText;
  /**
   * Object to customize the class names of the component's parts.
   */
  appearance?: InputAppearance;
  /**
   * The error message to display below the input. The component will be styled with an error state if this is present.
   */
  errorMessage?: string;
  hideErrorMessage?: boolean;
  /**
   * Additional descriptive text displayed below the input. Can be shown alongside an error message.
   */
  supportiveText?: string;
  /**
   * If true, a reset button (X) will be shown when the input has a value, allowing the user to clear it.
   * @default false
   */
  withReset?: boolean;
  /**
   * The `onChange` handler. It receives the standard `ChangeEvent` or a synthetic event from the reset button.
   * The synthetic event is designed to be compatible with form libraries.
   */
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

/**
 * A versatile and customizable text input component.
 * It supports icons, text adornments, error states, and a built-in reset button.
 * Built with forwardRef to allow direct access to the underlying input element.
 */
const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const {
    t = tMockFn,
    name,
    type = "text",
    placeholder = "Placeholder",
    disabled = false,
    icon = {},
    text = {},
    className,
    maxLength,
    appearance = {},
    errorMessage,
    hideErrorMessage = false,
    supportiveText,
    onChange,
    withReset = false,
    value,
    ...restProps
  } = props;

  /**
   * Handles the click event for the reset button.
   * Creates a synthetic ChangeEvent to clear the input value,
   * ensuring compatibility with form libraries like Formik or React Hook Form.
   */
  const handleReset = () => {
    if (!onChange) return;

    // Create a synthetic event object that mimics a real ChangeEvent
    const syntheticEvent: ChangeEvent<HTMLInputElement> = {
      target: {
        ...props,
        value: "",
        name,
      },
      currentTarget: {
        ...props,
        value: "",
        name,
      },
      // Add other event properties as needed, though most handlers only need target.value
      bubbles: true,
      cancelable: false,
      defaultPrevented: false,
      eventPhase: 0,
      isTrusted: false,
      nativeEvent: new Event("input", { bubbles: true }),
      isDefaultPrevented: () => false,
      isPropagationStopped: () => false,
      persist: () => {},
      preventDefault: () => {},
      stopPropagation: () => {},
      timeStamp: Date.now(),
      type: "change",
    } as unknown as ChangeEvent<HTMLInputElement>; // Assert type for handler compatibility

    onChange(syntheticEvent);
  };

  const hasValue = !!value;
  const showReset = withReset && hasValue && !disabled;
  const showErrorState = !!errorMessage;

  return (
    <div className={cn("flex w-full flex-col gap-y-2", className)}>
      <div
        className={cn(
          "flex h-8 w-full items-center rounded-md border bg-neutral-50 px-3 transition-colors",
          // Default & Hover & Focus states
          "border-neutral-600 focus-within:border-primary-700 hover:border-primary-700",
          // Error state
          showErrorState && "border-error-400",
          // Disabled state
          disabled
            ? "cursor-not-allowed border-neutral-600 bg-neutral-200 hover:border-neutral-600"
            : "cursor-text",
          appearance.containerClassName
        )}
      >
        {/* Left Icon */}
        {icon.left && (
          <div className="mr-2 flex items-center">
            {typeof icon.left === "string" ? (
              <IconComponent
                src={icon.left}
                height={16}
                width={16}
                onClick={icon.onClickLeft}
                className={cn(
                  "text-neutral-700",
                  showErrorState && "text-error-400",
                  appearance.iconClassName
                )}
              />
            ) : (
              icon.left
            )}
          </div>
        )}
        {/* Left Text */}
        {text.left && (
          <span className="mr-3 whitespace-nowrap text-sm font-semibold text-neutral-900 md:text-xs md:font-medium">
            {text.left}
          </span>
        )}

        <input
          ref={ref}
          type={type}
          name={name}
          value={value}
          maxLength={maxLength}
          placeholder={placeholder}
          disabled={disabled}
          onChange={onChange}
          className={cn(
            "w-full min-w-0 border-none bg-transparent text-sm font-semibold text-neutral-900 outline-none placeholder:text-neutral-600 hover:cursor-pointer focus:ring-0 md:text-xs md:font-medium",
            disabled ? "cursor-not-allowed" : "cursor-text",
            appearance.inputClassName
          )}
          {...restProps}
        />

        {/* Right Adornment: Reset Button or Icon */}
        <div className="ml-2 flex items-center">
          {showReset ? (
            <X
              onClick={handleReset}
              className="size-4 cursor-pointer text-neutral-700 hover:text-neutral-900"
              aria-label="Clear input"
            />
          ) : icon.right ? (
            typeof icon.right === "string" ? (
              <IconComponent
                src={icon.right}
                height={16}
                width={16}
                onClick={icon.onClickRight}
                className={cn(
                  "text-neutral-700",
                  showErrorState && "text-error-400",
                  appearance.iconClassName
                )}
              />
            ) : (
              icon.right
            )
          ) : null}
        </div>

        {/* Right Text */}
        {text.right && (
          <span className="ml-3 whitespace-nowrap text-sm font-semibold text-neutral-900 md:text-xs md:font-medium">
            {text.right}
          </span>
        )}
      </div>

      {/* Supportive and Error Text Area */}
      {(errorMessage || supportiveText) && (
        <div className="flex w-full items-start justify-between">
          {errorMessage && !hideErrorMessage && (
            <span
              className={cn(
                "text-xs font-medium text-error-400",
                appearance.errorMessageClassName
              )}
            >
              {t(errorMessage)}
            </span>
          )}
          {supportiveText && (
            <span
              className={cn(
                "text-right text-xs font-medium text-neutral-900",
                // Push to the right if there is no error message
                !errorMessage && "ml-auto",
                appearance.supportiveTextClassName
              )}
            >
              {supportiveText}
            </span>
          )}
        </div>
      )}
    </div>
  );
});

Input.displayName = "Input";

export { Input };
