"use client";

import { useState } from "react";

import { ActiveFiltersBar } from "@muatmuat/ui/ActiveFiltersBar";

export function ActiveFiltersBarPreview() {
  const [filters, setFilters] = useState([
    { id: 1, label: "Jakarta", item: { icon: "/icons/location.svg" } },
    { id: 2, label: "Sedan", item: { icon: "/icons/truck.svg" } },
    { id: 3, label: "Under 5 Years", item: { icon: "/icons/calendar.svg" } },
    {
      id: 4,
      label: "Price: Low to High",
      item: { icon: "/icons/sorting16.svg" },
    },
    { id: 5, label: "Available Now", item: { icon: "/icons/check.svg" } },
  ]);

  const handleRemoveFilter = (filter) => {
    setFilters(filters.filter((f) => f.id !== filter.id));
  };

  const handleClearAll = () => {
    setFilters([]);
  };

  return (
    <div className="space-y-4">
      <ActiveFiltersBar
        filters={filters}
        onRemoveFilter={handleRemoveFilter}
        onClearAll={handleClearAll}
        showClearAll={true}
        clearAllText="Hapus Semua Filter"
      />

      {filters.length === 0 && (
        <p className="text-sm italic text-gray-500">
          No active filters. Add some filters above to see them in action!
        </p>
      )}

      <div className="text-sm text-gray-600">
        Active filters: <strong>{filters.length}</strong>
      </div>
    </div>
  );
}
