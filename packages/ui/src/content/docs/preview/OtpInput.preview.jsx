"use client";

import { useState } from "react";

import { InputOTPGroup, InputOTPSlot, OtpInput } from "@muatmuat/ui/Form";

export function OtpInputPreview() {
  const [otp, setOtp] = useState("");
  const [pin, setPin] = useState("");

  return (
    <div className="space-y-6">
      <div>
        <label className="mb-3 block text-sm font-medium">
          Verification Code
        </label>
        <OtpInput
          value={otp}
          onChange={setOtp}
          maxLength={6}
          className="justify-center"
        >
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </OtpInput>
        <p className="mt-2 text-xs text-neutral-500">
          Enter the 6-digit code sent to your email
        </p>
      </div>

      <div>
        <label className="mb-3 block text-sm font-medium">PIN Code</label>
        <OtpInput
          value={pin}
          onChange={setPin}
          maxLength={4}
          className="justify-center"
        >
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
          </InputOTPGroup>
        </OtpInput>
        <p className="mt-2 text-xs text-neutral-500">
          Enter your 4-digit PIN code
        </p>
      </div>

      <div className="flex items-center justify-center gap-4 text-xs">
        <button
          onClick={() => setOtp("")}
          className="text-primary-700 hover:underline"
        >
          Resend Code
        </button>
        <span>•</span>
        <button
          onClick={() => setOtp("123456")}
          className="text-primary-700 hover:underline"
        >
          Auto-fill Demo
        </button>
      </div>
    </div>
  );
}
