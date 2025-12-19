"use client";

import { useState } from "react";

import { NotificationCount } from "@muatmuat/ui/NotificationDot";

export function NotificationCountPreview() {
  const [count, setCount] = useState(5);
  const [animated, setAnimated] = useState(false);
  const [variant, setVariant] = useState("default");
  const [backgroundColor, setBackgroundColor] = useState("red");

  return (
    <div className="space-y-6">
      {/* Real-world examples */}
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-100">
              <span className="text-primary-700">📧</span>
            </div>
            <NotificationCount
              count={12}
              position="absolute"
              positionClasses="top-0 right-0"
              backgroundColor="red"
              animated={animated}
              variant={variant}
            />
          </div>
          <span>Email (12 new messages)</span>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-warning-100">
              <span className="text-warning-700">🔔</span>
            </div>
            <NotificationCount
              count={3}
              position="absolute"
              positionClasses="top-0 right-0"
              backgroundColor="warning"
              animated={animated}
              variant={variant}
            />
          </div>
          <span>Notifications (3 new)</span>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-error-100">
              <span className="text-error-700">⚠️</span>
            </div>
            <NotificationCount
              count={99}
              position="absolute"
              positionClasses="top-0 right-0"
              backgroundColor="error"
              maxCount={99}
              animated={animated}
              variant={variant}
            />
          </div>
          <span>Errors (99+ issues)</span>
        </div>
      </div>

      {/* Count values demonstration */}
      <div className="space-y-2">
        <h4 className="font-medium">Count Values (maxCount: 99)</h4>
        <div className="flex flex-wrap items-center gap-4">
          {[1, 5, 9, 10, 99, 100, 150].map((value) => (
            <div key={value} className="text-center">
              <NotificationCount
                count={value}
                backgroundColor={backgroundColor}
                animated={animated}
                variant={variant}
                maxCount={99}
              />
              <p className="mt-2 text-xs text-neutral-600">{value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Size variants */}
      <div className="space-y-2">
        <h4 className="font-medium">Size Variants</h4>
        <div className="flex flex-wrap items-center gap-6">
          {["xs", "sm", "md", "lg", "xl"].map((size) => (
            <div key={size} className="text-center">
              <NotificationCount
                count={5}
                size={size}
                backgroundColor={backgroundColor}
                animated={animated}
                variant={variant}
              />
              <p className="mt-2 text-xs text-neutral-600">
                {size.toUpperCase()}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Variants */}
      <div className="space-y-2">
        <h4 className="font-medium">Variants</h4>
        <div className="flex flex-wrap items-center gap-6">
          <div className="text-center">
            <NotificationCount
              count={5}
              variant="default"
              backgroundColor={backgroundColor}
              animated={animated}
            />
            <p className="mt-2 text-xs text-neutral-600">Default</p>
          </div>
          <div className="text-center">
            <NotificationCount
              count={5}
              variant="bordered"
              backgroundColor={backgroundColor}
              animated={animated}
            />
            <p className="mt-2 text-xs text-neutral-600">Bordered</p>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="rounded-lg border bg-white p-4">
        <h4 className="mb-2 font-medium">Controls</h4>
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <label className="text-sm">Count:</label>
            <input
              type="number"
              value={count}
              onChange={(e) => setCount(Number(e.target.value))}
              className="w-16 rounded border px-2 py-1 text-sm"
              min="0"
              max="999"
            />
          </div>

          <button
            onClick={() => setAnimated(!animated)}
            className={`rounded px-3 py-1 text-sm ${
              animated ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
            }`}
          >
            Animation: {animated ? "ON" : "OFF"}
          </button>

          <div className="flex items-center gap-2">
            <label className="text-sm">Variant:</label>
            <select
              value={variant}
              onChange={(e) => setVariant(e.target.value)}
              className="rounded border px-2 py-1 text-sm"
            >
              <option value="default">Default</option>
              <option value="bordered">Bordered</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <label className="text-sm">Background:</label>
            <select
              value={backgroundColor}
              onChange={(e) => setBackgroundColor(e.target.value)}
              className="rounded border px-2 py-1 text-sm"
            >
              <option value="red">Red</option>
              <option value="green">Green</option>
              <option value="blue">Blue</option>
              <option value="yellow">Yellow</option>
              <option value="orange">Orange</option>
              <option value="purple">Purple</option>
              <option value="gray">Gray</option>
              <option value="primary">Primary</option>
              <option value="success">Success</option>
              <option value="warning">Warning</option>
              <option value="error">Error</option>
            </select>
          </div>
        </div>
      </div>

      {/* Current display */}
      <div className="rounded-lg border bg-white p-4">
        <h4 className="mb-2 font-medium">Current Badge</h4>
        <div className="flex items-center gap-4">
          <NotificationCount
            count={count}
            animated={animated}
            variant={variant}
            backgroundColor={backgroundColor}
          />
          <span className="text-sm text-neutral-600">
            Showing: {count > 99 ? "99+" : count}
          </span>
        </div>
      </div>
    </div>
  );
}
