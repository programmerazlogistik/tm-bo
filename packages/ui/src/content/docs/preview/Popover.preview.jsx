"use client";

import { useState } from "react";

import {
  Popover,
  PopoverArrow,
  PopoverContent,
  PopoverTrigger,
} from "@muatmuat/ui/Popover";

export function PopoverPreview() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="space-y-4">
      <div className="flex justify-center">
        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger asChild>
            <button className="rounded bg-primary-500 px-4 py-2 text-white transition-colors hover:bg-primary-600">
              Click to Open Popover
            </button>
          </PopoverTrigger>

          <PopoverContent side="top" align="center" sideOffset={8}>
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-900">Popover Title</h3>
              <p className="text-sm text-gray-600">
                This is a popover component with rich content. You can add any
                React components inside, including forms, buttons, and other
                interactive elements.
              </p>
              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => setIsOpen(false)}
                  className="rounded bg-blue-500 px-3 py-1 text-sm text-white transition-colors hover:bg-blue-600"
                >
                  Confirm
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="rounded border border-gray-300 px-3 py-1 text-sm transition-colors hover:bg-gray-50"
                >
                  Cancel
                </button>
              </div>
            </div>
            <PopoverArrow />
          </PopoverContent>
        </Popover>
      </div>

      <p className="text-center text-sm text-gray-600">
        Click the button to open the popover. Click outside or press Escape to
        close.
      </p>
    </div>
  );
}
