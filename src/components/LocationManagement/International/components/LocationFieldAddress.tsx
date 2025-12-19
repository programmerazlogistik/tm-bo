import React from "react";

import { cn } from "@muatmuat/lib/utils";

export interface LocationFieldAddressProps {
  value?: string;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  disabled?: boolean;
  placeholder?: string;
  error?: string;
  maxLength?: number;
  className?: string;
  rows?: number;
}

const LocationFieldAddress: React.FC<LocationFieldAddressProps> = ({
  value = "",
  onChange,
  onBlur,
  disabled = false,
  placeholder = "Masukkan detail alamat lengkap",
  error,
  maxLength = 500,
  className = "",
  rows = 3,
}) => {
  const showErrorState = !!error;
  const currentLength = value?.length || 0;
  const showCounter = maxLength && maxLength > 0;

  return (
    <div className={cn("flex w-full flex-col gap-y-2", className)}>
      <div
        className={cn(
          "flex w-full flex-col rounded-md border bg-neutral-50 p-3 transition-colors",
          "border-neutral-600 focus-within:border-primary-700 hover:border-primary-700",
          showErrorState && "border-error-400",
          disabled &&
            "cursor-not-allowed border-neutral-600 bg-neutral-200 hover:border-neutral-600"
        )}
      >
        <textarea
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          onBlur={onBlur}
          disabled={disabled}
          placeholder={placeholder}
          maxLength={maxLength}
          rows={rows}
          className={cn(
            "w-full resize-none border-none bg-transparent text-sm font-medium text-neutral-900 outline-none placeholder:text-neutral-600 focus:ring-0 md:text-xs",
            disabled && "cursor-not-allowed"
          )}
        />
        {showCounter && (
          <div className="mt-2 text-right text-[10px] text-neutral-600">
            {currentLength}/{maxLength}
          </div>
        )}
      </div>

      {error && (
        <span className="text-xs font-medium text-error-400">{error}</span>
      )}
    </div>
  );
};

export default LocationFieldAddress;
