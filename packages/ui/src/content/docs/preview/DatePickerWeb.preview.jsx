"use client";

import { useState } from "react";

import { DatePickerWeb } from "@muatmuat/ui/Calendar";

export function DatePickerWebPreview() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedDateWithError, setSelectedDateWithError] = useState(
    new Date(2023, 0, 1)
  );
  const [disabledDate, setDisabledDate] = useState(new Date(2024, 0, 15));

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h3 className="mb-4 text-lg font-semibold">Default Date Picker</h3>
        <DatePickerWeb
          value={selectedDate}
          onChange={setSelectedDate}
          onApply={setSelectedDate}
          placeholder="Choose a date"
        />
        <p className="mt-2 text-sm text-neutral-600">
          Selected:{" "}
          {selectedDate ? selectedDate.toDateString() : "No date selected"}
        </p>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">Date Picker with Error</h3>
        <DatePickerWeb
          value={selectedDateWithError}
          onChange={setSelectedDateWithError}
          onApply={setSelectedDateWithError}
          errorMessage="Please select a valid future date"
        />
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">Disabled Date Picker</h3>
        <DatePickerWeb
          value={disabledDate}
          onChange={setDisabledDate}
          onApply={setDisabledDate}
          disabled={true}
        />
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">Date Range Constraints</h3>
        <DatePickerWeb
          value={selectedDate}
          onChange={setSelectedDate}
          onApply={setSelectedDate}
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
        <DatePickerWeb
          value={selectedDate}
          onChange={setSelectedDate}
          onApply={setSelectedDate}
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
