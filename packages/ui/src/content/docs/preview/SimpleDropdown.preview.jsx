"use client";

import { SimpleDropdown } from "@muatmuat/ui/Dropdown";

export function SimpleDropdownPreview() {
  const basicItems = [
    {
      id: "view",
      label: "View Details",
      onClick: () => console.log("View clicked"),
    },
    {
      id: "edit",
      label: "Edit Item",
      onClick: () => console.log("Edit clicked"),
    },
    {
      id: "delete",
      label: "Delete Item",
      onClick: () => console.log("Delete clicked"),
    },
  ];

  const userItems = [
    {
      id: "profile",
      label: "My Profile",
      onClick: () => console.log("Profile"),
    },
    {
      id: "settings",
      label: "Settings",
      onClick: () => console.log("Settings"),
    },
    { id: "billing", label: "Billing", onClick: () => console.log("Billing") },
    { id: "logout", label: "Sign Out", onClick: () => console.log("Logout") },
  ];

  return (
    <div className="space-y-8 p-8">
      <div>
        <h3 className="mb-4 text-lg font-semibold">Simple Dropdown Examples</h3>
        <p className="mb-6 text-neutral-600">
          Declarative dropdown component with items defined as an array
        </p>
      </div>

      {/* Basic dropdown */}
      <div className="space-y-4">
        <h4 className="text-sm font-medium">Basic Dropdown</h4>
        <SimpleDropdown
          trigger={
            <button className="rounded-md border border-neutral-300 px-4 py-2">
              Actions
            </button>
          }
          items={basicItems}
          className="w-fit"
        />
      </div>

      {/* User dropdown */}
      <div className="space-y-4">
        <h4 className="text-sm font-medium">User Dropdown</h4>
        <SimpleDropdown
          trigger={
            <div className="flex cursor-pointer items-center gap-2 rounded-full bg-gray-800 px-3 py-1 text-white">
              <div className="h-6 w-6 rounded-full bg-gray-600">JD</div>
              <span>John Doe</span>
            </div>
          }
          items={userItems}
        />
      </div>

      {/* Custom styled trigger */}
      <div className="space-y-4">
        <h4 className="text-sm font-medium">Custom Styled Trigger</h4>
        <SimpleDropdown
          trigger={
            <button className="rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-3 text-white shadow-lg transition-all hover:shadow-xl">
              Premium Menu
            </button>
          }
          items={[
            { id: "premium1", label: "Premium Feature 1", onClick: () => {} },
            { id: "premium2", label: "Premium Feature 2", onClick: () => {} },
            { id: "premium3", label: "Premium Feature 3", onClick: () => {} },
          ]}
        />
      </div>

      {/* Icon trigger */}
      <div className="space-y-4">
        <h4 className="text-sm font-medium">Icon Trigger</h4>
        <SimpleDropdown
          trigger={
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
          }
          items={[
            { id: "option1", label: "Option 1", onClick: () => {} },
            { id: "option2", label: "Option 2", onClick: () => {} },
            { id: "option3", label: "Option 3", onClick: () => {} },
          ]}
        />
      </div>
    </div>
  );
}
