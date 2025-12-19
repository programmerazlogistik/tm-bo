"use client";

import { useState } from "react";

import { ButtonPlusMinus } from "@muatmuat/ui/Form";

export function ButtonPlusMinusPreview() {
  const [quantity, setQuantity] = useState(1);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);

  return (
    <div className="space-y-4">
      <div>
        <label className="mb-2 block text-sm font-medium">Quantity</label>
        <ButtonPlusMinus
          value={quantity}
          onChange={setQuantity}
          minValue={1}
          maxValue={10}
        />
        <p className="mt-1 text-xs text-neutral-500">
          Select item quantity (1-10)
        </p>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">Adults</label>
        <ButtonPlusMinus
          value={adults}
          onChange={setAdults}
          minValue={1}
          maxValue={8}
        />
        <p className="mt-1 text-xs text-neutral-500">
          Number of adult passengers
        </p>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">Children</label>
        <ButtonPlusMinus
          value={children}
          onChange={setChildren}
          minValue={0}
          maxValue={5}
        />
        <p className="mt-1 text-xs text-neutral-500">
          Number of child passengers (0-5)
        </p>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">
          Disabled Example
        </label>
        <ButtonPlusMinus value={3} onChange={() => {}} disabled={true} />
      </div>
    </div>
  );
}
