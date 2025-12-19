import React, { forwardRef, memo, useRef } from "react";

import { cn } from "@muatmuat/lib/utils";

import style from "./RadioButton.module.scss";

export interface RadioButtonProps {
  onClick?: (data: { checked: boolean; value: string }) => void;
  name?: string;
  label?: string;
  checked?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  disabled?: boolean;
  children?: React.ReactNode;
  className?: string;
  classNameRound?: string;
  classNameLabel?: string;
}

/**
 * RadioButton component with enhanced styling and accessibility.
 *
 * A customizable radio button that supports both label text and custom children content
 * with proper keyboard navigation, screen reader support, and visual feedback.
 */
const RadioButtonImplementation = (
  props: RadioButtonProps,
  ref: React.ForwardedRef<HTMLInputElement>
) => {
  const {
    onClick = () => {},
    name,
    label,
    checked,
    onChange,
    value,
    disabled,
    children,
    className,
    classNameRound,
    classNameLabel,
    ...restProps
  } = props;

  const radioRef = useRef<HTMLInputElement>(null);
  const isLabelMissing = !label && !children;

  const handleClick = () => {
    if (disabled) {
      return;
    }
    onClick({
      checked: !checked,
      value: value || "",
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e);
    }
    handleClick();
  };

  return (
    <div
      className={cn(
        style.container_radio,
        "flex items-center gap-[8px]",
        disabled ? "cursor-not-allowed" : "cursor-pointer",
        className
      )}
      onClick={disabled ? undefined : handleClick}
    >
      <input
        type="radio"
        ref={ref || radioRef}
        checked={checked}
        name={name}
        onChange={handleChange}
        value={value}
        disabled={disabled}
        {...restProps}
      />
      {/* Radio button visual element */}
      <span
        className={cn(
          style.radio_primary,
          classNameRound,
          "select-none bg-neutral-50",
          {
            "after:top-[4px]": isLabelMissing,
            "after:top-[5px]": !isLabelMissing,
            "cursor-not-allowed bg-neutral-200": disabled,
          }
        )}
      />
      {children ? (
        <span className={cn(disabled && "text-neutral-500")}>{children}</span>
      ) : (
        <span
          className={cn(
            "capsize select-none text-sm font-semibold leading-[15.4px] text-neutral-900 md:text-xs md:font-medium md:leading-[14.4px]",
            classNameLabel,
            disabled && "text-neutral-500"
          )}
        >
          {label}
        </span>
      )}
    </div>
  );
};

const RadioButton = memo(forwardRef(RadioButtonImplementation));
RadioButton.displayName = "RadioButton";
export { RadioButton };
