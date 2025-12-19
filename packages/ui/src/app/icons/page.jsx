"use client";

import { useState } from "react";

import * as Icons from "@muatmuat/icons";

export default function IconsPage() {
  const [search, setSearch] = useState("");
  const [copiedIcon, setCopiedIcon] = useState(null);
  const [iconColor, setIconColor] = useState("#374151"); // gray-700
  const [strokeWidth, setStrokeWidth] = useState(2);

  // Get all icon names from the imported module
  const iconNames = Object.keys(Icons).sort();

  // Filter icons based on search
  const filteredIcons = iconNames.filter((name) =>
    name.toLowerCase().includes(search.toLowerCase())
  );

  const copyToClipboard = (iconName) => {
    const importStatement = `import { ${iconName} } from "@muatmuat/icons";`;
    navigator.clipboard.writeText(importStatement);
    setCopiedIcon(iconName);
    setTimeout(() => setCopiedIcon(null), 2000);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="sticky top-0 mb-8 bg-gray-200">
        <h1 className="mb-4 text-3xl font-bold">Icon Library</h1>
        <p className="mb-4 text-gray-600">
          Browse and search through {iconNames.length} available icons. Click on
          any icon to copy its import statement.
        </p>

        {/* Search Input */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search icons..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          )}
        </div>

        <p className="mt-2 text-sm text-gray-500">
          Found {filteredIcons.length} icon
          {filteredIcons.length !== 1 ? "s" : ""}
        </p>
      </div>

      {/* Style Controls */}
      <div className="mb-8 rounded-lg border border-gray-200 bg-white p-6">
        <h2 className="mb-4 text-lg font-semibold">Icon Customization</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {/* Color Control */}
          <div>
            <label className="mb-2 flex items-center text-sm font-medium text-gray-700">
              Color
              <button
                onClick={() => setIconColor("#374151")}
                className="ml-2 text-xs text-blue-500 hover:text-blue-700"
                title="Reset to default"
              >
                (reset)
              </button>
            </label>
            <div className="flex gap-2">
              <input
                type="color"
                value={iconColor}
                onChange={(e) => setIconColor(e.target.value)}
                className="h-10 w-20 cursor-pointer rounded border border-gray-300"
              />
              <input
                type="text"
                value={iconColor}
                onChange={(e) => setIconColor(e.target.value)}
                className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="#000000"
              />
            </div>
          </div>

          {/* Stroke Width Control */}
          <div>
            <label className="mb-2 flex items-center text-sm font-medium text-gray-700">
              Stroke Width: {strokeWidth}
              <button
                onClick={() => setStrokeWidth(2)}
                className="ml-2 text-xs text-blue-500 hover:text-blue-700"
                title="Reset to default"
              >
                (reset)
              </button>
            </label>
            <div className="flex items-center gap-3">
              <input
                type="range"
                min="0.5"
                max="4"
                step="0.5"
                value={strokeWidth}
                onChange={(e) => setStrokeWidth(parseFloat(e.target.value))}
                className="flex-1"
              />
              <input
                type="number"
                min="0.5"
                max="4"
                step="0.5"
                value={strokeWidth}
                onChange={(e) => setStrokeWidth(parseFloat(e.target.value))}
                className="w-16 rounded-lg border border-gray-300 px-2 py-2 text-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Icons Grid */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8">
        {filteredIcons.map((iconName) => {
          const IconComponent = Icons[iconName];
          return (
            <button
              key={iconName}
              onClick={() => copyToClipboard(iconName)}
              className="group relative flex cursor-pointer flex-col items-center justify-center rounded-lg border border-gray-200 bg-white p-4 transition-all duration-200 hover:border-blue-500 hover:shadow-lg"
              title={`Click to copy import for ${iconName}`}
            >
              {/* Icon Display */}
              <div className="mb-2 flex h-8 w-8 items-center justify-center transition-colors">
                <IconComponent
                  className="h-full w-full"
                  style={{ color: iconColor, strokeWidth }}
                  stroke="currentColor"
                />
              </div>

              {/* Icon Name */}
              <span className="break-all text-center text-xs font-medium text-gray-600 group-hover:text-blue-600">
                {iconName}
              </span>

              {/* Copied Indicator */}
              {copiedIcon === iconName && (
                <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-green-500">
                  <span className="text-sm font-semibold text-white">
                    ✓ Copied!
                  </span>
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* No Results */}
      {filteredIcons.length === 0 && (
        <div className="py-12 text-center">
          <p className="text-lg text-gray-500">
            No icons found matching "{search}"
          </p>
          <button
            onClick={() => setSearch("")}
            className="mt-4 rounded-lg bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600"
          >
            Clear Search
          </button>
        </div>
      )}

      {/* Usage Instructions */}
      <div className="mt-12 rounded-lg border border-gray-200 bg-gray-50 p-6">
        <h2 className="mb-3 text-xl font-semibold">How to Use</h2>
        <div className="space-y-2 text-sm text-gray-700">
          <p>
            <strong>1.</strong> Click on any icon above to copy its import
            statement
          </p>
          <p>
            <strong>2.</strong> Paste the import in your component file:
          </p>
          <pre className="mt-2 overflow-x-auto rounded bg-gray-800 p-3 text-gray-100">
            <code>{`import { ChevronDown, Edit, Search } from "@muatmuat/icons";`}</code>
          </pre>
          <p className="mt-3">
            <strong>3.</strong> Use the icon in your JSX:
          </p>
          <pre className="mt-2 overflow-x-auto rounded bg-gray-800 p-3 text-gray-100">
            <code>{`<ChevronDown className="w-6 h-6 text-blue-500" />`}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}
