import React, { useCallback, useEffect, useRef } from "react";

import { cn } from "@muatmuat/lib/utils";

import { useLocationFieldStateMachineContext } from "../LocationFieldProvider";
import type { LocationSuggestion } from "../types";

export interface LocationFieldInputProps {
  value?: string;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  disabled?: boolean;
  placeholder?: string;
  error?: string;
  className?: string;
  // Optional external state management (for independent instances like modals)
  externalDropdownOpen?: boolean;
  onDropdownOpenChange?: (open: boolean) => void;
  externalSearchQuery?: string;
  onSearchQueryChange?: (query: string) => void;
  externalSearchResults?: LocationSuggestion[];
  externalIsSearching?: boolean;
  onLocationSelect?: (location: LocationSuggestion) => void;
  // Optional coordinate registration config
  config?: {
    latitude: any; // React Hook Form register function for latitude
    longitude: any; // React Hook Form register function for longitude
  };
}

const LocationFieldInput: React.FC<LocationFieldInputProps> = ({
  value,
  onChange,
  onBlur,
  disabled = false,
  placeholder = "Masukkan Lokasi",
  error,
  className = "",
  externalDropdownOpen,
  onDropdownOpenChange,
  externalSearchQuery,
  onSearchQueryChange,
  externalSearchResults,
  externalIsSearching,
  onLocationSelect,
  config,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const stateMachine = useLocationFieldStateMachineContext();

  // Determine if using external state or context state
  const isUsingExternalState =
    externalDropdownOpen !== undefined && onDropdownOpenChange !== undefined;

  // Memoize conditional setters to prevent useCallback dependencies changing on every render
  const searchQuery = React.useMemo(
    () =>
      isUsingExternalState
        ? (externalSearchQuery ?? "")
        : stateMachine.searchQuery,
    [isUsingExternalState, externalSearchQuery, stateMachine.searchQuery]
  );

  const setSearchQuery = React.useMemo(
    () =>
      isUsingExternalState
        ? (onSearchQueryChange ?? (() => {}))
        : stateMachine.setSearchQuery,
    [isUsingExternalState, onSearchQueryChange, stateMachine.setSearchQuery]
  );

  const searchResults = React.useMemo(
    () =>
      isUsingExternalState
        ? (externalSearchResults ?? [])
        : stateMachine.searchResults,
    [isUsingExternalState, externalSearchResults, stateMachine.searchResults]
  );

  const isSearching = React.useMemo(
    () =>
      isUsingExternalState
        ? (externalIsSearching ?? false)
        : stateMachine.isSearching,
    [isUsingExternalState, externalIsSearching, stateMachine.isSearching]
  );

  const isDropdownOpen = React.useMemo(
    () =>
      isUsingExternalState ? externalDropdownOpen : stateMachine.isDropdownOpen,
    [isUsingExternalState, externalDropdownOpen, stateMachine.isDropdownOpen]
  );

  // Sync local searchQuery with value prop when it changes externally
  // This ensures that when RHF updates the value (e.g. after selection), the input reflects it
  // Sync local searchQuery with value prop when it changes externally
  // This ensures that when RHF updates the value (e.g. after selection), the input reflects it
  useEffect(() => {
    if (value && value !== searchQuery) {
      console.warn(
        `[SYNC_DEBUG_V2] Input sync triggered. Value: "${value}", SearchQuery: "${searchQuery}"`
      );
      setSearchQuery(value);
    }
  }, [value, searchQuery, setSearchQuery]);

  const setIsDropdownOpen = React.useMemo(() => {
    if (isUsingExternalState) {
      return onDropdownOpenChange;
    }
    // Use the dedicated dropdown state control
    return stateMachine.setIsDropdownOpen;
  }, [isUsingExternalState, onDropdownOpenChange, stateMachine]);

  // Use external handler if provided, otherwise default to context handler
  const handleSelectLocation =
    onLocationSelect || stateMachine.handleSelectLocation;
  const handleGetCurrentLocation = stateMachine.handleGetCurrentLocation;

  // Handle clicks outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Don't close if clicking on the input field or dropdown
      const isClickOnInput = inputRef.current?.contains(event.target as Node);
      const isClickOnDropdown = dropdownRef.current?.contains(
        event.target as Node
      );
      const isClickOnContainer = containerRef.current?.contains(
        event.target as Node
      );

      if (!isClickOnContainer && !isClickOnInput && !isClickOnDropdown) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("click", handleClickOutside);
      return () => {
        document.removeEventListener("click", handleClickOutside);
      };
    }
  }, [isDropdownOpen, setIsDropdownOpen]);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setSearchQuery(newValue);
      onChange?.(newValue);

      // Keep dropdown open when typing (focus should already handle this)
      if (!isDropdownOpen) {
        setIsDropdownOpen(true);
      }
    },
    [setSearchQuery, onChange, setIsDropdownOpen, isDropdownOpen]
  );

  const handleReset = useCallback(() => {
    // Clear search query and close dropdown
    setSearchQuery("");
    setIsDropdownOpen(false);

    // Clear form field - check if onChange expects string or event
    if (onChange) {
      // For external state (modal), onChange expects string
      if (isUsingExternalState) {
        (onChange as any)("");
      } else {
        // For form field, onChange expects ChangeEvent
        const syntheticEvent = {
          target: { value: "" },
          currentTarget: { value: "" },
        } as React.ChangeEvent<HTMLInputElement>;
        (onChange as any)(syntheticEvent);
      }
    }
  }, [setSearchQuery, setIsDropdownOpen, onChange, isUsingExternalState]);

  const handleInputFocus = useCallback(() => {
    setIsDropdownOpen(true);
  }, [setIsDropdownOpen]);

  const handleInputClick = useCallback(() => {
    // Ensure dropdown opens when clicked, even if already focused
    if (!isDropdownOpen) {
      setIsDropdownOpen(true);
    }
  }, [isDropdownOpen, setIsDropdownOpen]);

  const handleInputBlur = useCallback(() => {
    // Close dropdown on blur - onMouseDown preventDefault on items prevents this from firing when clicking items
    setIsDropdownOpen(false);
    // Call the original onBlur if provided
    onBlur?.();
  }, [setIsDropdownOpen, onBlur]);

  // Prevent blur from firing when clicking dropdown items
  const handleDropdownMouseDown = useCallback((event: React.MouseEvent) => {
    event.preventDefault();
  }, []);

  const handleCurrentLocationClick = useCallback(() => {
    handleGetCurrentLocation();
    setIsDropdownOpen(false);
  }, [handleGetCurrentLocation, setIsDropdownOpen]);

  const handleStreetSelect = useCallback(
    (street: LocationSuggestion) => {
      handleSelectLocation(street);
      setIsDropdownOpen(false);
    },
    [handleSelectLocation, setIsDropdownOpen]
  );

  const showErrorState = !!error;
  const currentValue = React.useMemo(
    () => (value !== undefined ? value : searchQuery),
    [value, searchQuery]
  );

  return (
    <div ref={containerRef} className={cn("w-full", className)}>
      {/* Hidden coordinate inputs for form registration */}
      {config && (
        <>
          <input type="hidden" name="latitude" {...(config.latitude || {})} />
          <input type="hidden" name="longitude" {...(config.longitude || {})} />
        </>
      )}

      <div className="relative flex w-full flex-col gap-y-2">
        <div
          className={cn(
            "relative flex h-8 w-full items-center rounded-md border bg-neutral-50 px-3 transition-colors",
            "border-neutral-600 focus-within:border-primary-700 hover:border-primary-700",
            showErrorState && "border-error-400",
            disabled
              ? "cursor-not-allowed border-neutral-600 bg-neutral-200 hover:border-neutral-600"
              : "cursor-text"
          )}
        >
          <input
            ref={inputRef}
            type="text"
            value={currentValue}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            onClick={handleInputClick}
            onBlur={handleInputBlur}
            placeholder={placeholder}
            disabled={disabled}
            className={cn(
              "w-full min-w-0 border-none bg-transparent text-sm font-semibold text-neutral-900 outline-none placeholder:text-neutral-600 focus:ring-0 md:text-xs md:font-medium",
              disabled ? "cursor-not-allowed" : "cursor-text"
            )}
          />

          {/* Reset Button */}
          {currentValue && !disabled && (
            <button
              type="button"
              onClick={handleReset}
              className="ml-2 flex-shrink-0 text-neutral-600 hover:text-neutral-900"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
        </div>

        {isDropdownOpen && (
          <div
            ref={dropdownRef}
            onMouseDown={handleDropdownMouseDown}
            className="absolute left-0 right-0 top-full z-50 mt-1 flex flex-col gap-3 rounded-md border border-primary-700 bg-white py-3 shadow-lg"
          >
            {/* Search Results */}
            {searchResults && searchResults.length > 0 && (
              <div className="flex flex-col gap-3">
                <div className="px-5 text-[10px] font-medium leading-3 text-neutral-600">
                  Saran Jalan
                </div>
                <div className="flex flex-col gap-2">
                  {searchResults.slice(0, 5).map((street) => (
                    <button
                      key={street.id}
                      type="button"
                      className="flex items-center gap-2.5 px-5 text-left hover:opacity-80"
                      onClick={() => handleStreetSelect(street)}
                    >
                      <svg
                        className="h-5 w-5 flex-shrink-0 text-neutral-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                      </svg>
                      <span className="text-[10px] font-medium leading-3 text-neutral-900">
                        {street.title}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Loading State */}
            {isSearching && currentValue && (
              <div className="px-5 text-[10px] font-medium leading-3 text-neutral-600">
                Memuat saran jalan...
              </div>
            )}

            {/* Info Box */}
            <div className="mx-5 rounded-[3px] border border-primary-700 bg-white px-3 py-2">
              <div className="flex items-center gap-2">
                <svg
                  className="h-4 w-4 flex-shrink-0 text-primary-700"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="text-[10px] font-semibold leading-3 text-primary-700">
                  Masukkan lokasi terdekat dengan Anda
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {error && (
        <span className="text-xs font-medium text-error-400">{error}</span>
      )}
    </div>
  );
};

export default LocationFieldInput;
