"use client";

import React, {
  type ChangeEvent,
  type ComponentPropsWithoutRef,
  type FocusEvent,
  type KeyboardEvent,
  forwardRef,
  memo,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";

import { cn } from "@muatmuat/lib/utils";
import { Input } from "@muatmuat/ui/Form";
import { Popover, PopoverContent, PopoverTrigger } from "@muatmuat/ui/Popover";
import { ChevronDown } from "lucide-react";
import * as RPNInput from "react-phone-number-input";
import flags from "react-phone-number-input/flags";

/**
 * Enhanced TypeScript interfaces for better type safety
 */
export interface PhoneInputProps
  extends Omit<
    ComponentPropsWithoutRef<"input">,
    "onChange" | "value" | "children"
  > {
  /** Phone number value in E.164 format */
  value?: string;
  /** Callback when phone number changes */
  onChange?: (value: RPNInput.Value) => void;
  /** Default country code */
  defaultCountry?: RPNInput.Country;
  /** Callback when country changes */
  onCountryChange?: (country: RPNInput.Country | undefined) => void;
  /** Whether the input is disabled */
  disabled?: boolean;
  /** Whether the input is in error state */
  errorMessage?: string;
  /** Helper text to display */
  helperText?: string;
  /** Label for the input */
  label?: string;
  /** Placeholder text */
  placeholder?: string;
  /** Custom input component */
  inputComponent?: React.ComponentType<any>;
  /** Custom country select component */
  countrySelectComponent?: React.ComponentType<any>;
  /** Custom flag component */
  flagComponent?: React.ComponentType<any>;

  appearance?: {
    rootClassName?: string;
  };
}

export interface CountrySelectProps {
  /** Whether the select is disabled */
  disabled?: boolean;
  /** Currently selected country */
  value: RPNInput.Country;
  /** List of country options */
  options: CountryEntry[];
  /** Callback when country selection changes */
  onChange: (country: RPNInput.Country) => void;
  /** Additional CSS classes */
  className?: string;
  /** Custom option component */
  OptionComponent?: React.ComponentType<CountrySelectOptionProps>;
  /** Currently focused option for accessibility */
  focusedIndex?: number;
  /** Callback when focused option changes */
  setFocusedIndex?: (index: number) => void;
  /** Whether the input is in error state */
  hasError?: boolean;
}

export interface CountrySelectOptionProps {
  /** Country code */
  country: RPNInput.Country;
  /** Country display name */
  countryName: string;
  /** Currently selected country */
  selectedCountry: RPNInput.Country;
  /** Callback when this option is selected */
  onChange: (country: RPNInput.Country) => void;
  /** Callback after selection is complete */
  onSelectComplete: () => void;
  /** Whether this option is focused */
  isFocused?: boolean;
  /** Index of this option for accessibility */
  index?: number;
}

export interface CountryEntry {
  /** Country display name */
  label: string;
  /** Country code */
  value: RPNInput.Country | undefined;
}

export interface PhoneInputComponentProps {
  /** Phone number value */
  value?: RPNInput.Value;
  /** Callback when value changes */
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  /** Callback when input loses focus */
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
  /** Callback when input gains focus */
  onFocus?: (event: FocusEvent<HTMLInputElement>) => void;
  /** Additional CSS classes */
  className?: string;
  [key: string]: any;
}

/**
 * Custom hook for managing phone number formatting and validation
 */
const usePhoneNumberFormatting = () => {
  const getNationalNumber = useCallback(
    (phoneValue: RPNInput.Value): string => {
      if (!phoneValue) {
        return "";
      }

      // Convert to string, handling all possible value types
      const phoneStr = String(phoneValue);

      // If it's already a national number (no country code prefix), return as is
      if (!phoneStr.startsWith("+")) {
        return phoneStr;
      }

      // Check if this is just a country code (like "+62", "+1", "+44") with no national number
      const countryCodeOnlyMatch = phoneStr.match(/^\+\d+$/);
      if (countryCodeOnlyMatch) {
        return "";
      }

      // Extract national number from international format using a more robust regex
      const match = phoneStr.match(/^\+\d+[\s-]*(.+)$/);

      // If there's no match after the country code, it means it's just a country code (like "+62")
      // In that case, return empty string to hide the country code in the input field
      return match ? match[1] || "" : "";
    },
    []
  );

  return { getNationalNumber };
};

/**
 * Enhanced Input Component with better accessibility and error handling
 */
const InputField = memo(
  forwardRef<HTMLInputElement, PhoneInputComponentProps>(
    ({ className, value, onChange, onBlur, onFocus, ...props }, ref) => {
      const { getNationalNumber } = usePhoneNumberFormatting();
      const [focused, setFocused] = useState(false);

      const displayValue = useMemo(
        () => getNationalNumber(value || ""),
        [getNationalNumber, value]
      );

      const handleChange = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
          onChange?.(event);
        },
        [onChange]
      );

      const handleFocus = useCallback(
        (event: FocusEvent<HTMLInputElement>) => {
          setFocused(true);
          onFocus?.(event);
        },
        [onFocus]
      );

      const handleBlur = useCallback(
        (event: FocusEvent<HTMLInputElement>) => {
          setFocused(false);
          onBlur?.(event);
        },
        [onBlur]
      );

      return (
        <input
          ref={ref}
          type="tel"
          autoComplete="tel"
          className={cn(
            "h-8 w-full rounded-e-md rounded-s-none px-3 text-xs font-medium",
            "border-none outline-none focus:ring-0",
            "placeholder:text-neutral-400",
            "disabled:cursor-not-allowed disabled:opacity-50",
            focused && "bg-white",
            className
          )}
          value={displayValue}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          aria-label="Phone number"
          {...props}
        />
      );
    }
  )
);

InputField.displayName = "PhoneInputField";

/**
 * Enhanced Country Select Dropdown with improved accessibility and keyboard navigation
 */
const CountrySelect = memo<CountrySelectProps>(
  ({
    disabled,
    value: selectedCountry,
    options: countryList,
    onChange,
    className,
    OptionComponent = CountrySelectOption,
    focusedIndex = -1,
    setFocusedIndex,
    hasError = false,
  }) => {
    const scrollAreaRef = useRef<HTMLDivElement>(null);
    const searchInputRef = useRef<HTMLInputElement>(null);
    const [searchValue, setSearchValue] = useState("");
    const [isOpen, setIsOpen] = useState(false);

    // Reset search when dropdown opens
    useEffect(() => {
      if (isOpen && searchInputRef.current) {
        searchInputRef.current.focus();
        setSearchValue("");
        setFocusedIndex?.(-1);
      }
    }, [isOpen, setFocusedIndex]);

    // Filter countries based on search
    const filteredCountries = useMemo(() => {
      if (!searchValue || searchValue.trim() === "") return countryList;

      const trimmedSearch = searchValue.trim().toLowerCase();

      return countryList.filter(({ value, label }) => {
        if (!value) return false;
        const callingCode = RPNInput.getCountryCallingCode(value);
        return (
          label.toLowerCase().includes(trimmedSearch) ||
          callingCode.includes(searchValue.trim()) ||
          value.toLowerCase().includes(trimmedSearch)
        );
      });
    }, [searchValue, countryList]);

    // Handle search input changes
    const handleSearchChange = useCallback(
      (event: ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;
        setSearchValue(newValue);
        setFocusedIndex?.(-1);

        // Reset scroll position
        if (scrollAreaRef.current) {
          scrollAreaRef.current.scrollTop = 0;
        }
      },
      [setFocusedIndex]
    );

    // Handle keyboard navigation
    const handleKeyDown = useCallback(
      (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Escape") {
          setIsOpen(false);
          return;
        }

        if (event.key === "ArrowDown" || event.key === "ArrowUp") {
          event.preventDefault();
          const direction = event.key === "ArrowDown" ? 1 : -1;
          const newIndex = Math.max(
            0,
            Math.min(filteredCountries.length - 1, focusedIndex + direction)
          );
          setFocusedIndex?.(newIndex);

          // Scroll the focused option into view
          const optionElement = scrollAreaRef.current?.querySelector(
            `[data-option-index="${newIndex}"]`
          );
          optionElement?.scrollIntoView({ block: "nearest" });
        }

        if (
          event.key === "Enter" &&
          focusedIndex >= 0 &&
          filteredCountries[focusedIndex]
        ) {
          event.preventDefault();
          const selectedOption = filteredCountries[focusedIndex];
          if (selectedOption.value) {
            onChange(selectedOption.value);
            setIsOpen(false);
          }
        }
      },
      [focusedIndex, filteredCountries, onChange, setFocusedIndex]
    );

    // Handle country selection
    const handleCountryChange = useCallback(
      (country: RPNInput.Country) => {
        onChange(country);
        setIsOpen(false);
      },
      [onChange]
    );

    // Generate safe ID for accessibility
    const dropdownId = useId();

    return (
      <Popover
        open={isOpen}
        modal
        onOpenChange={(open) => {
          setIsOpen(open);
          if (open) {
            setSearchValue("");
          }
        }}
      >
        <PopoverTrigger asChild>
          <button
            type="button"
            className={cn(
              "flex h-8 items-center gap-1 border-r px-1",
              hasError ? "border-error-500" : "border-neutral-600",
              "hover:bg-neutral-50 focus:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-0",
              "disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-transparent",
              className
            )}
            disabled={disabled}
            aria-haspopup="listbox"
            aria-expanded={isOpen}
            aria-labelledby={dropdownId}
          >
            <Flag country={selectedCountry} countryName={selectedCountry} />
            <span className="text-xs font-medium text-neutral-600">
              {selectedCountry
                ? `+${RPNInput.getCountryCallingCode(selectedCountry)}`
                : "+"}
            </span>
            <ChevronDown
              className={cn(
                "size-4 opacity-50 transition-transform",
                isOpen && "rotate-180",
                disabled && "hidden"
              )}
              aria-hidden="true"
            />
          </button>
        </PopoverTrigger>

        <PopoverContent className="w-[300px] p-0" align="start" sideOffset={4}>
          <div className="border-b border-neutral-300 p-2">
            <Input
              ref={searchInputRef}
              value={searchValue}
              onChange={handleSearchChange}
              onKeyDown={handleKeyDown}
              placeholder="Search country..."
              className="h-8"
              icon={{ left: "/icons/search16.svg" }}
              aria-label="Search countries"
            />
          </div>

          <div
            ref={scrollAreaRef}
            className="max-h-64 overflow-y-auto"
            role="listbox"
            aria-label="Countries"
          >
            {filteredCountries.length === 0 ? (
              <div
                className="py-6 text-center text-sm text-neutral-500"
                role="status"
                aria-live="polite"
              >
                No country found.
              </div>
            ) : (
              <div className="p-1">
                {filteredCountries.map((country, index) =>
                  country.value ? (
                    <OptionComponent
                      key={country.value}
                      country={country.value}
                      countryName={country.label}
                      selectedCountry={selectedCountry}
                      onChange={handleCountryChange}
                      onSelectComplete={() => setIsOpen(false)}
                      isFocused={index === focusedIndex}
                      index={index}
                    />
                  ) : null
                )}
              </div>
            )}
          </div>
        </PopoverContent>
      </Popover>
    );
  }
);

CountrySelect.displayName = "CountrySelectDropdown";

/**
 * Enhanced Country Select Option with better accessibility
 */
const CountrySelectOption = memo<CountrySelectOptionProps>(
  ({
    country,
    countryName,
    selectedCountry,
    onChange,
    onSelectComplete,
    isFocused = false,
    index = 0,
  }) => {
    const handleSelect = useCallback(() => {
      onChange(country);
      onSelectComplete();
    }, [onChange, onSelectComplete, country]);

    const isSelected = country === selectedCountry;

    return (
      <button
        type="button"
        onClick={handleSelect}
        className={cn(
          "flex w-full cursor-pointer items-center gap-2 rounded-md p-2 text-left text-sm",
          "transition-colors duration-75",
          "hover:bg-neutral-100 focus:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500",
          isSelected && "bg-blue-50 hover:bg-blue-100",
          isFocused && "bg-neutral-100 ring-2 ring-inset ring-blue-500"
        )}
        role="option"
        aria-selected={isSelected}
        aria-label={`${countryName} (+${RPNInput.getCountryCallingCode(country)})`}
        data-option-index={index}
      >
        <Flag country={country} countryName={countryName} />
        <span className="flex-1 truncate font-medium">{countryName}</span>
        <span className="font-mono text-xs text-neutral-500">
          {`+${RPNInput.getCountryCallingCode(country)}`}
        </span>
        {isSelected && (
          <span className="text-blue-600" aria-hidden="true">
            ✓
          </span>
        )}
      </button>
    );
  }
);

CountrySelectOption.displayName = "CountrySelectOption";

/**
 * Flag Component with error handling
 */
const Flag = memo<{ country: RPNInput.Country; countryName?: string }>(
  ({ country, countryName }) => {
    const FlagComp = flags[country];

    return (
      <span
        className="inline-block h-4 w-6 overflow-hidden rounded-sm bg-neutral-200"
        role="img"
        aria-label={countryName || country}
      >
        {FlagComp ? (
          <FlagComp title={countryName || country} />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-xs text-neutral-400">
            🏳️
          </div>
        )}
      </span>
    );
  }
);

Flag.displayName = "Flag";

/**
 * Export individual components for customization
 */
export const PhoneInput = {
  Root: RPNInput.default,
  Flag,
  CountrySelect,
  CountrySelectOption,
  Input: InputField,
};

/**
 * Main Phone Input Component with enhanced features
 */
/**
 * Custom comparison function for PhoneInputBO memo
 * Only re-render if essential props actually change
 */
const arePhoneInputPropsEqual = (
  prevProps: PhoneInputProps,
  nextProps: PhoneInputProps
) => {
  const isEqual =
    prevProps.value === nextProps.value &&
    prevProps.errorMessage === nextProps.errorMessage &&
    prevProps.disabled === nextProps.disabled &&
    prevProps.defaultCountry === nextProps.defaultCountry &&
    prevProps.placeholder === nextProps.placeholder &&
    prevProps.className === nextProps.className &&
    prevProps.appearance?.rootClassName === nextProps.appearance?.rootClassName;

  return isEqual;
};

export const PhoneInputBO = memo(
  forwardRef<any, PhoneInputProps>(
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
        inputComponent,
        countrySelectComponent,
        flagComponent,
        onBlur,
        onFocus,
        appearance,
        ...props
      },
      ref
    ) => {
      const [focused, setFocused] = useState(false);

      // Use ref to stabilize onChange callback and prevent re-renders
      const onChangeRef = useRef(onChange);
      onChangeRef.current = onChange;

      // Handle value changes
      const handleChange = useCallback(
        (newValue: RPNInput.Value | undefined) => {
          onChangeRef.current?.(newValue as RPNInput.Value);
        },
        [] // No dependencies - uses ref instead
      );

      // Handle country changes
      const handleCountryChange = useCallback(
        (_country: RPNInput.Country | undefined) => {
          // Country change logic if needed
        },
        []
      );

      // Use refs to stabilize focus callbacks
      const onFocusRef = useRef(onFocus);
      const onBlurRef = useRef(onBlur);
      onFocusRef.current = onFocus;
      onBlurRef.current = onBlur;

      // Handle focus events
      const handleFocus = useCallback(
        (event: FocusEvent<HTMLInputElement>) => {
          setFocused(true);
          onFocusRef.current?.(event);
        },
        [] // No dependencies - uses ref instead
      );

      const handleBlur = useCallback(
        (event: FocusEvent<HTMLInputElement>) => {
          setFocused(false);
          onBlurRef.current?.(event);
        },
        [] // No dependencies - uses ref instead
      );

      // Generate unique IDs for accessibility
      const inputId = useId();
      const errorMessageId = useId();

      // Memoize rootClassName to prevent unnecessary re-renders
      const rootClassName = useMemo(
        () =>
          cn(
            "ring-none flex items-center overflow-hidden rounded-md border transition-colors duration-75",
            "border-neutral-600 bg-white",
            focused && "border-blue-500 ring-2 ring-blue-500 ring-offset-0",
            errorMessage && "border-red-500",
            disabled && "cursor-not-allowed bg-neutral-50 opacity-60",
            appearance?.rootClassName
          ),
        [focused, errorMessage, disabled, appearance?.rootClassName]
      );

      return (
        <div className={cn("w-full space-y-1", className)}>
          {label && (
            <label
              htmlFor={inputId}
              className="text-sm font-medium text-neutral-700"
            >
              {label}
            </label>
          )}

          <PhoneInput.Root
            ref={ref}
            className={rootClassName}
            flagComponent={(flagComponent || PhoneInput.Flag) as any}
            countrySelectComponent={
              countrySelectComponent || PhoneInput.CountrySelect
            }
            inputComponent={inputComponent || PhoneInput.Input}
            smartCaret={false}
            value={value || undefined}
            onChange={handleChange}
            onCountryChange={handleCountryChange}
            defaultCountry={defaultCountry}
            disabled={disabled}
            placeholder={placeholder}
            onFocus={handleFocus}
            onBlur={handleBlur}
            id={inputId}
            aria-invalid={Boolean(errorMessage)}
            numberInputProps={{
              "data-error": Boolean(errorMessage),
            }}
            {...props}
          />

          {errorMessage && (
            <span
              id={errorMessageId}
              className="text-xs font-medium text-error-500"
            >
              {errorMessage}
            </span>
          )}
        </div>
      );
    }
  ),
  arePhoneInputPropsEqual
);

PhoneInputBO.displayName = "PhoneInputBO";
