"use client";

import React, { useEffect, useState } from "react";

import { Button } from "@muatmuat/ui/Button";
import { MapContainer } from "@muatmuat/ui/Maps";
import { Modal, ModalContent } from "@muatmuat/ui/Modal";

import { useLocationFieldStateMachineContext } from "../LocationFieldProvider";
import LocationFieldInput from "../components/LocationFieldInput";
import type { Coordinates } from "../types";

const LocationDetailModal: React.FC = () => {
  const stateMachine = useLocationFieldStateMachineContext();
  const { coordinates, handleCoordinateChange, activeModal, closeModal } =
    stateMachine;

  const isDetailModalOpen = activeModal === "detail";
  const setIsDetailModalOpen = (open: boolean) => !open && closeModal();

  const [localCoordinates, setLocalCoordinates] =
    useState<Coordinates>(coordinates);

  useEffect(() => {
    if (isDetailModalOpen) {
      setLocalCoordinates(coordinates);
    }
  }, [isDetailModalOpen, coordinates]);

  const handleSave = () => {
    handleCoordinateChange(localCoordinates);
    setIsDetailModalOpen(false);
  };

  const handlePositionChange = (position: {
    latitude: number;
    longitude: number;
  }) => {
    setLocalCoordinates(position);
  };

  return (
    <Modal
      open={isDetailModalOpen}
      onOpenChange={setIsDetailModalOpen}
      closeOnOutsideClick={false}
    >
      <ModalContent className="h-[421px] w-[922px]">
        <div className="flex gap-5 p-5">
          {/* Left Side - Map */}
          <div className="flex h-[379px] w-[604px] flex-shrink-0 flex-col items-start gap-[10px] rounded-[10px] p-0">
            <MapContainer
              coordinates={localCoordinates}
              className="h-full w-full rounded-[10px]"
              draggableMarker={true}
              onPositionChange={handlePositionChange}
              textLabel={`${localCoordinates.latitude.toFixed(4)}, ${localCoordinates.longitude.toFixed(4)}`}
              markerIcon="/icons/location-management/marker-location.svg"
            />
          </div>

          {/* Right Side - Search and Save */}
          <div className="flex w-full flex-col">
            <div className="mb-5 flex items-center text-base font-semibold leading-[19px] text-neutral-900">
              Atur Pin Lokasi
            </div>

            <div className="flex-1">
              <LocationFieldInput placeholder="Cari lokasi..." />
            </div>

            {/* Save Button */}
            <div className="flex items-center justify-center">
              <Button
                onClick={handleSave}
                variant="muatparts-primary"
                className="mb-4 h-8"
              >
                Simpan Lokasi
              </Button>
            </div>
          </div>
        </div>
      </ModalContent>
    </Modal>
  );
};

export default LocationDetailModal;
