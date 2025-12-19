"use client";

import * as React from "react";
import { HTMLAttributes } from "react";

import { cn } from "@muatmuat/lib/utils";
import { OTPInput, OTPInputContext } from "input-otp";
import { MinusIcon } from "lucide-react";

// Extend the existing OTPInputProps with additional properties
export interface InputOTPProps {
  className?: string;
  containerClassName?: string;
  children?: React.ReactNode;
  value?: string;
  onChange?: (newValue: string) => void;
  maxLength?: number;
}

export interface InputOTPGroupProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export interface InputOTPSlotProps extends HTMLAttributes<HTMLDivElement> {
  index: number;
  className?: string;
}

export interface InputOTPSeparatorProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

/**
 * InputOTP component implementation for one-time password entry
 */
const InputOTPImplementation = (
  {
    className,
    containerClassName,
    children,
    value,
    onChange,
    maxLength = 6,
    ...props
  }: InputOTPProps,
  ref: React.ForwardedRef<HTMLInputElement>
) => {
  return (
    <OTPInput
      ref={ref}
      value={value}
      onChange={onChange}
      maxLength={maxLength}
      data-slot="input-otp"
      containerClassName={cn(
        "has-disabled:opacity-50 flex items-center gap-3 hover:cursor-pointer", // Increased gap from gap-2 to gap-3
        containerClassName
      )}
      className={cn("disabled:cursor-not-allowed", className)}
      {...props}
    >
      {children}
    </OTPInput>
  );
};

// Wrap with forwardRef for ref forwarding
const OtpInput = React.forwardRef(InputOTPImplementation);
OtpInput.displayName = "OtpInput";

/**
 * InputOTPGroup component for grouping OTP slots
 */
function InputOTPGroup({
  className,
  ...props
}: InputOTPGroupProps): React.ReactElement {
  return (
    <div
      data-slot="input-otp-group"
      className={cn("flex items-center gap-2", className)} // Added gap-3 for consistent spacing
      {...props}
    />
  );
}

/**
 * InputOTPSlot component for individual OTP character input
 */
function InputOTPSlot({
  index,
  className,
  ...props
}: InputOTPSlotProps): React.ReactElement {
  const inputOTPContext = React.useContext(OTPInputContext);
  const { char, hasFakeCaret, isActive } = inputOTPContext?.slots[index] ?? {};

  return (
    <div
      data-slot="input-otp-slot"
      data-active={isActive}
      className={cn(
        // Base styling - larger size and rounded corners
        "relative flex size-[30px] items-center justify-center p-0 text-center text-sm font-bold leading-[16.8px]",
        // Border and background
        "rounded-lg border border-[#868686] bg-white outline-none",
        // Active state
        "data-[active=true]:border-blue-500 data-[active=true]:ring-2 data-[active=true]:ring-blue-500/20",
        // Focus and hover states
        "transition-all duration-200 ease-in-out",
        "hover:border-gray-400",
        // Error states
        "aria-invalid:border-red-500 data-[active=true]:aria-invalid:border-red-500 data-[active=true]:aria-invalid:ring-red-500/20",
        // Remove default shadcn styling
        "shadow-sm",
        className
      )}
      {...props}
    >
      {char}
      {hasFakeCaret && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-4 w-px animate-caret-blink bg-foreground duration-1000" />
        </div>
      )}
    </div>
  );
}

/**
 * InputOTPSeparator component for visual separation between OTP groups
 */
function InputOTPSeparator({
  ...props
}: InputOTPSeparatorProps): React.ReactElement {
  return (
    <div
      data-slot="input-otp-separator"
      role="separator"
      className="mx-2"
      {...props}
    >
      <MinusIcon className="h-4 w-4 text-gray-400" />
    </div>
  );
}

export { InputOTPGroup, InputOTPSeparator, InputOTPSlot, OtpInput };
