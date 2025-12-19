"use client";

import { useState } from "react";

import { Calendar } from "@muatmuat/ui/Calendar";

export function CalendarPreview() {
  const [selected, setSelected] = useState(new Date());

  return (
    <div className="flex justify-center">
      <Calendar
        mode="single"
        selected={selected}
        onSelect={setSelected}
        className="rounded-md border"
        showOutsideDays={true}
      />
    </div>
  );
}
