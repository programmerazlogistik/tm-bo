"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@muatmuat/ui/Dropdown";

export function DropdownMenuPreview() {
  return (
    <div className="space-y-8 p-8">
      <div>
        <h3 className="mb-4 text-lg font-semibold">
          Simple Dropdown Menu Examples
        </h3>
        <p className="mb-6 text-neutral-600">
          Basic dropdown menus with click-to-open functionality
        </p>
      </div>

      {/* Basic menu */}
      <div className="space-y-4">
        <h4 className="text-sm font-medium">Basic Menu</h4>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="rounded-md border border-neutral-600 bg-neutral-50 px-3 py-2">
              Open Menu
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => console.log("View")}>
              View Details
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => console.log("Edit")}>
              Edit Item
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => console.log("Delete")}>
              Delete Item
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* User menu */}
      <div className="space-y-4">
        <h4 className="text-sm font-medium">User Menu</h4>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2 rounded-full bg-blue-500 px-3 py-1 text-white">
              <span>JD</span>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="bottom" align="end">
            <DropdownMenuItem onClick={() => console.log("Profile")}>
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => console.log("Settings")}>
              Settings
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => console.log("Account")}>
              Account
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => console.log("Logout")}>
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Actions menu */}
      <div className="space-y-4">
        <h4 className="text-sm font-medium">Actions Menu</h4>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="rounded-md bg-green-600 px-4 py-2 text-white">
              Actions
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="right" align="start">
            <DropdownMenuItem onClick={() => console.log("Download")}>
              Download
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => console.log("Share")}>
              Share
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => console.log("Copy")}>
              Copy Link
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => console.log("Print")}>
              Print
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Top aligned menu */}
      <div className="space-y-4">
        <h4 className="text-sm font-medium">Top Aligned Menu</h4>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="rounded-md bg-purple-600 px-4 py-2 text-white">
              Top Menu
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="top">
            <DropdownMenuItem onClick={() => console.log("Top 1")}>
              Top Item 1
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => console.log("Top 2")}>
              Top Item 2
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => console.log("Top 3")}>
              Top Item 3
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
