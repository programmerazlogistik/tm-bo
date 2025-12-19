"use client";

import { useState } from "react";

import { DisplayOptionsBar } from "@muatmuat/ui/DisplayOptionsBar";

export function DisplayOptionsBarPreview() {
  const [currentStatus, setCurrentStatus] = useState(null);

  const statusOptions = [
    { value: "pending", label: "Menunggu", count: 5, hasNotification: true },
    { value: "active", label: "Aktif", count: 12 },
    { value: "completed", label: "Selesai", count: 8 },
    {
      value: "cancelled",
      label: "Dibatalkan",
      count: 2,
      hasNotification: true,
    },
  ];

  return (
    <div className="space-y-4">
      <DisplayOptionsBar
        totalCount={27}
        statusOptions={statusOptions}
        currentStatus={currentStatus}
        onStatusChange={setCurrentStatus}
        showAllOption={true}
      />

      <div className="text-sm text-gray-600">
        Currently selected: <strong>{currentStatus || "Semua"}</strong>
      </div>
    </div>
  );
}
