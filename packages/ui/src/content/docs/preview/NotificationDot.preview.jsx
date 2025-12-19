"use client";

import { useState } from "react";

import { NotificationDot } from "@muatmuat/ui/NotificationDot";

export function NotificationDotPreview() {
  const [animated, setAnimated] = useState(true);
  const [color, setColor] = useState("red");
  const [size, setSize] = useState("sm");

  return (
    <div className="space-y-6">
      {/* Real-world examples */}
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-100">
              <span className="text-primary-700">📧</span>
            </div>
            <NotificationDot
              position="absolute"
              positionClasses="top-0 right-0"
              color="red"
              animated={animated}
              size={size}
            />
          </div>
          <span>Email with new message</span>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-warning-100">
              <span className="text-warning-700">🔔</span>
            </div>
            <NotificationDot
              position="absolute"
              positionClasses="top-0 right-0"
              color="warning"
              animated={animated}
              size={size}
            />
          </div>
          <span>Notification with warning</span>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-success-100">
              <span className="text-success-700">✓</span>
            </div>
            <NotificationDot
              position="absolute"
              positionClasses="top-0 right-0"
              color="success"
              animated={animated}
              size={size}
            />
          </div>
          <span>Task completed</span>
        </div>
      </div>

      {/* Size variants */}
      <div className="space-y-2">
        <h4 className="font-medium">Size Variants</h4>
        <div className="flex flex-wrap items-center gap-6">
          <div className="text-center">
            <NotificationDot size="xs" color={color} animated={animated} />
            <p className="mt-2 text-xs text-neutral-600">XS</p>
          </div>
          <div className="text-center">
            <NotificationDot size="sm" color={color} animated={animated} />
            <p className="mt-2 text-xs text-neutral-600">SM</p>
          </div>
          <div className="text-center">
            <NotificationDot size="md" color={color} animated={animated} />
            <p className="mt-2 text-xs text-neutral-600">MD</p>
          </div>
          <div className="text-center">
            <NotificationDot size="lg" color={color} animated={animated} />
            <p className="mt-2 text-xs text-neutral-600">LG</p>
          </div>
          <div className="text-center">
            <NotificationDot size="xl" color={color} animated={animated} />
            <p className="mt-2 text-xs text-neutral-600">XL</p>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="rounded-lg border bg-white p-4">
        <h4 className="mb-2 font-medium">Controls</h4>
        <div className="flex gap-4">
          <button
            onClick={() => setAnimated(!animated)}
            className={`rounded px-3 py-1 text-sm ${
              animated ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
            }`}
          >
            Animation: {animated ? "ON" : "OFF"}
          </button>
          <select
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="rounded border px-2 py-1 text-sm"
          >
            <option value="red">Red</option>
            <option value="green">Green</option>
            <option value="blue">Blue</option>
            <option value="yellow">Yellow</option>
            <option value="primary">Primary</option>
            <option value="success">Success</option>
            <option value="warning">Warning</option>
            <option value="error">Error</option>
          </select>
          <select
            value={size}
            onChange={(e) => setSize(e.target.value)}
            className="rounded border px-2 py-1 text-sm"
          >
            <option value="xs">XS</option>
            <option value="sm">SM</option>
            <option value="md">MD</option>
            <option value="lg">LG</option>
            <option value="xl">XL</option>
          </select>
        </div>
      </div>

      {/* Positioning examples */}
      <div className="space-y-4">
        <h4 className="font-medium">Positioning Examples</h4>
        <div className="flex gap-8">
          <div className="relative inline-block">
            <div className="h-12 w-12 rounded bg-neutral-200" />
            <NotificationDot
              position="absolute"
              positionClasses="top-0 right-0"
              color="red"
              animated={animated}
              size={size}
            />
            <p className="mt-2 text-xs text-neutral-600">Top Right</p>
          </div>

          <div className="relative inline-block">
            <div className="h-12 w-12 rounded bg-neutral-200" />
            <NotificationDot
              position="absolute"
              positionClasses="bottom-0 left-0"
              color="blue"
              animated={animated}
              size={size}
            />
            <p className="mt-2 text-xs text-neutral-600">Bottom Left</p>
          </div>

          <div className="inline-block">
            <NotificationDot
              position="relative"
              color="green"
              animated={animated}
              size={size}
            />
            <p className="mt-2 text-xs text-neutral-600">Relative</p>
          </div>
        </div>
      </div>
    </div>
  );
}
