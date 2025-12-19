"use client";

import { InfoTooltip } from "@muatmuat/ui/Tooltip";

export function InfoTooltipPreview() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <h4 className="text-sm font-semibold text-gray-700">
            Basic Tooltips
          </h4>
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Default Info:</span>
              <InfoTooltip>
                This is a helpful information tooltip that appears on hover.
              </InfoTooltip>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Quick Tip:</span>
              <InfoTooltip icon="/icons/lightbulb.svg">
                Here's a helpful tip to improve your workflow and productivity.
              </InfoTooltip>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Warning:</span>
              <InfoTooltip
                icon="/icons/warning.svg"
                side="right"
                className="max-w-xs"
              >
                <div className="space-y-1">
                  <p className="font-semibold text-orange-600">
                    ⚠️ Important Notice
                  </p>
                  <p className="text-sm">
                    Please review this information carefully before proceeding.
                  </p>
                </div>
              </InfoTooltip>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Bottom Position:</span>
              <InfoTooltip side="bottom" align="start">
                This tooltip appears below the trigger element.
              </InfoTooltip>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Left Position:</span>
              <InfoTooltip side="left" align="center">
                Tooltip positioned to the left of the trigger.
              </InfoTooltip>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="text-sm font-semibold text-gray-700">
            Custom Triggers
          </h4>
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <InfoTooltip
                trigger={
                  <button className="rounded bg-blue-500 px-3 py-1 text-sm text-white hover:bg-blue-600">
                    Help
                  </button>
                }
              >
                This tooltip uses a custom button trigger instead of the default
                icon.
              </InfoTooltip>
            </div>

            <div className="flex items-center gap-2">
              <InfoTooltip
                trigger={
                  <span className="cursor-pointer text-blue-600 underline">
                    What is this?
                  </span>
                }
                side="bottom"
              >
                This is a text link that triggers the tooltip when hovered.
              </InfoTooltip>
            </div>

            <div className="flex items-center gap-2">
              <InfoTooltip
                trigger={
                  <div className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-full bg-green-100 text-green-600">
                    ?
                  </div>
                }
              >
                Custom styled trigger element with circular background.
              </InfoTooltip>
            </div>

            <div className="flex items-center gap-2">
              <InfoTooltip
                trigger={
                  <div className="flex cursor-pointer items-center gap-1 rounded border border-gray-300 px-2 py-1 text-xs">
                    <span>ℹ️</span>
                    <span>Info</span>
                  </div>
                }
              >
                This trigger has both an emoji and text content.
              </InfoTooltip>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="text-sm font-semibold text-gray-700">Complex Content</h4>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-lg border bg-white p-4">
            <h5 className="mb-2 font-medium">Form Field Help</h5>
            <div className="mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                placeholder="user@example.com"
              />
            </div>
            <InfoTooltip
              icon="/icons/help-circle.svg"
              side="right"
              align="start"
            >
              <div className="space-y-2">
                <h6 className="font-semibold">Email Requirements:</h6>
                <ul className="list-inspace list-disc space-y-1 text-sm">
                  <li>Must be a valid email format</li>
                  <li>Will be used for account notifications</li>
                  <li>Can be changed later in settings</li>
                </ul>
              </div>
            </InfoTooltip>
          </div>

          <div className="rounded-lg border bg-white p-4">
            <h5 className="mb-2 font-medium">Feature Explanation</h5>
            <div className="mb-2 flex items-center gap-2">
              <span className="text-sm font-medium">Auto-save</span>
              <InfoTooltip>
                <div className="space-y-2">
                  <h6 className="font-semibold">💾 Auto-save Feature</h6>
                  <p className="text-sm">
                    Your work is automatically saved every 30 seconds.
                  </p>
                  <div className="rounded bg-green-50 p-2">
                    <p className="text-xs text-green-700">
                      ✓ Last saved 2 minutes ago
                    </p>
                  </div>
                </div>
              </InfoTooltip>
            </div>
            <p className="text-sm text-gray-600">
              Changes are saved automatically to prevent data loss.
            </p>
          </div>

          <div className="rounded-lg border bg-white p-4">
            <h5 className="mb-2 font-medium">Status Information</h5>
            <div className="mb-2 flex items-center gap-2">
              <span className="inline-flex h-2 w-2 rounded-full bg-green-500"></span>
              <span className="text-sm font-medium">Active</span>
              <InfoTooltip
                render={
                  <div className="space-y-2">
                    <h6 className="font-semibold">Status Information</h6>
                    <div className="space-y-1 text-sm">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-green-500"></div>
                        <span>Active: System is running normally</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
                        <span>Warning: Attention needed</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-red-500"></div>
                        <span>Error: System failure</span>
                      </div>
                    </div>
                  </div>
                }
              />
            </div>
            <p className="text-sm text-gray-600">
              All systems are operational.
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-lg bg-blue-50 p-4">
        <h4 className="mb-2 text-sm font-semibold text-blue-900">
          Interactive Examples
        </h4>
        <p className="mb-3 text-sm text-blue-700">
          Hover over or focus on the tooltips below to see different positioning
          and content examples:
        </p>
        <div className="flex flex-wrap gap-4">
          <InfoTooltip side="top">Top aligned tooltip</InfoTooltip>
          <InfoTooltip side="right">Right aligned tooltip</InfoTooltip>
          <InfoTooltip side="bottom">Bottom aligned tooltip</InfoTooltip>
          <InfoTooltip side="left">Left aligned tooltip</InfoTooltip>
          <InfoTooltip side="top" align="start">
            Top start aligned
          </InfoTooltip>
          <InfoTooltip side="top" align="end">
            Top end aligned
          </InfoTooltip>
        </div>
      </div>

      <p className="text-sm text-gray-600">
        InfoTooltip components provide accessible way to display additional
        information on hover or focus. They support custom triggers,
        positioning, and complex content.
      </p>
    </div>
  );
}
