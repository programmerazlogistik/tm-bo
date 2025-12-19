"use client";

import { useState } from "react";

import { DateTimePickerWeb } from "@muatmuat/ui/Calendar";

export function DateTimePickerWebPreview() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <DateTimePickerWeb
      value={selectedDate}
      onChange={setSelectedDate}
      onApply={(date) => console.log("Applied:", date)}
      onCancel={(date) => console.log("Cancelled:", date)}
      dateFormat="dd MMM yyyy, HH:mm"
    />
  );
}
