"use client";

import { useState } from "react";

import { NumberInput } from "@muatmuat/ui/Form";

export function NumberInputPreview() {
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(50000);
  const [weight, setWeight] = useState(2.5);

  return (
    <div className="space-y-4">
      <div>
        <label className="mb-2 block text-sm font-medium">Quantity</label>
        <NumberInput
          placeholder="0"
          value={quantity}
          onValueChange={setQuantity}
          min={1}
          max={10}
          stepper={1}
          supportiveText="Maximum 10 items per order"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">Price (IDR)</label>
        <NumberInput
          placeholder="0"
          value={price}
          onValueChange={setPrice}
          min={1000}
          max={10000000}
          text={{ left: "Rp", right: ",00" }}
          thousandSeparator="."
          decimalScale={0}
          stepper={1000}
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">Weight (kg)</label>
        <NumberInput
          placeholder="0.0"
          value={weight}
          onValueChange={setWeight}
          min={0.1}
          max={50}
          text={{ right: " kg" }}
          decimalScale={1}
          stepper={0.5}
          thousandSeparator=""
          decimalSeparator=","
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">Discount (%)</label>
        <NumberInput
          placeholder="0"
          defaultValue={0}
          min={0}
          max={100}
          text={{ right: "%" }}
          stepper={5}
          supportiveText="Enter discount percentage"
        />
      </div>
    </div>
  );
}
