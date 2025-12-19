"use client";

import React, { useState } from "react";

import { cn } from "@muatmuat/lib/utils";
import { Button } from "@muatmuat/ui/Button";
import { Input } from "@muatmuat/ui/Form";
import { MapContainer } from "@muatmuat/ui/Maps";
import {
  Modal,
  ModalContent,
  ModalTitle,
  ModalTrigger,
} from "@muatmuat/ui/Modal";

import { DEFAULT_SURABAYA_COORDINATES } from "@/constants/coordinates";

type Coordinates = {
  latitude: number;
  longitude: number;
};

type Props = {
  value: Coordinates | null;
  onSubmit: (data: {
    coordinates: {
      latitude: number;
      longitude: number;
    };
    address: string;
  }) => void;
  className?: string;
};

export const ModalLocation = ({ value, onSubmit, className }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [coordinates, setCoordinates] = useState(
    value || DEFAULT_SURABAYA_COORDINATES
  );
  const [address, setAddress] = useState("Jalan Gubeng Kertajaya ix c"); // Initial value from screenshot

  // Update coordinates when value prop changes (but don't override with null)
  React.useEffect(() => {
    if (value) {
      setCoordinates(value);
    }
  }, [value]);

  const handlePositionChange = (newPosition: {
    latitude: number;
    longitude: number;
  }) => {
    setCoordinates(newPosition);
    // TODO: Implement reverse geocoding to update address based on coordinates if needed
    // setAddress("Fetching address...");
  };

  const handleSaveLocation = () => {
    console.log("Saving location:", { coordinates, address });
    setIsOpen(false);

    // Add logic to save the location data
    onSubmit({ address, coordinates });
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value);
    // TODO: Implement geocoding to update map based on address if needed
  };

  return (
    <div className={cn("relative h-[154px] w-[262px]", className)}>
      <MapContainer
        coordinates={value}
        className="h-[154px] w-[262px] rounded-[8px]"
        viewOnly={true}
        draggableMarker={false}
        textLabel="Selected Location"
        markerIcon="/icons/marker-lokasi.svg"
      />
      <Modal open={isOpen} onOpenChange={setIsOpen} closeOnOutsideClick={false}>
        <ModalTrigger asChild>
          <Button
            variant="muatparts-primary"
            className="absolute bottom-0 left-0 w-full rounded-b-[8px] rounded-t-none border-0 py-[6px] text-center text-xs font-bold text-white"
          >
            Atur Pin Lokasi
          </Button>
        </ModalTrigger>
        {/* Remove default padding to allow custom layout */}
        <ModalContent
          className={cn(
            "w-[900px] max-w-[90vw] p-5", // Adjusted width based on screenshot, removed default padding
            "border border-neutral-300" // Added border based on CSS
          )}
          // Using default 'muatmuat' type for standard close button, no branded header needed
          type="primary"
        >
          {/* Main content area */}
          <div className="flex flex-col gap-5 md:flex-row">
            {/* Map Area */}
            <MapContainer
              coordinates={coordinates}
              className="h-[379px] w-full" // Take full height of the flex container
              onPositionChange={handlePositionChange}
              textLabel={address || "Selected Location"}
              draggableMarker={true}
              viewOnly={false}
              markerIcon="/icons/marker-lokasi.svg"
              // Using default marker icon
            />

            {/* Control Panel (Sidebar) */}
            <div className="relative flex w-full flex-col md:w-[300px]">
              <ModalTitle className="mb-3 mt-2.5 text-left text-base font-semibold text-neutral-900">
                Atur Pin Lokasi
              </ModalTitle>
              <Input
                value={address}
                onChange={handleAddressChange}
                placeholder="Cari atau pilih lokasi di peta" // Set a more appropriate placeholder
                withReset={true} // Show the 'X' button
                icon={{ left: "/icons/marker-lokasi.svg" }} // Placeholder icon, replace with actual path
                appearance={{
                  containerClassName: "h-10", // Adjust height if needed
                  inputClassName: "text-sm",
                }}
              />
              <Button
                variant="muatparts-primary" // Based on screenshot button color
                className="absolute bottom-0 left-1/2 mb-[18px] -translate-x-1/2 text-nowrap" // Add margin top on mobile
                onClick={handleSaveLocation}
              >
                Simpan Lokasi
              </Button>
            </div>
          </div>
        </ModalContent>
      </Modal>
    </div>
  );
};
