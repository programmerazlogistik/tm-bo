"use client";

import { useState } from "react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@muatmuat/ui/Collapsible";

export function CollapsiblePreview() {
  const [openSections, setOpenSections] = useState({
    basic: false,
    controlled: false,
    nested: false,
    nestedChild: false,
    multi: {},
    renderProp: false,
  });

  const toggleSection = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const toggleMultiSection = (index) => {
    setOpenSections((prev) => ({
      ...prev,
      multi: {
        ...prev.multi,
        [index]: !prev.multi[index],
      },
    }));
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="rounded-lg border bg-white">
          <Collapsible
            open={openSections.basic}
            onOpenChange={(open) =>
              setOpenSections((prev) => ({ ...prev, basic: open }))
            }
          >
            <CollapsibleTrigger className="w-full px-4 py-3 text-left font-medium hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <span>Basic Collapsible</span>
                <span className="text-gray-400">
                  {openSections.basic ? "▼" : "▶"}
                </span>
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent className="px-4 pb-3">
              <p className="text-gray-600">
                This is a basic collapsible section. Click the header to expand
                or collapse this content area. It supports smooth animations and
                proper accessibility features.
              </p>
            </CollapsibleContent>
          </Collapsible>
        </div>

        <div className="rounded-lg border bg-white">
          <Collapsible
            open={openSections.controlled}
            onOpenChange={(open) =>
              setOpenSections((prev) => ({ ...prev, controlled: open }))
            }
          >
            <CollapsibleTrigger className="w-full px-4 py-3 text-left font-medium hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <span>Controlled State</span>
                <span className="text-sm text-gray-500">
                  Status: {openSections.controlled ? "Open" : "Closed"}
                </span>
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent className="px-4 pb-3">
              <div className="space-y-2">
                <p className="text-gray-600">
                  This collapsible uses controlled state management. The state
                  is managed by React state:
                </p>
                <div className="rounded bg-gray-50 p-2 font-mono text-sm">
                  const [isOpen, setIsOpen] = useState(false);
                </div>
                <button
                  onClick={() =>
                    setOpenSections((prev) => ({
                      ...prev,
                      controlled: !prev.controlled,
                    }))
                  }
                  className="rounded bg-blue-500 px-3 py-1 text-sm text-white hover:bg-blue-600"
                >
                  Toggle Programmatically
                </button>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>

        <div className="rounded-lg border bg-white">
          <Collapsible
            open={openSections.renderProp}
            onOpenChange={(open) =>
              setOpenSections((prev) => ({ ...prev, renderProp: open }))
            }
          >
            <CollapsibleTrigger className="w-full px-4 py-3 text-left font-medium hover:bg-gray-50">
              {({ open }) => (
                <div className="flex items-center justify-between">
                  <span>Render Prop Trigger</span>
                  <span className="text-sm">
                    {open ? "📖 Open" : "📕 Closed"}
                  </span>
                </div>
              )}
            </CollapsibleTrigger>
            <CollapsibleContent className="px-4 pb-3">
              <p className="text-gray-600">
                This trigger uses a render prop function that receives the
                current open state. You can dynamically change the content based
                on whether the section is expanded or collapsed.
              </p>
            </CollapsibleContent>
          </Collapsible>
        </div>

        <div className="rounded-lg border bg-white">
          <Collapsible
            open={openSections.nested}
            onOpenChange={(open) =>
              setOpenSections((prev) => ({ ...prev, nested: open }))
            }
          >
            <CollapsibleTrigger className="w-full px-4 py-3 text-left font-medium hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <span>Nested Collapsible</span>
                <span className="text-gray-400">▼</span>
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent className="px-4 pb-3">
              <p className="mb-3 text-gray-600">
                This parent section contains a nested collapsible component.
              </p>
              <div className="rounded-lg border bg-gray-50">
                <Collapsible
                  open={openSections.nestedChild}
                  onOpenChange={(open) =>
                    setOpenSections((prev) => ({ ...prev, nestedChild: open }))
                  }
                >
                  <CollapsibleTrigger className="w-full px-3 py-2 text-left text-sm font-medium hover:bg-gray-100">
                    <div className="flex items-center justify-between">
                      <span>Child Section</span>
                      <span className="text-xs text-gray-400">▼</span>
                    </div>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="px-3 pb-2">
                    <p className="text-sm text-gray-600">
                      This is nested content that can be independently
                      expanded/collapsed.
                    </p>
                  </CollapsibleContent>
                </Collapsible>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>

        <div className="space-y-2">
          <h4 className="font-medium">Multiple Independent Sections</h4>
          {[1, 2, 3].map((index) => (
            <div key={index} className="rounded-lg border bg-white">
              <Collapsible
                open={openSections.multi[index]}
                onOpenChange={(open) => toggleMultiSection(index)}
              >
                <CollapsibleTrigger className="w-full px-4 py-3 text-left font-medium hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <span>Section {index}</span>
                    <span className="text-gray-400">
                      {openSections.multi[index] ? "▼" : "▶"}
                    </span>
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent className="px-4 pb-3">
                  <p className="text-gray-600">
                    This is Section {index} with independent state management.
                    Each section maintains its own open/closed state.
                  </p>
                </CollapsibleContent>
              </Collapsible>
            </div>
          ))}
        </div>
      </div>

      <p className="text-sm text-gray-600">
        Click on any section header to expand or collapse the content. Nested
        collapsibles maintain independent state.
      </p>
    </div>
  );
}
