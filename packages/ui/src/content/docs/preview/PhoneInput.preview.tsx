"use client";

import { useState } from "react";
import { forwardRef, useCallback, useId } from "react";

import { cn } from "@muatmuat/lib/utils";
import { PhoneInputBO } from "@muatmuat/ui/Form";
import { PhoneInput } from "@muatmuat/ui/Form";
import * as RPNInput from "react-phone-number-input";

export function PhoneInputPreview() {
  const [phone, setPhone] = useState<string>("");
  const [mobile, setMobile] = useState<string>("+62812345678");

  return (
    <div className="space-y-4">
      <div>
        <label className="mb-2 block text-sm font-medium">Primary Phone</label>
        <PhoneInputBO
          placeholder="Enter phone number"
          value={phone}
          onChange={setPhone}
          defaultCountry="ID"
        />
        <p className="mt-1 text-xs text-neutral-500">
          Include country code for international numbers
        </p>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">Mobile Phone</label>
        <PhoneInputBO
          placeholder="Mobile number"
          value={mobile}
          onChange={setMobile}
          defaultCountry="ID"
        />
        <p className="mt-1 text-xs text-neutral-500">
          Used for account verification and notifications
        </p>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">
          Disabled Example
        </label>
        <PhoneInputBO
          placeholder="Phone number"
          value="+12025551234"
          onChange={() => {}}
          disabled
        />
      </div>
    </div>
  );
}

export const CustomPhoneInputPreview = forwardRef<any, any>(
  (
    {
      className,
      onChange,
      value,
      defaultCountry = "US",
      disabled = false,
      errorMessage,
      label,
      placeholder = "Enter phone number",
      onBlur,
      onFocus,
      appearance,
    },
    ref
  ) => {
    // Handle value changes
    const handleChange = useCallback(
      (newValue: RPNInput.Value | undefined) => {
        onChange?.(newValue as RPNInput.Value);
      },
      [onChange]
    );

    // Custom country select component
    const CustomCountrySelect = useCallback(
      (props: any) => (
        <PhoneInput.CountrySelect
          {...props}
          // Style: Thick black border separator, more padding
          className="border-r-2 border-black bg-white px-3"
          hasError={Boolean(errorMessage)}
        />
      ),
      [errorMessage]
    );

    // Custom input component
    const CustomInput = useCallback(
      (props: any) => (
        <PhoneInput.Input
          {...props}
          placeholder="Custom phone input"
          // Style: Transparent BG (inherits root), dark placeholder
          className="flex-1 bg-transparent px-3 py-2 text-black outline-none placeholder:text-neutral-500"
        />
      ),
      []
    );

    // Generate unique IDs for accessibility
    const inputId = useId();
    const errorMessageId = useId();

    // Root container styles (Neubrutalist)
    const rootClassName = cn(
      "flex items-center border-2 border-black bg-white transition-all duration-100", // Base: white BG, thick black border
      "rounded-none", // Sharp corners
      "shadow-[4px_4px_0px_#000]", // Hard black shadow
      "focus-within:border-lime-500 focus-within:shadow-[4px_4px_0px_#A3E635]", // Bright lime focus
      errorMessage && "border-red-600 shadow-[4px_4px_0px_#DC2626]", // Red error state
      disabled &&
        "cursor-not-allowed bg-neutral-200 text-neutral-500 shadow-none", // Disabled state
      appearance?.rootClassName
    );

    return (
      <div className={cn("w-full space-y-2", className)}>
        {label && (
          <label
            htmlFor={inputId}
            // Style: Bolder font, black text
            className="text-sm font-semibold text-black"
          >
            {label}
          </label>
        )}

        <PhoneInput.Root
          ref={ref}
          className={rootClassName}
          flagComponent={PhoneInput.Flag}
          countrySelectComponent={CustomCountrySelect}
          inputComponent={CustomInput}
          smartCaret={false}
          value={value || undefined}
          onChange={handleChange}
          defaultCountry={defaultCountry}
          disabled={disabled}
          placeholder={placeholder}
          onFocus={onFocus}
          onBlur={onBlur}
          id={inputId}
          aria-invalid={Boolean(errorMessage)}
        />

        {errorMessage && (
          <span
            id={errorMessageId}
            // Style: Bolder, stronger red
            className="text-xs font-bold text-red-600"
          >
            {errorMessage}
          </span>
        )}
      </div>
    );
  }
);

CustomPhoneInputPreview.displayName = "CustomPhoneInputPreview";
