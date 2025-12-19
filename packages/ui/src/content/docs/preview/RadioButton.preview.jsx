"use client";

import { useState } from "react";

import { RadioButton } from "@muatmuat/ui/Radio";

export function RadioButtonPreview() {
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [shippingMethod, setShippingMethod] = useState("standard");

  return (
    <div className="space-y-6">
      <div>
        <label className="mb-3 block text-sm font-medium">Payment Method</label>
        <div className="space-y-3">
          <RadioButton
            name="payment"
            label="Credit Card"
            value="card"
            checked={paymentMethod === "card"}
            onChange={() => setPaymentMethod("card")}
          />

          <RadioButton
            name="payment"
            label="Bank Transfer"
            value="transfer"
            checked={paymentMethod === "transfer"}
            onChange={() => setPaymentMethod("transfer")}
          />

          <RadioButton
            name="payment"
            label="Digital Wallet"
            value="wallet"
            checked={paymentMethod === "wallet"}
            onChange={() => setPaymentMethod("wallet")}
          />
        </div>
        <p className="mt-2 text-xs text-neutral-500">
          Select your preferred payment method
        </p>
      </div>

      <div>
        <label className="mb-3 block text-sm font-medium">
          Shipping Method
        </label>
        <div className="space-y-3">
          <RadioButton
            name="shipping"
            label="Standard Shipping (5-7 days) - Free"
            value="standard"
            checked={shippingMethod === "standard"}
            onChange={() => setShippingMethod("standard")}
          />

          <RadioButton
            name="shipping"
            label="Express Shipping (2-3 days) - $15"
            value="express"
            checked={shippingMethod === "express"}
            onChange={() => setShippingMethod("express")}
          />

          <RadioButton
            name="shipping"
            label="Overnight Shipping - $35"
            value="overnight"
            checked={shippingMethod === "overnight"}
            onChange={() => setShippingMethod("overnight")}
          />
        </div>
        <p className="mt-2 text-xs text-neutral-500">
          Choose delivery speed and cost
        </p>
      </div>

      <div>
        <label className="mb-3 block text-sm font-medium">
          Disabled Examples
        </label>
        <div className="space-y-3">
          <RadioButton
            name="disabled-example"
            label="Disabled checked option"
            value="checked"
            checked={true}
            disabled={true}
          />

          <RadioButton
            name="disabled-example"
            label="Disabled unchecked option"
            value="unchecked"
            checked={false}
            disabled={true}
          />
        </div>
      </div>
    </div>
  );
}
