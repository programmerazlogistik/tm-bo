"use client";

import { CropperScreen } from "@muatmuat/ui/Cropper";

export function CropperScreenPreview() {
  return (
    <div className="p-6">
      <div className="rounded border border-yellow-400 bg-yellow-100 px-4 py-3 text-yellow-700">
        <p className="font-semibold">Component Requires Context</p>
        <p className="text-sm">CropperScreen requires:</p>
        <ul className="mt-2 list-inside list-disc text-sm">
          <li>useResponsiveNavigation hook</li>
          <li>useImageUploaderStore hook</li>
          <li>useImageUploaderActions hook</li>
        </ul>
        <p className="mt-2 text-sm">
          This component is designed for specific navigation flows and cannot be
          demoed in isolation.
        </p>
      </div>
    </div>
  );
}
