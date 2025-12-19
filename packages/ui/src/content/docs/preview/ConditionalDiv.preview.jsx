"use client";

import { useState } from "react";

import { ConditionalDiv } from "@muatmuat/ui/Card";

export function ConditionalDivPreview() {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [hasNotification, setHasNotification] = useState(true);

  return (
    <div className="space-y-4">
      {/* Always visible content */}
      <ConditionalDiv className="rounded-lg border bg-white p-4">
        <p className="font-medium">This content is always visible</p>
      </ConditionalDiv>

      {/* Conditional advanced options */}
      <ConditionalDiv className="rounded-lg bg-gray-50 p-4">
        {showAdvanced && (
          <div>
            <h3 className="mb-3 font-medium">Advanced Options</h3>
            <div className="space-y-2">
              <input
                placeholder="Advanced setting 1"
                className="block w-full rounded border p-2"
              />
              <input
                placeholder="Advanced setting 2"
                className="block w-full rounded border p-2"
              />
            </div>
          </div>
        )}
      </ConditionalDiv>

      {/* Conditional notification */}
      <ConditionalDiv className="rounded-lg border border-blue-200 bg-blue-50 p-3">
        {hasNotification && (
          <div className="flex items-start gap-2">
            <span className="text-blue-500">ℹ️</span>
            <div>
              <p className="font-medium text-blue-900">Information</p>
              <p className="text-sm text-blue-700">
                This is a conditional notification message
              </p>
            </div>
          </div>
        )}
      </ConditionalDiv>

      {/* Controls */}
      <div className="flex gap-3">
        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="rounded bg-primary-500 px-4 py-2 text-white hover:bg-primary-600"
        >
          {showAdvanced ? "Hide" : "Show"} Advanced Options
        </button>
        <button
          onClick={() => setHasNotification(!hasNotification)}
          className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          {hasNotification ? "Hide" : "Show"} Notification
        </button>
      </div>
    </div>
  );
}
