"use client";

import { useState } from "react";

import { Button } from "@muatmuat/ui/Button";
import { Dropdown } from "@muatmuat/ui/Dropdown";
import { IconComponent } from "@muatmuat/ui/IconComponent";

export function DropdownPreview() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="space-y-12 p-8">
      <div>
        <h3 className="mb-4 text-lg font-semibold">
          Dropdown Component Examples
        </h3>
        <p className="mb-6 text-neutral-600">
          Comprehensive examples of the Dropdown component built on Radix UI
          Popover and HoverCard primitives
        </p>
      </div>

      {/* Basic Dropdown with Custom Trigger */}
      <div className="space-y-4">
        <h4 className="text-sm font-medium text-neutral-900">Basic Dropdown</h4>
        <p className="text-xs text-neutral-600">
          Using Dropdown.Trigger with asChild pattern for custom button styling
        </p>
        <Dropdown.Root>
          <Dropdown.Trigger asChild>
            <Button variant="primary">
              <IconComponent
                src="/icons/chevron-down.svg"
                className="ml-2 h-4 w-4"
              />
              Open Dropdown
            </Button>
          </Dropdown.Trigger>
          <Dropdown.Content>
            <Dropdown.Item onClick={() => console.log("Profile clicked")}>
              <IconComponent src="/icons/user.svg" className="mr-2 h-4 w-4" />
              Profile
            </Dropdown.Item>
            <Dropdown.Item onClick={() => console.log("Settings clicked")}>
              <IconComponent
                src="/icons/settings.svg"
                className="mr-2 h-4 w-4"
              />
              Settings
            </Dropdown.Item>
            <Dropdown.Item onClick={() => console.log("Help clicked")}>
              <IconComponent src="/icons/help.svg" className="mr-2 h-4 w-4" />
              Help
            </Dropdown.Item>
            <Dropdown.Item
              isDestructive
              onClick={() => console.log("Logout clicked")}
            >
              <IconComponent src="/icons/logout.svg" className="mr-2 h-4 w-4" />
              Logout
            </Dropdown.Item>
          </Dropdown.Content>
        </Dropdown.Root>
      </div>

      {/* Filter Trigger Examples */}
      <div className="space-y-4">
        <h4 className="text-sm font-medium text-neutral-900">
          Filter Trigger States
        </h4>
        <p className="text-xs text-neutral-600">
          Built-in FilterTrigger component with active/inactive and disabled
          states
        </p>
        <div className="flex gap-4">
          <Dropdown.Root>
            <Dropdown.FilterTrigger isActive={false} disabled={false} />
            <Dropdown.Content>
              <Dropdown.Item onClick={() => console.log("All selected")}>
                All Status
              </Dropdown.Item>
              <Dropdown.Item onClick={() => console.log("Active selected")}>
                <div className="mr-2 h-2 w-2 rounded-full bg-green-500" />
                Active
              </Dropdown.Item>
              <Dropdown.Item onClick={() => console.log("Pending selected")}>
                <div className="mr-2 h-2 w-2 rounded-full bg-yellow-500" />
                Pending
              </Dropdown.Item>
              <Dropdown.Item onClick={() => console.log("Inactive selected")}>
                <div className="mr-2 h-2 w-2 rounded-full bg-gray-500" />
                Inactive
              </Dropdown.Item>
            </Dropdown.Content>
          </Dropdown.Root>

          <Dropdown.Root>
            <Dropdown.FilterTrigger isActive={true} disabled={false} />
            <Dropdown.Content>
              <Dropdown.Item onClick={() => console.log("Filter changed")}>
                Change Filter
              </Dropdown.Item>
            </Dropdown.Content>
          </Dropdown.Root>

          <Dropdown.Root>
            <Dropdown.FilterTrigger isActive={false} disabled={true} />
            <Dropdown.Content>
              <Dropdown.Item onClick={() => console.log("This won't work")}>
                Disabled Filter
              </Dropdown.Item>
            </Dropdown.Content>
          </Dropdown.Root>
        </div>
      </div>

      {/* Nested Hover Menus */}
      <div className="space-y-4">
        <h4 className="text-sm font-medium text-neutral-900">
          Nested Hover Menus
        </h4>
        <p className="text-xs text-neutral-600">
          Hover-based submenus using HoverRoot → HoverContent → HoverItem
          pattern
        </p>
        <Dropdown.Root>
          <Dropdown.Trigger asChild>
            <Button variant="secondary">
              <IconComponent src="/icons/menu.svg" className="mr-2 h-4 w-4" />
              Advanced Menu
            </Button>
          </Dropdown.Trigger>
          <Dropdown.Content>
            <Dropdown.Item onClick={() => console.log("Dashboard clicked")}>
              <IconComponent
                src="/icons/dashboard.svg"
                className="mr-2 h-4 w-4"
              />
              Dashboard
            </Dropdown.Item>

            <Dropdown.HoverRoot title="Reports">
              <Dropdown.HoverContent>
                <Dropdown.HoverItem
                  onClick={() => console.log("Sales Report clicked")}
                >
                  <IconComponent
                    src="/icons/chart.svg"
                    className="mr-2 h-4 w-4"
                  />
                  Sales Report
                </Dropdown.HoverItem>
                <Dropdown.HoverItem
                  onClick={() => console.log("User Report clicked")}
                >
                  <IconComponent
                    src="/icons/users.svg"
                    className="mr-2 h-4 w-4"
                  />
                  User Report
                </Dropdown.HoverItem>
                <Dropdown.HoverItem
                  onClick={() => console.log("Analytics clicked")}
                >
                  <IconComponent
                    src="/icons/analytics.svg"
                    className="mr-2 h-4 w-4"
                  />
                  Analytics
                </Dropdown.HoverItem>
                <Dropdown.HoverItem
                  onClick={() => console.log("Financial clicked")}
                >
                  <IconComponent
                    src="/icons/dollar.svg"
                    className="mr-2 h-4 w-4"
                  />
                  Financial Report
                </Dropdown.HoverItem>
              </Dropdown.HoverContent>
            </Dropdown.HoverRoot>

            <Dropdown.HoverRoot title="Settings">
              <Dropdown.HoverContent>
                <Dropdown.HoverItem
                  onClick={() => console.log("General Settings clicked")}
                >
                  <IconComponent
                    src="/icons/settings.svg"
                    className="mr-2 h-4 w-4"
                  />
                  General Settings
                </Dropdown.HoverItem>
                <Dropdown.HoverItem
                  onClick={() => console.log("Privacy Settings clicked")}
                >
                  <IconComponent
                    src="/icons/lock.svg"
                    className="mr-2 h-4 w-4"
                  />
                  Privacy Settings
                </Dropdown.HoverItem>
                <Dropdown.HoverItem
                  onClick={() => console.log("Security Settings clicked")}
                >
                  <IconComponent
                    src="/icons/shield.svg"
                    className="mr-2 h-4 w-4"
                  />
                  Security Settings
                </Dropdown.HoverItem>
              </Dropdown.HoverContent>
            </Dropdown.HoverRoot>

            <Dropdown.Item
              isDestructive
              onClick={() => console.log("Logout clicked")}
            >
              <IconComponent src="/icons/logout.svg" className="mr-2 h-4 w-4" />
              Logout
            </Dropdown.Item>
          </Dropdown.Content>
        </Dropdown.Root>
      </div>

      {/* HoverItem with asChild Pattern */}
      <div className="space-y-4">
        <h4 className="text-sm font-medium text-neutral-900">
          Complex Hover Items
        </h4>
        <p className="text-xs text-neutral-600">
          HoverItem with asChild pattern for complex item layouts
        </p>
        <Dropdown.Root>
          <Dropdown.Trigger asChild>
            <Button variant="outline">
              <IconComponent src="/icons/share.svg" className="mr-2 h-4 w-4" />
              Share Options
            </Button>
          </Dropdown.Trigger>
          <Dropdown.Content>
            <Dropdown.HoverRoot title="Share with People">
              <Dropdown.HoverContent
                appearance={{ wrapperClassName: "max-h-60" }}
              >
                <Dropdown.HoverItem
                  asChild
                  onClick={() => console.log("Share with Alice")}
                >
                  <div className="flex items-center justify-between p-2">
                    <div className="flex items-center">
                      <div className="mr-2 flex h-6 w-6 items-center justify-center rounded-full bg-blue-500 text-xs text-white">
                        A
                      </div>
                      <div>
                        <div className="text-xs font-medium">Alice Johnson</div>
                        <div className="text-xs text-neutral-500">
                          alice@example.com
                        </div>
                      </div>
                    </div>
                    <IconComponent
                      src="/icons/check.svg"
                      className="h-3 w-3 text-green-500"
                    />
                  </div>
                </Dropdown.HoverItem>
                <Dropdown.HoverItem
                  asChild
                  onClick={() => console.log("Share with Bob")}
                >
                  <div className="flex items-center justify-between p-2">
                    <div className="flex items-center">
                      <div className="mr-2 flex h-6 w-6 items-center justify-center rounded-full bg-green-500 text-xs text-white">
                        B
                      </div>
                      <div>
                        <div className="text-xs font-medium">Bob Smith</div>
                        <div className="text-xs text-neutral-500">
                          bob@example.com
                        </div>
                      </div>
                    </div>
                  </div>
                </Dropdown.HoverItem>
              </Dropdown.HoverContent>
            </Dropdown.HoverRoot>
          </Dropdown.Content>
        </Dropdown.Root>
      </div>

      {/* Different Positioning */}
      <div className="space-y-4">
        <h4 className="text-sm font-medium text-neutral-900">
          Positioning Variations
        </h4>
        <p className="text-xs text-neutral-600">
          Different alignment and offset options
        </p>
        <div className="flex items-start gap-4">
          <Dropdown.Root>
            <Dropdown.Trigger asChild>
              <Button variant="outline" size="sm">
                Align Start
              </Button>
            </Dropdown.Trigger>
            <Dropdown.Content align="start">
              <Dropdown.Item onClick={() => console.log("Start aligned")}>
                Left aligned content
              </Dropdown.Item>
              <Dropdown.Item onClick={() => console.log("Another item")}>
                Another menu item
              </Dropdown.Item>
            </Dropdown.Content>
          </Dropdown.Root>

          <Dropdown.Root>
            <Dropdown.Trigger asChild>
              <Button variant="outline" size="sm">
                Align Center
              </Button>
            </Dropdown.Trigger>
            <Dropdown.Content align="center">
              <Dropdown.Item onClick={() => console.log("Center aligned")}>
                Center aligned content
              </Dropdown.Item>
              <Dropdown.Item onClick={() => console.log("Another item")}>
                Another menu item
              </Dropdown.Item>
            </Dropdown.Content>
          </Dropdown.Root>

          <Dropdown.Root>
            <Dropdown.Trigger asChild>
              <Button variant="outline" size="sm">
                Align End
              </Button>
            </Dropdown.Trigger>
            <Dropdown.Content align="end">
              <Dropdown.Item onClick={() => console.log("End aligned")}>
                Right aligned content
              </Dropdown.Item>
              <Dropdown.Item onClick={() => console.log("Another item")}>
                Another menu item
              </Dropdown.Item>
            </Dropdown.Content>
          </Dropdown.Root>
        </div>
      </div>

      {/* Controlled Dropdown */}
      <div className="space-y-4">
        <h4 className="text-sm font-medium text-neutral-900">
          Controlled State
        </h4>
        <p className="text-xs text-neutral-600">
          External state management with open/onOpenChange props
        </p>
        <div className="space-y-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? "Close" : "Open"} Controlled Dropdown
          </Button>
          <Dropdown.Root open={isOpen} onOpenChange={setIsOpen}>
            <Dropdown.Trigger asChild>
              <Button variant="primary">
                <IconComponent
                  src="/icons/chevron-down.svg"
                  className="mr-2 h-4 w-4"
                />
                Controlled Dropdown (State: {isOpen ? "Open" : "Closed"})
              </Button>
            </Dropdown.Trigger>
            <Dropdown.Content>
              <Dropdown.Item
                onClick={() => {
                  console.log("Controlled item clicked");
                  setIsOpen(false);
                }}
              >
                Click to close
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => console.log("Another controlled item")}
              >
                Another controlled item
              </Dropdown.Item>
            </Dropdown.Content>
          </Dropdown.Root>
        </div>
      </div>

      {/* Complex Real-World Example */}
      <div className="space-y-4">
        <h4 className="text-sm font-medium text-neutral-900">
          Real-World Example
        </h4>
        <p className="text-xs text-neutral-600">
          User account menu with all features combined
        </p>
        <Dropdown.Root>
          <Dropdown.Trigger asChild>
            <div className="flex cursor-pointer items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-600 text-xs font-medium text-white">
                JD
              </div>
              <div className="text-left">
                <div className="text-sm font-medium">John Doe</div>
                <div className="text-xs text-neutral-500">john@example.com</div>
              </div>
              <IconComponent
                src="/icons/chevron-down.svg"
                className="h-4 w-4 text-neutral-400"
              />
            </div>
          </Dropdown.Trigger>
          <Dropdown.Content align="end" sideOffset={8}>
            <div className="border-b border-neutral-200 px-3 py-2">
              <div className="text-xs font-medium text-neutral-900">
                John Doe
              </div>
              <div className="text-xs text-neutral-500">john@example.com</div>
            </div>

            <Dropdown.Item onClick={() => console.log("Profile clicked")}>
              <IconComponent src="/icons/user.svg" className="mr-2 h-4 w-4" />
              Profile
            </Dropdown.Item>

            <Dropdown.Item onClick={() => console.log("Account clicked")}>
              <IconComponent
                src="/icons/settings.svg"
                className="mr-2 h-4 w-4"
              />
              Account Settings
            </Dropdown.Item>

            <Dropdown.HoverRoot title="Preferences">
              <Dropdown.HoverContent side="left">
                <Dropdown.HoverItem
                  onClick={() => console.log("Appearance clicked")}
                >
                  <IconComponent
                    src="/icons/palette.svg"
                    className="mr-2 h-4 w-4"
                  />
                  Appearance
                </Dropdown.HoverItem>
                <Dropdown.HoverItem
                  onClick={() => console.log("Notifications clicked")}
                >
                  <IconComponent
                    src="/icons/bell.svg"
                    className="mr-2 h-4 w-4"
                  />
                  Notifications
                </Dropdown.HoverItem>
                <Dropdown.HoverItem
                  onClick={() => console.log("Language clicked")}
                >
                  <IconComponent
                    src="/icons/language.svg"
                    className="mr-2 h-4 w-4"
                  />
                  Language
                </Dropdown.HoverItem>
              </Dropdown.HoverContent>
            </Dropdown.HoverRoot>

            <Dropdown.Item onClick={() => console.log("Help clicked")}>
              <IconComponent src="/icons/help.svg" className="mr-2 h-4 w-4" />
              Help & Support
            </Dropdown.Item>

            <div className="border-t border-neutral-200">
              <Dropdown.Item
                isDestructive
                onClick={() => console.log("Logout clicked")}
              >
                <IconComponent
                  src="/icons/logout.svg"
                  className="mr-2 h-4 w-4"
                />
                Sign Out
              </Dropdown.Item>
            </div>
          </Dropdown.Content>
        </Dropdown.Root>
      </div>
    </div>
  );
}
