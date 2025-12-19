"use client";

import { useState } from "react";

import { Select } from "@muatmuat/ui/Form";

export function SelectPreview() {
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");

  const countries = [
    { value: "id", label: "Indonesia" },
    { value: "my", label: "Malaysia" },
    { value: "sg", label: "Singapore" },
    { value: "th", label: "Thailand" },
    { value: "ph", label: "Philippines" },
  ];

  const cities = {
    id: [
      { value: "jkt", label: "Jakarta" },
      { value: "sby", label: "Surabaya" },
      { value: "bdg", label: "Bandung" },
    ],
    my: [
      { value: "kul", label: "Kuala Lumpur" },
      { value: "pen", label: "Penang" },
      { value: "joh", label: "Johor Bahru" },
    ],
  };

  const availableCities = cities[country] || [];

  return (
    <div className="space-y-4">
      <div>
        <label className="mb-2 block text-sm font-medium">Country</label>
        <Select
          placeholder="Select your country"
          options={countries}
          value={country}
          onChange={setCountry}
          errorMessage={!country ? "Please select a country" : ""}
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">City</label>
        <Select
          placeholder={country ? "Select your city" : "Select a country first"}
          options={availableCities}
          value={city}
          onChange={setCity}
          disabled={!country}
          notFoundText={
            country ? "No cities available" : "Select a country first"
          }
        />
      </div>
    </div>
  );
}
