"use client";

import { type TextareaHTMLAttributes, forwardRef, memo } from "react";

import { cn } from "@muatmuat/lib/utils";

import { type TranslationFunction, tMockFn } from "../../lib/mock-t";

/**
 * Defines class names for customizing the appearance of the TextArea component.
 */
export interface TextAreaAppearance {
  inputClassName?: string;
}

export interface TextAreaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  /**
   * The current value of the textarea.
   */
  value?: string;
  /**
   * An error message to display below the textarea. This will override the supportive text.
   */
  errorMessage?: string;
  hideErrorMessage?: boolean;
  /**
   * Optional class name for the root container element.
   */
  className?: string;
  /**
   * Object to customize the class names of the component's parts.
   */
  appearance?: TextAreaAppearance;
  /**
   * If `true`, a character count will be displayed. `maxLength` must also be provided.
   * @default false
   */
  withCharCount?: boolean;
  /**
   * Supportive or descriptive text to display below the textarea.
   */
  supportiveText?: string;
  /**
   * An optional translation function.
   */
  t?: TranslationFunction;
}

/**
 * A multi-line text input component with error handling and an optional character counter.
 * It is memoized and supports ref forwarding to the underlying textarea element.
 */
export const TextArea = memo(
  forwardRef<HTMLTextAreaElement, TextAreaProps>(
    (
      {
        value,
        errorMessage,
        hideErrorMessage,
        className,
        appearance = {},
        maxLength,
        withCharCount = false,
        supportiveText,
        placeholder = "Placeholder...",
        disabled = false,
        t = tMockFn,
        ...inputProps
      },
      ref
    ) => {
      const displayMessage =
        errorMessage && !hideErrorMessage ? t(errorMessage) : supportiveText;

      return (
        <div className={cn("flex w-full flex-col gap-2", className)}>
          <textarea
            {...inputProps}
            ref={ref}
            value={value}
            maxLength={maxLength}
            placeholder={placeholder}
            disabled={disabled}
            className={cn(
              "w-full flex-shrink-0 rounded-[6px] border border-neutral-600 p-3 text-xs font-medium leading-[1.2] text-neutral-900 outline-none transition-colors placeholder:text-neutral-600 focus-within:border-primary-700 hover:cursor-pointer hover:border-primary-700 disabled:cursor-not-allowed disabled:bg-neutral-200",
              errorMessage && "border-error-400",
              appearance.inputClassName
            )}
          />
          {(displayMessage || withCharCount) && (
            <div className="flex min-h-[1.2em] items-center justify-between">
              {displayMessage && (
                <span
                  className={cn(
                    "flex-1 text-xs font-medium text-neutral-600",
                    errorMessage && "text-error-400"
                  )}
                >
                  {displayMessage}
                </span>
              )}
              {withCharCount && maxLength && (
                <span className="ml-auto pl-2 text-xs font-medium text-neutral-600">
                  {value?.length ?? 0}/{maxLength}
                </span>
              )}
            </div>
          )}
        </div>
      );
    }
  )
);

TextArea.displayName = "TextArea";
