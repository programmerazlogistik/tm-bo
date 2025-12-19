"use client";

import { useState } from "react";

import { RatingInput } from "@muatmuat/ui/Form";

export function RatingInputPreview() {
  const [productRating, setProductRating] = useState(0);
  const [serviceRating, setServiceRating] = useState(4);
  const [deliveryRating, setDeliveryRating] = useState(5);

  return (
    <div className="space-y-6">
      <div>
        <label className="mb-3 block text-sm font-medium">
          Product Quality
        </label>
        <RatingInput
          value={productRating}
          onChange={setProductRating}
          withLabel={true}
        />
        <p className="mt-2 text-xs text-neutral-500">
          How would you rate the product quality?
        </p>
      </div>

      <div>
        <label className="mb-3 block text-sm font-medium">
          Service Quality
        </label>
        <RatingInput
          value={serviceRating}
          onChange={setServiceRating}
          withLabel={true}
        />
        <p className="mt-2 text-xs text-neutral-500">
          How would you rate our customer service?
        </p>
      </div>

      <div>
        <label className="mb-3 block text-sm font-medium">Delivery Speed</label>
        <RatingInput
          value={deliveryRating}
          onChange={setDeliveryRating}
          withLabel={true}
        />
        <p className="mt-2 text-xs text-neutral-500">
          How would you rate the delivery speed?
        </p>
      </div>

      <div>
        <label className="mb-3 block text-sm font-medium">
          Disabled Example
        </label>
        <RatingInput
          value={3}
          onChange={() => {}}
          disabled={true}
          withLabel={true}
        />
        <p className="mt-2 text-xs text-neutral-500">
          Rating saved and cannot be changed
        </p>
      </div>
    </div>
  );
}
