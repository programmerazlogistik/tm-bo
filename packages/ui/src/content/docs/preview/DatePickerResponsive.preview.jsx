"use client";

import { useState } from "react";

import { DatePickerResponsive } from "@muatmuat/ui/Calendar";

export function DatePickerResponsivePreview() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedDateWithError, setSelectedDateWithError] =
    useState("2023-01-01");
  const [disabledDate, setDisabledDate] = useState("2024-01-15");

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h3 className="mb-4 text-lg font-semibold">Default Date Picker</h3>
        <DatePickerResponsive
          value={selectedDate}
          onChange={setSelectedDate}
          placeholder="Select a date"
        />
        <p className="mt-2 text-sm text-neutral-600">
          Selected: {selectedDate || "No date selected"}
        </p>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">Date Picker with Error</h3>
        <DatePickerResponsive
          value={selectedDateWithError}
          onChange={setSelectedDateWithError}
          errorMessage="Date must be in the future"
          status="error"
        />
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">Disabled Date Picker</h3>
        <DatePickerResponsive
          value={disabledDate}
          onChange={setDisabledDate}
          disabled={true}
        />
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">Date Range Constraints</h3>
        <DatePickerResponsive
          value={selectedDate}
          onChange={setSelectedDate}
          minDate={new Date()}
          maxDate={new Date(2024, 11, 31)}
          placeholder="Select date this year"
        />
        <p className="mt-2 text-sm text-neutral-600">
          Limited to current date through end of 2024
        </p>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">Custom Date Format</h3>
        <DatePickerResponsive
          value={selectedDate}
          onChange={setSelectedDate}
          dateFormat="MMMM dd, yyyy"
          placeholder="Choose date"
        />
        <p className="mt-2 text-sm text-neutral-600">
          Custom format: "MMMM dd, yyyy"
        </p>
      </div>
    </div>
  );
}
