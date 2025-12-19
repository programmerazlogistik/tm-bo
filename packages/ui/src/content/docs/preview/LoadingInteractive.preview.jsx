"use client";

import { useState } from "react";

import { LoadingInteractive, useLoadingAction } from "@muatmuat/ui/Loading";

export function LoadingInteractivePreview() {
  const { setIsGlobalLoading } = useLoadingAction();
  const [isLoading, setIsLoading] = useState(true);

  const toggleLoading = () => {
    const newState = !isLoading;
    setIsLoading(newState);
    setIsGlobalLoading(newState);
  };

  return (
    <div className="relative">
      <LoadingInteractive />

      <div className="space-y-4 p-8">
        <h2 className="text-2xl font-bold">Page Content</h2>
        <p className="text-neutral-600">
          This content is behind the loading overlay when active.
        </p>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div key={item} className="rounded-lg border p-4">
              <h3 className="font-medium">Card {item}</h3>
              <p className="text-sm text-neutral-500">Sample content</p>
            </div>
          ))}
        </div>

        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 transform rounded-lg border bg-white p-4 shadow-lg">
          <p className="mb-2 text-sm text-neutral-600">Toggle loading state:</p>
          <button
            onClick={toggleLoading}
            className="rounded bg-primary-700 px-4 py-2 text-white transition-colors hover:bg-primary-800"
          >
            {isLoading ? "Stop Loading" : "Start Loading"}
          </button>
        </div>
      </div>
    </div>
  );
}
