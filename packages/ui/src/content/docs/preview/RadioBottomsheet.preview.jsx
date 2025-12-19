"use client";

import { useState } from "react";

import { RadioBottomsheet } from "@muatmuat/ui/BottomSheet";

export function RadioBottomsheetPreview() {
  const [selectedStatus, setSelectedStatus] = useState("active");
  const [selectedPriority, setSelectedPriority] = useState("");

  const statusOptions = [
    { label: "Active Status", value: "active" },
    { label: "Inactive Status", value: "inactive" },
    { label: "Pending Status", value: "pending" },
    { label: "Completed Status", value: "completed" },
  ];

  const priorityOptions = [
    { label: "High Priority", value: "high" },
    { label: "Medium Priority", value: "medium" },
    { label: "Low Priority", value: "low" },
    { label: "Critical Priority", value: "critical" },
  ];

  return (
    <div className="space-y-6 p-8">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Radio Bottomsheet Examples</h3>

        {/* Status selection */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Status Selection</label>
          <RadioBottomsheet
            title="Select Status"
            options={statusOptions}
            value={selectedStatus}
            onChange={setSelectedStatus}
            saveLabel="Apply Status"
            placeHolder="Choose status..."
          />
          <p className="text-xs text-neutral-600">Selected: {selectedStatus}</p>
        </div>

        {/* Priority selection */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Priority Selection</label>
          <RadioBottomsheet
            title="Select Priority"
            options={priorityOptions}
            value={selectedPriority}
            onChange={setSelectedPriority}
            saveLabel="Set Priority"
            placeHolder="Select priority level..."
          />
          <p className="text-xs text-neutral-600">
            Selected: {selectedPriority || "None"}
          </p>
        </div>

        {/* Disabled example */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Disabled Example</label>
          <RadioBottomsheet
            title="Disabled Selection"
            options={statusOptions}
            value="inactive"
            onChange={() => {}}
            saveLabel="Cannot Apply"
            placeHolder="Disabled..."
            disabled={true}
          />
        </div>
      </div>
    </div>
  );
}
