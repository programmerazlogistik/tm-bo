"use client";

import { useState } from "react";

import { Toaster, toast } from "@muatmuat/ui/Toaster";

export function ToasterPreview() {
  const [message, setMessage] = useState("Sample notification message");
  const [duration, setDuration] = useState(6000);
  const [position, setPosition] = useState("bottom");

  const handleSuccess = () => {
    toast.success(message, { duration, position });
  };

  const handleError = () => {
    toast.error(message, { duration, position });
  };

  const handleInfo = () => {
    toast.info(message, { duration, position });
  };

  const handleRapidFire = () => {
    toast.success("First toast");
    setTimeout(() => toast.error("Second toast"), 500);
    setTimeout(() => toast.info("Third toast"), 1000);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Message:
          </label>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="Enter notification message"
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Duration (ms):
            </label>
            <select
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value={2000}>2000 (2 seconds)</option>
              <option value={4000}>4000 (4 seconds)</option>
              <option value={6000}>6000 (6 seconds - default)</option>
              <option value={8000}>8000 (8 seconds)</option>
              <option value={10000}>10000 (10 seconds)</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Position:
            </label>
            <select
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="bottom">Bottom (default)</option>
              <option value="top">Top</option>
            </select>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <h4 className="text-sm font-semibold text-gray-700">Trigger Toasts:</h4>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={handleSuccess}
            className="rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            Success Toast
          </button>
          <button
            onClick={handleError}
            className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            Error Toast
          </button>
          <button
            onClick={handleInfo}
            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Info Toast
          </button>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            onClick={handleRapidFire}
            className="rounded-md bg-purple-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
          >
            Rapid Fire (3 toasts)
          </button>
        </div>
      </div>

      <div className="rounded-md bg-blue-50 p-4">
        <h4 className="mb-2 text-sm font-semibold text-blue-800">
          💡 Usage Tips:
        </h4>
        <ul className="list-inside list-disc space-y-1 text-sm text-blue-700">
          <li>Try different message texts and durations</li>
          <li>Test both top and bottom positions</li>
          <li>Click "Rapid Fire" to see toast stacking behavior</li>
          <li>Maximum 3 toasts can appear simultaneously</li>
          <li>Click the X button on any toast to dismiss it manually</li>
        </ul>
      </div>

      <div className="rounded-md bg-yellow-50 p-4">
        <h4 className="mb-2 text-sm font-semibold text-yellow-800">
          ⚠️ Important:
        </h4>
        <p className="text-sm text-yellow-700">
          The toasts shown above are triggered by the `toast.success()`,
          `toast.error()`, and `toast.info()` functions. Do not use the `
          <Toaster />` component directly in your pages as it's already included
          in the application layout.
        </p>
      </div>
    </div>
  );
}
