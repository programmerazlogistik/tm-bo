"use client";

import { useState } from "react";

import { DimensionInput } from "@muatmuat/ui/Form";

export function DimensionInputPreview() {
  const [dimensions, setDimensions] = useState({
    panjang: { value: 25, setValue: (val) => updateDimension("panjang", val) },
    lebar: { value: 15, setValue: (val) => updateDimension("lebar", val) },
    tinggi: { value: 10, setValue: (val) => updateDimension("tinggi", val) },
  });

  const [packageSize, setPackageSize] = useState({
    panjang: {
      value: 30,
      setValue: (val) => updatePackageSize("panjang", val),
    },
    lebar: { value: 20, setValue: (val) => updatePackageSize("lebar", val) },
    tinggi: { value: 15, setValue: (val) => updatePackageSize("tinggi", val) },
  });

  const updateDimension = (field, value) => {
    setDimensions((prev) => ({
      ...prev,
      [field]: { ...prev[field], value },
    }));
  };

  const updatePackageSize = (field, value) => {
    setPackageSize((prev) => ({
      ...prev,
      [field]: { ...prev[field], value },
    }));
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="mb-3 block text-sm font-medium">
          Product Dimensions (cm)
        </label>
        <DimensionInput manual={dimensions} disabled={false} />
        <p className="mt-2 text-xs text-neutral-500">
          Enter product dimensions in centimeters
        </p>
      </div>

      <div>
        <label className="mb-3 block text-sm font-medium">
          Package Size (cm)
        </label>
        <DimensionInput manual={packageSize} disabled={false} />
        <p className="mt-2 text-xs text-neutral-500">
          Enter package dimensions for shipping calculation
        </p>
      </div>

      <div>
        <label className="mb-3 block text-sm font-medium">
          Disabled Example
        </label>
        <DimensionInput
          manual={{
            panjang: { value: 50, setValue: () => {} },
            lebar: { value: 40, setValue: () => {} },
            tinggi: { value: 30, setValue: () => {} },
          }}
          disabled={true}
        />
        <p className="mt-2 text-xs text-neutral-500">
          Dimensions are locked and cannot be edited
        </p>
      </div>
    </div>
  );
}
