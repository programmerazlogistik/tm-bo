"use client";

import { useState } from "react";

import { MapWithPath } from "@muatmuat/ui/Maps";

export function MapWithPathPreview() {
  const [showTruck, setShowTruck] = useState(true);
  const [pathColor, setPathColor] = useState("#DD7B02");
  const [showPath, setShowPath] = useState(true);

  // Mock location data
  const locationMarkers = [
    {
      title: "Warehouse",
      position: { lat: -7.2575, lng: 112.7521 },
      type: "pickup",
      icon: "/icons/warehouse-icon.svg",
      onClick: (marker) => console.log("Warehouse clicked:", marker),
    },
    {
      title: "Customer Location",
      position: { lat: -7.2755, lng: 112.7631 },
      type: "dropoff",
      icon: "/icons/customer-icon.svg",
      onClick: (marker) => console.log("Customer location clicked:", marker),
    },
    {
      title: "Distribution Center",
      position: { lat: -7.2405, lng: 112.7451 },
      type: "pickup",
      icon: "/icons/distribution-icon.svg",
      onClick: (marker) => console.log("Distribution center clicked:", marker),
    },
  ];

  const locationPolyline = [
    { lat: -7.2575, lng: 112.7521 },
    { lat: -7.2605, lng: 112.7551 },
    { lat: -7.2655, lng: 112.7581 },
    { lat: -7.2705, lng: 112.7611 },
    { lat: -7.2755, lng: 112.7631 },
  ];

  const encodedTruckPolyline = "_p~iF~ps|U_ulLnnqC_mqNvxq`@";

  const pathOptions = {
    strokeColor: pathColor,
    strokeOpacity: 1,
    strokeWeight: 6,
  };

  const truckPathOptions = {
    strokeColor: "#FFC217",
    strokeOpacity: 1,
    strokeWeight: 6,
    strokeDashArray: "10,5",
  };

  return (
    <div className="space-y-4">
      {/* Main Map Display */}
      <div className="rounded-lg border border-gray-200 p-4">
        <h3 className="mb-2 font-medium">Logistics Route Tracking</h3>
        <MapWithPath
          apiKey="AIzaSyDw_9D9-4zTechHn1wMEILZqiBv51Q7jHU"
          mapContainerStyle={{ width: "100%", height: "500px" }}
          center={{ lat: -7.2575, lng: 112.7521 }}
          zoom={12}
          locationMarkers={locationMarkers}
          locationPolyline={showPath ? locationPolyline : []}
          encodedTruckPolyline={encodedTruckPolyline}
          pathOptions={pathOptions}
          truckPathOptions={truckPathOptions}
          showTruck={showTruck}
          truckIcon="/icons/truck-icon.svg"
        />
      </div>

      {/* Controls */}
      <div className="rounded-lg border bg-white p-4">
        <h4 className="mb-2 font-medium">Display Controls</h4>
        <div className="flex flex-wrap gap-4">
          <button
            onClick={() => setShowTruck(!showTruck)}
            className={`rounded px-4 py-2 ${
              showTruck
                ? "bg-green-500 text-white"
                : "bg-gray-300 text-gray-700"
            }`}
          >
            {showTruck ? "Hide Truck" : "Show Truck"}
          </button>

          <button
            onClick={() => setShowPath(!showPath)}
            className={`rounded px-4 py-2 ${
              showPath ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-700"
            }`}
          >
            {showPath ? "Hide Path" : "Show Path"}
          </button>

          <div className="flex items-center gap-2">
            <label className="text-sm font-medium">Path Color:</label>
            <select
              value={pathColor}
              onChange={(e) => setPathColor(e.target.value)}
              className="rounded border px-2 py-1 text-sm"
            >
              <option value="#DD7B02">Orange</option>
              <option value="#059669">Green</option>
              <option value="#dc2626">Red</option>
              <option value="#2563eb">Blue</option>
              <option value="#7c3aed">Purple</option>
            </select>
          </div>
        </div>
      </div>

      {/* Route Information */}
      <div className="rounded-lg border bg-gray-50 p-4">
        <h4 className="mb-2 font-medium">Route Information</h4>
        <div className="grid grid-cols-1 gap-2 text-sm md:grid-cols-3">
          <div>
            <span className="font-medium">Total Stops:</span>{" "}
            {locationMarkers.length}
          </div>
          <div>
            <span className="font-medium">Pickup Points:</span>{" "}
            {locationMarkers.filter((m) => m.type === "pickup").length}
          </div>
          <div>
            <span className="font-medium">Dropoff Points:</span>{" "}
            {locationMarkers.filter((m) => m.type === "dropoff").length}
          </div>
        </div>
      </div>

      {/* Feature List */}
      <div className="rounded-lg border border-green-200 bg-green-50 p-4">
        <h4 className="mb-2 font-medium text-green-900">Features</h4>
        <ul className="list-inside text-sm text-green-800">
          <li>• Multiple location markers with custom icons</li>
          <li>• Animated truck tracking with rotation based on direction</li>
          <li>• Customizable path styling and colors</li>
          <li>• Mobile-responsive marker labels</li>
          <li>• Click handlers for location interactions</li>
          <li>• Support for encoded polylines from Google Maps API</li>
          <li>• Separate truck route and location path visualization</li>
        </ul>
      </div>

      {/* API Requirements Note */}
      <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4">
        <h4 className="mb-2 font-medium text-yellow-900">
          📝 API Requirements
        </h4>
        <p className="text-sm text-yellow-800">
          This component requires a Google Maps API key with the Maps JavaScript
          API and the Geometry library enabled. The preview shows placeholder
          content if the API is not configured.
        </p>
      </div>
    </div>
  );
}
