"use client";

import { useState } from "react";

import { MapContainer } from "@muatmuat/ui/Maps";

export function MapContainerPreview() {
  const [coordinates, setCoordinates] = useState({
    latitude: -7.2575,
    longitude: 112.7521,
  });
  const [viewOnly, setViewOnly] = useState(false);
  const [textLabel, setTextLabel] = useState("Selected Location");

  const handlePositionChange = (newPosition) => {
    setCoordinates(newPosition);
    setTextLabel(
      `Location: ${newPosition.latitude.toFixed(4)}, ${newPosition.longitude.toFixed(4)}`
    );
  };

  return (
    <div className="space-y-4">
      {/* Interactive Map */}
      <div className="rounded-lg border border-gray-200 p-4">
        <h3 className="mb-2 font-medium">Interactive Location Picker</h3>
        <MapContainer
          coordinates={coordinates}
          className="h-[400px] w-full"
          viewOnly={viewOnly}
          textLabel={textLabel}
          draggableMarker={!viewOnly}
          onPositionChange={handlePositionChange}
        />
      </div>

      {/* Current Coordinates */}
      <div className="rounded-lg border bg-gray-50 p-4">
        <h4 className="mb-2 font-medium">Current Coordinates</h4>
        <div className="font-mono text-sm">
          <div>Latitude: {coordinates.latitude}</div>
          <div>Longitude: {coordinates.longitude}</div>
        </div>
      </div>

      {/* Controls */}
      <div className="rounded-lg border bg-white p-4">
        <h4 className="mb-2 font-medium">Controls</h4>
        <div className="flex flex-wrap gap-4">
          <button
            onClick={() => setViewOnly(!viewOnly)}
            className={`rounded px-4 py-2 ${
              viewOnly ? "bg-gray-500 text-white" : "bg-blue-500 text-white"
            }`}
          >
            {viewOnly ? "View Only" : "Interactive"}
          </button>

          <button
            onClick={() => {
              const newCoords = {
                latitude: -6.2088,
                longitude: 106.8456,
              };
              setCoordinates(newCoords);
              setTextLabel("Jakarta, Indonesia");
            }}
            className="rounded bg-green-500 px-4 py-2 text-white"
          >
            Set to Jakarta
          </button>

          <button
            onClick={() => {
              const newCoords = {
                latitude: -7.2575,
                longitude: 112.7521,
              };
              setCoordinates(newCoords);
              setTextLabel("Surabaya, Indonesia");
            }}
            className="rounded bg-purple-500 px-4 py-2 text-white"
          >
            Set to Surabaya
          </button>
        </div>
      </div>

      {/* Usage Instructions */}
      <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
        <h4 className="mb-2 font-medium text-blue-900">Instructions</h4>
        <ul className="list-inside text-sm text-blue-800">
          {viewOnly ? (
            <>
              <li>• Map is in view-only mode</li>
              <li>• Click "Interactive" to enable location selection</li>
              <li>• Click on markers to see location labels</li>
            </>
          ) : (
            <>
              <li>• Click anywhere on the map to place a marker</li>
              <li>• Drag the marker to adjust position</li>
              <li>• Click the marker to see location details</li>
              <li>• Coordinates update automatically</li>
            </>
          )}
        </ul>
      </div>

      {/* API Requirements Note */}
      <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4">
        <h4 className="mb-2 font-medium text-yellow-900">
          📝 API Requirements
        </h4>
        <p className="text-sm text-yellow-800">
          This component requires a Google Maps API key set in the
          NEXT_PUBLIC_MAP_API environment variable. The preview shows
          placeholder content if the API is not configured.
        </p>
      </div>
    </div>
  );
}
