"use client";

import { useState } from "react";

import { DateTimePickerResponsive } from "@muatmuat/ui/Calendar";

export function DateTimePickerResponsivePreview() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <DateTimePickerResponsive
      value={selectedDate}
      onChange={setSelectedDate}
      onApply={(date) => console.log("Applied:", date)}
    >
      <button className="rounded-md border border-neutral-300 bg-white px-4 py-2 text-sm hover:bg-neutral-50">
        Select Date & Time
      </button>
    </DateTimePickerResponsive>
  );
}
