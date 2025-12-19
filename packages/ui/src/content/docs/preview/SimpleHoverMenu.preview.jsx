"use client";

import {
  SimpleHover,
  SimpleHoverContent,
  SimpleHoverItem,
  SimpleHoverTrigger,
} from "@muatmuat/ui/HoverMenu";

export function SimpleHoverMenuPreview() {
  return (
    <div className="space-y-8 p-8">
      <div>
        <h3 className="mb-4 text-lg font-semibold">
          Simple Hover Menu Examples
        </h3>
        <p className="mb-6 text-neutral-600">
          Hover-triggered dropdown menus with customizable positioning and
          timing
        </p>
      </div>

      {/* Basic hover menu */}
      <div className="space-y-4">
        <h4 className="text-sm font-medium">Basic Hover Menu</h4>
        <SimpleHover>
          <SimpleHoverTrigger asChild>
            <button className="flex items-center gap-2 rounded-md bg-primary-700 px-4 py-2 text-white">
              <span>Hover me</span>
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
          </SimpleHoverTrigger>
          <SimpleHoverContent>
            <SimpleHoverItem onClick={() => console.log("Profile clicked")}>
              Profile
            </SimpleHoverItem>
            <SimpleHoverItem onClick={() => console.log("Settings clicked")}>
              Settings
            </SimpleHoverItem>
            <SimpleHoverItem onClick={() => console.log("Logout clicked")}>
              Logout
            </SimpleHoverItem>
          </SimpleHoverContent>
        </SimpleHover>
      </div>

      {/* User menu */}
      <div className="space-y-4">
        <h4 className="text-sm font-medium">User Menu</h4>
        <SimpleHover>
          <SimpleHoverTrigger asChild>
            <div className="flex cursor-pointer items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-700 text-sm font-medium text-white">
                JD
              </div>
              <span className="text-sm font-medium">John Doe</span>
            </div>
          </SimpleHoverTrigger>
          <SimpleHoverContent>
            <SimpleHoverItem onClick={() => console.log("View profile")}>
              View Profile
            </SimpleHoverItem>
            <SimpleHoverItem onClick={() => console.log("Account settings")}>
              Account Settings
            </SimpleHoverItem>
            <SimpleHoverItem onClick={() => console.log("Sign out")}>
              Sign Out
            </SimpleHoverItem>
          </SimpleHoverContent>
        </SimpleHover>
      </div>

      {/* Different positions */}
      <div className="space-y-4">
        <h4 className="text-sm font-medium">Different Positions</h4>
        <div className="flex gap-4">
          <SimpleHover>
            <SimpleHoverTrigger asChild>
              <button className="rounded-md bg-blue-600 px-4 py-2 text-white">
                Top Menu
              </button>
            </SimpleHoverTrigger>
            <SimpleHoverContent side="top">
              <SimpleHoverItem>Top Item 1</SimpleHoverItem>
              <SimpleHoverItem>Top Item 2</SimpleHoverItem>
            </SimpleHoverContent>
          </SimpleHover>

          <SimpleHover>
            <SimpleHoverTrigger asChild>
              <button className="rounded-md bg-green-600 px-4 py-2 text-white">
                Right Menu
              </button>
            </SimpleHoverTrigger>
            <SimpleHoverContent side="right">
              <SimpleHoverItem>Right Item 1</SimpleHoverItem>
              <SimpleHoverItem>Right Item 2</SimpleHoverItem>
            </SimpleHoverContent>
          </SimpleHover>

          <SimpleHover>
            <SimpleHoverTrigger asChild>
              <button className="rounded-md bg-purple-600 px-4 py-2 text-white">
                Center Menu
              </button>
            </SimpleHoverTrigger>
            <SimpleHoverContent align="center">
              <SimpleHoverItem>Center Item 1</SimpleHoverItem>
              <SimpleHoverItem>Center Item 2</SimpleHoverItem>
            </SimpleHoverContent>
          </SimpleHover>
        </div>
      </div>

      {/* Custom delays */}
      <div className="space-y-4">
        <h4 className="text-sm font-medium">Custom Delays</h4>
        <div className="flex flex-col gap-4">
          <p className="text-sm text-neutral-600">
            This menu has custom delays: 500ms to open, 300ms to close
          </p>
          <SimpleHover openDelay={500} closeDelay={300}>
            <SimpleHoverTrigger asChild>
              <button className="rounded-md bg-indigo-600 px-4 py-2 text-white">
                Slow Hover
              </button>
            </SimpleHoverTrigger>
            <SimpleHoverContent>
              <SimpleHoverItem>Delayed appearance</SimpleHoverItem>
              <SimpleHoverItem>Item 2</SimpleHoverItem>
              <SimpleHoverItem>Item 3</SimpleHoverItem>
            </SimpleHoverContent>
          </SimpleHover>
        </div>
      </div>

      {/* Icon menu */}
      <div className="space-y-4">
        <h4 className="text-sm font-medium">Icon Menu</h4>
        <SimpleHover>
          <SimpleHoverTrigger asChild>
            <button className="rounded-lg bg-neutral-100 p-3 text-neutral-700 hover:bg-neutral-200">
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                />
              </svg>
            </button>
          </SimpleHoverTrigger>
          <SimpleHoverContent>
            <SimpleHoverItem onClick={() => console.log("Option 1")}>
              Option 1
            </SimpleHoverItem>
            <SimpleHoverItem onClick={() => console.log("Option 2")}>
              Option 2
            </SimpleHoverItem>
            <SimpleHoverItem onClick={() => console.log("Option 3")}>
              Option 3
            </SimpleHoverItem>
          </SimpleHoverContent>
        </SimpleHover>
      </div>
    </div>
  );
}
