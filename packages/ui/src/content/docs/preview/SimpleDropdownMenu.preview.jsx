"use client";

import {
  SimpleDropdown,
  SimpleDropdownContent,
  SimpleDropdownItem,
  SimpleDropdownTrigger,
} from "@muatmuat/ui/Dropdown";

export function SimpleDropdownMenuPreview() {
  return (
    <div className="space-y-8 p-8">
      <div>
        <h3 className="mb-4 text-lg font-semibold">
          Simple Dropdown Menu Examples
        </h3>
        <p className="mb-6 text-neutral-600">
          Lightweight wrapper around Radix UI dropdown primitives
        </p>
      </div>

      {/* Basic menu */}
      <div className="space-y-4">
        <h4 className="text-sm font-medium">Basic Menu</h4>
        <SimpleDropdown>
          <SimpleDropdownTrigger asChild>
            <button className="rounded-md border border-neutral-300 px-4 py-2">
              Menu
            </button>
          </SimpleDropdownTrigger>
          <SimpleDropdownContent>
            <SimpleDropdownItem onClick={() => console.log("Option 1")}>
              Option 1
            </SimpleDropdownItem>
            <SimpleDropdownItem onClick={() => console.log("Option 2")}>
              Option 2
            </SimpleDropdownItem>
            <SimpleDropdownItem onClick={() => console.log("Option 3")}>
              Option 3
            </SimpleDropdownItem>
          </SimpleDropdownContent>
        </SimpleDropdown>
      </div>

      {/* Right positioned menu */}
      <div className="space-y-4">
        <h4 className="text-sm font-medium">Right Positioned Menu</h4>
        <SimpleDropdown>
          <SimpleDropdownTrigger asChild>
            <button className="rounded-md bg-blue-600 px-4 py-2 text-white">
              Right Menu
            </button>
          </SimpleDropdownTrigger>
          <SimpleDropdownContent side="right" align="start">
            <SimpleDropdownItem onClick={() => console.log("First item")}>
              First Item
            </SimpleDropdownItem>
            <SimpleDropdownItem onClick={() => console.log("Second item")}>
              Second Item
            </SimpleDropdownItem>
            <SimpleDropdownItem onClick={() => console.log("Third item")}>
              Third Item
            </SimpleDropdownItem>
          </SimpleDropdownContent>
        </SimpleDropdown>
      </div>

      {/* Top aligned menu */}
      <div className="space-y-4">
        <h4 className="text-sm font-medium">Top Aligned Menu</h4>
        <SimpleDropdown>
          <SimpleDropdownTrigger asChild>
            <button className="rounded-md bg-green-600 px-4 py-2 text-white">
              Top Menu
            </button>
          </SimpleDropdownTrigger>
          <SimpleDropdownContent side="top">
            <SimpleDropdownItem onClick={() => console.log("Top 1")}>
              Top Item 1
            </SimpleDropdownItem>
            <SimpleDropdownItem onClick={() => console.log("Top 2")}>
              Top Item 2
            </SimpleDropdownItem>
            <SimpleDropdownItem onClick={() => console.log("Top 3")}>
              Top Item 3
            </SimpleDropdownItem>
          </SimpleDropdownContent>
        </SimpleDropdown>
      </div>

      {/* Center aligned menu */}
      <div className="space-y-4">
        <h4 className="text-sm font-medium">Center Aligned Menu</h4>
        <SimpleDropdown>
          <SimpleDropdownTrigger asChild>
            <button className="rounded-md bg-purple-600 px-4 py-2 text-white">
              Center Menu
            </button>
          </SimpleDropdownTrigger>
          <SimpleDropdownContent align="center">
            <SimpleDropdownItem onClick={() => console.log("Center 1")}>
              Center Item 1
            </SimpleDropdownItem>
            <SimpleDropdownItem onClick={() => console.log("Center 2")}>
              Center Item 2
            </SimpleDropdownItem>
            <SimpleDropdownItem onClick={() => console.log("Center 3")}>
              Center Item 3
            </SimpleDropdownItem>
          </SimpleDropdownContent>
        </SimpleDropdown>
      </div>

      {/* Custom styled menu */}
      <div className="space-y-4">
        <h4 className="text-sm font-medium">Custom Styled Menu</h4>
        <SimpleDropdown>
          <SimpleDropdownTrigger asChild>
            <button className="rounded-lg bg-gradient-to-r from-pink-500 to-orange-500 px-6 py-3 text-white shadow-lg">
              Styled Menu
            </button>
          </SimpleDropdownTrigger>
          <SimpleDropdownContent className="border-pink-200 bg-gradient-to-b from-pink-50 to-white">
            <SimpleDropdownItem
              className="text-pink-700 hover:bg-pink-50"
              onClick={() => console.log("Styled 1")}
            >
              Styled Item 1
            </SimpleDropdownItem>
            <SimpleDropdownItem
              className="text-pink-700 hover:bg-pink-50"
              onClick={() => console.log("Styled 2")}
            >
              Styled Item 2
            </SimpleDropdownItem>
            <SimpleDropdownItem
              className="text-pink-700 hover:bg-pink-50"
              onClick={() => console.log("Styled 3")}
            >
              Styled Item 3
            </SimpleDropdownItem>
          </SimpleDropdownContent>
        </SimpleDropdown>
      </div>
    </div>
  );
}
